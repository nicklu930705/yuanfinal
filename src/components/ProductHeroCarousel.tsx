import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';

interface Gesture {
  pointerId: number;
  startX: number;
  startY: number;
  axis: 'horizontal' | 'vertical' | null;
}

export default function ProductHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const track = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const count = heroSlides.length;

  useEffect(() => {
    if (!isAutoPlaying || isInteracting || count < 2) return;

    let timer = 0;
    const scheduleNext = () => {
      window.clearTimeout(timer);
      if (!document.hidden) {
        timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % count), 5000);
      }
    };

    scheduleNext();
    document.addEventListener('visibilitychange', scheduleNext);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', scheduleNext);
    };
  }, [activeIndex, count, isAutoPlaying, isInteracting]);

  const goTo = (index: number) => {
    setActiveIndex((index + count) % count);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    setIsInteracting(true);
    suppressClick.current = false;
    gesture.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      axis: null,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - current.startX;
    const deltaY = event.clientY - current.startY;

    if (!current.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 8) {
      current.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
      if (current.axis === 'horizontal') {
        suppressClick.current = true;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }

    if (current.axis === 'horizontal') setDragOffset(deltaX);
  };

  const finishGesture = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    gesture.current = null;
    setIsInteracting(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const deltaX = event.clientX - current.startX;
    const threshold = Math.min(80, Math.max(40, event.currentTarget.clientWidth * 0.12));
    if (!cancelled && current.axis === 'horizontal' && Math.abs(deltaX) >= threshold) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    } else {
      setDragOffset(0);
      setIsDragging(false);
    }
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    // A drag must never open the product; keyboard activation remains available.
    if (suppressClick.current && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (activeIndex + (event.key === 'ArrowRight' ? 1 : -1) + count) % count;
      goTo(nextIndex);
      if (event.target instanceof HTMLElement && event.target.closest('a')) {
        requestAnimationFrame(() => track.current?.querySelectorAll('a')[nextIndex]?.focus({ preventScroll: true }));
      }
    }
  };

  if (!count) return null;

  return (
    <section
      aria-label="精選商品輪播"
      aria-roledescription="輪播"
      onKeyDown={handleKeyDown}
      onFocusCapture={(event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.matches(':focus-visible') && !target.closest('[data-autoplay-control]')) {
          setIsAutoPlaying(false);
        }
      }}
      className="relative isolate w-full overflow-hidden bg-[#eee9e1]"
    >
      <h1 className="sr-only">侑安國際｜餐飲包材與清潔用品精選</h1>
      <div
        ref={track}
        id="home-product-carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishGesture(event)}
        onPointerCancel={(event) => finishGesture(event, true)}
        onLostPointerCapture={(event) => {
          // Touch capture moves from the tapped child to this track when dragging.
          if (event.target === event.currentTarget) finishGesture(event, true);
        }}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
        style={{
          touchAction: 'pan-y pinch-zoom',
          transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
        }}
        className={`flex h-[620px] w-full select-none sm:h-[660px] md:h-[640px] ${isDragging ? '' : 'transition-transform duration-500 ease-out motion-reduce:transition-none'}`}
      >
        {heroSlides.map((slide, index) => (
          <Link
            key={slide.productId}
            to={`/products/${encodeURIComponent(slide.productId)}`}
            aria-label={`查看${slide.product.name}`}
            aria-hidden={index !== activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            draggable={false}
            className="relative block h-full w-full min-w-0 shrink-0 cursor-grab bg-[#eee9e1] outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary-500 active:cursor-grabbing"
          >
            <img
              src={slide.image}
              alt={`${slide.product.name}商品情境圖`}
              draggable={false}
              fetchPriority={index === 0 ? 'high' : 'low'}
              className="pointer-events-none absolute bottom-0 right-0 h-[56%] w-full object-cover object-right md:inset-0 md:h-full md:object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#eee9e1] via-transparent to-black/5 md:bg-gradient-to-r md:from-[#eee9e1]/95 md:via-[#eee9e1]/30 md:to-transparent" />
            <div className="relative mx-auto h-full w-full max-w-[1360px] px-6 pt-9 sm:px-10 sm:pt-12 md:flex md:items-center md:pb-20 md:pt-8">
              <div className="max-w-[480px] md:w-[43%]">
                <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-stone-600 md:mb-6">侑安國際 / 精選商品</p>
                <span className="mb-3 inline-block rounded-full border border-stone-400/40 px-3 py-1 text-xs font-bold text-stone-700 md:mb-5">{slide.category}</span>
                <h2 className="text-3xl font-headline font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.product.name.split('｜').map((line, lineIndex) => <span key={line} className={lineIndex === 0 ? 'block' : 'mt-1 block text-[0.72em] leading-tight'}>{line.trim()}</span>)}
                </h2>
                <p className="mt-3 text-sm font-semibold tracking-wide text-stone-600 md:mt-5 md:text-base">{slide.detail}</p>
                <p className="mt-3 max-w-[28rem] text-sm leading-relaxed text-stone-600 md:mt-5 md:text-base">{slide.description}</p>
                <span className="mt-5 inline-flex items-center gap-3 rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white shadow-sm md:mt-7">
                  查看商品 <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-5 left-0 right-0 mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-6 sm:px-10 md:bottom-7">
        <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-white/85 px-4 py-2.5 shadow-sm backdrop-blur-md">
          <span aria-hidden="true" className="hidden text-xs font-semibold tabular-nums text-stone-600 min-[375px]:inline">{String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
          <div className="flex items-center">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.productId}
                type="button"
                aria-label={`顯示第 ${index + 1} 張：${slide.product.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-controls="home-product-carousel"
                onClick={() => goTo(index)}
                className="flex h-8 min-w-8 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                <span className={`block h-1.5 rounded-full transition-all motion-reduce:transition-none ${index === activeIndex ? 'w-6 bg-stone-900' : 'w-1.5 bg-stone-400'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 right-0 top-[72%] flex -translate-y-1/2 items-center justify-between px-3 md:top-1/2 md:px-5 lg:px-6">
          <button type="button" aria-label="上一個商品" aria-controls="home-product-carousel" onClick={() => goTo(activeIndex - 1)} className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 text-stone-900 shadow-sm backdrop-blur-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900">
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" aria-label="下一個商品" aria-controls="home-product-carousel" onClick={() => goTo(activeIndex + 1)} className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 text-stone-900 shadow-sm backdrop-blur-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900">
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
      </div>
      <button
        type="button"
        data-autoplay-control
        aria-label={isAutoPlaying ? '暫停自動輪播' : '播放自動輪播'}
        title={isAutoPlaying ? '暫停自動輪播' : '播放自動輪播'}
        aria-controls="home-product-carousel"
        onClick={() => setIsAutoPlaying((playing) => !playing)}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-stone-900 shadow-sm backdrop-blur-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 sm:right-10"
      >
        {isAutoPlaying ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
      </button>
      <p role="status" aria-live={isAutoPlaying ? 'off' : 'polite'} aria-atomic="true" className="sr-only">第 {activeIndex + 1} 張，共 {count} 張：{heroSlides[activeIndex].product.name}</p>
    </section>
  );
}

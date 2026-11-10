import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, PointerEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Gesture {
  pointerId: number;
  startX: number;
  startY: number;
  axis: 'horizontal' | 'vertical' | null;
}

interface CarouselSlide {
  id: string;
  label: string;
  image: string;
  alt: string;
  href?: string;
  description: string;
  subtitle?: string;
  category?: string;
  detail?: string;
}

interface ImageCarouselProps {
  id: string;
  label: string;
  slides: CarouselSlide[];
  appearance?: 'brand' | 'product';
  showControls?: boolean;
}

interface SlideFrameProps {
  href?: string;
  label: string;
  active: boolean;
  className: string;
  children: ReactNode;
}

function SlideFrame({ href, label, active, className, children }: SlideFrameProps) {
  const attributes = {
    'aria-label': label,
    'aria-hidden': !active,
    'data-carousel-slide': true,
    tabIndex: active ? 0 : -1,
    draggable: false,
    className,
  };

  return href ? (
    <Link to={href} {...attributes}>{children}</Link>
  ) : (
    <div role="group" aria-roledescription="投影片" {...attributes}>{children}</div>
  );
}

export default function ImageCarousel({ id, label, slides, appearance = 'product', showControls = true }: ImageCarouselProps) {
  const isBrand = appearance === 'brand';
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [returnStarted, setReturnStarted] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const track = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const count = slides.length;

  const finishReturn = useCallback(() => {
    setSkipTransition(true);
    setActiveIndex(0);
    setReturnStarted(false);
    setIsReturning(false);
  }, []);

  useEffect(() => {
    if (!isReturning) return;
    let secondFrame = 0;
    let fallbackTimer = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setReturnStarted(true);
        fallbackTimer = window.setTimeout(finishReturn, 700);
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.clearTimeout(fallbackTimer);
    };
  }, [isReturning, finishReturn]);

  useEffect(() => {
    if (!skipTransition) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setSkipTransition(false));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [skipTransition]);

  useEffect(() => {
    if (!isAutoPlaying || isInteracting || isReturning || count < 2) return;

    let timer = 0;
    const scheduleNext = () => {
      window.clearTimeout(timer);
      if (!document.hidden) {
        timer = window.setTimeout(() => {
          if (activeIndex === count - 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReturnStarted(false);
            setIsReturning(true);
          } else {
            setActiveIndex((index) => index === count - 1 ? 0 : index + 1);
          }
        }, 5000);
      }
    };

    scheduleNext();
    document.addEventListener('visibilitychange', scheduleNext);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', scheduleNext);
    };
  }, [activeIndex, count, isAutoPlaying, isInteracting, isReturning]);

  const goTo = (index: number) => {
    const nextIndex = (index + count) % count;
    const wrapForward = activeIndex === count - 1 && nextIndex === 0 && count > 1
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReturning(wrapForward);
    setReturnStarted(false);
    setSkipTransition(false);
    if (!wrapForward) setActiveIndex(nextIndex);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (isReturning) {
      suppressClick.current = true;
      return;
    }
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
    if (isReturning || (suppressClick.current && event.detail !== 0)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === ' ') {
      event.preventDefault();
      setIsAutoPlaying((playing) => !playing);
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (activeIndex + (event.key === 'ArrowRight' ? 1 : -1) + count) % count;
      goTo(nextIndex);
      if (event.target instanceof HTMLElement && event.target.closest('[data-carousel-slide]')) {
        requestAnimationFrame(() => track.current?.querySelectorAll<HTMLElement>('[data-carousel-slide]')[nextIndex]?.focus({ preventScroll: true }));
      }
    }
  };

  const renderSlide = (slide: CarouselSlide, index: number, active: boolean) => (
    <SlideFrame
      key={slide.id}
      href={slide.href}
      label={slide.href ? `查看${slide.label}` : slide.label}
      active={active}
      className={`relative block h-full w-full min-w-0 shrink-0 cursor-grab outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary-500 active:cursor-grabbing ${isBrand ? 'bg-slate-900' : 'bg-[#eee9e1]'}`}
    >
      <img
        src={slide.image}
        alt={slide.alt}
        draggable={false}
        fetchPriority={index === 0 ? 'high' : 'low'}
        className={isBrand
          ? 'pointer-events-none absolute inset-0 h-full w-full object-cover object-[72%_center] opacity-70 md:object-center md:opacity-60'
          : 'pointer-events-none absolute bottom-0 right-0 h-[56%] w-full object-cover object-right md:inset-0 md:h-full md:object-center'}
      />
      {isBrand ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="relative mx-auto flex h-full w-full max-w-[1360px] items-center px-16 py-20 md:px-20 md:py-32">
            <div className="max-w-4xl">
              {index === 0 ? (
                <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">{slide.label}</h1>
              ) : (
                <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">{slide.label}</h2>
              )}
              <p className="mt-2 block text-2xl font-bold text-slate-300 opacity-90 sm:text-3xl md:text-4xl lg:text-5xl">{slide.subtitle}</p>
              <p className="mt-6 max-w-2xl font-body text-base font-medium leading-relaxed text-slate-100 opacity-90 sm:mt-8 sm:text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#eee9e1] via-transparent to-black/5 md:bg-gradient-to-r md:from-[#eee9e1]/95 md:via-[#eee9e1]/30 md:to-transparent" />
          <div className="relative mx-auto h-full w-full max-w-[1360px] px-6 pt-9 sm:px-10 sm:pt-12 md:flex md:items-center md:px-20 md:pb-20 md:pt-8">
            <div className="max-w-[480px] md:w-[43%]">
              <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-stone-600 md:mb-6">侑安國際 / 精選商品</p>
              <span className="mb-3 inline-block rounded-full border border-stone-400/40 px-3 py-1 text-xs font-bold text-stone-700 md:mb-5">{slide.category}</span>
              <h2 className="font-headline text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                {slide.label.split('｜').map((line, lineIndex) => <span key={line} className={lineIndex === 0 ? 'block' : 'mt-1 block text-[0.72em] leading-tight'}>{line.trim()}</span>)}
              </h2>
              <p className="mt-3 text-sm font-semibold tracking-wide text-stone-600 md:text-base">{slide.detail}</p>
              <p className="mt-3 max-w-[28rem] text-sm leading-relaxed text-stone-600 md:text-base">{slide.description}</p>
              <span className="mt-5 inline-flex items-center gap-3 rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white shadow-sm">
                查看商品 <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>
          </div>
        </>
      )}
    </SlideFrame>
  );

  if (!count) return null;

  return (
    <section
      aria-label={label}
      aria-roledescription="輪播"
      aria-describedby={`${id}-keyboard-help`}
      onKeyDown={handleKeyDown}
      onFocusCapture={(event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.matches(':focus-visible')) {
          setIsAutoPlaying(false);
        }
      }}
      className={`relative isolate w-full overflow-hidden ${isBrand ? 'bg-slate-900' : 'rounded-3xl bg-[#eee9e1]'}`}
    >
      <div
        ref={track}
        id={id}
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
        className={`flex h-[620px] w-full select-none sm:h-[660px] ${isBrand ? 'md:h-[640px]' : 'md:h-[480px]'} ${isDragging || skipTransition ? '' : 'transition-transform duration-500 ease-out motion-reduce:transition-none'}`}
      >
        {slides.map((slide, index) => renderSlide(slide, index, index === activeIndex))}
      </div>
      {/* Place the first slide after the last so it enters from the right, continuing the forward motion. */}
      {isReturning && (
        <div data-carousel-return aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            data-return-track
            className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translate3d(${returnStarted ? '-100%' : '0'}, 0, 0)` }}
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget && event.propertyName === 'transform') finishReturn();
            }}
          >
            {renderSlide(slides[count - 1], count - 1, false)}
            {renderSlide(slides[0], 0, false)}
          </div>
        </div>
      )}

      {showControls && <div className={`pointer-events-none absolute left-0 right-0 flex -translate-y-1/2 items-center justify-between px-3 md:px-5 lg:px-6 ${isBrand ? 'top-1/2' : 'top-[72%] md:top-1/2'}`}>
          <button type="button" aria-label={isBrand ? '上一張主視覺' : '上一個商品'} aria-controls={id} onClick={() => goTo(activeIndex - 1)} className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 text-stone-900 shadow-sm backdrop-blur-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900">
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" aria-label={isBrand ? '下一張主視覺' : '下一個商品'} aria-controls={id} onClick={() => goTo(activeIndex + 1)} className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 text-stone-900 shadow-sm backdrop-blur-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900">
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
      </div>}
      <p id={`${id}-keyboard-help`} className="sr-only">可左右滑動切換圖片，或使用鍵盤左右鍵切換、空白鍵暫停與繼續播放。</p>
      <p role="status" aria-live={isAutoPlaying ? 'off' : 'polite'} aria-atomic="true" className="sr-only">第 {activeIndex + 1} 張，共 {count} 張：{slides[activeIndex].label}</p>
    </section>
  );
}

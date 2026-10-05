import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { products } from '../data/store';

// Pick representative products for the orbit (as close to 12 items for full orbit loop)
const heroProductIds = [
  '01_清潔袋-01_一般捲取式-大_45L',
  '01_清潔袋-02_拉繩式-大_45L_24張',
  '01_清潔袋-03_抽取式與業務用-超大_黑色_28張',
  '01_清潔袋-04_醫療感染性廢棄物袋-封面',
  'fp-zipper-storage',
  'fp-freezer-bag',
  '02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-200x300mm_150枚',
  '02_食品保鮮耐熱袋-02_營潔平板式耐熱袋-四兩裝_15.5x19.5cm',
  '03_夾鏈袋-01_台塑LDPE夾鏈袋-08號_170x240mm',
  '04_病媒防治-01_蟑螂防治-快點絕_0.5百分比凝膠餌劑',
  'yuan-product-paper-cups',
  'yuan-product-sealing-film',
  'yuan-product-mosquito-lamp'
];

export default function HeroOrbit() {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Animation state matching the reference exactly
    const requestRef = useRef<number>(0);
    const phaseRef = useRef<number>(0.45); // Starting phase from reference
    const lastTimeRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          w: entry.contentRect.width,
          h: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    
    // Initial size
    setDimensions({
      w: containerRef.current.clientWidth,
      h: containerRef.current.clientHeight
    });
    
    return () => observer.disconnect();
  }, []);

  const isActuallyPaused = isPaused || isHovered;

  // 3D Animation Loop based strictly on reference tick()
  useEffect(() => {
    const TAU = Math.PI * 2;
    
    const tick = (now: number) => {
      if (!isActuallyPaused) {
        const dt = lastTimeRef.current ? Math.min((now - lastTimeRef.current) / 1000, 0.05) : 0;
        phaseRef.current = (phaseRef.current + (dt * TAU) / 42) % TAU;
        setPhaseState(phaseRef.current); 
      }
      lastTimeRef.current = now;
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    
    const handleVisibilityChange = () => {
      cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = 0;
      if (!document.hidden) {
        requestRef.current = requestAnimationFrame(tick);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActuallyPaused]);

  // Dummy state to force re-renders on tick
  const [phaseState, setPhaseState] = useState(phaseRef.current);

  const heroItems = heroProductIds.map(id => {
    // Handle variants for medical bags
    const baseId = id.includes('-封面') || id.includes('-規格') 
      ? '01_清潔袋-04_醫療感染性廢棄物袋-感染袋_多尺寸' 
      : id;

    const p = products.find(p => p.id === baseId);
    if (!p) return null;
    
    // Find the first available image path
    let coverImg = '';
    
    // Check main images
    if (p.images && p.images.length > 0) {
      coverImg = p.images[0].path;
    }
    
    // Check specs images if not found
    if (!coverImg && p.specs && p.specs.length > 0) {
      for (const spec of p.specs) {
        if (spec.images && spec.images.length > 0) {
          coverImg = spec.images[0].path;
          break;
        }
      }
    }
    
    // Check shared_images if still not found
    if (!coverImg && p.shared_images && p.shared_images.length > 0) {
      coverImg = p.shared_images[0].path;
    }
    
    // Override image for specific cleaning bags with safe ASCII paths
    if (id === '01_清潔袋-01_一般捲取式-大_45L') {
      coverImg = '/assets/hero/taisu_45l_cover.png';
    } else if (id === '01_清潔袋-02_拉繩式-大_45L_24張') {
      coverImg = '/assets/hero/drawstring_45l_24.png';
    } else if (id === '01_清潔袋-03_抽取式與業務用-超大_黑色_28張') {
      coverImg = '/assets/hero/clean_bag_pull_extra_large_v2.png';
    } else if (id === '01_清潔袋-04_醫療感染性廢棄物袋-封面') {
      coverImg = '/assets/hero/medical_waste_bag_cover_v3.png';
    } else if (id === '01_清潔袋-04_醫療感染性廢棄物袋-規格') {
      coverImg = '/assets/01_清潔袋/04_醫療感染性廢棄物袋/系列規格圖__IMG_0215.JPG';
    } else if (id === '02_食品保鮮耐熱袋-01_台塑保鮮耐熱袋-200x300mm_150枚') {
      coverImg = '/assets/hero/food_bag_200x300.jpg';
    } else if (id === '02_食品保鮮耐熱袋-02_營潔平板式耐熱袋-四兩裝_15.5x19.5cm') {
      coverImg = '/assets/hero/yingjie_306.jpg';
    } else if (id === '03_夾鏈袋-01_台塑LDPE夾鏈袋-08號_170x240mm') {
      coverImg = '/assets/hero/zipper_bag_08_v3.png';
    } else if (id === 'fp-zipper-storage') {
      coverImg = '/assets/hero/zipper_storage_l.jpg';
    } else if (id === 'fp-freezer-bag') {
      coverImg = '/assets/hero/freezer_bag_l_cover.jpg';
    } else if (id === '04_病媒防治-01_蟑螂防治-快點絕_0.5百分比凝膠餌劑') {
      coverImg = '/assets/hero/cockroach_bait.jpg';
    }

    return {
      id: p.id,
      name: p.name,
      spec: p.parsedSpec ? `${p.parsedSpec.size_or_type || ''} ${p.parsedSpec.capacity_or_dim || ''} ${p.parsedSpec.quantity || ''}`.trim() : '',
      coverImg
    };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item && item.coverImg));

  // The reference uses 12 items, but we only have 8 in heroItems. Let's pad it out by repeating to match the 12 count if needed,
  // or just use 10 for mobile, 12 for desktop as per reference logic.
  // The reference: const mobile=w<600, n=mobile?10:12;
  const w = dimensions.w;
  const h = dimensions.h;
  // Improved mobile detection: use window.innerWidth as fallback if w is not yet measured
  const currentW = w || (typeof window !== 'undefined' ? window.innerWidth : 0);
  const mobile = currentW > 0 && currentW < 600;
  const n = mobile ? 6 : 10;
  
  // Pad items to length 10 by repeating
  const displayItems = heroItems.length > 0 
    ? Array.from({ length: 10 }, (_, i) => heroItems[i % heroItems.length])
    : [];

  const togglePause = () => {
    setIsPaused(!isPaused);
    lastTimeRef.current = 0;
  };

  // Rendering logic derived directly from reference render()
  const renderCards = () => {
    if (w === 0 || h === 0) return null;
    
    const TAU = Math.PI * 2;
    const tilts = [-5, 3, -2, 4, -3, 2, -4, 3, -2, 5, -3, 2];
    
    // The ellipse is tilted in screen space; depth faces the lower-right foreground.
    const rx = mobile ? w * 0.38 : w * 0.385; // slightly taller on mobile relative to width
    const ry = mobile ? Math.max(200, h * 0.4) : h * 0.335; // taller orbit for mobile
    const tilt = mobile ? -0.12 : -0.30; // user requested -0.12 rad (~ -7 deg) for mobile
    
    // The original base size was for 16:10 canvases (600x375). 
    // We are using 1:1 squares now. For mobile, user requested Math.max(72, Math.min(94, w * 0.225))
    const base = mobile ? Math.max(72, Math.min(94, w * 0.225)) : Math.min(148, w * 0.11);

    return displayItems.map((item, i) => {
      if (i >= n) return null; // hide items beyond n
      
      const theta = phaseState + (i * TAU) / n;
      const x0 = rx * Math.cos(theta);
      const y0 = ry * Math.sin(theta);
      
      const x = w * 0.5 + x0 * Math.cos(tilt) - y0 * Math.sin(tilt);
      const y = h * 0.49 + x0 * Math.sin(tilt) + y0 * Math.cos(tilt);
      
      const depth = (Math.sin(theta + 0.62) + 1) / 2;
      
      // user requested for mobile: 0.82 + 0.33 * Math.pow(depth, 1.5)
      const scale = mobile 
        ? 0.82 + 0.33 * Math.pow(depth, 1.5)
        : 0.54 + 0.90 * Math.pow(depth, 1.5);
      
      // limit tilt angles for mobile as requested (±4 deg)
      const rollMultiplier = mobile ? 0.5 : 1;
      const pitchMultiplier = mobile ? 0.5 : 1;
      const yawMultiplier = mobile ? 0.5 : 1;

      const roll = (tilts[i] + 1.8 * Math.sin(theta)) * rollMultiplier;
      const pitch = (-3 * Math.sin(theta)) * pitchMultiplier;
      const yaw = (6 * Math.cos(theta)) * yawMultiplier;
      
      const zIndexBase = mobile ? Math.round(depth * 5) : Math.round(10 + depth * 10);
      // Disable hover effect on mobile to prevent animation jittering/resetting
      const isThisHovered = !mobile && hoveredIndex === i;
      
      const finalZIndex = isThisHovered ? 200 : zIndexBase;
      
      // Calculate max allowed scale to stay within screen
      const maxScale = Math.min(
        (w * 0.95) / base, // Max 95% of width
        (h * 0.8) / base   // Max 80% of height
      );
      
      const finalScale = isThisHovered ? Math.min(maxScale, 2.0) : scale;
      const finalRoll = isThisHovered ? 0 : roll;
      const finalPitch = isThisHovered ? 0 : pitch;
      const finalYaw = isThisHovered ? 0 : yaw;

      // Adjust position if scaled item would go off-screen
      let finalX = x;
      let finalY = y;
      const isRightSide = x > w * 0.5;
      
      if (isThisHovered) {
        const expandedWidth = base * 1.9; // Reduced from 2.0 to 1.9
        const halfHeight = (base * finalScale) / 2;
        const padding = 40; // Increased padding from 20 to 40
        
        // Clamping logic considering the expanded width and direction
        if (isRightSide) {
          // Text is on the left, card extends from (finalX + base/2 - expandedWidth) to (finalX + base/2)
          const leftBound = finalX + (base/2) - expandedWidth;
          const rightBound = finalX + (base/2);
          if (leftBound < padding) finalX += (padding - leftBound);
          if (rightBound > w - padding) finalX -= (rightBound - (w - padding));
        } else {
          // Text is on the right, card extends from (finalX - base/2) to (finalX - base/2 + expandedWidth)
          const leftBound = finalX - (base/2);
          const rightBound = finalX - (base/2) + expandedWidth;
          if (leftBound < padding) finalX += (padding - leftBound);
          if (rightBound > w - padding) finalX -= (rightBound - (w - padding));
        }
        
        // Clamp Y
        if (finalY - halfHeight < padding) finalY = halfHeight + padding;
        if (finalY + halfHeight > h - padding) finalY = h - padding - halfHeight;
      }

      return (
        <div
          key={`${item.id}-${i}`}
          className="absolute top-0 left-0 pointer-events-auto"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            width: `${base}px`,
            height: `${base}px`,
            zIndex: finalZIndex,
            transform: `translate3d(${finalX}px,${finalY}px,0) translate(-50%,-50%) scale(${finalScale}) rotate(${finalRoll}deg) perspective(1100px) rotateX(${finalPitch}deg) rotateY(${finalYaw}deg)`,
            transition: mobile 
              ? 'none' // Disable transition on mobile to prevent shivering/jittering
              : (isThisHovered 
                  ? 'transform 0.3s ease-out, z-index 0.1s' 
                  : 'transform 0.5s ease-out, z-index 0.2s'),
            willChange: 'transform, z-index'
          }}
        >
          <Link
            to={`/products/${encodeURIComponent(item.id)}`}
            className={`absolute top-0 ${isRightSide ? 'right-0' : 'left-0'} h-full block bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 p-2 hover:border-primary-400 overflow-hidden shadow-2xl transition-all duration-300 ${isThisHovered ? (isRightSide ? 'flex flex-row-reverse items-center' : 'flex items-center') : ''}`}
            style={{
              width: isThisHovered ? `${base * 1.9}px` : '100%'
            }}
          >
            <div className={`${isThisHovered ? 'w-[42%] p-1 flex-shrink-0' : 'w-full h-full'}`}>
              <img 
                src={item.coverImg} 
                alt={item.name} 
                className={`w-full h-full object-contain transition-transform duration-300 ${isThisHovered ? 'scale-95' : 'scale-100'}`} 
              />
            </div>
            {isThisHovered && (
              <div className={`flex-1 px-3 py-2 ${isRightSide ? 'text-right' : 'text-left'} animate-in slide-in-from-${isRightSide ? 'right' : 'left'}-4 duration-300 flex flex-col justify-center min-w-0`}>
                <div className="text-slate-900 font-bold text-sm mb-0.5 leading-tight line-clamp-2">{item.name}</div>
                {item.spec && (
                  <div className="text-primary-600 font-semibold text-[10px] line-clamp-1">{item.spec}</div>
                )}
                <div className={`mt-3 inline-flex items-center text-[9px] text-primary-600 font-bold uppercase tracking-wider bg-primary-50 px-1.5 py-0.5 rounded w-fit ${isRightSide ? 'ml-auto' : ''}`}>
                  點擊詳情
                </div>
              </div>
            )}
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="relative w-full h-[90svh] min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-x-clip overflow-y-visible bg-slate-50/50">
      
      {/* Central Brand Text - Safely in the middle */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto flex flex-col items-center text-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[450px] p-3"
      >
        <h1 className="text-[32px] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-extrabold text-slate-900 mb-2 tracking-tight">
          {mobile ? (
            <>
              <div>侑安</div>
              <div>國際</div>
            </>
          ) : (
            <span className="whitespace-nowrap">侑安國際</span>
          )}
        </h1>
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-700 mb-4 whitespace-nowrap">
          包裝・清潔・日常耗材
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-[200px] sm:max-w-sm mx-auto">
          從日常備品到營業所需，找到合適的用品。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link 
            to="/products" 
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-slate-900 text-white text-sm sm:text-base font-bold rounded-full hover:bg-slate-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
          >
            瀏覽全部商品
          </Link>
          <a 
            href="https://line.me/R/ti/p/%40593cexey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-slate-900 text-sm sm:text-base font-bold rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition shadow-sm hover:shadow text-center"
          >
            LINE 聯絡詢價
          </a>
        </div>
      </div>

      {/* The Orbit Scene Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 pointer-events-none"
        onMouseEnter={() => !mobile && setIsHovered(true)}
        onMouseLeave={() => !mobile && setIsHovered(false)}
        onFocus={() => !mobile && setIsHovered(true)}
        onBlur={() => !mobile && setIsHovered(false)}
      >
        {renderCards()}
      </div>

      {/* Animation Controls (Desktop only) */}
      {!mobile && (
        <button 
          onClick={togglePause}
          className="absolute bottom-8 right-8 z-20 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm border border-slate-200 transition focus:outline-none"
          title={isPaused ? "播放動畫" : "暫停動畫"}
        >
          {isPaused ? <Play className="w-4 h-4 ml-0.5" /> : <Pause className="w-4 h-4" />}
        </button>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 animate-bounce z-20">
        <span className="text-xs font-medium uppercase tracking-widest mb-1">探索產品</span>
        <div className="w-px h-6 bg-slate-300"></div>
      </div>
    </div>
  );
}

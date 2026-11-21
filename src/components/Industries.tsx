import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';
import healthcareImg from '../assets/7ad4fbdb-864c-4c5e-90f4-9b5fd2d5fe2f.webp';

interface IndustriesProps {
  onOpenBooking?: () => void;
}

interface IndustryItem {
  id: string;
  name: string;
  bgText: string;
  category: string;
  metric: string;
  src: string;
  fallbackSrc: string;
  accent: string;
  panel: string;
}

const ALL_INDUSTRIES: IndustryItem[] = [
  {
    id: 'real-estate',
    name: 'REAL ESTATE & PROPTECH',
    bgText: 'REAL ESTATE',
    category: 'PropTech & Infrastructure',
    metric: '₹180Cr+ Asset Sales • 14.2X Pipeline',
    src: '/industries/1.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    accent: '#F4845F',
    panel: '#F79B7F',
  },
  {
    id: 'agriculture',
    name: 'AGRICULTURE & AGRITECH',
    bgText: 'AGRICULTURE',
    category: 'AgriTech & Smart Farming',
    metric: '350K+ Farmers • 3.4X Yield Output',
    src: '/industries/2.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    accent: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'ecommerce',
    name: 'E-COMMERCE & D2C BRANDS',
    bgText: 'E-COMMERCE',
    category: 'Retail & Multi-Channel',
    metric: '4.8X ROAS Surge • 2.4M+ Orders',
    src: '/industries/3.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    accent: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    id: 'hospitality',
    name: 'HOSPITALITY & TOURISM',
    bgText: 'HOSPITALITY',
    category: 'Hotels, Resorts & Tourism',
    metric: '92% Direct Bookings • 5.8X ROI',
    src: '/industries/4.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    accent: '#6EB5FF',
    panel: '#8DC4FF',
  },
  {
    id: 'textiles',
    name: 'TEXTILES & APPAREL',
    bgText: 'TEXTILES',
    category: 'Fashion & Global Supply',
    metric: '₹65Cr+ Export Demand • 18 Markets',
    src: '/industries/1.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png',
    accent: '#F97316',
    panel: '#FDBA74',
  },
  {
    id: 'healthcare',
    name: 'HEALTHCARE & MEDTECH',
    bgText: 'HEALTHCARE',
    category: 'MedTech & Specialty Care',
    metric: '82% Lower CAC • 35,000+ Consults',
    src: healthcareImg,
    fallbackSrc: '/industries/healthcare.png',
    accent: '#10B981',
    panel: '#6EE7B7',
  },
  {
    id: 'fintech',
    name: 'FINTECH & FINANCIAL',
    bgText: 'FINTECH',
    category: 'Banking & WealthTech',
    metric: '₹450Cr+ Disbursals • 99.4% KYC',
    src: '/industries/4.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    accent: '#3d6ab3',
    panel: '#93C5FD',
  },
  {
    id: 'automobile',
    name: 'AUTOMOBILE & EV MOBILITY',
    bgText: 'AUTOMOBILE',
    category: 'EVs & Dealership Networks',
    metric: '45K+ Test Drives • 6.2X Leads',
    src: '/industries/3.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png',
    accent: '#EF4444',
    panel: '#FCA5A5',
  },
  {
    id: 'education',
    name: 'EDUCATION & EDTECH',
    bgText: 'EDUCATION',
    category: 'EdTech & Learning Platforms',
    metric: '1.2M+ Students • 88% Retention',
    src: '/industries/2.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png',
    accent: '#06B6D4',
    panel: '#67E8F9',
  },
  {
    id: 'saas',
    name: 'SAAS & CLOUD PLATFORMS',
    bgText: 'SAAS TECH',
    category: 'Enterprise B2B Software',
    metric: '120+ SQLs/Mo • 4.1X ARR Expansion',
    src: '/industries/4.png',
    fallbackSrc: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png',
    accent: '#1e4587',
    panel: '#60A5FA',
  },
];

export const Industries: React.FC<IndustriesProps> = ({ onOpenBooking }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isAutoScrollingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  // Resize listener for mobile responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload images on mount
  useEffect(() => {
    ['/industries/1.png', '/industries/2.png', '/industries/3.png', '/industries/4.png', healthcareImg].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Set active industry index smoothly
  const goToIndex = useCallback((idx: number, scrollPage = false) => {
    const total = ALL_INDUSTRIES.length;
    const nextIdx = (idx + total) % total;
    activeIndexRef.current = nextIdx;
    setActiveIndex(nextIdx);

    if (scrollPage && trackRef.current) {
      isAutoScrollingRef.current = true;
      const track = trackRef.current;
      const scrollableDist = track.offsetHeight - window.innerHeight;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const navbarHeight = isMobile ? 68 : 74;
      const targetScrollY = Math.max(0, trackTop - navbarHeight + (nextIdx / (total - 1)) * scrollableDist);
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 500);
    }
  }, [isMobile]);

  const navigate = useCallback(
    (dir: 'next' | 'prev') => {
      const total = ALL_INDUSTRIES.length;
      const nextIdx = dir === 'next' ? (activeIndex + 1) % total : (activeIndex - 1 + total) % total;
      goToIndex(nextIdx, true);
    },
    [activeIndex, goToIndex]
  );

  // Sticky Scroll Behavior: Sticks section until all 10 industries are visited
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrollingRef.current) return;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollableDist = track.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) return;

      // When track is within sticky scroll bounds (accounting for navbar height)
      const navbarHeight = isMobile ? 68 : 74;
      if (rect.top <= navbarHeight + 10 && rect.bottom >= window.innerHeight - 10) {
        const progress = Math.min(0.999, Math.max(0, (navbarHeight - rect.top) / scrollableDist));
        const total = ALL_INDUSTRIES.length;
        const targetIdx = Math.min(total - 1, Math.floor(progress * total));
        if (targetIdx !== activeIndexRef.current) {
          activeIndexRef.current = targetIdx;
          setActiveIndex(targetIdx);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) navigate('next');
      else navigate('prev');
    }
    touchStartXRef.current = null;
  };

  const activeItem = ALL_INDUSTRIES[activeIndex];

  // Continuous 3D Circular Positioning & Transitions across all N industries
  const getStyleForIndex = (i: number) => {
    const total = ALL_INDUSTRIES.length;
    let diff = i - activeIndex;
    const half = total / 2;
    while (diff > half) diff -= total;
    while (diff < -half) diff += total;

    // Center active hero figurine
    if (diff === 0) {
      return {
        transform: `translateX(-50%) scale(${isMobile ? 1.08 : 1.2})`,
        transformOrigin: 'bottom center',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 30,
        left: '50%',
        height: isMobile ? '55%' : '73%',
        bottom: isMobile ? '110px' : '44px',
        pointerEvents: 'auto' as const,
      };
    }

    // Immediate left flank
    if (diff === -1) {
      return {
        transform: 'translateX(-50%) scale(1)',
        transformOrigin: 'bottom center',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 20,
        left: isMobile ? '18%' : '26%',
        height: isMobile ? '18%' : '27%',
        bottom: isMobile ? '125px' : '58px',
        pointerEvents: 'auto' as const,
      };
    }

    // Immediate right flank
    if (diff === 1) {
      return {
        transform: 'translateX(-50%) scale(1)',
        transformOrigin: 'bottom center',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 20,
        left: isMobile ? '82%' : '74%',
        height: isMobile ? '18%' : '27%',
        bottom: isMobile ? '125px' : '58px',
        pointerEvents: 'auto' as const,
      };
    }

    // Far left depth position
    if (diff === -2) {
      return {
        transform: 'translateX(-50%) scale(0.85)',
        transformOrigin: 'bottom center',
        filter: 'blur(4px)',
        opacity: 0.45,
        zIndex: 10,
        left: isMobile ? '6%' : '14%',
        height: isMobile ? '14%' : '20%',
        bottom: isMobile ? '140px' : '78px',
        pointerEvents: 'auto' as const,
      };
    }

    // Far right depth position
    if (diff === 2) {
      return {
        transform: 'translateX(-50%) scale(0.85)',
        transformOrigin: 'bottom center',
        filter: 'blur(4px)',
        opacity: 0.45,
        zIndex: 10,
        left: isMobile ? '94%' : '86%',
        height: isMobile ? '14%' : '20%',
        bottom: isMobile ? '140px' : '78px',
        pointerEvents: 'auto' as const,
      };
    }

    // Distant background positions (seamlessly hidden)
    return {
      transform: 'translateX(-50%) scale(0.6)',
      transformOrigin: 'bottom center',
      filter: 'blur(6px)',
      opacity: 0,
      zIndex: 1,
      left: diff < 0 ? '5%' : '95%',
      height: '14%',
      bottom: '14%',
      pointerEvents: 'none' as const,
    };
  };

  return (
    /* Outer Scroll Track: 220vh gives a compact, smooth sticky scroll without excessive height */
    <section
      id="industries"
      ref={trackRef}
      style={{ height: '220vh' }}
      className="relative w-full bg-white text-[#0f172a]"
    >
      {/* Pinned Sticky Stage: sticks right below the fixed navbar (top: 74px) and fills to the exact bottom of viewport (calc(100vh - 74px)), removing any gap at the bottom while keeping the header part fully visible */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          fontFamily: "'Inter', sans-serif",
          position: 'sticky',
          top: isMobile ? '68px' : '74px',
          height: isMobile ? 'calc(100svh - 68px)' : 'calc(100vh - 74px)',
          minHeight: '560px',
        }}
        className="relative w-full overflow-hidden flex flex-col justify-between select-none"
      >
        {/* Subtle Ambient Radial Glow matching the Active Item's Accent Color */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700 ease-out"
          style={{
            background: `radial-gradient(circle 850px at 50% 65%, ${activeItem.accent}14 0%, transparent 70%)`,
          }}
        />

        {/* 1. Grain Overlay (SVG fractalNoise) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.12,
            backgroundSize: '200px 200px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 2. Top Header Bar & Quick Industry Pill Navigation */}
        <header
          className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-3.5 sm:pt-5 flex items-center justify-between gap-4"
          style={{ zIndex: 60 }}
        >
          {/* Top Left: Clean Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#03063A]/5 text-[#03063A] border border-[#03063A]/10">
              <Sparkles size={12} className="text-[#fdcf09]" />
              INDUSTRIES WE SCALE
            </span>
          </div>

          {/* Top Right: Scrollable Quick Industry Tab Switcher */}
          <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-[70%] sm:max-w-[75%]">
            {ALL_INDUSTRIES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => goToIndex(idx, true)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#0f172a] text-white shadow-md shadow-[#0f172a]/15 scale-105'
                      : 'bg-white/80 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                  aria-label={`Select ${item.name}`}
                >
                  <span className="font-mono text-[10px] opacity-70 mr-1">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="font-semibold">{item.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* 3. Buttery-Smooth Continuous 3D Carousel Stage */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {ALL_INDUSTRIES.map((item, i) => {
            const itemStyle = getStyleForIndex(i);
            const isHero = i === activeIndex;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isHero) goToIndex(i, true);
                }}
                className={`absolute cursor-pointer ${
                  isHero ? 'cursor-default' : 'hover:opacity-95'
                }`}
                style={{
                  aspectRatio: '0.6 / 1',
                  left: itemStyle.left,
                  bottom: itemStyle.bottom,
                  height: itemStyle.height,
                  transform: itemStyle.transform,
                  transformOrigin: itemStyle.transformOrigin || 'bottom center',
                  filter: itemStyle.filter,
                  opacity: itemStyle.opacity,
                  zIndex: itemStyle.zIndex,
                  pointerEvents: itemStyle.pointerEvents,
                  transition:
                    'transform 480ms cubic-bezier(0.16, 1, 0.3, 1), left 480ms cubic-bezier(0.16, 1, 0.3, 1), filter 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 380ms ease, height 480ms ease, bottom 480ms ease',
                  willChange: 'transform, left, filter, opacity, height, bottom',
                }}
              >
                {/* Background Text ONLY for the middle (active center) card */}
                {isHero && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none font-['Anton'] uppercase text-center transition-all duration-480 ease-out"
                    style={{
                      top: isMobile ? '10%' : '12%',
                      fontSize: isMobile ? '78px' : '160px',
                      lineHeight: 0.88,
                      letterSpacing: '-0.02em',
                      whiteSpace: 'nowrap',
                      color: 'rgba(30, 80, 185, 0.22)',
                      textShadow:
                        '0 0 45px rgba(37, 99, 235, 0.32), 0 0 90px rgba(59, 130, 246, 0.18)',
                      zIndex: 1,
                    }}
                  >
                    {item.bgText}
                  </div>
                )}

                {/* 3D Character Figurine Image */}
                <img
                  src={item.src}
                  alt={item.name}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== item.fallbackSrc) {
                      target.src = item.fallbackSrc;
                    }
                  }}
                  draggable={false}
                  className="relative w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                  style={{ zIndex: 2 }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Streamlined Bottom Row (Reduced Left Side Content) */}
        <footer
          className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-8 pb-3.5 sm:pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3"
          style={{ zIndex: 60 }}
        >
          {/* Reduced & Streamlined Left Side */}
          <div className="w-full sm:max-w-[400px]">
            <div className="transition-all duration-300 ease-out" key={activeItem.id}>
              {/* Category chip */}
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: activeItem.accent }}
                />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} // {activeItem.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-['Anton'] text-[28px] sm:text-[36px] leading-[1.08] text-[#0f172a] tracking-wide mb-1.5">
                {activeItem.name}
              </h3>

              {/* Compact Metric Tag */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200/70 text-[11px] font-semibold text-slate-700 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fdcf09]" />
                {activeItem.metric}
              </div>
            </div>

            {/* Circular Navigation Buttons + Step Tracker */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('prev')}
                aria-label="Previous Industry"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-slate-300 hover:border-[#0f172a] hover:bg-[#0f172a] text-[#0f172a] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                <ArrowLeft size={20} strokeWidth={2.25} />
              </button>

              <button
                type="button"
                onClick={() => navigate('next')}
                aria-label="Next Industry"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#0f172a] bg-[#0f172a] hover:bg-[#3d6ab3] hover:border-[#3d6ab3] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                <ArrowRight size={20} strokeWidth={2.25} />
              </button>

              {/* Visited Progress Indicator */}
              <div className="flex items-center gap-1 ml-2">
                {ALL_INDUSTRIES.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    onClick={() => goToIndex(dotIdx, true)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === activeIndex
                        ? 'w-5 bg-[#0f172a]'
                        : dotIdx < activeIndex
                        ? 'w-1.5 bg-[#fdcf09]'
                        : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Industry ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Right: Clean Explore Button */}
          <div className="self-end sm:self-auto flex items-center">
            <button
              type="button"
              onClick={onOpenBooking}
              aria-label="Explore Industry"
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#fdcf09] hover:bg-[#ffe043] text-[#03063A] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Explore</span>
              <span className="w-6 h-6 rounded-full bg-[#03063A] text-white flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </footer>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Industries;

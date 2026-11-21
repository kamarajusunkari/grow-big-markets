import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Menu, X } from 'lucide-react';
import growBigPrimary from '../assets/Growbig Primary.png';

interface HeroProps {
  onOpenBooking: () => void;
}

interface SlotData {
  word: string;
  icon: string;
  tint: string;
}

// 4 Marketing verbs with matching 3D glossy icons and color tints
const SLOTS: SlotData[] = [
  {
    word: 'Scale Faster',
    icon: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d952211-0474-48cc-af48-58f68b3b7525.webp', // 4-pointed sparkle star
    tint: '#F2772F', // peach & apricot
  },
  {
    word: 'Convert Better',
    icon: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e2e91fca-5b3f-4e0e-a437-8a581592e407.webp', // $ coin with cycling arrows
    tint: '#3FB874', // warm sage mint
  },
  {
    word: 'Engage Deeper',
    icon: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/83de7c35-dd91-4e56-bfb8-0ffafc83d0e0.webp', // chat bubble with embossed dots
    tint: '#E9C22E', // lemon cream
  },
  {
    word: 'Rank Higher',
    icon: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/6b32bb47-4ad6-4938-a637-c997b373c68b.webp', // globe of rounded cells
    tint: '#C564C4', // rose lilac
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const iconWrapperRef = useRef<HTMLDivElement>(null);
  const iconImgRef = useRef<HTMLImageElement>(null);
  const iconTintRef = useRef<HTMLDivElement>(null);
  const wordTextRef = useRef<HTMLSpanElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Preload all 4 3D icons to eliminate any flicker
    SLOTS.forEach((slot) => {
      const img = new Image();
      img.src = slot.icon;
    });

    const TOTAL_PERIOD = 7000; // 4 * 1.75s = 7000ms
    const SLOT_DURATION = 1750; // 1.75s per word
    const CROSSFADE_WINDOW = 770; // 0.77s straddling word change
    const halfWindow = CROSSFADE_WINDOW / 2; // 385ms

    // Seekable Web Animation master clock
    const clockAnim = document.documentElement.animate(
      [{ opacity: 1 }, { opacity: 1 }],
      { duration: TOTAL_PERIOD, iterations: Infinity }
    );

    let currentActiveSlotIndex = -1;
    let animFrameId: number;

    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const easeInCubic = (x: number) => x * x * x;
    const smoothStep = (x: number) => {
      const c = Math.max(0, Math.min(1, x));
      return c * c * (3 - 2 * c);
    };

    const renderFrame = () => {
      const rawTime = clockAnim.currentTime ? Number(clockAnim.currentTime) : 0;
      const tGlobal = rawTime % TOTAL_PERIOD;
      const slotIndex = Math.floor(tGlobal / SLOT_DURATION);
      const tLocal = tGlobal % SLOT_DURATION;
      const currentSlot = SLOTS[slotIndex];

      // Update content when word slot advances
      if (currentActiveSlotIndex !== slotIndex) {
        currentActiveSlotIndex = slotIndex;
        if (wordTextRef.current) wordTextRef.current.textContent = currentSlot.word;
        if (iconImgRef.current) iconImgRef.current.src = currentSlot.icon;
        if (iconTintRef.current) {
          iconTintRef.current.style.setProperty('--tint-current', currentSlot.tint);
          iconTintRef.current.style.maskImage = `url("${currentSlot.icon}")`;
          iconTintRef.current.style.webkitMaskImage = `url("${currentSlot.icon}")`;
        }
      }

      // Word & Icon timing
      let wordOpacity = 1;
      let wordY = 0;
      let wordBlur = 0;
      let wordScale = 1;

      let iconOpacity = 1;
      let iconScale = 1;
      let iconRot = 0;

      if (tLocal < 500) {
        // Enter (0.5s): opacity 0->1, rise +0.32em, blur 10px->0, scale 0.96->1
        const p = easeOutCubic(tLocal / 500);
        wordOpacity = p;
        wordY = (1 - p) * 0.32;
        wordBlur = (1 - p) * 10;
        wordScale = 0.96 + 0.04 * p;

        // Icon follows 60ms later, scales 0.7->1, untwists from -14deg
        if (tLocal < 60) {
          iconOpacity = 0;
          iconScale = 0.7;
          iconRot = -14;
        } else {
          const pIcon = easeOutCubic((tLocal - 60) / 440);
          iconOpacity = pIcon;
          iconScale = 0.7 + 0.3 * pIcon;
          iconRot = -14 * (1 - pIcon);
        }
      } else if (tLocal >= 1330) {
        // Leave (last 0.42s): fade out, drift up 0.16em, blur to 8px
        const pLeave = easeInCubic((tLocal - 1330) / 420);
        wordOpacity = 1 - pLeave;
        wordY = -0.16 * pLeave;
        wordBlur = pLeave * 8;
        wordScale = 1;

        iconOpacity = 1 - pLeave;
        iconScale = 1;
        iconRot = 0;
      }

      // Idle Motion: icon gently floats (±0.028em, ±3°)
      const floatY = Math.sin((tGlobal / 2800) * 2 * Math.PI) * 0.028;
      const floatRot = Math.cos((tGlobal / 3200) * 2 * Math.PI) * 3;

      if (wordTextRef.current) {
        wordTextRef.current.style.opacity = wordOpacity.toFixed(4);
        wordTextRef.current.style.transform = `translate3d(0, ${wordY.toFixed(4)}em, 0) scale(${wordScale.toFixed(4)})`;
        wordTextRef.current.style.filter = wordBlur > 0.05 ? `blur(${wordBlur.toFixed(2)}px)` : 'none';
      }

      if (iconWrapperRef.current) {
        const totalIconY = wordY + floatY;
        const totalIconRot = iconRot + floatRot;
        iconWrapperRef.current.style.opacity = iconOpacity.toFixed(4);
        iconWrapperRef.current.style.transform = `translate3d(0, ${totalIconY.toFixed(4)}em, 0) rotate(${totalIconRot.toFixed(2)}deg) scale(${iconScale.toFixed(4)})`;
        iconWrapperRef.current.style.filter = wordBlur > 0.05 ? `blur(${wordBlur.toFixed(2)}px)` : 'none';
      }

      // Panel gradient crossfade over 0.77s straddling word change
      const opacities = [0, 0, 0, 0];
      if (tLocal < halfWindow) {
        const prevSlot = (slotIndex - 1 + 4) % 4;
        const progress = smoothStep((tLocal + halfWindow) / CROSSFADE_WINDOW);
        opacities[prevSlot] = 1 - progress;
        opacities[slotIndex] = progress;
      } else if (tLocal > SLOT_DURATION - halfWindow) {
        const nextSlot = (slotIndex + 1) % 4;
        const progress = smoothStep((tLocal - (SLOT_DURATION - halfWindow)) / CROSSFADE_WINDOW);
        opacities[slotIndex] = 1 - progress;
        opacities[nextSlot] = progress;
      } else {
        opacities[slotIndex] = 1;
      }

      // Slow Idle Drift for Gradients (±2.2% / ±1.6% at scale 1.08)
      for (let i = 0; i < 4; i++) {
        const el = layerRefs.current[i];
        if (el) {
          const phase = (i * Math.PI) / 2;
          const driftX = Math.sin((tGlobal / 6000) * 2 * Math.PI + phase) * 2.2;
          const driftY = Math.cos((tGlobal / 6000) * 2 * Math.PI + phase) * 1.6;
          el.style.opacity = opacities[i].toFixed(4);
          el.style.transform = `scale(1.08) translate3d(${driftX.toFixed(2)}%, ${driftY.toFixed(2)}%, 0)`;
        }
      }

      // Action button flash while "Rank" holds (slot 3 between ~5780ms and ~6460ms)
      const isHoldFlash = tGlobal >= 5780 && tGlobal <= 6460;
      if (primaryBtnRef.current) {
        if (isHoldFlash) {
          primaryBtnRef.current.classList.add('flash-active');
        } else {
          primaryBtnRef.current.classList.remove('flash-active');
        }
      }

      animFrameId = requestAnimationFrame(renderFrame);
    };

    animFrameId = requestAnimationFrame(renderFrame);

    // Pause on hidden tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clockAnim.pause();
      } else {
        clockAnim.play();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Reduced motion support (still Scale state)
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = () => {
      if (reducedMotionQuery.matches) {
        clockAnim.currentTime = 875;
        clockAnim.pause();
      } else {
        clockAnim.play();
      }
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotion);
    handleReducedMotion();

    return () => {
      cancelAnimationFrame(animFrameId);
      clockAnim.cancel();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotion);
    };
  }, []);

  return (
    <section id="hero" className="vela-hero-root">
      {/* Hidden SVG Filter for Fractal Noise Grain */}
      <svg className="grain-overlay" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-filter-react">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.18 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter-react)" />
      </svg>

      <div className="vela-viewport">
        {/* ===================================================================
            HERO PANEL (TOP 75%)
            =================================================================== */}
        <div className="vela-panel">
          {/* Stacked Gradient Layers (Scale / Convert / Engage / Rank) */}
          <div className="gradient-stack">
            <div
              ref={(el) => { layerRefs.current[0] = el; }}
              className="gradient-layer layer-browse"
            />
            <div
              ref={(el) => { layerRefs.current[1] = el; }}
              className="gradient-layer layer-transact"
            />
            <div
              ref={(el) => { layerRefs.current[2] = el; }}
              className="gradient-layer layer-message"
            />
            <div
              ref={(el) => { layerRefs.current[3] = el; }}
              className="gradient-layer layer-build"
            />
          </div>

          {/* =================================================================
              HEADER (Vela 80u Style with Grow Big Marketers Logo & Menu)
              ================================================================= */}
          <header className="vela-nav" aria-label="Main Navigation">
            {/* Left: Grow Big Marketers Logo */}
            <a href="#hero" className="vela-nav-left" title="Grow Big Marketers">
              <img
                src={growBigPrimary}
                alt="Grow Big Marketers Logo"
                className="vela-logo-img"
              />
            </a>

            {/* Right: Marketing Agency Menu Links + Contact CTA */}
            <div className="vela-nav-right">
              <nav className="vela-nav-links">
                <a href="#hero" className="vela-nav-item">
                  Home
                </a>
                <a href="#services" className="vela-nav-item">
                  Services
                  <svg className="vela-nav-chevron" viewBox="0 0 8 5">
                    <path d="M1 1l3 3 3-3" />
                  </svg>
                </a>
                <a href="#process" className="vela-nav-item">
                  Our Process
                  <svg className="vela-nav-chevron" viewBox="0 0 8 5">
                    <path d="M1 1l3 3 3-3" />
                  </svg>
                </a>
                <a href="#portfolio" className="vela-nav-item">
                  Portfolio
                  <svg className="vela-nav-chevron" viewBox="0 0 8 5">
                    <path d="M1 1l3 3 3-3" />
                  </svg>
                </a>
                <a href="#faq" className="vela-nav-item">
                  Contact
                  <svg className="vela-nav-chevron" viewBox="0 0 8 5">
                    <path d="M1 1l3 3 3-3" />
                  </svg>
                </a>
              </nav>

              {/* Contact Button */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="btn-join-vela"
              >
                <span>Book a Call</span>
                <span className="btn-join-badge">
                  <ArrowUpRight className="vela-arrow-icon" />
                </span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="vela-mobile-toggle"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X size={26} color="#0D0D0C" /> : <Menu size={26} color="#0D0D0C" />}
              </button>
            </div>
          </header>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="vela-mobile-drawer">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="vela-mobile-link">Home</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="vela-mobile-link">Services</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="vela-mobile-link">Our Process</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="vela-mobile-link">Portfolio</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="vela-mobile-link">Contact</a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-join-vela"
                style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
              >
                <span>Book a Call</span>
                <span className="btn-join-badge">
                  <ArrowUpRight size={16} className="vela-arrow-icon" />
                </span>
              </button>
            </div>
          )}

          {/* Headline (left: 112u, top: 190u) */}
          <div className="vela-content">
            <h1 className="vela-headline">
              <div className="cycle-slot">
                {/* 3D Icon with Hue Tint Overlay */}
                <div ref={iconWrapperRef} className="icon-wrapper">
                  <img
                    ref={iconImgRef}
                    className="icon-img"
                    alt=""
                    src={SLOTS[0].icon}
                  />
                  <div ref={iconTintRef} className="icon-tint" />
                </div>

                {/* Cycling Marketing Verb */}
                <span ref={wordTextRef} className="word-text">
                  Scale Faster
                </span>
              </div>

              <span className="headline-fixed">than your competition</span>
            </h1>
          </div>

          {/* Hero Bottom Row (top: 578u) - Marketing Action Buttons & Agency Mission */}
          <div className="vela-row">
            <div className="store-buttons">
              {/* Primary Growth Button */}
              <button
                ref={primaryBtnRef}
                type="button"
                onClick={onOpenBooking}
                className="store-btn primary-action-btn"
              >
                <span>Book Strategy Call</span>
                <ArrowUpRight className="store-btn-icon" />
              </button>

              {/* Secondary Service Explorer Button */}
              <a
                href="#services"
                className="store-btn secondary-action-btn"
              >
                <span>Explore Services</span>
                <ArrowDown className="store-btn-icon" />
              </a>
            </div>

            <p className="vela-caption">
              Grow Big Marketers accelerates revenue with data-driven SEO, high-ROI{' '}
              Google & Meta PPC ads, and full-funnel scaling strategies.
            </p>
          </div>
        </div>

        {/* ===================================================================
            STATS STRIP (BOTTOM 25%) - MARKETING PERFORMANCE METRICS
            =================================================================== */}
        <div className="vela-stats-strip">
          {/* S-Curve Notch Header */}
          <div className="notch-wrapper">
            <svg
              className="notch-svg"
              viewBox="0 0 1440 62"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 62 H1062 C1092 62 1098 54 1116 34 C1138 9 1146 1 1178 1 H1440 V62 Z"
                fill="#FBF6EF"
              />
            </svg>
            <div className="scroll-hint">↓ Scroll to explore services</div>
          </div>

          {/* Stats Metrics Content */}
          <div className="stats-content">
            <div className="stats-lead-wrap">
              <div className="stats-lead">
                Revenue growth<br />engineered to scale
              </div>
            </div>

            <div className="stats-metrics">
              <div className="stat-item">
                <span className="stat-num">150+</span>
                <span className="stat-label">Brands Scaled</span>
              </div>

              <div className="stat-item">
                <span className="stat-num">4.8x</span>
                <span className="stat-label">Average ROAS on PPC</span>
              </div>

              <div className="stat-item">
                <span className="stat-num">$25M+</span>
                <span className="stat-label">Revenue Driven</span>
              </div>

              {/* 4th Item: Desktop Sprout Logo in 2x2 Grid */}
              <div className="stat-item stat-item-plant">
                <div className="sprout-container">
                  <svg className="sprout-svg" viewBox="0 0 44 44" aria-label="Organic Growth Icon">
                    <path d="M7 40 H37" />
                    <path d="M22 40 V18" />
                    <path d="M22 26 C22 26 12 24 12 14 C18 14 22 20 22 26 Z" />
                    <path d="M22 20 C22 20 32 18 32 8 C26 8 22 14 22 20 Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sprout Line-Art Icon (representing sustainable organic growth) */}
            <div className="sprout-container desktop-sprout">
              <svg className="sprout-svg" viewBox="0 0 44 44" aria-label="Organic Growth Icon">
                <path d="M7 40 H37" />
                <path d="M22 40 V18" />
                <path d="M22 26 C22 26 12 24 12 14 C18 14 22 20 22 26 Z" />
                <path d="M22 20 C22 20 32 18 32 8 C26 8 22 14 22 20 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .vela-hero-root {
          position: relative;
          width: 100%;
          background-color: #FBF6EF;
          color: #0D0D0C;
          font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow: hidden;
          --u: min(100vw / 1440, 100vh / 960);
          --ink: #0D0D0C;
          --ink-secondary: rgba(13, 13, 12, 0.56);
          --ink-hint: rgba(13, 13, 12, 0.42);
          --cream: #FBF6EF;
          --tint-message: #E9C22E;
          --tint-browse: #F2772F;
          --tint-transact: #3FB874;
          --tint-build: #C564C4;
        }

        .vela-viewport {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 720px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: var(--cream);
        }

        .vela-panel {
          position: relative;
          width: 100%;
          height: 75vh;
          overflow: hidden;
          z-index: 1;
        }

        .gradient-stack {
          position: absolute;
          inset: -5%;
          width: 110%;
          height: 110%;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          will-change: opacity, transform;
          transform-origin: center center;
        }

        .layer-message {
          background:
            radial-gradient(circle 52vw at 86% 76%, rgba(246, 222, 104, 0.88) 0%, rgba(246, 222, 104, 0) 65%),
            radial-gradient(circle 46vw at 32% 105%, rgba(246, 222, 104, 0.45) 0%, rgba(246, 222, 104, 0) 55%),
            linear-gradient(180deg, #F2ECDF 0%, #F4EBC6 100%);
        }

        .layer-browse {
          background:
            radial-gradient(circle 52vw at 86% 76%, rgba(249, 150, 84, 0.88) 0%, rgba(249, 150, 84, 0) 65%),
            radial-gradient(circle 46vw at 32% 105%, rgba(249, 150, 84, 0.45) 0%, rgba(249, 150, 84, 0) 55%),
            linear-gradient(180deg, #F8DCC7 0%, #F9CBA9 100%);
        }

        .layer-transact {
          background:
            radial-gradient(circle 52vw at 86% 76%, rgba(150, 206, 150, 0.88) 0%, rgba(150, 206, 150, 0) 65%),
            radial-gradient(circle 46vw at 32% 105%, rgba(150, 206, 150, 0.45) 0%, rgba(150, 206, 150, 0) 55%),
            linear-gradient(180deg, #E9EBE0 0%, #DFE9D4 100%);
        }

        .layer-build {
          background:
            radial-gradient(circle 52vw at 86% 76%, rgba(222, 150, 200, 0.88) 0%, rgba(222, 150, 200, 0) 65%),
            radial-gradient(circle 46vw at 32% 105%, rgba(222, 150, 200, 0.45) 0%, rgba(222, 150, 200, 0) 55%),
            linear-gradient(180deg, #F0E4E6 0%, #ECD6E2 100%);
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.18;
          mix-blend-mode: multiply;
          z-index: 1;
        }

        /* Header Navigation: 80u tall */
        .vela-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: calc(80 * var(--u));
          padding: 0 calc(112 * var(--u));
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(13, 13, 12, 0.08);
          z-index: 10;
        }

        .vela-nav-left {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--ink);
          transition: opacity 0.2s ease;
        }

        .vela-nav-left:hover {
          opacity: 0.8;
        }

        .vela-logo-img {
          height: calc(52 * var(--u));
          max-height: 60px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .vela-nav-right {
          display: flex;
          align-items: center;
          gap: calc(38 * var(--u));
        }

        .vela-nav-links {
          display: flex;
          align-items: center;
          gap: calc(32 * var(--u));
        }

        .vela-nav-item {
          display: inline-flex;
          align-items: center;
          gap: calc(6 * var(--u));
          font-size: calc(17 * var(--u));
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.15s ease;
          position: relative;
        }

        .vela-nav-item:hover {
          color: #3d6ab3;
          opacity: 1;
        }

        .vela-nav-item:hover .vela-nav-chevron {
          stroke: #3d6ab3;
        }

        .vela-nav-chevron {
          width: calc(8 * var(--u));
          height: calc(8 * var(--u));
          stroke: var(--ink);
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          transform: translateY(calc(1 * var(--u)));
          transition: stroke 0.2s ease;
        }

        .btn-join-vela {
          height: calc(48 * var(--u));
          padding: 0 calc(6 * var(--u)) 0 calc(20 * var(--u));
          border: 1.5px solid #3d6ab3;
          border-radius: calc(9999 * var(--u));
          background: #3d6ab3;
          color: #ffffff;
          font-size: calc(15.5 * var(--u));
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: calc(10 * var(--u));
          text-decoration: none;
          box-shadow: 0 calc(4 * var(--u)) calc(16 * var(--u)) rgba(61, 106, 179, 0.35);
        }

        .btn-join-badge {
          width: calc(34 * var(--u));
          height: calc(34 * var(--u));
          border-radius: 50%;
          background: #fdcf09;
          color: #0f172a;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background-color 0.2s ease;
          flex-shrink: 0;
        }

        .btn-join-vela .vela-arrow-icon {
          width: calc(16 * var(--u));
          height: calc(16 * var(--u));
          stroke: #0f172a;
          stroke-width: 2.5;
          transition: transform 0.2s ease;
        }

        .btn-join-vela:hover {
          background-color: #294f8d;
          border-color: #294f8d;
          transform: translateY(-2px);
          box-shadow: 0 calc(6 * var(--u)) calc(22 * var(--u)) rgba(61, 106, 179, 0.45), 0 0 calc(12 * var(--u)) rgba(253, 207, 9, 0.3);
        }

        .btn-join-vela:hover .btn-join-badge {
          transform: scale(1.08) translate(1px, -1px);
          background-color: #ffe043;
        }

        .vela-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--ink);
          cursor: pointer;
          padding: 6px;
        }

        .vela-mobile-drawer {
          display: none;
        }

        .vela-content {
          position: absolute;
          left: calc(112 * var(--u));
          top: calc(190 * var(--u));
          z-index: 5;
        }

        .vela-headline {
          font-size: calc(154 * var(--u));
          line-height: 0.9;
          letter-spacing: -0.032em;
          color: var(--ink);
          margin: 0;
          padding: 0;
        }

        .cycle-slot {
          display: flex;
          align-items: center;
          gap: calc(24 * var(--u));
          white-space: nowrap;
          font-size: 1.2em; /* increased changing text size */
          font-weight: 600;
          letter-spacing: -0.035em;
          margin-bottom: calc(8 * var(--u));
        }

        .icon-wrapper {
          position: relative;
          width: 1.12em;
          height: 1.12em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          vertical-align: middle;
          transform-origin: center center;
        }

        .icon-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: grayscale(1) brightness(1.1) contrast(1.08);
          display: block;
          pointer-events: none;
        }

        .icon-tint {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: var(--tint-current, var(--tint-browse));
          mix-blend-mode: color;
          pointer-events: none;
          mask-size: contain;
          mask-position: center;
          mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          -webkit-mask-position: center;
          -webkit-mask-repeat: no-repeat;
        }

        .word-text {
          display: inline-block;
          will-change: transform, opacity, filter;
        }

        .headline-fixed {
          display: block;
          white-space: nowrap;
          font-size: 0.9em;
          font-weight: 450;
          color: rgba(13, 13, 12, 0.9);
          letter-spacing: -0.028em;
        }

        .vela-row {
          position: absolute;
          left: calc(112 * var(--u));
          top: calc(578 * var(--u));
          display: flex;
          align-items: center;
          gap: calc(48 * var(--u));
          z-index: 5;
        }

        .store-buttons {
          display: flex;
          align-items: center;
          gap: calc(14 * var(--u));
        }

        .store-btn {
          height: calc(58 * var(--u));
          padding: 0 calc(24 * var(--u));
          border: 1.4px solid var(--ink);
          border-radius: calc(10 * var(--u));
          background: transparent;
          color: var(--ink);
          font-size: calc(17 * var(--u));
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: calc(8 * var(--u));
          text-decoration: none;
          transition: background-color 0.25s cubic-bezier(0.2, 0, 0, 1),
                      color 0.25s cubic-bezier(0.2, 0, 0, 1),
                      transform 0.15s ease,
                      box-shadow 0.2s ease;
        }

        .store-btn:hover {
          background-color: var(--ink);
          color: var(--cream);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(13, 13, 12, 0.12);
        }

        .store-btn.flash-active {
          background-color: var(--ink) !important;
          color: var(--cream) !important;
          transform: translateY(-2px);
        }

        .store-btn-icon {
          width: calc(18 * var(--u));
          height: calc(18 * var(--u));
          stroke-width: 2.2;
          transition: transform 0.2s ease;
        }

        .store-btn:hover .store-btn-icon {
          transform: translateY(-1px) translateX(1px);
        }

        .vela-caption {
          font-size: calc(18.5 * var(--u));
          line-height: 1.38;
          color: var(--ink-secondary);
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .vela-stats-strip {
          position: relative;
          width: 100%;
          height: 25vh;
          background-color: var(--cream);
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .notch-wrapper {
          position: absolute;
          bottom: 100%;
          left: 0;
          width: 100%;
          height: calc(62 * var(--u));
          pointer-events: none;
          line-height: 0;
        }

        .notch-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .scroll-hint {
          position: absolute;
          right: calc(112 * var(--u));
          bottom: calc(18 * var(--u));
          font-size: calc(15 * var(--u));
          font-weight: 500;
          color: var(--ink-hint);
          letter-spacing: -0.01em;
          pointer-events: auto;
        }

        .stats-content {
          position: relative;
          width: 100%;
          padding: 0 calc(112 * var(--u)) calc(44 * var(--u)) calc(112 * var(--u));
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: calc(40 * var(--u));
        }

        .stats-lead-wrap {
          display: flex;
          flex-direction: column;
          gap: calc(8 * var(--u));
        }

        .stats-pill {
          display: none;
        }

        .stat-item-plant {
          display: none;
        }

        .stats-lead {
          font-size: calc(29 * var(--u));
          font-weight: 500;
          line-height: 1.15;
          color: var(--ink);
          letter-spacing: -0.02em;
          min-width: calc(240 * var(--u));
        }

        .stats-metrics {
          display: flex;
          align-items: flex-end;
          gap: calc(64 * var(--u));
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: calc(4 * var(--u));
        }

        .stat-num {
          font-size: calc(54 * var(--u));
          font-weight: 500;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--ink);
        }

        .stat-label {
          font-size: calc(16.5 * var(--u));
          color: var(--ink-secondary);
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .sprout-container {
          display: flex;
          align-items: flex-end;
          padding-bottom: calc(6 * var(--u));
        }

        .sprout-svg {
          width: calc(44 * var(--u));
          height: calc(44 * var(--u));
          stroke: var(--ink);
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }

        @media (max-width: 1024px) {
          .vela-nav-links {
            gap: 18px;
          }
          .vela-nav-item {
            font-size: 15px;
          }
        }

        @media (max-width: 860px) {
          .vela-hero-root {
            --u: 1px;
          }

          .vela-viewport {
            height: auto;
            min-height: auto;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
          }

          .vela-panel {
            height: auto;
            min-height: auto;
            padding-bottom: 24px;
            overflow: hidden;
            width: 100%;
            max-width: 100%;
          }

          .vela-nav {
            position: relative;
            height: 70px;
            padding: 0 20px;
          }

          .vela-nav-links, .vela-nav-right .btn-join-vela {
            display: none;
          }

          .vela-mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .vela-mobile-drawer {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 20px 24px 28px 24px;
            background: #FBF6EF;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(13, 13, 12, 0.1);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
            max-height: calc(100vh - 70px);
            overflow-y: auto;
          }

          .vela-mobile-link {
            font-size: 17px;
            font-weight: 600;
            color: var(--ink);
            text-decoration: none;
            padding: 10px 0;
            border-bottom: 1px solid rgba(13, 13, 12, 0.06);
            display: block;
            transition: color 0.2s ease;
          }

          .vela-mobile-link:hover {
            color: #3d6ab3;
          }

          .vela-content {
            position: relative;
            left: 0;
            top: 0;
            padding: 106px 20px 0 20px;
          }

          .vela-headline {
            font-size: clamp(38px, 10.5vw, 56px);
            line-height: 1.04;
            letter-spacing: -0.03em;
          }

          .cycle-slot {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            font-size: 1.12em; /* refined slightly reduced changing text size */
            font-weight: 700;
            margin-bottom: 6px;
            white-space: normal;
          }

          .icon-wrapper {
            width: clamp(72px, 18vw, 94px);
            height: clamp(72px, 18vw, 94px);
            margin-bottom: 6px;
          }

          .word-text {
            display: inline-block;
            line-height: 1.04;
          }

          .headline-fixed {
            display: block;
            font-size: 0.85em; /* refined slightly reduced below text */
            line-height: 1.08;
          }

          .vela-row {
            position: relative;
            left: 0;
            top: 0;
            padding: 24px 20px 0 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .vela-caption {
            order: 1; /* Description comes FIRST */
            font-size: 15px;
            line-height: 1.5;
            color: var(--ink-secondary);
            margin: 0;
          }

          .vela-caption br {
            display: none;
          }

          .store-buttons {
            order: 2; /* Buttons come AFTER description */
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .store-btn {
            width: 100%;
            height: 52px;
            font-size: 15.5px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: left;
            padding: 0 20px;
            border-radius: 10px;
          }

          .store-btn span {
            text-align: left;
          }

          .vela-stats-strip {
            height: auto;
            padding-top: 16px;
            border-top: 1px solid rgba(13, 13, 12, 0.08);
          }

          .notch-wrapper {
            display: none;
          }

          .scroll-hint {
            display: none;
          }

          .stats-content {
            padding: 24px 20px 36px 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }

          .stats-lead-wrap {
            gap: 8px;
            width: 100%;
          }

          .stats-pill {
            display: none !important;
          }

          .stats-lead {
            font-size: 24px;
            font-weight: 700;
            line-height: 1.2;
            letter-spacing: -0.025em;
            color: var(--ink);
            min-width: 0;
            width: 100%;
          }

          /* 2x2 Grid with Plant Logo at 4th place */
          .stats-metrics {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px 16px;
          }

          .stat-item {
            gap: 4px;
            background: transparent;
            padding: 0;
            border: none;
            box-shadow: none;
          }

          .stat-item-plant {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            padding-top: 4px;
          }

          .stat-item-plant .sprout-container {
            display: flex;
            align-items: center;
            padding: 0;
          }

          .stat-item-plant .sprout-svg {
            width: 40px;
            height: 40px;
            stroke: var(--ink);
            stroke-width: 1.6;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
          }

          .stat-num {
            font-size: clamp(28px, 8vw, 36px);
            font-weight: 700;
            line-height: 1;
            letter-spacing: -0.03em;
            color: var(--ink);
          }

          .stat-label {
            font-size: 13px;
            line-height: 1.3;
            color: var(--ink-secondary);
            font-weight: 500;
          }

          .desktop-sprout {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

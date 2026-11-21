import React, { useState, useEffect, useRef } from 'react';
import growBigPrimary from '../assets/Growbig Primary.png';

interface FooterProps {
  onOpenBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'industries' | 'insights' | 'company' | 'connect'>('industries');
  const footerRef = useRef<HTMLElement>(null);

  // Entrance Web Animations sequence ~1.9s with 3s failsafe and gesture skip
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = footerRef.current;
    if (!container) return;

    let hasRun = false;
    const runEntrance = () => {
      if (hasRun) return;
      hasRun = true;

      const brandLogo = container.querySelector('.brand-identity');
      const brandHeadline = container.querySelector('.brand-headline');
      const brandBtn = container.querySelector('.brand-touch-btn');
      const linkCols = container.querySelectorAll('.link-col');
      const bottomRow = container.querySelector('.card-bottom-row');

      const easeOutCubic = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

      brandLogo?.animate([
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 350, easing: easeOutCubic, fill: 'forwards' });

      setTimeout(() => {
        brandHeadline?.animate([
          { opacity: 0, clipPath: 'inset(0 0 100% 0)', transform: 'translateY(18px)' },
          { opacity: 1, clipPath: 'inset(0 0 0% 0)', transform: 'translateY(0)' }
        ], { duration: 440, easing: easeOutCubic, fill: 'forwards' });
      }, 100);

      setTimeout(() => {
        brandBtn?.animate([
          { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
          { opacity: 1, transform: 'scale(1) translateY(0)' }
        ], { duration: 380, easing: easeOutCubic, fill: 'forwards' });
      }, 200);

      linkCols.forEach((col, idx) => {
        setTimeout(() => {
          col.animate([
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 400, easing: easeOutCubic, fill: 'forwards' });
        }, 280 + (idx * 80));
      });

      setTimeout(() => {
        bottomRow?.animate([
          { opacity: 0 },
          { opacity: 1 }
        ], { duration: 400, easing: 'ease', fill: 'forwards' });
      }, 650);
    };

    const failsafe = setTimeout(runEntrance, 3000);
    const skip = () => {
      clearTimeout(failsafe);
      runEntrance();
    };

    window.addEventListener('pointerdown', skip, { once: true });
    window.addEventListener('keydown', skip, { once: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runEntrance);
    } else {
      window.addEventListener('load', runEntrance);
    }

    return () => {
      clearTimeout(failsafe);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="nimbus-footer-section"
      aria-label="Grow Big Marketers Footer"
    >
      {/* Background Photographic Sky Layer */}
      <div className="sky-layer" aria-hidden="true" />

      {/* Background Striped Floor Layer */}
      <div className="floor-layer" aria-hidden="true" />

      {/* Fine SVG Noise Grain Overlay */}
      <svg className="grain-layer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="nimbus-noise-react">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.07 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#nimbus-noise-react)" />
      </svg>

      {/* =====================================================================
          FOOTER CARD (Square-cornered white, 48u margins, sitting right on floor)
          ===================================================================== */}
      <div className="card-outer-wrap">
        <div className="footer-card">
          {/* Top Row: Grid columns (Brand + 4 Link Columns) */}
          <div className="card-top-row">

            {/* Brand Column */}
            <div className="brand-col">
              <a href="#hero" className="brand-identity" title="Grow Big Marketers">
                <img
                  src={growBigPrimary}
                  alt="Grow Big Marketers"
                  className="brand-logo-mark"
                />
              </a>

              <div className="brand-headline-wrap">
                <h3 className="brand-headline">
                  The Performance Agency For High-Growth Digital Brands.
                </h3>
              </div>

              <button
                type="button"
                onClick={onOpenBooking}
                className="brand-touch-btn"
              >
                <span>Book Strategy Call</span>
                <span className="brand-touch-cap" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Mobile Tab Buttons (for phones ≤768px) */}
            <div className="mobile-tab-nav" role="tablist" aria-label="Footer Navigation Tabs">
              <button
                type="button"
                role="tab"
                id="tab-services"
                aria-controls="panel-services"
                aria-selected={activeMobileTab === 'industries'}
                className={`mobile-tab-btn ${activeMobileTab === 'industries' ? 'active' : ''}`}
                onClick={() => setActiveMobileTab('industries')}
              >
                Services
              </button>
              <button
                type="button"
                role="tab"
                id="tab-industries"
                aria-controls="panel-industries"
                aria-selected={activeMobileTab === 'insights'}
                className={`mobile-tab-btn ${activeMobileTab === 'insights' ? 'active' : ''}`}
                onClick={() => setActiveMobileTab('insights')}
              >
                Industries
              </button>
              <button
                type="button"
                role="tab"
                id="tab-company"
                aria-controls="panel-company"
                aria-selected={activeMobileTab === 'company'}
                className={`mobile-tab-btn ${activeMobileTab === 'company' ? 'active' : ''}`}
                onClick={() => setActiveMobileTab('company')}
              >
                Company
              </button>
              <button
                type="button"
                role="tab"
                id="tab-connect"
                aria-controls="panel-connect"
                aria-selected={activeMobileTab === 'connect'}
                className={`mobile-tab-btn ${activeMobileTab === 'connect' ? 'active' : ''}`}
                onClick={() => setActiveMobileTab('connect')}
              >
                Contact
              </button>
            </div>

            {/* Column 1: Core Marketing Services */}
            <div
              id="panel-services"
              className={`link-col ${activeMobileTab === 'industries' ? 'active' : ''}`}
              role="tabpanel"
              aria-labelledby="tab-services"
            >
              <h4 className="col-title">Services</h4>
              <ul className="link-list">
                <li className="link-item"><a href="#services">Performance Marketing (PPC)</a></li>
                <li className="link-item"><a href="#services">Search Engine Optimization (SEO)</a></li>
                <li className="link-item"><a href="#services">Social Media & Reels Scaling</a></li>
                <li className="link-item"><a href="#services">Conversion Rate Optimization (CRO)</a></li>
                <li className="link-item"><a href="#services">High-Converting Sales Funnels</a></li>
              </ul>
            </div>

            {/* Column 2: Industries */}
            <div
              id="panel-industries"
              className={`link-col ${activeMobileTab === 'insights' ? 'active' : ''}`}
              role="tabpanel"
              aria-labelledby="tab-industries"
            >
              <h4 className="col-title">Industries</h4>
              <ul className="link-list">
                <li className="link-item"><a href="#portfolio">Real Estate & PropTech</a></li>
                <li className="link-item"><a href="#portfolio">eCommerce & D2C Brands</a></li>
                <li className="link-item"><a href="#portfolio">Healthcare & MedTech</a></li>
                <li className="link-item"><a href="#portfolio">FinTech & Financial Services</a></li>
                <li className="link-item"><a href="#portfolio">Hospitality & Tourism</a></li>
              </ul>
            </div>

            {/* Column 3: Company & Process */}
            <div
              id="panel-company"
              className={`link-col ${activeMobileTab === 'company' ? 'active' : ''}`}
              role="tabpanel"
              aria-labelledby="tab-company"
            >
              <h4 className="col-title">Company</h4>
              <ul className="link-list">
                <li className="link-item"><a href="#hero">About Grow Big</a></li>
                <li className="link-item"><a href="#process">Our 4-Step Process</a></li>
                <li className="link-item"><a href="#portfolio">Client Case Studies</a></li>
                <li className="link-item">
                  <a
                    href="#faq"
                    onClick={(e) => {
                      if (onOpenBooking) {
                        e.preventDefault();
                        onOpenBooking();
                      }
                    }}
                  >
                    Schedule Strategy Call ↗
                  </a>
                </li>
                <li className="link-item"><a href="#faq">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Column 4: Direct Contact & Socials */}
            <div
              id="panel-connect"
              className={`link-col ${activeMobileTab === 'connect' ? 'active' : ''}`}
              role="tabpanel"
              aria-labelledby="tab-connect"
            >
              <h4 className="col-title">Contact</h4>
              <ul className="link-list">
                <li className="link-item">
                  <a href="tel:+919493898990">
                    <svg className="social-icon-glyph" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    <span>+91 9493898990</span>
                  </a>
                </li>
                <li className="link-item">
                  <a href="mailto:info@growbigmarketers.com">
                    <svg className="social-icon-glyph" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    <span>info@growbigmarketers.com</span>
                  </a>
                </li>
                <li className="link-item">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon-glyph" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li className="link-item">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon-glyph" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Card Bottom Row: 62u tall above a hairline */}
          <div className="card-bottom-row">
            <div className="bottom-legal-links">
              <a href="#">Privacy Policy</a>
              <span>·</span>
              <a href="#">Terms of Service</a>
              <span>·</span>
              <a href="#services">Free Marketing Audit</a>
              <span>·</span>
              <a href="tel:+919493898990">+91 9493898990</a>
            </div>
            <div className="bottom-copyright">
              © 2025 Grow Big Marketers. All rights reserved. Premier Digital Marketing & Scaling Agency.
            </div>
          </div>

        </div>
      </div>

      {/* NimbusOS Scoped Footer Styles */}
      <style>{`
        :root {
          --u: min(100vw / 1433, max(0.68px, 100vh / 1098));
          --brand-blue: #3d6ab3;
          --brand-blue-hover: #294f8d;
          --brand-yellow: #fdcf09;
          --bg-deep: #03063A;
          --ink: #000000;
          --muted-1: #4E4E51;
          --muted-2: #59595C;
          --border-rule: #E0E1E9;
          --card-bg: #FEFEFE;
        }

        .nimbus-footer-section {
          position: relative;
          width: 100%;
          min-height: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
          background-color: var(--bg-deep);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
          padding: calc(48 * var(--u)) 0 calc(48 * var(--u));
        }

        .sky-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4ec0de15-9d60-43b1-a76e-7d721f094fd6.jpg');
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 0;
        }

        .floor-layer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: calc(157.5 * var(--u));
          background-image: url('https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cadf77d3-d2b1-45a2-800b-5f96d6ec3f18.jpg');
          background-size: 100% 100%;
          background-position: bottom center;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 1;
          mask-image: linear-gradient(to bottom, transparent 0, black calc(8 * var(--u)), black 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, black calc(8 * var(--u)), black 100%);
        }

        .grain-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.07;
          mix-blend-mode: soft-light;
          background-size: calc(220 * var(--u)) calc(220 * var(--u));
          z-index: 2;
        }

        .card-outer-wrap {
          position: relative;
          z-index: 5;
          padding: 0 calc(48 * var(--u));
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-card {
          background: var(--card-bg);
          position: relative;
          width: 100%;
          border-radius: 0;
          border: 1px solid var(--border-rule);
          box-shadow:
            inset 0 0 0 calc(1.5 * var(--u)) #ffffff,
            inset 0 0 0 calc(3 * var(--u)) rgba(224, 225, 233, 0.6),
            0 calc(2 * var(--u)) 0 0 var(--brand-blue),
            0 calc(16 * var(--u)) calc(36 * var(--u)) rgba(3, 6, 58, 0.35);
        }

        .card-top-row {
          min-height: calc(360 * var(--u));
          padding: calc(62 * var(--u)) calc(48 * var(--u)) calc(48 * var(--u)) calc(58 * var(--u));
          display: grid;
          grid-template-columns: minmax(calc(360 * var(--u)), calc(510 * var(--u))) repeat(4, 1fr);
          gap: 0;
          align-items: start;
        }

        .brand-col {
          padding-right: calc(48 * var(--u));
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .brand-identity {
          display: flex;
          align-items: center;
          gap: calc(12 * var(--u));
          text-decoration: none;
          color: var(--ink);
        }

        .brand-logo-mark {
          height: calc(62 * var(--u));
          max-height: 72px;
          min-height: 48px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: transform 0.2s ease;
        }

        .brand-identity:hover .brand-logo-mark {
          transform: scale(1.02);
        }

        .brand-headline-wrap {
          margin-top: calc(24 * var(--u));
          overflow: hidden;
        }

        .brand-headline {
          font-size: calc(19 * var(--u));
          line-height: calc(27 * var(--u));
          color: var(--ink);
          font-weight: 500;
          letter-spacing: -0.015em;
        }

        .brand-touch-btn {
          margin-top: calc(34 * var(--u));
          width: fit-content;
          min-width: calc(248 * var(--u));
          height: calc(56 * var(--u));
          max-height: 62px;
          min-height: 52px;
          background: linear-gradient(135deg, #3d6ab3 0%, #1e4587 100%);
          color: #ffffff;
          border: 1px solid rgba(253, 207, 9, 0.45);
          border-radius: 0;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 calc(6 * var(--u)) 0 calc(24 * var(--u));
          gap: calc(18 * var(--u));
          font-family: inherit;
          font-size: calc(16.5 * var(--u));
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease;
          box-shadow: 0 calc(4 * var(--u)) calc(16 * var(--u)) rgba(61, 106, 179, 0.3), 0 0 calc(12 * var(--u)) rgba(253, 207, 9, 0.15);
        }

        .brand-touch-btn span {
          white-space: nowrap;
        }

        .brand-touch-cap {
          width: calc(44 * var(--u));
          height: calc(44 * var(--u));
          margin-right: calc(2 * var(--u));
          background: var(--brand-yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .brand-touch-cap svg {
          width: calc(18 * var(--u));
          height: calc(18 * var(--u));
          stroke: #03063A;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .brand-touch-btn:hover {
          background: linear-gradient(135deg, #2a589e 0%, #163669 100%);
          border-color: rgba(253, 207, 9, 0.9);
          box-shadow: 0 calc(6 * var(--u)) calc(22 * var(--u)) rgba(61, 106, 179, 0.45), 0 0 16px rgba(253, 207, 9, 0.35);
          transform: translateY(-1px);
        }

        .brand-touch-btn:hover .brand-touch-cap {
          background: #ffffff;
          transform: translateX(calc(2 * var(--u)));
        }

        .link-col {
          border-left: calc(2.4 * var(--u)) solid var(--border-rule);
          padding-left: calc(26 * var(--u));
          padding-right: calc(12 * var(--u));
        }

        .col-title {
          font-size: calc(19.8 * var(--u));
          line-height: 1.2;
          color: var(--ink);
          font-weight: 500;
          margin-bottom: calc(24 * var(--u));
          letter-spacing: -0.01em;
          -webkit-text-stroke: 0.18px var(--ink);
        }

        .link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: calc(19.5 * var(--u));
        }

        .link-item a {
          font-size: calc(15.8 * var(--u));
          line-height: 1.35;
          color: var(--muted-2);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: calc(8 * var(--u));
          transition: color 0.2s ease, transform 0.15s ease;
        }

        .link-item a:hover {
          color: var(--brand-blue);
          transform: translateX(calc(2 * var(--u)));
        }

        .social-icon-glyph {
          width: calc(16 * var(--u));
          height: calc(16 * var(--u));
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .card-bottom-row {
          height: calc(62 * var(--u));
          border-top: 1px solid var(--border-rule);
          padding: 0 calc(58 * var(--u));
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: calc(13.8 * var(--u));
          color: var(--muted-1);
        }

        .bottom-legal-links {
          display: flex;
          align-items: center;
          gap: calc(12 * var(--u));
        }

        .bottom-legal-links a {
          color: var(--muted-1);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .bottom-legal-links a:hover {
          color: var(--brand-blue);
        }

        .bottom-copyright {
          color: var(--muted-1);
        }

        .mobile-tab-nav {
          display: none;
        }

        @media (max-width: 1024px) {
          .card-top-row {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
            padding: 40px 32px;
            min-height: auto;
          }

          .brand-col {
            grid-column: span 2;
            padding-right: 0;
          }

          .brand-headline-wrap {
            margin-top: 24px;
          }

          .link-col {
            border-left: none;
            padding-left: 0;
            border-top: 2px solid var(--border-rule);
            padding-top: 20px;
          }
        }

        @media (max-width: 768px) {
          .nimbus-footer-section {
            min-height: auto;
            height: auto;
            padding: 24px 0;
          }

          .card-outer-wrap {
            padding: 0 16px 24px;
          }

          .brand-logo-mark {
            height: 48px;
            max-height: 52px;
          }

          .brand-headline {
            font-size: 18px;
            line-height: 25px;
          }

          .brand-touch-btn {
            width: fit-content;
            min-width: 236px;
            height: 52px;
            padding: 0 6px 0 20px;
            gap: 14px;
            font-size: 15.5px;
            white-space: nowrap;
            margin-top: 24px;
          }

          .brand-touch-cap {
            width: 40px;
            height: 40px;
          }

          .brand-touch-cap svg {
            width: 17px;
            height: 17px;
          }

          .mobile-tab-nav {
            display: flex;
            overflow-x: auto;
            gap: 8px;
            border-bottom: 2px solid var(--border-rule);
            padding-bottom: 12px;
            margin-bottom: 24px;
          }

          .mobile-tab-btn {
            padding: 8px 14px;
            background: transparent;
            border: none;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            color: var(--muted-2);
            cursor: pointer;
            border-radius: 6px;
            white-space: nowrap;
            transition: all 0.2s ease;
          }

          .mobile-tab-btn.active {
            background: var(--brand-blue);
            color: #ffffff;
          }

          .card-top-row {
            display: flex;
            flex-direction: column;
            padding: 28px 20px;
            gap: 24px;
          }

          .link-col {
            display: none;
            border-top: none;
            padding-top: 0;
          }

          .link-col.active {
            display: block;
          }

          .link-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }

          .card-bottom-row {
            height: auto;
            padding: 20px;
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  );
};

import React from 'react';
import { ArrowDown, CheckCircle2, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="hero"
      style={{
        paddingTop: '5.25rem',
        paddingBottom: '1.5rem',
        background: '#ffffff', // White site background
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Hero Full Width Container */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          padding: '0 1.25rem', // Slight offset for pill-card hero container
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #FFE866 0%, #FDD00B 65%, #E5B800 100%)', // Full Sunburst Gold (#FDD00B) Hero Fill
            color: '#0f172a',
            boxShadow: '0 20px 50px rgba(253, 208, 11, 0.35)',
            minHeight: '640px',
          }}
        >
          {/* Content Grid Aligned with Container */}
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '4rem 3rem',
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '2.5rem',
              alignItems: 'center',
            }}
            className="hero-grid-container"
          >
            {/* Left Column: Stacked Display Typography "Grow Big Marketers" */}
            <div style={{ position: 'relative', zIndex: 2 }} className="reveal-fade-up">
              
              {/* Top Badge Pill */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    background: 'rgba(15, 23, 42, 0.12)',
                    color: '#0f172a',
                    padding: '0.45rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: '1px solid rgba(15, 23, 42, 0.25)',
                  }}
                >
                  <Sparkles size={14} /> Digital Marketing & Growth Agency
                </span>
              </div>

              {/* Giant Stacked Title: GROW BIG MARKETERS */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h1
                  style={{
                    fontSize: 'clamp(3.4rem, 6.5vw, 5.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.92,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                  }}
                >
                  GROW
                </h1>

                <h1
                  className="text-stroke-dark"
                  style={{
                    fontSize: 'clamp(3.4rem, 6.5vw, 5.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.92,
                    textTransform: 'uppercase',
                    margin: '0.05em 0',
                  }}
                >
                  BIG
                </h1>

                <h1
                  style={{
                    fontSize: 'clamp(2.8rem, 5.2vw, 4.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.92,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                  }}
                >
                  MARKETERS
                </h1>
              </div>

              {/* Subtitle text */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  color: '#1e293b',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  fontWeight: 600,
                  marginBottom: '2.25rem',
                }}
              >
                Accelerate your revenue with data-driven SEO, performance marketing campaigns, high-converting Google & Meta PPC ads, and end-to-end brand scaling strategies.
              </p>

              {/* Key feature pills */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} color="#0f172a" /> Performance Ads (PPC)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} color="#0f172a" /> Organic SEO Scale
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} color="#0f172a" /> Social Growth & Reels
                </div>
              </div>
            </div>

            {/* Right Column: Displaying Exact Image h1_1.webp */}
            <div style={{ position: 'relative', zIndex: 2 }} className="reveal-scale-up delay-200">
              
              {/* Circular Rotating Badge ("GROW REVENUE ↓") at junction */}
              <a
                href="#services"
                style={{
                  position: 'absolute',
                  left: '-48px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: '#0f172a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',
                  textDecoration: 'none',
                }}
                className="rotating-badge-link"
              >
                <svg
                  viewBox="0 0 100 100"
                  width="100%"
                  height="100%"
                  className="spin-badge"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text fill="#ffffff" fontSize="10" fontWeight="bold" letterSpacing="2px">
                    <textPath href="#circlePath">
                      GROW REVENUE • SCALE BRANDS •
                    </textPath>
                  </text>
                </svg>
                <ArrowDown size={22} color="#FDD00B" />
              </a>

              {/* Display h1_1.webp Image */}
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="/h1_1.webp"
                  alt="Grow Big Digital Design Showcase"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '28px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid-container {
            grid-template-columns: 1fr !important;
            padding: 2.5rem 1.5rem !important;
          }
          .rotating-badge-link {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface IndustryPillar {
  id: string;
  name: string;
  category: string;
  image: string;
}

const ALL_PILLARS: IndustryPillar[] = [
  {
    id: 'real-estate',
    name: 'REAL ESTATE',
    category: 'PropTech & Infrastructure',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'agriculture',
    name: 'AGRICULTURE',
    category: 'AgriTech & Automation',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e-commerce',
    name: 'E-COMMERCE',
    category: 'Retail & Logistics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hospitality',
    name: 'HOSPITALITY',
    category: 'Hotels & Tourism',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'textiles',
    name: 'TEXTILES',
    category: 'Apparel & Weaving',
    image: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'healthcare',
    name: 'HEALTHCARE',
    category: 'MedTech & Pharma',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fintech',
    name: 'FINTECH',
    category: 'Banking & Financial',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  },
];

export const Industries: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const mobileTrackRef = React.useRef<HTMLDivElement>(null);

  // 5 Pillars per view on desktop
  const maxStart = Math.max(0, ALL_PILLARS.length - 5);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStart, prev + 1));
  };

  const handleMobilePrev = () => {
    if (mobileActiveIdx > 0) {
      const nextIdx = mobileActiveIdx - 1;
      setMobileActiveIdx(nextIdx);
      if (mobileTrackRef.current) {
        const cardWidth = mobileTrackRef.current.clientWidth * 0.82;
        mobileTrackRef.current.scrollTo({ left: nextIdx * cardWidth, behavior: 'smooth' });
      }
    }
  };

  const handleMobileNext = () => {
    if (mobileActiveIdx < ALL_PILLARS.length - 1) {
      const nextIdx = mobileActiveIdx + 1;
      setMobileActiveIdx(nextIdx);
      if (mobileTrackRef.current) {
        const cardWidth = mobileTrackRef.current.clientWidth * 0.82;
        mobileTrackRef.current.scrollTo({ left: nextIdx * cardWidth, behavior: 'smooth' });
      }
    }
  };

  const visiblePillars = ALL_PILLARS.slice(startIndex, startIndex + 5);

  // The center card (index 2 in 5-pillar grid) is active by default on desktop
  const activeIndex = hoveredIdx !== null ? hoveredIdx : 2;

  return (
    <section
      id="industries"
      style={{
        background: '#ffffff', // Clean White Background as requested
        padding: '6.5rem 0 8.5rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Light Dot Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(132, 204, 22, 0.2) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.18) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Container Aligned Parallel to Navbar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* TOP SECTION HEADING: "INDUSTRIES WE SERVE" */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
          className="reveal-fade-up"
        >
          <div>
            <div style={{ display: 'inline-block', marginBottom: '0.75rem' }} className="domain-verticals-badge">
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  background: 'rgba(253, 208, 11, 0.2)',
                  color: '#0f172a',
                  padding: '0.4rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(253, 208, 11, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={14} /> DOMAIN VERTICALS
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#0f172a',
              }}
            >
              INDUSTRIES <span style={{ color: '#FDD00B', background: '#3E6AB3', padding: '0.1rem 0.5rem', borderRadius: '8px', fontStyle: 'italic', fontSize: '0.88em' }}>WE SERVE</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }} className="desktop-carousel-controls">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: startIndex === 0 ? '#f1f5f9' : '#ffffff',
                color: startIndex === 0 ? '#94a3b8' : '#0f172a',
                border: '1px solid rgba(15, 23, 42, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: startIndex === 0 ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.25s ease',
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={handleNext}
              disabled={startIndex >= maxStart}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: startIndex >= maxStart ? '#f1f5f9' : '#FDD00B',
                color: startIndex >= maxStart ? '#94a3b8' : '#0f172a',
                border: '1px solid rgba(15, 23, 42, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: startIndex >= maxStart ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(253, 208, 11, 0.3)',
                transition: 'all 0.25s ease',
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', paddingBottom: '2rem' }}>
          
          {/* DESKTOP 5 PILLARS GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1.25rem',
              height: '530px',
              alignItems: 'center',
            }}
            className="pillars-5-grid"
          >
            {visiblePillars.map((pillar, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    height: isActive ? '530px' : '460px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: isActive
                      ? '0 30px 60px rgba(253, 208, 11, 0.4), 0 10px 25px rgba(0, 0, 0, 0.15)'
                      : '0 12px 30px rgba(0, 0, 0, 0.08)',
                    border: isActive ? '2.5px solid #FDD00B' : '1px solid rgba(15, 23, 42, 0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'translateY(-16px) scale(1.04)' : 'translateY(0) scale(1)',
                    zIndex: isActive ? 5 : 2,
                    background: '#ffffff',
                  }}
                  className="single-pillar-slice reveal-scale-up"
                >
                  <img
                    src={pillar.image}
                    alt={pillar.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s ease',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.15) 45%, rgba(15, 23, 42, 0.85) 100%)',
                      zIndex: 1,
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        background: isActive ? '#FDD00B' : 'rgba(255, 255, 255, 0.25)',
                        color: '#0f172a',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        backdropFilter: 'blur(8px)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'inline-block',
                      }}
                    >
                      {pillar.category}
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1.5rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      zIndex: 2,
                      color: '#ffffff',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: isActive ? '1.4rem' : '1.2rem',
                        fontWeight: 900,
                        lineHeight: 1.2,
                        marginBottom: '0.35rem',
                        color: '#ffffff',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {pillar.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE CAROUSEL TRACK (Mapping ALL_PILLARS with 80% Center Card + 10% Peek on Left & Right) */}
          <div className="mobile-pillars-track" ref={mobileTrackRef}>
            {ALL_PILLARS.map((pillar, idx) => {
              const isActive = mobileActiveIdx === idx;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setMobileActiveIdx(idx)}
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#ffffff',
                    boxShadow: isActive
                      ? '0 20px 45px rgba(253, 208, 11, 0.35)'
                      : '0 12px 30px rgba(0, 0, 0, 0.08)',
                    border: isActive ? '2.5px solid #FDD00B' : '1px solid rgba(15, 23, 42, 0.12)',
                    transition: 'all 0.3s ease',
                  }}
                  className={`mobile-pillar-card ${isActive ? 'is-active' : ''}`}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.15) 45%, rgba(15, 23, 42, 0.85) 100%)',
                      zIndex: 1,
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        background: isActive ? '#FDD00B' : 'rgba(255, 255, 255, 0.25)',
                        color: '#0f172a',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'inline-block',
                      }}
                    >
                      {pillar.category}
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1.5rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      zIndex: 2,
                      color: '#ffffff',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        lineHeight: 1.2,
                        color: '#ffffff',
                      }}
                    >
                      {pillar.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE BOTTOM NAVIGATION CONTROLS BELOW */}
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            }}
            className="mobile-industries-controls"
          >
            <button
              onClick={handleMobilePrev}
              disabled={mobileActiveIdx === 0}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: mobileActiveIdx === 0 ? '#f1f5f9' : '#0f172a',
                color: mobileActiveIdx === 0 ? '#94a3b8' : '#ffffff',
                border: '1px solid rgba(15, 23, 42, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: mobileActiveIdx === 0 ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Pagination Indicators for All 7 Pillars */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {ALL_PILLARS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setMobileActiveIdx(i);
                    if (mobileTrackRef.current) {
                      const cardWidth = mobileTrackRef.current.clientWidth * 0.82;
                      mobileTrackRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    width: mobileActiveIdx === i ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: mobileActiveIdx === i ? '#FDD00B' : 'rgba(15, 23, 42, 0.25)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleMobileNext}
              disabled={mobileActiveIdx >= ALL_PILLARS.length - 1}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: mobileActiveIdx >= ALL_PILLARS.length - 1 ? '#f1f5f9' : '#FDD00B',
                color: mobileActiveIdx >= ALL_PILLARS.length - 1 ? '#94a3b8' : '#0f172a',
                border: '1px solid rgba(15, 23, 42, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: mobileActiveIdx >= ALL_PILLARS.length - 1 ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 18px rgba(253, 208, 11, 0.35)',
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .domain-verticals-badge {
            display: none !important;
          }
          .desktop-carousel-controls {
            display: none !important;
          }
          .pillars-5-grid {
            display: none !important;
          }
          .mobile-industries-controls {
            display: flex !important;
          }
          .mobile-pillars-track {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            padding: 1rem 10% !important;
            gap: 1rem !important;
            height: 440px !important;
            margin-left: -2rem !important;
            margin-right: -2rem !important;
            width: calc(100% + 4rem) !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .mobile-pillars-track::-webkit-scrollbar {
            display: none;
          }
          .mobile-pillar-card {
            flex: 0 0 80% !important;
            width: 80% !important;
            scroll-snap-align: center !important;
            height: 420px !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-industries-controls {
            display: none !important;
          }
          .mobile-pillars-track {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';

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

  // 5 Pillars per view
  const maxStart = Math.max(0, ALL_PILLARS.length - 5);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStart, prev + 1));
  };

  const visiblePillars = ALL_PILLARS.slice(startIndex, startIndex + 5);

  // The center card (index 2 in 5-pillar grid) is active by default
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
        {/* Top Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
          }}
          className="reveal-fade-up"
        >
          <div>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 900,
                background: 'rgba(132, 204, 22, 0.18)',
                color: '#4d7c0f',
                padding: '0.45rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(132, 204, 22, 0.35)',
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

          {/* Carousel Next/Prev Controls */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
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
                background: startIndex >= maxStart ? '#f1f5f9' : '#84cc16',
                color: startIndex >= maxStart ? '#94a3b8' : '#0f172a',
                border: '1px solid rgba(15, 23, 42, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: startIndex >= maxStart ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(132, 204, 22, 0.3)',
                transition: 'all 0.25s ease',
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* 5 Vertical Slices Grid with CENTER CARD ACTIVE & BIGGER */}
        <div style={{ position: 'relative', paddingBottom: '4.5rem' }}>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)', // 5 PILLARS PER VIEW
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
                    height: isActive ? '530px' : '460px', // CENTER / ACTIVE CARD IS BIGGER!
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
                  {/* Pillar Image */}
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

                  {/* Dark Gradient Overlay for Crisp Text Contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.15) 45%, rgba(15, 23, 42, 0.85) 100%)',
                      zIndex: 1,
                    }}
                  />

                  {/* Top Industry Title */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.65rem',
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      zIndex: 2,
                      padding: '0 0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 900,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                        display: 'block',
                      }}
                    >
                      {pillar.name}
                    </span>
                  </div>

                  {/* Active Pillar Tag at Bottom */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '1.25rem',
                        right: '1.25rem',
                        zIndex: 2,
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: '#FDD00B',
                          background: 'rgba(15, 23, 42, 0.92)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid rgba(253, 208, 11, 0.5)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {pillar.category} <ArrowUpRight size={14} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* GIANT BIG OVERLAY TYPOGRAPHY: "INDUSTRIES" IN WHITE & "WE SERVE" IN GOLD */}
          <div
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(3.8rem, 8.5vw, 7.5rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  display: 'block',
                  textShadow: '0 4px 20px rgba(15, 23, 42, 0.8), 0 0 40px rgba(15, 23, 42, 0.9), -1px -1px 0 #0f172a, 1px -1px 0 #0f172a, -1px 1px 0 #0f172a, 1px 1px 0 #0f172a',
                }}
              >
                INDUSTRIES
              </span>
              <span
                style={{
                  color: '#FDD00B', // Sunburst Gold Accent (#FDD00B)
                  display: 'block',
                  textShadow: '0 0 40px rgba(253, 208, 11, 0.7), 0 4px 20px rgba(15, 23, 42, 0.8)',
                }}
              >
                WE SERVE
              </span>
            </h2>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .pillars-5-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            height: 440px !important;
          }
        }
        @media (max-width: 640px) {
          .pillars-5-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

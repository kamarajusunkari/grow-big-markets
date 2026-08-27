import React, { useState } from 'react';
import { ChevronDown, Sparkles, Zap, Activity, ArrowRight, Rocket, Layers, Database, Cpu, Star, CheckCircle2 } from 'lucide-react';

interface AboutOperationsProps {
  onOpenBooking?: () => void;
}

const OPERATIONS_LIST = [
  {
    num: '01.',
    title: 'Instant Entry',
    desc: 'We start with a streamlined discovery sprint, getting your project onboarded quickly with clear timelines, strategic milestones, and rapid initial prototypes.',
    icon: Rocket,
    stat: 'Day 1 Onboarding',
  },
  {
    num: '02.',
    title: 'Multi Platform',
    desc: 'Build once and deploy everywhere across responsive web applications, native iOS and Android mobile apps, and high-availability cloud infrastructure.',
    icon: Layers,
    stat: '100% Cross-Device',
  },
  {
    num: '03.',
    title: 'Handy Integration',
    desc: 'Seamlessly connect payment gateways, custom CRMs, ERP enterprise databases, automated communication APIs, and third-party software workflows.',
    icon: Database,
    stat: '200+ Integrations',
  },
  {
    num: '04.',
    title: 'Latest Technology',
    desc: 'Harness cutting-edge AI automation, modern React & TypeScript frameworks, scalable microservices, and robust cloud architectures engineered to scale.',
    icon: Cpu,
    stat: 'SOC2 Compliant',
  },
];

export const AboutOperations: React.FC<AboutOperationsProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="about"
      style={{
        background: '#f8fafc', // Grey background
        padding: '6.5rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Dot Grid Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(132, 204, 22, 0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Glow Effects */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-2%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Container Aligned Parallel to Nav */}
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // EXACT 50% 50% SPLIT
            gap: '4rem',
            alignItems: 'center',
          }}
          className="about-operations-grid"
        >
          {/* Left Column (50%): Image Card with Layered Frame */}
          <div style={{ position: 'relative' }}>
            
            {/* Layered Accent Background Frame */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                right: '15px',
                bottom: '15px',
                borderRadius: '36px',
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.35) 0%, rgba(37, 99, 235, 0.2) 100%)',
                transform: 'rotate(-2deg)',
                zIndex: 0,
              }}
            />

            {/* Main Image Container */}
            <div
              style={{
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12), 0 0 35px rgba(132, 204, 22, 0.2)',
                background: '#ffffff',
                border: '2.5px solid rgba(132, 204, 22, 0.4)',
                position: 'relative',
                zIndex: 1,
              }}
              className="about-image-card"
            >
              <img
                src="/about (1).webp"
                alt="Empowering Excellence: Our IT Solutions Story"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '30px',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                className="about-img"
              />

              {/* Status Pill Badge inside Image */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#84cc16', display: 'inline-block' }} /> Active Engineering Squad
              </div>
            </div>

            {/* Floating Element 1: Top-Right SLA Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: '#0f172a',
                color: '#ffffff',
                padding: '0.9rem 1.35rem',
                borderRadius: '20px',
                boxShadow: '0 18px 38px rgba(15, 23, 42, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
                border: '1.5px solid rgba(132, 204, 22, 0.5)',
              }}
              className="animate-float"
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#84cc16',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a',
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.925rem', fontWeight: 900, color: '#ffffff' }}>99.9% Uptime</div>
                <div style={{ fontSize: '0.75rem', color: '#84cc16', fontWeight: 800 }}>Enterprise SLA</div>
              </div>
            </div>

            {/* Floating Element 2: Bottom-Left Rating Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: '#ffffff',
                color: '#0f172a',
                padding: '1rem 1.35rem',
                borderRadius: '22px',
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
                border: '1px solid rgba(15, 23, 42, 0.1)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(132, 204, 22, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#84cc16',
                }}
              >
                <Activity size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  150+ Systems Deployed <CheckCircle2 size={15} color="#84cc16" />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Star size={12} fill="#eab308" color="#eab308" /> 4.9/5 Executive Rating
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (50%): Title & Accordion */}
          <div>
            {/* Subtitle Badge */}
            <div style={{ marginBottom: '0.85rem' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  background: 'rgba(132, 204, 22, 0.15)',
                  color: '#4d7c0f',
                  padding: '0.4rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(132, 204, 22, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} /> DAY-TO-DAY OPERATIONS
              </span>
            </div>

            {/* Main Heading */}
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.12,
                marginBottom: '2.25rem',
                letterSpacing: '-0.03em',
              }}
            >
              Empowering Excellence: <br />
              <span style={{ color: '#84cc16' }}>Our IT Solutions Story</span>
            </h2>

            {/* Accordion List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2.5rem' }}>
              {OPERATIONS_LIST.map((item, idx) => {
                const isOpen = openIdx === idx;
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: isOpen ? '1.5px solid #84cc16' : '1px solid rgba(15, 23, 42, 0.08)',
                      borderLeft: isOpen ? '5px solid #84cc16' : '5px solid transparent',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isOpen ? '0 12px 30px rgba(132, 204, 22, 0.15)' : '0 4px 15px rgba(0,0,0,0.02)',
                      transform: isOpen ? 'translateX(8px)' : 'translateX(0)',
                    }}
                  >
                    <button
                      onClick={() => toggleItem(idx)}
                      style={{
                        width: '100%',
                        padding: '1.35rem 1.65rem',
                        background: 'none',
                        border: 'none',
                        color: '#0f172a',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            background: isOpen ? '#84cc16' : '#f1f5f9',
                            color: isOpen ? '#0f172a' : '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <IconComponent size={20} />
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#84cc16', fontWeight: 900, fontSize: '1.15rem', fontFamily: 'monospace' }}>
                              {item.num}
                            </span>
                            <span style={{ color: '#0f172a' }}>{item.title}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            background: isOpen ? 'rgba(132, 204, 22, 0.2)' : '#f1f5f9',
                            color: isOpen ? '#4d7c0f' : '#64748b',
                            padding: '0.3rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            transition: 'all 0.2s ease',
                          }}
                          className="desktop-only"
                        >
                          {item.stat}
                        </span>
                        <ChevronDown
                          size={22}
                          color={isOpen ? '#84cc16' : '#64748b'}
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: '0 1.65rem 1.5rem 4.75rem',
                          fontSize: '1.025rem',
                          color: '#475569',
                          lineHeight: 1.65,
                          fontWeight: 500,
                          borderTop: '1px solid rgba(132, 204, 22, 0.15)',
                          paddingTop: '1rem',
                          animation: 'fadeIn 0.3s ease-out',
                        }}
                      >
                        <p style={{ marginBottom: '0.75rem' }}>{item.desc}</p>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#84cc16', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> Verified SLA Architecture
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action CTA Button */}
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="btn btn-lime"
                style={{
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Discuss Operations Architecture <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .about-image-card:hover .about-img {
          transform: scale(1.03);
        }
        @media (max-width: 960px) {
          .about-operations-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

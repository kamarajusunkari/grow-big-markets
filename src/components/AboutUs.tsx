import React, { useState } from 'react';
import { ArrowUpRight, Play, Sparkles, X, Smile } from 'lucide-react';

interface AboutUsProps {
  onOpenBooking?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenBooking }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section
      id="about"
      style={{
        background: '#ffffff', // Clean white background matching screenshot
        padding: '6.5rem 0 7rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Container Aligned Parallel to Navbar */}
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
        {/* TOP PART: 2-COLUMN HEADER (Exact Screenshot Layout) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
          className="about-top-grid"
        >
          {/* Top Left: Subtitle Pill & Main Title */}
          <div className="reveal-fade-up">
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  background: '#ede9fe', // Light lavender pill matching screenshot
                  color: '#6b21a8',
                  padding: '0.45rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(192, 132, 252, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} color="#84cc16" /> About Us
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Digital Expertise You <br />
              Can Count On
            </h2>
          </div>

          {/* Top Right: Paragraph & Action Buttons */}
          <div className="reveal-fade-up delay-100">
            <p
              style={{
                fontSize: '1.05rem',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '2rem',
                fontWeight: 500,
              }}
            >
              We empower ambitious businesses, healthcare clinics, e-commerce brands, and financial institutions with ROI-focused digital marketing campaigns, high-converting Google & Meta ads, search engine optimization (SEO), and performance marketing strategies engineered for rapid revenue growth.
            </p>

            {/* Action Buttons Row (Matching Screenshot: Black Pill Button + Circular Play Button) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="btn btn-dark"
                  style={{
                    padding: '0.9rem 2.2rem',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  Learn More <ArrowUpRight size={18} color="#84cc16" />
                </button>
              )}

              {/* Play Video Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: '#f8fafc',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.25s ease',
                }}
                className="play-video-btn"
                title="Watch Overview Video"
              >
                <Play size={20} fill="#0f172a" color="#0f172a" style={{ marginLeft: '2px' }} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: 5 METRIC & FEATURE CARDS (Exact Screenshot Architecture) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.1fr', // 5 Distinct Cards
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
          className="about-bottom-5-cards"
        >
          {/* Card 1: Left Image Card */}
          <div
            style={{
              borderRadius: '26px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              height: '320px',
            }}
            className="reveal-scale-up delay-100"
          >
            <img
              src="/about (1).webp"
              alt="Digital Expertise You Can Count On"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Card 2: Royal Blue Tint Card (10+ Years Experience) */}
          <div
            style={{
              background: '#ebf2fa',
              borderRadius: '26px',
              padding: '2rem 1.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(62, 106, 179, 0.12)',
              border: '1px solid rgba(62, 106, 179, 0.3)',
              height: '320px',
            }}
            className="reveal-scale-up delay-200"
          >
            <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: '0.4rem' }}>
              10+
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#3E6AB3', marginBottom: '0.85rem' }}>
              Years Experience
            </div>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>
              Delivering high-performance IT solutions and scaling enterprise operations across global markets.
            </p>
          </div>

          {/* Card 3: White Card (150+ Happy Clients with Gold & Blue Icons) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '26px',
              padding: '2rem 1.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              height: '320px',
              position: 'relative',
            }}
            className="reveal-scale-up delay-300"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#FDD00B',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(253, 208, 11, 0.35)',
                }}
              >
                <Smile size={20} />
              </div>
              <ArrowUpRight size={22} color="#3E6AB3" />
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#3E6AB3', marginBottom: '0.2rem' }}>
                Happy Clients
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.05, marginBottom: '0.5rem' }}>
                150+
              </div>
              <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.4 }}>
                Trusted growth partners & leading brands.
              </p>
            </div>
          </div>

          {/* Card 4: Gold Tint Card (50+ Techwise Team) */}
          <div
            style={{
              background: '#fffbe6',
              borderRadius: '26px',
              padding: '2rem 1.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(253, 208, 11, 0.15)',
              border: '1px solid rgba(253, 208, 11, 0.5)',
              height: '320px',
            }}
            className="reveal-scale-up delay-400"
          >
            <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: '0.4rem' }}>
              50+
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#3E6AB3', marginBottom: '0.85rem' }}>
              Techwise Team
            </div>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>
              A dedicated squad of software architects, AI engineers, and performance marketers.
            </p>
          </div>

          {/* Card 5: Royal Blue Gradient Card (Get Started With Us) */}
          <div
            onClick={onOpenBooking}
            style={{
              background: 'linear-gradient(135deg, #3E6AB3 0%, #1e3a8a 100%)',
              borderRadius: '26px',
              padding: '2rem 1.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 35px rgba(62, 106, 179, 0.4)',
              color: '#ffffff',
              cursor: 'pointer',
              height: '320px',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(253, 208, 11, 0.3)',
            }}
            className="about-get-started-card reveal-scale-up delay-500"
          >
            {/* Avatars Overlap Row */}
            <div style={{ display: 'flex' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Team 1"
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #FDD00B', marginLeft: 0 }}
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Team 2"
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #FDD00B', marginLeft: '-10px' }}
              />
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80"
                alt="Team 3"
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #FDD00B', marginLeft: '-10px' }}
              />
            </div>

            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FDD00B', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Get Started With Us
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.45 }}>
                Launch your digital transformation sprint with direct executive guidance.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Video Preview Modal */}
      {isVideoModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '750px' }}>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
              Grow Big Marketers Overview
            </h3>

            <div
              style={{
                width: '100%',
                height: '380px',
                background: '#0f172a',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                textAlign: 'center',
                padding: '2rem',
              }}
            >
              <div>
                <Play size={60} color="#84cc16" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Company Capabilities Showcase</h4>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  Interactive video overview loading...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .play-video-btn:hover {
          transform: scale(1.08);
          border-color: #84cc16 !important;
        }
        .about-get-started-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(168, 85, 247, 0.45) !important;
        }
        @media (max-width: 1024px) {
          .about-top-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .about-bottom-5-cards {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .about-bottom-5-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

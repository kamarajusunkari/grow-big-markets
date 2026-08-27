import React from 'react';

const CLIENT_FRAMES = [
  { id: 'f49', src: '/Frame 49.png', alt: 'Trusted Clients 1' },
  { id: 'f50', src: '/Frame 50.png', alt: 'Trusted Clients 2' },
  { id: 'f51', src: '/Frame 51.png', alt: 'Trusted Clients 3' },
  { id: 'f52', src: '/Frame 52.png', alt: 'Trusted Clients 4' },
];

export const Clients: React.FC = () => {
  // Duplicate array for smooth continuous scrolling
  const marqueeItems = [...CLIENT_FRAMES, ...CLIENT_FRAMES];

  return (
    <section
      id="clients"
      style={{
        background: '#f8fafc', // Soft Slate Grey Background
        padding: '4.5rem 0 5rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ marginBottom: '3rem' }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              color: '#84cc16',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.6rem',
            }}
          >
            MEET OUR TRUSTED CLIENTS
          </span>
          <h2 style={{ fontSize: 'clamp(1.65rem, 2.8vw, 2.5rem)', color: '#0f172a', fontWeight: 900 }}>
            Trusted by 150+ Ambitious Brands & Enterprises
          </h2>
        </div>
      </div>

      {/* Marquee Container with Increased Image Size */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Gradient Side Fades */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '120px',
            background: 'linear-gradient(to right, #f8fafc, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '120px',
            background: 'linear-gradient(to left, #f8fafc, transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Marquee Track */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4.5rem',
            width: 'max-content',
            animation: 'marqueeScroll 45s linear infinite',
          }}
          className="marquee-track"
        >
          {marqueeItems.map((frame, index) => (
            <div
              key={`${frame.id}-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: 'none',
                background: 'transparent',
                boxShadow: 'none',
              }}
            >
              <img
                src={frame.src}
                alt={frame.alt}
                style={{
                  height: '75px', // INCREASED height size from 55px to 75px
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  border: 'none',
                  outline: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

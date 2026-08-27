import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Grid } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 950,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        padding: '0.75rem 0',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div
            style={{
              background: '#ffffff',
              padding: '6px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/d52ab5cc-5257-47d0-a3c2-2478d0403f2b.jpg"
              alt="Grow Big Marketers Logo"
              style={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.25rem',
          }}
          className="desktop-nav"
        >
          <a href="#hero" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#process" className="nav-link">Our Process</a>
          <a href="#industries" className="nav-link">Industries</a>
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#faq" className="nav-link">Contact</a>
        </nav>

        {/* Action Controls - Placed in Header with Hero Lime Green Color (#84cc16) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#f1f5f9',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <Sun size={19} color="#84cc16" /> : <Moon size={19} color="#2563eb" />}
          </button>

          {/* Header Contact Container (#3E6AB3) containing Contact Button (#FDD00B) & Grid Icon */}
          <div
            style={{
              background: '#3E6AB3', // Royal Blue Background (#3E6AB3)
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 6px 20px rgba(62, 106, 179, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            className="desktop-cta"
          >
            {/* Contact Button in Sunburst Yellow Gold (#FDD00B) */}
            <button
              onClick={onOpenBooking}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.6rem 1.4rem',
                fontSize: '0.875rem',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FDD00B', // Sunburst Yellow Gold (#FDD00B)
                color: '#0f172a',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(253, 208, 11, 0.4)',
                transition: 'all 0.25s ease',
              }}
              className="navbar-contact-btn"
            >
              Contact Now <ArrowUpRight size={16} color="#0f172a" />
            </button>

            {/* Grid App Icon */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={onOpenBooking}
            >
              <Grid size={18} />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              color: '#0f172a',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Home</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Services</a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Our Process</a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Industries</a>
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Portfolio</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Contact</a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn btn-dark"
            style={{ width: '100%', marginTop: '0.5rem', background: '#84cc16', color: '#0f172a' }}
          >
            Contact Now <ArrowUpRight size={17} />
          </button>
        </div>
      )}

      <style>{`
        .nav-link {
          color: #334155;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #84cc16;
        }
        .nav-link-mobile {
          color: #0f172a;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }
        .mobile-toggle {
          display: none;
        }
        @media (max-width: 960px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

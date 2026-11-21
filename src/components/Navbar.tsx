import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Grid } from 'lucide-react';
import growBigPrimary from '../assets/Growbig Primary.png';

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
      // Reveal fixed navbar smoothly once scrolled past the full-screen hero section
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease',
        transform: scrolled ? 'translateY(0)' : 'translateY(-105%)',
        background: theme === 'dark' ? 'rgba(10, 22, 44, 0.88)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
        padding: '0.85rem 0',
      }}
      className="navbar-header"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo Container */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
          className="hover:opacity-80"
          title="Grow Big Marketers"
        >
          <img
            src={growBigPrimary}
            alt="Grow Big Marketers Logo"
            style={{
              height: '46px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
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
          <a href="#hero" className={`nav-link ${theme === 'dark' ? 'text-white/80 hover:text-[#fdcf09]' : 'text-slate-700 hover:text-[#3d6ab3]'}`}>Home</a>
          <a href="#services" className={`nav-link ${theme === 'dark' ? 'text-white/80 hover:text-[#fdcf09]' : 'text-slate-700 hover:text-[#3d6ab3]'}`}>Services</a>
          <a href="#process" className={`nav-link ${theme === 'dark' ? 'text-white/80 hover:text-[#fdcf09]' : 'text-slate-700 hover:text-[#3d6ab3]'}`}>Our Process</a>
          <a href="#portfolio" className={`nav-link ${theme === 'dark' ? 'text-white/80 hover:text-[#fdcf09]' : 'text-slate-700 hover:text-[#3d6ab3]'}`}>Portfolio</a>
          <a href="#faq" className={`nav-link ${theme === 'dark' ? 'text-white/80 hover:text-[#fdcf09]' : 'text-slate-700 hover:text-[#3d6ab3]'}`}>Contact</a>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(15, 23, 42, 0.08)',
              color: theme === 'dark' ? '#ffffff' : '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <Sun size={19} color="#fdcf09" /> : <Moon size={19} color="#3d6ab3" />}
          </button>

          {/* Contact Container */}
          <div
            style={{
              background: '#3d6ab3',
              padding: '0.4rem 0.65rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 6px 20px rgba(61, 106, 179, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
            className="desktop-cta"
          >
            <button
              onClick={onOpenBooking}
              style={{
                borderRadius: '9999px',
                padding: '0.6rem 1.4rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fdcf09',
                color: '#0f172a',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(253, 207, 9, 0.4)',
                transition: 'all 0.25s ease',
              }}
              className="navbar-contact-btn hover:brightness-105 active:scale-95"
            >
              Contact Now <ArrowUpRight size={16} color="#0f172a" />
            </button>

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
              className="hover:bg-white/30"
              title="Open Services Menu"
            >
              <Grid size={18} />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: theme === 'dark' ? '#ffffff' : '#0f172a',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '10px',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            background: theme === 'dark' ? 'rgba(10, 22, 44, 0.96)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Home</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Services</a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Our Process</a>
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Portfolio</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="nav-link-mobile">Contact</a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              background: '#fdcf09',
              color: '#0f172a',
              borderRadius: '9999px',
              padding: '0.75rem',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(253, 207, 9, 0.35)',
            }}
          >
            Contact Now <ArrowUpRight size={17} />
          </button>
        </div>
      )}

      <style>{`
        .nav-link {
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          position: relative;
          padding: 0.25rem 0;
        }
        .nav-link-mobile {
          color: inherit;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          transition: color 0.2s ease;
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

export default Navbar;

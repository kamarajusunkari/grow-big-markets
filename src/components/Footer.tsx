import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        position: 'relative',
      }}
    >
      {/* Main Container Aligned Parallel to Navbar Header */}
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div
                style={{
                  background: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                }}
              >
                <img
                  src="/d52ab5cc-5257-47d0-a3c2-2478d0403f2b.jpg"
                  alt="Grow Big Marketers Logo"
                  style={{
                    height: '34px',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </a>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Premier digital marketing & performance agency. High-converting Meta & Google PPC ads, search engine optimization (SEO), and brand scaling strategies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <a href="tel:+919493898990" style={{ color: '#ffcc00', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                <Phone size={15} /> +91 9493898990
              </a>
              <a href="mailto:info@growbigmarketers.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} /> info@growbigmarketers.com
              </a>
            </div>
          </div>

          {/* Col 2: Marketing Services */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Marketing Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Performance Marketing (PPC)</a></li>
              <li><a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Search Engine Optimization (SEO)</a></li>
              <li><a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Social Media & Reels Growth</a></li>
              <li><a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Conversion Rate Optimization (CRO)</a></li>
              <li><a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Lead Generation & Funnels</a></li>
              <li><a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Brand Strategy & Copywriting</a></li>
            </ul>
          </div>

          {/* Col 3: Key Industries */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Industries Served
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><a href="#industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Healthcare & Pharma</a></li>
              <li><a href="#industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Finance & FinTech</a></li>
              <li><a href="#industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Real Estate & Construction</a></li>
              <li><a href="#industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Retail & eCommerce</a></li>
              <li><a href="#industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Food & Beverage</a></li>
              <li><a href="#industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Manufacturing</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Build Your Digital Future
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Subscribe to get industry trend reports and actionable growth insights.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="form-input"
                style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-gold" style={{ padding: '0.65rem 1rem' }}>
                <Send size={16} />
              </button>
            </form>

            {subscribed && (
              <div style={{ fontSize: '0.8rem', color: '#ffcc00', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.5rem' }}>
                <CheckCircle2 size={14} /> Subscribed successfully!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Links */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Grow Big Marketers Pvt Ltd. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms and Conditions</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

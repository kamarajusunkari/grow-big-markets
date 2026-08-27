import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, X, ArrowRight, PhoneCall } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: () => void;
}

interface ServiceCardData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  desc: string;
  fullDesc: string;
  imageSrc: string;
  imageAlt: string;
  deliverables: string[];
}

const FEATURED_SERVICES: ServiceCardData[] = [
  {
    id: 'ppc-paid-ads',
    category: 'PAID MEDIA & PPC',
    title: 'Performance Marketing (Meta & Google PPC)',
    subtitle: "We Don't Just Run Ads. We Scale High-ROAS Revenue.",
    desc: 'High-converting ad campaigns across Google Search, Meta (Instagram/Facebook), YouTube & LinkedIn engineered to maximize ROAS.',
    fullDesc: 'We construct data-driven ad campaigns that maximize return on ad spend (ROAS), lower customer acquisition costs (CAC), and turn cold traffic into loyal buyers.',
    imageSrc: '/bdb38855-3775-42ba-8d23-f32c41f2e827.webp',
    imageAlt: 'Performance Marketing & Paid Ads',
    deliverables: ['Google Search & Shopping Ads', 'Meta (Instagram & Facebook) Ads', 'High ROAS Campaign Scaling', 'Precision Retargeting Funnels'],
  },
  {
    id: 'seo-search-growth',
    category: 'ORGANIC SEARCH & RANKINGS',
    title: 'Search Engine Optimization (SEO) & Organic Growth',
    subtitle: 'Dominate Google Rankings. Drive High-Intent Traffic.',
    desc: 'Propel your brand to the top of search engine results with technical SEO audits, high-authority backlink building, and keyword strategies.',
    fullDesc: 'Dominating search engine rankings through technical SEO audits, high-intent keyword strategies, local search optimization, and white-hat link building.',
    imageSrc: '/679b7310-0afd-42d1-953b-94209bbf2c6f.png',
    imageAlt: 'Search Engine Optimization SEO',
    deliverables: ['Technical & On-Page SEO Audits', 'High-Intent Keyword Strategy', 'Local Business & Maps SEO', 'Authority Link Building'],
  },
  {
    id: 'social-media-branding',
    category: 'SOCIAL MEDIA & BRANDING',
    title: 'Social Media Marketing & Content Scaling',
    subtitle: 'Build Authentic Brand Authority & Engage Audience.',
    desc: 'Build a high-converting social media presence across Instagram, LinkedIn, YouTube, and TikTok with strategic reels and content calendars.',
    fullDesc: 'Engage your target demographic through viral short-form video reels, strategic content calendars, active community management, and influencer partnerships.',
    imageSrc: '/158bb487-34c7-4e8d-a53f-b72845659451.webp',
    imageAlt: 'Social Media Marketing & Content Scaling',
    deliverables: ['Reels & Video Content Creation', 'Brand Authority Strategy', 'Active DM & Community Growth', 'Influencer Partnerships'],
  },
  {
    id: 'cro-funnel-scaling',
    category: 'CONVERSION & FUNNELS',
    title: 'Conversion Rate Optimization (CRO) & Sales Funnels',
    subtitle: 'Turn Website Visitors Into Paying Loyal Customers.',
    desc: 'Optimize every step of your sales funnel through heatmap audits, landing page design, A/B testing, and persuasive copywriting.',
    fullDesc: 'Transform website traffic into qualified leads and sales through conversion-focused landing page design, A/B split testing, and user behavior analytics.',
    imageSrc: '/who we are.webp',
    imageAlt: 'Conversion Rate Optimization CRO',
    deliverables: ['High-Converting Landing Pages', 'A/B Split Testing & Analytics', 'Lead Capture Form Funnels', 'Heatmap & Behavior Audits'],
  },
];

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [activeModal, setActiveModal] = useState<ServiceCardData | null>(null);

  return (
    <section
      id="services"
      style={{
        background: '#fefce8', // Light Warm Yellow Background
        padding: '6.5rem 0 7.5rem 0',
        borderBottom: '1px solid rgba(234, 179, 8, 0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Low Opacity Grid Pattern Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative Subtle Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-3%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-3%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal-fade-up">
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 900,
              background: 'rgba(253, 208, 11, 0.25)',
              color: '#0f172a',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(253, 208, 11, 0.55)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={14} color="#0f172a" /> OUR CORE CAPABILITIES
          </span>
          
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 900,
              color: '#0f172a',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}
          >
            Elevating Tomorrow's <span style={{ color: '#FDD00B', background: '#3E6AB3', padding: '0.15rem 0.6rem', borderRadius: '8px', fontStyle: 'italic', fontSize: '0.88em', boxShadow: '0 4px 15px rgba(62, 106, 179, 0.35)', display: 'inline-block' }}>Marketing ROI</span>
          </h2>
        </div>

        {/* 2-Column Staggered Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '4.5rem',
          }}
          className="services-grid-container"
        >
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            
            {/* Service 1: Web & Mobile Application Development */}
            <div
              style={{
                cursor: 'pointer',
                transition: 'transform 0.35s ease',
              }}
              className="zeniqs-card-container reveal-scale-up delay-100"
              onClick={() => setActiveModal(FEATURED_SERVICES[0])}
            >
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.1), 0 0 25px rgba(234, 179, 8, 0.12)',
                  background: '#ffffff',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                }}
              >
                <img
                  src={FEATURED_SERVICES[0].imageSrc}
                  alt={FEATURED_SERVICES[0].imageAlt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '380px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '28px',
                    transition: 'transform 0.5s ease',
                  }}
                  className="card-img"
                />
              </div>

              <div style={{ marginTop: '1.25rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
                    {FEATURED_SERVICES[0].title}
                  </h3>
                  <ArrowUpRight size={28} color="#0f172a" style={{ flexShrink: 0, marginTop: '2px' }} className="arrow-icon" />
                </div>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                  {FEATURED_SERVICES[0].desc}
                </p>
              </div>
            </div>

            {/* Service 3: Digital Marketing & Revenue Performance */}
            <div
              style={{
                cursor: 'pointer',
                transition: 'transform 0.35s ease',
              }}
              className="zeniqs-card-container reveal-scale-up delay-300"
              onClick={() => setActiveModal(FEATURED_SERVICES[2])}
            >
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.1), 0 0 25px rgba(234, 179, 8, 0.12)',
                  background: '#ffffff',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                }}
              >
                <img
                  src={FEATURED_SERVICES[2].imageSrc}
                  alt={FEATURED_SERVICES[2].imageAlt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '380px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '28px',
                    transition: 'transform 0.5s ease',
                  }}
                  className="card-img"
                />
              </div>

              <div style={{ marginTop: '1.25rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
                    {FEATURED_SERVICES[2].title}
                  </h3>
                  <ArrowUpRight size={28} color="#0f172a" style={{ flexShrink: 0, marginTop: '2px' }} className="arrow-icon" />
                </div>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                  {FEATURED_SERVICES[2].desc}
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginTop: '1rem' }} className="staggered-right-col">
            
            {/* Top Avatars & Client Stats Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.1rem',
                background: '#ffffff',
                padding: '0.85rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.04)',
                width: 'max-content',
                marginBottom: '-0.5rem',
              }}
              className="reveal-fade-up delay-100"
            >
              <div style={{ display: 'flex' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Executive 1"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', border: '3px solid #ffffff', marginLeft: 0 }}
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Executive 2"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', border: '3px solid #ffffff', marginLeft: '-12px' }}
                />
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80"
                  alt="Executive 3"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', border: '3px solid #ffffff', marginLeft: '-12px' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>150+ Enterprise Clients</div>
                <div style={{ fontSize: '0.775rem', color: '#64748b', fontWeight: 700 }}>Trusted Growth Partners</div>
              </div>
            </div>

            {/* Service 2: AI & Autonomous Workflow Automation */}
            <div
              style={{
                cursor: 'pointer',
                transition: 'transform 0.35s ease',
              }}
              className="zeniqs-card-container reveal-scale-up delay-200"
              onClick={() => setActiveModal(FEATURED_SERVICES[1])}
            >
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.1), 0 0 25px rgba(234, 179, 8, 0.12)',
                  background: '#ffffff',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                }}
              >
                <img
                  src={FEATURED_SERVICES[1].imageSrc}
                  alt={FEATURED_SERVICES[1].imageAlt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '380px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '28px',
                    transition: 'transform 0.5s ease',
                  }}
                  className="card-img"
                />
              </div>

              <div style={{ marginTop: '1.25rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
                    {FEATURED_SERVICES[1].title}
                  </h3>
                  <ArrowUpRight size={28} color="#0f172a" style={{ flexShrink: 0, marginTop: '2px' }} className="arrow-icon" />
                </div>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                  {FEATURED_SERVICES[1].desc}
                </p>
              </div>
            </div>

            {/* Service 4: Growth Acceleration & Enterprise Systems */}
            <div
              style={{
                cursor: 'pointer',
                transition: 'transform 0.35s ease',
              }}
              className="zeniqs-card-container reveal-scale-up delay-400"
              onClick={() => setActiveModal(FEATURED_SERVICES[3])}
            >
              <div
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.1), 0 0 25px rgba(234, 179, 8, 0.12)',
                  background: '#ffffff',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                }}
              >
                <img
                  src={FEATURED_SERVICES[3].imageSrc}
                  alt={FEATURED_SERVICES[3].imageAlt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '380px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '28px',
                    transition: 'transform 0.5s ease',
                  }}
                  className="card-img"
                />
              </div>

              <div style={{ marginTop: '1.25rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
                    {FEATURED_SERVICES[3].title}
                  </h3>
                  <ArrowUpRight size={28} color="#0f172a" style={{ flexShrink: 0, marginTop: '2px' }} className="arrow-icon" />
                </div>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                  {FEATURED_SERVICES[3].desc}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Contact Us Action Button Container */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onOpenBooking}
            style={{
              padding: '1.1rem 2.6rem',
              fontSize: '1.05rem',
              fontWeight: 900,
              borderRadius: 'var(--radius-full)',
              background: '#FDD00B', // Sunburst Gold Accent (#FDD00B)
              color: '#0f172a',
              border: '1.5px solid rgba(132, 204, 22, 0.5)',
              boxShadow: '0 12px 35px rgba(253, 208, 11, 0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            className="services-gold-btn"
          >
            <PhoneCall size={20} color="#0f172a" /> Contact Us For Custom Marketing Strategy <ArrowRight size={20} color="#0f172a" />
          </button>
        </div>

      </div>

      {/* Detail Modal */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2.5rem' }}>
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#f1f5f9',
                border: '1px solid rgba(15, 23, 42, 0.1)',
                color: '#0f172a',
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

            <span className="badge badge-lime" style={{ marginBottom: '0.75rem' }}>
              {activeModal.category}
            </span>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
              {activeModal.title}
            </h3>

            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#84cc16', marginBottom: '1rem' }}>
              {activeModal.subtitle}
            </div>

            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.975rem' }}>
              {activeModal.fullDesc}
            </p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                Key Capabilities & Deliverables:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
                {activeModal.deliverables.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#84cc16" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                onOpenBooking();
              }}
              className="btn btn-lime"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Get Custom Quote for {activeModal.title} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .zeniqs-card-container:hover .card-img {
          transform: scale(1.04);
        }
        .zeniqs-card-container:hover .arrow-icon {
          transform: translate(3px, -3px);
          color: #84cc16 !important;
          transition: transform 0.25s ease, color 0.25s ease;
        }
        @media (max-width: 992px) {
          .services-grid-container {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .staggered-right-col {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

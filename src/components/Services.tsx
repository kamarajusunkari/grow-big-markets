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
    id: 'web-mobile-dev',
    category: 'DEVELOPMENT & ARCHITECTURE',
    title: 'Web & Mobile Application Development',
    subtitle: 'We Build Strong Foundations. We Develop Seamless Solutions.',
    desc: 'Clean code, smart solutions, and real results. Custom responsive web platforms and native iOS/Android mobile apps engineered for scale.',
    fullDesc: 'We design and develop custom web applications and mobile apps built around your business goals, user journeys, and digital scaling requirements.',
    imageSrc: '/bdb38855-3775-42ba-8d23-f32c41f2e827.webp',
    imageAlt: 'Web & Mobile Application Development - Strong Foundations',
    deliverables: ['Custom Web Applications', 'Native iOS & Android Apps', 'Responsive Mobile-First UX', 'Core Web Vitals & Clean Code'],
  },
  {
    id: 'ai-automation',
    category: 'AI & AUTONOMOUS SYSTEMS',
    title: 'AI & Autonomous Workflow Automation',
    subtitle: 'Stop Revenue Leaks. Automate Your Business Operations.',
    desc: 'Eliminate missed invoices, duplicate payments, and manual errors with intelligent 24/7 AI chatbots, LLM agents, and automated workflows.',
    fullDesc: 'Leverage generative AI, autonomous LLM agents, chatbot support, and workflow automation platforms to cut manual tasks and operate 24/7.',
    imageSrc: '/679b7310-0afd-42d1-953b-94209bbf2c6f.png',
    imageAlt: 'AI & Automation - We Automate You Grow',
    deliverables: ['Custom LLM Chatbots & Agents', '24/7 Lead Qualification', 'Invoice & Payroll Automation', 'Predictive Workflows'],
  },
  {
    id: 'digital-marketing',
    category: 'PERFORMANCE & REVENUE',
    title: 'Digital Marketing & SEO Performance',
    subtitle: "We Don't Just Run Ads. We Generate Revenue.",
    desc: 'Performance-focused PPC campaigns, Meta & Google ads, and SEO search dominance tied directly to measurable revenue generation.',
    fullDesc: 'Scale your reach with targeted PPC campaigns, Meta & Google Ads management, social media marketing, and data-backed performance growth channels.',
    imageSrc: '/158bb487-34c7-4e8d-a53f-b72845659451.webp',
    imageAlt: 'Digital Marketing - We Generate Revenue',
    deliverables: ['Google & Meta Ads Engine', 'Technical SEO Search Dominance', 'High ROAS Campaign Strategy', 'Revenue Analytics'],
  },
  {
    id: 'growth-enterprise',
    category: 'ENTERPRISE & STRATEGY',
    title: 'Growth Acceleration & Enterprise Systems',
    subtitle: 'We Make Your Business Stronger Than You Think!',
    desc: 'Connected ERP/CRM platforms, operational scaling engines, and executive growth strategies built to amplify your business power.',
    fullDesc: 'Unify sales, operations, finance, and HR data into a single scalable command center equipped with custom pipeline automations and real-time reporting.',
    imageSrc: '/who we are.webp',
    imageAlt: 'Growth Acceleration - Business Stronger Than You Think',
    deliverables: ['Custom CRM & ERP Architecture', 'Pipeline Velocity Automation', 'Executive GTM Strategy', 'Multi-Department Analytics'],
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
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 900,
              background: 'rgba(132, 204, 22, 0.2)',
              color: '#4d7c0f',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(132, 204, 22, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={14} /> OUR CORE CAPABILITIES
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
            Elevating Tomorrow's <span style={{ color: '#84cc16' }}>IT Landscape</span>
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
              className="zeniqs-card-container"
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
              className="zeniqs-card-container"
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
              className="zeniqs-card-container"
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
              className="zeniqs-card-container"
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
            className="btn btn-dark"
            style={{
              padding: '1.1rem 2.5rem',
              fontSize: '1.05rem',
              fontWeight: 900,
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <PhoneCall size={20} color="#84cc16" /> Contact Us For Custom IT Solutions <ArrowRight size={20} />
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

import React from 'react';
import { Sparkles, Play, Quote } from 'lucide-react';

interface QuoteCardData {
  type: 'quote';
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
}

interface CaseStudyCardData {
  type: 'casestudy';
  image: string;
  logo: string;
  title: string;
}

type TestimonialCard = QuoteCardData | CaseStudyCardData;

const COLUMN_1: TestimonialCard[] = [
  {
    type: 'casestudy',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    logo: 'Grow Big Case Study',
    title: 'How Puno Automated 80% of Lead Handling',
  },
  {
    type: 'quote',
    name: 'Daniel Kim',
    role: 'Founder',
    company: 'ScaleLabs Education',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    text: 'Our enrollment process used to require manual follow-ups and spreadsheet tracking. Now, AI handles lead qualification, scheduling, reminders, and CRM updates automatically. We have increased enrollment conversion by 35% in just one quarter.',
  },
  {
    type: 'quote',
    name: 'Alex Johnson',
    role: 'Head of Operations',
    company: 'Finovate Consulting',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    text: 'Security and compliance were major concerns for us. They designed an automation architecture that was not only efficient but enterprise-grade secure.',
  },
];

const COLUMN_2: TestimonialCard[] = [
  {
    type: 'quote',
    name: 'David Lee',
    role: 'Founder',
    company: 'Aradio Studio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    text: 'We were spending hours on repetitive tasks. Their automation system saved us 30+ hours per week and dramatically improved our sales performance.',
  },
  {
    type: 'quote',
    name: 'Sarah Mitchell',
    role: 'COO',
    company: 'BrightPath SaaS',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    text: 'We struggled with inconsistent lead follow-ups and slow response times. Their AI automation blueprint gave us clarity first, then execution. Now, our CRM runs intelligently, leads are scored automatically, and follow-ups happen without manual effort. We have increased demo bookings by 40%.',
  },
  {
    type: 'quote',
    name: 'Jonathan Reed',
    role: 'Managing Director',
    company: 'Nexora Digital Agency',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80',
    text: 'We were scaling fast but drowning in manual workflows. Their automation system connected our CRM, email marketing, and reporting into one intelligent flow. The result? 30+ hours saved per week and complete visibility across our pipeline.',
  },
];

const COLUMN_3: TestimonialCard[] = [
  {
    type: 'quote',
    name: 'Michael Tran',
    role: 'Founder & CEO',
    company: 'Skyline Realty Group',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
    text: 'We reduced admin work by nearly 50% and doubled our qualified appointment bookings. The ROI was faster than we expected — and the system continues to scale with us.',
  },
  {
    type: 'casestudy',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    logo: 'Enterprise Scaling',
    title: 'Scaling SaaS Operations with AI Automation',
  },
  {
    type: 'quote',
    name: 'Laura Martinez',
    role: 'CMO',
    company: 'Elevate Commerce Co.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
    text: 'Marketing automation always felt fragmented — too many tools, not enough cohesion. They unified everything into one intelligent ecosystem. Campaign triggers, abandoned cart flows, segmentation — all automated with precision.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      style={{
        background: '#ffffff', // Clean light background matching screenshot
        padding: '6.5rem 0 7.5rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Dot Pattern Overlay */}
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
        {/* Section Header (Matching Screenshot: 007 • TESTIMONIAL & What They're Saying) */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 900,
              background: '#f1f5f9',
              color: '#0f172a',
              padding: '0.35rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={13} color="#84cc16" /> TESTIMONIALS
          </span>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              fontWeight: 900,
              color: '#0f172a',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            What They're Saying
          </h2>
        </div>

        {/* 3 Vertical Scrolling Columns with Different Duration Times (28s, 40s, 34s) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.75rem',
            height: '800px', // Fixed viewport container for smooth vertical scroll
            overflow: 'hidden',
            position: 'relative',
          }}
          className="testimonials-3-cols"
        >
          {/* Edge Fade Gradients */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'linear-gradient(to bottom, #ffffff 0%, transparent 100%)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* COLUMN 1 (Speed 1: 30s) */}
          <div className="v-scroll-col col-1">
            <div className="v-scroll-track speed-1">
              {[...COLUMN_1, ...COLUMN_1].map((item, idx) => (
                <RenderCard item={item} key={`c1-${idx}`} />
              ))}
            </div>
          </div>

          {/* COLUMN 2 (Speed 2: 42s - Different Duration Time!) */}
          <div className="v-scroll-col col-2">
            <div className="v-scroll-track speed-2">
              {[...COLUMN_2, ...COLUMN_2].map((item, idx) => (
                <RenderCard item={item} key={`c2-${idx}`} />
              ))}
            </div>
          </div>

          {/* COLUMN 3 (Speed 3: 34s - Different Duration Time!) */}
          <div className="v-scroll-col col-3">
            <div className="v-scroll-track speed-3">
              {[...COLUMN_3, ...COLUMN_3].map((item, idx) => (
                <RenderCard item={item} key={`c3-${idx}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .v-scroll-col {
          overflow: hidden;
          position: relative;
          height: 100%;
        }
        .v-scroll-track {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .speed-1 {
          animation: vScrollUp 30s linear infinite;
        }
        .speed-2 {
          animation: vScrollUp 42s linear infinite;
        }
        .speed-3 {
          animation: vScrollUp 34s linear infinite;
        }

        .v-scroll-col:hover .v-scroll-track {
          animation-play-state: paused;
        }

        @keyframes vScrollUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @media (max-width: 992px) {
          .testimonials-3-cols {
            grid-template-columns: 1fr !important;
            height: 600px !important;
          }
        }
      `}</style>
    </section>
  );
};

// Sub-component to render either Quote Card or Case Study Card
const RenderCard: React.FC<{ item: TestimonialCard }> = ({ item }) => {
  if (item.type === 'casestudy') {
    return (
      <div
        style={{
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          height: '360px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)',
            zIndex: 1,
          }}
        />

        {/* Top Play Icon Button */}
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          <Play size={18} fill="#ffffff" />
        </div>

        {/* Bottom Title */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
            zIndex: 2,
            color: '#ffffff',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#84cc16', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            {item.logo}
          </div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 900, lineHeight: 1.25, color: '#ffffff' }}>
            {item.title}
          </h4>
        </div>
      </div>
    );
  }

  // Quote Card
  return (
    <div
      style={{
        background: '#f8fafc', // Soft light card matching screenshot
        borderRadius: '24px',
        padding: '2rem 1.85rem',
        border: '1px solid rgba(15, 23, 42, 0.06)',
        position: 'relative',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Top Author Row & Quote Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <img
            src={item.avatar}
            alt={item.name}
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>{item.name}</div>
            <div style={{ fontSize: '0.775rem', color: '#64748b', fontWeight: 700 }}>
              {item.role}, {item.company}
            </div>
          </div>
        </div>

        <Quote size={24} color="#cbd5e1" style={{ flexShrink: 0 }} />
      </div>

      {/* Quote Text */}
      <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.65, fontWeight: 500 }}>
        {item.text}
      </p>
    </div>
  );
};

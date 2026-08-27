import React, { useState, useRef } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  desc: string;
  fullDesc: string;
  cardBg: string;
  textColor: string;
  subtextColor: string;
  arrowColor: string;
  image: string;
  impact: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ageaon',
    title: 'Ageaon',
    category: 'ENTERPRISE IT & CLOUD',
    desc: 'Engineered scalable cloud infrastructure & automated CI/CD pipeline for high-concurrency enterprise workloads.',
    fullDesc: 'We designed high-availability cloud architecture, zero-downtime deployment pipelines, and proactive microservice monitoring for Ageaon.',
    cardBg: '#e9d5ff', // Light Lavender
    textColor: '#0f172a',
    subtextColor: '#475569',
    arrowColor: '#0f172a',
    image: '/case study.png',
    impact: ['99.99% Cloud Uptime', '45% Infra Cost Savings', 'Sub-100ms API Latency'],
  },
  {
    id: 'choicezz',
    title: 'Choicezz',
    category: 'E-COMMERCE & MARKETPLACE',
    desc: 'Built next-gen multi-vendor e-commerce platform with AI recommendation engine and instant checkout.',
    fullDesc: 'Custom high-converting e-commerce web & mobile application featuring dynamic personalized product recommendations and integrated payment gateways.',
    cardBg: '#000000', // Solid Black
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    arrowColor: '#ffffff',
    image: '/case study (2).png',
    impact: ['3.8X Conversion Surge', '250,000+ Monthly Buyers', '12K Peak Concurrent Users'],
  },
  {
    id: 'vasishta-events',
    title: 'Vasishta Events',
    category: 'EVENT MANAGEMENT & BOOKINGS',
    desc: 'Designed interactive event booking portal with automated lead distribution & 3D decor preview tools.',
    fullDesc: 'Omnichannel digital marketing engine paired with an interactive decor visualizer that quadrupled high-value wedding and corporate event bookings.',
    cardBg: '#e9d5ff', // Light Lavender
    textColor: '#0f172a',
    subtextColor: '#475569',
    arrowColor: '#0f172a',
    image: '/case study (3).png',
    impact: ['4X Qualified Leads', '2,500+ Bookings Automated', '4.9 Star Rating'],
  },
  {
    id: 'corebridge-hr',
    title: 'Corebridge HR',
    category: 'SAAS & HRTECH',
    desc: 'Architected intelligent HR management SaaS automating payroll, attendance tracking, and onboarding.',
    fullDesc: 'Comprehensive cloud SaaS platform streamlining employee lifecycle management, automated tax deductions, and real-time attendance tracking.',
    cardBg: '#000000', // Solid Black
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    arrowColor: '#ffffff',
    image: '/case study (4).png',
    impact: ['50,000+ Active Employees', '70% Faster Onboarding', 'Zero Payroll Errors'],
  },
  {
    id: 'pragathi-mahavidyalaya',
    title: 'Pragathi Mahavidyalaya',
    category: 'EDTECH & INSTITUTIONS',
    desc: 'Deployed comprehensive campus management system, digital admissions portal, and student app.',
    fullDesc: 'Integrated institutional portal automating online fee collection, student report generation, course schedules, and parent communication.',
    cardBg: '#e9d5ff', // Light Lavender
    textColor: '#0f172a',
    subtextColor: '#475569',
    arrowColor: '#0f172a',
    image: '/case study (5).png',
    impact: ['15,000+ Enrolled Students', '90% Online Fee Collection', 'Instant Academic Analytics'],
  },
  {
    id: 'medsurgy',
    title: 'Medsurgy',
    category: 'HEALTHCARE & MEDICAL',
    desc: 'Integrated hospital operations portal with live ICU bed tracking and emergency doctor booking.',
    fullDesc: 'HIPAA-compliant hospital portal facilitating instant doctor appointments, electronic health record access, and automated SMS lab report notifications.',
    cardBg: '#000000', // Solid Black
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    arrowColor: '#ffffff',
    image: '/case study (6).png',
    impact: ['85% Reduced Wait Times', '100% Digital Health Records', '24/7 Emergency Dispatch'],
  },
  {
    id: 'raj-ki-bandi',
    title: 'Raj Ki Bandi',
    category: 'FOOD TECH & RETAIL',
    desc: 'Scaled iconic food brand with custom mobile ordering app & kitchen fulfillment network.',
    fullDesc: 'Engineered a high-velocity online ordering & multi-location delivery platform with automated kitchen dispatch, live GPS tracking, and instant settlement.',
    cardBg: '#e9d5ff', // Light Lavender
    textColor: '#0f172a',
    subtextColor: '#475569',
    arrowColor: '#0f172a',
    image: '/case study (7).png',
    impact: ['10,000+ Daily Orders', '300% Growth in 6 Months', '18 Outlets Connected'],
  },
  {
    id: 'elite-gastro',
    title: 'Elite Gastro Clinic',
    category: 'CLINICAL CARE',
    desc: 'Designed patient diagnostic portal, video consultation suite, and automated appointment reminders.',
    fullDesc: 'Specialty medical practice management software with integrated telemedicine video consultations and electronic prescription management.',
    cardBg: '#000000', // Solid Black
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    arrowColor: '#ffffff',
    image: '/case study (8).png',
    impact: ['4.8X Online Bookings', 'Zero Missed Appointments', 'HIPAA Secure Patient Portal'],
  },
  {
    id: 'surgipartner',
    title: 'Surgipartner',
    category: 'MEDTECH & SURGICAL SUPPLY',
    desc: 'Architected surgical equipment distribution platform with real-time inventory & hospital sync.',
    fullDesc: 'B2B medical device marketplace facilitating direct orders between surgical manufacturers and hospital surgical teams.',
    cardBg: '#e9d5ff', // Light Lavender
    textColor: '#0f172a',
    subtextColor: '#475569',
    arrowColor: '#0f172a',
    image: '/case study (9).png',
    impact: ['500+ Hospitals Onboarded', 'Real-Time Stock Sync', '35% Operational Savings'],
  },
  {
    id: 'coldmart',
    title: 'Coldmart',
    category: 'COLD CHAIN & LOGISTICS',
    desc: 'Developed IoT-enabled temperature monitoring & cold chain supply logistics management platform.',
    fullDesc: 'Smart cold storage and fleet tracking software with automated temperature anomaly alerts and route optimization.',
    cardBg: '#000000', // Solid Black
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    arrowColor: '#ffffff',
    image: '/case study (10).png',
    impact: ['100% Temperature Tracking', 'Zero Cargo Spoilage', '50+ Transport Fleets'],
  },
  {
    id: 'rdftm-trust',
    title: 'RDFTM Trust',
    category: 'NON-PROFIT & COMMUNITY',
    desc: 'Built transparent donation portal & community welfare tracking system for global outreach.',
    fullDesc: 'Digital fundraising platform with real-time impact dashboards, instant tax receipt generation, and donor campaign tracking.',
    cardBg: '#e9d5ff', // Light Lavender
    textColor: '#0f172a',
    subtextColor: '#475569',
    arrowColor: '#0f172a',
    image: '/case study (11).png',
    impact: ['1M+ Beneficiaries Reached', 'Instant Tax Receipting', '100% Audit Transparency'],
  },
  {
    id: 'cy9',
    title: 'Cy9',
    category: 'CYBERSECURITY',
    desc: 'Deployed threat intelligence dashboard & automated incident response architecture for Fintechs.',
    fullDesc: 'Enterprise cybersecurity suite monitoring API vulnerabilities, automated threat mitigation, and SOC2 compliance auditing.',
    cardBg: '#000000', // Solid Black
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    arrowColor: '#ffffff',
    image: '/case study (12).png',
    impact: ['Zero Security Breaches', 'Real-Time Threat Detection', 'ISO 27001 Compliant'],
  },
  {
    id: 'credson',
    title: 'Credson',
    category: 'FINTECH & LOAN APPROVALS',
    desc: 'Engineered automated credit scoring algorithm & instant digital loan origination engine.',
    fullDesc: 'Algorithmic lending engine reducing loan application approval times from days to under 60 seconds with automated credit bureau checks.',
    cardBg: '#e9d5ff', // Light Lavender
    textColor: '#0f172a',
    subtextColor: '#475569',
    arrowColor: '#0f172a',
    image: '/case study (13).png',
    impact: ['Sub-60s Loan Approvals', '$10M+ Disbursed Monthly', '99.2% Fraud Detection'],
  },
  {
    id: 'sgi-life-sciences',
    title: 'SGI Life Sciences',
    category: 'PHARMA & LIFE SCIENCES',
    desc: 'Developed clinical trial data management software & pharmaceutical compliance reporting suite.',
    fullDesc: 'Regulatory compliance SaaS managing multi-phase clinical trial documentation, lab trial data validation, and FDA regulatory submissions.',
    cardBg: '#000000', // Solid Black
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    arrowColor: '#ffffff',
    image: '/case study (16).png',
    impact: ['FDA / EMA Compliant', '50+ Active Trials Tracked', '60% Faster Reporting'],
  },
];

export const Portfolio: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Duplicate list for continuous infinite marquee loop
  const marqueeCards = [...CASE_STUDIES, ...CASE_STUDIES];

  const handleMobilePrev = () => {
    if (mobileIdx > 0) {
      const nextIdx = mobileIdx - 1;
      setMobileIdx(nextIdx);
      if (mobileTrackRef.current) {
        const cardWidth = mobileTrackRef.current.clientWidth * 0.85;
        mobileTrackRef.current.scrollTo({ left: nextIdx * cardWidth, behavior: 'smooth' });
      }
    }
  };

  const handleMobileNext = () => {
    if (mobileIdx < CASE_STUDIES.length - 1) {
      const nextIdx = mobileIdx + 1;
      setMobileIdx(nextIdx);
      if (mobileTrackRef.current) {
        const cardWidth = mobileTrackRef.current.clientWidth * 0.85;
        mobileTrackRef.current.scrollTo({ left: nextIdx * cardWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="portfolio"
      style={{
        background: '#f3e8ff', // Soft Lavender Background
        padding: '6.5rem 0 7.5rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header Container Aligned Parallel to Navbar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          marginBottom: '3.5rem',
        }}
      >
        <div style={{ textAlign: 'center' }} className="reveal-fade-up">
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
            <Sparkles size={14} color="#0f172a" /> PROVEN IMPACT & CASE STUDIES
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
            Recent Client Work That <span style={{ color: '#FDD00B', background: '#3E6AB3', padding: '0.15rem 0.6rem', borderRadius: '8px', fontStyle: 'italic', fontSize: '0.88em', boxShadow: '0 4px 15px rgba(62, 106, 179, 0.35)', display: 'inline-block' }}>Delivers Results</span>
          </h2>
        </div>
      </div>

      {/* FULL-WIDTH CONTINUOUS HORIZONTAL MARQUEE CAROUSEL (DESKTOP) */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
        className="portfolio-desktop-wrapper reveal-fade-up delay-100"
      >
        {/* Left & Right Edge Fades */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '120px',
            background: 'linear-gradient(to right, #f3e8ff 0%, transparent 100%)',
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
            background: 'linear-gradient(to left, #f3e8ff 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Marquee Track */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '1.75rem',
            width: 'max-content',
            animation: 'portfolioMarquee 50s linear infinite',
            padding: '1rem 0',
          }}
          className="portfolio-marquee-track"
        >
          {marqueeCards.map((study, idx) => (
            <div
              key={`${study.id}-${idx}`}
              onClick={() => setSelectedStudy(study)}
              style={{
                width: '380px',
                background: study.cardBg,
                borderRadius: '24px',
                padding: '2.25rem 2rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, boxShadow 0.35s ease',
              }}
              className="portfolio-card-item"
            >
              {/* Top Text Content */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: study.textColor, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {study.title}
                  </h3>
                  <ArrowUpRight size={26} color={study.arrowColor} style={{ flexShrink: 0, marginTop: '2px' }} className="arrow-btn" />
                </div>

                <p style={{ fontSize: '0.925rem', color: study.subtextColor, lineHeight: 1.6, fontWeight: 500 }}>
                  {study.desc}
                </p>
              </div>

              {/* Bottom Image Container */}
              <div
                style={{
                  width: '100%',
                  height: '230px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                }}
              >
                <img
                  src={study.image}
                  alt={study.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  className="card-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE HORIZONTAL SWIPE CAROUSEL */}
      <div className="mobile-portfolio-container">
        <div
          className="mobile-portfolio-track"
          ref={mobileTrackRef}
          onScroll={(e) => {
            const target = e.currentTarget;
            const cardWidth = target.clientWidth * 0.85;
            const newIdx = Math.round(target.scrollLeft / cardWidth);
            if (newIdx !== mobileIdx && newIdx >= 0 && newIdx < CASE_STUDIES.length) {
              setMobileIdx(newIdx);
            }
          }}
        >
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={`mob-p-${study.id}-${idx}`}
              onClick={() => setSelectedStudy(study)}
              style={{
                background: study.cardBg,
                borderRadius: '24px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                cursor: 'pointer',
                minHeight: '420px',
              }}
              className="mobile-portfolio-card-wrapper"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: study.textColor, lineHeight: 1.2 }}>
                    {study.title}
                  </h3>
                  <ArrowUpRight size={24} color={study.arrowColor} />
                </div>
                <p style={{ fontSize: '0.9rem', color: study.subtextColor, lineHeight: 1.55 }}>
                  {study.desc}
                </p>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  marginTop: '1.5rem',
                }}
              >
                <img
                  src={study.image}
                  alt={study.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Navigation Controls */}
        <div className="mobile-portfolio-controls">
          <button onClick={handleMobilePrev} disabled={mobileIdx === 0} className="mob-ctrl-btn">
            <ChevronLeft size={20} />
          </button>
          <div className="mob-dots-row">
            {CASE_STUDIES.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setMobileIdx(i);
                  if (mobileTrackRef.current) {
                    const cardWidth = mobileTrackRef.current.clientWidth * 0.85;
                    mobileTrackRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                  }
                }}
                className={`mob-dot ${mobileIdx === i ? 'is-active' : ''}`}
              />
            ))}
          </div>
          <button onClick={handleMobileNext} disabled={mobileIdx >= CASE_STUDIES.length - 1} className="mob-ctrl-btn mob-ctrl-next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <div className="modal-backdrop" onClick={() => setSelectedStudy(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2.5rem' }}>
            <button
              onClick={() => setSelectedStudy(null)}
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
              {selectedStudy.category}
            </span>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>
              {selectedStudy.title}
            </h3>

            <p style={{ color: '#475569', lineHeight: 1.65, marginBottom: '1.5rem', fontSize: '1rem' }}>
              {selectedStudy.fullDesc}
            </p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                Key Impact & Results Metrics:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
                {selectedStudy.impact.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#334155', fontWeight: 700 }}>
                    <CheckCircle2 size={16} color="#84cc16" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedStudy(null)}
              className="btn btn-lime"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Close Case Study Overview
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes portfolioMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .portfolio-marquee-track:hover {
          animation-play-state: paused;
        }
        .portfolio-card-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
        }
        .portfolio-card-item:hover .card-img {
          transform: scale(1.06);
        }
        .portfolio-card-item:hover .arrow-btn {
          transform: translate(2px, -2px);
        }
        .mobile-portfolio-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 768px) {
          .portfolio-desktop-wrapper {
            display: none !important;
          }
          .mobile-portfolio-container {
            display: block !important;
          }
          .mobile-portfolio-track {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            padding: 1rem 8% !important;
            gap: 1rem !important;
            margin-left: -2rem !important;
            margin-right: -2rem !important;
            width: calc(100% + 4rem) !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .mobile-portfolio-track::-webkit-scrollbar {
            display: none;
          }
          .mobile-portfolio-card-wrapper {
            flex: 0 0 85% !important;
            width: 85% !important;
            scroll-snap-align: center !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-portfolio-container {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

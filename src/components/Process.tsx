import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessProps {
  onOpenBooking?: () => void;
}

interface StepItem {
  stepNum: string;
  title: string;
  subtitle: string;
  desc: string;
  deliverables: string[];
  cardBg: string;
  borderColor: string;
  numBg: string;
}

const STEPS_DATA: StepItem[] = [
  {
    stepNum: '01',
    title: 'Subscribe & Discovery Audit',
    subtitle: 'Aligning Business Vision, Audience & Market Dynamics',
    desc: 'We analyze your current digital landscape, identify operational friction, profile your target customer personas, and set clear ROI targets.',
    deliverables: ['Digital Architecture Audit', 'User Persona Mapping', 'Competitor Benchmark'],
    cardBg: '#f7fee7', // Light Lime Tint
    borderColor: 'rgba(132, 204, 22, 0.4)',
    numBg: '#84cc16',
  },
  {
    stepNum: '02',
    title: "Let's Discuss & Architecture Plan",
    subtitle: 'Designing Scalable Tech & Conversion Systems',
    desc: 'We map out custom software architecture, interactive Figma UI/UX wireframes, database schemas, and multi-channel funnel blueprints.',
    deliverables: ['Interactive Figma Wireframes', 'Cloud Architecture Blueprint', 'Funnel Architecture'],
    cardBg: '#f0f9ff', // Light Sky Blue Tint
    borderColor: 'rgba(56, 189, 248, 0.4)',
    numBg: '#0ea5e9',
  },
  {
    stepNum: '03',
    title: 'Agile Sprint Engineering & AI Integration',
    subtitle: 'High-Velocity Code, Responsive UI & Autonomous AI',
    desc: 'Our engineering squad builds your custom web platform, mobile app, CRM/ERP integration, or AI automation engine using modern frameworks.',
    deliverables: ['React & Mobile Codebase', 'Autonomous AI Chatbots', 'ERP & Payment Sync'],
    cardBg: '#faf5ff', // Light Purple Tint
    borderColor: 'rgba(192, 132, 252, 0.4)',
    numBg: '#a855f7',
  },
  {
    stepNum: '04',
    title: 'Zero-Downtime Go-Live Launch',
    subtitle: 'Cloud Infrastructure & High-Availability Go-Live',
    desc: 'We execute zero-downtime cloud deployments on AWS/Azure, conduct stress tests, verify security protocols, and launch your platform.',
    deliverables: ['AWS / Azure Deployment', 'Core Web Vitals Optimization', '24/7 Security Setup'],
    cardBg: '#fffbeb', // Light Amber Tint
    borderColor: 'rgba(251, 191, 36, 0.4)',
    numBg: '#eab308',
  },
  {
    stepNum: '05',
    title: 'And Booom! Project is Ready & Scaling!',
    subtitle: 'Maximizing Conversions, Performance & Growth',
    desc: 'Post-launch, we continuously monitor user analytics, optimize ad campaigns, refine conversion funnels, and scale infrastructure as demand grows.',
    deliverables: ['A/B Conversion Testing', 'Paid Performance Scaling', 'Monthly Executive Reports'],
    cardBg: '#ecfdf5', // Light Emerald Tint
    borderColor: 'rgba(16, 185, 129, 0.4)',
    numBg: '#10b981',
  },
];

export const Process: React.FC<ProcessProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="process"
      style={{
        background: '#f8fafc', // Soft Slate Grey Section Background
        padding: '6.5rem 0 7.5rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.16) 0%, transparent 70%)',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="sticky-process-grid"
        >
          {/* LEFT COLUMN: STICKY CONTENT */}
          <div
            style={{
              position: 'sticky',
              top: '110px',
              alignSelf: 'flex-start',
              zIndex: 10,
            }}
            className="sticky-left-container"
          >
            {/* Tagline */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  background: 'rgba(132, 204, 22, 0.2)',
                  color: '#4d7c0f',
                  padding: '0.45rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(132, 204, 22, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={14} /> GROW BIG METHODOLOGY
              </span>
            </div>

            {/* Main Heading */}
            <h2
              style={{
                fontSize: 'clamp(2.3rem, 3.5vw, 3rem)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.12,
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em',
              }}
            >
              Empowering Growth & Scale in the <span style={{ color: '#84cc16' }}>Digital World</span>
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: '1.05rem',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '2.25rem',
                maxWidth: '520px',
              }}
            >
              Our 5-step engineering methodology transforms complex business goals into predictable, high-performing digital systems.
            </p>

            {/* Action CTA Button */}
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="btn btn-lime"
                style={{
                  padding: '1rem 2.4rem',
                  fontSize: '1rem',
                  fontWeight: 900,
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 12px 30px rgba(132, 204, 22, 0.35)',
                }}
              >
                Explore the Development World <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* RIGHT COLUMN: SCROLLABLE TIMELINE TRACK WITH PASTEL LIGHT OPACITY BG CARDS */}
          <div style={{ position: 'relative' }}>
            
            {/* Main Hero Color Vertical Scroll Strip (#84cc16 Lime Green) */}
            <div
              style={{
                position: 'absolute',
                top: '25px',
                bottom: '25px',
                left: '23px',
                width: '10px',
                background: 'linear-gradient(to bottom, #84cc16 0%, #a3e635 50%, #10b981 100%)',
                borderRadius: '5px',
                zIndex: 1,
                boxShadow: '0 0 20px rgba(132, 204, 22, 0.5)',
              }}
            />

            {/* Steps Track */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {STEPS_DATA.map((step) => (
                <div
                  key={step.stepNum}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '2rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Number Circle */}
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: step.numBg,
                      color: '#ffffff',
                      fontSize: '1.3rem',
                      fontWeight: 900,
                      fontFamily: 'monospace',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                      border: '4px solid #f8fafc',
                    }}
                  >
                    {parseInt(step.stepNum, 10)}
                  </div>

                  {/* Pastel Light Opacity Card */}
                  <div
                    style={{
                      flex: 1,
                      background: step.cardBg, // Light pastel opacity background per step
                      borderRadius: '26px',
                      padding: '2.25rem',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                      border: `1.5px solid ${step.borderColor}`,
                      transition: 'all 0.3s ease',
                    }}
                    className="pastel-step-card"
                  >
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        color: step.numBg,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        display: 'inline-block',
                        marginBottom: '0.35rem',
                      }}
                    >
                      STEP {step.stepNum}
                    </span>

                    <h3
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: '0.35rem',
                        lineHeight: 1.25,
                      }}
                    >
                      {step.title}
                    </h3>

                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 800,
                        color: '#64748b',
                        marginBottom: '1rem',
                      }}
                    >
                      {step.subtitle}
                    </div>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#475569',
                        lineHeight: 1.65,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {step.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {step.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          style={{
                            fontSize: '0.775rem',
                            fontWeight: 800,
                            background: '#ffffff',
                            color: '#334155',
                            padding: '0.35rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <CheckCircle2 size={13} color={step.numBg} /> {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .pastel-step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08) !important;
        }
        @media (max-width: 992px) {
          .sticky-process-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .sticky-left-container {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

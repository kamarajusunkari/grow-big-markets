import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';

interface FaqProps {
  onOpenBooking?: () => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: 'problems',
    question: 'What kind of operational problems do you solve?',
    answer: 'We help companies reduce delays, improve process visibility, remove workflow bottlenecks, optimize team coordination, and increase operational efficiency across departments.',
  },
  {
    id: 'timeline',
    question: 'How long does an operations consulting engagement take?',
    answer: 'Engagements typically range from 4 to 12 weeks depending on scope, starting with a 1-week discovery sprint followed by agile engineering, testing, and deployment phases.',
  },
  {
    id: 'companies',
    question: 'Do you work with growing mid-sized companies?',
    answer: 'Yes! We partner with ambitious startups, growing mid-sized enterprises, and established brands across IT, Real Estate, Healthcare, E-Commerce, Textiles, and Manufacturing.',
  },
  {
    id: 'roi',
    question: 'How do you measure operational improvement?',
    answer: 'We track concrete business metrics including lead conversion rates, pipeline velocity, customer acquisition costs, system uptime, and hours saved per team member.',
  },
  {
    id: 'disruption',
    question: 'Will this disrupt our current operations?',
    answer: 'Not at all. Our team works in parallel with your existing workflows, executing zero-downtime cloud deployments and providing complete team training so operations run smoothly.',
  },
  {
    id: 'tech-stack',
    question: 'What technologies and platforms do you specialize in?',
    answer: 'We specialize in custom React & TypeScript web platforms, native iOS/Android mobile apps, AWS/Azure cloud infrastructure, enterprise CRM/ERP systems, and autonomous AI agents.',
  },
  {
    id: 'support',
    question: 'What post-launch support and SLA do you provide?',
    answer: 'We offer 24/7 dedicated engineering support, automated uptime monitoring, proactive security updates, and monthly executive optimization reports to ensure ongoing scale.',
  },
];

export const Faq: React.FC<FaqProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string | null>('problems');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      style={{
        background: '#f5f2eb', // Warm off-white background
        padding: '6.5rem 0 7.5rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        position: 'relative',
      }}
    >
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
            gridTemplateColumns: '0.9fr 1.1fr', // 2 Column Split
            gap: '4.5rem',
            alignItems: 'start',
          }}
          className="faq-split-grid"
        >
          {/* LEFT COLUMN: STICKY TITLE & STILL HAVE QUESTIONS CARD */}
          <div
            style={{
              position: 'sticky',
              top: '110px',
              alignSelf: 'flex-start',
              zIndex: 10,
            }}
            className="faq-sticky-left reveal-fade-up"
          >
            {/* Tagline Subtitle */}
            <div style={{ marginBottom: '1.25rem' }}>
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
                }}
              >
                <Sparkles size={14} color="#0f172a" /> QUESTIONS & ANSWERS
              </span>
            </div>

            {/* Main Title (Consistent Brand Heading Font: Outfit) */}
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.5rem)',
                fontWeight: 900,
                color: '#0f172a',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em',
              }}
            >
              Clear answers for <br />
              <span style={{ color: '#FDD00B', background: '#3E6AB3', padding: '0.15rem 0.6rem', borderRadius: '8px', fontStyle: 'italic', fontSize: '0.88em', boxShadow: '0 4px 15px rgba(62, 106, 179, 0.35)', display: 'inline-block' }}>complex operations</span>
            </h2>

            {/* Subtitle Paragraph (Consistent Brand Body Font: Plus Jakarta Sans) */}
            <p
              style={{
                fontSize: '1.05rem',
                color: '#475569',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
                maxWidth: '480px',
              }}
            >
              Clear answers on timelines, engagement models, reporting and measurable business outcomes.
            </p>

            {/* "Still Have Questions?" Card */}
            <div
              style={{
                background: 'rgba(231, 224, 213, 0.75)',
                borderRadius: '32px',
                padding: '2.5rem 2.25rem',
                border: '1px solid rgba(28, 25, 23, 0.1)',
                maxWidth: '440px',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              }}
              className="faq-still-questions-card"
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 900,
                    color: '#0f172a',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '0.85rem',
                  }}
                >
                  Still have questions?
                </h3>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#475569',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                  }}
                >
                  Need clarity before moving forward? Speak with our operations team and get direct answers tailored to your business challenges.
                </p>
              </div>

              <div>
                <button
                  onClick={onOpenBooking}
                  style={{
                    background: '#FDD00B', // Sunburst Gold Accent (#FDD00B)
                    color: '#0f172a',
                    border: '1px solid rgba(132, 204, 22, 0.4)',
                    padding: '0.9rem 1.75rem',
                    borderRadius: '18px',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 20px rgba(253, 208, 11, 0.4)',
                    transition: 'all 0.25s ease',
                  }}
                  className="faq-cta-btn"
                >
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowRight size={18} />
                  </div>
                  <span>Book a consultation</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SCROLLABLE ACCORDION LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="faq-questions-column reveal-fade-up delay-100">
            {FAQ_LIST.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    background: '#faf8f5',
                    borderRadius: '24px',
                    padding: '1.85rem 2.25rem',
                    border: isOpen ? '1.5px solid rgba(132, 204, 22, 0.5)' : '1px solid rgba(28, 25, 23, 0.08)',
                    boxShadow: isOpen ? '0 12px 30px rgba(132, 204, 22, 0.12)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {item.question}
                    </span>

                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isOpen ? '#FDD00B' : 'rgba(28, 25, 23, 0.06)',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        marginTop: '1.25rem',
                        fontSize: '0.975rem',
                        color: '#475569',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.65,
                        borderTop: '1px solid rgba(28, 25, 23, 0.1)',
                        paddingTop: '1.25rem',
                        animation: 'fadeIn 0.3s ease-out',
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .faq-cta-btn:hover {
          transform: translateY(-2px);
          background: #d97706 !important;
        }
        @media (max-width: 768px) {
          .faq-split-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .faq-sticky-left {
            position: relative !important;
            top: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            order: 1 !important;
          }
          .faq-questions-column {
            order: 2 !important;
            width: 100% !important;
          }
          .faq-still-questions-card {
            order: 3 !important;
            margin-top: 1.5rem !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
        @media (max-width: 992px) and (min-width: 769px) {
          .faq-split-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .faq-sticky-left {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

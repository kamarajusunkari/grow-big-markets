import React, { useState } from 'react';
import { Award, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  badge: string;
  headline: string;
  beforeRev: string;
  afterRev: string;
  timeframe: string;
  cacReduction: string;
  summary: string;
  strategyUsed: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-scale',
    client: 'ApexPay Technologies',
    industry: 'FinTech',
    badge: 'Series B Scale-up',
    headline: 'Scaled Enterprise ARR from $2.4M to $11.8M in 14 Months',
    beforeRev: '$2.4M ARR',
    afterRev: '$11.8M ARR',
    timeframe: '14 Months',
    cacReduction: '62% CAC Reduction',
    summary: 'ApexPay suffered from high enterprise customer acquisition costs. Grow Big revamped their outbound AI lead engine and optimized Google/LinkedIn paid acquisition channels.',
    strategyUsed: ['AI Outbound Automation', 'ABM Campaign Structuring', 'CRO Landing Page System'],
  },
  {
    id: 'saas-hypergrowth',
    client: 'CloudFlow Analytics',
    industry: 'SaaS',
    badge: 'Hyper-Growth SaaS',
    headline: 'Boosted Product-Led Conversion Rate by +145% Across 40k Users',
    beforeRev: '1.8% Conv. Rate',
    afterRev: '4.4% Conv. Rate',
    timeframe: '6 Months',
    cacReduction: '3.4x LTV:CAC Ratio',
    summary: 'By deploying automated onboarding loops, churn prediction AI models, and friction-free payment flows, CloudFlow tripled their paid user conversion rate.',
    strategyUsed: ['Plg Funnel Architecture', 'Automated Churn Defense', 'Multi-variant Testing'],
  },
  {
    id: 'ecommerce-d2c',
    client: 'Luminary Eco-Living',
    industry: 'E-Commerce',
    badge: 'D2C Consumer Brand',
    headline: 'Expanded Annual Gross Merchandise Value (GMV) to $22.5M',
    beforeRev: '$4.1M GMV',
    afterRev: '$22.5M GMV',
    timeframe: '18 Months',
    cacReduction: '4.2x Blended ROAS',
    summary: 'Grow Big executed high-velocity TikTok & Meta ad creative testing, paired with personalized SMS retention workflows and dynamic bundle upsells.',
    strategyUsed: ['Creative Engine Production', 'SMS & Email Lifecycle Automation', 'Bundle Upsell Architecture'],
  },
  {
    id: 'healthtech-enterprise',
    client: 'PulseCare AI',
    industry: 'HealthTech',
    badge: 'Enterprise B2B',
    headline: 'Secured 38 Enterprise Hospital Contracts via ABM Pipeline',
    beforeRev: '4 Contracts/Yr',
    afterRev: '38 Contracts/Yr',
    timeframe: '12 Months',
    cacReduction: '80% Pipeline Speed',
    summary: 'Built a multi-touch Account-Based Marketing (ABM) strategy targeting healthcare CTOs and procurement committees across North America.',
    strategyUsed: ['Executive ABM Campaigns', 'Thought Leadership Content', 'CRM Sales Velocity Tuning'],
  },
];

export const CaseStudies: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const industries = ['All', 'FinTech', 'SaaS', 'E-Commerce', 'HealthTech'];

  const filteredCases = filter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.industry === filter);

  return (
    <section id="cases" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <Award size={14} /> Proven Results
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Real Business <span className="gradient-text-emerald">Transformations</span>
          </h2>
          <p>
            Explore how we partner with founders and executives to generate massive, quantifiable enterprise value.
          </p>

          {/* Industry Filter Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
              marginTop: '1.75rem',
            }}
          >
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: filter === ind ? '1px solid var(--emerald-primary)' : '1px solid var(--border-color)',
                  background: filter === ind ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
                  color: filter === ind ? '#34d399' : 'var(--text-secondary)',
                }}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="glass-card"
              style={{
                padding: '2.25rem',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                    {cs.industry} • {cs.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cs.timeframe}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {cs.client}
                </h3>

                <h4 style={{ fontSize: '1.05rem', color: '#34d399', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                  {cs.headline}
                </h4>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {cs.summary}
                </p>

                {/* Before vs After Metric Banner */}
                <div
                  style={{
                    background: 'var(--bg-input)',
                    padding: '1rem',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Baseline</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                      {cs.beforeRev}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)' }}>After Grow Big</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>
                      {cs.afterRev}
                    </div>
                  </div>
                </div>

                {/* Strategies Used Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {cs.strategyUsed.map((strat, idx) => (
                    <div key={idx} style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="var(--emerald-primary)" /> {strat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div
                style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#818cf8', fontWeight: 600 }}>
                  <ShieldCheck size={14} /> {cs.cacReduction}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  Verified Case Study <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

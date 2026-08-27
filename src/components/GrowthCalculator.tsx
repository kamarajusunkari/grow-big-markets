import React, { useState } from 'react';
import { Calculator, Sparkles, ArrowRight, Target } from 'lucide-react';

interface GrowthCalculatorProps {
  onOpenBookingWithData?: (calcData: { monthlyRev: number; projectedRev: number; gain: number }) => void;
}

export const GrowthCalculator: React.FC<GrowthCalculatorProps> = ({ onOpenBookingWithData }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(50000);
  const [targetGrowth, setTargetGrowth] = useState<number>(65); // percentage
  const [avgLtv, setAvgLtv] = useState<number>(2500);

  // Calculations
  const currentAnnualRevenue = monthlyRevenue * 12;
  const projectedMonthlyRevenue = monthlyRevenue * (1 + targetGrowth / 100);
  const projectedAnnualRevenue = projectedMonthlyRevenue * 12;
  const annualGain = projectedAnnualRevenue - currentAnnualRevenue;
  const estimatedRoiMultiplier = (3.2 + (targetGrowth / 100) * 1.5).toFixed(1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const handleClaimReport = () => {
    if (onOpenBookingWithData) {
      onOpenBookingWithData({
        monthlyRev: monthlyRevenue,
        projectedRev: projectedAnnualRevenue,
        gain: annualGain,
      });
    }
  };

  return (
    <section id="calculator" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
            <Calculator size={14} /> Interactive Estimator
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Calculate Your <span className="gradient-text-emerald">Growth Potential</span>
          </h2>
          <p>
            Adjust the metrics below to simulate your 12-month revenue expansion using Grow Big's scaling methodology.
          </p>
        </div>

        {/* Calculator Card Container */}
        <div
          className="glass-card"
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '2.5rem',
            borderRadius: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Controls Column */}
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target color="var(--emerald-primary)" size={22} /> Inputs & Baseline
            </h3>

            {/* Slider 1: Current Monthly Revenue */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Current Monthly Revenue
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--emerald-primary)' }}>
                  {formatCurrency(monthlyRevenue)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                <span>$10k/mo</span>
                <span>$250k/mo</span>
                <span>$500k/mo</span>
              </div>
            </div>

            {/* Slider 2: Target Revenue Acceleration */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Target Revenue Growth
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#818cf8' }}>
                  +{targetGrowth}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={targetGrowth}
                onChange={(e) => setTargetGrowth(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                <span>+20% Moderate</span>
                <span>+65% Scaled</span>
                <span>+200% Hyper-Growth</span>
              </div>
            </div>

            {/* Slider 3: Average Customer LTV */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Average Customer Lifetime Value (LTV)
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {formatCurrency(avgLtv)}
                </span>
              </div>
              <input
                type="range"
                min="250"
                max="20000"
                step="250"
                value={avgLtv}
                onChange={(e) => setAvgLtv(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                <span>$250</span>
                <span>$10,000</span>
                <span>$20,000</span>
              </div>
            </div>
          </div>

          {/* Realtime Output Card Column */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.12) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.2)' }}>
                <Sparkles size={14} /> Projected 12-Month Impact
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Projected New Annual Revenue
              </div>
              <div
                className="gradient-text-emerald"
                style={{
                  fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                {formatCurrency(projectedAnnualRevenue)}
              </div>

              {/* Annual Net Gain Highlight */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  padding: '1rem 1.25rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Estimated Net Annual Revenue Gain</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>
                  +{formatCurrency(annualGain)}
                </div>
              </div>

              {/* Stat Pill Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est. ROI Pipeline</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#818cf8' }}>{estimatedRoiMultiplier}x</div>
                </div>
                <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payback Period</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>&lt; 60 Days</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClaimReport}
              className="btn btn-emerald"
              style={{ width: '100%', padding: '1rem', fontSize: '0.95rem' }}
            >
              Get Custom Growth Blueprint <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

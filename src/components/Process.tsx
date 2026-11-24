import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';

interface ProcessProps {
  onOpenBooking?: () => void;
}

interface StepItem {
  stepNum: string;
  stepLevel: number;
  blockLabel: string;
  badge: string;
  title: string;
  desc: string;
  deliverables: string[];
  accentColor: string;
  accentBg: string;
  pedestalHeight: number; // Height in px for the ascending growth step
}

const STEPS_DATA: StepItem[] = [
  {
    stepNum: '01',
    stepLevel: 1,
    blockLabel: 'STEP',
    badge: 'Phase 01',
    title: 'Discovery & Audit',
    desc: 'Audit digital systems, map user personas & establish ROI benchmarks.',
    deliverables: ['Architecture Audit', 'Persona Mapping'],
    accentColor: '#3d6ab3', // Grow Big Blue
    accentBg: '#eff6ff',
    pedestalHeight: 32,
  },
  {
    stepNum: '02',
    stepLevel: 2,
    blockLabel: 'BY',
    badge: 'Phase 02',
    title: 'Architecture Plan',
    desc: 'Scalable tech architecture, interactive wireframes & funnel blueprints.',
    deliverables: ['Figma UI/UX', 'Funnel Blueprint'],
    accentColor: '#0ea5e9', // Sky Blue
    accentBg: '#f0f9ff',
    pedestalHeight: 56,
  },
  {
    stepNum: '03',
    stepLevel: 3,
    blockLabel: 'STEP',
    badge: 'Phase 03',
    title: 'Sprint Engineering',
    desc: 'High-velocity codebase, responsive UI & autonomous AI integrations.',
    deliverables: ['React & Mobile App', 'AI Automations'],
    accentColor: '#8b5cf6', // Violet
    accentBg: '#f5f3ff',
    pedestalHeight: 80,
  },
  {
    stepNum: '04',
    stepLevel: 4,
    blockLabel: 'SCALE',
    badge: 'Phase 04',
    title: 'Go-Live Launch',
    desc: 'Zero-downtime cloud deployment on AWS/Azure with speed & security tests.',
    deliverables: ['Cloud Deploy', 'Core Web Vitals'],
    accentColor: '#eab308', // Amber Gold
    accentBg: '#fefce8',
    pedestalHeight: 104,
  },
  {
    stepNum: '05',
    stepLevel: 5,
    blockLabel: 'GROW BIG',
    badge: 'Phase 05',
    title: 'GROW BIG & Scale',
    desc: 'Conversion optimization, paid ads scaling & continuous revenue expansion.',
    deliverables: ['A/B Testing', 'Revenue Scaling'],
    accentColor: '#10b981', // Emerald Peak
    accentBg: '#ecfdf5',
    pedestalHeight: 130,
  },
];

export const Process: React.FC<ProcessProps> = ({ onOpenBooking }) => {
  const [isInView, setIsInView] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full overflow-hidden bg-[#f8fafc] py-14 sm:py-16 md:py-20 border-b border-slate-200/70"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-100/30 via-yellow-100/20 to-emerald-100/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ====================================================================
            SMALL REFINED SECTION HEADING (Clean, compact, understated)
            ==================================================================== */}
        <div className="w-full flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12">
          {/* Small Category Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-[10.5px] font-mono font-bold tracking-widest text-[#1e3a8a] uppercase mb-2 shadow-2xs">
            <Sparkles size={11} className="text-[#FDD00B]" />
            <span>GROW BIG METHODOLOGY</span>
          </div>

          {/* Small Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Step-by-Step Growth Architecture
          </h2>

          {/* Short 1-Line Subtitle */}
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1">
            A systematic 5-phase engineering process engineered for predictability and scale.
          </p>
        </div>

        {/* ====================================================================
            ASCENDING GROWTH STAIRCASE: All 5 Cards In Viewport
            (Each card is elevated little above the previous card,
             with a real sequential growth reveal animation on scroll)
            ==================================================================== */}
        <div className="w-full">
          {/* 5-Column Grid on Desktop, Smooth Snap on Mobile */}
          <div className="flex lg:grid lg:grid-cols-5 items-end gap-3 sm:gap-3.5 lg:gap-4 overflow-x-auto lg:overflow-visible pb-4 pt-2 scrollbar-none snap-x snap-mandatory">
            {STEPS_DATA.map((step, idx) => {
              const isHovered = hoveredIdx === idx;
              const isPeak = idx === 4;

              // Staggered Growth Reveal Delay
              const staggerDelay = idx * 110; // 0ms, 110ms, 220ms, 330ms, 440ms

              return (
                <div
                  key={step.stepNum}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="snap-center shrink-0 w-[240px] sm:w-[260px] lg:w-auto flex flex-col justify-end group transition-all duration-300"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView
                      ? 'translateY(0) scale(1)'
                      : 'translateY(50px) scale(0.93)',
                    transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
                  }}
                >
                  {/* The Card Component */}
                  <div
                    className={`relative overflow-hidden flex flex-col justify-between rounded-2xl p-4 sm:p-4.5 bg-white border transition-all duration-300 min-h-[220px] sm:min-h-[235px] ${
                      isHovered
                        ? '-translate-y-1.5 shadow-xl border-slate-300'
                        : 'shadow-xs border-slate-200/80 hover:shadow-md'
                    } ${isPeak ? 'ring-2 ring-[#10b981]/30' : ''}`}
                  >
                    {/* Top Level Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-mono font-black text-white shadow-xs"
                            style={{ background: step.accentColor }}
                          >
                            {step.stepNum}
                          </span>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider font-mono"
                            style={{ color: step.accentColor }}
                          >
                            {step.badge}
                          </span>
                        </div>
                        <span className="text-[9.5px] font-mono font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                          Lvl 0{step.stepLevel}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-900 leading-snug mb-1.5">
                        {step.title}
                      </h3>

                      {/* Concise Description */}
                      <p className="text-[11.5px] text-slate-500 leading-relaxed mb-2.5">
                        {step.desc}
                      </p>
                    </div>

                    {/* Concise 2-Pill Deliverables */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 mt-auto">
                      {step.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="text-[10.5px] font-medium text-slate-700 bg-slate-50/80 px-2 py-0.5 rounded-md border border-slate-100 flex items-center gap-1.5"
                        >
                          <CheckCircle2
                            size={10}
                            style={{ color: step.accentColor }}
                            className="shrink-0"
                          />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Top Accent Stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 transition-all"
                      style={{
                        background: isPeak
                          ? 'linear-gradient(90deg, #FDD00B 0%, #3d6ab3 50%, #10b981 100%)'
                          : step.accentColor,
                      }}
                    />
                  </div>

                  {/* ================================================================
                      STEPPED GROWTH PEDESTAL (Physically lifts each card LITTLE ABOVE)
                      Real Growth Scale-Up Animation
                      ================================================================ */}
                  <div
                    className="w-full rounded-xl flex flex-col items-center justify-center text-center mt-2 border transition-all duration-500 shadow-2xs overflow-hidden"
                    style={{
                      height: `${step.pedestalHeight}px`,
                      background: isPeak
                        ? 'linear-gradient(135deg, #FDD00B 0%, #3d6ab3 50%, #10b981 100%)'
                        : `linear-gradient(180deg, ${step.accentBg} 0%, white 100%)`,
                      borderColor: isPeak ? 'rgba(16, 185, 129, 0.4)' : 'rgba(226, 232, 240, 0.9)',
                      transformOrigin: 'bottom',
                      transform: isInView ? 'scaleY(1)' : 'scaleY(0)',
                      transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${
                        staggerDelay + 50
                      }ms`,
                    }}
                  >
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider font-mono ${
                        isPeak ? 'text-white drop-shadow-sm' : 'text-slate-800'
                      }`}
                    >
                      {step.blockLabel}
                    </span>
                    <span
                      className={`text-[8.5px] font-bold font-mono mt-0.5 ${
                        isPeak ? 'text-white/90' : 'text-slate-400'
                      }`}
                    >
                      +{step.pedestalHeight}px Growth
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ====================================================================
              SUBTLE BASELINE PROGRESSION TRACK & BOTTOM CTA
              ==================================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/80 text-xs text-slate-500 mt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3d6ab3]" />
              <span className="font-medium text-slate-600">Phase 01 Baseline</span>
              <span className="font-mono text-slate-300">─────▶</span>
              <span className="flex items-center gap-1 font-bold text-[#10b981]">
                <TrendingUp size={13} />
                Phase 05 Scale Summit
              </span>
            </div>

            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] hover:text-[#3d6ab3] transition-colors"
              >
                <span>Discuss Your Growth Architecture</span>
                <ArrowUpRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Process;

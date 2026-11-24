import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface ProcessProps {
  onOpenBooking?: () => void;
}

interface StepItem {
  stepNum: string;
  stepTag: string;
  title: string;
  desc: string;
  imageSrc: string;
  badgeColor: string;
  cardHeight: number; // Increasing height in px: 280, 315, 350, 385, 420
  imageHeight: number; // Increasing image height in px: 110, 125, 140, 155, 175
  deliverables?: string[];
}

const STEPS_DATA: StepItem[] = [
  {
    stepNum: '01',
    stepTag: 'AUDIT',
    title: 'Discovery & Audit',
    desc: 'Deep-dive digital systems audit, persona mapping & ROI benchmark roadmap.',
    imageSrc: '/08bb2c3d-c44b-4a7c-a619-827e21876041.png',
    badgeColor: '#3d6ab3', // Grow Big Blue
    cardHeight: 280, // Step 1: On the bottom ground baseline
    imageHeight: 110,
  },
  {
    stepNum: '02',
    stepTag: 'PLAN',
    title: 'Architecture Plan',
    desc: 'Scalable cloud infrastructure, Figma UX prototypes & conversion funnel blueprints.',
    imageSrc: '/9f493760-7736-405f-91a5-9e820c7437bd.png',
    badgeColor: '#0ea5e9', // Sky Blue
    cardHeight: 315, // Step 2: Increases height (+35px)
    imageHeight: 125,
    deliverables: ['Figma UI/UX Prototype'],
  },
  {
    stepNum: '03',
    stepTag: 'BUILD',
    title: 'Sprint Engineering',
    desc: 'High-velocity web & mobile codebase, database schemas & autonomous AI engines.',
    imageSrc: '/fd555308-e374-46dc-b0dd-845fb535289d.png',
    badgeColor: '#8b5cf6', // Violet
    cardHeight: 350, // Step 3: Increases height (+35px)
    imageHeight: 140,
    deliverables: ['React & Mobile App', 'AI Automations'],
  },
  {
    stepNum: '04',
    stepTag: 'LAUNCH',
    title: 'Go-Live Launch',
    desc: 'Zero-downtime cloud deploy on AWS/Azure with speed & enterprise security protocols.',
    imageSrc: '/27041215-fa1b-4b51-9458-5ef3071e27eb.png',
    badgeColor: '#eab308', // Amber Gold
    cardHeight: 385, // Step 4: Increases height (+35px)
    imageHeight: 155,
    deliverables: ['Cloud Deployment', 'Core Web Vitals'],
  },
  {
    stepNum: '05',
    stepTag: 'SCALE',
    title: 'GROW BIG Scaling',
    desc: 'Full-funnel conversion rate optimization, viral paid ads & exponential revenue scale.',
    imageSrc: '/61c21095-46e4-4d45-b98c-8325f99d614c.png',
    badgeColor: '#10b981', // Emerald Peak
    cardHeight: 420, // Step 5: Highest peak summit (+35px)
    imageHeight: 175,
    deliverables: ['Conversion Optimization', 'Revenue Scaling'],
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
      { threshold: 0.12 }
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
      className="relative w-full overflow-hidden bg-[#f8fafc] py-14 sm:py-16 md:py-20 border-b border-slate-200/70 select-none"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-r from-blue-100/35 via-yellow-100/25 to-emerald-100/35 rounded-full blur-3xl pointer-events-none"
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
            ASCENDING GROWTH STAIRCASE (Aligned to the SAME BOTTOM Ground)
            Step 1 starts on the bottom ground, and each step increases in height:
            280px -> 315px -> 350px -> 385px -> 420px (Peak Summit at Top Right)
            ==================================================================== */}
        <div className="w-full">
          {/* 5-Column Grid with items-end: All cards rest on the SAME bottom line */}
          <div className="flex lg:grid lg:grid-cols-5 items-end gap-3.5 sm:gap-4 lg:gap-4.5 overflow-x-auto lg:overflow-visible pb-2 pt-4 scrollbar-none snap-x snap-mandatory min-h-[440px]">
            {STEPS_DATA.map((step, idx) => {
              const isHovered = hoveredIdx === idx;
              const isSummit = idx === 4;

              // Staggered Growth Reveal Delay: 0ms, 100ms, 200ms, 300ms, 400ms
              const staggerDelay = idx * 100;

              return (
                <div
                  key={step.stepNum}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="snap-center shrink-0 w-[250px] sm:w-[270px] lg:w-auto flex flex-col justify-end group transition-all duration-300"
                  style={{
                    height: `${step.cardHeight}px`,
                    transformOrigin: 'bottom',
                    opacity: isInView ? 1 : 0,
                    transform: isInView
                      ? 'scaleY(1) translateY(0)'
                      : 'scaleY(0.75) translateY(20px)',
                    transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
                  }}
                >
                  {/* Clean Growth Card (Shares the SAME bottom line with all cards) */}
                  <div
                    className={`relative w-full h-full overflow-hidden flex flex-col justify-between rounded-2xl bg-white border transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? '-translate-y-2 shadow-xl border-slate-300'
                        : 'shadow-xs border-slate-200/90 hover:shadow-md'
                    } ${isSummit ? 'ring-2 ring-[#10b981]/40 shadow-emerald-500/10' : ''}`}
                  >
                    {/* Top Image Banner (Scales with card height: 110px -> 175px) */}
                    <div
                      className="relative w-full bg-slate-100 overflow-hidden rounded-t-2xl shrink-0"
                      style={{ height: `${step.imageHeight}px` }}
                    >
                      <img
                        src={step.imageSrc}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                        loading="lazy"
                      />

                      {/* Top Overlay Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span
                          className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-mono font-black text-white shadow-xs backdrop-blur-xs"
                          style={{ background: step.badgeColor }}
                        >
                          {step.stepNum}
                        </span>
                        <span className="text-[9.5px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-white/90 text-slate-800 shadow-2xs backdrop-blur-xs">
                          {step.stepTag}
                        </span>
                      </div>

                      {/* Level Chip */}
                      <div className="absolute top-2.5 right-2.5 text-[9px] font-mono font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded shadow-2xs backdrop-blur-xs">
                        Lvl 0{idx + 1}
                      </div>

                      {/* Subtle Bottom Image Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                    </div>

                    {/* Card Content (Clean & Reduced) */}
                    <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-900 leading-snug mb-1">
                          {step.title}
                        </h3>

                        {/* Short 1-Line Description */}
                        <p className="text-[11.5px] text-slate-500 leading-relaxed mb-2 line-clamp-2">
                          {step.desc}
                        </p>

                        {/* Key Deliverable Pills (Visible as height increases) */}
                        {step.deliverables && (
                          <div className="flex flex-wrap gap-1 mt-1 mb-2">
                            {step.deliverables.map((d, dIdx) => (
                              <span
                                key={dIdx}
                                className="text-[10px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 inline-flex items-center gap-1"
                              >
                                <CheckCircle2 size={10} style={{ color: step.badgeColor }} />
                                <span>{d}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Integrated Stepped Growth Progress Bar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] mt-auto">
                        <span className="font-mono text-slate-400 font-semibold">
                          Step 0{idx + 1}/05
                        </span>
                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden mx-2">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(idx + 1) * 20}%`,
                              background: isSummit ? '#10b981' : step.badgeColor,
                            }}
                          />
                        </div>
                        <span
                          className="font-bold text-[10px] uppercase font-mono"
                          style={{ color: isSummit ? '#10b981' : step.badgeColor }}
                        >
                          {isSummit ? 'PEAK ↗' : `+${(idx + 1) * 20}%`}
                        </span>
                      </div>
                    </div>

                    {/* Top Accent Stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 transition-all"
                      style={{
                        background: isSummit
                          ? 'linear-gradient(90deg, #FDD00B 0%, #3d6ab3 50%, #10b981 100%)'
                          : step.badgeColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ====================================================================
              SHARED BOTTOM GROUND LINE: All cards anchor to this same bottom!
              ==================================================================== */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-slate-200 text-xs text-slate-500 mt-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3d6ab3]" />
              <span className="font-bold text-slate-700">Step 01 Ground Baseline</span>
              <span className="font-mono text-slate-300">────────────────────────▶</span>
              <span className="flex items-center gap-1 font-bold text-[#10b981]">
                <TrendingUp size={14} />
                Step 05 Peak Elevation
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

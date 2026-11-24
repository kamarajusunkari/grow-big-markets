import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';

interface ProcessProps {
  onOpenBooking?: () => void;
}

interface StepItem {
  stepNum: string;
  stepTag: string;
  stageName: string;
  title: string;
  desc: string;
  imageSrc: string;
  badgeColor: string;
  cardHeight: number; // 310, 370, 440, 515
  imageHeight: number; // 145, 175, 210, 245
  deliverables: string[];
}

const STEPS_DATA: StepItem[] = [
  {
    stepNum: '01',
    stepTag: 'DISCOVER',
    stageName: 'AUDIT',
    title: 'Discovery & Audit',
    desc: 'Deep-dive digital systems audit, customer persona mapping & measurable ROI benchmark roadmap.',
    imageSrc: '/08bb2c3d-c44b-4a7c-a619-827e21876041.png',
    badgeColor: '#3d6ab3', // Grow Big Blue
    cardHeight: 310, // Step 1: Baseline elevation
    imageHeight: 145,
    deliverables: ['Digital Systems Audit', 'ROI Benchmark Roadmap'],
  },
  {
    stepNum: '02',
    stepTag: 'DESIGN',
    stageName: 'PLAN',
    title: 'Architecture & UI/UX',
    desc: 'Scalable cloud database schemas, interactive Figma prototypes & multi-channel funnel blueprints.',
    imageSrc: '/9f493760-7736-405f-91a5-9e820c7437bd.png',
    badgeColor: '#0ea5e9', // Sky Blue
    cardHeight: 370, // Step 2: Increases height (+60px)
    imageHeight: 175,
    deliverables: ['Figma UI/UX Prototypes', 'Funnel Architecture'],
  },
  {
    stepNum: '03',
    stepTag: 'DEVELOP',
    stageName: 'BUILD',
    title: 'Sprint Engineering',
    desc: 'High-velocity full-stack codebase, native mobile apps & autonomous AI workflow integrations.',
    imageSrc: '/fd555308-e374-46dc-b0dd-845fb535289d.png',
    badgeColor: '#8b5cf6', // Royal Violet
    cardHeight: 440, // Step 3: Increases height (+70px)
    imageHeight: 210,
    deliverables: ['React & Mobile Codebase', 'Autonomous AI Engines'],
  },
  {
    stepNum: '04',
    stepTag: 'GROW BIG',
    stageName: 'SCALE',
    title: 'Launch & Scale',
    desc: 'Zero-downtime deployment on AWS/Azure, multi-channel viral ads & compound revenue scaling.',
    imageSrc: '/61c21095-46e4-4d45-b98c-8325f99d614c.png',
    badgeColor: '#10b981', // Emerald Summit & Sunburst Gold
    cardHeight: 515, // Step 4: Summit Peak (+75px)
    imageHeight: 245,
    deliverables: ['Zero-Downtime Launch', 'Paid Acquisition Funnels', 'Compound Revenue Scale'],
  },
];

export const Process: React.FC<ProcessProps> = () => {
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
      { threshold: 0.1 }
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
      className="relative w-full overflow-hidden bg-[#f8fafc] py-14 sm:py-18 md:py-24 border-b border-slate-200/70 select-none"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-100/35 via-yellow-100/25 to-emerald-100/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ====================================================================
            THE STAIRCASE STAGE:
            Heading sits on the top-left in the open space above Cards 1 & 2,
            while Cards 3 & 4 rise high up on the right!
            ==================================================================== */}
        <div className="relative w-full">
          {/* Main Headline: Positioned on Top-Left above Cards 1 & 2 */}
          <div className="lg:absolute lg:top-2 lg:left-0 z-20 mb-8 lg:mb-0 max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Smart Systems Built for Every <br className="hidden sm:inline" />
              Growing Business
            </h2>
          </div>

          {/* 4 Cards Ascending Staircase Grid (All aligned to the SAME bottom) */}
          <div className="flex lg:grid lg:grid-cols-4 items-end gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible pb-2 pt-6 lg:pt-8 scrollbar-none snap-x snap-mandatory min-h-[530px]">
            {STEPS_DATA.map((step, idx) => {
              const isHovered = hoveredIdx === idx;
              const isSummit = idx === 3;

              // Staggered Growth Reveal Delay: 0ms, 120ms, 240ms, 360ms
              const staggerDelay = idx * 120;

              return (
                <div
                  key={step.stepNum}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="snap-center shrink-0 w-[280px] sm:w-[320px] lg:w-auto flex flex-col justify-end group transition-all duration-300"
                  style={{
                    height: `${step.cardHeight}px`,
                    transformOrigin: 'bottom',
                    opacity: isInView ? 1 : 0,
                    transform: isInView
                      ? 'scaleY(1) translateY(0)'
                      : 'scaleY(0.82) translateY(20px)',
                    transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
                  }}
                >
                  {/* Clean Spacious 3D Card (Shares the SAME bottom baseline) */}
                  <div
                    className={`relative w-full h-full overflow-hidden flex flex-col justify-between rounded-3xl bg-white border transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? '-translate-y-2.5 shadow-2xl border-slate-300'
                        : 'shadow-sm border-slate-200/90 hover:shadow-xl'
                    } ${isSummit ? 'ring-2 ring-[#10b981]/50 shadow-emerald-500/15' : ''}`}
                  >
                    {/* Top 3D Art Banner (Scales with card height: 145px -> 245px) */}
                    <div
                      className="relative w-full bg-slate-100 overflow-hidden rounded-t-[22px] shrink-0"
                      style={{ height: `${step.imageHeight}px` }}
                    >
                      <img
                        src={step.imageSrc}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                        loading="lazy"
                      />

                      {/* Top Overlay Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-black text-white shadow-sm backdrop-blur-xs"
                          style={{ background: step.badgeColor }}
                        >
                          {step.stepNum}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-2xs backdrop-blur-xs border border-black/5">
                          {step.stepTag}
                        </span>
                      </div>

                      {/* Summit Gold Badge on Step 04 */}
                      {isSummit ? (
                        <div className="absolute top-3 right-3 text-[10px] font-mono font-black text-[#0f172a] bg-[#FDD00B] px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <TrendingUp size={11} />
                          <span>PEAK</span>
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-slate-600 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs backdrop-blur-xs border border-black/5">
                          Stage 0{idx + 1}
                        </div>
                      )}

                      {/* Subtle Bottom Image Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Card Body (Spacious & Clean) */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-1.5">
                          {step.title}
                        </h3>

                        {/* Concise Description */}
                        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-3">
                          {step.desc}
                        </p>

                        {/* Key Deliverables Pills */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {step.deliverables.map((d, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[11px] font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 inline-flex items-center gap-1.5 shadow-2xs"
                            >
                              <CheckCircle2
                                size={12}
                                style={{ color: step.badgeColor }}
                                className="shrink-0"
                              />
                              <span>{d}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Subtle Growth Vector (Visible on taller cards) */}
                      {idx >= 2 && (
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono mt-3">
                          <span className="font-semibold text-slate-500">
                            {step.stageName} PHASE
                          </span>
                          <span
                            className="font-bold text-[11px] uppercase tracking-wide flex items-center gap-0.5"
                            style={{ color: isSummit ? '#10b981' : step.badgeColor }}
                          >
                            <span>{isSummit ? 'SUMMIT 100%' : `LEVEL 0${idx + 1}`}</span>
                            <ArrowUpRight size={12} />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Top Accent Stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5 transition-all"
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

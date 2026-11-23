import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, PhoneCall, X, Sparkles } from 'lucide-react';

interface IndustriesProps {
  onOpenBooking?: () => void;
}

interface IndustryItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  metric: string;
  desc: string;
  deliverables: string[];
  icon: (props: { className?: string }) => React.JSX.Element;
}

/* ==========================================================================
   CUSTOM STROKE OUTLINE ICONS
   ========================================================================== */

// 1. Travel & Hospitality: Suitcase with handle, straps, lock, and safety shield badge
const TravelHospitalityIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M26 18V13C26 11.3431 27.3431 10 29 10H35C36.6569 10 38 11.3431 38 13V18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <rect x="12" y="18" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2.2" />
    <line x1="12" y1="34" x2="52" y2="34" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 2" />
    <rect x="29" y="31" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" fill="#18181b" />
    <line x1="22" y1="18" x2="22" y2="50" stroke="currentColor" strokeWidth="1.8" />
    <line x1="42" y1="18" x2="42" y2="50" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M44 8L54 12V20C54 26 49 30 44 32C39 30 34 26 34 20V12L44 8Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="#18181b"
    />
    <path d="M44 14V22M40 18H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="17" y="50" width="5" height="3" rx="1.5" fill="currentColor" />
    <rect x="42" y="50" width="5" height="3" rx="1.5" fill="currentColor" />
  </svg>
);

// 2. IT / ITES: Desktop computer monitor on stand with "i" information screen
const ItItesIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="11" y="10" width="42" height="30" rx="3.5" stroke="currentColor" strokeWidth="2.2" />
    <rect x="15" y="14" width="34" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
    <path d="M32 40V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 48H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 53H48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.6" />
    <circle cx="32" cy="20.5" r="2.2" fill="currentColor" />
    <path d="M30 25H32.5V31H34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 3. Healthcare: Two hands cupping and protecting a heart with pulse
const HealthcareIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M32 28C32 28 26 21 21 24C16.5 26.7 17 33 21.5 37.5L32 46L42.5 37.5C47 33 47.5 26.7 43 24C38 21 32 28 32 28Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M12 40C12 40 17 34 23 37L28 39.5M10 44C13 44 20 42 26 44L30 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 44C9 42 9 37 14 36C18 35 22 36 26 39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 40C52 40 47 34 41 37L36 39.5M54 44C51 44 44 42 38 44L34 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M54 44C55 42 55 37 50 36C46 35 42 36 38 39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 23C29.2 21.7 30.5 21 32 21C33.5 21 34.8 21.7 36 23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.7" />
  </svg>
);

// 4. Education: Teacher at whiteboard with students/audience
const EducationIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="18" y="10" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="2.2" />
    <line x1="28" y1="16" x2="48" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="28" y1="21" x2="42" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="28" y1="26" x2="38" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16" cy="18" r="3.5" stroke="currentColor" strokeWidth="2" />
    <path d="M16 23V35M16 26L26 21M16 35L12 43M16 35L20 43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="34" x2="19" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="34" x2="53" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="28" cy="45" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M23 54C23 50.5 25 49 28 49C31 49 33 50.5 33 54" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="38" cy="45" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M33 54C33 50.5 35 49 38 49C41 49 43 50.5 43 54" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="48" cy="45" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M43 54C43 50.5 45 49 48 49C51 49 53 50.5 53 54" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 5. E-Commerce & D2C Brands: Shopping bag with upward growth momentum
const EcommerceIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="14" y="20" width="36" height="34" rx="4" stroke="currentColor" strokeWidth="2.2" />
    <path
      d="M24 24V14C24 10.6863 26.6863 8 30 8H34C37.3137 8 40 10.6863 40 14V24"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M23 38L29 32L35 36L42 27"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M37 27H42V32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="46" x2="44" y2="46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />
  </svg>
);

// 6. Real Estate & PropTech: Modern architecture skyline and tower
const RealEstateIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 12H38V52H22V12Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M22 12L30 6L38 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 24H22V52H12V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M38 20H48V52H38V20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <line x1="27" y1="18" x2="33" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="27" y1="24" x2="33" y2="24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="27" y1="30" x2="33" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="27" y1="36" x2="33" y2="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="27" y1="42" x2="33" y2="42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8" y1="52" x2="56" y2="52" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 7. Manufacturing: Conveyor belt with rising output bar chart
const ManufacturingIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="18" y="27" width="6" height="11" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="28" y="21" width="6" height="17" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="38" y="15" width="6" height="23" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="11" y="38" width="42" height="10" rx="5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="16" cy="43" r="2.2" fill="currentColor" />
    <circle cx="26.5" cy="43" r="2.2" fill="currentColor" />
    <circle cx="37.5" cy="43" r="2.2" fill="currentColor" />
    <circle cx="48" cy="43" r="2.2" fill="currentColor" />
    <line x1="16" y1="48" x2="16" y2="53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="48" y1="48" x2="48" y2="53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="53" x2="52" y2="53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 8. BFSI: Open hand holding money bag with currency symbol
const BfsiIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M29 20C29 20 27 14 32 14C37 14 35 20 35 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="27" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M27 20C24 22 21 26 21 33C21 40 25 43 32 43C39 43 43 40 43 33C43 26 40 22 37 20"
      stroke="currentColor"
      strokeWidth="2.2"
      fill="#18181b"
    />
    <path d="M33 26C31 25.5 30 26.5 30 28C30 30 34 29.5 34 32C34 33.5 32.5 34.5 31 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="24.5" x2="32" y2="35.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 47H26L34 46C38 45.5 44 47 48 49L52 50" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 47C20 47 16 48 14 51L24 51C30 51 36 49.5 41 51L47 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ==========================================================================
   INDUSTRIES DATA (8 Core Verticals in 4x2 Grid)
   ========================================================================== */

const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'travel-hospitality',
    title: 'Travel & Hospitality',
    shortTitle: 'Travel & Hospitality',
    category: 'HOTELS, RESORTS & TOURISM',
    metric: '92% Direct Bookings • 5.8X ROI',
    desc: 'High-converting direct booking funnels, seasonal paid demand capture, OTA commission reduction, and luxury guest remarketing engines.',
    deliverables: [
      'Direct Website Booking Engines & Funnels',
      'Meta Search (Google Hotel Ads & TripAdvisor)',
      'High-Intent Regional & International PPC',
      'Influencer Stays & Viral Travel Reels',
    ],
    icon: TravelHospitalityIcon,
  },
  {
    id: 'it-ites',
    title: 'IT / ITES',
    shortTitle: 'IT / ITES & SaaS',
    category: 'ENTERPRISE TECH & IT SERVICES',
    metric: '120+ SQLs/Mo • 4.1X Pipeline Surge',
    desc: 'Account-Based Marketing (ABM), LinkedIn enterprise demand generation, and technical content architectures that accelerate deals for B2B tech firms.',
    deliverables: [
      'Account-Based Marketing (ABM) on LinkedIn',
      'High-Intent B2B Search & Solution Keywords',
      'Whitepaper & Case Study Lead Capture Funnels',
      'HubSpot / Salesforce Automated CRM Nurture',
    ],
    icon: ItItesIcon,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    shortTitle: 'Healthcare & MedTech',
    category: 'SPECIALTY CLINICS & MEDTECH',
    metric: '82% Lower CAC • 35,000+ Consults',
    desc: 'HIPAA-compliant patient acquisition funnels, local Google Maps 3-pack dominance, and doctor authority branding that drives qualified inquiries.',
    deliverables: [
      'Local Medical SEO & Google Maps 3-Pack',
      'High-Trust Video Patient Testimonials',
      'HIPAA-Compliant Click-to-Call Ads',
      'Automated Appointment Booking Routing',
    ],
    icon: HealthcareIcon,
  },
  {
    id: 'education',
    title: 'Education',
    shortTitle: 'Education & EdTech',
    category: 'EDTECH, UNIVERSITIES & INSTITUTES',
    metric: '1.2M+ Students • 88% Retention',
    desc: 'Multi-touch admissions funnels, free masterclass / demo day acquisition pipelines, and programmatic retargeting that scale enrollments profitably.',
    deliverables: [
      'Demo Class & Free Masterclass Funnels',
      'Admissions Deadline High-Urgency PPC',
      'WhatsApp & Email Automated Counseling',
      'Omnichannel Attribution & LTV Optimization',
    ],
    icon: EducationIcon,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & D2C',
    shortTitle: 'E-Commerce & D2C Brands',
    category: 'DIRECT-TO-CONSUMER & RETAIL',
    metric: '4.8X ROAS • 2.4M+ Orders',
    desc: 'Omnichannel catalog advertising, Meta & TikTok viral acquisition, average order value (AOV) expansion, and automated customer retention funnels.',
    deliverables: [
      'Dynamic Catalog & Shopping Ads (Meta, Google, TikTok)',
      'High-Converting D2C Landing Page Funnels',
      'Klaviyo Email & SMS Retention Flows',
      'Omnichannel Attribution & ROAS Scaling',
    ],
    icon: EcommerceIcon,
  },
  {
    id: 'real-estate',
    title: 'Real Estate & PropTech',
    shortTitle: 'Real Estate & PropTech',
    category: 'LUXURY & COMMERCIAL DEVELOPMENTS',
    metric: '₹180Cr+ Asset Sales • 14.2X Pipeline',
    desc: 'High-net-worth (HNW) buyer targeting, virtual walkthrough tour funnels, hyper-local geotargeting, and verified developer sales lead generation.',
    deliverables: [
      'HNW & Investor Lead Generation Campaigns',
      'Virtual Tour & Architectural Landing Pages',
      'Hyper-Targeted Local & NRI Buyer Ads',
      'Automated Lead Qualification & CRM Routing',
    ],
    icon: RealEstateIcon,
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    shortTitle: 'Manufacturing & Industrial',
    category: 'OEM, B2B & GLOBAL EXPORTS',
    metric: '₹180Cr+ B2B Deals • 14.2X Pipeline',
    desc: 'B2B buyer discovery systems, precision procurement targeting, digital product catalog ads, and international buyer inquiry pipelines.',
    deliverables: [
      'Global Export Inquiries & Procurement PPC',
      'Trade Show & Industrial Expo Retargeting',
      'B2B Product Video & Facility Showcases',
      'RFQ (Request for Quote) High-Value Capture',
    ],
    icon: ManufacturingIcon,
  },
  {
    id: 'bfsi',
    title: 'Banking & Financial (BFSI)',
    shortTitle: 'Banking, Financial Services & Insurance',
    category: 'FINTECH, WEALTH & INSURANCE',
    metric: '₹450Cr+ Disbursals • 99.4% KYC',
    desc: 'High-trust acquisition funnels for wealth management, loans, insurtech, and advisory services backed by institutional-grade compliance.',
    deliverables: [
      'High-Trust Wealth Advisory Lead Funnels',
      'Pre-Qualified Loan & Policy Lead Engines',
      'Strict Regulatory & Data-Compliant Ad Systems',
      'Multi-Step Verified OTP/KYC Capture Pages',
    ],
    icon: BfsiIcon,
  },
];

export const Industries: React.FC<IndustriesProps> = ({ onOpenBooking }) => {
  const [activeItem, setActiveItem] = useState<IndustryItem | null>(null);

  return (
    <section
      id="industries"
      className="relative w-full overflow-hidden text-slate-900 select-none py-16 sm:py-24 bg-[#f8fafc]"
    >
      {/* ====================================================================
          CLEAN SKYLINE BACKGROUND (No heavy masks, pristine clarity)
          ==================================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/industries-bg.jpg')",
            filter: 'grayscale(100%) contrast(108%) brightness(102%)',
          }}
        />
      </div>

      {/* ====================================================================
          MAIN 1400PX CONTENT CONTAINER
          ==================================================================== */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Clean Header: Bold "INDUSTRIES" + Tracked Light "WE COVER" (Logo removed) */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#d97706] uppercase mb-1.5">
              Cross-Sector Scaling
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none drop-shadow-sm">
              INDUSTRIES
            </h2>
            <div className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-800 tracking-[0.22em] uppercase mt-1">
              WE COVER
            </div>
          </div>
        </div>

        {/* ====================================================================
            THE 1400PX INNER PANEL (4 Columns x 2 Rows Grid)
            ==================================================================== */}
        <div
          className="w-full relative rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden transition-all duration-300"
          style={{
            background: 'rgba(24, 24, 27, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Top amber accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FDD00B] to-transparent opacity-90" />

          {/* 4 Columns x 2 Rows Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] p-6 sm:p-8 md:p-10 gap-y-8 sm:gap-y-10">
            {INDUSTRIES_DATA.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`group relative flex flex-col items-center text-center p-6 sm:p-7 cursor-pointer transition-all duration-300 rounded-2xl hover:bg-white/[0.04] active:scale-[0.98] ${
                    idx >= 4 ? 'lg:border-t lg:border-white/[0.08]' : ''
                  }`}
                >
                  {/* Glowing Outline Icon Container (Bright Gold #FDD00B) */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#FDD00B]/0 group-hover:bg-[#FDD00B]/20 blur-xl transition-all duration-300 scale-75 group-hover:scale-125" />
                    <div className="text-[#FDD00B] group-hover:text-[#facc15] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-105">
                      <IconComponent className="w-13 h-13 sm:w-15 sm:h-15 drop-shadow-[0_4px_12px_rgba(253,208,11,0.35)]" />
                    </div>
                  </div>

                  {/* Industry Title */}
                  <h3 className="text-white group-hover:text-[#FDD00B] text-base sm:text-lg font-medium tracking-wide transition-colors duration-200 max-w-[220px] leading-snug min-h-[48px] flex items-center justify-center">
                    {item.title}
                  </h3>

                  {/* Micro KPI Badge */}
                  <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#FDD00B]/90 bg-white/[0.06] border border-[#FDD00B]/20 px-2.5 py-1 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
                    <span>{item.metric.split('•')[0].trim()}</span>
                  </div>

                  {/* Hover Quick Action Indicator */}
                  <div className="mt-3 flex items-center gap-1 text-[11.5px] font-semibold text-slate-400 group-hover:text-white transition-colors">
                    <span>View Blueprint</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Bottom Bar Inside The 1400px Card */}
          <div className="border-t border-white/[0.08] bg-black/40 px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-300 text-xs sm:text-sm text-center sm:text-left">
              <Sparkles size={16} className="text-[#FDD00B] shrink-0 hidden sm:block" />
              <span>
                Don't see your vertical? We build custom acquisition architectures for any high-growth market.
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#FDD00B] hover:bg-[#facc15] text-[#0f172a] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 shadow-md shadow-[#FDD00B]/20 shrink-0"
            >
              <PhoneCall size={14} />
              <span>Discuss Your Industry</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          INTERACTIVE INDUSTRY BLUEPRINT MODAL
          ==================================================================== */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Category Tag */}
            <div className="text-[11px] font-mono font-bold tracking-widest text-[#d97706] uppercase mb-2">
              {activeItem.category}
            </div>

            {/* Title & Icon */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0f172a] text-[#FDD00B] flex items-center justify-center shrink-0 shadow-md">
                <activeItem.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {activeItem.title}
                </h3>
                <div className="text-xs font-mono font-semibold text-[#0f172a] mt-0.5">
                  {activeItem.metric}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {activeItem.desc}
            </p>

            {/* Key Deliverables */}
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Engineered Capabilities:
            </div>
            <div className="space-y-2 mb-6">
              {activeItem.deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-[#d97706] shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => {
                setActiveItem(null);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#FDD00B] hover:bg-[#facc15] text-[#0f172a] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FDD00B]/30 transition-all duration-200 active:scale-[0.98]"
            >
              <PhoneCall size={16} />
              <span>Book Custom Strategy Call for {activeItem.shortTitle}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Industries;

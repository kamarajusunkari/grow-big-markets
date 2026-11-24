import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, PhoneCall, X, Sparkles } from 'lucide-react';
import industriesBg from '../assets/909452205a43160f9d3576966802333d.jpg';

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
   THIN OUTLINE CUSTOM STROKE ICONS (Refined, architectural, thin line-weight)
   ========================================================================== */

// 1. Travel & Hospitality: Suitcase with handle, straps, lock, and safety shield badge
const TravelHospitalityIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M26 18V13C26 11.3431 27.3431 10 29 10H35C36.6569 10 38 11.3431 38 13V18"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
    <rect x="12" y="18" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="1.35" />
    <line x1="12" y1="34" x2="52" y2="34" stroke="currentColor" strokeWidth="1.1" strokeDasharray="3 2" />
    <rect x="29" y="31" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.35" fill="none" />
    <line x1="22" y1="18" x2="22" y2="50" stroke="currentColor" strokeWidth="1.1" />
    <line x1="42" y1="18" x2="42" y2="50" stroke="currentColor" strokeWidth="1.1" />
    <path
      d="M44 8L54 12V20C54 26 49 30 44 32C39 30 34 26 34 20V12L44 8Z"
      stroke="currentColor"
      strokeWidth="1.35"
      fill="none"
    />
    <path d="M44 14V22M40 18H48" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="17" y="50" width="5" height="3" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
    <rect x="42" y="50" width="5" height="3" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
  </svg>
);

// 2. IT / ITES: Desktop computer monitor on stand with "i" information screen
const ItItesIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="11" y="10" width="42" height="30" rx="3.5" stroke="currentColor" strokeWidth="1.35" />
    <rect x="15" y="14" width="34" height="22" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
    <path d="M32 40V48" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M22 48H42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M16 53H48" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.5" />
    <circle cx="32" cy="20.5" r="1.8" fill="currentColor" />
    <path d="M30 25H32.5V31H34" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 3. Healthcare: Two hands cupping and protecting a heart with pulse
const HealthcareIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M32 28C32 28 26 21 21 24C16.5 26.7 17 33 21.5 37.5L32 46L42.5 37.5C47 33 47.5 26.7 43 24C38 21 32 28 32 28Z"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinejoin="round"
    />
    <path d="M12 40C12 40 17 34 23 37L28 39.5M10 44C13 44 20 42 26 44L30 46" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M10 44C9 42 9 37 14 36C18 35 22 36 26 39" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M52 40C52 40 47 34 41 37L36 39.5M54 44C51 44 44 42 38 44L34 46" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M54 44C55 42 55 37 50 36C46 35 42 36 38 39" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M28 23C29.2 21.7 30.5 21 32 21C33.5 21 34.8 21.7 36 23" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.6" />
  </svg>
);

// 4. Education: Teacher at whiteboard with students/audience
const EducationIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="18" y="10" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="1.35" />
    <line x1="28" y1="16" x2="48" y2="16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="28" y1="21" x2="42" y2="21" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="28" y1="26" x2="38" y2="26" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="16" cy="18" r="3" stroke="currentColor" strokeWidth="1.2" />
    <path d="M16 22V34M16 25L26 21M16 34L12 42M16 34L20 42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="34" x2="19" y2="44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="50" y1="34" x2="53" y2="44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="28" cy="45" r="2.2" stroke="currentColor" strokeWidth="1.1" />
    <path d="M23 54C23 50.5 25 49 28 49C31 49 33 50.5 33 54" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="38" cy="45" r="2.2" stroke="currentColor" strokeWidth="1.1" />
    <path d="M33 54C33 50.5 35 49 38 49C41 49 43 50.5 43 54" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="48" cy="45" r="2.2" stroke="currentColor" strokeWidth="1.1" />
    <path d="M43 54C43 50.5 45 49 48 49C51 49 53 50.5 53 54" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

// 5. E-Commerce & D2C Brands: Shopping bag with upward growth momentum
const EcommerceIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="14" y="20" width="36" height="34" rx="4" stroke="currentColor" strokeWidth="1.35" />
    <path
      d="M24 24V14C24 10.6863 26.6863 8 30 8H34C37.3137 8 40 10.6863 40 14V24"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
    <path
      d="M23 38L29 32L35 36L42 27"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M37 27H42V32" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="46" x2="44" y2="46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
  </svg>
);

// 6. Real Estate & PropTech: Modern architecture skyline and tower
const RealEstateIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 12H38V52H22V12Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
    <path d="M22 12L30 6L38 12" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 24H22V52H12V24Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M38 20H48V52H38V20Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="27" y1="18" x2="33" y2="18" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="27" y1="24" x2="33" y2="24" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="27" y1="30" x2="33" y2="30" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="27" y1="36" x2="33" y2="36" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="27" y1="42" x2="33" y2="42" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="8" y1="52" x2="56" y2="52" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
  </svg>
);

// 7. Manufacturing: Conveyor belt with rising output bar chart
const ManufacturingIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="18" y="27" width="6" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <rect x="28" y="21" width="6" height="17" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <rect x="38" y="15" width="6" height="23" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <rect x="11" y="38" width="42" height="10" rx="5" stroke="currentColor" strokeWidth="1.35" />
    <circle cx="16" cy="43" r="1.8" fill="currentColor" />
    <circle cx="26.5" cy="43" r="1.8" fill="currentColor" />
    <circle cx="37.5" cy="43" r="1.8" fill="currentColor" />
    <circle cx="48" cy="43" r="1.8" fill="currentColor" />
    <line x1="16" y1="48" x2="16" y2="53" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="48" y1="48" x2="48" y2="53" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="12" y1="53" x2="52" y2="53" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 8. BFSI: Open hand holding money bag with currency symbol
const BfsiIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M29 20C29 20 27 14 32 14C37 14 35 20 35 20" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    <line x1="27" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M27 20C24 22 21 26 21 33C21 40 25 43 32 43C39 43 43 40 43 33C43 26 40 22 37 20"
      stroke="currentColor"
      strokeWidth="1.35"
      fill="none"
    />
    <path d="M33 26C31 25.5 30 26.5 30 28C30 30 34 29.5 34 32C34 33.5 32.5 34.5 31 34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="32" y1="24.5" x2="32" y2="35.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M12 47H26L34 46C38 45.5 44 47 48 49L52 50" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 47C20 47 16 48 14 51L24 51C30 51 36 49.5 41 51L47 52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
    title: 'IT / ITES & SaaS',
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
    title: 'Healthcare & MedTech',
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
    title: 'Education & EdTech',
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
    title: 'Manufacturing & Industrial',
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
  const [isInView, setIsInView] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [tiltIndex, setTiltIndex] = useState<number | null>(null);
  const [tiltStyle, setTiltStyle] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // In-View IntersectionObserver for smooth cascade entry
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

  // Smooth Scroll Parallax & Reactive Card Motion
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top <= windowH && rect.bottom >= 0) {
        const centerOffset = rect.top + rect.height / 2 - windowH / 2;
        const parallaxY = centerOffset * 0.16;
        bgRef.current.style.transform = `translate3d(0, ${parallaxY}px, 0) scale(1.15)`;
        setScrollOffset(centerOffset / windowH);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Interactive 3D Card Mouse Tilt
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltIndex(idx);
    setTiltStyle({ rx: -y * 10, ry: x * 10 });
  };

  const handleCardMouseLeave = () => {
    setTiltIndex(null);
    setTiltStyle({ rx: 0, ry: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative w-full overflow-hidden text-slate-900 select-none py-14 sm:py-20 md:py-24 bg-black"
    >
      {/* ====================================================================
          MODERN ARCHITECTURAL SKYLINE BACKGROUND (With Balanced Black Overlay)
          ==================================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          ref={bgRef}
          className="w-full h-full bg-cover bg-center will-change-transform transition-transform duration-75 ease-out opacity-60"
          style={{
            backgroundImage: `url(${industriesBg})`,
            transform: 'scale(1.15)',
          }}
        />
        {/* Balanced Black Overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* ====================================================================
          MAIN 1400PX CONTENT CONTAINER
          ==================================================================== */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Thin Elegant Header: Light "INDUSTRIES" + Tracked Light "WE COVER" (High-contrast against dark overlay) */}
        <div className="w-full mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none drop-shadow-md">
              INDUSTRIES
            </h2>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extralight text-slate-300 tracking-[0.24em] uppercase mt-1 drop-shadow-sm">
              WE COVER
            </div>
          </div>
        </div>

        {/* ====================================================================
            THE 1400PX 4x2 GRID (No Outer Background, Clean Floating Cards)
            ==================================================================== */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5.5">
          {INDUSTRIES_DATA.map((item, idx) => {
            const IconComponent = item.icon;
            const col = idx % 4;
            const isTilted = tiltIndex === idx;
            const scrollFloatY = isInView ? (col % 2 === 0 ? -1 : 1) * scrollOffset * 8 : 0;

            const cardTransform = isTilted
              ? `perspective(800px) rotateX(${tiltStyle.rx}deg) rotateY(${tiltStyle.ry}deg) translate3d(0, ${scrollFloatY - 6}px, 0) scale(1.025)`
              : isInView
              ? `perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0, ${scrollFloatY}px, 0) scale(1)`
              : 'translate3d(0, 36px, 0) scale(0.95)';

            const cardTransition = isTilted
              ? 'transform 0.1s ease-out, box-shadow 0.25s ease'
              : `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 55}ms, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 55}ms, box-shadow 0.3s ease`;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                onMouseMove={(e) => handleCardMouseMove(e, idx)}
                onMouseLeave={handleCardMouseLeave}
                className="group relative flex flex-col items-center justify-between text-center p-5 sm:p-5.5 rounded-2xl cursor-pointer will-change-transform overflow-hidden bg-white/90 backdrop-blur-xl border border-slate-300/80 group-hover:border-transparent shadow-[0_8px_24px_-8px_rgba(15,23,42,0.08)] hover:shadow-2xl active:scale-[0.98]"
                style={{
                  minHeight: '178px',
                  opacity: isInView ? 1 : 0,
                  transform: cardTransform,
                  transition: cardTransition,
                }}
              >
                {/* Hover Blue-Yellow Gradient Layer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3d6ab3 52%, #FDD00B 100%)',
                  }}
                />

                {/* Top: Reduced Thin Stroke Outline Icon */}
                <div className="relative z-10 mb-2 flex items-center justify-center">
                  <div className="text-[#3d6ab3] group-hover:text-white transition-all duration-300 transform group-hover:scale-110 drop-shadow-sm">
                    <IconComponent className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5" />
                  </div>
                </div>

                {/* Middle: Thin Heading */}
                <h3 className="relative z-10 text-slate-900 group-hover:text-white text-sm sm:text-base font-normal tracking-wide transition-colors duration-300 max-w-[210px] leading-snug my-auto min-h-[42px] flex items-center justify-center">
                  {item.title}
                </h3>

                {/* Bottom: Button */}
                <div className="relative z-10 mt-3 w-full flex items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 bg-blue-50/90 text-[#1e3a8a] border border-blue-200/80 group-hover:bg-[#FDD00B] group-hover:text-[#0f172a] group-hover:border-transparent group-hover:shadow-md group-hover:scale-105"
                  >
                    <span>Explore</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ====================================================================
            STANDALONE CLEAN BOTTOM CTA BAR (White Text, Frosted Dark Glass)
            ==================================================================== */}
        <div className="w-full mt-6 sm:mt-8 rounded-2xl border border-white/20 bg-slate-950/70 backdrop-blur-md px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-2.5 text-white text-xs sm:text-[13.5px] text-center sm:text-left font-normal drop-shadow-sm">
            <Sparkles size={16} className="text-[#FDD00B] shrink-0 hidden sm:block animate-pulse" />
            <span>
              Don't see your vertical? We build custom acquisition architectures for any high-growth market.
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 bg-[#FDD00B] hover:bg-[#facc15] text-[#0f172a] font-bold text-xs px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 shadow-md shadow-[#FDD00B]/25 shrink-0"
          >
            <PhoneCall size={13} />
            <span>Discuss Your Industry</span>
          </button>
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
                <h3 className="text-2xl font-light text-slate-900 leading-tight">
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
              className="w-full py-3 px-6 rounded-full bg-[#FDD00B] hover:bg-[#facc15] text-[#0f172a] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FDD00B]/30 transition-all duration-200 active:scale-[0.98]"
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

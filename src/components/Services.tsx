import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CheckCircle2, X, PhoneCall, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: (message?: string) => void;
}

export interface ServiceCardData {
  id: string;
  title: string;
  category: string;
  metric: string;
  subtitle: string;
  desc: string;
  imageSrc: string;
  deliverables: string[];
}

export const SERVICES_DATA: ServiceCardData[] = [
  {
    id: 'ppc-paid-ads',
    title: 'Performance Marketing',
    category: 'PAID MEDIA & PPC',
    metric: '4.8x Avg ROAS',
    subtitle: "We Don't Just Run Ads. We Scale High-ROAS Revenue.",
    desc: 'High-converting ad campaigns across Google Search, Meta (Instagram & Facebook), YouTube & LinkedIn engineered to maximize ROAS.',
    imageSrc: '/bdb38855-3775-42ba-8d23-f32c41f2e827.webp',
    deliverables: ['Google Search & Shopping Ads', 'Meta (Instagram & Facebook) Ads', 'High ROAS Campaign Scaling', 'Precision Retargeting Funnels'],
  },
  {
    id: 'seo-search-growth',
    title: 'Search Engine Optimization',
    category: 'ORGANIC SEO & RANKINGS',
    metric: '#1 Google Rankings',
    subtitle: 'Dominate Google Rankings. Drive High-Intent Traffic.',
    desc: 'Propel your brand to the top of search engine results with technical SEO audits, high-authority backlink building, and keyword strategies.',
    imageSrc: '/679b7310-0afd-42d1-953b-94209bbf2c6f.png',
    deliverables: ['Technical & On-Page SEO Audits', 'High-Intent Keyword Strategy', 'Local Business & Maps SEO', 'Authority Link Building'],
  },
  {
    id: 'social-media-branding',
    title: 'Social Media & Viral Reels',
    category: 'BRANDING & REELS',
    metric: '10M+ Video Views',
    subtitle: 'Build Authentic Brand Authority & Engage Audience.',
    desc: 'Build a high-converting social media presence across Instagram, LinkedIn, YouTube, and TikTok with strategic reels and content calendars.',
    imageSrc: '/158bb487-34c7-4e8d-a53f-b72845659451.webp',
    deliverables: ['Reels & Video Content Creation', 'Brand Authority Strategy', 'Active DM & Community Growth', 'Influencer Partnerships'],
  },
  {
    id: 'cro-funnel-scaling',
    title: 'Conversion Rate Optimization',
    category: 'CRO & SALES FUNNELS',
    metric: '+185% Conversion Rate',
    subtitle: 'Turn Website Visitors Into Paying Loyal Customers.',
    desc: 'Optimize every step of your sales funnel through heatmap audits, landing page design, A/B testing, and persuasive copywriting.',
    imageSrc: '/who we are.webp',
    deliverables: ['High-Converting Landing Pages', 'A/B Split Testing & Analytics', 'Lead Capture Form Funnels', 'Heatmap & Behavior Audits'],
  },
  {
    id: 'lead-generation-funnels',
    title: 'Lead Generation Architecture',
    category: 'B2B & HIGH-TICKET LEADS',
    metric: '500+ Qualified Leads/Mo',
    subtitle: 'Qualified High-Ticket Pipeline on Autopilot.',
    desc: 'Multi-touch lead capture funnels, automated CRM integration, and high-converting email sequences engineered to close deals.',
    imageSrc: '/about (1).webp',
    deliverables: ['Multi-Channel Lead Capture', 'Automated Lead Nurturing', 'High-Converting Copywriting', 'CRM & Zapier Sync'],
  },
  {
    id: 'ecommerce-scaling',
    title: 'E-Commerce Revenue Scaling',
    category: 'D2C & RETAIL EXPANSION',
    metric: '3.5x DTC Revenue Growth',
    subtitle: 'Scale Monthly Revenue with Omni-Channel Ads.',
    desc: 'Full-funnel e-commerce scaling using dynamic catalog ads, retention email funnels, and average order value (AOV) optimization.',
    imageSrc: '/fa443696-1d06-450a-b4f8-fa075413fcb4.png',
    deliverables: ['Catalog & Shopping Ads', 'Retention & Email Marketing', 'AOV & Cart Optimization', 'Omnichannel Attribution'],
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy & Creative',
    category: 'IDENTITY & AD ASSETS',
    metric: 'Creative That Converts',
    subtitle: 'Premium Visual Identity That Converts.',
    desc: 'High-impact video ad creatives, brand positioning, and compelling visual design that sets you apart from competitors.',
    imageSrc: '/b07d4f71-917c-41bd-a83c-f49aa02656c4.png',
    deliverables: ['Video Ad Production', 'Visual Identity Design', 'Conversion Ad Creatives', 'Brand Positioning Guides'],
  },
  {
    id: 'local-maps-seo',
    title: 'Local Google Maps Dominance',
    category: 'LOCAL 3-PACK SEO',
    metric: 'Top 3 Local Placement',
    subtitle: 'Rank #1 in Local 3-Pack & Maps Searches.',
    desc: 'Hyper-targeted local search ranking strategies, Google Business Profile optimization, and local citation dominance.',
    imageSrc: '/7ef1db20-08b4-46ed-a211-22df5c97117d.png',
    deliverables: ['Google Business Profile Optimization', 'Local Citation Building', 'Geo-Targeted Landing Pages', 'Review Generation Systems'],
  },
];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function drawCardCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  item: ServiceCardData,
  isMob = false
) {
  const W = isMob ? 1000 : 1200;
  const H = isMob ? 1350 : 760;

  // Clear background
  ctx.clearRect(0, 0, W, H);

  // 1. Card Background: Pure Crisp White with subtle luxury warmth (No blue bg)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, isMob ? 38 : 24);
  ctx.fill();

  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.75, '#ffffff');
  bgGrad.addColorStop(1, '#fcfaf2');
  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, isMob ? 38 : 24);
  ctx.fill();

  const pad = isMob ? 28 : 20;
  const imgX = pad;
  const imgY = pad;
  const imgW = W - pad * 2;

  // Free size image: dynamically proportional to the image's actual aspect ratio!
  let imgH: number;
  if (img && img.naturalWidth && img.naturalHeight) {
    const natAspect = img.naturalWidth / img.naturalHeight;
    const naturalH = Math.round(imgW / natAspect);
    imgH = clamp(naturalH, isMob ? 340 : 280, isMob ? 500 : 360);
  } else {
    imgH = isMob ? 420 : 330;
  }

  // 2. Clean, unobstructed Image Frame Container (NO text/badge overlays on image!)
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(imgX, imgY, imgW, imgH, isMob ? 24 : 16);
  ctx.clip();

  // Neutral subtle base behind image
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(imgX, imgY, imgW, imgH);

  // Draw full image in frame, maintaining natural ratio
  if (img && img.complete && img.naturalWidth > 0) {
    const ia = img.naturalWidth / img.naturalHeight;
    const ta = imgW / imgH;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (ia > ta) {
      sw = img.naturalHeight * ta;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / ta;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, imgX, imgY, imgW, imgH);
  }

  ctx.restore(); // end clip

  // Thin, clean border around image frame
  ctx.save();
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.09)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(imgX, imgY, imgW, imgH, isMob ? 24 : 16);
  ctx.stroke();
  ctx.restore();

  if (isMob) {
    // 3. MOBILE CONTENT (High breathing room, generous spacing, NO button, NO compact feel)
    let curY = imgY + imgH + 40;
    const maxTextW = W - (pad + 16) * 2;

    ctx.save();

    // A. Category Pill & Metric Indicator (Moved cleanly below image!)
    const catText = '●  ' + item.category;
    ctx.font = '700 24px "IBM Plex Mono", monospace';
    const catW = ctx.measureText(catText).width + 38;
    const pillH = 50;

    // Category Pill
    ctx.fillStyle = 'rgba(253, 208, 11, 0.2)';
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(pad + 16, curY, catW, pillH, 25);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.fillText(catText, pad + 35, curY + 34);

    // Metric Pill
    const metricText = item.metric;
    const metricW = ctx.measureText(metricText).width + 38;
    const metricX = pad + 16 + catW + 16;
    if (metricX + metricW <= W - pad - 16) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.14)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(metricX, curY, metricW, pillH, 25);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.fillText(metricText, metricX + 19, curY + 34);
    }

    curY += pillH + 34; // Generous space before title

    // B. Title (Bold, large, airy line-height)
    ctx.fillStyle = '#0f172a';
    ctx.font = '800 72px "Inter Tight", sans-serif';

    const titleWords = item.title.split(' ');
    let titleLine1 = '';
    let titleLine2 = '';
    for (const w of titleWords) {
      const test = titleLine1 ? `${titleLine1} ${w}` : w;
      if (ctx.measureText(test).width <= maxTextW) {
        titleLine1 = test;
      } else {
        titleLine2 = titleLine2 ? `${titleLine2} ${w}` : w;
      }
    }

    if (titleLine2) {
      ctx.fillText(titleLine1, pad + 16, curY + 66);
      curY += 66 + 20;
      ctx.fillText(titleLine2, pad + 16, curY + 66);
      curY += 66 + 32; // Generous space after 2-line title
    } else {
      ctx.fillText(titleLine1, pad + 16, curY + 68);
      curY += 68 + 36; // Generous space after 1-line title
    }

    // C. Subtitle (Amber Gold highlight with breathing room)
    ctx.fillStyle = '#b45309';
    ctx.font = '700 42px "Inter Tight", sans-serif';
    const cleanSubtitle = item.subtitle.length > 44 ? item.subtitle.slice(0, 44) + '...' : item.subtitle;
    ctx.fillText(cleanSubtitle, pad + 16, curY + 40);
    curY += 40 + 38; // Generous space before description

    // D. Description (Crisp, comfortable reading size, relaxed line-height)
    ctx.fillStyle = '#475569';
    ctx.font = '500 36px "Inter Tight", sans-serif';
    const words = item.desc.split(' ');
    let line1 = '', line2 = '';
    for (const w of words) {
      if ((line1 + ' ' + w).length <= 36) {
        line1 += (line1 ? ' ' : '') + w;
      } else if ((line2 + ' ' + w).length <= 36) {
        line2 += (line2 ? ' ' : '') + w;
      }
    }
    ctx.fillText(line1, pad + 16, curY + 36);
    curY += 36;
    if (line2) {
      curY += 20;
      ctx.fillText(line2 + (item.desc.length > (line1.length + line2.length + 5) ? '...' : ''), pad + 16, curY + 36);
      curY += 36;
    }
    curY += 46; // Generous space before deliverable chips

    // E. Deliverable Badges / Capabilities (Spacious, prominent pills)
    if (item.deliverables && item.deliverables.length > 0) {
      const chipH = 64;
      const d1 = item.deliverables[0];
      const d1Text = '✓  ' + (d1.length > 28 ? d1.slice(0, 28) + '...' : d1);
      ctx.font = '700 30px "Inter Tight", sans-serif';
      const d1Width = ctx.measureText(d1Text).width + 52;

      ctx.fillStyle = 'rgba(254, 243, 199, 0.95)';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pad + 16, curY, d1Width, chipH, 32);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#78350f';
      ctx.fillText(d1Text, pad + 42, curY + 43);

      if (item.deliverables.length > 1) {
        const d2 = item.deliverables[1];
        const d2Text = '✓  ' + (d2.length > 28 ? d2.slice(0, 28) + '...' : d2);
        const d2Width = ctx.measureText(d2Text).width + 52;
        const d2X = pad + 16 + d1Width + 16;

        if (d2X + d2Width < W - pad - 16) {
          // Fits on same line
          ctx.fillStyle = 'rgba(254, 243, 199, 0.95)';
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(d2X, curY, d2Width, chipH, 32);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#78350f';
          ctx.fillText(d2Text, d2X + 26, curY + 43);
        } else {
          // Stack onto second chip row
          curY += chipH + 18;
          ctx.fillStyle = 'rgba(254, 243, 199, 0.95)';
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(pad + 16, curY, Math.min(d2Width, W - (pad + 16) * 2), chipH, 32);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#78350f';
          ctx.fillText(d2Text, pad + 42, curY + 43);
        }
      }
    }

    ctx.restore();
    // Button removed as requested
  } else {
    // 3. DESKTOP CONTENT (Refined, proportional, high clarity)
    let curY = imgY + imgH + 24;

    ctx.save();
    // A. Category & Metric Pill
    const catText = '●  ' + item.category;
    ctx.font = '700 15px "IBM Plex Mono", monospace';
    const catW = ctx.measureText(catText).width + 26;
    ctx.fillStyle = 'rgba(253, 208, 11, 0.2)';
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pad + 12, curY, catW, 32, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.fillText(catText, pad + 25, curY + 21);

    const metricText = item.metric;
    const metricW = ctx.measureText(metricText).width + 26;
    const metricX = pad + 12 + catW + 12;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(metricX, curY, metricW, 32, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.fillText(metricText, metricX + 13, curY + 21);

    curY += 32 + 18;

    // B. Title
    ctx.fillStyle = '#0f172a';
    ctx.font = '800 40px "Inter Tight", sans-serif';
    ctx.fillText(item.title, pad + 12, curY + 36);
    curY += 36 + 14;

    // C. Subtitle
    ctx.fillStyle = '#b45309';
    ctx.font = '700 22px "Inter Tight", sans-serif';
    const cleanSubtitle = item.subtitle.length > 56 ? item.subtitle.slice(0, 56) + '...' : item.subtitle;
    ctx.fillText(cleanSubtitle, pad + 12, curY + 20);
    curY += 20 + 12;

    // D. Description
    ctx.fillStyle = '#475569';
    ctx.font = '500 19px "Inter Tight", sans-serif';
    const cleanDesc = item.desc.length > 88 ? item.desc.slice(0, 88) + '...' : item.desc;
    ctx.fillText(cleanDesc, pad + 12, curY + 18);
    curY += 18 + 20;

    // E. Deliverable Badges / Chips
    if (item.deliverables && item.deliverables.length > 0) {
      const chipH = 34;
      const d1 = item.deliverables[0];
      const d1Text = '✓  ' + (d1.length > 30 ? d1.slice(0, 30) + '...' : d1);
      ctx.font = '700 16px "Inter Tight", sans-serif';
      const d1Width = ctx.measureText(d1Text).width + 34;

      ctx.fillStyle = 'rgba(254, 243, 199, 0.95)';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(pad + 12, curY, d1Width, chipH, 17);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#78350f';
      ctx.fillText(d1Text, pad + 29, curY + 23);

      if (item.deliverables.length > 1) {
        const d2 = item.deliverables[1];
        const d2Text = '✓  ' + (d2.length > 30 ? d2.slice(0, 30) + '...' : d2);
        const d2Width = ctx.measureText(d2Text).width + 34;
        const d2X = pad + 12 + d1Width + 12;

        if (d2X + d2Width < W - pad - 12) {
          ctx.fillStyle = 'rgba(254, 243, 199, 0.95)';
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(d2X, curY, d2Width, chipH, 17);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#78350f';
          ctx.fillText(d2Text, d2X + 17, curY + 23);
        }
      }
    }

    ctx.restore();
    // Button removed as requested
  }

  // 4. Subtle Outer Gold Border
  ctx.save();
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.75)';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(2, 2, W - 4, H - 4, isMob ? 38 : 24);
  ctx.stroke();
  ctx.restore();
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [activeModal, setActiveModal] = useState<ServiceCardData | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const activeCardRef = useRef(0);
  activeCardRef.current = activeCardIndex;

  const targetCarouselOffset = useRef(0);
  const currentCarouselOffset = useRef(0);
  const isUserInteractingRef = useRef(false);
  const userInteractionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const landedCtaRef = useRef<HTMLDivElement>(null);
  const carouselControlsRef = useRef<HTMLDivElement>(null);

  const hoveredCardRef = useRef<{ item: ServiceCardData } | null>(null);

  const markUserInteraction = () => {
    isUserInteractingRef.current = true;
    if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
    userInteractionTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 2800);
  };

  const nextCard = useCallback(() => {
    markUserInteraction();
    setActiveCardIndex((prev) => {
      const next = Math.min(SERVICES_DATA.length - 1, prev + 1);
      targetCarouselOffset.current = next;
      return next;
    });
  }, []);

  const prevCard = useCallback(() => {
    markUserInteraction();
    setActiveCardIndex((prev) => {
      const next = Math.max(0, prev - 1);
      targetCarouselOffset.current = next;
      return next;
    });
  }, []);

  const goToCard = useCallback((idx: number) => {
    markUserInteraction();
    setActiveCardIndex(idx);
    targetCarouselOffset.current = idx;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!canvas || !stage || !track) return;

    /* ---------- Three.js Renderer & Scene ---------- */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const scene = new THREE.Scene();
    const FOV = 35;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

    /* ---------- Ribbon Path ---------- */
    let path: THREE.CatmullRomCurve3;
    let PATH_L = 1;
    const SAMPLES = 1200;
    const pathP: THREE.Vector3[] = [];
    const pathT: THREE.Vector3[] = [];
    const PH0 = -1.5;
    const PH1 = Math.PI * 2 + 1.35;

    function buildPath() {
      const pts: THREE.Vector3[] = [];
      const isMob = window.innerWidth < 768;
      const depthScale = isMob ? 0.88 : 1.0;
      const xFactor = isMob ? 0.38 : 0.561;
      const yFactor = isMob ? 0.46 : 0.63;
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);
        const cs = Math.cos(ph);
        const u = 2 * t - 1;
        const depth = (cs > 0 ? 7.6 + 16.4 * Math.pow(cs, 0.9) : 7.6 + 2.2 * cs) * depthScale;
        const edge = (isMob ? 0.65 : 0.84) + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * xFactor,
            0.5 * Math.sign(u) * Math.pow(Math.abs(u), 1.4) * depth * yFactor,
            -depth
          )
        );
      }
      path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      path.arcLengthDivisions = 1500;
      PATH_L = path.getLength();
      pathP.length = 0;
      pathT.length = 0;
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;
        pathP.push(path.getPointAt(u));
        pathT.push(path.getTangentAt(u));
      }
    }

    const at = (s: number, op: THREE.Vector3, ot: THREE.Vector3) => {
      const f = clamp(s / PATH_L) * SAMPLES;
      const i = Math.min(SAMPLES - 1, Math.floor(f));
      const k = f - i;
      op.lerpVectors(pathP[i], pathP[i + 1], k);
      ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
    };

    /* ---------- Cards & Shaders ---------- */
    const GAP = 0.03;
    const NX = 28;
    const NY = 3;

    const vs = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
    const fs = `uniform sampler2D map;uniform vec2 cover;uniform float aspect,ready,radius;varying vec2 vUv;
void main(){
  vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
  float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
  float px=fwidth(d),a=1.-smoothstep(-px,px,d);
  if(a<.01)discard;
  vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
  vec3 c=mix(vec3(0.98, 0.97, 0.92),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.014-px,-.014,d);
  gl_FragColor=vec4(mix(c,vec3(0.99, 0.82, 0.04),edge*.35),a);
}`;

    interface CardObj {
      i: number;
      item: ServiceCardData;
      title: string;
      img: HTMLImageElement | null;
      tex: THREE.CanvasTexture;
      geo: THREE.PlaneGeometry;
      mat: THREE.ShaderMaterial;
      mesh: THREE.Mesh;
      rect: { x: number; y: number; w: number; h: number; vw: number; vh: number; i: number } | null;
    }

    const isInitialMob = typeof window !== 'undefined' && window.innerWidth < 768;
    const cards: CardObj[] = SERVICES_DATA.map((item, i) => {
      const cardCanvas = document.createElement('canvas');
      cardCanvas.width = isInitialMob ? 1000 : 1200;
      cardCanvas.height = isInitialMob ? 1350 : 760;
      const ctx = cardCanvas.getContext('2d')!;

      const tex = new THREE.CanvasTexture(cardCanvas);
      tex.colorSpace = THREE.NoColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;

      const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
      const initialAspect = isInitialMob ? (1000 / 1350) : (1200 / 760);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          map: { value: tex },
          cover: { value: new THREE.Vector2(1, 1) },
          aspect: { value: initialAspect },
          ready: { value: 0 },
          radius: { value: 0.018 },
        },
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);

      const cardObj: CardObj = { i, item, title: item.title, img: null, tex, geo, mat, mesh, rect: null };

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        cardObj.img = img;
        drawCardCanvas(ctx, img, item, isMobile);
        tex.needsUpdate = true;
        mat.uniforms.ready.value = 1;
      };
      img.onerror = () => {
        drawCardCanvas(ctx, null, item, isMobile);
        tex.needsUpdate = true;
        mat.uniforms.ready.value = 1;
      };
      img.src = item.imageSrc;

      // Initial canvas paint
      drawCardCanvas(ctx, null, item, isInitialMob);
      tex.needsUpdate = true;

      return cardObj;
    });

    /* ---------- Responsive Layout ---------- */
    const GZ = 8;
    let W = 1, H = 1, asp = 1, tanH = 0.3153;
    let isMobile = false;

    function resize() {
      if (!stage) return;
      W = stage.clientWidth || window.innerWidth;
      H = stage.clientHeight || window.innerHeight;
      asp = W / H;
      const prevMob = isMobile;
      isMobile = asp < 0.88 || W < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      camera.aspect = asp;
      camera.fov = isMobile
        ? 44
        : (asp < 16 / 9 ? Math.min(46, (Math.atan(0.561 / Math.max(asp, 0.72)) * 360) / Math.PI) : FOV);
      camera.updateProjectionMatrix();
      tanH = Math.tan((camera.fov * Math.PI) / 360);
      buildPath();

      if (prevMob !== isMobile) {
        cards.forEach((c) => {
          const targetW = isMobile ? 1000 : 1200;
          const targetH = isMobile ? 1350 : 760;
          c.mat.uniforms.aspect.value = targetW / targetH;
          if (c.tex.image.width !== targetW || c.tex.image.height !== targetH) {
            c.tex.image.width = targetW;
            c.tex.image.height = targetH;
            const ctx = c.tex.image.getContext('2d');
            if (ctx) {
              drawCardCanvas(ctx, c.img, c.item, isMobile);
              c.tex.needsUpdate = true;
            }
          }
        });
      }
    }

    window.addEventListener('resize', resize);
    resize();
    buildPath();

    /* ---------- Poses ---------- */
    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();
    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    function poseRibbon(c: CardObj, head: number) {
      const cardW = isMobile ? 1.55 : 2.0;
      const cardH = isMobile ? 2.08 : (2.0 / (1200 / 760));
      const step = cardW + GAP;
      const pos = c.geo.attributes.position;
      const centre = head - c.i * step;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;
          at(centre + lu * cardW, op, ot);
          up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
          vp.copy(op).addScaledVector(up, lv * cardH);
          pos.setXYZ(k, vp.x, vp.y, vp.z);
        }
      }
      pos.needsUpdate = true;
    }

    /* ---------- Single-Row 3D Carousel Pose ---------- */
    function poseCarousel(c: CardObj, q: number, currentOffset: number) {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;

      let cardWidthPx: number;
      let cardHeightPx: number;

      if (isMobile) {
        // Mobile: Maximize card presence and viewport coverage
        cardWidthPx = Math.min(W - 16, 420);
        cardHeightPx = cardWidthPx * 1.35; // ~540px tall
        const maxH = H * 0.70;
        if (cardHeightPx > maxH) {
          cardHeightPx = maxH;
          cardWidthPx = cardHeightPx / 1.35;
        }
      } else {
        // Desktop: Refined, compact card size (Reduced from oversized 620px!)
        // Sized comfortably so neighbor cards peek nicely with elegant perspective
        cardWidthPx = Math.min(W * 0.33, 450);
        cardHeightPx = cardWidthPx / (1200 / 760);
      }

      const cw = (cardWidthPx / W) * vw;
      const ch = (cardHeightPx / H) * vh;
      const gap = cw * (isMobile ? 0.16 : 0.12);

      // Safe vertical centering between header and bottom controls
      const topPx = isMobile ? 40 : 85;
      const botPx = isMobile ? 120 : 110;
      const centerOffsetPx = (botPx - topPx) / 2;
      const centerY = (centerOffsetPx / H) * vh;

      const delta = c.i - currentOffset;
      const xCenter = delta * (cw + gap);
      const zOffset = -Math.abs(delta) * (isMobile ? 0.45 : 0.55);
      const zCenter = -GZ + zOffset;
      const rotY = clamp(-delta * (isMobile ? 0.18 : 0.22), -0.42, 0.42);
      const scale = Math.max(isMobile ? 0.82 : 0.78, 1 - Math.abs(delta) * 0.08);

      // Smooth landing from ribbon rail into carousel slot
      const flyX = (1 - q) * (delta >= 0 ? 1 : -1) * vw * 0.4;
      const flyY = (1 - q) * vh * 0.25;
      const x = xCenter + flyX;
      const y = centerY + flyY;
      const z = zCenter - (1 - q) * 2.0;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const pos = c.geo.attributes.position;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lx = (ix / NX - 0.5) * cw * scale;
          const ly = (0.5 - iy / NY) * ch * scale;

          const vx = lx * cosY;
          const vz = -lx * sinY;

          pos.setXYZ(k, x + vx, y + ly, z + vz);
        }
      }
      pos.needsUpdate = true;
      c.mesh.renderOrder = Math.max(1, 100 - Math.round(Math.abs(delta) * 10));
      c.rect = { x, y, w: cw * scale, h: ch * scale, vw, vh, i: c.i };
    }

    /* ---------- Scroll Tracking ---------- */
    let target = 0;
    let p = 0;

    const readScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollDistance = track.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return;
      const currentScroll = -rect.top;
      target = clamp(currentScroll / scrollDistance);
    };

    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    const RIB_A = 0.12;
    const RIB_B = 0.58;

    function render() {
      const pp = p;

      // 1. Headline rises and slides in opposite directions, fading before carousel lands
      const rise = 1 - out(span(pp, 0, 0.12));
      const run = mix(-50, 76, span(pp, 0, 0.55));
      const hlFade = 1 - span(pp, 0.48, 0.58);
      const riseOffset = isMobile ? rise * 5 : rise * 8;
      if (l1Ref.current) {
        l1Ref.current.style.transform = `translate3d(${run}vw,${riseOffset}vh,0)`;
        l1Ref.current.style.opacity = `${hlFade}`;
        l1Ref.current.style.visibility = hlFade <= 0.005 ? 'hidden' : 'visible';
      }
      if (l2Ref.current) {
        l2Ref.current.style.transform = `translate3d(${-run}vw,${riseOffset}vh,0)`;
        l2Ref.current.style.opacity = `${hlFade}`;
        l2Ref.current.style.visibility = hlFade <= 0.005 ? 'hidden' : 'visible';
      }

      // 2. Caption
      const capA = 1 - span(pp, 0.48, 0.56);
      if (capRef.current) {
        capRef.current.style.opacity = `${capA}`;
        capRef.current.style.transform = `translate(-50%,calc(-50% + ${riseOffset}vh))`;
        capRef.current.style.visibility = capA <= 0.005 ? 'hidden' : 'visible';
      }

      // 3. Center Rule line scales across
      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${ease(span(pp, 0.65, 0.82))})`;
        ruleRef.current.style.top = isMobile ? '45%' : '48%';
      }

      // 4. Smooth carousel scroll progression (if user is not actively tapping arrows)
      if (!isUserInteractingRef.current && pp >= 0.64) {
        const carouselScroll = span(pp, 0.64, 0.96);
        targetCarouselOffset.current = carouselScroll * (cards.length - 1);
        const roundedIdx = Math.round(targetCarouselOffset.current);
        if (roundedIdx !== activeCardRef.current) {
          setActiveCardIndex(roundedIdx);
        }
      }

      // Smooth interpolation for carousel horizontal position
      currentCarouselOffset.current += (targetCarouselOffset.current - currentCarouselOffset.current) * 0.12;

      // 5. Landed Carousel Controls & CTA bar
      const carouselUIAlpha = span(pp, 0.70, 0.85);
      if (carouselControlsRef.current) {
        carouselControlsRef.current.style.opacity = `${carouselUIAlpha}`;
        carouselControlsRef.current.style.pointerEvents = carouselUIAlpha > 0.5 ? 'auto' : 'none';
      }
      if (landedCtaRef.current) {
        landedCtaRef.current.style.opacity = `${carouselUIAlpha}`;
        landedCtaRef.current.style.pointerEvents = carouselUIAlpha > 0.5 ? 'auto' : 'none';
      }

      // 6. 3D Ribbon & Single-Row Carousel Cards
      const cardW = isMobile ? 1.55 : 2.12;
      const step = cardW + GAP;
      const pr = span(pp, RIB_A, RIB_B);
      const head = mix(0, PATH_L + cards.length * step, pr);

      for (const c of cards) {
        const s = head - c.i * step;
        const end = PATH_L - cardW;
        if (s < end) {
          c.mesh.visible = s > cardW;
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else {
          // Card has left the rail -> smoothly transitions into its single-row carousel slot!
          const st = mix(RIB_A, RIB_B, (end + c.i * step) / (PATH_L + cards.length * step));
          const q = out(span(pp, st, st + 0.12));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) {
            poseCarousel(c, q, currentCarouselOffset.current);
          }
        }
      }

      renderer.render(scene, camera);
    }

    /* ---------- Pointer Hover & Click Interaction ---------- */
    const findHitCard = (clientX: number, clientY: number): CardObj | null => {
      const rect = stage.getBoundingClientRect();
      const xRel = clientX - rect.left;
      const yRel = clientY - rect.top;
      const nx = xRel / W - 0.5;
      const ny = 0.5 - yRel / H;
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const clickX = nx * vw;
      const clickY = ny * vh;

      // Check cards from closest to camera (nearest to active carousel center) to furthest
      const sortedCards = [...cards].sort((a, b) => {
        const distA = Math.abs(a.i - currentCarouselOffset.current);
        const distB = Math.abs(b.i - currentCarouselOffset.current);
        return distA - distB;
      });

      for (const c of sortedCards) {
        const g = c.rect;
        if (!g || !c.mesh.visible) continue;
        if (Math.abs(clickX - g.x) < g.w / 2 && Math.abs(clickY - g.y) < g.h / 2) {
          return c;
        }
      }
      return null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      let hit: CardObj | null = null;
      if (p > 0.65) {
        hit = findHitCard(e.clientX, e.clientY);
      }
      hoveredCardRef.current = hit;
      stage.style.cursor = hit ? 'pointer' : 'default';
    };

    const handleStageClick = (e: MouseEvent) => {
      if (p > 0.65) {
        const hit = findHitCard(e.clientX, e.clientY);
        if (hit) {
          if (hit.i === activeCardRef.current) {
            setActiveModal(hit.item);
          } else {
            goToCard(hit.i);
          }
        }
      }
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('click', handleStageClick);

    /* ---------- Touch Swipe Interaction ---------- */
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 1 && p > 0.65) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            nextCard();
          } else {
            prevCard();
          }
        } else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
          const hit = findHitCard(touchStartX, touchStartY);
          if (hit) {
            if (hit.i === activeCardRef.current) {
              setActiveModal(hit.item);
            } else {
              goToCard(hit.i);
            }
          }
        }
      }
    };

    stage.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('touchend', handleTouchEnd, { passive: true });

    /* ---------- Animation Loop ---------- */
    let animId: number;
    function loop() {
      p += (target - p) * 0.09;
      if (Math.abs(target - p) < 0.00005) p = target;
      render();
      animId = requestAnimationFrame(loop);
    }
    loop();

    /* ---------- Cleanup ---------- */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('click', handleStageClick);
      stage.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('touchend', handleTouchEnd);

      cards.forEach((c) => {
        c.geo.dispose();
        c.mat.dispose();
        c.tex.dispose();
      });
      renderer.dispose();
    };
  }, [nextCard, prevCard, goToCard]);

  return (
    <section id="services" ref={trackRef} className="vante-services-section">
      <main className="stage" ref={stageRef} id="services-stage">
        {/* Opposing Two-Part Headline */}
        <h2 aria-label="Services in motion" className="vante-headline-wrap">
          <div className="hl" id="l1" ref={l1Ref} aria-hidden="true">
            <span>SERVICES IN</span>
          </div>
          <div className="hl" id="l2" ref={l2Ref} aria-hidden="true">
            <span>MOTION</span>
          </div>
        </h2>

        {/* Central Strategic Caption */}
        <div id="cap" ref={capRef}>
          Data-driven performance marketing engineered to scale revenue.
        </div>

        {/* Dynamic Center Hairline */}
        <div id="rule" ref={ruleRef}></div>

        {/* Three.js 3D WebGL Canvas */}
        <canvas id="gl" ref={canvasRef}></canvas>

        {/* 3D Single-Row Carousel Controls */}
        <div ref={carouselControlsRef} className="vante-carousel-ui">
          {/* Flanking Arrow Buttons */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevCard();
            }}
            disabled={activeCardIndex === 0}
            className="carousel-arrow-btn carousel-arrow-left"
            aria-label="Previous service"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextCard();
            }}
            disabled={activeCardIndex === SERVICES_DATA.length - 1}
            className="carousel-arrow-btn carousel-arrow-right"
            aria-label="Next service"
          >
            <ChevronRight size={22} />
          </button>

          {/* Carousel Counter & Dots Indicator */}
          <div className="carousel-indicator-bar">
            <div className="carousel-counter-text">
              <span className="text-[#d97706] font-bold mr-1.5">
                {String(activeCardIndex + 1).padStart(2, '0')} / {String(SERVICES_DATA.length).padStart(2, '0')}
              </span>
              <span className="text-[#0f172a] font-semibold">{SERVICES_DATA[activeCardIndex].title}</span>
            </div>

            <div className="carousel-dots-wrap">
              {SERVICES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCard(idx);
                  }}
                  className={`carousel-dot ${idx === activeCardIndex ? 'active' : ''}`}
                  aria-label={`Go to service ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Landed Grid / Carousel Floating CTA Button */}
        <div id="landedCta" ref={landedCtaRef} className="landed-cta-wrap">
          <button
            type="button"
            onClick={() => onOpenBooking('Hi Grow Big Marketers, I want to discuss custom strategy and performance marketing services on WhatsApp.')}
            className="landed-cta-btn"
          >
            <PhoneCall size={18} />
            <span>Book Custom Strategy Call on WhatsApp</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </main>

      {/* Service Details Interactive Modal */}
      {activeModal && (
        <div className="service-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="service-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="service-modal-close"
              onClick={() => setActiveModal(null)}
              aria-label="Close service modal"
            >
              <X size={18} />
            </button>

            <div className="service-modal-tag">{activeModal.category}</div>
            <h3 className="service-modal-title">{activeModal.title}</h3>
            <div className="service-modal-subtitle">{activeModal.subtitle}</div>
            <p className="service-modal-desc">{activeModal.desc}</p>

            <div className="service-modal-deliv-title">Key Capabilities & Deliverables:</div>
            <div className="service-modal-deliverables">
              {activeModal.deliverables.map((item, idx) => (
                <div key={idx} className="service-modal-deliv-item">
                  <CheckCircle2 size={16} color="#FDD00B" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="service-modal-action-btn"
              onClick={() => {
                const title = activeModal.title;
                setActiveModal(null);
                onOpenBooking(`Hi Grow Big Marketers, I would like to inquire about ${title} on WhatsApp.`);
              }}
            >
              <PhoneCall size={18} />
              <span>Book Strategy Call on WhatsApp</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .vante-services-section {
          position: relative;
          height: 380vh;
          background-color: #fefce8;
          background: radial-gradient(circle at 85% 18%, rgba(253, 208, 11, 0.22) 0%, transparent 55%),
                      radial-gradient(circle at 12% 82%, rgba(254, 240, 138, 0.28) 0%, transparent 60%),
                      linear-gradient(180deg, #f8fafc 0%, #fefce8 10%, #fffbeb 50%, #fefce8 90%, #f8fafc 100%);
          color: #0f172a;
          font-family: 'Inter Tight', system-ui, sans-serif;
          user-select: none;
        }

        @media (max-width: 768px) {
          .vante-services-section {
            height: 340vh;
          }
        }

        .stage {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background-color: #fefce8;
          background: radial-gradient(circle at 85% 20%, rgba(253, 208, 11, 0.20) 0%, transparent 52%),
                      radial-gradient(circle at 10% 80%, rgba(254, 240, 138, 0.25) 0%, transparent 58%),
                      linear-gradient(180deg, #f8fafc 0%, #fefce8 12%, #fffbeb 50%, #fefce8 88%, #f8fafc 100%);
        }

        .vante-headline-wrap {
          margin: 0;
          padding: 0;
        }

        .hl {
          position: absolute;
          left: 0;
          right: 0;
          font-weight: 500;
          font-size: clamp(38px, 6.2vw, 110px);
          line-height: 1;
          letter-spacing: -0.05em;
          white-space: nowrap;
          text-align: center;
          will-change: transform;
          color: #0f172a;
          user-select: none;
          z-index: 2;
          transition: opacity 0.25s ease;
        }

        #l1 {
          top: calc(28% - 0.95em);
        }

        #l2 {
          top: calc(28% + 0.05em);
        }

        #l1 span, #l2 span {
          display: inline-block;
        }

        #l1 span {
          margin-right: 15vw;
        }

        #l2 span {
          margin-left: 15vw;
        }

        #cap {
          position: absolute;
          left: 50%;
          top: 28%;
          transform: translate(-50%, -50%);
          width: 22em;
          text-align: center;
          font-size: clamp(10px, 0.8vw, 14px);
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #475569;
          user-select: none;
          z-index: 2;
          transition: opacity 0.25s ease;
        }

        #gl {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 1;
        }

        #rule {
          position: absolute;
          left: 3.5vw;
          right: 3.5vw;
          top: 48%;
          height: 1px;
          background: rgba(234, 179, 8, 0.35);
          transform-origin: left;
          transform: scaleX(0);
          pointer-events: none;
          z-index: 2;
        }

        /* 3D Carousel UI */
        .vante-carousel-ui {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 15;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .carousel-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(234, 179, 8, 0.55);
          color: #0f172a;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(253, 208, 11, 0.2);
          transition: all 0.2s ease;
          pointer-events: auto;
        }

        .carousel-arrow-btn:hover:not(:disabled) {
          background: #FDD00B;
          color: #0f172a;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 12px 30px rgba(253, 208, 11, 0.45);
        }

        .carousel-arrow-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .carousel-arrow-left {
          left: 28px;
        }

        .carousel-arrow-right {
          right: 28px;
        }

        .carousel-indicator-bar {
          position: absolute;
          bottom: 84px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          pointer-events: auto;
        }

        .carousel-counter-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          padding: 4px 14px;
          border-radius: 99px;
          border: 1px solid rgba(234, 179, 8, 0.35);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          white-space: nowrap;
        }

        .carousel-dots-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: rgba(15, 23, 42, 0.22);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
        }

        .carousel-dot.active {
          width: 28px;
          background: #FDD00B;
          box-shadow: 0 0 10px rgba(253, 208, 11, 0.6);
        }

        .landed-cta-wrap {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .landed-cta-btn {
          height: 48px;
          padding: 0 30px;
          background: #FDD00B;
          color: #0f172a;
          border: 1.5px solid rgba(234, 179, 8, 0.6);
          border-radius: 99px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(253, 208, 11, 0.4), 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .landed-cta-btn:hover {
          filter: brightness(1.06);
          transform: translateY(-2px);
        }

        /* Modal Styles */
        .service-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 24px;
          animation: modalFadeIn 0.25s ease forwards;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .service-modal-box {
          background: #ffffff;
          border: 1px solid rgba(234, 179, 8, 0.45);
          border-radius: 24px;
          max-width: 620px;
          width: 100%;
          padding: 36px;
          position: relative;
          color: #0f172a;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.18), 0 0 35px rgba(253, 208, 11, 0.15);
          max-height: 90vh;
          overflow-y: auto;
        }

        .service-modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(15, 23, 42, 0.15);
          background: rgba(15, 23, 42, 0.04);
          color: #0f172a;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .service-modal-close:hover {
          background: #0f172a;
          color: #ffffff;
        }

        .service-modal-tag {
          font: 700 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.12em;
          color: #d97706;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .service-modal-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .service-modal-subtitle {
          font-size: 15px;
          color: #3d6ab3;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .service-modal-desc {
          font-size: 14.5px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .service-modal-deliv-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #0f172a;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .service-modal-deliverables {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }

        .service-modal-deliv-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #334155;
        }

        .service-modal-action-btn {
          width: 100%;
          height: 50px;
          background: #FDD00B;
          color: #0f172a;
          border: 1px solid rgba(234, 179, 8, 0.6);
          border-radius: 99px;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 25px rgba(253, 208, 11, 0.35);
          transition: transform 0.2s, filter 0.2s;
        }

        .service-modal-action-btn:hover {
          filter: brightness(1.06);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          #rule {
            display: none !important;
          }

          .hl {
            font-size: clamp(48px, 13vw, 76px);
            line-height: 0.94;
            letter-spacing: -0.04em;
          }

          #l1 {
            top: calc(20% - 0.92em);
          }

          #l2 {
            top: calc(20% + 0.08em);
          }

          #l1 span {
            margin-right: 8vw;
          }

          #l2 span {
            margin-left: 8vw;
          }

          #cap {
            top: 20%;
            width: 84%;
            max-width: 310px;
            font-size: 11px;
            letter-spacing: 0.04em;
            line-height: 1.35;
          }

          .carousel-arrow-btn {
            top: 26%;
            transform: translateY(-50%);
            width: 42px;
            height: 42px;
            z-index: 20;
            background: rgba(255, 255, 255, 0.96);
            border: 1.5px solid rgba(253, 208, 11, 0.7);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
          }

          .carousel-arrow-left {
            left: 8px;
          }

          .carousel-arrow-right {
            right: 8px;
          }

          .carousel-indicator-bar {
            bottom: 74px;
          }

          .carousel-counter-text {
            font-size: 11px;
            padding: 4px 14px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          }

          .carousel-dot.active {
            width: 22px;
          }

          .landed-cta-btn {
            width: 100%;
            height: 46px;
            padding: 0 20px;
            font-size: 13.5px;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(253, 208, 11, 0.4);
          }

          .landed-cta-wrap {
            bottom: 14px;
            width: calc(100% - 32px);
            max-width: 380px;
          }

          .service-modal-deliverables {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CheckCircle2, X, PhoneCall, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: () => void;
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

function drawCardCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement | null, item: ServiceCardData) {
  const W = 1400;
  const H = 880;

  // Dark slate background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, W, H);

  // Cover image
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.save();
    const ia = img.naturalWidth / img.naturalHeight;
    const ta = W / H;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (ia > ta) {
      sw = img.naturalHeight * ta;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / ta;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
    ctx.restore();
  }

  // Top Light Scrim
  const topGrad = ctx.createLinearGradient(0, 0, 0, 220);
  topGrad.addColorStop(0, 'rgba(15, 23, 42, 0.70)');
  topGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, 220);

  // Bottom Deep Scrim for text readability
  const botGrad = ctx.createLinearGradient(0, H - 380, 0, H);
  botGrad.addColorStop(0, 'rgba(15, 23, 42, 0)');
  botGrad.addColorStop(0.35, 'rgba(15, 23, 42, 0.75)');
  botGrad.addColorStop(0.75, 'rgba(15, 23, 42, 0.94)');
  botGrad.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, H - 380, W, 380);

  // Category Tag Pill (Top Left) - Sunburst Gold Theme
  ctx.save();
  ctx.fillStyle = '#FDD00B';
  const pillW = 310;
  const pillH = 48;
  const pillX = 48;
  const pillY = 46;
  const rad = 24;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, rad);
  ctx.fill();

  // Dark dot
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(pillX + 24, pillY + 24, 5, 0, Math.PI * 2);
  ctx.fill();

  // Category Text
  ctx.fillStyle = '#0f172a';
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.fillText(item.category, pillX + 42, pillY + 31);
  ctx.restore();

  // Metric Badge (Top Right)
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.strokeStyle = 'rgba(253, 208, 11, 0.8)';
  ctx.lineWidth = 2.5;
  const mW = 250;
  const mH = 48;
  const mX = W - mW - 48;
  const mY = 46;
  ctx.beginPath();
  ctx.roundRect(mX, mY, mW, mH, rad);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(item.metric, mX + mW / 2, mY + 31);
  ctx.restore();

  // Title (Bottom Left)
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 52px "Inter Tight", sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 12;
  ctx.fillText(item.title, 52, H - 120);
  ctx.shadowBlur = 0;

  // Description (Bottom Left)
  ctx.fillStyle = 'rgba(244, 241, 234, 0.92)';
  ctx.font = '400 24px "Inter Tight", sans-serif';
  const cleanDesc = item.desc.length > 70 ? item.desc.slice(0, 70) + '...' : item.desc;
  ctx.fillText(cleanDesc, 52, H - 64);

  // Subtle Outer Gold Border
  ctx.strokeStyle = 'rgba(253, 208, 11, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, W - 4, H - 4);
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [activeModal, setActiveModal] = useState<ServiceCardData | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const landedCtaRef = useRef<HTMLDivElement>(null);

  const hoveredCardRef = useRef<{ item: ServiceCardData } | null>(null);

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
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);
        const cs = Math.cos(ph);
        const u = 2 * t - 1;
        const depth = cs > 0 ? 7.6 + 16.4 * Math.pow(cs, 0.9) : 7.6 + 2.2 * cs;
        const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 * Math.sign(u) * Math.pow(Math.abs(u), 1.4) * depth * 0.63,
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
    const CARD_W = 2.1;
    const CARD_H = 1.32;
    const GAP = 0.03;
    const STEP = CARD_W + GAP;
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
      tex: THREE.CanvasTexture;
      geo: THREE.PlaneGeometry;
      mat: THREE.ShaderMaterial;
      mesh: THREE.Mesh;
      rect: { x: number; y: number; w: number; h: number; vw: number; vh: number } | null;
    }

    const cards: CardObj[] = SERVICES_DATA.map((item, i) => {
      const cardCanvas = document.createElement('canvas');
      cardCanvas.width = 1400;
      cardCanvas.height = 880;
      const ctx = cardCanvas.getContext('2d')!;

      const tex = new THREE.CanvasTexture(cardCanvas);
      tex.colorSpace = THREE.NoColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;

      const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          map: { value: tex },
          cover: { value: new THREE.Vector2(1, 1) },
          aspect: { value: CARD_W / CARD_H },
          ready: { value: 0 },
          radius: { value: 0.018 },
        },
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);

      const cardObj: CardObj = { i, item, title: item.title, tex, geo, mat, mesh, rect: null };

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        drawCardCanvas(ctx, img, item);
        tex.needsUpdate = true;
        mat.uniforms.ready.value = 1;
      };
      img.onerror = () => {
        drawCardCanvas(ctx, null, item);
        tex.needsUpdate = true;
        mat.uniforms.ready.value = 1;
      };
      img.src = item.imageSrc;

      // Initial canvas paint
      drawCardCanvas(ctx, null, item);
      tex.needsUpdate = true;

      return cardObj;
    });

    /* ---------- Responsive Layout (Desktop 3x2 Grid) ---------- */
    const GZ = 8;
    let W = 1, H = 1, asp = 1, cols = 3, rows = 2, tanH = 0.3153;

    function resize() {
      if (!stage || stage.clientWidth === 0 || stage.clientHeight === 0) return;
      W = stage.clientWidth;
      H = stage.clientHeight;
      asp = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      camera.aspect = asp;
      camera.fov = asp < 16 / 9 ? Math.min(48, (Math.atan(0.561 / Math.max(asp, 0.72)) * 360) / Math.PI) : FOV;
      camera.updateProjectionMatrix();
      tanH = Math.tan((camera.fov * Math.PI) / 360);
      cols = 3;
      rows = 2;
      buildPath();
    }

    window.addEventListener('resize', resize);
    resize();
    buildPath();

    function grid(i: number) {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const aspectRatio = CARD_W / CARD_H; // 2.1 / 1.32 = 1.5909

      // Desktop 3-Column x 2-Row Layout with Safe Margins
      const navbarPx = Math.max(90, H * 0.115);
      const buttonPx = Math.max(96, H * 0.125);
      const safeHPx = Math.max(380, H - navbarPx - buttonPx);

      // Ensure 2 rows never collide with navbar or CTA button
      const maxGwFromHeight = safeHPx / 0.44;
      const targetPx = Math.min(W - 64, 1380, maxGwFromHeight);

      const gw = (targetPx / W) * vw;
      const gap = gw * 0.022;
      const cw = (gw - gap * (cols - 1)) / cols;
      const ch = cw / aspectRatio;
      const gh = ch * rows + gap * 1.5 * (rows - 1);
      const c = i % cols;
      const r = Math.floor(i / cols);

      // Center the grid within the safe vertical viewport between navbar and button
      const centerOffsetPx = (buttonPx - navbarPx) / 2;
      const safeCenterY = (centerOffsetPx / H) * vh;

      return {
        x: -gw / 2 + cw / 2 + c * (cw + gap),
        y: safeCenterY + gh / 2 - ch / 2 - r * (ch + gap * 1.5),
        w: cw,
        h: ch,
        vw,
        vh,
        c,
        r,
      };
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

    /* ---------- Poses ---------- */
    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();
    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    function poseRibbon(c: CardObj, head: number) {
      const pos = c.geo.attributes.position;
      const centre = head - c.i * STEP;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;
          at(centre + lu * CARD_W, op, ot);
          up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
          vp.copy(op).addScaledVector(up, lv * CARD_H);
          pos.setXYZ(k, vp.x, vp.y, vp.z);
        }
      }
      pos.needsUpdate = true;
    }

    function poseGrid(c: CardObj, q: number) {
      const g = grid(c.i);
      const pos = c.geo.attributes.position;
      const dx = (g.c - (cols - 1) / 2) * 1.2;
      const dy = g.r < rows / 2 ? 1 : -1;
      const ox = dx * g.vw * 0.62 * (1 - q);
      const oy = dy * g.vh * (g.c === 1 ? 0.95 : 0.34) * (1 - q);
      const tilt = (1 - q) * 0.22 * (g.c - 1 || 0.5) * dy;
      const cs = Math.cos(tilt);
      const sn = Math.sin(tilt);
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const x = (ix / NX - 0.5) * g.w;
          const y = (0.5 - iy / NY) * g.h;
          pos.setXYZ(
            k,
            g.x + ox + x * cs - y * sn,
            g.y + oy + x * sn + y * cs,
            -GZ - (1 - q) * 0.6 * Math.sin((ix / NX) * Math.PI)
          );
        }
      }
      pos.needsUpdate = true;
      c.rect = g;
    }

    const RIB_A = 0.14;
    const RIB_B = 0.63;

    function render() {
      const pp = p;

      // 1. Headline rises, slides across, and fades out cleanly as cards land
      const rise = 1 - out(span(pp, 0, 0.12));
      const run = mix(-50, 76, span(pp, 0, 0.58));
      const hlFade = 1 - span(pp, 0.52, 0.62);
      const riseOffset = rise * 8;
      if (l1Ref.current) {
        l1Ref.current.style.transform = `translate3d(${run}vw,${riseOffset}vh,0)`;
        l1Ref.current.style.opacity = `${hlFade}`;
      }
      if (l2Ref.current) {
        l2Ref.current.style.transform = `translate3d(${-run}vw,${riseOffset}vh,0)`;
        l2Ref.current.style.opacity = `${hlFade}`;
      }

      // 2. Caption
      const capA = 1 - span(pp, 0.52, 0.58);
      if (capRef.current) {
        capRef.current.style.opacity = `${capA}`;
        capRef.current.style.transform = `translate(-50%,calc(-50% + ${riseOffset}vh))`;
      }

      // 3. Center Rule line scales across
      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${ease(span(pp, 0.72, 0.86))})`;
        ruleRef.current.style.top = '48%';
      }

      // 5. Landed CTA bar
      const ctaOpacity = span(pp, 0.82, 0.95);
      if (landedCtaRef.current) {
        landedCtaRef.current.style.opacity = `${ctaOpacity}`;
        landedCtaRef.current.style.pointerEvents = ctaOpacity > 0.5 ? 'auto' : 'none';
      }

      // 6. 3D Ribbon & Grid cards
      const pr = span(pp, RIB_A, RIB_B);
      const head = mix(0, PATH_L + cards.length * STEP, pr);

      for (const c of cards) {
        const s = head - c.i * STEP;
        const end = PATH_L - CARD_W;
        if (s < end) {
          c.mesh.visible = s > CARD_W;
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else if (c.i < cols * rows) {
          const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP));
          const q = out(span(pp, st, st + 0.13));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) poseGrid(c, q);
        } else {
          c.mesh.visible = false;
          c.rect = null;
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
      for (const c of cards) {
        const g = c.rect;
        if (!g || !c.mesh.visible) continue;
        const x = nx * g.vw;
        const y = ny * g.vh;
        if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) {
          return c;
        }
      }
      return null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      let hit: CardObj | null = null;
      if (p > 0.86) {
        hit = findHitCard(e.clientX, e.clientY);
      }
      hoveredCardRef.current = hit;
      if (nameRef.current) {
        nameRef.current.style.opacity = hit ? '1' : '0';
        if (hit) {
          nameRef.current.innerHTML = `<span>${hit.item.title}</span><span style="color:#FDD00B;font-family:'IBM Plex Mono',monospace;font-size:10.5px;font-weight:600">${hit.item.metric}</span>`;
          nameRef.current.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 16}px)`;
          stage.style.cursor = 'pointer';
        } else {
          stage.style.cursor = 'default';
        }
      }
    };

    const handleStageClick = (e: MouseEvent) => {
      if (p > 0.8) {
        const hit = findHitCard(e.clientX, e.clientY);
        if (hit) {
          setActiveModal(hit.item);
        }
      }
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('click', handleStageClick);

    /* ---------- Animation Loop ---------- */
    let animId: number;
    function loop() {
      if (stage && stage.clientWidth > 0) {
        p += (target - p) * 0.09;
        if (Math.abs(target - p) < 0.00005) p = target;
        render();
      }
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

      cards.forEach((c) => {
        c.geo.dispose();
        c.mat.dispose();
        c.tex.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section id="services" className="w-full relative">
      {/* Desktop View: Full-Viewport 3D Ribbon & 3x2 Grid */}
      <div className="hidden md:block">
        <div ref={trackRef} className="vante-services-section">
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

            {/* Landed Grid Floating CTA Button */}
            <div id="landedCta" ref={landedCtaRef} className="landed-cta-wrap">
              <button
                type="button"
                onClick={onOpenBooking}
                className="landed-cta-btn"
              >
                <PhoneCall size={18} />
                <span>Book Custom Strategy Call</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Cursor-Following Hover Name Tag */}
            <div id="name" ref={nameRef}></div>
          </main>
        </div>
      </div>

      {/* Mobile View: Clean Vertical Stack of ALL 8 Cards (One Below Another) */}
      <div className="block md:hidden bg-[#fefce8] bg-[radial-gradient(circle_at_85%_18%,rgba(253,208,11,0.22)_0%,transparent_55%),radial-gradient(circle_at_12%_82%,rgba(254,240,138,0.28)_0%,transparent_60%),linear-gradient(180deg,#f8fafc_0%,#fefce8_10%,#fffbeb_50%,#fefce8_90%,#f8fafc_100%)] px-4 py-12">
        <div className="max-w-lg mx-auto">
          {/* Mobile Header (No overlay with cards) */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDD00B]/25 border border-[#FDD00B] text-xs font-bold font-mono text-[#0f172a] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]" />
              <span>SERVICES</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-2.5">
              Services in Motion
            </h2>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Data-driven performance marketing engineered to scale revenue.
            </p>
          </div>

          {/* ALL 8 Cards Stacked One Below Another */}
          <div className="flex flex-col gap-5">
            {SERVICES_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModal(item)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-amber-300/40 shadow-md shadow-amber-900/5 cursor-pointer transition-all duration-200 active:scale-[0.98]"
              >
                {/* Cover Image & Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Top gradient scrim */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/70 to-transparent pointer-events-none" />
                  {/* Bottom gradient scrim */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-transparent pointer-events-none" />

                  {/* Category Pill (Top Left) */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FDD00B] text-[#0f172a] font-mono text-[10.5px] font-bold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]" />
                    <span>{item.category}</span>
                  </div>

                  {/* Metric Pill (Top Right) */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/95 border border-[#FDD00B] text-[#0f172a] font-mono text-[10.5px] font-bold tracking-tight shadow-sm">
                    {item.metric}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5">
                    <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <p className="text-[11.5px] text-[#3d6ab3] font-semibold mb-1.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {item.desc}
                  </p>

                  {/* Deliverables snippet */}
                  <div className="flex flex-col gap-1.5 mb-3 pt-2.5 border-t border-slate-100">
                    {item.deliverables.slice(0, 2).map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={13} className="text-[#FDD00B] shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center justify-between pt-1 text-[#0f172a] text-xs font-semibold">
                    <span className="flex items-center gap-1 text-[#d97706] font-bold">
                      <span>View Deliverables</span>
                      <ArrowRight size={13} />
                    </span>
                    <span className="text-[10.5px] font-mono text-slate-400">Tap for details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Bottom CTA Button */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full h-12 px-6 bg-[#FDD00B] active:scale-95 text-[#0f172a] border border-[#FDD00B] rounded-full font-bold text-sm tracking-wide shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 transition-transform"
            >
              <PhoneCall size={18} />
              <span>Book Custom Strategy Call</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Service Details Interactive Modal (Shared for both Desktop and Mobile) */}
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
                setActiveModal(null);
                onOpenBooking();
              }}
            >
              <PhoneCall size={18} />
              <span>Book Strategy Call For This Service</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .vante-services-section {
          position: relative;
          height: 260vh;
          background-color: #fefce8;
          background: radial-gradient(circle at 85% 18%, rgba(253, 208, 11, 0.22) 0%, transparent 55%),
                      radial-gradient(circle at 12% 82%, rgba(254, 240, 138, 0.28) 0%, transparent 60%),
                      linear-gradient(180deg, #f8fafc 0%, #fefce8 10%, #fffbeb 50%, #fefce8 90%, #f8fafc 100%);
          color: #0f172a;
          font-family: 'Inter Tight', system-ui, sans-serif;
          user-select: none;
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
          transition: opacity 0.2s ease;
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
          transition: opacity 0.2s ease;
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

        .landed-cta-wrap {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .landed-cta-btn {
          height: 50px;
          padding: 0 32px;
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

        #name {
          position: absolute;
          left: 0;
          top: 0;
          padding: 8px 16px;
          background: #0f172a;
          color: #ffffff;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.16s;
          white-space: nowrap;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
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
          .service-modal-deliverables {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

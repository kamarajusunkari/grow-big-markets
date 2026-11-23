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

  // Top Scrim
  const topGrad = ctx.createLinearGradient(0, 0, 0, 240);
  topGrad.addColorStop(0, 'rgba(10, 10, 11, 0.80)');
  topGrad.addColorStop(1, 'rgba(10, 10, 11, 0)');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, 240);

  // Bottom Deep Scrim
  const botGrad = ctx.createLinearGradient(0, H - 360, 0, H);
  botGrad.addColorStop(0, 'rgba(10, 10, 11, 0)');
  botGrad.addColorStop(0.35, 'rgba(10, 10, 11, 0.72)');
  botGrad.addColorStop(0.75, 'rgba(10, 10, 11, 0.94)');
  botGrad.addColorStop(1, 'rgba(10, 10, 11, 0.98)');
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, H - 360, W, 360);

  // Category Tag Pill (Top Left)
  ctx.save();
  ctx.fillStyle = 'rgba(10, 10, 11, 0.85)';
  ctx.strokeStyle = 'rgba(244, 241, 234, 0.3)';
  ctx.lineWidth = 2;
  const pillW = 310;
  const pillH = 46;
  const pillX = 48;
  const pillY = 46;
  const rad = 23;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, rad);
  ctx.fill();
  ctx.stroke();

  // Accent Dot
  ctx.fillStyle = '#FDD00B';
  ctx.beginPath();
  ctx.arc(pillX + 24, pillY + 23, 5, 0, Math.PI * 2);
  ctx.fill();

  // Category Text
  ctx.fillStyle = '#f4f1ea';
  ctx.font = '600 18px "IBM Plex Mono", monospace';
  ctx.fillText(item.category, pillX + 42, pillY + 29);
  ctx.restore();

  // Metric Badge (Top Right)
  ctx.save();
  ctx.fillStyle = 'rgba(10, 10, 11, 0.85)';
  ctx.strokeStyle = 'rgba(61, 106, 179, 0.6)';
  ctx.lineWidth = 2;
  const mW = 250;
  const mH = 46;
  const mX = W - mW - 48;
  const mY = 46;
  ctx.beginPath();
  ctx.roundRect(mX, mY, mW, mH, rad);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FDD00B';
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(item.metric, mX + mW / 2, mY + 29);
  ctx.restore();

  // Title (Bottom Left)
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 52px "Inter Tight", sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 12;
  ctx.fillText(item.title, 52, H - 120);
  ctx.shadowBlur = 0;

  // Description (Bottom Left)
  ctx.fillStyle = 'rgba(244, 241, 234, 0.88)';
  ctx.font = '400 24px "Inter Tight", sans-serif';
  const cleanDesc = item.desc.length > 70 ? item.desc.slice(0, 70) + '...' : item.desc;
  ctx.fillText(cleanDesc, 52, H - 64);

  // Subtle Border
  ctx.strokeStyle = 'rgba(244, 241, 234, 0.16)';
  ctx.lineWidth = 3;
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
  const glowRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);
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
  vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.012-px,-.012,d);
  gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
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

    /* ---------- Responsive Layout ---------- */
    const GZ = 8;
    let W = 1, H = 1, asp = 1, cols = 3, rows = 2, tanH = 0.3153;

    function resize() {
      if (!stage) return;
      W = stage.clientWidth || window.innerWidth;
      H = stage.clientHeight || window.innerHeight;
      asp = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      camera.aspect = asp;
      camera.fov = asp < 16 / 9 ? (Math.atan(0.561 / asp) * 360) / Math.PI : FOV;
      camera.updateProjectionMatrix();
      tanH = Math.tan((camera.fov * Math.PI) / 360);
      cols = asp < 0.9 ? 2 : 3;
      rows = asp < 0.9 ? 3 : 2;
    }

    window.addEventListener('resize', resize);
    resize();
    buildPath();

    function grid(i: number) {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const gw = vw * (cols === 3 ? 0.74 : 0.88);
      const gap = gw * 0.017;
      const cw = (gw - gap * (cols - 1)) / cols;
      const ch = cw / (CARD_W / CARD_H);
      const gh = ch * rows + gap * 1.6 * (rows - 1);
      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: -gw / 2 + cw / 2 + c * (cw + gap),
        y: gh / 2 - ch / 2 - r * (ch + gap * 1.6),
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
      const dx = (g.c - (cols - 1) / 2) * 1.2 + (cols === 3 && g.c === 1 ? 0 : 0);
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

      // 1. Headline rises and slides in opposite directions
      const rise = 1 - out(span(pp, 0, 0.12));
      const run = mix(-50, 76, span(pp, 0, 0.58));
      if (l1Ref.current) l1Ref.current.style.transform = `translate3d(${run}vw,${rise * 34}vh,0)`;
      if (l2Ref.current) l2Ref.current.style.transform = `translate3d(${-run}vw,${rise * 34}vh,0)`;

      // 2. Caption
      const capA = 1 - span(pp, 0.52, 0.57);
      if (capRef.current) {
        capRef.current.style.opacity = `${capA}`;
        capRef.current.style.transform = `translate(-50%,calc(-50% + ${rise * 34}vh))`;
      }

      // 3. Technical intro elements fade out
      const intro = 1 - span(pp, 0, 0.05);
      if (hintRef.current) hintRef.current.style.opacity = `${intro}`;
      if (pagerRef.current) pagerRef.current.style.opacity = `${intro}`;
      if (crossRef.current) crossRef.current.style.opacity = `${intro}`;
      if (glowRef.current) glowRef.current.style.opacity = `${intro}`;

      // 4. Center Rule line scales across
      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${ease(span(pp, 0.72, 0.86))})`;
        ruleRef.current.style.top = '50%';
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
    const handlePointerMove = (e: PointerEvent) => {
      let hit: CardObj | null = null;
      if (p > 0.86) {
        const rect = stage.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const nx = clientX / W - 0.5;
        const ny = 0.5 - clientY / H;
        for (const c of cards) {
          const g = c.rect;
          if (!g) continue;
          const x = nx * g.vw;
          const y = ny * g.vh;
          if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) {
            hit = c;
          }
        }
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

    const handleStageClick = () => {
      if (hoveredCardRef.current) {
        setActiveModal(hoveredCardRef.current.item);
      }
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('click', handleStageClick);

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

      cards.forEach((c) => {
        c.geo.dispose();
        c.mat.dispose();
        c.tex.dispose();
      });
      renderer.dispose();
    };
  }, []);

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

        {/* Technical First Frame Visuals */}
        <div id="glow" ref={glowRef}></div>
        <div id="cross" ref={crossRef}>
          <i>+</i>
        </div>
        <div id="rule" ref={ruleRef}></div>

        {/* Three.js 3D WebGL Canvas */}
        <canvas id="gl" ref={canvasRef}></canvas>

        {/* Top Hint */}
        <div id="hint" ref={hintRef}>
          SCROLL TO EXPLORE SERVICES &nbsp;↓
        </div>

        {/* Top Navigation Strip */}
        <header className="top">
          <div className="logo">
            <svg viewBox="0 0 22 18">
              <path d="M11 0l11 18h-6.200L11 9.600 6.200 18H0z" />
            </svg>
            GROW BIG
          </div>
          <div id="pager" ref={pagerRef}>
            <span
              onClick={() => {
                if (trackRef.current) {
                  window.scrollTo({ top: trackRef.current.offsetTop, behavior: 'smooth' });
                }
              }}
            >
              ↑
            </span>
            <span
              onClick={() => {
                if (trackRef.current) {
                  window.scrollTo({
                    top: trackRef.current.offsetTop + trackRef.current.offsetHeight - window.innerHeight,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              ↓
            </span>
          </div>
          <nav className="acts">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                onOpenBooking();
              }}
            >
              <i></i>LET'S TALK
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                if (trackRef.current) {
                  window.scrollTo({
                    top: trackRef.current.offsetTop + trackRef.current.offsetHeight - window.innerHeight,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              ALL SERVICES<b></b>
            </a>
          </nav>
        </header>

        {/* Bottom Status Bar */}
        <footer className="bot">
          <p>
            High-ROI performance marketing, conversion funnels, and organic growth strategies engineered for ambitious brands.
          </p>
          <div className="mid">
            PPC<s>/</s>SEO<s>/</s>CRO<s>/</s>SOCIAL<s>/</s>FUNNELS
          </div>
          <div
            className="r"
            onClick={() => onOpenBooking()}
            title="Schedule an executive marketing consultation"
          >
            BOOK STRATEGY CALL
          </div>
        </footer>

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
          height: 480vh;
          background: #0a0a0b;
          color: #f4f1ea;
          font-family: 'Inter Tight', system-ui, sans-serif;
          user-select: none;
        }

        .stage {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background: #0a0a0b;
        }

        .vante-headline-wrap {
          margin: 0;
          padding: 0;
        }

        .hl {
          position: absolute;
          left: 0;
          right: 0;
          font-weight: 400;
          font-size: clamp(40px, 6.7vw, 130px);
          line-height: 1;
          letter-spacing: -0.055em;
          white-space: nowrap;
          text-align: center;
          will-change: transform;
          color: #f4f1ea;
          user-select: none;
          z-index: 2;
        }

        #l1 {
          top: calc(50% - 0.98em);
        }

        #l2 {
          top: calc(50% + 0.03em);
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
          top: 50%;
          transform: translate(-50%, -50%);
          width: 18em;
          text-align: center;
          font-size: clamp(9px, 0.74vw, 13px);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #f4f1ea;
          user-select: none;
          z-index: 2;
        }

        #gl {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 1;
        }

        .top {
          position: absolute;
          left: 32px;
          right: 32px;
          top: 26px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          pointer-events: none;
          z-index: 10;
        }

        .acts {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 7px;
          pointer-events: auto;
        }

        .acts a {
          display: flex;
          align-items: center;
          gap: 9px;
          height: 32px;
          padding: 0 15px;
          border: 1px solid rgba(244, 241, 234, 0.55);
          border-radius: 99px;
          color: #f4f1ea;
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }

        .acts a:hover {
          background: #f4f1ea;
          color: #0a0a0b;
        }

        .acts a i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .acts a b {
          display: block;
          width: 13px;
          height: 7px;
          border-top: 1px solid currentColor;
          border-bottom: 1px solid currentColor;
        }

        #pager {
          display: flex;
          margin: -26px 0 0 28px;
          pointer-events: auto;
        }

        #pager span {
          display: grid;
          place-items: center;
          width: 44px;
          height: 50px;
          border: 1px solid rgba(244, 241, 234, 0.14);
          border-top: 0;
          margin-left: -1px;
          font: 400 11px 'IBM Plex Mono', monospace;
          color: #8d8b86;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }

        #pager span:hover {
          color: #f4f1ea;
          border-color: rgba(244, 241, 234, 0.3);
        }

        #glow {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 42%;
          background: linear-gradient(rgba(244, 241, 234, 0.1), rgba(244, 241, 234, 0));
          pointer-events: none;
          z-index: 2;
        }

        #cross {
          position: absolute;
          left: 32px;
          right: 32px;
          top: 37.5%;
          height: 1px;
          background: rgba(244, 241, 234, 0.14);
          pointer-events: none;
          z-index: 2;
        }

        #cross i {
          position: absolute;
          left: 50%;
          top: -0.62em;
          margin-left: -0.3em;
          font: 400 13px 'IBM Plex Mono', monospace;
          color: #8d8b86;
          background: #0a0a0b;
          padding: 0 0.3em;
          line-height: 1.2;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 19px;
          font-weight: 600;
          letter-spacing: 0.09em;
          color: #f4f1ea;
        }

        .logo svg {
          width: 22px;
          height: 18px;
          fill: #f4f1ea;
        }

        #hint {
          position: absolute;
          left: 50%;
          top: 33px;
          transform: translateX(-50%);
          font: 400 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.06em;
          color: #f4f1ea;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(244, 241, 234, 0.14);
          pointer-events: none;
          white-space: nowrap;
          z-index: 10;
        }

        .bot {
          position: absolute;
          left: 32px;
          right: 32px;
          bottom: 26px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: end;
          font-size: 12.5px;
          line-height: 1.35;
          pointer-events: none;
          z-index: 10;
        }

        .bot p {
          color: #f4f1ea;
          max-width: 23em;
        }

        .bot .mid {
          font: 400 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.06em;
        }

        .bot .mid s {
          text-decoration: none;
          color: #8d8b86;
          margin: 0 0.9em;
        }

        .bot .r {
          justify-self: end;
          display: flex;
          gap: 12px;
          align-items: center;
          font: 400 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.06em;
          pointer-events: auto;
          cursor: pointer;
          transition: color 0.2s;
        }

        .bot .r:hover {
          color: #FDD00B;
        }

        .bot .r:after {
          content: "";
          width: 22px;
          height: 1px;
          background: #f4f1ea;
        }

        #rule {
          position: absolute;
          left: 3.5vw;
          right: 3.5vw;
          top: 50%;
          height: 1px;
          background: rgba(244, 241, 234, 0.14);
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
          padding: 0 28px;
          background: #FDD00B;
          color: #0a0a0b;
          border: none;
          border-radius: 99px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(253, 208, 11, 0.4);
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .landed-cta-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
        }

        #name {
          position: absolute;
          left: 0;
          top: 0;
          padding: 7px 14px;
          background: #f4f1ea;
          color: #0a0a0b;
          border-radius: 99px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.16s;
          white-space: nowrap;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        }

        /* Modal Styles */
        .service-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 11, 0.85);
          backdrop-filter: blur(14px);
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
          background: #141416;
          border: 1px solid rgba(244, 241, 234, 0.18);
          border-radius: 24px;
          max-width: 620px;
          width: 100%;
          padding: 36px;
          position: relative;
          color: #f4f1ea;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.75);
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
          border: 1px solid rgba(244, 241, 234, 0.2);
          background: rgba(244, 241, 234, 0.05);
          color: #f4f1ea;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .service-modal-close:hover {
          background: #f4f1ea;
          color: #0a0a0b;
        }

        .service-modal-tag {
          font: 600 11.5px 'IBM Plex Mono', monospace;
          letter-spacing: 0.12em;
          color: #FDD00B;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .service-modal-title {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .service-modal-subtitle {
          font-size: 14.5px;
          color: #3d6ab3;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .service-modal-desc {
          font-size: 14.5px;
          color: #b3b1ab;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .service-modal-deliv-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #f4f1ea;
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
          color: #d8d6ce;
        }

        .service-modal-action-btn {
          width: 100%;
          height: 50px;
          background: #FDD00B;
          color: #0a0a0b;
          border: none;
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
          transition: transform 0.2s, filter 0.2s;
        }

        .service-modal-action-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
        }

        @media (max-width: 760px) {
          .top {
            left: 18px;
            right: 18px;
            top: 18px;
          }

          .bot {
            left: 18px;
            right: 18px;
            bottom: 18px;
            grid-template-columns: 1fr auto;
          }

          .bot .mid {
            display: none;
          }

          #hint, #pager {
            display: none;
          }

          .bot p {
            max-width: 17em;
            font-size: 11px;
          }

          .service-modal-deliverables {
            grid-template-columns: 1fr;
          }

          .landed-cta-wrap {
            bottom: 16px;
          }

          .landed-cta-btn {
            height: 44px;
            padding: 0 20px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

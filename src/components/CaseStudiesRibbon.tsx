import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CaseStudiesRibbonProps {
  onOpenBooking?: () => void;
}

interface CaseCardData {
  heading: string;
  desc: string;
  image: string;
}

const CASE_ITEMS: CaseCardData[] = [
  {
    heading: 'Ageaon Infrastructure',
    desc: 'Scalable cloud infrastructure & automated CI/CD pipeline.',
    image: '/case study.png',
  },
  {
    heading: 'Choicezz Marketplace',
    desc: 'AI recommendation engine with instant friction-free checkout.',
    image: '/case study (2).png',
  },
  {
    heading: 'Vasishta Luxury Events',
    desc: 'Interactive booking visualizer with automated lead routing.',
    image: '/case study (3).png',
  },
  {
    heading: 'Corebridge HR Cloud',
    desc: 'Intelligent HR management automation & payroll tracking.',
    image: '/case study (4).png',
  },
  {
    heading: 'Pragathi Mahavidyalaya',
    desc: 'Integrated campus portal & real-time academic analytics.',
    image: '/case study (5).png',
  },
  {
    heading: 'Medsurgy Health AI',
    desc: 'Live ICU bed management & electronic health records suite.',
    image: '/case study (6).png',
  },
  {
    heading: 'Luminary Living D2C',
    desc: 'High-velocity creative testing & dynamic bundle funnels.',
    image: '/case study (7).png',
  },
  {
    heading: 'ApexPay Technologies',
    desc: 'Outbound AI engine & LinkedIn/Google multi-touch ABM funnels.',
    image: '/case study (8).png',
  },
];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

export const CaseStudiesRibbon: React.FC<CaseStudiesRibbonProps> = ({ onOpenBooking }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const viewMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!canvas || !stage || !track) return;

    /* ---------- Three.js Renderer & Scene Setup ---------- */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0xffffff, 0);
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

    /* ---------- Card Shader & Geometry ---------- */
    const CARD_W = 2.45;
    const CARD_H = 1.58;
    const GAP = 0.04;
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
  vec3 c=mix(vec3(0.98),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.014-px,-.014,d);
  gl_FragColor=vec4(mix(c,vec3(0.05,0.12,0.28),edge*.20),a);
}`;

    // Clean, minimalist card: Full-size image + bold title + description
    function renderCardCanvas(ctx: CanvasRenderingContext2D, img: HTMLImageElement | null, item: CaseCardData) {
      const W = 1535;
      const H = 1024;

      // 1. Full-Bleed Free-Size Image Background
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const targetAspect = W / H;
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
        if (imgAspect > targetAspect) {
          sw = img.naturalHeight * targetAspect;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = img.naturalWidth / targetAspect;
          sy = (img.naturalHeight - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
        ctx.restore();
      } else {
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, '#03063A');
        grad.addColorStop(0.5, '#1e3b6e');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      // 2. Smooth bottom dark overlay for title and description
      const overlayH = 260;
      const overlayGrad = ctx.createLinearGradient(0, H - overlayH, 0, H);
      overlayGrad.addColorStop(0, 'rgba(3, 6, 58, 0)');
      overlayGrad.addColorStop(0.3, 'rgba(3, 6, 58, 0.70)');
      overlayGrad.addColorStop(0.7, 'rgba(3, 6, 58, 0.92)');
      overlayGrad.addColorStop(1, 'rgba(3, 6, 58, 0.98)');
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, H - overlayH, W, overlayH);

      // 3. Main Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 58px "Inter Tight", sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 10;
      ctx.fillText(item.heading, 56, H - 128);
      ctx.shadowBlur = 0;

      // 4. Short Description
      ctx.fillStyle = 'rgba(244, 241, 234, 0.92)';
      ctx.font = '500 32px "Inter Tight", sans-serif';
      ctx.fillText(item.desc, 56, H - 64);

      // Subtle card border
      ctx.strokeStyle = 'rgba(61, 106, 179, 0.35)';
      ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, W - 3, H - 3);
    }

    interface CardRecord {
      i: number;
      item: CaseCardData;
      tex: THREE.CanvasTexture;
      geo: THREE.PlaneGeometry;
      mat: THREE.ShaderMaterial;
      mesh: THREE.Mesh;
      rect: {
        x: number;
        y: number;
        w: number;
        h: number;
        vw: number;
        vh: number;
        c: number;
        r: number;
      } | null;
    }

    const cards: CardRecord[] = CASE_ITEMS.map((item, i) => {
      const cardCanvas = document.createElement('canvas');
      cardCanvas.width = 1535;
      cardCanvas.height = 1024;
      const ctx = cardCanvas.getContext('2d')!;

      renderCardCanvas(ctx, null, item);

      const tex = new THREE.CanvasTexture(cardCanvas);
      tex.colorSpace = THREE.NoColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = item.image;
      img.onload = () => {
        renderCardCanvas(ctx, img, item);
        tex.needsUpdate = true;
      };

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
          ready: { value: 1 },
          radius: { value: 0.024 },
        },
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);

      return { i, item, tex, geo, mat, mesh, rect: null };
    });

    /* ---------- Viewport Layout (Filling Full Width Symmetrically) ---------- */
    const GZ = 7.8;
    let W = 1;
    let H = 1;
    let asp = 1;
    let cols = 3;
    let rows = 2;
    let tanH = 0.3153;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
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
      // Symmetrically align the 3x2 card grid with the centered Navbar header:
      // Header has maxWidth: 1360px with padding: 0 2rem (32px left/right), giving an inner content span of min(W - 64, 1296)px
      const targetPixelWidth = cols === 3 ? Math.min(W - 64, 1296) : Math.min(W - 48, 860);
      const gw = (targetPixelWidth / W) * vw;
      const gap = cols === 3 ? gw * 0.024 : gw * 0.03;
      let cw = (gw - gap * (cols - 1)) / cols;
      let ch = cw / (CARD_W / CARD_H);
      let gh = ch * rows + gap * 1.35 * (rows - 1);

      // Auto-scale height on shorter viewports so cards never clip or crowd controls
      if (gh > vh * 0.70) {
        const scale = (vh * 0.70) / gh;
        cw *= scale;
        ch *= scale;
        gh *= scale;
      }

      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: -gw / 2 + cw / 2 + c * (cw + gap),
        y: gh / 2 - ch / 2 - r * (ch + gap * 1.35),
        w: cw,
        h: ch,
        vw,
        vh,
        c,
        r,
      };
    }

    /* ---------- Scroll Progression (Immediate 320vh Snappy Tracking) ---------- */
    let target = 0;
    let p = 0;
    let animId: number;

    const readScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollableDist = track.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) {
        target = 0;
        return;
      }
      target = clamp(-rect.top / scrollableDist);
    };

    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    /* ---------- Mesh Posing Logic ---------- */
    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();
    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    function poseRibbon(c: CardRecord, head: number) {
      const pos = c.geo.attributes.position as THREE.BufferAttribute;
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

    function poseGrid(c: CardRecord, q: number) {
      const g = grid(c.i);
      const pos = c.geo.attributes.position as THREE.BufferAttribute;
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

    const RIB_A = 0.0;
    const RIB_B = 0.60;

    function render() {
      const pp = p;
      // No huge downward gap - headline starts in place and slides horizontally
      const run = mix(-12, 60, span(pp, 0, 0.38));

      if (l1Ref.current) l1Ref.current.style.transform = `translate3d(${run}vw,0,0)`;
      if (l2Ref.current) l2Ref.current.style.transform = `translate3d(${-run}vw,0,0)`;

      const capA = 1 - span(pp, 0.30, 0.44);
      if (capRef.current) {
        capRef.current.style.opacity = `${capA}`;
        capRef.current.style.transform = `translate(-50%, -50%)`;
      }

      // Hairline divider aligns with header width and scales in as cards land
      if (ruleRef.current) {
        ruleRef.current.style.transform = `translateX(-50%) scaleX(${ease(span(pp, 0.58, 0.74))})`;
        ruleRef.current.style.top = '50%';
      }

      // "View More" button appears smoothly right as the grid lands (pp = 0.64 - 0.76)
      const viewMoreOpacity = span(pp, 0.64, 0.76);
      const easedBtn = ease(viewMoreOpacity);
      if (viewMoreRef.current) {
        viewMoreRef.current.style.opacity = `${easedBtn}`;
        viewMoreRef.current.style.pointerEvents = viewMoreOpacity > 0.4 ? 'auto' : 'none';
        viewMoreRef.current.style.transform = `translate(-50%, ${(1 - easedBtn) * 14}px)`;
      }

      const pr = span(pp, RIB_A, RIB_B);
      const head = mix(0, PATH_L + cards.length * STEP, pr);

      for (const c of cards) {
        const s = head - c.i * STEP;
        const end = PATH_L - CARD_W;
        if (s < end) {
          c.mesh.visible = s > CARD_W * 0.4;
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else if (c.i < cols * rows) {
          const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP));
          const q = out(span(pp, st, st + 0.14));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) poseGrid(c, q);
        } else {
          c.mesh.visible = false;
          c.rect = null;
        }
      }

      renderer.render(scene, camera);
    }

    /* ---------- Main Animation Loop (High-responsiveness lerp: 0.25) ---------- */
    function loop() {
      p += (target - p) * 0.25;
      if (Math.abs(target - p) < 0.0001) p = target;
      render();
      animId = requestAnimationFrame(loop);
    }
    loop();

    /* ---------- Cleanup on Unmount ---------- */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);
      renderer.dispose();
      cards.forEach((c) => {
        c.geo.dispose();
        c.mat.dispose();
        c.tex.dispose();
      });
    };
  }, []);

  return (
    <section id="cases" ref={trackRef} className="vante-track" style={{ height: '180vh', position: 'relative' }}>
      <div id="portfolio" style={{ position: 'absolute', top: 0 }} />
      <div ref={stageRef} className="vante-stage">
        {/* Headings in Dark Ink */}
        <h2 aria-label="Growth in motion">
          <div ref={l1Ref} className="vante-hl vante-l1" aria-hidden="true">
            <span>GROWTH IN</span>
          </div>
          <div ref={l2Ref} className="vante-hl vante-l2" aria-hidden="true">
            <span>MOTION</span>
          </div>
        </h2>

        {/* Center Tagline in Slate Black */}
        <div ref={capRef} className="vante-cap">
          Scaling high-growth brands through data-driven performance.
        </div>

        {/* Center Hairline Divider Between Grid Rows */}
        <div ref={ruleRef} className="vante-rule" />

        {/* WebGL Canvas */}
        <canvas ref={canvasRef} className="vante-gl" />

        {/* "View More" Button (Appears as Cards Center in the Grid) */}
        <div ref={viewMoreRef} className="vante-view-more-wrap">
          <button
            type="button"
            onClick={onOpenBooking}
            className="vante-view-more-btn"
          >
            <span>View More Case Studies</span>
            <span className="vante-view-more-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .vante-track {
          background: #ffffff;
        }

        .vante-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background: #ffffff;
          color: #0a0a0b;
          font-family: 'Inter Tight', system-ui, sans-serif;
          user-select: none;
        }

        .vante-hl {
          position: absolute;
          left: 0;
          right: 0;
          font-weight: 600;
          font-size: clamp(40px, 6.7vw, 130px);
          line-height: 1;
          letter-spacing: -0.055em;
          white-space: nowrap;
          text-align: center;
          will-change: transform;
          color: #0a0a0b;
          z-index: 2;
        }

        .vante-l1 {
          top: calc(50% - 0.98em);
        }

        .vante-l2 {
          top: calc(50% + 0.03em);
        }

        .vante-l1 span, .vante-l2 span {
          display: inline-block;
        }

        .vante-l1 span {
          margin-right: 15vw;
        }

        .vante-l2 span {
          margin-left: 15vw;
        }

        .vante-cap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 22em;
          text-align: center;
          font-size: clamp(9px, 0.74vw, 13px);
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #334155;
          z-index: 2;
        }

        .vante-gl {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 1;
        }

        .vante-rule {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(calc(100% - 64px), 1296px);
          height: 1px;
          background: rgba(61, 106, 179, 0.2);
          transform-origin: center;
          transform: translateX(-50%) scaleX(0);
          pointer-events: none;
          z-index: 2;
        }

        /* "View More" CTA at the Bottom of Landed Grid */
        .vante-view-more-wrap {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease;
        }

        .vante-view-more-btn {
          height: 52px;
          padding: 0 6px 0 24px;
          background: linear-gradient(135deg, #3d6ab3 0%, #1e4587 100%);
          color: #ffffff;
          border: 1px solid rgba(253, 207, 9, 0.5);
          display: inline-flex;
          align-items: center;
          gap: 16px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 10px 28px rgba(61, 106, 179, 0.35), 0 0 14px rgba(253, 207, 9, 0.15);
          transition: all 0.25s ease;
        }

        .vante-view-more-btn:hover {
          background: linear-gradient(135deg, #2a589e 0%, #163669 100%);
          border-color: rgba(253, 207, 9, 0.95);
          box-shadow: 0 14px 36px rgba(61, 106, 179, 0.45), 0 0 20px rgba(253, 207, 9, 0.3);
          transform: translateY(-2px);
        }

        .vante-view-more-arrow {
          width: 40px;
          height: 40px;
          background: #fdcf09;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .vante-view-more-arrow svg {
          width: 18px;
          height: 18px;
          stroke: #03063A;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .vante-view-more-btn:hover .vante-view-more-arrow {
          transform: translateX(2px);
        }

        @media (max-width: 760px) {
          .vante-view-more-wrap {
            bottom: 16px;
          }

          .vante-view-more-btn {
            height: 46px;
            padding: 0 5px 0 18px;
            font-size: 13.5px;
            gap: 12px;
          }

          .vante-view-more-arrow {
            width: 34px;
            height: 34px;
          }

          .vante-view-more-arrow svg {
            width: 15px;
            height: 15px;
          }
        }
      `}</style>
    </section>
  );
};

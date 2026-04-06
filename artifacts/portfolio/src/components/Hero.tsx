import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/lib/sound';

const CYCLING_WORDS = ['models', 'futures', 'intelligence', 'pipelines', 'systems'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

function scrambleText(element: HTMLElement, finalText: string, duration: number, onComplete?: () => void) {
  let frame = 0;
  const totalFrames = Math.floor(duration / 16);
  const cancel = () => clearInterval(id);
  const id = setInterval(() => {
    const progress = frame / totalFrames;
    const revealedCount = Math.floor(progress * finalText.length);
    let result = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < revealedCount) {
        result += finalText[i];
      } else {
        result += finalText[i] === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    element.textContent = result;
    frame++;
    if (frame > totalFrames) {
      element.textContent = finalText;
      clearInterval(id);
      onComplete?.();
    }
  }, 16);
  return cancel;
}

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-IN', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % CYCLING_WORDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!wordRef.current) return;
    scrambleText(wordRef.current, CYCLING_WORDS[wordIndex], 600);
  }, [wordIndex]);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    setTimeout(() => {
      if (overlineRef.current) scrambleText(overlineRef.current, 'DATA SCIENTIST — 2024', 800);
    }, 200);
    setTimeout(() => {
      if (headingRef.current) scrambleText(headingRef.current, 'ABHISHEK', 1000);
    }, 600);
    setTimeout(() => {
      if (subRef.current) {
        gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
      }
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
      }
    }, 1600);

    const handleScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.style.opacity = window.scrollY > 50 ? '0' : '1';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !(window as any).THREE) return;
    const THREE = (window as any).THREE;

    const w = container.clientWidth || 400;
    const h = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometries = [
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.OctahedronGeometry(1.5, 0),
      new THREE.TorusKnotGeometry(1, 0.3, 64, 8),
    ];
    let geoIndex = 0;

    const edges = new THREE.EdgesGeometry(geometries[geoIndex]);
    const mat = new THREE.LineBasicMaterial({ color: 0x7c6fcd, transparent: true, opacity: 0.7 });
    const wireframe = new THREE.LineSegments(edges, mat);
    scene.add(wireframe);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    const orbitData: { mesh: any; speed: number; radius: number; phase: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const sg = new THREE.SphereGeometry(0.07, 8, 8);
      const sm = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x3ecfb2 : 0x7c6fcd });
      const sphere = new THREE.Mesh(sg, sm);
      orbitGroup.add(sphere);
      orbitData.push({ mesh: sphere, speed: 0.3 + i * 0.2, radius: 2.2 + i * 0.3, phase: (i * Math.PI * 2) / 3 });
    }

    let speedMult = 1;
    const onEnter = () => { speedMult = 3; };
    const onLeave = () => { speedMult = 1; };
    const onClick = () => {
      geoIndex = (geoIndex + 1) % geometries.length;
      const newEdges = new THREE.EdgesGeometry(geometries[geoIndex]);
      wireframe.geometry.dispose();
      wireframe.geometry = newEdges;
      sound.playClick();
    };
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('click', onClick);

    let t = 0;
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.005 * speedMult;
      wireframe.rotation.y = t;
      wireframe.rotation.x = t * 0.4;
      orbitData.forEach(o => {
        const angle = t * o.speed + o.phase;
        o.mesh.position.x = Math.cos(angle) * o.radius;
        o.mesh.position.z = Math.sin(angle) * o.radius;
        o.mesh.position.y = Math.sin(angle * 0.5) * 0.8;
      });
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('click', onClick);
      renderer.dispose();
      geometries.forEach(g => g.dispose());
      mat.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const terminalMessages = ['webgl_active', 'cursor_tracking', 'gsap_loaded', 'three_js_ready', 'neural_net_online', 'ai_ready'];
  const [termMsg, setTermMsg] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTermMsg(m => (m + 1) % terminalMessages.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="work" className="relative min-h-screen w-full flex flex-col">
      <div className="flex-1 flex items-center px-6 md:px-16 pt-24 pb-8">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex flex-col gap-6">
            <p ref={overlineRef} className="text-overline">
              &nbsp;
            </p>
            <h1
              ref={headingRef}
              className="text-hero leading-none font-[300] tracking-[-0.02em] text-text-primary"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              &nbsp;
            </h1>
            <p className="font-mono text-xl md:text-2xl font-light text-text-secondary">
              builds{' '}
              <span
                ref={wordRef}
                className="text-accent-teal"
                style={{ display: 'inline-block', minWidth: '200px' }}
              >
                {CYCLING_WORDS[0]}
              </span>
            </p>
            <p ref={subRef} className="text-sub text-text-secondary leading-relaxed max-w-xl" style={{ opacity: 0 }}>
              Turning data into intelligence — Machine Learning, Deep Learning &amp; Generative AI.
              Building production-grade AI systems from India.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-2" style={{ opacity: 0 }}>
              <a
                href="#work"
                onClick={() => sound.playClick()}
                className="group relative px-8 py-3 bg-accent-purple text-white font-mono text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,111,205,0.4)]"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-accent-teal translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="mailto:abhishekravikumar24@gmail.com"
                onClick={() => sound.playClick()}
                className="px-8 py-3 border border-border-accent text-text-primary font-mono text-sm tracking-wider uppercase hover:border-accent-teal hover:text-accent-teal transition-all duration-300"
              >
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-teal">
                Available for Hire
              </span>
            </div>
          </div>

          <div
            ref={mountRef}
            className="md:col-span-5 h-[300px] md:h-[500px] relative cursor-pointer"
            title="Click to change geometry"
          >
            <div className="absolute inset-0 rounded-full bg-accent-purple opacity-5 blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="border-t border-border-dim px-6 md:px-16 py-3 flex items-center gap-6 font-mono text-[10px] text-text-muted overflow-hidden">
        <span className="text-accent-teal">v1.0.0</span>
        <span className="text-border-dim">|</span>
        <span>STATUS: ONLINE</span>
        <span className="text-border-dim">|</span>
        <span className="text-accent-teal">{clock}</span>
        <span className="text-border-dim">|</span>
        <span className="text-text-muted animate-pulse">{terminalMessages[termMsg]}</span>
        <span className="text-border-dim">|</span>
        <span>LOC: IN</span>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-text-muted">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-accent-teal to-transparent animate-pulse" />
      </div>
    </section>
  );
}

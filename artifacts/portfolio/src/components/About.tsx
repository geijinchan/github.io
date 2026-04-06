import React, { useEffect, useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      const bioText = textRef.current.textContent || '';
      const words = bioText.trim().split(/\s+/);
      textRef.current.innerHTML = '';
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0.12';
        span.style.transition = 'opacity 0.3s ease';
        textRef.current?.appendChild(span);
      });

      const spans = Array.from(textRef.current.querySelectorAll('span'));

      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.8,
        animation: gsap.to(spans, {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
        }),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
    };
  }, []);

  return (
    <section id="about" ref={containerRef} className="h-screen w-full flex items-center justify-center bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(124,111,205,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,111,205,0.08) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        transform: 'perspective(600px) rotateX(55deg)',
        transformOrigin: 'bottom center',
      }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(62,207,178,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <p className="text-overline">// WHO I AM</p>
          <div
            ref={counterRef}
            className="font-sans font-[300] leading-none text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(5rem, 12vw, 9rem)',
              backgroundImage: 'linear-gradient(180deg, #3ecfb2 0%, rgba(62,207,178,0.1) 100%)',
            }}
          >
            2+
          </div>
          <p className="text-overline">YEARS OF EXPERIENCE</p>
          <div className="w-16 h-[1px] bg-border-accent mt-2" />
          <p className="text-xs font-mono text-text-muted leading-loose mt-2">
            Data Scientist<br />
            Uttar Pradesh, India<br />
            <span className="text-accent-teal">IEEE Published</span>
          </p>
        </div>

        <div className="md:col-span-8">
          <p
            ref={textRef}
            className="font-sans font-[300] leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', color: 'var(--text-primary)' }}
          >
            Results-driven Data Scientist with 2 years of experience turning raw data into production-grade AI.
            I architect serverless platforms on AWS, build enterprise RAG pipelines with Azure AI Foundry,
            and design reinforcement learning systems that trade smarter. From training neural networks
            to deploying LLMs, I bridge the gap between cutting-edge research and real-world impact.
            Published in IEEE Xplore. Building the future — one model at a time.
          </p>
        </div>
      </div>
    </section>
  );
}

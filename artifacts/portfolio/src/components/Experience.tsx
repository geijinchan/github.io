import React, { useEffect, useRef, useState } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/sound';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

const EXPERIENCES = [
  {
    role: 'Data Science & AI Developer',
    company: 'Nogiz',
    location: 'Mohali',
    years: 'Sep 2023 – Present',
    color: '#3ecfb2',
    description:
      'Sole data science & AI engineer building production GenAI systems end-to-end. Engineered a real-time multilingual voice tutor (streaming ASR/TTS, barge-in, RAG, zero-shot voice cloning) at 400–600 ms latency, and NEXUS — an adaptive pedagogy engine using Bayesian Knowledge Tracing, DINA and SM-2. Shipped an autonomous AI newsroom orchestrating 10+ agents and an autonomous job-application platform. Architected a multi-tenant AWS serverless platform (MFA/OAuth2, AWS CDK CI/CD) plus enterprise RAG & agentic workflows. Led ML forecasting and reinforcement-learning systems — +12% forecast accuracy, +15% simulated trading returns.',
    skills: [
      'Python', 'LangGraph', 'Groq', 'Whisper', 'RAG', 'Qdrant', 'FastAPI',
      'WebSockets', 'AWS Lambda', 'DynamoDB', 'Cognito', 'AWS CDK',
      'Azure AI Foundry', 'Ray RLlib', 'PyTorch', 'Playwright',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'M.Sc. Data Science',
    institution: 'Chandigarh University, Mohali, Punjab',
    years: '2022 – 2024',
    highlight: 'IEEE Xplore Publication · Research in MLOps & Deep Learning',
  },
  {
    degree: 'Bachelor of Computer Application',
    institution: 'B.B.S Public Degree College, Prayagraj, UP',
    years: '2019 – 2022',
    highlight: 'Python, C, C++ · Data Structures & Algorithms',
  },
];

export default function Experience() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          sound.playReveal();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="min-h-screen w-full py-24 px-6 md:px-12 bg-bg-primary relative" ref={containerRef}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-[0.03]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#7c6fcd' : '#3ecfb2',
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-overline mb-3">// SECTION_03</p>
          <h2 className="text-section text-text-primary">EXPERIENCE</h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-teal via-accent-purple to-transparent" />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="relative pl-16 md:pl-24 mb-16 group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                transition: `opacity 0.6s ease ${i * 0.2}s, transform 0.6s ease ${i * 0.2}s`,
              }}
              onMouseEnter={() => { setHovered(i); sound.playHover(); }}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="absolute left-4 md:left-8 top-4 w-5 h-5 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: exp.color,
                  backgroundColor: hovered === i ? exp.color : 'var(--bg-primary)',
                  boxShadow: hovered === i ? `0 0 20px ${exp.color}60` : 'none',
                }}
              />

              <div className="bg-bg-secondary border border-border-dim p-8 transition-all duration-300"
                style={{ borderColor: hovered === i ? exp.color + '60' : undefined }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                  <h3 className="text-xl font-semibold" style={{ color: exp.color }}>{exp.role}</h3>
                  <span className="font-mono text-xs text-accent-teal tracking-wider">{exp.years}</span>
                </div>
                <p className="text-text-primary text-lg mb-4 font-light">
                  {exp.company}
                  {exp.location && <span className="text-text-muted text-sm"> · {exp.location}</span>}
                </p>
                <p className="text-text-secondary leading-relaxed text-sm mb-6">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 font-mono text-[10px] tracking-wider border"
                      style={{ borderColor: exp.color + '40', color: exp.color, backgroundColor: exp.color + '10' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => sound.playClick()}
                      onMouseEnter={() => sound.playHover()}
                      className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 border border-border-accent text-accent-teal hover:bg-accent-glow hover:border-accent-teal transition-all duration-200 font-mono text-[11px] tracking-wider"
                    >
                      <FileText className="w-4 h-4" />
                      VIEW_RÉSUMÉ.pdf
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-[92vw] h-[88vh] p-0 gap-0 grid-rows-[auto_1fr] bg-bg-secondary border-border-dim text-text-primary overflow-hidden">
                    <div className="flex items-center justify-between gap-3 px-5 py-3 pr-12 border-b border-border-dim bg-bg-tertiary">
                      <DialogTitle className="font-mono text-xs tracking-wider text-text-primary truncate">
                        RESUME — ABHISHEK.pdf
                      </DialogTitle>
                      <div className="flex items-center gap-4 shrink-0">
                        <a
                          href={RESUME_URL}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={() => sound.playHover()}
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-text-muted hover:text-accent-teal transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> OPEN
                        </a>
                        <a
                          href={RESUME_URL}
                          download="Abhishek_Resume.pdf"
                          onClick={() => sound.playClick()}
                          onMouseEnter={() => sound.playHover()}
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent-teal hover:opacity-80 transition-opacity"
                        >
                          <Download className="w-3.5 h-3.5" /> DOWNLOAD
                        </a>
                      </div>
                    </div>
                    <div className="overflow-hidden bg-bg-tertiary">
                      <iframe
                        src={RESUME_URL}
                        title="Abhishek — Résumé"
                        className="w-full h-full border-0"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}

          <div className="relative pl-16 md:pl-24 mb-6">
            <div className="absolute left-4 md:left-8 top-3 w-5 h-5 rounded-full border-2 border-text-muted bg-bg-primary" />
            <p className="font-mono text-[10px] text-text-muted tracking-widest mb-6 uppercase">Education</p>
          </div>

          {EDUCATION.map((edu, i) => (
            <div
              key={i}
              className="relative pl-16 md:pl-24 mb-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                transition: `opacity 0.6s ease ${(EXPERIENCES.length + i) * 0.2}s, transform 0.6s ease ${(EXPERIENCES.length + i) * 0.2}s`,
              }}
            >
              <div className="absolute left-4 md:left-8 top-4 w-3 h-3 rounded-full border border-text-muted bg-bg-primary" />
              <div className="bg-bg-secondary border border-border-dim p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                  <p className="font-mono text-xs text-accent-purple tracking-wider">{edu.degree}</p>
                  <p className="font-mono text-[10px] text-text-muted">{edu.years}</p>
                </div>
                <p className="text-text-primary mt-1 font-light">{edu.institution}</p>
                <p className="font-mono text-[10px] text-text-muted mt-2 italic">{edu.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

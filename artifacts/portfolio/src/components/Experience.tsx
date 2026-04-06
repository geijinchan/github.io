import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/lib/sound';

const EXPERIENCES = [
  {
    role: 'Data Scientist',
    company: 'AthenaSoft Cloud Consulting',
    years: 'Jan 2025 – Present',
    color: '#3ecfb2',
    description: 'Architected multi-tenant serverless platform on AWS (Lambda, API Gateway, DynamoDB, Cognito) with OAuth2.0/MFA. Built RAG pipelines and AI-powered LMS bots on Azure AI Foundry. Led time-series forecasting (LTC/CfC/CNN) with Optuna tuning — +12% accuracy. Designed Actor–Critic RL pipeline in Ray RLlib — +15% simulated trading returns.',
    skills: ['Python', 'AWS CDK', 'Lambda', 'DynamoDB', 'Cognito', 'Azure AI Foundry', 'RAG', 'Ray RLlib', 'Optuna', 'PyTorch', 'JWT'],
  },
  {
    role: 'Data Scientist',
    company: 'TechGuru',
    years: 'Nov 2023 – Dec 2024',
    color: '#7c6fcd',
    description: 'Designed and deployed a retrieval-augmented chatbot integrated into an LMS platform. Built grade-aware assessment planning pipelines, optimized semantic search with custom chunking/embedding strategies. Productionized GenAI features via REST APIs with cross-functional teams.',
    skills: ['Python', 'Azure AI Foundry', 'RAG', 'LangChain', 'Vector Stores', 'Prompt Engineering', 'Blob Storage', 'REST APIs'],
  },
  {
    role: 'Data Scientist Intern',
    company: 'iNeuron Intelligence Pvt. Ltd',
    years: 'Jun 2023 – Oct 2023',
    color: '#60a5fa',
    description: 'Built end-to-end credit card default prediction pipeline with SMOTE, cross-validation, and hyperparameter tuning — ~90% accuracy with SVM. Implemented MLOps workflows and CI/CD automation. Deployed real-time inference on AWS SageMaker. Co-authored IEEE research paper on MLOps-driven credit card default prediction.',
    skills: ['Python', 'Scikit-learn', 'SMOTE', 'AWS SageMaker', 'Lambda', 'API Gateway', 'CI/CD', 'MLOps', 'IEEE Publication'],
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
  const [view, setView] = useState<'graph' | 'timeline'>('timeline');
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
        <div className="flex items-start justify-between mb-16 flex-col md:flex-row gap-4">
          <div>
            <p className="text-overline mb-3">// SECTION_03</p>
            <h2 className="text-section text-text-primary">EXPERIENCE</h2>
          </div>
          <div className="flex border border-border-dim overflow-hidden">
            {(['graph', 'timeline'] as const).map(v => (
              <button
                key={v}
                onClick={() => { setView(v); sound.playClick(); }}
                className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
                  view === v
                    ? 'bg-accent-purple text-white'
                    : 'bg-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {view === 'timeline' && (
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
                  <p className="text-text-primary text-lg mb-4 font-light">{exp.company}</p>
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
        )}

        {view === 'graph' && (
          <div className="relative flex items-center justify-center min-h-[450px]">
            <div className="relative w-full max-w-lg h-96">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 rounded-full border-2 border-accent-teal flex items-center justify-center bg-bg-primary shadow-[0_0_30px_rgba(62,207,178,0.3)] animate-pulse">
                  <span className="font-mono text-xs text-accent-teal font-bold">AR</span>
                </div>
                <p className="text-center font-mono text-[8px] text-text-muted mt-1 tracking-wider">ABHISHEK</p>
              </div>

              {EXPERIENCES.map((exp, i) => {
                const angle = -90 + i * (360 / EXPERIENCES.length);
                const rad = (angle * Math.PI) / 180;
                const r = 150;
                const x = 50 + (r / 3.2) * Math.cos(rad);
                const y = 50 + (r / 3.2) * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%`, opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${i * 0.3}s` }}
                    onMouseEnter={() => { setHovered(i); sound.playHover(); }}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', left: 0, top: 0 }} />
                    <div
                      className="w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center bg-bg-secondary text-center p-2 transition-all duration-300"
                      style={{
                        borderColor: hovered === i ? exp.color : exp.color + '60',
                        boxShadow: hovered === i ? `0 0 30px ${exp.color}40` : 'none',
                      }}
                    >
                      <p className="font-mono text-[8px] font-bold leading-tight" style={{ color: exp.color }}>{exp.company}</p>
                      <p className="font-mono text-[7px] text-text-muted mt-1">{exp.role}</p>
                      <p className="font-mono text-[7px] text-text-muted">{exp.years}</p>
                    </div>
                    {hovered === i && (
                      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-bg-tertiary border border-border-accent p-4 w-60 z-20 pointer-events-none">
                        <p className="text-[10px] text-text-secondary leading-relaxed">{exp.description.slice(0, 120)}...</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

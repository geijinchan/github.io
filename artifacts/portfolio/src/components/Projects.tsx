import React, { useEffect, useState } from 'react';
import { sound } from '@/lib/sound';

const FEATURED_PROJECTS = [
  {
    name: 'multimodal-rag',
    description: 'Multimodal RAG system processing video, audio, and text using CLIP, Whisper, LLaVA/LLaMA and FAISS for efficient retrieval and indexing.',
    language: 'Python',
    tags: ['CLIP', 'Whisper', 'FAISS', 'LLaVA', 'LLaMA'],
    html_url: 'https://github.com/geijinchan',
  },
  {
    name: 'rag-from-scratch-llama3',
    description: 'GPU-accelerated Retrieval-Augmented Generation system built from scratch using Docker, PyTorch, and Streamlit with Llama 3 (8B).',
    language: 'Python',
    tags: ['PyTorch', 'Docker', 'Streamlit', 'Llama3', 'CUDA'],
    html_url: 'https://github.com/geijinchan',
  },
  {
    name: 'credit-card-default-mlops',
    description: 'End-to-end MLOps pipeline on AWS for credit card default prediction — data extraction, validation, training, and deployment via SageMaker.',
    language: 'Python',
    tags: ['AWS SageMaker', 'MLOps', 'CI/CD', 'SVM', 'IEEE Published'],
    html_url: 'https://github.com/geijinchan',
  },
  {
    name: 'multiple-disease-prediction',
    description: 'Scalable Streamlit ML app for multi-disease prediction with real-time inference and modular model architecture for future extension.',
    language: 'Python',
    tags: ['Streamlit', 'Scikit-learn', 'PyTorch', 'Multi-model'],
    html_url: 'https://github.com/geijinchan',
  },
];

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  'Jupyter Notebook': '#DA5B0B',
  R: '#198CE7',
};

export default function Projects() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState<boolean[]>([]);
  const [showGithub, setShowGithub] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/geijinchan/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data.slice(0, 8));
          setShowGithub(true);
        } else {
          setRepos(FEATURED_PROJECTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setRepos(FEATURED_PROJECTS);
        setLoading(false);
      });
  }, []);

  const handleOpen = () => {
    if (opened) return;
    sound.playClick();
    setOpened(true);
    const list = repos.length > 0 ? repos : FEATURED_PROJECTS;
    list.forEach((_, i) => {
      setTimeout(() => {
        setVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 150 + i * 120);
    });
  };

  useEffect(() => {
    const list = repos.length > 0 ? repos : FEATURED_PROJECTS;
    setVisible(new Array(list.length).fill(false));
  }, [repos]);

  const displayList = repos.length > 0 ? repos : FEATURED_PROJECTS;

  return (
    <section id="projects" className="min-h-screen w-full py-24 px-6 md:px-12 bg-bg-secondary relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-overline mb-3">// SECTION_02</p>
          <div className="flex items-center gap-4 font-mono text-2xl text-accent-teal">
            <span className="text-text-muted">~/</span>
            <span>projects</span>
            <span className="w-3 h-5 bg-accent-teal animate-pulse inline-block" />
          </div>
        </div>

        {!opened && (
          <div className="flex flex-col items-center gap-8 py-16">
            <div
              className="relative cursor-pointer group"
              onClick={handleOpen}
              onMouseEnter={() => sound.playHover()}
            >
              <div className="w-32 h-24 bg-bg-tertiary border border-border-accent flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-accent-teal group-hover:shadow-[0_0_40px_rgba(62,207,178,0.2)]">
                <div className="absolute top-0 left-0 right-0 h-6 bg-bg-secondary flex items-center px-3 gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <div className="mt-4 text-3xl">📁</div>
                <div className="absolute inset-0 bg-accent-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full overflow-hidden border border-border-accent">
                <img src="https://github.com/geijinchan.png" alt="github avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="font-mono text-xs text-text-muted tracking-wider">
              github.com/geijinchan
            </p>
            <button
              onClick={handleOpen}
              className="px-6 py-3 border border-border-accent text-text-secondary font-mono text-xs tracking-wider uppercase hover:border-accent-teal hover:text-accent-teal transition-all duration-300"
              onMouseEnter={() => sound.playHover()}
            >
              OPEN FOLDER [CURSOR: EXPLORE]
            </button>
          </div>
        )}

        {opened && (
          <>
            {!showGithub && (
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] text-accent-teal tracking-wider">// FEATURED PROJECTS</span>
                <div className="flex-1 h-[1px] bg-border-dim" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading
                ? Array(4).fill(null).map((_, i) => (
                    <div key={i} className="h-40 bg-bg-tertiary border border-border-dim animate-pulse rounded" />
                  ))
                : displayList.map((repo, i) => (
                    <a
                      key={i}
                      href={repo.html_url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="group bg-bg-tertiary border border-border-dim p-5 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:border-accent-teal hover:shadow-[0_8px_30px_rgba(62,207,178,0.1)]"
                      style={{
                        opacity: visible[i] ? 1 : 0,
                        transform: visible[i] ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                        transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                      }}
                      onMouseEnter={() => sound.playHover()}
                      onClick={(e) => { e.stopPropagation(); sound.playClick(); }}
                    >
                      <h3 className="font-mono text-sm text-accent-teal mb-2 truncate group-hover:text-white transition-colors">
                        {repo.name}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed flex-grow mb-3">
                        {repo.description || 'No description available.'}
                      </p>
                      {repo.tags && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {repo.tags.map((tag: string) => (
                            <span key={tag} className="px-1.5 py-0.5 font-mono text-[8px] text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-[10px] font-mono text-text-muted pt-3 border-t border-border-dim">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: LANG_COLORS[repo.language] || '#3572A5' }}
                          />
                          <span>{repo.language || 'Python'}</span>
                        </span>
                        <span className="flex gap-3">
                          <span>★ {repo.stargazers_count ?? 0}</span>
                          <span>⑂ {repo.forks_count ?? 0}</span>
                        </span>
                      </div>
                    </a>
                  ))
              }
            </div>
          </>
        )}
      </div>
    </section>
  );
}

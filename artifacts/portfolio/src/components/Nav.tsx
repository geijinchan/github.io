import React, { useEffect, useState } from 'react';
import { sound } from '@/lib/sound';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    setSoundEnabled(sound.toggle());
    sound.playClick();
  };

  return (
    <>
      <div 
        className="fixed top-0 left-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-teal z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav 
        className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-300 px-6 md:px-12 flex items-center justify-between ${
          scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border-dim' : 'bg-transparent'
        }`}
      >
        <div className="font-mono text-xl font-bold text-accent-teal relative group cursor-pointer">
          AR
          <div className="absolute inset-0 bg-accent-teal blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
        </div>
        
        <div className="hidden md:flex gap-8 font-mono text-[10px] tracking-[0.3em] uppercase">
          {['Work', 'About', 'Experience', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-text-secondary hover:text-accent-teal transition-colors py-2 relative overflow-hidden group"
              onMouseEnter={() => sound.playHover()}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
          ))}
        </div>
        
        <button 
          onClick={toggleSound}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-border-dim hover:border-accent-teal hover:bg-accent-glow transition-all"
          aria-label="Toggle Sound"
        >
          <div className="flex items-end gap-[2px] h-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`w-[2px] bg-accent-teal ${soundEnabled ? 'animate-pulse' : 'h-[2px]'}`}
                style={{ 
                  height: soundEnabled ? `${Math.random() * 8 + 4}px` : '2px',
                  transition: 'height 0.3s'
                }}
              />
            ))}
          </div>
        </button>
      </nav>
    </>
  );
}

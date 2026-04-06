import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t-[0.5px] border-border-dim bg-bg-secondary py-8 px-6 md:px-12 font-mono text-xs flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-text-muted hover:text-accent-purple transition-colors cursor-pointer select-none">
        ABHISHEK © 2024
      </div>
      
      <div className="text-text-muted/50 tracking-widest text-[10px]">
        BUILT WITH THREE.JS + GSAP + REACT
      </div>
      
      <button 
        onClick={scrollToTop}
        className="text-text-muted hover:text-accent-teal transition-colors flex items-center gap-2"
      >
        BACK TO TOP <span className="animate-bounce">↑</span>
      </button>
    </footer>
  );
}

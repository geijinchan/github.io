import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/lib/sound';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING_WEBGL');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statuses = [
      'INITIALIZING_WEBGL',
      'LOADING_ASSETS',
      'COMPILING_SHADERS',
      'READY'
    ];
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        setStatus('READY');
        
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
            setTimeout(onComplete, 800);
          }
        }, 500);
      }
      
      setProgress(Math.floor(currentProgress));
      
      if (currentProgress < 30) setStatus(statuses[0]);
      else if (currentProgress < 60) setStatus(statuses[1]);
      else if (currentProgress < 90) setStatus(statuses[2]);
      
      if (currentProgress % 10 < 2) sound.playTyping();
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#04060d] text-[#3ecfb2] font-mono transition-all duration-800"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div className="text-6xl md:text-8xl font-bold mb-8 tracking-widest relative">
        {progress}%
        <div className="absolute inset-0 text-[#7c6fcd] opacity-50 mix-blend-screen -translate-x-1">{progress}%</div>
        <div className="absolute inset-0 text-white opacity-50 mix-blend-screen translate-x-1">{progress}%</div>
      </div>
      <div className="text-xs tracking-[0.4em] mb-12 animate-pulse">{status}</div>
      <div className="w-64 h-[1px] bg-[#0d1124] relative overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-[#3ecfb2] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

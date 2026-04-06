import React, { useEffect, useState } from 'react';
import { sound } from '@/lib/sound';

export default function EasterEggs() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLog, setTerminalLog] = useState<string[]>(['ABHISHEK-OS v1.0.0', 'Type "help" for available commands.']);
  const [inputVal, setInputValue] = useState('');
  const [cheatActivated, setCheatActivated] = useState(false);

  useEffect(() => {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami Code
      if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateCheat();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }

      // Backtick Terminal
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowTerminal(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activateCheat = () => {
    setCheatActivated(true);
    sound.playSuccess();
    setTimeout(() => setCheatActivated(false), 3000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    sound.playTyping();
    const cmd = inputVal.trim().toLowerCase();
    setInputValue('');
    
    const newLogs = [...terminalLog, `> ${cmd}`];
    
    switch (cmd) {
      case 'help':
        newLogs.push('Available commands: help, about, skills, whoami, clear, matrix');
        break;
      case 'about':
        newLogs.push('Data Scientist passionate about building intelligent systems.');
        break;
      case 'skills':
        newLogs.push('ML, Deep Learning, GenAI, Python, AWS, and more.');
        break;
      case 'whoami':
        newLogs.push('ABHISHEK - Data Scientist & AI Engineer');
        break;
      case 'clear':
        setTerminalLog(['ABHISHEK-OS v1.0.0']);
        return;
      case 'matrix':
        newLogs.push('Initiating matrix protocol...');
        sound.playGlitch();
        break;
      default:
        newLogs.push(`Command not found: ${cmd}`);
    }
    
    setTerminalLog(newLogs);
  };

  return (
    <>
      {cheatActivated && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center animate-pulse bg-black/50 backdrop-blur-sm">
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
            CHEAT CODE ACTIVATED
          </h2>
        </div>
      )}

      {showTerminal && (
        <div className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-[60vh] bg-bg-secondary border border-border-dim rounded shadow-2xl flex flex-col font-mono text-sm">
            <div className="bg-bg-tertiary px-4 py-2 border-b border-border-dim flex justify-between items-center">
              <span className="text-text-muted">secret_terminal.sh</span>
              <button onClick={() => setShowTerminal(false)} className="text-text-muted hover:text-white">✕</button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto space-y-2 text-accent-teal">
              {terminalLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
            
            <form onSubmit={handleTerminalSubmit} className="p-4 border-t border-border-dim flex gap-2 text-accent-teal">
              <span>$</span>
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputValue(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent outline-none"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

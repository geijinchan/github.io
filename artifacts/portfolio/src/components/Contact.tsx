import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { sound } from '@/lib/sound';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

type Step = 'idle' | 'name' | 'email' | 'message' | 'submitting' | 'success';

interface Line {
  type: 'system' | 'prompt' | 'input' | 'success' | 'error';
  text: string;
}

export default function Contact() {
  const [step, setStep] = useState<Step>('idle');
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const addLine = (line: Line) => {
    setLines(prev => [...prev, line]);
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 50);
  };

  const handleActivate = () => {
    setStep('name');
    setLines([]);
    setTimeout(() => {
      addLine({ type: 'system', text: '$ initiating_contact_sequence...' });
      setTimeout(() => {
        addLine({ type: 'system', text: '> Connection established. Please respond to the prompts.' });
        setTimeout(() => {
          addLine({ type: 'prompt', text: '> enter_name:' });
          inputRef.current?.focus();
        }, 300);
      }, 400);
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = input.trim();
      if (!val) return;

      sound.playClick();

      if (step === 'name') {
        setName(val);
        addLine({ type: 'input', text: `> enter_name: ${val}` });
        setInput('');
        setTimeout(() => {
          addLine({ type: 'prompt', text: '> enter_email:' });
          setStep('email');
        }, 200);
      } else if (step === 'email') {
        setEmail(val);
        addLine({ type: 'input', text: `> enter_email: ${val}` });
        setInput('');
        setTimeout(() => {
          addLine({ type: 'prompt', text: '> enter_message:' });
          setStep('message');
        }, 200);
      } else if (step === 'message') {
        addLine({ type: 'input', text: `> enter_message: ${val}` });
        setInput('');
        setStep('submitting');
        setTimeout(() => {
          addLine({ type: 'system', text: '$ COMPILING_MESSAGE...' });
          setTimeout(() => {
            addLine({ type: 'system', text: '$ ENCRYPTING_PAYLOAD...' });
            submit(name, email, val);
          }, 600);
        }, 300);
      }
    }
  };

  const submit = async (n: string, e: string, msg: string) => {
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: n,
          from_email: e,
          message: msg,
          reply_to: e,
        },
        PUBLIC_KEY
      );
      sound.playSuccess();
      addLine({ type: 'success', text: `✓ MESSAGE_DELIVERED — ${new Date().toISOString()}` });
      setStep('success');
    } catch {
      addLine({ type: 'error', text: '✗ TRANSMISSION_FAILED — check connection and try again' });
      setStep('idle');
    }
  };

  const handleChar = () => sound.playTyping();

  useEffect(() => {
    if (step !== 'idle' && step !== 'submitting' && step !== 'success') {
      inputRef.current?.focus();
    }
  }, [step, lines]);

  const isTyping = step === 'name' || step === 'email' || step === 'message';

  return (
    <section id="contact" className="min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center bg-bg-primary relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, rgba(124,111,205,0.06) 0%, transparent 70%)'
        }} />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <div className="mb-10 text-center">
          <p className="text-overline mb-3">// SECTION_05</p>
          <h2 className="text-section text-text-primary">GET IN TOUCH</h2>
        </div>

        <div className="bg-bg-secondary border border-border-dim rounded-none overflow-hidden shadow-2xl shadow-accent-purple/5">
          <div className="bg-bg-tertiary px-4 py-3 flex items-center gap-3 border-b border-border-dim">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="mx-auto font-mono text-xs text-text-muted tracking-wider">contact_me.sh</span>
          </div>

          <div
            ref={bodyRef}
            className="p-6 min-h-[380px] font-mono text-sm flex flex-col overflow-y-auto"
            style={{ maxHeight: '420px' }}
            onClick={() => step === 'idle' && handleActivate()}
          >
            {step === 'idle' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 cursor-pointer select-none">
                <p className="text-text-muted text-xs tracking-wider">CLICK TO INITIATE CONTACT SEQUENCE</p>
                <button
                  onClick={handleActivate}
                  className="px-6 py-3 border border-border-accent text-accent-teal hover:bg-accent-glow hover:border-accent-teal transition-all font-mono text-sm tracking-wider"
                  onMouseEnter={() => sound.playHover()}
                >
                  ./initiate_connection.sh
                </button>
                <span className="text-text-muted text-xs animate-pulse">▌</span>
              </div>
            )}

            {lines.map((line, i) => (
              <div key={i} className={`mb-1 leading-relaxed ${
                line.type === 'system' ? 'text-text-muted' :
                line.type === 'prompt' ? 'text-accent-teal' :
                line.type === 'input' ? 'text-text-primary' :
                line.type === 'success' ? 'text-green-400' :
                'text-red-400'
              }`}>
                {line.text}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-accent-teal mt-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => { setInput(e.target.value); handleChar(); }}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none flex-1 text-text-primary caret-accent-teal"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="animate-pulse">▌</span>
              </div>
            )}

            {step === 'submitting' && (
              <div className="text-accent-teal mt-2 animate-pulse">
                $ SENDING<span className="inline-block animate-spin">⠋</span>
              </div>
            )}

            {step === 'success' && (
              <div className="mt-4">
                <button
                  onClick={() => { setStep('idle'); setLines([]); }}
                  className="text-accent-teal hover:underline text-xs font-mono"
                >
                  $ return_to_prompt
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-12">
          {[
            { label: 'GITHUB', href: 'https://github.com/geijinchan' },
            { label: 'LINKEDIN', href: 'https://linkedin.com/in/abhishek-6b7108188' },
            { label: 'EMAIL', href: 'mailto:abhishekravikumar24@gmail.com' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-2"
              onMouseEnter={() => sound.playHover()}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted group-hover:text-accent-teal transition-colors duration-200">
                [ {link.label} ]
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

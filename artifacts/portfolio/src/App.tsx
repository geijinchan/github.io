import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Background from '@/components/Background';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import EasterEggs from '@/components/EasterEggs';

export default function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden selection:bg-accent-purple selection:text-white">
      <Cursor />
      <EasterEggs />
      
      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.015]"
           style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)' }} />

      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Background />
          <Nav />
          <main className="relative z-10">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

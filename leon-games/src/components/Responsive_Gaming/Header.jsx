// components/RGHero.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GreenButton } from '../common/AnimatedButton';
import Logo from '../../assets/images/logo.png';
import { HeroIllustration } from './Illustrations';

export default function RGHero() {
  const scrollToCommitment = () => {
    const el = document.getElementById('our-commitment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const MAX_MOVE = 20; // Maximum displacement in pixels for a smooth effect

  // Typing effect parameters
  const phrases = [
    'Play Smart.',
    'Stay in Control.',
    'Enjoy Responsibly.',
    'Game with Confidence.'
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Start typing automatically on mount using an internal loop
  useEffect(() => {
    let mounted = true;
    let current = '';
    let deleting = false;
    let idx = 0;
    let timeoutId;

    const tick = () => {
      const full = phrases[idx];
      if (!deleting) {
        current = full.slice(0, current.length + 1);
        if (!mounted) return;
        setDisplayText(current);
        if (current.length === full.length) {
          timeoutId = setTimeout(() => {
            deleting = true;
            tick();
          }, 1000);
          return;
        }
        timeoutId = setTimeout(tick, 70);
      } else {
        current = full.slice(0, current.length - 1);
        if (!mounted) return;
        setDisplayText(current);
        if (current.length === 0) {
          deleting = false;
          idx = (idx + 1) % phrases.length;
        }
        timeoutId = setTimeout(tick, 30);
      }
    };

    tick();
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  // run once on mount
  }, []);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const x = (relX / (rect.width / 2)) * MAX_MOVE;
    const y = (relY / (rect.height / 2)) * MAX_MOVE;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <header className="relative w-full py-16 lg:py-24 border-b border-zinc-900 overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#00C853]/5 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-left"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#00C853] bg-[#00C853]/10 px-3.5 py-1.5 rounded-full border border-[#00C853]/20 mb-3 inline-block">
            🛡️ Player Well-being First
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            🎯 Responsible <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#00C853] to-blue-500">
              🕹️ Skill Gaming
            </span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
            We believe gaming should remain enjoyable, entertaining, and always within your control. Our goal is to create a fair, secure, and enjoyable environment where every player can have fun while maintaining healthy gaming habits.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <GreenButton onClick={scrollToCommitment}>✨ Explore Healthy Gaming Practices</GreenButton>
          </div>
        </motion.div>

        {/* Right Dynamic Laptop Element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="cursor-move w-full max-w-md lg:max-w-lg flex justify-center relative select-none"
            style={{ overflow: 'visible' }}
          >
            {/* Unified Parallax Group Container */}
            <div
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: 'transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
              }}
              className="relative w-full flex flex-col items-center justify-center p-4"
            >
              
              {/* Premium Top Banner with Typographic Indicator */}
              <div
                className="absolute top-0 w-[85%] sm:w-3/4 bg-black/75 backdrop-blur-lg px-5 py-3 rounded-xl border border-zinc-800/80 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between"
                style={{ transform: 'rotate(-3deg) translateY(-6px)', transformOrigin: 'center top' }}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
                  <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Status</span>
                </div>
                <div className="text-sm font-bold text-white font-mono tracking-wide">
                  {displayText}
                  <span className="inline-block w-[2px] h-4 bg-[#00C853] ml-1 align-middle animate-pulse" />
                </div>
              </div>

              {/* Central Illustration */}
              <div className="relative z-10 w-full max-w-[420px] p-2 drop-shadow-[0_20px_50px_rgba(0,200,83,0.15)]">
                <HeroIllustration />
              </div>

              {/* Premium Bottom Banner containing Corporate Logo */}
              <div
                className="absolute bottom-10 w-[85%] sm:w-3/4 bg-black/75 backdrop-blur-lg px-5 py-3 rounded-xl border border-zinc-800/80 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between"
                style={{ transform: 'rotate(6deg) translateY(6px)', transformOrigin: 'center bottom' }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-lg bg-zinc-900 border border-zinc-800">
                    <img src={Logo} alt="Leon Games logo" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-xs font-black tracking-widest text-white uppercase">
                    Leon Games
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#00C853] uppercase bg-[#00C853]/10 px-2 py-0.5 rounded border border-[#00C853]/20">
                  Certified
                </span>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
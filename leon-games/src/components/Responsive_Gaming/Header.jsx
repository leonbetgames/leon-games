// components/RGHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { HeroIllustration } from './Illustrations';

export default function RGHero() {
  const scrollToCommitment = () => {
    const el = document.getElementById('our-commitment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
          <span className="text-xs font-bold tracking-widest uppercase text-[#00C853] bg-[#00C853]/10 px-3.5 py-1.5 rounded-full border border-[#00C853]/20">
            Player Well-being First
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Responsible <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#00C853] to-blue-500">
              Skill Gaming
            </span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
            We believe gaming should remain enjoyable, entertaining, and always within your control. Our goal is to create a fair, secure, and enjoyable environment where every player can have fun while maintaining healthy gaming habits.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToCommitment}
              className="px-6 py-3.5 rounded-xl bg-[#00C853] text-black font-semibold text-sm hover:bg-[#00b24a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-emerald-950/20"
            >
              Explore Healthy Gaming Practices
            </button>
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </header>
  );
}
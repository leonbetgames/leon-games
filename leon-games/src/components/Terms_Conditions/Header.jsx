// components/TermsHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';

export default function TermsHero() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="relative w-full py-16 lg:py-24 border-b border-zinc-900 bg-gradient-to-b from-black via-zinc-950/20 to-transparent">
      {/* Background visual styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00C853]/10 via-transparent to-transparent -z-10 opacity-70" />
      
      <div className="max-w-[850px] mx-auto px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#00C853] mb-2 shadow-lg shadow-emerald-950/10"
        >
          <FiFileText className="w-8 h-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
        >
          Terms &amp; Conditions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-zinc-500 uppercase tracking-widest font-mono"
        >
          Last Updated: {currentDate}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
        >
          These Terms &amp; Conditions govern your access to and use of Leon Games. This is a legally binding contract between you and the Platform. Please read these terms carefully before entering active matchmaking lobbies or utilizing our wallet systems.
        </motion.p>
      </div>
    </header>
  );
}
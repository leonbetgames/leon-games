// components/PrivacyHero.jsx
import React from 'react';
import { FiEye } from 'react-icons/fi';

export default function PrivacyHero() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="relative w-full py-16 lg:py-24 border-b border-zinc-900 bg-gradient-to-b from-black via-zinc-950/20 to-transparent">
      {/* Visual glowing green gradient behind title */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00C853]/10 via-transparent to-transparent -z-10 opacity-70" />
      
      <div className="max-w-[850px] mx-auto px-6 text-center space-y-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#00C853] shadow-lg">
            <FiEye className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Privacy Policy
        </h1>

        <p className="text-sm text-zinc-500 uppercase tracking-widest font-mono">
          Last Updated: {currentDate}
        </p>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          At Leon Games, transparency and security are central to your gaming experience. This policy explains how we manage and protect the minimal personal information required to run our secure competitive matchmaking systems.
        </p>
      </div>
    </header>
  );
}
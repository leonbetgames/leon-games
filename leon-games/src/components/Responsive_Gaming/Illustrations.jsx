// components/RGIllustrations.jsx
import React from 'react';

export function HeroIllustration() {
  return (
    <svg 
      className="w-full h-auto max-w-[480px] mx-auto drop-shadow-[0_15px_40px_rgba(0,200,83,0.18)] select-none" 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Responsible Gaming balance and control illustration"
    >
      <defs>
        {/* Soft atmospheric background glow */}
        <linearGradient id="shieldGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00C853" stopOpacity="0.05" />
        </linearGradient>

        {/* Dynamic green gradient for the primary brand look */}
        <linearGradient id="emeraldPrimary" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Calming blue/purple gradient for structural elements */}
        <linearGradient id="calmNavy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>

        {/* High-end neon glow filter */}
        <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Ambient Background Layer */}
      <circle cx="250" cy="250" r="180" fill="url(#shieldGlow)" filter="url(#neonBlur)" />

      {/* 2. Outer Protection Ring (Shield) */}
      <circle cx="250" cy="250" r="190" stroke="#1E293B" strokeWidth="2" />
      <circle cx="250" cy="250" r="170" stroke="url(#emeraldPrimary)" strokeWidth="1.5" strokeDasharray="10 6" strokeOpacity="0.4" />

      {/* 3. The Time Control Clock Ring (Tracking limits) */}
      <g opacity="0.8">
        <circle cx="250" cy="250" r="130" stroke="#334155" strokeWidth="2" />
        {/* Hour markers on the outer dial */}
        <line x1="250" y1="110" x2="250" y2="120" stroke="#00C853" strokeWidth="3" strokeLinecap="round" />
        <line x1="250" y1="380" x2="250" y2="390" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        <line x1="120" y1="250" x2="130" y2="250" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        <line x1="370" y1="250" x2="380" y2="250" stroke="#00C853" strokeWidth="3" strokeLinecap="round" />
        {/* Abstract clock hand indicating structured playtime */}
        <line x1="250" y1="250" x2="320" y2="180" stroke="url(#emeraldPrimary)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="320" cy="180" r="4" fill="#00C853" />
      </g>

      {/* 4. The Structural Balance Stand (Self-Control base) */}
      <g transform="translate(0, 20)">
        {/* Triangular balance support scale */}
        <path d="M210 330 L250 210 L290 330 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" opacity="0.5" />
        {/* Horizontal balance beam */}
        <rect x="110" y="330" width="280" height="10" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="2" />
        {/* Balance scale support feet */}
        <path d="M190 340 L310 340 L290 355 L210 355 Z" fill="#1E293B" stroke="#475569" strokeWidth="2" />
      </g>

      {/* 5. Left Pod - Personal Well-being (Mindful Heart) */}
      <g transform="translate(90, 275)" filter="url(#neonBlur)">
        <circle cx="20" cy="20" r="28" fill="#020617" stroke="#3B82F6" strokeWidth="2" />
        {/* Smooth, simple SVG Heart path */}
        <path d="M20 29 C18 29 11 23 11 17 C11 13 14 10 18 10 C20 10 22 12 23 13 C24 12 26 10 28 10 C32 10 35 13 35 17 C35 23 28 29 26 29 Z" fill="#3B82F6" fillOpacity="0.8" />
        {/* Link line to balance beam */}
        <line x1="20" y1="48" x2="20" y2="75" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
      </g>

      {/* 6. Right Pod - Safe Budgeting (Lock/Security) */}
      <g transform="translate(350, 275)" filter="url(#neonBlur)">
        <circle cx="20" cy="20" r="28" fill="#020617" stroke="url(#emeraldPrimary)" strokeWidth="2" />
        {/* Clean, minimalist Padlock Icon */}
        <rect x="13" y="18" width="14" height="10" rx="2" fill="#00C853" />
        <path d="M16 18 V14 C16 11.8 17.8 10 20 10 C22.2 10 24 11.8 24 14 V18" stroke="#00C853" strokeWidth="2" fill="none" />
        {/* Link line to balance beam */}
        <line x1="20" y1="48" x2="20" y2="75" stroke="#00C853" strokeWidth="2" strokeDasharray="4 4" />
      </g>

      {/* 7. Central Main Element - Premium Ergonomic Controller */}
      <g transform="translate(150, 160)" filter="url(#neonBlur)">
        {/* Smooth Ergonomic Gamepad Outer Shell */}
        <path d="M40 30 C15 30 5 65 5 105 C5 125 15 140 30 140 C45 140 60 115 80 115 H120 C140 115 155 140 170 140 C185 140 195 125 195 105 C195 65 185 30 160 30 C135 30 115 50 100 50 C85 50 65 30 40 30 Z" fill="url(#calmNavy)" stroke="#334155" strokeWidth="3" />
        
        {/* Textured, soft-grip handles */}
        <path d="M12 90 C8 100 8 115 15 125 C20 130 26 130 32 120" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M188 90 C192 100 192 115 185 125 C180 130 174 130 168 120" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Central glowing organic control lines (System Integrity indicators) */}
        <path d="M85 75 H115" stroke="url(#emeraldPrimary)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="100" cy="90" r="5" fill="#00C853" />

        {/* Elegant D-Pad */}
        <g transform="translate(30, 60)">
          <rect x="10" y="0" width="8" height="28" rx="2" fill="#334155" />
          <rect x="0" y="10" width="28" height="8" rx="2" fill="#334155" />
          {/* Active emerald center dot */}
          <circle cx="14" cy="14" r="2.5" fill="#00C853" />
        </g>

        {/* Ergonomic Action Buttons */}
        <g transform="translate(136, 60)">
          <circle cx="14" cy="4" r="4.5" fill="#334155" />
          <circle cx="14" cy="24" r="4.5" fill="#334155" />
          <circle cx="4" cy="14" r="4.5" fill="#334155" />
          <circle cx="24" cy="14" r="4.5" fill="#00C853" /> {/* Prime active action button */}
        </g>

        {/* Minimalist Thumbsticks */}
        <circle cx="70" cy="95" r="16" fill="#020617" stroke="#334155" strokeWidth="1.5" />
        <circle cx="70" cy="95" r="8" fill="#1E293B" />
        <circle cx="130" cy="95" r="16" fill="#020617" stroke="#334155" strokeWidth="1.5" />
        <circle cx="130" cy="95" r="8" fill="#1E293B" />
      </g>

      {/* 8. Organic Leaf Accents (Signifying life balance & wellness) */}
      <g transform="translate(195, 390)">
        {/* Central stem */}
        <path d="M50 40 Q55 10 55 0" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Soft emerald leaves */}
        <path d="M55 20 Q75 10 85 0 Q65 15 55 20 Z" fill="url(#emeraldPrimary)" />
        <path d="M55 25 Q35 15 25 5 Q45 20 55 25 Z" fill="#059669" />
        <path d="M55 5 Q70 -10 75 -20 Q60 -5 55 5 Z" fill="url(#emeraldPrimary)" />
        <path d="M55 10 Q40 -5 35 -15 Q45 0 55 10 Z" fill="#059669" />
      </g>
    </svg>
  );
}

export function TrustIllustration() {
  return (
    <svg className="w-24 h-24 text-[#00C853] mx-auto opacity-90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" stroke="#00C853" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="32" fill="#00C853" fillOpacity="0.1" />
      <path d="M38 52 L46 60 L62 42" stroke="#00C853" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
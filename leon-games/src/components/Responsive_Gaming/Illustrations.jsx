// components/RGIllustrations.jsx
import React from 'react';

export function HeroIllustration() {
  return (
    <svg className="w-full h-auto max-w-[480px] mx-auto drop-shadow-[0_10px_30px_rgba(0,200,83,0.15)]" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background Soft Glow */}
      <circle cx="250" cy="250" r="180" fill="url(#purpleGlow)" filter="url(#glow)" />
      
      {/* Abstract Calming Shapes / Balance Scale Metaphor */}
      <circle cx="250" cy="190" r="120" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="250" cy="190" r="80" stroke="#475569" strokeWidth="1" />
      
      {/* Floating Balance Pods (Self Care & Fun) */}
      <g transform="translate(0, 0)">
        <rect x="130" y="320" width="240" height="12" rx="6" fill="#1E293B" />
        <line x1="250" y1="190" x2="250" y2="320" stroke="#475569" strokeWidth="2" />
        {/* Support Base */}
        <path d="M210 320 L250 190 L290 320 Z" fill="#334155" opacity="0.3" />
      </g>
      
      {/* Laptop & Calming Workstation */}
      <rect x="170" y="240" width="160" height="100" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="3" />
      <rect x="180" y="250" width="140" height="70" rx="6" fill="#020617" />
      
      {/* Subtle screen graphic - line charts indicating stability and control */}
      <path d="M195 300 Q220 270 245 290 T295 270" stroke="url(#emeraldGrad)" strokeWidth="3" strokeLinecap="round" />
      
      {/* Laptop Base */}
      <path d="M150 335 L350 335 L330 350 L170 350 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      <rect x="230" y="338" width="40" height="4" rx="2" fill="#475569" />
      
      {/* Plant (Nature, Well-being) */}
      <g transform="translate(360, 260)">
        <rect x="10" y="60" width="30" height="40" rx="4" fill="#334155" />
        <path d="M5 60 Q25 20 25 10 Q25 20 45 60 Z" fill="#10B981" />
        <path d="M15 60 Q25 30 25 20 Q25 30 35 60 Z" fill="#059669" />
      </g>
      
      {/* Cup (Relaxation) */}
      <rect x="120" y="300" width="20" height="25" rx="4" fill="#3B82F6" opacity="0.8" />
      <path d="M140 305 Q145 310 140 315" stroke="#3B82F6" strokeWidth="3" fill="none" />
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
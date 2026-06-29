// components/SupportIllustrations.jsx
import React from 'react';

export default function SupportIllustration() {
  return (
    <svg className="w-full h-auto max-w-[460px] mx-auto drop-shadow-[0_15px_40px_rgba(0,200,83,0.12)]" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00C853" stopOpacity="0.05" />
        </linearGradient>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Decorative Glow */}
      <circle cx="250" cy="250" r="160" fill="url(#glowGrad)" filter="url(#softBlur)" />

      {/* Grid pattern background */}
      <circle cx="250" cy="250" r="140" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="250" cy="250" r="100" stroke="#334155" strokeWidth="1" strokeDasharray="8 8" />

      {/* Desk surface line */}
      <line x1="100" y1="360" x2="400" y2="360" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

      {/* Support Specialist Metaphor/Workspace */}
      <rect x="170" y="210" width="160" height="120" rx="20" fill="#020617" stroke="#1E293B" strokeWidth="3" />
      <rect x="180" y="220" width="140" height="100" rx="12" fill="#0F172A" />

      {/* Glowing Screen Interface */}
      <rect x="190" y="230" width="120" height="80" rx="8" fill="#020617" />
      <circle cx="250" cy="270" r="24" stroke="#00C853" strokeWidth="2" strokeDasharray="5 3" />
      <path d="M238 270 L246 278 L262 262" stroke="#00C853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Laptop Stand Base */}
      <path d="M220 330 L280 330 L290 360 L210 360 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />

      {/* Floating Chat Bubble Cards */}
      <g transform="translate(90, 120)">
        <rect x="0" y="0" width="90" height="40" rx="12" fill="#0F172A" stroke="#00C853" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" fill="#00C853" />
        <rect x="35" y="15" width="40" height="4" rx="2" fill="#E2E8F0" />
        <rect x="35" y="22" width="25" height="4" rx="2" fill="#94A3B8" />
      </g>

      <g transform="translate(320, 160)">
        <rect x="0" y="0" width="90" height="40" rx="12" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" fill="#3B82F6" />
        <rect x="35" y="15" width="40" height="4" rx="2" fill="#E2E8F0" />
        <rect x="35" y="22" width="25" height="4" rx="2" fill="#94A3B8" />
      </g>
    </svg>
  );
}
import React from "react";

export function LeonLogo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Main vibrant green to cyan gradient */}
        <linearGradient id="lg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" /> {/* Emerald 500 */}
          <stop offset="50%" stopColor="#059669" /> {/* Emerald 600 */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan 500 */}
        </linearGradient>

        {/* Subtle glow filter for high-impact gaming aesthetic */}
        <filter id="lg-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagonal Background Shield Plate */}
      <polygon
        points="50,5 90,27 90,73 50,95 10,73 10,27"
        fill="#0A0A0A"
        stroke="rgba(255, 255, 255, 0.04)"
        strokeWidth="2"
      />

      {/* Stylized Outer Shield Chassis (Split-Hexagon Design) */}
      {/* Left wing */}
      <path
        d="M 44,11 L 16,27 L 16,73 L 44,89"
        stroke="url(#lg-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* Right wing */}
      <path
        d="M 56,11 L 84,27 L 84,73 L 56,89"
        stroke="url(#lg-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Stylized Futuristic "L" Letter */}
      <path
        d="M 32,32 L 32,68 L 46,68"
        stroke="url(#lg-gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#lg-glow)"
      />

      {/* Stylized Futuristic "G" Letter */}
      <path
        d="M 68,32 L 54,32 L 54,68 L 68,68 L 68,50 L 59,50"
        stroke="url(#lg-gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#lg-glow)"
      />

      {/* Center tech-accent light dot */}
      <circle cx="50" cy="50" r="2.5" fill="#34D399" />
    </svg>
  );
}
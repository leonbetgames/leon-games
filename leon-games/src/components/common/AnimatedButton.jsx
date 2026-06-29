import React from 'react';
import { motion } from 'framer-motion';

export function GreenButton({ as = 'button', children, className = '', ...props }) {
  const Component = motion[as] || motion.button;
  return (
    <Component
      type={as === 'button' ? 'button' : undefined}
      whileTap={{ scale: 0.6, y: 4 }}
      transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      className={
        'w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#22C55E] text-[#050505] font-black text-xs py-3.5 px-6 transition-all duration-300 shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.4)] flex items-center justify-center cursor-pointer border border-transparent border-b-2 group-hover:border-b-4 group-hover:border-white whitespace-nowrap ' +
        className
      }
      {...props}
    >
      <span className="absolute inset-x-0 bottom-0 h-full bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
      <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-wider transition-colors duration-500 group-hover:text-white text-[#050505]">{children}</span>
    </Component>
  );
}

export function BlackButton({ as = 'button', children, className = '', ...props }) {
  const Component = motion[as] || motion.button;
  return (
    <Component
      type={as === 'button' ? 'button' : undefined}
      whileTap={{ scale: 0.6, y: 4 }}
      transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      className={
        'w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#111111] border border-white/[0.08] text-white font-semibold text-xs py-3.5 px-6 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ' +
        className
      }
      {...props}
    >
      <span className="absolute inset-x-0 bottom-0 h-full bg-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
      <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.02em] whitespace-nowrap transition-colors duration-500 group-hover:text-black text-white">{children}</span>
    </Component>
  );
}

export default GreenButton;

// components/FAQSidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';

export default function FAQSidebar({ faqData, activeId, setActiveId }) {
  return (
    <aside 
      className="hidden lg:flex flex-col w-[300px] border-r border-zinc-800 bg-black/40 backdrop-blur-md overflow-y-auto overflow-x-hidden min-h-0 h-full scrollbar-thin scrollbar-thumb-zinc-800"
      aria-label="FAQ Navigation Sidebar"
    >
      <div className="p-6 border-b border-zinc-800/80">
        <h2 className="text-xs font-semibold tracking-widest text-[#00C853] uppercase">
          FAQ Categories
        </h2>
        <p className="text-xs text-zinc-500 mt-1">Select an article below</p>
      </div>

      <nav className="p-4 space-y-1" role="tablist" aria-label="FAQ Questions">
        {faqData.map((faq) => {
          const isActive = faq.id === activeId;
          return (
            <button
              key={faq.id}
              onClick={() => setActiveId(faq.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`faq-panel-${faq.id}`}
              id={`faq-tab-${faq.id}`}
              className={`relative w-full text-left px-4 py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-between group focus:outline-none ${
                isActive 
                  ? 'text-white font-medium' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {/* Animated active indicator background */}
              {isActive && (
                <motion.div
                  layoutId="activeSidebarHighlight"
                  className="absolute inset-0 bg-zinc-900 border-l-2 border-[#00C853] rounded-xl -z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_12px_rgba(0,200,83,0.08)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <span className="truncate pr-2">{faq.question}</span>
              
              <FiChevronRight 
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                  isActive ? 'text-[#00C853] translate-x-0.5' : 'text-zinc-600 group-hover:text-zinc-400'
                }`} 
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
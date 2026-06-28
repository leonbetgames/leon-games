// components/FAQMobileMenu.jsx
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronRight } from 'react-icons/fi';

export default function FAQMobileMenu({ faqData, activeId, setActiveId, isOpen, setIsOpen }) {
  const containerRef = useRef(null);

  // Close when clicking outside of the active expanded panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <div className="lg:hidden" ref={containerRef}>
      {/* Dim Overlay when menu is active */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Morphing Container */}
      <motion.div
        layout
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          closed: {
            width: 48,
            height: 48,
            borderRadius: 9999,
            backgroundColor: '#00C853',
            bottom: '24px',
            left: '24px',
            boxShadow: '0px 8px 24px rgba(0, 200, 83, 0.4)',
          },
          open: {
            width: 'calc(100vw - 48px)',
            height: 'min(500px, 70vh)',
            borderRadius: 24,
            backgroundColor: 'rgba(9, 9, 11, 0.98)',
            bottom: '24px',
            left: '24px',
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.1) inset',
          }
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="fixed z-50 flex flex-col overflow-hidden border border-zinc-800/60"
      >
        {/* Closed Trigger State */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full h-full flex items-center justify-center text-black focus:outline-none focus:ring-2 focus:ring-[#00C853] focus:ring-offset-2 focus:ring-offset-black rounded-full"
            aria-label="Open FAQ navigation menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        )}

        {/* Open Expanded Menu Panel State */}
        {isOpen && (
          <div className="flex flex-col h-full text-white p-5 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 shrink-0">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#00C853] uppercase">
                  Select a Question
                </span>
                <p className="text-[10px] text-zinc-500">20 Topics Available</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors focus:outline-none"
                aria-label="Close FAQ menu"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable list inside layout */}
            <div className="flex-1 overflow-y-auto py-2 mt-2 space-y-1 scrollbar-none">
              {faqData.map((faq) => {
                const isActive = faq.id === activeId;
                return (
                  <button
                    key={faq.id}
                    onClick={() => {
                      setActiveId(faq.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      isActive 
                        ? 'bg-zinc-900 text-[#00C853] font-semibold' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="truncate pr-3">{faq.question}</span>
                    <FiChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#00C853]' : 'text-zinc-700'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
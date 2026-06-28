// pages/FAQPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../components/Faqs/Data'; // Adjust relative file location if needed
import { Navigation } from '../components/common/NavBar'; // Imports specified Navigation layout exactly
import FAQSidebar from '../components/Faqs/SideBar';
import FAQMobileMenu from '../components/Faqs/MobileMenu';
import FAQContent from '../components/Faqs/ContentPanel';

export default function FAQPage() {
  const [activeId, setActiveId] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentScrollRef = useRef(null);

  // Retrieve current active data item
  const activeFaq = faqData.find((item) => item.id === activeId) || faqData[0];

  // Reset viewport scroll positions when selected article shifts
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeId]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMobileMenuOpen]);

  // Handle standard accessibility arrow controls
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveId((prev) => (prev > 1 ? prev - 1 : faqData.length));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveId((prev) => (prev < faqData.length ? prev + 1 : 1));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen bg-[#070708] text-zinc-100 flex flex-col font-sans antialiased overflow-hidden">
      {/* 1. Exactly required Navigation Element */}
      <Navigation variant="subpage" label="FAQs" />

      {/* 2. Structured Layout Space */}
      <main className="flex-1 flex w-full max-w-[1440px] mx-auto overflow-hidden relative border-t border-zinc-900 mt-16 md:mt-20 min-h-0">
        
        {/* Left Desktop Menu */}
        <FAQSidebar 
          faqData={faqData} 
          activeId={activeId} 
          setActiveId={setActiveId} 
        />

        {/* Right Content Stream Viewport */}
        <div 
          ref={contentScrollRef}
          className="flex-1 overflow-y-auto h-full p-4 md:p-8 lg:p-10 outline-none"
          tabIndex={0}
          aria-label="FAQ Detail Viewer"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full"
            >
              <FAQContent faq={activeFaq} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Mobile Trigger Action Menu */}
        <FAQMobileMenu 
          faqData={faqData} 
          activeId={activeId} 
          setActiveId={setActiveId}
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
        />
      </main>
    </div>
  );
}
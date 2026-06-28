// pages/TermsConditions.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { termsContent } from '../components/Terms_Conditions/Data';
import { Navigation } from '../components/common/NavBar';
import TermsHero from '../components/Terms_Conditions/Header';
import TermsSection from '../components/Terms_Conditions/Section';

export default function TermsConditions() {
  
  // Set window title to standard compliance heading
  useEffect(() => {
    document.title = "Terms & Conditions - Leon Games";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* 1. Exact Required Navigation Element */}
      <Navigation variant="subpage" label="Terms & Conditions" />

      {/* 2. Scrollable Body container with padding-top offset to avoid navbar overlap */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-8 pb-24 pt-16 md:pt-20">
        
        {/* Premium Page Hero header */}
        <TermsHero />

        {/* Sequential list of detailed legal sections */}
        <div className="space-y-8 mt-12 md:mt-16">
          {termsContent.map((section) => (
            <TermsSection key={section.id} section={section} />
          ))}
        </div>

        {/* Clean compliance footer seal */}
        <footer className="mt-20 pt-8 border-t border-zinc-900 text-center space-y-3">
          <p className="text-xs text-zinc-600">
            Leon Games is a registered trade name of Leon Interactive. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-700">
            Compliance Code: LG-NGR-TERMS-V1
          </p>
        </footer>
      </main>
    </div>
  );
}
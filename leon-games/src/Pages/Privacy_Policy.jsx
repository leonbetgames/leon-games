// pages/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { privacyContent } from '../components/Privacy_Policy/Data';
import { Navigation } from '../components/common/NavBar';
import PrivacyHero from '../components/Privacy_Policy/Header';
import PrivacySection from '../components/Privacy_Policy/Section';

export default function PrivacyPolicy() {
  
  useEffect(() => {
    document.title = "Privacy Policy - Leon Games";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* 1. Exactly required Navigation Element */}
      <Navigation variant="subpage" label="Privacy" />

      {/* 2. Structured Content layout with vertical offsets for fixed Navigation components */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-8 pb-24 pt-16 md:pt-20">
        
        {/* Page Hero */}
        <PrivacyHero />

        {/* Animated Stack of Sections */}
        <div className="space-y-8 mt-12 md:mt-16">
          {privacyContent.map((section) => (
            <PrivacySection key={section.id} section={section} />
          ))}
        </div>

        {/* Footer legal signature */}
        <footer className="mt-20 pt-8 border-t border-zinc-900 text-center space-y-3">
          <p className="text-xs text-zinc-600">
            Leon Games is committed to protecting your personal digital privacy.
          </p>
          <p className="text-[10px] text-zinc-700">
            Compliance Code: LG-NGR-PRIVACY-V1
          </p>
        </footer>
      </main>
    </div>
  );
}
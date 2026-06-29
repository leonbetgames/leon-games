// pages/ResponsibleGaming.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/common/NavBar'; // Adjust relative import paths to match your project setup
import RGHero from '../components/Responsive_Gaming/Header';
import RGCommitment from '../components/Responsive_Gaming/Commitment';
import RGPrinciples from '../components/Responsive_Gaming/Principles';
import RGSignsAndTips from '../components/Responsive_Gaming/SignsAndTips';
import RGTools from '../components/Responsive_Gaming/Tools';
import RGHelpAndFAQ from '../components/Responsive_Gaming/HelpAndFaq';

export default function ResponsibleGaming() {
  
  useEffect(() => {
    document.title = "Responsible Skill Gaming - Leon Games";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* 1. Exactly required Navigation Element */}
      <Navigation variant="subpage" label="Terms" />

      {/* 2. Structured Scroll Layout with top padding offset to clear navbar */}
      <main className="flex-1 w-full pb-24 pt-16 md:pt-20">
        
        {/* Calming, visually pleasant Hero block */}
        <RGHero />

        {/* Leon Games philosophy and commitments */}
        <RGCommitment />

        {/* The 6 main gameplay safety principles */}
        <RGPrinciples />

        {/* Assessment criteria & healthy suggestions checklist */}
        <RGSignsAndTips />

        {/* Interactive account limits details */}
        <RGTools />

        {/* Help resources and 6 responsive FAQ items */}
        <RGHelpAndFAQ />

        {/* Simple trust footer seal */}
        <footer className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 text-center space-y-3">
          <p className="text-xs text-zinc-600">
            Leon Games is committed to offering a reliable, enjoyable, and safe online gaming platform.
          </p>
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-mono">
            Compliance Code: LG-NGR-RG-V1
          </p>
        </footer>

      </main>
    </div>
  );
}
// components/PrivacySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiDatabase, 
  FiSettings, 
  FiLoader, 
  FiLock, 
  FiShare2, 
  FiCalendar, 
  FiUser, 
  FiCheckCircle, 
  FiGlobe, 
  FiRefreshCw, 
  FiMail 
} from 'react-icons/fi';

const sectionIcons = {
  1: FiFileText,
  2: FiDatabase,
  3: FiSettings,
  4: FiLoader,
  5: FiLock,
  6: FiShare2,
  7: FiCalendar,
  8: FiUser,
  9: FiCheckCircle,
  10: FiGlobe,
  11: FiRefreshCw,
  12: FiMail
};

export default function PrivacySection({ section }) {
  const IconComponent = sectionIcons[section.sectionNumber] || FiFileText;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800/80 transition-all duration-300 rounded-2xl p-6 lg:p-10 shadow-xl backdrop-blur-md relative overflow-hidden group"
    >
      {/* Subtle left-side border indicator on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00C853] to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Section Icon Container */}
        <div className="flex items-center gap-3 md:flex-col shrink-0">
          <div className="flex items-center justify-center p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[#00C853] shadow-inner">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs text-zinc-600 font-bold tracking-wider">
            SEC. 0{section.sectionNumber}
          </span>
        </div>

        {/* Legal Text */}
        <div className="flex-1 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {section.title}
          </h2>

          <div className="space-y-4">
            {section.paragraphs.map((p, index) => (
              <p key={index} className="text-sm md:text-base text-zinc-300 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Sub-details rendering */}
          {section.details && section.details.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-900/80">
              {section.details.map((detail, index) => (
                <div key={index} className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-900/50">
                  <h4 className="text-xs font-extrabold uppercase text-zinc-400 tracking-wider mb-1.5">
                    {detail.subtitle}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {detail.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Contact specific information card */}
          {section.contactDetails && (
            <div className="mt-6 p-6 rounded-xl bg-[#00C853]/5 border border-[#00C853]/10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Privacy Support Email</span>
                <p className="text-sm text-white font-mono mt-0.5">{section.contactDetails.email}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Support Phone</span>
                <p className="text-sm text-white font-mono mt-0.5">{section.contactDetails.phone}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Business Address</span>
                <p className="text-sm text-white mt-0.5">{section.contactDetails.address}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Official Website</span>
                <p className="text-sm text-[#00C853] font-mono mt-0.5">{section.contactDetails.website}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
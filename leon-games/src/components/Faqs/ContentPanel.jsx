// components/FAQContent.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiInfo, FiLock, FiAlertTriangle, FiCheck } from 'react-icons/fi';

export default function FAQContent({ faq }) {
  if (!faq) return null;

  return (
    <article 
      role="tabpanel"
      id={`faq-panel-${faq.id}`}
      aria-labelledby={`faq-tab-${faq.id}`}
      className="flex-1 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 lg:p-10 overflow-y-auto h-full space-y-8 scrollbar-thin scrollbar-thumb-zinc-800/60"
    >
      {/* Category Indicator */}
      <div className="flex items-center space-x-2">
        <span className="text-xs font-semibold tracking-wider text-[#00C853] uppercase px-2.5 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/20">
          {faq.category}
        </span>
      </div>

      {/* Title Heading */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
          {faq.question}
        </h1>
        <div className="h-1 w-12 bg-gradient-to-r from-[#00C853] to-emerald-500 mt-4 rounded-full" />
      </div>

      {/* 1. Overview */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
          1. Overview
        </h3>
        <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
          {faq.overview}
        </p>
      </section>

      {/* 2. Detailed Explanation */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
          2. Detailed Explanation
        </h3>
        <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
          {faq.detailedExplanation}
        </p>
      </section>

      {/* 3. Scenarios */}
      {faq.scenarios && faq.scenarios.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
            3. Common Scenarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.scenarios.map((scenario, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all"
              >
                <h4 className="text-sm font-bold text-white mb-1">{scenario.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{scenario.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Tips */}
      {faq.tips && faq.tips.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
            4. Useful Tips
          </h3>
          <ul className="space-y-2.5">
            {faq.tips.map((tip, index) => (
              <li key={index} className="flex items-start text-xs lg:text-sm text-zinc-300 leading-relaxed">
                <span className="flex items-center justify-center p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#00C853] mr-3 mt-0.5">
                  <FiCheck className="w-3.5 h-3.5" />
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Notes & Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {faq.notes && (
          <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <div className="flex items-center space-x-2 mb-2 text-zinc-400">
              <FiInfo className="w-4 h-4 text-sky-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Important Notes</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{faq.notes}</p>
          </div>
        )}

        {faq.bestPractices && faq.bestPractices.length > 0 && (
          <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <div className="flex items-center space-x-2 mb-2 text-zinc-400">
              <FiCheck className="w-4 h-4 text-[#00C853]" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Best Practices</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
              {faq.bestPractices.map((bp, index) => (
                <li key={index} className="leading-relaxed">{bp}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 6. Security (where applicable) */}
      {faq.security && (
        <section className="p-4 rounded-xl bg-[#00C853]/5 border border-[#00C853]/10">
          <div className="flex items-center space-x-2 mb-1.5 text-zinc-300">
            <FiLock className="w-4 h-4 text-[#00C853]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Security Information</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">{faq.security}</p>
        </section>
      )}

      {/* 7. Examples (where applicable) */}
      {faq.examples && faq.examples.length > 0 && (
        <section className="space-y-2">
          <h4 className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
            Examples
          </h4>
          <div className="p-4 bg-zinc-950 border border-zinc-900/80 rounded-xl font-mono text-xs text-zinc-400 leading-relaxed">
            {faq.examples.map((ex, index) => (
              <p key={index}>{ex}</p>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
// components/RGSignsAndTips.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiAlertCircle, FiChevronRight } from 'react-icons/fi';

const signs = [
  "Spending more time or money than originally planned.",
  "Feeling stressed, frustrated, or anxious while playing.",
  "Neglecting work, study, exercise, or family commitments.",
  "Playing with the primary goal of recovering previous losses.",
  "Borrowing money or selling assets to fund your wallet.",
  "Hiding gaming activity or session lengths from family or friends.",
  "Finding it difficult to step away from matches when desired."
];

const healthyTips = [
  "Take a short break every hour to stretch, walk around, and rest your eyes.",
  "Balance gaming with offline hobbies, study, exercise, and spending time with family.",
  "Establish an entertainment budget and stick to it strictly.",
  "Avoid entering matchmaking lobbies when you are feeling upset or highly stressed.",
  "Ensure you get plenty of rest and stay hydrated throughout your sessions.",
  "Keep gaming fun and lighthearted, and step away if it stops being enjoyable."
];

export default function RGSignsAndTips() {
  return (
    <section className="py-20 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Recognize the Signs Checklist */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <FiAlertCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Recognize the Signs</h2>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
            Taking a moment to check in on your gaming habits is a healthy practice. If you recognize any of the following habits in yourself or a loved one, it may be helpful to take a short break:
          </p>
          <ul className="space-y-3.5 pt-2">
            {signs.map((sign, idx) => (
              <li key={idx} className="flex items-start text-xs md:text-sm text-zinc-300">
                <span className="text-rose-500 mr-3 mt-1 shrink-0">•</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Healthy Tips */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FiCheckSquare className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Healthy Gaming Tips</h2>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
            Integrating these simple habits into your routine will help keep your gaming experiences structured, positive, and enjoyable:
          </p>
          <ul className="space-y-3.5 pt-2">
            {healthyTips.map((tip, idx) => (
              <li key={idx} className="flex items-start text-xs md:text-sm text-zinc-300">
                <FiChevronRight className="text-[#00C853] mr-3 mt-1 shrink-0 w-4 h-4" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
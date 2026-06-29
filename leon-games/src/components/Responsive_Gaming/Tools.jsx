// components/RGTools.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiPause, FiCalendar, FiDollarSign, FiClock, FiLock, FiBell } from 'react-icons/fi';

const tools = [
  { icon: FiPause, title: "Pause Account", desc: "Temporarily pause your account access for a short break.", status: "Coming Soon" },
  { icon: FiCalendar, title: "Temporary Break", desc: "Schedule brief breaks from matchmaking queues whenever you need a rest.", status: "Coming Soon" },
  { icon: FiDollarSign, title: "Deposit Limits", desc: "Set weekly or monthly limits on wallet deposits to manage your budget.", status: "Coming Soon" },
  { icon: FiClock, title: "Session Reminders", desc: "Set periodic screen reminders to help keep track of your playtime.", status: "Coming Soon" },
  { icon: FiLock, title: "Self-Exclusion", desc: "Request structured, longer-term exclusions to take an extended break.", status: "Coming Soon" },
  { icon: FiBell, title: "Reality Check alerts", desc: "Receive automated notifications encouraging mindful play habits.", status: "Coming Soon" }
];

export default function RGTools() {
  return (
    <section className="py-20 border-b border-zinc-900 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Self-Control Tools</h2>
          <p className="text-sm md:text-base text-zinc-400">
            We are working on feature options to help you manage your gaming time and balance effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-zinc-950/50 border border-zinc-900/80 relative overflow-hidden group"
            >
              {tool.status && (
                <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 tracking-wider">
                  {tool.status}
                </span>
              )}
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[#00C853] w-fit mb-4">
                <tool.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
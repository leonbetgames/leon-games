// components/RGPrinciples.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiSmile, FiActivity, FiArrowRightCircle, FiShield } from 'react-icons/fi';

const principles = [
  {
    icon: FiClock,
    title: "Set Time Limits",
    desc: "Decide on a clear play duration before starting your match and stick to it, ensuring you make time for other important daily tasks.",
    accent: "group-hover:border-[#00C853]/30"
  },
  {
    icon: FiDollarSign,
    title: "Set Spending Limits",
    desc: "Establish a clear entertainment budget and avoid playing with funds that are designated for essential living expenses.",
    accent: "group-hover:border-emerald-500/30"
  },
  {
    icon: FiSmile,
    title: "Play for Entertainment",
    desc: "Treat matchmaking as a fun way to relax and test your skills, rather than as a realistic way to earn money.",
    accent: "group-hover:border-blue-500/30"
  },
  {
    icon: FiActivity,
    title: "Stay in Control",
    desc: "Pay attention to your emotional state. If you find yourself feeling frustrated, take a step back and log off for the day.",
    accent: "group-hover:border-purple-500/30"
  },
  {
    icon: FiArrowRightCircle,
    title: "Never Chase Losses",
    desc: "Understand that losing is a natural part of gaming. Trying to win back lost funds immediately often leads to emotional decisions.",
    accent: "group-hover:border-rose-500/30"
  },
  {
    icon: FiShield,
    title: "Avoid Impaired Play",
    desc: "Only enter competitive matches when you are clear-headed and fully focused, ensuring you can make rational choices.",
    accent: "group-hover:border-indigo-500/30"
  }
];

export default function RGPrinciples() {
  return (
    <section className="py-20 border-b border-zinc-900 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Our Play Responsibly Principles</h2>
          <p className="text-sm md:text-base text-zinc-400">
            Consider these helpful core rules to keep your gaming experiences positive, balanced, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((pr, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`p-6 rounded-2xl bg-zinc-950/50 border border-zinc-900 transition-all duration-300 group ${pr.accent}`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[#00C853]">
                  <pr.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{pr.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{pr.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
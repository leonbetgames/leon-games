// components/RGCommitment.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiSmile, FiUsers } from 'react-icons/fi';

const commitments = [
  {
    icon: FiShield,
    title: "Fair Play",
    color: "group-hover:text-[#00C853]",
    desc: "We are committed to absolute fairness, operating with certified RNG parameters and skill-balanced matchmaking loops."
  },
  {
    icon: FiLock,
    title: "Secure Platform",
    color: "group-hover:text-blue-400",
    desc: "Your transaction details, account balance records, and login profiles are protected by industry-standard encryption standards."
  },
  {
    icon: FiSmile,
    title: "Entertainment First",
    color: "group-hover:text-purple-400",
    desc: "We encourage players to view skill gaming as an enjoyable hobby, rather than as a secondary source of income."
  },
  {
    icon: FiUsers,
    title: "Player Support",
    color: "group-hover:text-emerald-400",
    desc: "Our supportive systems are staffed round-the-clock to guide, assist, and help you maintain healthy gaming habits."
  }
];

export default function RGCommitment() {
  return (
    <section id="our-commitment" className="py-20 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Our Commitment to You</h2>
          <p className="text-sm md:text-base text-zinc-400">
            Leon Games is designed to prioritize player protection and system integrity, ensuring you can play in a reliable and safe environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 group"
            >
              <div className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit text-zinc-400 transition-colors duration-300 ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mt-4 mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
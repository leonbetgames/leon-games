// components/RGHelpAndFAQ.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMail, FiPhone, FiInfo } from 'react-icons/fi';
import { TrustIllustration } from './Illustrations';
import { GreenButton, BlackButton } from '../common/AnimatedButton';

const faqs = [
  {
    question: "What is responsible gaming?",
    answer: "Responsible gaming means enjoying online games and matchmaking activities in a balanced way, treating them as a form of entertainment rather than as a primary source of income or financial relief. It involves setting appropriate limits on both your playtime and spending, and keeping a healthy balance with your offline life."
  },
  {
    question: "Why is responsible gaming important?",
    answer: "It ensures that online gaming remains a positive, safe, and stress-free activity for everyone. By keeping an eye on your gaming habits, you protect your personal well-being, support healthy relationships, and keep your gaming experiences fun and balanced."
  },
  {
    question: "How can I manage my gaming time effectively?",
    answer: "A great approach is to decide on a clear play duration before you begin a gaming session and use your phone or computer to set alarm reminders. We also suggest taking regular breaks to stand up, stretch, and step away from your screen."
  },
  {
    question: "Can I temporarily disable my account?",
    answer: "Yes, you can temporarily pause your account access. While our automated, self-service pause and exclusion tools are currently in development, our support team is available 24/7 to help you temporarily secure your profile and pause access whenever you need a break."
  },
  {
    question: "What should I do if my gaming habits feel unhealthy?",
    answer: "Recognizing that you need a break is a very positive and responsible step. We recommend taking an immediate pause, setting offline limits, and discussing your concerns with trusted friends, family members, or professional support groups who can offer helpful guidance."
  },
  {
    question: "How can I contact Leon Games support?",
    answer: "Our support team is available round-the-clock to assist you. You can start a conversation anytime through our 24/7 Live Chat feature on the platform, or email us directly at support@leongames.com for helpful and personal guidance."
  }
];

export default function RGHelpAndFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 space-y-16">
      
      {/* 1. Need Help Support Callout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-zinc-950/20 to-zinc-950/40 border border-zinc-900/80 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent -z-10" />
        
        <TrustIllustration />
        
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Need Someone to Talk To?</h2>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
            If gaming ever stops being enjoyable or begins affecting your daily life, we encourage you to seek support. Taking a break is a positive step, and our team is always available to help answer questions and guide you toward helpful resources.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <GreenButton as="a" href="mailto:support@leongames.com">
            <FiMail className="w-4 h-4" /> Contact Support
          </GreenButton>
          <BlackButton>
            <FiPhone className="w-4 h-4" /> Visit Support Center
          </BlackButton>
        </div>
      </motion.div>

      {/* 2. FAQ Accordions */}
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs md:text-sm text-zinc-500">
            Find quick answers regarding our player-first policies and self-help options.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-zinc-900 bg-zinc-950/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-zinc-900/30 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs md:text-sm font-bold pr-4">{faq.question}</span>
                  <FiChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00C853]' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 border-t border-zinc-900/50 text-xs md:text-sm text-zinc-400 leading-relaxed bg-zinc-950/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
// pages/SupportPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiMessageCircle, FiPhone, FiCompass, FiSend, 
  FiChevronDown, FiClock, FiCheckSquare, FiAward, FiActivity, FiUsers 
} from 'react-icons/fi';
import { Navigation } from '../components/common/NavBar';
import SupportIllustration from '../components/Support/Illustration';
import SmartHelpModal from '../components/Support/SmartHelpModal';
import Footer from '../components/common/Footer';
import { GreenButton, BlackButton } from '../components/common/AnimatedButton';
import CommunityLinks from '../components/Support/CommunityLinks';
import Logo from '../assets/images/logo.png';

// Static FAQs
const faqs = [
  { q: "How long do withdrawals take?", a: "Withdrawals are reviewed manually by security staff and typically clear within 1 to 4 hours. Depending on bank-side delays, some requests can take up to 24 hours to post." },
  { q: "How do I reset my password?", a: "Simply click 'Forgot Password' on our login screen. An instant secure account recovery email containing reset instructions will be delivered to your verified inbox." },
  { q: "Why is my deposit pending?", a: "Pending deposits occur during bank processing delays or transaction reconciliations with merchant gateways. Please allow 15 minutes before opening a support request." },
];

const phrases = [
  'Need help? We\'re here.',
  'Search our knowledge base.',
  'Report an issue.',
  'Track your support tickets.',
  'Ask our support team.',
  'Let\'s solve it together.'
];

export default function SupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [displayText, setDisplayText] = useState('');
  
  // Direct Contact Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    document.title = "Support Center - Leon Games";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let mounted = true;
    let timeoutId;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      if (!mounted) return;

      const fullText = phrases[phraseIndex];

      if (!isDeleting) {
        charIndex += 1;
        setDisplayText(fullText.slice(0, charIndex));

        if (charIndex === fullText.length) {
          timeoutId = window.setTimeout(() => {
            isDeleting = true;
            tick();
          }, 1200);
          return;
        }
      } else {
        charIndex -= 1;
        setDisplayText(fullText.slice(0, charIndex));

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      timeoutId = window.setTimeout(tick, isDeleting ? 35 : 55);
    };

    tick();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (firstName && email && message) {
      setFormSuccess(true);
    }
  };

  const handleFormReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setFormSuccess(false);
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* 1. Exactly requested Navigation Element */}
      <Navigation variant="subpage" label="Support" />

      {/* Main body content container with spacer to avoid nav overlap */}
      <main className="flex-1 w-full pb-24 pt-16 md:pt-20">

        {/* 2. Hero Section */}
        <section className="relative w-full py-16 border-b border-zinc-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#00C853]/5 via-transparent to-transparent -z-10" />
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-left"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-[#00C853] bg-[#00C853]/10 px-3.5 py-1.5 rounded-full border border-[#00C853]/20 mb-5 inline-block">
                24/7 Player Assistance
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-[#00C853] drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                💬 Support Center
              </h1>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
                🛠️ Whether you need help with your account, payments, gameplay, or technical issues, we're here to help. Browse common solutions, contact us directly, or send us a support request. ✨
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <GreenButton onClick={scrollToForm} className="w-auto">
                  Contact Us
                </GreenButton>
                <BlackButton onClick={() => setIsModalOpen(true)} className="w-auto">
                  Open Smart Help
                </BlackButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[460px] relative">
                <div className="absolute top-3 left-100 -translate-x-1/2 w-[85%] sm:w-3/4 bg-black/75 backdrop-blur-lg px-5 py-3 rounded-xl border border-zinc-800/80 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between" style={{ transform: 'rotate(-3deg) translate(-50%, 0)' }}>
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
                    <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Status</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono tracking-wide">
                    {displayText}
                    <span className="inline-block w-[2px] h-4 bg-[#00C853] ml-1 align-middle animate-pulse" />
                  </div>
                </div>
                <SupportIllustration />
                <div className="absolute bottom-0 left-100 -translate-x-1/2 w-[85%] sm:w-3/4 bg-black/75 backdrop-blur-lg px-5 py-3 rounded-xl border border-zinc-800/80 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between" style={{ transform: 'rotate(4deg) translate(-50%, 0)' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-lg bg-zinc-900 border border-zinc-800">
                      <img src={Logo} alt="Leon Games logo" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="text-xs font-black tracking-widest text-white uppercase">
                      Leon Games
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#00C853] uppercase bg-[#00C853]/10 px-2 py-0.5 rounded border border-[#00C853]/20">
                    Support Ready
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Contact Methods Cards Grid */}
        <section className="py-16 border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">Direct Contact Channels</h2>
              <p className="text-sm text-zinc-500">Reach our team directly across platforms for speedy, personalized resolutions.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              
              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/23480000000" 
                target="_blank" 
                rel="noreferrer"
                className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-[#00C853]/40 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 w-fit mb-4 group-hover:bg-[#00C853]/10">
                    <FiMessageCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">WhatsApp</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">Perfect for quick, fast questions and direct wallet balance validations.</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                    +234 800 000 00
                  </span>
                </div>
              </a>

              {/* Telegram Community */}
              <a 
                href="https://t.me/leongames" 
                target="_blank" 
                rel="noreferrer"
                className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-blue-500/40 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400 w-fit mb-4 group-hover:bg-blue-500/10">
                    <FiCompass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Telegram Community</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">Follow general announcements, updates, maintenance intervals, and weekly bonuses.</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full border border-blue-400/20">
                    @leongames
                  </span>
                </div>
              </a>

              {/* Email Address */}
              <a 
                href="mailto:support@leongames.com"
                className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-purple-500/40 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-purple-400 w-fit mb-4 group-hover:bg-purple-500/10">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Email Address</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">For comprehensive accounts reviews, business queries, or direct corporate feedback.</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400 bg-purple-400/10 px-3 py-1.5 rounded-full border border-purple-400/20">
                    support@leongames.com
                  </span>
                </div>
              </a>

              {/* SMS Text Messaging */}
              <a 
                href="sms:+23480000000?body=Leon%20Games%20Support"
                className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-indigo-500/40 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-indigo-400 w-fit mb-4 group-hover:bg-indigo-500/10">
                    <FiSend className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">SMS Message</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">Contact us via offline texts if you are experiencing network data connection issues.</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-full border border-indigo-400/20">
                    +234 800 000 00
                  </span>
                </div>
              </a>

              {/* Direct Phone Call */}
              <a 
                href="tel:+23480000000"
                className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-[#00C853]/40 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[#00C853] w-fit mb-4 group-hover:bg-[#00C853]/10">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Phone Call</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">Call us directly during working business hours for high-priority assistance.</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00C853] bg-[#00C853]/10 px-3 py-1.5 rounded-full border border-[#00C853]/20">
                    +234 800 000 00
                  </span>
                </div>
              </a>

            </div>
          </div>
        </section>

        {/* 4. Support Statistics Counters */}
        <section className="py-16 border-b border-zinc-900 bg-zinc-950/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#00C853]">95%</span>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Customer Satisfaction</p>
            </div>
            <div className="text-center space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-blue-400">24 Hours</span>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Average Email Response</p>
            </div>
            <div className="text-center space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-purple-400">10,000+</span>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Requests Resolved</p>
            </div>
            <div className="text-center space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#00C853]">7 Days</span>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Weekly Community Updates</p>
            </div>
          </div>
        </section>

        {/* 5. Business Hours & Guided help CTA banner */}
        <section className="py-16 border-b border-zinc-900 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Business Hours Info Card */}
          <div className="p-8 rounded-3xl bg-zinc-950/40 border border-zinc-900 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="p-2 w-fit rounded bg-blue-500/10 text-blue-400 mb-2">
                <FiClock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Support Operating Hours</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Our specialized helpdesk agents monitor direct lines and chat queues actively throughout the week.</p>
            </div>
            <div className="py-4 border-t border-b border-zinc-900 space-y-1">
              <p className="text-sm text-zinc-300 font-semibold">Monday – Sunday</p>
              <p className="text-2xl font-black text-white">8:00 AM – 10:00 PM</p>
            </div>
            <p className="text-[10px] text-zinc-600 italic">Messages sent outside operational slots are logged safely and handled in chronological order early next morning.</p>
          </div>

          {/* Smart Assistant Callout Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/20 via-zinc-950/40 to-zinc-950/60 border border-zinc-900 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="p-2 w-fit rounded bg-[#00C853]/10 text-[#00C853] mb-2">
                <FiCheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Try Our Guided Smart Help</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Solve your questions without waiting for an available representative. Our step-by-step assistant troubleshoots deposits, gameplay, accounts, and payouts immediately.</p>
            </div>
            <GreenButton onClick={() => setIsModalOpen(true)} className="w-auto">
              Launch Guided Assistant
            </GreenButton>
          </div>

        </section>

        {/* 6. Direct Contact Ticket Form Section */}
        <section id="contact-form" className="py-20 border-b border-zinc-900 max-w-3xl mx-auto px-6">
          <div className="p-8 lg:p-12 rounded-3xl bg-zinc-950/40 border border-zinc-900 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">Still Need Help?</h2>
              <p className="text-xs md:text-sm text-zinc-500">If you couldn't resolve your inquiry using the Smart Help Assistant, drop us a direct support ticket below.</p>
            </div>

            <AnimatePresence mode="wait">
              {!formSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">First Name</label>
                      <input 
                        type="text" 
                        required 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#00C853] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Last Name</label>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#00C853] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#00C853] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234"
                        className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#00C853] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Support Category</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#00C853] transition-colors appearance-none"
                    >
                      <option value="Account Issues">Account Issues</option>
                      <option value="Withdrawal Issues">Withdrawal Issues</option>
                      <option value="Deposit Issues">Deposit Issues</option>
                      <option value="Gameplay">Gameplay</option>
                      <option value="Bonuses">Bonuses</option>
                      <option value="Technical Problem">Technical Problem</option>
                      <option value="Bug Report">Bug Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Your Message</label>
                    <textarea 
                      rows={5} 
                      required 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please details your request..."
                      className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#00C853] transition-colors resize-none"
                    />
                  </div>

                  {/* Attachment optional upload UI template placeholder */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Attachment (Optional)</label>
                    <div className="p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20 text-center cursor-pointer hover:border-zinc-700 transition-colors">
                      <span className="text-xs text-zinc-500">Click to upload files (PNG, JPG, PDF)</span>
                    </div>
                  </div>

                  <GreenButton type="submit" className="w-full">
                    Send Support Request
                  </GreenButton>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center mx-auto text-[#00C853]">
                    <FiSend className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Support Request Sent</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting us, {firstName}. Your reference ticket was successfully generated. We will reply to your registered email shortly.
                    </p>
                  </div>
                  <BlackButton onClick={handleFormReset} className="mt-2">
                    Send Another Message
                  </BlackButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 7. FAQ Preview Accordions */}
        <section className="py-20 max-w-3xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">FAQ Preview</h2>
            <p className="text-xs text-zinc-500">Read immediate, simplified answers to standard questions.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-zinc-900 bg-zinc-950/35 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left text-white focus:outline-none"
                  >
                    <span className="text-xs md:text-sm font-semibold">{faq.q}</span>
                    <FiChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180 text-[#00C853]' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 pt-0 text-xs text-zinc-400 border-t border-zinc-900 bg-zinc-950/50 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <GreenButton onClick={scrollToForm} className="mt-5">
              View All FAQs
            </GreenButton>
          </div>
        </section>

        <CommunityLinks />  

        

      </main>

      {/* 9. Smart Help Assistant overlay modal */}
      <SmartHelpModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Footer />
    </div>
  );
}
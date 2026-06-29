// components/SmartHelpModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { smartHelpData } from './SmartHelpData';

export default function SmartHelpModal({ isOpen, onClose }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [resolutionReached, setResolutionReached] = useState(null); // 'yes' or 'no'
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Escalation ticket inputs
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');

  const resetAssistant = () => {
    setSelectedCat(null);
    setSelectedOption(null);
    setResolutionReached(null);
    setIsSubmitted(false);
    setEmail('');
    setPhone('');
    setDesc('');
  };

  const handleEscalationSubmit = (e) => {
    e.preventDefault();
    if (email && phone) {
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black backdrop-blur-sm"
        />

        {/* Modal panel wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#0a0a0c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              {(selectedCat || selectedOption) && (
                <button 
                  onClick={() => {
                    if (selectedOption) {
                      setSelectedOption(null);
                      setResolutionReached(null);
                    } else {
                      setSelectedCat(null);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" />
                </button>
              )}
              <h3 className="font-bold text-white text-base">Smart Help Assistant</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Dynamic Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Step 1: Category Selection */}
            {!selectedCat && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-400">What do you need help with today?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(smartHelpData).map((key) => {
                    const cat = smartHelpData[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCat(key)}
                        className="w-full p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:border-[#00C853]/40 text-left transition-all duration-200 text-sm font-semibold text-white focus:outline-none focus:border-[#00C853]"
                      >
                        {cat.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Issue Specific options */}
            {selectedCat && !selectedOption && (
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold text-[#00C853] tracking-widest bg-[#00C853]/10 px-2 py-0.5 rounded">
                  {smartHelpData[selectedCat].title}
                </span>
                <p className="text-sm text-zinc-400">Choose the option that describes your issue:</p>
                <div className="space-y-2">
                  {smartHelpData[selectedCat].options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOption(opt)}
                      className="w-full p-3 rounded-lg border border-zinc-900 bg-zinc-900/30 hover:border-zinc-700 text-left transition-colors text-xs text-zinc-300"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Resolution & Troubleshooting Explanation */}
            {selectedOption && !isSubmitted && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#00C853] tracking-widest bg-[#00C853]/10 px-2 py-0.5 rounded">
                    Resolution Step
                  </span>
                  <h4 className="font-bold text-white text-sm">{selectedOption.label}</h4>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 leading-relaxed space-y-4">
                  <p>{selectedOption.solution}</p>
                </div>

                {resolutionReached === null && (
                  <div className="space-y-3 pt-2 text-center border-t border-zinc-900">
                    <p className="text-xs text-zinc-400">Did this solve your problem?</p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setResolutionReached('yes')}
                        className="px-4 py-2 rounded-lg bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] text-xs font-bold hover:bg-[#00C853] hover:text-black transition-all duration-200"
                      >
                        ✅ Yes, it did
                      </button>
                      <button
                        onClick={() => setResolutionReached('no')}
                        className="px-4 py-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all duration-200"
                      >
                        ❌ No, I still need help
                      </button>
                    </div>
                  </div>
                )}

                {/* Resolution Reached = YES */}
                {resolutionReached === 'yes' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-[#00C853]/5 border border-[#00C853]/20 text-center space-y-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00C853]/20 flex items-center justify-center mx-auto text-[#00C853]">
                      <FiCheck className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-white text-sm">Great! We're happy we could help.</h5>
                    <button 
                      onClick={onClose}
                      className="text-xs text-zinc-400 hover:text-white underline mt-1"
                    >
                      Close assistant
                    </button>
                  </motion.div>
                )}

                {/* Resolution Reached = NO -> Escalation Form */}
                {resolutionReached === 'no' && (
                  <motion.form 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleEscalationSubmit}
                    className="space-y-4 pt-4 border-t border-zinc-900"
                  >
                    <div className="flex items-center space-x-2 text-amber-500 mb-2">
                      <FiAlertCircle className="w-4 h-4" />
                      <span className="text-xs font-bold">Escalate to Support Request</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00C853]"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00C853]"
                          placeholder="+234"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Describe your issue</label>
                      <textarea
                        rows={3}
                        required
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00C853]"
                        placeholder="Please provide any relevant details..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#00C853] text-black font-semibold text-xs hover:bg-[#00b24a] transition-all"
                    >
                      Submit Support Request
                    </button>
                  </motion.form>
                )}
              </div>
            )}

            {/* Step 4: Submission Success */}
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#00C853]/20 flex items-center justify-center mx-auto text-[#00C853]">
                  <FiCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">Request Submitted Successfully</h4>
                  <p className="text-xs text-zinc-500">Your ticket has been logged. Our support team will respond via email shortly.</p>
                </div>
                <button
                  onClick={() => {
                    resetAssistant();
                    onClose();
                  }}
                  className="px-5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  Close Assistant
                </button>
              </motion.div>
            )}

          </div>

          {/* Reset / Go Back Button */}
          {(selectedCat || selectedOption) && !isSubmitted && (
            <div className="p-4 border-t border-zinc-900 bg-zinc-950/60 flex justify-start shrink-0">
              <button 
                onClick={resetAssistant}
                className="text-xs text-zinc-500 hover:text-zinc-300 focus:outline-none"
              >
                Reset Assistant and Start Over
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
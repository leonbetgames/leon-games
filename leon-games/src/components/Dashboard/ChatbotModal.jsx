import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Clock, Sparkles } from "lucide-react";

export function ChatbotModal({ triggerToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "⚡ Welcome to Leon Games! I am Leon AI, your live peer node assistant. How can I help you dominate the arena today?", time: "Just now" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  // Auto-scroll chat window when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Contextual bot matching response logic
  const getBotResponse = (text) => {
    const q = text.toLowerCase();
    if (q.includes("deposit") || q.includes("fund") || q.includes("paystack")) {
      return "💳 To deposit, tap the '+ DEPOSIT' button in the top header. Enter any NGN amount above ₦100 to instantly top up your wallet via Paystack secure checkout.";
    }
    if (q.includes("withdraw") || q.includes("payout") || q.includes("cashout")) {
      return "💸 To withdraw your earnings, tap on your profile avatar (😡) in the top-right corner, then click 'WITHDRAW'. Settlements process directly back to your local bank account in under 5 minutes.";
    }
    if (q.includes("game") || q.includes("rps") || q.includes("play")) {
      return "⚔️ We support 5 mathematical skill games: Rock Paper Scissors, Penalty Shootout, Reaction Speed, Tic Tac Toe, and Number Prediction. They are 100% deterministic with zero house edge.";
    }
    if (q.includes("rake") || q.includes("fee") || q.includes("reward")) {
      return "🎁 Matches operate on a double-your-money format. If you win, you claim the total pot minus a minor 5% platform fee (rake) used to verify matching node consensus.";
    }
    return "🤖 System node processing... I understand your query. For immediate live assistance, you can also launch a direct human ticket under 'Settings' > 'Help & Support' or consult our Telegram group.";
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Append User Message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate Network Latency + Bot Response
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(textToSend),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <>
      {/* --- 1. FLOATING CIRCULAR BALL BUTTON (BOTTOM-RIGHT) --- */}
      <div className="fixed bottom-24 lg:bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-neutral-950 flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,0.3)] cursor-pointer outline-none border border-emerald-400/30 group"
          aria-label="Toggle Live Chatbot"
        >
          {/* Subtle outer pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75 pointer-events-none" />
          
          <MessageSquare size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* --- 2. MODAL OVERLAY & CENTERED CONTAINER --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Central Animated Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#0A0A0A] border border-white/[0.08] rounded-3xl max-w-md w-full h-[450px] relative z-10 shadow-2xl flex flex-col overflow-hidden"
            >
              
              {/* Header Panel */}
              <div className="p-4 border-b border-white/[0.04] flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Bot size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-widest text-neutral-100 uppercase">
                      Leon AI Assistant
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                        Support Online
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Chat Message Workspace */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-emerald-500 text-neutral-950 font-semibold rounded-tr-none"
                          : "bg-white/[0.02] border border-white/[0.04] text-neutral-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[8px] font-mono text-neutral-600 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}

                {/* Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex flex-col max-w-[85%] mr-auto items-start">
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] rounded-tl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Action Assistance Chips */}
              <div className="px-4 py-2 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-white/[0.02] bg-black/10">
                {[
                  { label: "💳 How to Deposit", q: "how to deposit" },
                  { label: "💸 Request Payout", q: "how to withdraw" },
                  { label: "⚔️ Game Rules", q: "game modes rules" }
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.q)}
                    className="px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] text-[9px] font-mono text-neutral-400 hover:text-white hover:border-white/[0.12] transition-colors cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Input Interface */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="p-4 border-t border-white/[0.04] bg-neutral-950 flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask Leon AI a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl px-4 py-2.5 text-xs outline-none text-white placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-neutral-950 transition-all cursor-pointer flex items-center justify-center shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
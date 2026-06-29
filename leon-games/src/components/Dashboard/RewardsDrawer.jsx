import React from "react";
import { motion } from "framer-motion";
import { 
  X, 
  Award, 
  Sparkles, 
  Coins, 
  Calendar, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Gift
} from "lucide-react";

export function RewardsDrawer({ 
  isOpen, 
  onClose, 
  rewards, 
  totalRewardsClaimed = 3450.00 
}) {
  return (
    <>
      {/* 1. DIM BACKDROP OVERLAY */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* 2. SLIDE-IN PANEL */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          className="fixed top-0 right-0 z-50 h-full w-full sm:max-w-md bg-[#0A0A0A] border-l border-white/[0.06] shadow-2xl flex flex-col"
        >
          {/* Header Panel */}
          <div className="p-4 md:p-6 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Responsive Back Button for Mobile */}
              <button
                onClick={onClose}
                className="p-2 -ml-2 rounded-lg hover:bg-white/[0.02] text-neutral-400 hover:text-white transition-colors cursor-pointer sm:hidden"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Award className="text-cyan-400" size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-neutral-200 uppercase">
                    My Rewards
                  </h3>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase">
                    LOYALTY & BONUS HUB
                  </p>
                </div>
              </div>
            </div>

            {/* Close button for Desktop */}
            <button
              onClick={onClose}
              className="hidden sm:flex p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
              aria-label="Close rewards"
            >
              <X size={16} />
            </button>
          </div>

          {/* Core Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-transparent">
            
            {/* LIFTTIME EARNINGS HERO STAT CARD */}
            <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.01] rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-3">
                <Coins size={14} className="text-cyan-400" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                  Total Rewards Received
                </span>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-black text-white">
                  ₦{totalRewardsClaimed.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  +12.4% Loyalty Boost
                </span>
              </div>
            </div>

            {/* REWARDS LEDGER SECTION */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold block mb-1">
                Recent Ledger Transactions
              </span>

              <div className="space-y-2.5">
                {rewards.map((reward) => (
                  <div 
                    key={reward.id}
                    className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between gap-4 hover:border-white/[0.08] transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/[0.04] flex items-center justify-center shrink-0">
                        {reward.status === "claimed" ? (
                          <Gift size={16} className="text-emerald-400" />
                        ) : (
                          <Sparkles size={16} className="text-cyan-400 animate-pulse" />
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-200 truncate">
                          {reward.title}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Calendar size={10} className="text-neutral-600" />
                          <span className="text-[10px] font-mono text-neutral-500">
                            {reward.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-xs font-mono font-black block ${
                        reward.status === "claimed" ? "text-emerald-400" : "text-cyan-400"
                      }`}>
                        {reward.value}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block mt-0.5">
                        {reward.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Informational Action at bottom of drawer */}
          <div className="p-4 border-t border-white/[0.04] bg-[#050505]/40 text-center">
            <p className="text-[10px] text-neutral-500 font-light max-w-xs mx-auto">
              Earn additional rewards by joining public match events or claiming top leaderboards ranks weekly.
            </p>
          </div>

        </motion.div>
      )}
    </>
  );
}
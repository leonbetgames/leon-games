import React, { useState, useRef, useEffect } from "react";
import { 
  Eye, 
  EyeOff, 
  Plus, 
  Bell, 
  Award, 
  X, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Coins 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from '../../assets/images/logo.png';
import { LeonLogo } from "../common/logo";

export function GlobalHeader({
  livePlayers = 942,
  balance = 12450.00,
  isBalanceVisible = true,
  setIsBalanceVisible,
  setIsDepositModalOpen,
  unreadCount = 0,          // <-- Added
  onToggleNotifications    // <-- Added
}) {
  const [showRewards, setShowRewards] = useState(false);

  const rewardsRef = useRef(null);

 useEffect(() => {
  function handleClickOutside(event) {
    // Removed notificationsRef check to prevent errors
    if (rewardsRef.current && !rewardsRef.current.contains(event.target)) {
      setShowRewards(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);



  // Mock Rewards Data
  const rewards = [
    { id: 1, title: "Daily Check-in", description: "Claimed ₦50.00 loyalty boost", status: "claimed", value: "+₦50" },
    { id: 2, title: "Active Duelist", description: "Complete 5 Matches today to unlock", status: "progress", value: "3/5 done" },
    { id: 3, title: "Referral Bonus", description: "Pending partner match resolution", status: "pending", value: "₦500 pending" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04] px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand & Connection Status */}
        <div className="flex items-center gap-3">
          {/* Custom logo.png with standard fallback */}
          <LeonLogo size={40}/>

          {/* Collapses completely on small screens */}
          <div className="hidden sm:block">
            <h1 className="text-sm font-black tracking-widest uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              L. Games
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                {livePlayers} Players Active
              </span>
            </div>
          </div>
        </div>

        {/* Action Widgets, Notifications, Rewards & Wallet */}
        <div className="flex items-center gap-3">
          
          {/* REWARDS UTILITY TRIGGER */}
          <div className="relative" ref={rewardsRef}>
            <button
              onClick={() => {
                setShowRewards(!showRewards);
                setShowNotifications(false);
              }}
              className={`p-2 rounded-xl bg-[#0A0A0A] border transition-all cursor-pointer ${
                showRewards ? "border-cyan-500/40 text-cyan-400" : "border-white/[0.06] text-neutral-400 hover:text-white"
              }`}
              aria-label="Loyalty Rewards"
            >
              <Award size={16} />
            </button>

            {/* Rewards Popover Menu */}
            <AnimatePresence>
              {showRewards && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2.5 w-72 bg-[#0A0A0A] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.8)] rounded-2xl p-4 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.04] mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                      ACTIVE REWARDS
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                      <Sparkles size={10} /> LOYALTY HUB
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {rewards.map((reward) => (
                      <div key={reward.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-neutral-200 truncate">{reward.title}</h4>
                          <p className="text-[10px] text-neutral-500 leading-normal truncate">{reward.description}</p>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                          reward.status === "claimed" ? "bg-emerald-500/10 text-emerald-400" :
                          reward.status === "progress" ? "bg-cyan-500/10 text-cyan-400" :
                          "bg-neutral-800 text-neutral-400"
                        }`}>
                          {reward.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NOTIFICATIONS TRIGGER (Wires to Slide-In Drawer) */}
<button
  onClick={onToggleNotifications}
  className="p-2 rounded-xl bg-[#0A0A0A] border border-white/[0.06] text-neutral-400 hover:text-white hover:border-white/[0.12] transition-all cursor-pointer relative"
  aria-label="Toggle Alert Center"
>
  <Bell size={16} />
  {unreadCount > 0 && (
    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
  )}
</button>

          {/* Wallet Interface (SportyBet Inspired Display) */}
          <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-3 py-1.5 flex items-center gap-3.5 select-none">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest leading-none mb-0.5">
                MAIN WALLET
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-black text-emerald-400">
                  {isBalanceVisible ? `₦${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "••••••"}
                </span>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  aria-label="Toggle Balance Visibility"
                >
                  {isBalanceVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#050505] font-extrabold text-[11px] px-2 py-1.5 rounded-lg transition-all shadow-[0_2px_10px_rgba(34,197,94,0.25)] flex items-center justify-center gap-1 cursor-pointer sm:px-2.5"
            >
              <Plus size={12} strokeWidth={3} />
              <span className="hidden sm:inline">DEPOSIT</span>
            </button>
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 border-l border-white/[0.06] pl-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-neutral-950 border border-white/[0.08] flex items-center justify-center text-base font-bold text-cyan-400">
              😡
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
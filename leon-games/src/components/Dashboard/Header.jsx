import React from "react";
import { 
  Eye, 
  EyeOff, 
  Plus, 
  Bell, 
  Award 
} from "lucide-react";
import { LeonLogo } from "../common/logo";

export function GlobalHeader({
  livePlayers = 942,
  balance = 12450.00,
  isBalanceVisible = true,
  setIsBalanceVisible,
  setIsDepositModalOpen,
  unreadCount = 0,
  onToggleNotifications, // Triggers slide-in notifications
  onToggleRewards,       // Triggers slide-in rewards
  onToggleProfile        // Triggers slide-in profile details
}) {

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04] px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand & Connection Status */}
        <div className="flex items-center gap-3">
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
          
          {/* REWARDS SLIDE-IN TRIGGER 
          <button
            onClick={onToggleRewards}
            className="p-2 rounded-xl bg-[#0A0A0A] border border-white/[0.06] text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all cursor-pointer"
            aria-label="Open Rewards Manager"
          >
            <Award size={16} />
          </button>
          */}

          {/* NOTIFICATIONS SLIDE-IN TRIGGER */}
          <button
            onClick={onToggleNotifications}
            className="p-2 rounded-xl bg-[#0A0A0A] border border-white/[0.06] text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/20 transition-all cursor-pointer relative"
            aria-label="Open Alert Center"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            )}
          </button>

          {/* Wallet Interface */}
          <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-3 py-1.5 flex items-center gap-3.5 select-none font-sans">
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

          {/* USER PROFILE AVATAR SLIDE-IN TRIGGER */}
          <button
            onClick={onToggleProfile}
            className="flex items-center gap-2 border-l border-white/[0.06] pl-3 flex-shrink-0 cursor-pointer"
            aria-label="Open Profile Panel"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-950 border border-white/[0.08] flex items-center justify-center text-base font-bold text-cyan-400">
              😡
            </div>
          </button>

        </div>

      </div>
    </header>
  );
}
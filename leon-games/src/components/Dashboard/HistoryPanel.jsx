import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sword, 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Gift, 
  RefreshCw, 
  CheckCircle2, 
  Calendar, 
  Clock,
  Sparkles,
  Inbox
} from "lucide-react";

// --- MOCK TRANSACTION HISTORY DATABASE WITH COMPREHENSIVE TIMESTAMPS ---
const MOCK_TRANSACTIONS = [
  { id: "TX-9021", type: "deposit", description: "Direct main wallet load via Paystack secure gateway", amount: 2000, status: "completed", date: "Monday, June 29, 2026 at 1:12 PM" },
  { id: "TX-8831", type: "withdrawal", description: "Standard withdrawal request bank settlement", amount: -5000, status: "completed", date: "Sunday, June 28, 2026 at 4:21 PM" },
  { id: "TX-4412", type: "reward", description: "Weekly Silver level tier reward payout multiplier", amount: 250, status: "completed", date: "Sunday, June 28, 2026 at 8:05 AM" },
  { id: "TX-3129", type: "special", description: "Draw replay refund - Room match ID: #LOB-9021", amount: 1000, status: "completed", date: "Thursday, June 25, 2026 at 11:42 AM" },
  { id: "TX-2109", type: "reward", description: "Referral bonus payout - Match victory Amaka_P", amount: 500, status: "completed", date: "Wednesday, June 24, 2026 at 3:15 PM" },
  { id: "TX-1102", type: "withdrawal", description: "Standard withdrawal request bank settlement", amount: -1500, status: "pending", date: "Monday, June 22, 2026 at 9:10 AM" },
  { id: "TX-0921", type: "deposit", description: "Direct main wallet load via Card checkout", amount: 5000, status: "completed", date: "Saturday, June 20, 2026 at 6:45 PM" }
];

export function HistoryPanel({ duelHistory = [] }) {
  // Master tabs: "duels" | "transactions"
  const [activeSubTab, setActiveSubTab] = useState("duels"); 
  
  // Transaction sub-categories: "deposit" | "withdrawal" | "reward" | "special"
  const [activeTxFilter, setActiveTxFilter] = useState("deposit");

  // Dynamic transaction filtering based on the active sub-category click
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(tx => tx.type === activeTxFilter);
  }, [activeTxFilter]);

  return (
    <div className="space-y-6">

      {/* --- LEVEL 1: SEGMENTED SYSTEM NAVIGATION CONTROLLER --- */}
      <div className="flex items-center justify-between bg-[#0A0A0A] border border-white/[0.04] p-1.5 rounded-2xl">
        <div className="flex gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab("duels")}
            className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex-1 sm:flex-none cursor-pointer ${
              activeSubTab === "duels" ? "text-emerald-400" : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <Sword size={14} />
            <span className="relative z-10">Duel History</span>
            {activeSubTab === "duels" && (
              <motion.div
                layoutId="history-sub-indicator"
                className="absolute inset-0 bg-white/[0.02] border border-white/[0.06] rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveSubTab("transactions")}
            className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex-1 sm:flex-none cursor-pointer ${
              activeSubTab === "transactions" ? "text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <Wallet size={14} />
            <span className="relative z-10">Transactions</span>
            {activeSubTab === "transactions" && (
              <motion.div
                layoutId="history-sub-indicator"
                className="absolute inset-0 bg-white/[0.02] border border-white/[0.06] rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            Ledger Audited
          </span>
        </div>
      </div>

      {/* --- CONTENT WORKSPACE --- */}
      <AnimatePresence mode="wait">
        
        {/* SUB-VIEW A: DUEL HISTORY LIST */}
        {activeSubTab === "duels" && (
          <motion.div
            key="duels-history-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/[0.04] pb-4">
              <div>
                <h2 className="text-sm font-black tracking-widest text-neutral-100 uppercase">
                  Recent Duel History
                </h2>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Chronological report of past 1v1 skill matches resolved on the peer network.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {duelHistory.length > 0 ? (
                duelHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.outcome === "win" ? "bg-emerald-500 animate-pulse" : "bg-neutral-700"}`} />
                      <div>
                        <span className="text-xs font-bold block text-white">{item.game}</span>
                        <span className="text-[10px] text-neutral-500 block mt-0.5 font-mono">
                          vs {item.opponent} • ID: {item.id}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 self-stretch md:self-auto justify-between md:justify-start">
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                        <Calendar size={12} className="text-neutral-600" />
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold block ${item.outcome === "win" ? "text-emerald-400" : "text-neutral-400"}`}>
                          {item.outcome === "win" ? `+₦${item.delta.toLocaleString()}` : `-₦${Math.abs(item.delta).toLocaleString()}`}
                        </span>
                        <span className="text-[9px] text-neutral-600 block font-mono">Stake: ₦{item.stake.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-neutral-500 text-xs">
                  <Clock className="mx-auto mb-3 opacity-30 text-emerald-400" size={32} />
                  No matching duel records found. Play a game to record data.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* SUB-VIEW B: FINANCIAL TRANSACTIONS LEDGER WITH MULTI-LEVEL FILTERS */}
        {activeSubTab === "transactions" && (
          <motion.div
            key="transactions-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 space-y-5"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/[0.04] pb-4">
              <div>
                <h2 className="text-sm font-black tracking-widest text-neutral-100 uppercase">
                  Financial Transaction Ledger
                </h2>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Verifiable audit of deposits, withdrawals, draw refunds, and bonus payout credits.
                </p>
              </div>
            </div>

            {/* --- LEVEL 2: INNER CATEGORY FILTER CONTROLLER --- */}
            <div className="flex flex-wrap gap-2 p-1 bg-white/[0.01] border border-white/[0.04] rounded-xl self-start max-w-max">
              {[
                { id: "deposit", label: "Deposits", icon: <ArrowDownLeft size={11} /> },
                { id: "withdrawal", label: "Withdrawals", icon: <ArrowUpRight size={11} /> },
                { id: "reward", label: "Rewards", icon: <Gift size={11} /> },
                { id: "special", label: "Special", icon: <RefreshCw size={11} /> }
              ].map((subTab) => {
                const isSelected = activeTxFilter === subTab.id;
                return (
                  <button
                    key={subTab.id}
                    onClick={() => setActiveTxFilter(subTab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.03] border-white/[0.12] text-white"
                        : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {subTab.icon}
                    <span>{subTab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Filtered ledger list */}
            <div className="space-y-3 pt-1">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <motion.div
                      layout
                      key={tx.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/[0.04] flex items-center justify-center shrink-0">
                          {tx.type === "deposit" && <ArrowDownLeft size={16} className="text-emerald-400" />}
                          {tx.type === "withdrawal" && <ArrowUpRight size={16} className="text-neutral-400" />}
                          {tx.type === "reward" && <Gift size={16} className="text-cyan-400" />}
                          {tx.type === "special" && <RefreshCw size={14} className="text-blue-400" />}
                        </div>
                        
                        <div className="min-w-0">
                          <span className="text-xs font-bold block text-white truncate">
                            {tx.description}
                          </span>
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 mt-1">
                            <span className="bg-white/[0.03] border border-white/[0.05] px-1.5 py-0.5 rounded">REF: {tx.id}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={10} className="text-neutral-600" />
                              {tx.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end shrink-0">
                        {/* Status Badge */}
                        <div className="flex items-center gap-1">
                          {tx.status === "completed" ? (
                            <CheckCircle2 size={11} className="text-emerald-500" />
                          ) : (
                            <Clock size={11} className="text-amber-500 animate-pulse" />
                          )}
                          <span className={`text-[10px] font-mono capitalize ${
                            tx.status === "completed" ? "text-neutral-400" : "text-amber-400 font-bold"
                          }`}>
                            {tx.status}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className={`text-xs font-mono font-black block ${
                            tx.amount > 0 ? "text-emerald-400" : "text-neutral-200"
                          }`}>
                            {tx.amount > 0 ? `+₦${tx.amount.toLocaleString()}` : `-₦${Math.abs(tx.amount).toLocaleString()}`}
                          </span>
                          <span className="text-[8px] font-mono text-neutral-600 block uppercase tracking-wider">
                            {tx.type}
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center text-neutral-500 text-xs border border-dashed border-white/[0.04] rounded-xl"
                  >
                    <Inbox className="mx-auto mb-3 opacity-30 text-neutral-400" size={24} />
                    <span>No active {activeTxFilter} records on ledger files.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
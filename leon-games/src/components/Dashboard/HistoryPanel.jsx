import React, { useState } from "react";
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
  FileText,
  Clock
} from "lucide-react";

// --- MOCK TRANSACTION HISTORY DATABASE ---
const MOCK_TRANSACTIONS = [
  { id: "TX-9021", type: "deposit", description: "Instant Wallet Funding", amount: 2000, status: "completed", date: "Today, 1:12 PM" },
  { id: "TX-8831", type: "withdrawal", description: "Bank Transfer Settlement", amount: -5000, status: "completed", date: "Yesterday, 4:21 PM" },
  { id: "TX-4412", type: "reward", description: "Weekly Loyalty Tier Bonus", amount: 250, status: "completed", date: "June 28, 2026" },
  { id: "TX-3129", type: "refund", description: "Draw Replay Refund - #LOB-9021", amount: 1000, status: "completed", date: "June 25, 2026" },
  { id: "TX-2109", type: "reward", description: "Referral Bonus payout - Tunde_Dev", amount: 500, status: "completed", date: "June 24, 2026" },
  { id: "TX-1102", type: "withdrawal", description: "Bank Transfer Settlement", amount: -1500, status: "pending", date: "June 22, 2026" }
];

export function HistoryPanel({ duelHistory = [] }) {
  const [activeSubTab, setActiveSubTab] = useState("duels"); // "duels" | "transactions"

  return (
    <div className="space-y-6">

      {/* --- SEGMENTED NAVIGATION CONTROLLER --- */}
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
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
                <p className="text-[11px] text-neutral-500 mt-1">
                  Chronological report of past 1v1 skill matches resolved on-chain.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {duelHistory.length > 0 ? (
                duelHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.outcome === "win" ? "bg-emerald-500 animate-pulse" : "bg-neutral-700"}`} />
                      <div>
                        <span className="text-xs font-bold block text-white">{item.game}</span>
                        <span className="text-[10px] text-neutral-500 block mt-0.5 font-mono">
                          vs {item.opponent} • ID: {item.id}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 self-stretch sm:self-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                        <Calendar size={11} className="text-neutral-600" />
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold ${item.outcome === "win" ? "text-emerald-400" : "text-neutral-500"}`}>
                          {item.outcome === "win" ? `+₦${item.delta.toLocaleString()}` : `-₦${Math.abs(item.delta).toLocaleString()}`}
                        </span>
                        <span className="text-[9px] text-neutral-600 block font-mono">Stake: ₦{item.stake.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-neutral-500 text-xs font-sans">
                  <Clock className="mx-auto mb-3 opacity-30 text-emerald-400" size={32} />
                  No matching duel records found. Play a game to record data.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* SUB-VIEW B: FINANCIAL TRANSACTIONS LEDGER */}
        {activeSubTab === "transactions" && (
          <motion.div
            key="transactions-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/[0.04] pb-4">
              <div>
                <h2 className="text-sm font-black tracking-widest text-neutral-100 uppercase">
                  Financial Transaction Ledger
                </h2>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Verifiable audit of deposits, withdrawals, draw refunds, and bonus payout credits.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {MOCK_TRANSACTIONS.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/[0.04] flex items-center justify-center shrink-0">
                      {tx.type === "deposit" && <ArrowDownLeft size={16} className="text-emerald-400" />}
                      {tx.type === "withdrawal" && <ArrowUpRight size={16} className="text-neutral-400" />}
                      {tx.type === "reward" && <Gift size={16} className="text-cyan-400" />}
                      {tx.type === "refund" && <RefreshCw size={14} className="text-blue-400" />}
                    </div>
                    
                    <div className="min-w-0">
                      <span className="text-xs font-bold block text-white truncate">
                        {tx.description}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 block mt-0.5">
                        REF ID: {tx.id} • {tx.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start shrink-0">
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
                      <span className={`text-xs font-mono font-black ${
                        tx.amount > 0 ? "text-emerald-400" : "text-neutral-200"
                      }`}>
                        {tx.amount > 0 ? `+₦${tx.amount.toLocaleString()}` : `-₦${Math.abs(tx.amount).toLocaleString()}`}
                      </span>
                      <span className="text-[8px] font-mono text-neutral-600 block uppercase">
                        {tx.type}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Award, ShieldAlert, Zap } from "lucide-react";

// --- MOCK DATABASE RE-USED FOR MODAL ---
const MOCK_LEADERBOARD = [
  { rank: 1, name: "Tunde_Dev", wins: 142, earnings: 184500, avatar: "🟢" },
  { rank: 2, name: "Ngozi_V", wins: 121, earnings: 149000, avatar: "🟡" },
  { rank: 3, name: "Chinedu_O", wins: 98, earnings: 112000, avatar: "🔵" },
  { rank: 4, name: "Seyi_Gamer", wins: 84, earnings: 76400, avatar: "🟠" },
  { rank: 5, name: "Abubakar_K", wins: 73, earnings: 62000, avatar: "🟣" },
];

export function LeaderboardModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- 1. FLOATING CIRCULAR BALL BUTTON (BOTTOM-LEFT) --- */}
      <div className="fixed bottom-24 lg:bottom-6 left-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-600 text-neutral-950 flex items-center justify-center shadow-[0_8px_30px_rgba(245,158,11,0.3)] cursor-pointer outline-none border border-yellow-400/30 group"
          aria-label="Toggle Global Leaderboard"
        >
          {/* Subtle outer pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-yellow-500/20 animate-ping opacity-75 pointer-events-none" />
          
          <Trophy size={22} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* --- 2. MODAL OVERLAY & CONTAINER HUB --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dim/Blur Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Centralized Glassmorphic Leaderboard Card */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 210 }}
              className="bg-[#0A0A0A]/95 border border-white/[0.08] shadow-[0_20px_70px_rgba(0,0,0,0.85)] rounded-3xl w-full max-w-lg p-6 relative z-10 space-y-6"
            >
              
              {/* Header block with close trigger */}
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-widest text-neutral-100 uppercase">
                      Global Champions
                    </h3>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase">
                      Verifiable P2P Arena Standings
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close leaderboard"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Leaderboard Table Content */}
              <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <table className="w-full text-left text-xs text-neutral-400">
                  <thead>
                    <tr className="bg-white/[0.01] border-b border-white/[0.04] text-[9px] uppercase font-mono tracking-widest text-neutral-500">
                      <th className="py-2.5 px-4">Rank</th>
                      <th className="py-2.5 px-4">Player ID</th>
                      <th className="py-2.5 px-4 text-center">Wins</th>
                      <th className="py-2.5 px-4 text-right">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02] font-mono">
                    {MOCK_LEADERBOARD.map((player) => (
                      <tr key={player.rank} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-3 px-4 font-bold">
                          {player.rank === 1 ? "🥇 " : player.rank === 2 ? "🥈 " : player.rank === 3 ? "🥉 " : ""}
                          {player.rank}
                        </td>
                        <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                          <span>{player.avatar}</span>
                          <span className="truncate max-w-[100px] sm:max-w-none">{player.name}</span>
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-neutral-300">
                          {player.wins}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-400">
                          ₦{player.earnings.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Informational Action Footer */}
              <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <div className="flex items-center gap-1">
                  <Zap size={10} className="text-yellow-500" />
                  <span>Cycle ends in 42m</span>
                </div>
                <span>AUTO-SYNCED</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
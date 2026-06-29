import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
    X,
    User,
    Wallet,
    ArrowLeft,
    ArrowDownLeft,
    ArrowUpRight,
    ShieldCheck,
    Trophy
} from "lucide-react";

export function ProfileDrawer({
    isOpen,
    onClose,
    username = "UserPeer_99",
    balanceBreakdown = {
        total: 12450.00,
        deposited: 5000.00,
        gameEarnings: 4000.00,
        rewards: 3450.00
    },
    wageredAmount = 150000, // Naira wager amount passed as prop
    setIsDepositModalOpen,
    onWithdrawRequest
}) {

    // Rank progression details based on specified Naira tiers
    const rankDetails = useMemo(() => {
        const amt = wageredAmount;
        if (amt <= 99000) {
            return {
                current: "Bronze",
                next: "Silver",
                min: 0,
                max: 99000,
                progress: (amt / 99000) * 100,
                reward: 100,
                color: "from-amber-600 to-amber-800",
                badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
                benefit: "Base reward payout multiplier."
            };
        } else if (amt <= 499000) {
            return {
                current: "Silver",
                next: "Gold",
                min: 100000,
                max: 499000,
                progress: ((amt - 100000) / (499000 - 100000)) * 100,
                reward: 250,
                color: "from-slate-400 to-slate-500",
                badgeColor: "bg-slate-400/10 text-slate-300 border-slate-400/20",
                benefit: "+2% Boost on all weekly promo payouts."
            };
        } else if (amt <= 999000) {
            return {
                current: "Gold",
                next: "Platinum",
                min: 500000,
                max: 999000,
                progress: ((amt - 500000) / (999000 - 500000)) * 100,
                reward: 500,
                color: "from-yellow-500 to-amber-500",
                badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                benefit: "+5% Boost + Priority lobby matchmaking routing."
            };
        } else if (amt <= 4999000) {
            return {
                current: "Platinum",
                next: "Diamond",
                min: 1000000,
                max: 4999000,
                progress: ((amt - 1000000) / (4999000 - 1000000)) * 100,
                reward: 1000,
                color: "from-cyan-400 to-blue-500",
                badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
                benefit: "+10% Boost + Zero withdrawal platform fees."
            };
        } else {
            return {
                current: "Diamond",
                next: "Max Tier",
                min: 5000000,
                max: 5500000,
                progress: Math.min(100, ((amt - 5000000) / 500000) * 100),
                reward: 2500,
                color: "from-purple-500 to-indigo-500",
                badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                benefit: "+15% Boost + Direct VIP dedicated support portal access."
            };
        }
    }, [wageredAmount]);

    const tiersList = [
        { name: "Bronze", limit: "₦99k", reward: "₦100" },
        { name: "Silver", limit: "₦499k", reward: "₦250" },
        { name: "Gold", limit: "₦1M", reward: "₦500" },
        { name: "Platinum", limit: "₦5M", reward: "₦1k" },
        { name: "Diamond", limit: "₦5.5M+", reward: "₦2.5k" },
    ];

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

            {/* 2. SLIDE-IN PROFILE DRAWER */}
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
                            <button
                                onClick={onClose}
                                className="p-2 -ml-2 rounded-lg hover:bg-white/[0.02] text-neutral-400 hover:text-white transition-colors cursor-pointer sm:hidden"
                                aria-label="Back"
                            >
                                <ArrowLeft size={18} />
                            </button>

                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <User size={16} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold tracking-wider text-neutral-200 uppercase truncate max-w-[150px]">
                                        {username}
                                    </h3>
                                    <p className="text-[10px] font-mono text-neutral-500 uppercase">
                                        Account Profile
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="hidden sm:flex p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
                            aria-label="Close profile details"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Body Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-transparent">

                        {/* BALANCE BREAKDOWN DEEP DIVE CARD */}
                        <div className="bg-neutral-950 border border-white/[0.06] rounded-2xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-neutral-400">
                                    <Wallet size={14} className="text-emerald-400" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Wallet Allocations</span>
                                </div>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                                    LIVE STATUS
                                </span>
                            </div>

                            {/* Total Balance display */}
                            <div className="border-b border-white/[0.04] pb-4">
                                <span className="text-[10px] text-neutral-500 block uppercase font-mono">Total Net Balance</span>
                                <span className="text-2xl font-mono font-black text-white">
                                    ₦{balanceBreakdown.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* Itemized Sub-balances */}
                            <div className="space-y-3 pt-1">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-neutral-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Deposited Funds
                                    </span>
                                    <span className="font-mono font-semibold text-neutral-300">
                                        ₦{balanceBreakdown.deposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-neutral-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Game Net Earnings
                                    </span>
                                    <span className="font-mono font-semibold text-emerald-400">
                                        ₦{balanceBreakdown.gameEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-neutral-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Reward Earnings
                                    </span>
                                    <span className="font-mono font-semibold text-neutral-300">
                                        ₦{balanceBreakdown.rewards.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* QUICK WALLET ACTIONS */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => {
                                    onClose();
                                    setIsDepositModalOpen(true);
                                }}
                                className="py-3 bg-emerald-500 hover:bg-emerald-600 text-[#050505] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <ArrowDownLeft size={14} strokeWidth={3} />
                                <span>DEPOSIT</span>
                            </button>

                            <button
                                onClick={() => {
                                    onClose();
                                    if (onWithdrawRequest) onWithdrawRequest();
                                }}
                                className="py-3 bg-neutral-900 hover:bg-neutral-800 border border-white/[0.06] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <ArrowUpRight size={14} strokeWidth={3} />
                                <span>WITHDRAW</span>
                            </button>
                        </div>

                        {/* LOYALTY PROGRESSION HUB */}
                        <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-2xl p-5 space-y-5">

                            {/* Header Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Trophy size={14} className="text-cyan-400" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-neutral-400">Loyalty Status</span>
                                </div>

                                <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border uppercase tracking-wider ${rankDetails.badgeColor}`}>
                                    {rankDetails.current} Rank
                                </span>
                            </div>

                            {/* Progress Bar Display */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px] font-mono">
                                    <span className="text-neutral-500">Wagered: <strong className="text-white">₦{wageredAmount.toLocaleString()}</strong></span>
                                    <span className="text-neutral-500">Next: <strong className="text-white">{rankDetails.next}</strong></span>
                                </div>

                                {/* Progressive Bar track */}
                                <div className="h-2.5 w-full bg-neutral-950 border border-white/[0.04] rounded-full overflow-hidden relative">
                                    <div
                                        className={`h-full bg-gradient-to-r ${rankDetails.color} rounded-full transition-all duration-1000`}
                                        style={{ width: `${rankDetails.progress}%` }}
                                    />
                                </div>

                                <div className="flex justify-between text-[9px] font-mono text-neutral-600">
                                    <span>₦{rankDetails.min.toLocaleString()}</span>
                                    <span>₦{rankDetails.max.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Weekly Reward Status Display Box */}
                            <div className="p-3.5 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                    <span className="text-sm">🎁</span>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wide">
                                        Active Weekly Bonus
                                    </h4>
                                    <p className="text-xs font-mono font-black text-emerald-400">
                                        ₦{rankDetails.reward} / Week
                                    </p>
                                    <p className="text-[9px] text-neutral-500 leading-relaxed font-light">
                                        Transmitted directly to your main wallet at the end of every week cycle.
                                    </p>
                                </div>
                            </div>

                            {/* Weekly Tier Status Reward Explanation */}
                            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-start gap-2">
                                <ShieldCheck size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-neutral-300 uppercase tracking-wide">
                                        {rankDetails.current} Level Tier Benefit
                                    </h4>
                                    <p className="text-[10px] text-neutral-400 leading-relaxed font-light">
                                        {rankDetails.benefit} Wager more to step into higher brackets.
                                    </p>
                                </div>
                            </div>

                            {/* GEOMETRIC ARROW CHAIN VISUAL MATRIX */}
                            <div className="space-y-2">
                                <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">
                                    Loyalty Chain Progress
                                </span>

                                <div className="flex items-center border border-white/[0.04] bg-neutral-950 rounded-xl p-2.5 overflow-x-auto whitespace-nowrap scrollbar-none gap-2">
                                    {tiersList.map((tier, idx) => {
                                        const isActive = rankDetails.current.toLowerCase() === tier.name.toLowerCase();
                                        return (
                                            <React.Fragment key={tier.name}>
                                                <div className={`flex flex-col items-center justify-center px-2.5 py-1 rounded-lg text-center transition-all ${isActive
                                                        ? "bg-white/[0.04] border border-emerald-500/30 shadow-[0_2px_10px_rgba(34,197,94,0.05)]"
                                                        : "border border-transparent"
                                                    }`}>
                                                    <span className={`text-[9px] font-mono font-black uppercase ${isActive ? "text-emerald-400" : "text-neutral-500"
                                                        }`}>
                                                        {tier.name}
                                                    </span>
                                                    <span className="text-[8px] font-mono text-neutral-600">
                                                        {tier.limit} ({tier.reward}/wk)
                                                    </span>
                                                </div>

                                                {/* Horizontal Arrow Separator (Arrow Chain) */}
                                                {idx < tiersList.length - 1 && (
                                                    <span className="text-neutral-700 font-bold select-none text-[10px] shrink-0">
                                                        ➔
                                                    </span>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Footer branding details */}
                    <div className="p-4 border-t border-white/[0.04] bg-[#050505]/40 flex items-center justify-center gap-1.5">
                        <ShieldCheck size={12} className="text-neutral-600" />
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
                            LEON COMPLIANT SECURITY PROTOCOL
                        </span>
                    </div>

                </motion.div>
            )}
        </>
    );
}
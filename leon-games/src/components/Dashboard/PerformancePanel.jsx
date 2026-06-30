import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Percent, 
  CircleDollarSign, 
  Zap, 
  Award, 
  Clock, 
  Activity, 
  Sliders, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// --- MOCK DATABASE GENERATORS FOR DIFFERENT TIME FRAMES ---
const MOCK_TIME_DATA = {
  today: {
    betsPlayed: 4, wins: 3, losses: 1, winRate: 75, totalStake: 4500, totalReturns: 7450, netProfit: 2950, roi: 65.5,
    trend: [
      { name: "09:00", profit: 0 },
      { name: "11:00", profit: 950 },
      { name: "14:00", profit: 450 },
      { name: "18:00", profit: 2450 },
      { name: "21:00", profit: 2950 }
    ],
    stakes: [
      { range: "₦100-₦500", count: 2 },
      { range: "₦500-₦2k", count: 1 },
      { range: "₦2k-₦5k", count: 1 },
      { range: "₦5k+", count: 0 }
    ]
  },
  last7: {
    betsPlayed: 28, wins: 18, losses: 10, winRate: 64.2, totalStake: 38200, totalReturns: 54100, netProfit: 15900, roi: 41.6,
    trend: [
      { name: "Mon", profit: 0 },
      { name: "Tue", profit: 2400 },
      { name: "Wed", profit: 1200 },
      { name: "Thu", profit: 6800 },
      { name: "Fri", profit: 9400 },
      { name: "Sat", profit: 14200 },
      { name: "Sun", profit: 15900 }
    ],
    stakes: [
      { range: "₦100-₦500", count: 12 },
      { range: "₦500-₦2k", count: 8 },
      { range: "₦2k-₦5k", count: 6 },
      { range: "₦5k+", count: 2 }
    ]
  },
  last30: {
    betsPlayed: 114, wins: 68, losses: 46, winRate: 59.6, totalStake: 142500, totalReturns: 198400, netProfit: 55900, roi: 39.2,
    trend: [
      { name: "Week 1", profit: 0 },
      { name: "Week 2", profit: 12000 },
      { name: "Week 3", profit: 29000 },
      { name: "Week 4", profit: 55900 }
    ],
    stakes: [
      { range: "₦100-₦500", count: 48 },
      { range: "₦500-₦2k", count: 35 },
      { range: "₦2k-₦5k", count: 21 },
      { range: "₦5k+", count: 10 }
    ]
  },
  alltime: {
    betsPlayed: 482, wins: 281, losses: 201, winRate: 58.3, totalStake: 684000, totalReturns: 912400, netProfit: 228400, roi: 33.3,
    trend: [
      { name: "Jan", profit: 0 },
      { name: "Feb", profit: 34000 },
      { name: "Mar", profit: 62000 },
      { name: "Apr", profit: 112000 },
      { name: "May", profit: 184000 },
      { name: "Jun", profit: 228400 }
    ],
    stakes: [
      { range: "₦100-₦500", count: 182 },
      { range: "₦500-₦2k", count: 142 },
      { range: "₦2k-₦5k", count: 98 },
      { range: "₦5k+", count: 60 }
    ]
  }
};

export function PerformancePanel({ currentBalance = 12450.00 }) {
  const [timeRange, setTimeRange] = useState("last30"); // "today" | "last7" | "last30" | "alltime" | "custom"
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomStartEnd] = useState("");

  // Dynamically resolve datasets based on chosen range
  const currentData = useMemo(() => {
    if (timeRange === "custom") {
      // Simulate dynamic custom calculations
      return {
        betsPlayed: 12, wins: 7, losses: 5, winRate: 58.3, totalStake: 15000, totalReturns: 21500, netProfit: 6500, roi: 43.3,
        trend: [
          { name: "Start Range", profit: 0 },
          { name: "Midpoint", profit: 3400 },
          { name: "End Range", profit: 6500 }
        ],
        stakes: [
          { range: "₦100-₦500", count: 5 },
          { range: "₦500-₦2k", count: 4 },
          { range: "₦2k-₦5k", count: 2 },
          { range: "₦5k+", count: 1 }
        ]
      };
    }
    return MOCK_TIME_DATA[timeRange] || MOCK_TIME_DATA.last30;
  }, [timeRange]);

  // Pie chart variables
  const pieData = [
    { name: "Wins", value: currentData.wins, color: "#10B981" },
    { name: "Losses", value: currentData.losses, color: "#F43F5E" },
    { name: "Voided", value: Math.floor(currentData.betsPlayed * 0.05), color: "#3B82F6" },
    { name: "Pending", value: 1, color: "#F59E0B" }
  ];

  // Betting Activity distribution variables
  const barData = [
    { name: "Mon", preMatch: 4, live: 2 },
    { name: "Tue", preMatch: 3, live: 5 },
    { name: "Wed", preMatch: 6, live: 1 },
    { name: "Thu", preMatch: 2, live: 3 },
    { name: "Fri", preMatch: 8, live: 6 },
    { name: "Sat", preMatch: 12, live: 10 },
    { name: "Sun", preMatch: 9, live: 8 }
  ];

  // Odds Range Distribution variables
  const oddsData = [
    { range: "1.01-1.30", frequency: 45 },
    { range: "1.31-1.70", frequency: 128 },
    { range: "1.71-2.20", frequency: 210 },
    { range: "2.21-3.50", frequency: 82 },
    { range: "3.51-5.00+", frequency: 17 }
  ];

  return (
    <div className="space-y-6">

      {/* --- TIME-BASED CONTROLLER CARD --- */}
      <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-cyan-400" size={16} />
            <span className="text-xs font-black tracking-widest text-neutral-400 uppercase">
              Time-Based Performance Matrix
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "today", label: "Today" },
              { id: "last7", label: "Last 7 Days" },
              { id: "last30", label: "Last 30 Days" },
              { id: "alltime", label: "All Time" },
              { id: "custom", label: "Custom Range" }
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  timeRange === range.id
                    ? "bg-white/[0.03] border-white/[0.12] text-white"
                    : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Block */}
        {timeRange === "custom" && (
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customStart}
                onChange={e => setCustomStart(e.target.value)}
                className="bg-[#050505] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-neutral-300 font-mono outline-none"
              />
              <span className="text-neutral-600 text-xs font-mono">to</span>
              <input
                type="date"
                value={customEnd}
                onChange={e => setCustomStartEnd(e.target.value)}
                className="bg-[#050505] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-neutral-300 font-mono outline-none"
              />
            </div>
            <button
              onClick={() => triggerToast && triggerToast("Calculated Custom Performance metrics.")}
              className="py-1.5 px-4 bg-cyan-400 hover:bg-cyan-500 text-neutral-950 text-[10px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Request Average
            </button>
          </div>
        )}

        {/* Dynamic Period Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
          {[
            { label: "Bets Played", value: currentData.betsPlayed, format: "int" },
            { label: "Wins", value: currentData.wins, format: "int", color: "text-emerald-400" },
            { label: "Losses", value: currentData.losses, format: "int", color: "text-rose-500" },
            { label: "Win Rate", value: `${currentData.winRate}%`, format: "str" },
            { label: "Total Stake", value: `₦${currentData.totalStake.toLocaleString()}`, format: "str" },
            { label: "Total Returns", value: `₦${currentData.totalReturns.toLocaleString()}`, format: "str" },
            { label: "Net P/L", value: `₦${currentData.netProfit.toLocaleString()}`, format: "str", color: currentData.netProfit >= 0 ? "text-emerald-400" : "text-rose-500" },
            { label: "ROI", value: `${currentData.roi}%`, format: "str", color: "text-cyan-400" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl text-center">
              <span className="text-[9px] text-neutral-500 block uppercase font-mono">{item.label}</span>
              <span className={`text-xs font-mono font-extrabold mt-1 block ${item.color || "text-white"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- OVERVIEW SUMMARY GRID CARDS --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Balance Card */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/[0.01] rounded-full blur-xl pointer-events-none" />
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            Current Balance
          </span>
          <span className="text-xl font-mono font-black text-white block">
            ₦{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-neutral-400 font-mono">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>Active &amp; Settled</span>
          </div>
        </div>

        {/* Card 2: Net profit/loss */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/[0.01] rounded-full blur-xl pointer-events-none" />
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            Net Profit/Loss
          </span>
          <span className="text-xl font-mono font-black text-emerald-400 block">
            +₦{(currentData.netProfit).toLocaleString()}
          </span>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-400 font-mono">
            <ArrowUpRight size={12} />
            <span>ROI: {currentData.roi}%</span>
          </div>
        </div>

        {/* Card 3: Win Streak */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            Winning Streak
          </span>
          <span className="text-xl font-mono font-black text-cyan-400 block">
            7 Matches
          </span>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-neutral-500 font-mono">
            <Award size={12} className="text-cyan-400" />
            <span>Active Peak Multiplier</span>
          </div>
        </div>

        {/* Card 4: Losing Streak */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            Losing Streak
          </span>
          <span className="text-xl font-mono font-black text-rose-500 block">
            1 Match
          </span>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-neutral-500 font-mono">
            <Clock size={12} className="text-rose-500" />
            <span>Losses Mitigated (Skill)</span>
          </div>
        </div>

      </div>

      {/* --- CHARTS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Trend Area Chart (Line chart showing profit over time) */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-emerald-400" size={14} />
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                Profit/Loss Trend
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">₦ Cumulative profit curve</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" opacity={0.3} />
                <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} />
                <YAxis stroke="#555" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }}
                  labelStyle={{ fontSize: 10, color: "#aaa" }}
                  itemStyle={{ fontSize: 11, color: "#10B981" }}
                />
                <Area type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie/Doughnut Chart (Win vs Loss Distribution) */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 lg:col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-cyan-400" size={14} />
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
              Win vs Loss Distribution
            </span>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }}
                  itemStyle={{ fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Percentage Tag */}
            <div className="absolute text-center">
              <span className="text-xs text-neutral-500 block uppercase font-mono leading-none">Win rate</span>
              <span className="text-lg font-mono font-black text-emerald-400 mt-1 block">
                {currentData.winRate}%
              </span>
            </div>
          </div>

          {/* Custom Labels List */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.04] text-[10px] font-mono">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-neutral-500">{item.name}:</span>
                <span className="text-neutral-200 font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- SECOND CHARTS ROW: ACTIVITY & DISTRIBUTIONS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Chart A: Betting Activity (Bar Chart) */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block mb-4">
            Betting Activity (Singles vs Accum)
          </span>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#444" fontSize={9} tickLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }} />
                <Bar dataKey="preMatch" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Singles" />
                <Bar dataKey="live" fill="#10B981" radius={[4, 4, 0, 0]} name="Live Bets" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Stake Distribution (Histogram) */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block mb-4">
            Stake Distribution Histogram
          </span>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.stakes}>
                <XAxis dataKey="range" stroke="#444" fontSize={9} tickLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }} />
                <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Bets Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart C: Odds Distribution (Bar chart showing odds ranges) */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block mb-4">
            Odds Frequency Distribution
          </span>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oddsData}>
                <XAxis dataKey="range" stroke="#444" fontSize={9} tickLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }} />
                <Bar dataKey="frequency" fill="#EC4899" radius={[4, 4, 0, 0]} name="Bets Placed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* --- TWO-COLUMN DETAILED PERFORMANCE STATICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Metrics List A: Advanced Performance Statistics */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block border-b border-white/[0.04] pb-2">
            Performance Analytics Ledger
          </span>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
            {[
              { label: "Average Bet Size", value: "₦2,450" },
              { label: "Largest Wager", value: "₦15,000" },
              { label: "Largest Win", value: "₦28,500", color: "text-emerald-400" },
              { label: "Largest Loss", value: "-₦5,000", color: "text-rose-500" },
              { label: "Average Odds Played", value: "1.82" },
              { label: "Highest Odds Won", value: "4.85", color: "text-emerald-400" },
              { label: "Lowest Odds Won", value: "1.12" },
              { label: "Average Profit / Bet", value: "₦845", color: "text-emerald-400" }
            ].map((stat, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="text-neutral-500">{stat.label}:</span>
                <span className={`font-mono font-bold ${stat.color || "text-neutral-200"}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics List B: Betting Statistics */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block border-b border-white/[0.04] pb-2">
            Betting Statistics &amp; Formats
          </span>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
            {[
              { label: "Total Singles", value: "348" },
              { label: "Total Accumulators (Parlays)", value: "112" },
              { label: "Total System Bets", value: "22" },
              { label: "Pre-match Bets", value: "298" },
              { label: "Live Bets", value: "184" },
              { label: "Cash Out Bets Placed", value: "48" },
              { label: "Successful Cash Outs", value: "42", color: "text-emerald-400" },
              { label: "Failed Cash Outs", value: "6", color: "text-rose-500" }
            ].map((stat, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="text-neutral-500">{stat.label}:</span>
                <span className={`font-mono font-bold ${stat.color || "text-neutral-200"}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
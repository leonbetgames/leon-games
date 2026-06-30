import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  Calendar, 
  Percent, 
  Award, 
  Clock, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Sword,
  Coins
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
    betsPlayed: 4, wins: 3, losses: 1, winRate: 75, totalStake: 4500, totalReturns: 8550, netProfit: 4050, roi: 90.0,
    trend: [
      { name: "09:00", profit: 0 },
      { name: "11:00", profit: 950 },
      { name: "14:00", profit: 450 },
      { name: "18:00", profit: 2450 },
      { name: "21:00", profit: 4050 }
    ],
    stakes: [
      { range: "₦100-₦500", count: 2 },
      { range: "₦500-₦2k", count: 1 },
      { range: "₦2k-₦5k", count: 1 },
      { range: "₦5k+", count: 0 }
    ]
  },
  last7: {
    betsPlayed: 28, wins: 18, losses: 10, winRate: 64.2, totalStake: 38200, totalReturns: 61560, netProfit: 23360, roi: 61.1,
    trend: [
      { name: "Mon", profit: 0 },
      { name: "Tue", profit: 3400 },
      { name: "Wed", profit: 1900 },
      { name: "Thu", profit: 9800 },
      { name: "Fri", profit: 14400 },
      { name: "Sat", profit: 19200 },
      { name: "Sun", profit: 23360 }
    ],
    stakes: [
      { range: "₦100-₦500", count: 12 },
      { range: "₦500-₦2k", count: 8 },
      { range: "₦2k-₦5k", count: 6 },
      { range: "₦5k+", count: 2 }
    ]
  },
  last30: {
    betsPlayed: 114, wins: 68, losses: 46, winRate: 59.6, totalStake: 142500, totalReturns: 232560, netProfit: 90060, roi: 63.2,
    trend: [
      { name: "Week 1", profit: 0 },
      { name: "Week 2", profit: 22000 },
      { name: "Week 3", profit: 49000 },
      { name: "Week 4", profit: 90060 }
    ],
    stakes: [
      { range: "₦100-₦500", count: 48 },
      { range: "₦500-₦2k", count: 35 },
      { range: "₦2k-₦5k", count: 21 },
      { range: "₦5k+", count: 10 }
    ]
  },
  alltime: {
    betsPlayed: 482, wins: 281, losses: 201, winRate: 58.3, totalStake: 684000, totalReturns: 961020, netProfit: 277020, roi: 40.5,
    trend: [
      { name: "Jan", profit: 0 },
      { name: "Feb", profit: 44000 },
      { name: "Mar", profit: 82000 },
      { name: "Apr", profit: 142000 },
      { name: "May", profit: 214000 },
      { name: "Jun", profit: 277020 }
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

  const currentData = useMemo(() => {
    if (timeRange === "custom") {
      return {
        betsPlayed: 12, wins: 7, losses: 5, winRate: 58.3, totalStake: 15000, totalReturns: 23940, netProfit: 8940, roi: 59.6,
        trend: [
          { name: "Start Range", profit: 0 },
          { name: "Midpoint", profit: 4400 },
          { name: "End Range", profit: 8940 }
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

  // Wins vs Losses allocation
  const pieData = [
    { name: "Wins", value: currentData.wins, color: "#10B981" },
    { name: "Losses", value: currentData.losses, color: "#F43F5E" },
    { name: "Refunded/Draws", value: Math.floor(currentData.betsPlayed * 0.05), color: "#3B82F6" }
  ];

  // Duel Formats allocation (Challenges Hosted/Created vs Directly Accepted)
  const barData = [
    { name: "Mon", hosted: 4, accepted: 2 },
    { name: "Tue", hosted: 3, accepted: 5 },
    { name: "Wed", hosted: 6, accepted: 1 },
    { name: "Thu", hosted: 2, accepted: 3 },
    { name: "Fri", hosted: 8, accepted: 6 },
    { name: "Sat", hosted: 12, accepted: 10 },
    { name: "Sun", hosted: 9, accepted: 8 }
  ];

  // Game Mode Engagement Frequency Distribution
  const gameModeData = [
    { name: "RPS", duels: 182, fill: "#F59E0B" },
    { name: "Shootout", duels: 98, fill: "#06B6D4" },
    { name: "Reaction", duels: 124, fill: "#10B981" },
    { name: "TicTacToe", duels: 54, fill: "#8B5CF6" },
    { name: "Prediction", duels: 24, fill: "#EC4899" }
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

        {/* Custom Date Inputs */}
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
              className="py-1.5 px-4 bg-cyan-400 hover:bg-cyan-500 text-neutral-950 text-[10px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Request Average
            </button>
          </div>
        )}

        {/* Dynamic Period Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
          {[
            { label: "Duels Played", value: currentData.betsPlayed, format: "int" },
            { label: "Wins", value: currentData.wins, format: "int", color: "text-emerald-400" },
            { label: "Losses", value: currentData.losses, format: "int", color: "text-rose-500" },
            { label: "Win Rate", value: `${currentData.winRate}%`, format: "str" },
            { label: "Total Stakes", value: `₦${currentData.totalStake.toLocaleString()}`, format: "str" },
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
            Current balance
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
            <span>Multiplier Active</span>
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
            <span>Draw mitigation: active</span>
          </div>
        </div>

      </div>

      {/* --- CHARTS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Trend Area Chart (Cumulative net profits) */}
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
              Resolved Duels Breakdown
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

            <div className="absolute text-center">
              <span className="text-xs text-neutral-500 block uppercase font-mono leading-none">Win rate</span>
              <span className="text-lg font-mono font-black text-emerald-400 mt-1 block">
                {currentData.winRate}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 pt-4 border-t border-white/[0.04] text-[9px] font-mono">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center bg-white/[0.01] border border-white/[0.03] py-1 rounded">
                <span className="text-neutral-500 block">{item.name}</span>
                <span className="font-bold mt-0.5" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- SECOND CHARTS ROW: ACTIVITY & DISTRIBUTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Chart A: Lobby Formats (Hosted vs Accepted) */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block mb-4">
            Duel Formats (Created vs Accepted)
          </span>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#444" fontSize={9} tickLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }} />
                <Bar dataKey="hosted" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Created Lobbies" />
                <Bar dataKey="accepted" fill="#10B981" radius={[4, 4, 0, 0]} name="Accepted Lobbies" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Stake Distribution Histogram */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block mb-4">
            Stake Size Distribution (₦)
          </span>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.stakes}>
                <XAxis dataKey="range" stroke="#444" fontSize={9} tickLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }} />
                <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Duels count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart C: Game Mode Engagement */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block mb-4">
            Engagement by Game Mode (Resolved Duels)
          </span>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gameModeData}>
                <XAxis dataKey="name" stroke="#444" fontSize={9} tickLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#222" }} />
                <Bar dataKey="duels" radius={[4, 4, 0, 0]} name="Duels Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* --- TWO-COLUMN DETAILED PERFORMANCE STATICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Metrics List A: Advanced Performance Statistics */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-1.5 border-b border-white/[0.04] pb-2">
            <Coins size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
              Performance Analytics Ledger
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
            {[
              { label: "Average Stake Size", value: "₦2,450" },
              { label: "Largest Stake Wagered", value: "₦15,000" },
              { label: "Largest Payout Won", value: "₦28,500", color: "text-emerald-400" },
              { label: "Largest Loss", value: "-₦5,000", color: "text-rose-500" },
              { label: "Platform Fee Rate", value: "5%" },
              { label: "Total Platform Fee Paid", value: "₦6,840" },
              { label: "Match Return Multiplier", value: "1.90x" },
              { label: "Average Net Profit / Duel", value: "₦845", color: "text-emerald-400" }
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
          <div className="flex items-center gap-1.5 border-b border-white/[0.04] pb-2">
            <Sword size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
              Duel Mode Engagement Matrix
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
            {[
              { label: "Total Challenges Created", value: "348" },
              { label: "Total Challenges Accepted", value: "134" },
              { label: "Rock Paper Scissors", value: "182" },
              { label: "Penalty Shootout", value: "98" },
              { label: "Reaction Speed", value: "124" },
              { label: "Tic Tac Toe", value: "54" },
              { label: "Number Prediction", value: "24" },
              { label: "Aborted / Draw Duels", value: "18", color: "text-rose-500" }
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
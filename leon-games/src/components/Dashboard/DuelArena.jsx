import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sword, 
  Play, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  X,
  ChevronRightSquare,
  Activity,
  Check
} from "lucide-react";
import penaltyShootout from "../../assets/images/penalty-shootout.png";
import predictionDuel from "../../assets/images/prediction-duel.png";
import reactionSignal from "../../assets/images/reaction-signal.png";
import rockPaperScissors from "../../assets/images/rock-paper-scissors.png";
import ticTacToe from "../../assets/images/tic-tac-toe.png";

export function DuelArena({
  games = [],
  lobbies = [],
  balance = 0,
  handleJoinLobby,
  setIsCreateModalOpen,
  setCreateGameId,
  triggerToast
}) {
  // --- CAROUSEL STATES ---
  const [carouselIdx, setCarouselIdx] = useState(0);
  
  // --- FILTER STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGames, setSelectedGames] = useState([]); // Array of selected game IDs for checkboxes
  const [wagerOperator, setWagerOperator] = useState("all"); // "all" | "gt" | "lt" | "eq" | "between"
  const [wagerValue, setWagerValue] = useState("");
  const [wagerMin, setWagerMin] = useState("");
  const [wagerMax, setWagerMax] = useState("");
  const [customRoomInput, setCustomRoomInput] = useState("");

  // --- CAROUSEL NAVIGATION ---
  const handlePrev = () => {
    setCarouselIdx((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIdx((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  const handleHostGameClick = (gameId) => {
    setCreateGameId(gameId);
    setIsCreateModalOpen(true);
  };

  // --- TOGGLE GAME CHECKBOX ---
  const handleToggleGameCheckbox = (gameId) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  // --- JOIN PRIVATE DIRECT DUEL ---
  const handleLoadCustomCode = () => {
    if (!customRoomInput.trim()) {
      triggerToast("Please enter a valid lobby code.");
      return;
    }
    if (customRoomInput.startsWith("LEON-")) {
      const randomOpponentStake = 1000;
      if (balance < randomOpponentStake) {
        triggerToast("❌ Insufficient balance to join this private match.");
        return;
      }
      triggerToast("Connecting to secure direct peer node...");
    } else {
      triggerToast("Invalid Duel Room Code.");
    }
  };

  // --- FILTER ENGINE (AND LOGIC) ---
  const filteredLobbies = useMemo(() => {
    return lobbies.filter((lobby) => {
      // 1. Search Query Match
      const matchQuery =
        lobby.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lobby.id.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Checked Games Match (If none checked, allow all)
      const matchGames =
        selectedGames.length === 0 || selectedGames.includes(lobby.gameId);

      // 3. Wager/Stake Calculations
      let matchWager = true;
      const stakeVal = Number(lobby.stake);
      const targetVal = Number(wagerValue);

      if (wagerOperator === "gt" && wagerValue) {
        matchWager = stakeVal > targetVal;
      } else if (wagerOperator === "lt" && wagerValue) {
        matchWager = stakeVal < targetVal;
      } else if (wagerOperator === "eq" && wagerValue) {
        matchWager = stakeVal === targetVal;
      } else if (wagerOperator === "between" && wagerMin && wagerMax) {
        matchWager = stakeVal >= Number(wagerMin) && stakeVal <= Number(wagerMax);
      }

      return matchQuery && matchGames && matchWager;
    });
  }, [lobbies, searchQuery, selectedGames, wagerOperator, wagerValue, wagerMin, wagerMax]);

  const GAME_IMAGES = {
    rps: rockPaperScissors,
    shootout: penaltyShootout,
    reaction: reactionSignal,
    tictactoe: ticTacToe,
    prediction: predictionDuel,
  };

  // Translate game details helper
  const getGameVisuals = (id) => {
    const game = games.find((g) => g.id === id);
    return game ? { icon: game.icon, title: game.title, color: game.color } : { icon: "⚔️", title: "Skill Duel", color: "from-neutral-600 to-neutral-800" };
  };

  return (
    <div className="space-y-6">

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        {/* --- SECTOR 2: DIRECT SECURE DUEL LOBBY CODE (BALANCED HEIGHT REDESIGN) --- */}
<div className="order-1 lg:order-1 bg-[#0A0A0A] border border-white/[0.06] rounded-3xl p-6 flex flex-col justify-between space-y-5 relative overflow-hidden">
  
  {/* Glowing grid overlay decorative background */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.01] rounded-full blur-xl pointer-events-none" />

  {/* Header Section with live connection tag */}
  <div className="flex items-center justify-between">
    <div className="space-y-1">
      <h3 className="text-xs font-black tracking-widest text-neutral-100 uppercase flex items-center gap-1.5">
        <span>🔒 Direct Duel Portal</span>
      </h3>
      <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
        Establish an instantaneous connection to a custom-made peer challenge room.
      </p>
    </div>
  </div>

  {/* Action Row: Inputs & Paste Helpers */}
  <div className="space-y-2.5">
    <div className="flex gap-2 flex-col sm:flex-row">
      <input
        type="text"
        placeholder="Paste Duel Code (e.g., LEON-398282)"
        value={customRoomInput}
        onChange={(e) => setCustomRoomInput(e.target.value)}
        className="flex-1 bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl px-4 py-3 text-xs font-mono outline-none transition-all placeholder:text-neutral-600 uppercase text-white"
      />
      <button
        onClick={handleLoadCustomCode}
        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 border border-white/[0.08] hover:border-transparent hover:bg-emerald-500 hover:text-neutral-950 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
      >
        <Play size={12} fill="currentColor" />
        <span>Connect Peer</span>
      </button>
    </div>

    {/* Clipboard Fast Helper Link */}
    <button
      onClick={async () => {
        try {
          const text = await navigator.clipboard.readText();
          if (text.startsWith("LEON-")) {
            setCustomRoomInput(text);
            triggerToast("Lobby code pasted from clipboard!");
          } else {
            triggerToast("No valid duel code detected in clipboard.");
          }
        } catch (err) {
          triggerToast("Unable to access clipboard. Please paste manually.");
        }
      }}
      className="text-[10px] font-mono text-neutral-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
    >
      <span className="text-cyan-500/70">📋</span>
      <span>Autofill from Clipboard</span>
    </button>
  </div>

  {/* MINI STEP-BY-STEP USER GUIDE (Balances vertical height perfectly) */}
  <div className="border-t border-white/[0.04] pt-4 space-y-2.5">
    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">
      P2P Room Connection Matrix
    </span>

    <div className="grid grid-cols-3 gap-2 text-left">
      <div className="bg-white/[0.01] border border-white/[0.02] rounded-xl p-2.5 space-y-1">
        <span className="text-[10px] font-mono text-cyan-400 block font-bold">01. COPY</span>
        <p className="text-[9px] text-neutral-500 leading-normal font-light">
          Your opponent generates a private room code.
        </p>
      </div>

      <div className="bg-white/[0.01] border border-white/[0.02] rounded-xl p-2.5 space-y-1">
        <span className="text-[10px] font-mono text-cyan-400 block font-bold">02. INPUT</span>
        <p className="text-[9px] text-neutral-500 leading-normal font-light">
          Enter the code into this direct portal.
        </p>
      </div>

      <div className="bg-white/[0.01] border border-white/[0.02] rounded-xl p-2.5 space-y-1">
        <span className="text-[10px] font-mono text-emerald-400 block font-bold">03. DUEL</span>
        <p className="text-[9px] text-neutral-500 leading-normal font-light">
          Match instances sync and stake is loaded.
        </p>
      </div>
    </div>
  </div>

  {/* Connection Security Footer */}
  <div className="border-t border-white/[0.04] pt-3 flex items-center justify-between text-[9px] font-mono text-neutral-600">
    <span className="uppercase">Tunnel Encryption: AES-GCM-256</span>
    <span>STABLE TETHER</span>
  </div>

</div>

        {/* --- SECTOR 1: HIGH-IMPACT PREMIUM GAME HOSTING CAROUSEL --- */}
        <div className="order-2 lg:order-2 space-y-3">
          <h2 className="text-xs font-black tracking-widest text-neutral-400 uppercase">
            Host Custom Duel [Swipe Games]
          </h2>

          <div className="relative bg-[#0A0A0A] border border-white/[0.06] rounded-3xl p-6 overflow-hidden flex flex-col items-center">
            {/* Subtle grid backdrop decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none" />

            {/* Master Sliding Viewport wrapper */}
            <div className="relative w-full max-w-md h-[260px] flex items-center justify-center">
              
              {/* Visual preview list container */}
              <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                
                {/* Left Preview Slide */}
                <div className="w-1/6 h-[75%] rounded-2xl bg-neutral-950/60 border border-white/[0.02] opacity-20 transform -translate-x-4 scale-90 overflow-hidden hidden sm:block">
                  <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-900 flex items-center justify-center text-3xl">
                    {games[(carouselIdx === 0 ? games.length - 1 : carouselIdx - 1)]?.icon}
                  </div>
                </div>

                {/* Right Preview Slide */}
                <div className="w-1/6 h-[75%] rounded-2xl bg-neutral-950/60 border border-white/[0.02] opacity-20 transform translate-x-4 scale-90 overflow-hidden hidden sm:block">
                  <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-900 flex items-center justify-center text-3xl">
                    {games[(carouselIdx === games.length - 1 ? 0 : carouselIdx + 1)]?.icon}
                  </div>
                </div>

              </div>

              {/* Central Animated Active Image Tile */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIdx}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative w-3/4 sm:w-2/3 h-full rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <img
                    src={GAME_IMAGES[games[carouselIdx]?.id]}
                    alt={games[carouselIdx]?.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10 transition-opacity" />

                  <div className="group relative z-10 flex h-full flex-col justify-between p-6">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 font-bold">
                        Host Custom Duel
                      </span>
                      <h3 className="mt-2 text-xl font-extrabold text-white tracking-wide">
                        {games[carouselIdx]?.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleHostGameClick(games[carouselIdx]?.id)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-neutral-950 font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Host Duel
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Left Controller Arrow button */}
              <button
                onClick={handlePrev}
                className="absolute left-1 sm:-left-4 p-2.5 rounded-xl bg-neutral-900 border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer z-10"
                aria-label="Previous Game"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Right Controller Arrow button */}
              <button
                onClick={handleNext}
                className="absolute right-1 sm:-right-4 p-2.5 rounded-xl bg-neutral-900 border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer z-10"
                aria-label="Next Game"
              >
                <ChevronRight size={16} />
              </button>

            </div>

            {/* Stepper Dots indicator */}
            <div className="flex gap-1.5 mt-4 justify-center lg:justify-start">
              {games.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIdx(idx)}
                  className={`h-1 rounded-full transition-all cursor-pointer ${
                    carouselIdx === idx ? "w-4 bg-emerald-500" : "w-1.5 bg-neutral-800"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* --- SECTOR 3: ACTIVE DUELS FEED WITH FLEXIBLE MATRIX FILTERS --- */}
      <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden">
        
        {/* Advanced Filters Header */}
        <div className="p-5 border-b border-white/[0.04] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xs font-black tracking-widest text-neutral-400 uppercase mb-1">
                Active Duel Lobby Feed
              </h2>
              <p className="text-[11px] text-neutral-500">
                100% deterministic mathematical matchups. Combine checkboxes and filters to search.
              </p>
            </div>

            {/* Direct Player name search bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" size={12} />
              <input
                type="text"
                placeholder="Search creator / lobby ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl pl-9 pr-4 py-2 text-xs outline-none transition-all placeholder:text-neutral-600"
              />
            </div>
          </div>

          {/* Expanded Filter Panel */}
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-4">
            
            {/* Filter section 1: Game checklist checkboxes */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">
                Filter by Game type
              </span>
              <div className="flex flex-wrap gap-2">
                {games.map((game) => {
                  const isChecked = selectedGames.includes(game.id);
                  return (
                    <button
                      key={game.id}
                      onClick={() => handleToggleGameCheckbox(game.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isChecked
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-transparent border-white/[0.06] text-neutral-400 hover:text-neutral-300 hover:border-white/[0.12]"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded flex items-center justify-center border transition-all ${
                        isChecked ? "border-emerald-500 bg-emerald-500 text-neutral-950" : "border-neutral-700 bg-transparent"
                      }`}>
                        {isChecked && <Check size={8} strokeWidth={4} />}
                      </span>
                      <span>{game.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter section 2: Flexible wager inputs */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">
                Flexible Wager Filter (₦)
              </span>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Operator select dropdown */}
                <select
                  value={wagerOperator}
                  onChange={(e) => {
                    setWagerOperator(e.target.value);
                    setWagerValue("");
                    setWagerMin("");
                    setWagerMax("");
                  }}
                  className="bg-[#050505] border border-white/[0.08] rounded-xl px-3 py-2 text-xs outline-none text-neutral-300 cursor-pointer min-w-[150px]"
                >
                  <option value="all">Any Wager Size</option>
                  <option value="gt">Greater Than (&gt;)</option>
                  <option value="lt">Less Than (&lt;)</option>
                  <option value="eq">Equal To (=)</option>
                  <option value="between">Between Range</option>
                </select>

                {/* Single Operator Input */}
                {wagerOperator !== "all" && wagerOperator !== "between" && (
                  <input
                    type="number"
                    placeholder="Enter wager amount (₦)"
                    value={wagerValue}
                    onChange={(e) => setWagerValue(e.target.value)}
                    className="flex-1 max-w-[200px] bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl px-3 py-2 text-xs font-mono outline-none text-white"
                  />
                )}

                {/* Dual Between Operator Inputs */}
                {wagerOperator === "between" && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min ₦"
                      value={wagerMin}
                      onChange={(e) => setWagerMin(e.target.value)}
                      className="w-24 bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl px-3 py-2 text-xs font-mono outline-none text-white"
                    />
                    <span className="text-xs text-neutral-600 font-mono">and</span>
                    <input
                      type="number"
                      placeholder="Max ₦"
                      value={wagerMax}
                      onChange={(e) => setWagerMax(e.target.value)}
                      className="w-24 bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl px-3 py-2 text-xs font-mono outline-none text-white"
                    />
                  </div>
                )}

                {/* Reset filters action trigger */}
                {(selectedGames.length > 0 || searchQuery || wagerOperator !== "all") && (
                  <button
                    onClick={() => {
                      setSelectedGames([]);
                      setSearchQuery("");
                      setWagerOperator("all");
                      setWagerValue("");
                      setWagerMin("");
                      setWagerMax("");
                    }}
                    className="py-2 px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors ml-auto flex items-center gap-1 cursor-pointer"
                  >
                    <X size={10} /> Reset Matrix Filters
                  </button>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Duel Feeds List Grid */}
        <div className="divide-y divide-white/[0.04]">
          <AnimatePresence initial={false}>
            {filteredLobbies.length > 0 ? (
              filteredLobbies.map((lobby) => {
                const { icon, title, color } = getGameVisuals(lobby.gameId);
                return (
                  <motion.div
                    key={lobby.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors"
                  >
                    {/* Left Profile Details */}
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center text-xl shadow-lg shadow-black/40 shrink-0`}>
                        {icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{lobby.creator}</span>
                          <span className="text-[10px] font-mono text-neutral-500 bg-white/[0.04] px-1.5 py-0.5 rounded">
                            {lobby.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5">
                          <span>{title}</span>
                          <span className="text-neutral-600">•</span>
                          <span>created {lobby.timeCreated}</span>
                        </div>
                      </div>
                    </div>

                    {/* Center Stakes Display Details */}
                    <div className="flex items-center gap-6 self-stretch sm:self-auto justify-between sm:justify-start">
                      <div className="text-left sm:text-right">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block leading-none mb-0.5">
                          STAKE
                        </span>
                        <span className="text-xs font-mono font-bold text-neutral-300">
                          ₦{lobby.stake.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest block leading-none font-bold mb-0.5">
                          WIN POT
                        </span>
                        <span className="text-xs font-mono font-black text-emerald-400">
                          ₦{lobby.pot.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleJoinLobby(lobby)}
                        className="bg-neutral-900 hover:bg-emerald-500 hover:text-neutral-950 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1 border border-white/[0.06] hover:border-transparent cursor-pointer shrink-0"
                      >
                        <span>Accept Duel</span>
                        <ChevronRightSquare size={14} />
                      </button>
                    </div>

                  </motion.div>
                );
              })
            ) : (
              <div className="p-12 text-center text-neutral-500 text-xs">
                <Activity className="mx-auto mb-3 opacity-30 text-emerald-400" size={32} />
                No active lobbies fit your search parameters.<br />
                <button
                  onClick={() => {
                    setSelectedGames([]);
                    setWagerOperator("all");
                    setSearchQuery("");
                  }}
                  className="text-emerald-400 hover:underline mt-2 font-bold cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
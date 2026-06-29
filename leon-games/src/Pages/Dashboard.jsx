import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sword,
    Trophy,
    Wallet,
    History,
    Gift,
    Eye,
    EyeOff,
    Plus,
    Search,
    Users,
    Check,
    Copy,
    Play,
    X,
    ArrowRight,
    Clock,
    Sparkles,
    TrendingUp,
    Activity,
    User,
    LogOut,
    ChevronRight,
    AlertTriangle,
    Info
} from "lucide-react";

import { GAMES } from "../components/Dashboard/Games";
import { GlobalHeader } from "../components/Dashboard/Header";
import { NotificationsDrawer } from "../components/Dashboard/NotificationsDrawer";

// --- INITIAL MOCK LOBBIES ---
const INITIAL_LOBBIES = [
    { id: "LOB-9021", creator: "Chinedu_O", gameId: "rps", stake: 1000, pot: 1900, status: "open", timeCreated: "1m ago" },
    { id: "LOB-4412", creator: "Tunde_Dev", gameId: "reaction", stake: 500, pot: 950, status: "open", timeCreated: "2m ago" },
    { id: "LOB-8831", creator: "Abubakar_K", gameId: "shootout", stake: 2000, pot: 3800, status: "open", timeCreated: "3m ago" },
    { id: "LOB-2109", creator: "Seyi_Gamer", gameId: "tictactoe", stake: 200, pot: 380, status: "open", timeCreated: "5m ago" },
    { id: "LOB-7732", creator: "Ngozi_V", gameId: "prediction", stake: 5000, pot: 9500, status: "open", timeCreated: "7m ago" },
];

const MOCK_LEADERBOARD = [
    { rank: 1, name: "Tunde_Dev", wins: 142, earnings: 184500, avatar: "🟢" },
    { rank: 2, name: "Ngozi_V", wins: 121, earnings: 149000, avatar: "🟡" },
    { rank: 3, name: "Chinedu_O", wins: 98, earnings: 112000, avatar: "🔵" },
    { rank: 4, name: "Seyi_Gamer", wins: 84, earnings: 76400, avatar: "🟠" },
    { rank: 5, name: "Abubakar_K", wins: 73, earnings: 62000, avatar: "🟣" },
];

const MOCK_HISTORY = [
    { id: "M-4019", game: "Rock Paper Scissors", opponent: "Eze_R", outcome: "win", stake: 1000, delta: 950, date: "Today, 2:40 PM" },
    { id: "M-3981", game: "Reaction Challenge", opponent: "Chioma_X", outcome: "loss", stake: 500, delta: -500, date: "Today, 11:15 AM" },
    { id: "M-3820", game: "Penalty Shootout", opponent: "Tunde_Dev", outcome: "win", stake: 2000, delta: 1900, date: "Yesterday, 8:22 PM" },
    { id: "M-3712", game: "Tic Tac Toe", opponent: "Ngozi_V", outcome: "win", stake: 500, delta: 475, date: "2 days ago" },
];

export default function LeonDashboard() {
    // Navigation & Viewport States
    const [activeTab, setActiveTab] = useState("arena"); // "arena" | "leaderboards" | "wallet" | "history" | "referrals"
    const [isMobile, setIsMobile] = useState(false);

    // Wallet & Profile States
    const [balance, setBalance] = useState(12450.00);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    // Interactive Simulation States
    const [lobbies, setLobbies] = useState(INITIAL_LOBBIES);
    const [livePlayers, setLivePlayers] = useState(942);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGameFilter, setSelectedGameFilter] = useState("all");
    const [selectedStakeFilter, setSelectedStakeFilter] = useState("all"); // "all" | "low" (< 1000) | "high" (>= 1000)

    // Custom Duel Creation State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createGameId, setCreateGameId] = useState("rps");
    const [createStake, setCreateStake] = useState(1000);
    const [generatedDuelCode, setGeneratedDuelCode] = useState("");
    const [customRoomInput, setCustomRoomInput] = useState("");

    // Matchmaking / Queue Modal
    const [isQueueActive, setIsQueueActive] = useState(false);
    const [queueTime, setQueueTime] = useState(0);
    const [activeQueueGame, setActiveQueueGame] = useState(null);
    const [activeQueueStake, setActiveQueueStake] = useState(0);

    // Deposit Simulation Modal
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState(2000);

    // User notifications & UI Toast feedback
    const [toastMessage, setToastMessage] = useState(null);

    // --- NOTIFICATIONS STATE SHIFTED TO MAIN DASHBOARD ---
const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
const [notifications, setNotifications] = useState([
    { id: 1, type: "match", text: "Chinedu_O sent you a Rock Paper Scissors challenge.", time: "2m ago", unread: true, lobbyId: "LOB-9021" },
    { id: 2, type: "system", text: "Security node verification completed.", time: "1h ago", unread: false },
    { id: 3, type: "wallet", text: "Deposit of ₦2,000.00 processed successfully.", time: "3h ago", unread: false }
]);

    // Detect responsive window size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fluctuating real-time numbers simulation (Connection realism)
    useEffect(() => {
        const interval = setInterval(() => {
            // Small randomized shift in active player count
            setLivePlayers(prev => Math.max(920, prev + Math.floor(Math.random() * 7) - 3));

            // Occasionally simulate a new player listing a lobby
            if (Math.random() > 0.65) {
                const mockNames = ["Kelechi_Z", "Amaka_P", "Babatunde_99", "Yusuf_R", "Praise_O", "Efe_Ultimate"];
                const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
                const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)];
                const stakesOpts = [200, 500, 1000, 2000, 5000];
                const randomStake = stakesOpts[Math.floor(Math.random() * stakesOpts.length)];
                const newLobby = {
                    id: `LOB-${Math.floor(1000 + Math.random() * 9000)}`,
                    creator: randomName,
                    gameId: randomGame.id,
                    stake: randomStake,
                    pot: Math.floor(randomStake * 1.9),
                    status: "open",
                    timeCreated: "Just now"
                };
                setLobbies(prev => [newLobby, ...prev.slice(0, 8)]);
            }
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Matchmaking timer effect
    useEffect(() => {
        let timer;
        if (isQueueActive) {
            timer = setInterval(() => {
                setQueueTime(prev => prev + 1);

                // Dynamic match discovery simulation after 5 seconds
                if (queueTime > 4 && Math.random() > 0.8) {
                    triggerToast("Opponent Found! Connecting to peer node...");
                    setIsQueueActive(false);
                    // Simulate dynamic completion or game resolution subtraction/addition
                    setBalance(prev => prev - activeQueueStake);

                    // Redirect to a simulated completion event
                    setTimeout(() => {
                        const didWin = Math.random() > 0.45; // Simulated 55% win rate
                        const returnPot = Math.floor(activeQueueStake * 1.9);
                        if (didWin) {
                            setBalance(prev => prev + returnPot);
                            triggerToast(`🏆 Victory! You won the pot of ₦${returnPot.toLocaleString()}`);

                            // Add match entry dynamically to top of history
                            const dynamicMatch = {
                                id: `M-${Math.floor(4000 + Math.random() * 1000)}`,
                                game: GAMES.find(g => g.id === activeQueueGame)?.title || "Custom Challenge",
                                opponent: "SystemPeer_Match",
                                outcome: "win",
                                stake: activeQueueStake,
                                delta: returnPot - activeQueueStake,
                                date: "Just Now"
                            };
                            MOCK_HISTORY.unshift(dynamicMatch);
                        } else {
                            triggerToast(`💔 Defeat. Opponent claimed the pot.`);
                            const dynamicMatch = {
                                id: `M-${Math.floor(4000 + Math.random() * 1000)}`,
                                game: GAMES.find(g => g.id === activeQueueGame)?.title || "Custom Challenge",
                                opponent: "SystemPeer_Match",
                                outcome: "loss",
                                stake: activeQueueStake,
                                delta: -activeQueueStake,
                                date: "Just Now"
                            };
                            MOCK_HISTORY.unshift(dynamicMatch);
                        }
                    }, 3000);
                }
            }, 1000);
        } else {
            setQueueTime(0);
        }
        return () => clearInterval(timer);
    }, [isQueueActive, queueTime, activeQueueGame, activeQueueStake]);

    // Utility toast messenger
    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 4500);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        triggerToast("Code copied to clipboard!");
    };

    // Filter Logic execution
    const filteredLobbies = useMemo(() => {
        return lobbies.filter(lobby => {
            const matchQuery = lobby.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lobby.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchGame = selectedGameFilter === "all" || lobby.gameId === selectedGameFilter;

            let matchStake = true;
            if (selectedStakeFilter === "low") matchStake = lobby.stake < 1000;
            if (selectedStakeFilter === "high") matchStake = lobby.stake >= 1000;

            return matchQuery && matchGame && matchStake;
        });
    }, [lobbies, searchQuery, selectedGameFilter, selectedStakeFilter]);

    // Handle Join Lobby
    const handleJoinLobby = (lobby) => {
        if (balance < lobby.stake) {
            triggerToast("❌ Insufficient balance for this duel.");
            return;
        }
        setActiveQueueGame(lobby.gameId);
        setActiveQueueStake(lobby.stake);
        setIsQueueActive(true);
    };

    // Handle Custom Duel Creation Execution
    const handleCreateDuel = (e) => {
        e.preventDefault();
        if (balance < createStake) {
            triggerToast("❌ Insufficient balance to cover this stake.");
            return;
        }
        // Generate private code
        const uniqueRoomCode = `LEON-${Math.floor(100000 + Math.random() * 900000)}`;
        setGeneratedDuelCode(uniqueRoomCode);
        triggerToast("Custom Duel Room initialized!");
    };

    // Handle manual loading of code
    const handleLoadCustomCode = () => {
        if (!customRoomInput.trim()) {
            triggerToast("Please enter a valid lobby code.");
            return;
        }
        if (customRoomInput.startsWith("LEON-")) {
            const randomOpponentStake = 1000; // Simulated custom matchmaking baseline
            if (balance < randomOpponentStake) {
                triggerToast("❌ Insufficient balance to join this private match.");
                return;
            }
            setActiveQueueGame("rps");
            setActiveQueueStake(randomOpponentStake);
            setIsQueueActive(true);
        } else {
            triggerToast("Invalid Duel Room Code.");
        }
    };

    const handleDepositSubmit = (e) => {
        e.preventDefault();
        if (depositAmount <= 0) return;
        setBalance(prev => prev + Number(depositAmount));
        setIsDepositModalOpen(false);
        triggerToast(`💰 Loaded ₦${Number(depositAmount).toLocaleString()} into main wallet!`);
    };

    // Quick helper to translate game ID to readable icon/text
    const getGameVisuals = (id) => {
        const game = GAMES.find(g => g.id === id);
        return game ? { icon: game.icon, title: game.title, color: game.color } : { icon: "⚔️", title: "Skill Duel", color: "from-neutral-600 to-neutral-800" };
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 selection:text-white relative overflow-x-hidden pb-24 lg:pb-0">

            {/* BACKGROUND AMBIENT GLOWS */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.01] blur-[150px] pointer-events-none" />
            <div className="absolute top-[30%] right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.01] blur-[180px] pointer-events-none" />

            {/* --- NOTIFICATION TOAST BAR --- */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#121212] border border-emerald-500/30 shadow-[0_8px_30px_rgba(34,197,94,0.15)] rounded-xl px-4 py-3.5 flex items-center gap-3 max-w-sm w-full md:w-auto"
                    >
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <span className="text-xs font-medium text-neutral-200">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <GlobalHeader
    livePlayers={livePlayers}
    balance={balance}
    isBalanceVisible={isBalanceVisible}
    setIsBalanceVisible={setIsBalanceVisible}
    setIsDepositModalOpen={setIsDepositModalOpen}
    unreadCount={notifications.filter(n => n.unread).length}
    onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
/>

            {/* --- MASTER CONTAINER FOR MAIN LAYOUT --- */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex gap-8">

                {/* --- PERSISTENT LEFT SIDEBAR (DESKTOP) --- */}
                <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-6">
                    <nav className="flex flex-col gap-1 bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-3">
                        <button
                            onClick={() => setActiveTab("arena")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "arena"
                                    ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            <Sword size={14} className={activeTab === "arena" ? "text-emerald-400" : ""} />
                            <span>Duel Arena</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("leaderboards")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "leaderboards"
                                    ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            <Trophy size={14} className={activeTab === "leaderboards" ? "text-emerald-400" : ""} />
                            <span>Leaderboards</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("wallet")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "wallet"
                                    ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            <Wallet size={14} className={activeTab === "wallet" ? "text-emerald-400" : ""} />
                            <span>My Wallet</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("history")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "history"
                                    ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            <History size={14} className={activeTab === "history" ? "text-emerald-400" : ""} />
                            <span>Duel History</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("referrals")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "referrals"
                                    ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            <Gift size={14} className={activeTab === "referrals" ? "text-emerald-400" : ""} />
                            <span>Refer & Earn</span>
                        </button>
                    </nav>

                    {/* Quick Stats sidebar widget */}
                    <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-3.5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.02] rounded-full blur-xl pointer-events-none" />
                        <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">Your Performance</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                                <span className="text-[10px] text-neutral-500 block">WIN RATE</span>
                                <span className="text-sm font-mono font-extrabold text-neutral-200">58.3%</span>
                            </div>
                            <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
                                <span className="text-[10px] text-neutral-500 block">TOTAL POTS</span>
                                <span className="text-sm font-mono font-extrabold text-emerald-400">24</span>
                            </div>
                        </div>
                    </div>

                    {/* Promotional Card referral program */}
                    <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden">
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                        <span className="bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 font-bold px-2.5 py-1 rounded-full self-start">PROMO</span>
                        <h4 className="text-xs font-bold leading-relaxed">Refer Friends &amp; Get ₦500 instantly on their first match win!</h4>
                        <button
                            onClick={() => setActiveTab("referrals")}
                            className="text-[10px] font-bold text-neutral-400 hover:text-white transition-colors flex items-center gap-1 mt-1 cursor-pointer"
                        >
                            <span>View program</span>
                            <ArrowRight size={10} />
                        </button>
                    </div>
                </aside>

                {/* --- MAIN CORE PANEL WORKSPACE --- */}
                <main className="flex-1 min-w-0">

                    <AnimatePresence mode="wait">

                        {/* VIEW 1: ARENA (LOBBIES & SELECTORS) */}
                        {activeTab === "arena" && (
                            <motion.div
                                key="arena-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >

                                {/* PRIVATE DUEL PANEL & QUICK MATCH CODE ENTRY */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* Join Private Room section */}
                                    <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider mb-1">
                                                🔒 Direct Duel Code
                                            </h3>
                                            <p className="text-xs text-neutral-400 font-light mb-4">
                                                Have a private lobby code from a peer? Load it below to initiate your match direct connection.
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Paste Duel Code (e.g., LEON-398282)"
                                                value={customRoomInput}
                                                onChange={(e) => setCustomRoomInput(e.target.value)}
                                                className="flex-1 bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl px-3 py-2 text-xs font-mono outline-none transition-all placeholder:text-neutral-600 uppercase"
                                            />
                                            <button
                                                onClick={handleLoadCustomCode}
                                                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                            >
                                                <Play size={12} fill="currentColor" />
                                                <span>JOIN</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Create Custom Duel banner card */}
                                    <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.02] rounded-full blur-2xl pointer-events-none" />
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider mb-1">
                                                ⚔️ Host Custom Duel
                                            </h3>
                                            <p className="text-xs text-neutral-400 font-light mb-4">
                                                Generate a custom duel workspace. Set your rules, define game types, and challenge a specific user.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setIsCreateModalOpen(true)}
                                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-[#050505] font-black text-xs py-2.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(34,197,94,0.15)] flex items-center justify-center gap-1.5 cursor-pointer"
                                        >
                                            <Plus size={14} strokeWidth={3} />
                                            <span>CREATE CHALLENGE ROOM</span>
                                        </button>
                                    </div>

                                </div>

                                {/* --- SECTOR 1: CORE GAME SELECTOR SCROLL --- */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xs font-black tracking-widest text-neutral-400 uppercase">
                                            Select Skill Game [5 Games]
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                                        {GAMES.map((game) => (
                                            <div
                                                key={game.id}
                                                onClick={() => {
                                                    setSelectedGameFilter(game.id);
                                                    triggerToast(`Lobbies filtered to ${game.title}`);
                                                }}
                                                className={`group relative flex flex-col justify-between bg-[#0A0A0A] border rounded-2xl p-4 cursor-pointer transition-all duration-300 select-none overflow-hidden ${selectedGameFilter === game.id
                                                        ? "border-emerald-500/40 shadow-[0_4px_20px_rgba(34,197,94,0.06)] scale-[1.02] bg-[#111111]"
                                                        : "border-white/[0.06] hover:border-white/[0.12]"
                                                    }`}
                                            >
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.01] rounded-full blur-xl pointer-events-none group-hover:scale-110 transition-transform" />

                                                <div>
                                                    <span className="text-2xl mb-3 block">{game.icon}</span>
                                                    <h3 className="text-xs font-bold tracking-wide group-hover:text-emerald-400 transition-colors">
                                                        {game.title}
                                                    </h3>
                                                    <span className="text-[10px] text-neutral-500 block font-light line-clamp-1 mt-0.5">
                                                        {game.tagline}
                                                    </span>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-[9px] font-mono text-neutral-400 bg-white/[0.04] px-1.5 py-0.5 rounded">
                                                        {game.activeDuels} open
                                                    </span>
                                                    <span className="text-[9px] font-mono text-emerald-400 font-semibold">
                                                        ₦{game.minStake}+
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* --- SECTOR 2: OPEN LOBBIES / ACTIVE DUELS CHANNELS --- */}
                                <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden">

                                    {/* Header & Feed Controls */}
                                    <div className="p-4 md:p-6 border-b border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">

                                        <div>
                                            <h2 className="text-xs font-black tracking-widest text-neutral-400 uppercase mb-1">
                                                Active Duel Lobby Feed
                                            </h2>
                                            <p className="text-[11px] text-neutral-500">
                                                100% deterministic mathematical matchups. Click Join to match and accept stakes.
                                            </p>
                                        </div>

                                        {/* Filter controls */}
                                        <div className="flex flex-wrap items-center gap-2">

                                            {/* Search Bar Input */}
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" size={12} />
                                                <input
                                                    type="text"
                                                    placeholder="Search creator/id"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none transition-all placeholder:text-neutral-600 w-44"
                                                />
                                            </div>

                                            {/* Game Filter Button */}
                                            {selectedGameFilter !== "all" && (
                                                <button
                                                    onClick={() => setSelectedGameFilter("all")}
                                                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-white hover:border-transparent text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                                >
                                                    <span>Game: {selectedGameFilter.toUpperCase()}</span>
                                                    <X size={10} />
                                                </button>
                                            )}

                                            {/* Stake Level Filter Dropdown */}
                                            <select
                                                value={selectedStakeFilter}
                                                onChange={(e) => setSelectedStakeFilter(e.target.value)}
                                                className="bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.12] rounded-lg px-2 py-1.5 text-xs outline-none text-neutral-300 transition-all cursor-pointer"
                                            >
                                                <option value="all" className="bg-[#0A0A0A] text-white">All Stakes</option>
                                                <option value="low" className="bg-[#0A0A0A] text-white">&lt; ₦1,000</option>
                                                <option value="high" className="bg-[#0A0A0A] text-white">₦1,000 +</option>
                                            </select>

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
                                                            {/* Left Profile details */}
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center text-xl shadow-lg shadow-black/40`}>
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

                                                            {/* Center Stakes display details */}
                                                            <div className="flex items-center gap-6 self-stretch sm:self-auto justify-between sm:justify-start">
                                                                <div className="text-left sm:text-right">
                                                                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block leading-none">
                                                                        STAKE
                                                                    </span>
                                                                    <span className="text-xs font-mono font-bold text-neutral-300">
                                                                        ₦{lobby.stake.toLocaleString()}
                                                                    </span>
                                                                </div>

                                                                <div className="text-left sm:text-right">
                                                                    <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest block leading-none font-bold">
                                                                        WIN POT
                                                                    </span>
                                                                    <span className="text-xs font-mono font-black text-emerald-400">
                                                                        ₦{lobby.pot.toLocaleString()}
                                                                    </span>
                                                                </div>

                                                                <button
                                                                    onClick={() => handleJoinLobby(lobby)}
                                                                    className="bg-neutral-900 hover:bg-emerald-500 hover:text-[#050505] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1 border border-white/[0.06] hover:border-transparent cursor-pointer"
                                                                >
                                                                    <span>Accept Duel</span>
                                                                    <ChevronRight size={14} />
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
                                                            setSelectedGameFilter("all");
                                                            setSelectedStakeFilter("all");
                                                            setSearchQuery("");
                                                        }}
                                                        className="text-emerald-400 hover:underline mt-2 font-bold cursor-pointer"
                                                    >
                                                        Reset filters
                                                    </button>
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                </div>

                            </motion.div>
                        )}

                        {/* VIEW 2: LEADERBOARDS */}
                        {activeTab === "leaderboards" && (
                            <motion.div
                                key="leaderboards-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />

                                    <div className="flex items-center gap-2 mb-2">
                                        <Trophy className="text-amber-500" size={18} />
                                        <h2 className="text-sm font-black tracking-widest text-neutral-400 uppercase">
                                            Global Skill Champions
                                        </h2>
                                    </div>
                                    <p className="text-xs text-neutral-400 font-light mb-6">
                                        Top players ranked on verifiable skill-based net wins and matchmaking consistency. Updated hourly.
                                    </p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs text-neutral-400">
                                            <thead>
                                                <tr className="border-b border-white/[0.04] text-[10px] uppercase font-mono tracking-widest">
                                                    <th className="py-3 px-4">Rank</th>
                                                    <th className="py-3 px-4">Player ID</th>
                                                    <th className="py-3 px-4 text-center">Wins</th>
                                                    <th className="py-3 px-4 text-right">Net Profit</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.02]">
                                                {MOCK_LEADERBOARD.map((p) => (
                                                    <tr key={p.rank} className="hover:bg-white/[0.01] transition-colors">
                                                        <td className="py-3.5 px-4 font-mono font-bold">
                                                            {p.rank === 1 ? "🏆 " : p.rank === 2 ? "🥈 " : p.rank === 3 ? "🥉 " : ""}
                                                            {p.rank}
                                                        </td>
                                                        <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                                                            <span>{p.avatar}</span>
                                                            <span>{p.name}</span>
                                                        </td>
                                                        <td className="py-3.5 px-4 text-center font-mono font-medium text-neutral-300">{p.wins}</td>
                                                        <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">₦{p.earnings.toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 3: WALLET & TRANSACTION HISTORY */}
                        {activeTab === "wallet" && (
                            <motion.div
                                key="wallet-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    {/* Account Balance card details */}
                                    <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 md:col-span-2">
                                        <h2 className="text-xs font-black tracking-widest text-neutral-400 uppercase mb-4">
                                            My Balance Details
                                        </h2>
                                        <div className="flex items-baseline gap-2.5 mb-6">
                                            <span className="text-3xl font-mono font-black text-emerald-400">
                                                ₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </span>
                                            <span className="text-xs text-neutral-500 font-medium">NGN Available</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setIsDepositModalOpen(true)}
                                                className="bg-emerald-500 hover:bg-emerald-600 text-[#050505] font-extrabold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-[0_4px_15px_rgba(34,197,94,0.15)] flex-1 text-center"
                                            >
                                                Deposit Cash
                                            </button>
                                            <button
                                                onClick={() => triggerToast("Payout channels offline. Contact administrator for direct withdrawal.")}
                                                className="bg-neutral-900 hover:bg-neutral-800 border border-white/[0.06] text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer flex-1 text-center"
                                            >
                                                Request Payout
                                            </button>
                                        </div>
                                    </div>

                                    {/* Operational Information Banner */}
                                    <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                                                <Info size={14} />
                                                <span>ZERO RISK SYSTEM</span>
                                            </div>
                                            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                                                Leon Games utilizes dynamic 1v1 multi-player state synchronization. Capital is locked on match validation, ensuring direct payouts directly to players with zero platform custody delays.
                                            </p>
                                        </div>
                                        <span className="text-[10px] font-mono text-neutral-500 block mt-4 border-t border-white/[0.04] pt-3">
                                            100% Guaranteed Settlement
                                        </span>
                                    </div>

                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 4: DUEL HISTORY */}
                        {activeTab === "history" && (
                            <motion.div
                                key="history-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-xs font-black tracking-widest text-neutral-400 uppercase mb-1">
                                                Recent Duel History
                                            </h2>
                                            <p className="text-[11px] text-neutral-500">
                                                Chronological report of past 1v1 matches resolved by the peer nodes.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {MOCK_HISTORY.map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${item.outcome === "win" ? "bg-emerald-500 animate-pulse" : "bg-neutral-700"}`} />
                                                    <div>
                                                        <span className="text-xs font-bold block text-white">{item.game}</span>
                                                        <span className="text-[10px] text-neutral-500 block mt-0.5">
                                                            vs {item.opponent} • id: {item.id}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 self-stretch sm:self-auto justify-between sm:justify-start">
                                                    <span className="text-[11px] text-neutral-400 font-mono">{item.date}</span>
                                                    <div className="text-right">
                                                        <span className={`text-xs font-mono font-bold ${item.outcome === "win" ? "text-emerald-400" : "text-neutral-500"}`}>
                                                            {item.outcome === "win" ? `+₦${item.delta.toLocaleString()}` : `-₦${Math.abs(item.delta).toLocaleString()}`}
                                                        </span>
                                                        <span className="text-[9px] text-neutral-600 block">Stake: ₦{item.stake.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 5: REFERRALS */}
                        {activeTab === "referrals" && (
                            <motion.div
                                key="referrals-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

                                    <h2 className="text-xs font-black tracking-widest text-neutral-400 uppercase mb-2">
                                        Referral Dashboard
                                    </h2>
                                    <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6 max-w-lg">
                                        Build passive capital stream. Copy your unique partner link below. Every single friend who deposits and resolves their first victory awards you <strong className="text-emerald-400 font-semibold">₦500.00</strong> instantly.
                                    </p>

                                    <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl flex flex-col md:flex-row items-center gap-4 justify-between max-w-xl">
                                        <div className="text-center md:text-left">
                                            <span className="text-[10px] font-mono text-neutral-500 block uppercase">YOUR CODE</span>
                                            <span className="text-sm font-mono font-black tracking-wider text-neutral-200">LEON_PARTNER_9012</span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard("https://leongames.com/ref/LEON_PARTNER_9012")}
                                            className="bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl border border-white/[0.08] transition-all flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <Copy size={12} />
                                            <span>COPY LINK</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>

                </main>

            </div>

            {/* --- MOBILE STICKY BOTTOM BAR NAVIGATION --- */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A] border-t border-white/[0.06] px-4 py-3 flex justify-around items-center shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
                    <button
                        onClick={() => setActiveTab("arena")}
                        className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "arena" ? "text-emerald-400" : "text-neutral-500"}`}
                    >
                        <Sword size={16} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Arena</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("leaderboards")}
                        className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "leaderboards" ? "text-emerald-400" : "text-neutral-500"}`}
                    >
                        <Trophy size={16} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Leaderboards</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("wallet")}
                        className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "wallet" ? "text-emerald-400" : "text-neutral-500"}`}
                    >
                        <Wallet size={16} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Wallet</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("history")}
                        className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "history" ? "text-emerald-400" : "text-neutral-500"}`}
                    >
                        <History size={16} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">History</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("referrals")}
                        className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "referrals" ? "text-emerald-400" : "text-neutral-500"}`}
                    >
                        <Gift size={16} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Invites</span>
                    </button>
                </div>
            )}


            {/* --- MODAL 1: CREATE CUSTOM DUEL CHALLENGE --- */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsCreateModalOpen(false);
                                setGeneratedDuelCode("");
                            }}
                            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-sm"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ scale: 0.95, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 15 }}
                            className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 md:p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6"
                        >

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sword size={16} className="text-emerald-400" />
                                    <h3 className="text-sm font-bold tracking-widest text-neutral-300 uppercase">
                                        Initialize Custom Challenge
                                    </h3>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsCreateModalOpen(false);
                                        setGeneratedDuelCode("");
                                    }}
                                    className="p-1 rounded bg-neutral-900 border border-white/[0.04] text-neutral-400 hover:text-white cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {!generatedDuelCode ? (
                                <form onSubmit={handleCreateDuel} className="space-y-4">

                                    {/* Select game dropdown */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                                            Skill game type
                                        </label>
                                        <select
                                            value={createGameId}
                                            onChange={(e) => setCreateGameId(e.target.value)}
                                            className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs outline-none text-white focus:border-emerald-500/50"
                                        >
                                            {GAMES.map(g => (
                                                <option key={g.id} value={g.id} className="bg-[#0A0A0A] text-white">
                                                    {g.icon} {g.title} (min: ₦{g.minStake})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Preset stakes buttons */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                                            STAKE SIZE (POT 1.9X)
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {[200, 500, 1000, 5000].map(val => (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => setCreateStake(val)}
                                                    className={`py-2 text-xs font-mono font-bold rounded-lg transition-all border cursor-pointer ${createStake === val
                                                            ? "bg-emerald-500 text-[#050505] border-transparent font-black"
                                                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                                                        }`}
                                                >
                                                    ₦{val}
                                                </button>
                                            ))}
                                        </div>

                                        <input
                                            type="number"
                                            value={createStake}
                                            onChange={(e) => setCreateStake(Number(e.target.value))}
                                            className="w-full mt-2 bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs font-mono outline-none text-white placeholder:text-neutral-700"
                                            placeholder="Enter custom stake quantity"
                                            min={100}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-[#050505] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_15px_rgba(34,197,94,0.15)] flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                                    >
                                        <span>Generate Secure Lobby Code</span>
                                    </button>

                                </form>
                            ) : (
                                <div className="space-y-4 text-center">
                                    <div className="bg-white/[0.02] border border-white/[0.04] p-5 rounded-xl space-y-3">
                                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                                            SHARE ROOM CODE WITH OPPONENT
                                        </span>

                                        <span className="text-xl font-mono font-black text-cyan-400 tracking-wider select-all block">
                                            {generatedDuelCode}
                                        </span>

                                        <p className="text-[10px] text-neutral-400 font-light leading-normal max-w-xs mx-auto">
                                            Once your opponent enters this code on their private lobby viewport, your matching instances will synchronize instantly.
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copyToClipboard(generatedDuelCode)}
                                            className="bg-neutral-950 hover:bg-neutral-900 border border-white/[0.06] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 flex-1 justify-center cursor-pointer"
                                        >
                                            <Copy size={12} />
                                            <span>COPY CODE</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsCreateModalOpen(false);
                                                setGeneratedDuelCode("");
                                            }}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-[#050505] font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex-1 justify-center cursor-pointer"
                                        >
                                            Close Workspace
                                        </button>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* --- MODAL 2: MATCHMAKING / QUEUE TIMER SCREEN --- */}
            <AnimatePresence>
                {isQueueActive && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                        {/* Blur block backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#050505]/98 backdrop-blur-md"
                        />

                        {/* Main Interactive Queue Graphic */}
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="text-center space-y-6 max-w-sm relative z-10"
                        >

                            {/* Dynamic spinning radar ring */}
                            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-emerald-500/10" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
                                    className="absolute inset-0 rounded-full border-t-2 border-r border-emerald-500/40"
                                />

                                <div className="w-20 h-20 rounded-full bg-[#0A0A0A] border border-white/[0.06] flex items-center justify-center text-3xl">
                                    ⚔️
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                                    SECURE CONNECTION INITIALIZED
                                </span>
                                <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">
                                    Matching Peer Nodes...
                                </h3>

                                {/* Simulated game & stake metadata information */}
                                <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-300">
                                    <span>{GAMES.find(g => g.id === activeQueueGame)?.title || "Skill Game"}</span>
                                    <span className="text-neutral-600">|</span>
                                    <span className="text-emerald-400 font-bold">₦{activeQueueStake.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Stopwatch Time counters */}
                            <div className="bg-[#0A0A0A]/80 border border-white/[0.06] py-3.5 px-6 rounded-xl inline-block">
                                <span className="text-[10px] font-mono text-neutral-500 block uppercase mb-0.5">
                                    ELAPSED TIME
                                </span>
                                <span className="text-2xl font-mono font-black text-neutral-100">
                                    00:{queueTime.toString().padStart(2, "0")}
                                </span>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        setIsQueueActive(false);
                                        triggerToast("Matchmaking queue cancelled.");
                                    }}
                                    className="bg-neutral-900 hover:bg-rose-500/10 border border-white/[0.06] hover:border-rose-500/20 text-neutral-400 hover:text-rose-400 font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel Match Search
                                </button>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* --- MODAL 3: CASH DEPOSIT (SPORTYBET SIMULATION STYLES) --- */}
            <AnimatePresence>
                {isDepositModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDepositModalOpen(false)}
                            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-sm"
                        />

                        {/* Modal Body */}
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 md:p-8 max-w-sm w-full relative z-10 shadow-2xl space-y-5"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Wallet size={16} className="text-emerald-400" />
                                    <h3 className="text-sm font-bold tracking-widest text-neutral-300 uppercase">
                                        Refill Main Wallet
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsDepositModalOpen(false)}
                                    className="p-1 rounded bg-neutral-900 border border-white/[0.04] text-neutral-400 hover:text-white cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <form onSubmit={handleDepositSubmit} className="space-y-4">

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                                        DEPOSIT AMOUNT (₦)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-neutral-400">
                                            ₦
                                        </span>
                                        <input
                                            type="number"
                                            required
                                            value={depositAmount}
                                            onChange={(e) => setDepositAmount(Number(e.target.value))}
                                            className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-emerald-500/50 rounded-xl pl-8 pr-3 py-3 text-sm font-mono outline-none text-white"
                                            placeholder="Amount"
                                            min={100}
                                        />
                                    </div>
                                </div>

                                {/* Preset deposit buttons */}
                                <div className="grid grid-cols-4 gap-2">
                                    {[500, 1000, 2000, 5000].map(val => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setDepositAmount(val)}
                                            className={`py-1.5 text-xs font-mono font-medium rounded-lg transition-all border cursor-pointer ${depositAmount === val
                                                    ? "bg-emerald-400 text-neutral-950 border-transparent font-bold"
                                                    : "bg-white/[0.01] border-white/[0.06] hover:bg-white/[0.03]"
                                                }`}
                                        >
                                            ₦{val}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-start gap-2 text-[10px] text-neutral-400 leading-normal font-light">
                                    <Info size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                                    <span>Simulated transaction. Accepting matches executes direct peer funding tests. No real credit cards needed in sandbox environment.</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-[#050505] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_15px_rgba(34,197,94,0.15)] cursor-pointer mt-4"
                                >
                                    Complete Instant Deposit
                                </button>

                            </form>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
                {/* --- MODAL 4: SLIDE-IN NOTIFICATIONS DRAWER --- */}
<NotificationsDrawer
    isOpen={isNotificationsOpen}
    onClose={() => setIsNotificationsOpen(false)}
    notifications={notifications}
    setNotifications={setNotifications}
    onAcceptDuel={(lobbyId) => {
        setIsNotificationsOpen(false);
        const lobby = lobbies.find(l => l.id === lobbyId);
        if (lobby) handleJoinLobby(lobby);
    }}
/>
        </div>
    );
}
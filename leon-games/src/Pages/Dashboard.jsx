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
    Info,
    Lock 
} from "lucide-react";

import { GAMES } from "../components/Dashboard/Games";
import { GlobalHeader } from "../components/Dashboard/Header";
import { NotificationsDrawer } from "../components/Dashboard/NotificationsDrawer";
import { RewardsDrawer } from "../components/Dashboard/RewardsDrawer";
import { ProfileDrawer } from "../components/Dashboard/ProfileDrawer";
import { DuelArena } from "../components/Dashboard/DuelArena";
import { PerformancePanel } from "../components/Dashboard/PerformancePanel";
import { HistoryPanel } from "../components/Dashboard/HistoryPanel";
import { SettingsPanel } from "../components/Dashboard/SettingsPanel";
import { ReferralsPanel } from "../components/Dashboard/ReferralsPanel";
import { LeaderboardModal } from "../components/Dashboard/LeaderboardModal";
import { ChatbotModal } from "../components/Dashboard/ChatbotModal";

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

// Locate MOCK_HISTORY at the top of LeonDashboard.jsx and update dates:
const MOCK_HISTORY = [
    { id: "M-4019", game: "Rock Paper Scissors", opponent: "Eze_R", outcome: "win", stake: 1000, delta: 950, date: "Monday, June 29, 2026 at 2:40 PM" },
    { id: "M-3981", game: "Reaction Challenge", opponent: "Chioma_X", outcome: "loss", stake: 500, delta: -500, date: "Monday, June 29, 2026 at 11:15 AM" },
    { id: "M-3820", game: "Penalty Shootout", opponent: "Tunde_Dev", outcome: "win", stake: 2000, delta: 1900, date: "Sunday, June 28, 2026 at 8:22 PM" },
    { id: "M-3712", game: "Tic Tac Toe", opponent: "Ngozi_V", outcome: "win", stake: 500, delta: 475, date: "Friday, June 26, 2026 at 4:32 PM" },
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

    // --- NOTIFICATIONS & REWARDS DRAWERS STATE ---
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isRewardsOpen, setIsRewardsOpen] = useState(false);

    const [notifications, setNotifications] = useState([
        { id: 1, type: "match", text: "Chinedu_O sent you a Rock Paper Scissors challenge.", time: "2m ago", unread: true, lobbyId: "LOB-9021" },
        { id: 2, type: "system", text: "Security node verification completed.", time: "1h ago", unread: false },
        { id: 3, type: "wallet", text: "Deposit of ₦2,000.00 processed successfully.", time: "3h ago", unread: false }
    ]);

    const [isProfileOpen, setIsProfileOpen] = useState(false);


    const [rewards, setRewards] = useState([
        { id: 1, title: "Daily Login Loyalty Boost", date: "Today, 8:05 AM", value: "+₦50.00", status: "claimed" },
        { id: 2, title: "Double Match Multiplier Active", date: "Today, 10:11 AM", value: "Multiplier", status: "active" },
        { id: 3, title: "Peer Referral Bonus payout", date: "Yesterday, 4:21 PM", value: "+₦500.00", status: "claimed" }
    ]);
    // Detect responsive window size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const isDrawerOpen = isNotificationsOpen || isRewardsOpen || isProfileOpen;
        const previousOverflow = document.body.style.overflow;

        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = previousOverflow;
        }

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isNotificationsOpen, isRewardsOpen, isProfileOpen]);

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
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 selection:text-white relative overflow-x-hidden overflow-hidden pb-24 lg:pb-0">

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
                onToggleNotifications={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsRewardsOpen(false);
                    setIsProfileOpen(false);
                }}
                onToggleRewards={() => {
                    setIsRewardsOpen(!isRewardsOpen);
                    setIsNotificationsOpen(false);
                    setIsProfileOpen(false);
                }}
                onToggleProfile={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationsOpen(false);
                    setIsRewardsOpen(false);
                }}
            />

            {/* --- MASTER CONTAINER FOR MAIN LAYOUT --- */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex gap-8 h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] overflow-hidden">

                {/* --- PERSISTENT LEFT SIDEBAR (DESKTOP) --- */}
                <aside className="hidden lg:flex flex-col justify-center w-64 shrink-0 gap-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
                            onClick={() => setActiveTab("performance")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "performance"
                                ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
                                : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            <TrendingUp size={14} className={activeTab === "performance" ? "text-emerald-400" : ""} />
                            <span>Performance</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("history")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "history"
                                ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
                                : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                                }`}
                        >
                            <History size={14} className={activeTab === "history" ? "text-emerald-400" : ""} />
                            <span>History</span>
                        </button>
<button
    onClick={() => setActiveTab("settings")}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === "settings"
        ? "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500 text-white"
        : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
        }`}
>
    <Lock size={14} className={activeTab === "settings" ? "text-emerald-400" : ""} />
    <span>Settings</span>
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
                <main className="flex-1 min-w-0 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="w-full py-6">
                        <AnimatePresence mode="wait">

                        {/* VIEW 1: ARENA (RE-ARCHITECTED LOBBIES & CAROUSEL SELECTORS) */}
                        {activeTab === "arena" && (
                            <motion.div
                                key="arena-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center"
                            >
                                <DuelArena
                                    games={GAMES}
                                    lobbies={lobbies}
                                    balance={balance}
                                    handleJoinLobby={handleJoinLobby}
                                    setIsCreateModalOpen={setIsCreateModalOpen}
                                    setCreateGameId={setCreateGameId}
                                    triggerToast={triggerToast}
                                />
                            </motion.div>
                        )}

                        {/* VIEW 2: DETAILED SYSTEM PERFORMANCE */}
                        {activeTab === "performance" && (
                            <motion.div
                                key="performance-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <PerformancePanel currentBalance={balance} />
                            </motion.div>
                        )}

                        {/* VIEW 3: SYSTEM AND ACCOUNT SETTINGS */}
{activeTab === "settings" && (
    <motion.div
        key="settings-view"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6"
    >
        <SettingsPanel triggerToast={triggerToast} />
    </motion.div>
)}

                        {/* VIEW 4: SEGMENTED HISTORY HUB (DUELS & TRANSACTIONS) */}
                        {activeTab === "history" && (
                            <motion.div
                                key="history-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <HistoryPanel duelHistory={MOCK_HISTORY} />
                            </motion.div>
                        )}

                        {/* VIEW 5: INTEGRATED REFERRALS PANEL WITH SOCIAL SHARES */}
{activeTab === "referrals" && (
    <motion.div
        key="referrals-view"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6"
    >
        <ReferralsPanel 
            referralCode="LEON_PARTNER_9012"
            referralUrl="https://leongames.com/ref/LEON_PARTNER_9012"
            triggerToast={triggerToast}
        />
    </motion.div>
)}

                        </AnimatePresence>
                    </div>
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
            onClick={() => setActiveTab("performance")}
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "performance" ? "text-emerald-400" : "text-neutral-500"}`}
        >
            <TrendingUp size={16} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Performance</span>
        </button>

       

        <button
            onClick={() => setActiveTab("history")}
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "history" ? "text-emerald-400" : "text-neutral-500"}`}
        >
            <History size={16} />
            <span className="text-[9px] font-bold uppercase tracking-wider">History</span>
        </button>

         <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === "settings" ? "text-emerald-400" : "text-neutral-500"}`}
        >
            <Lock size={16} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Settings</span>
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
            <AnimatePresence>
                {isNotificationsOpen && (
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
                )}
            </AnimatePresence>

            {/* --- MODAL 5: SLIDE-IN REWARDS DRAWER --- */}
            <AnimatePresence>
                {isRewardsOpen && (
                    <RewardsDrawer
                        isOpen={isRewardsOpen}
                        onClose={() => setIsRewardsOpen(false)}
                        rewards={rewards}
                        totalRewardsClaimed={3450.00}
                    />
                )}
            </AnimatePresence>

            {/* --- MODAL 6: SLIDE-IN PROFILE DRAWER --- */}
            <AnimatePresence>
                {isProfileOpen && (
                    <ProfileDrawer
                        isOpen={isProfileOpen}
                        onClose={() => setIsProfileOpen(false)}
                        username="UserPeer_99"
                        balanceBreakdown={{
                            total: balance,
                            deposited: 5000.00,
                            gameEarnings: 4000.00,
                            rewards: 3450.00
                        }}
                        wagerPoints={350} // Silver Rank
                        setIsDepositModalOpen={setIsDepositModalOpen}
                        onWithdrawRequest={() => triggerToast("Payout channels offline. Contact administrator.")}
                    />
                )}
            </AnimatePresence>

            {/* --- FLOATING BALL & CENTERED LEADERBOARD MODAL --- */}
            <LeaderboardModal />

            
            {/* --- FLOATING BALL & SLIDING CHATBOT MODAL --- */}
            <ChatbotModal triggerToast={triggerToast} />
        </div>
    );
}
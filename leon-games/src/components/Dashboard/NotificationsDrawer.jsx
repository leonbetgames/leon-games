import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  Bell, 
  Sword, 
  CheckCircle, 
  Wallet, 
  Info, 
  Trash2, 
  ArrowLeft 
} from "lucide-react";

export function NotificationsDrawer({ 
  isOpen, 
  onClose, 
  notifications, 
  setNotifications,
  onAcceptDuel // Callback if they accept a duel directly from notification
}) {
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "unread" | "transactions"

  // Mark single item as read
  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, unread: false } : notif))
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
  };

  // Delete notification
  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Filter logic
  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === "unread") return notif.unread;
    if (activeFilter === "transactions") return notif.type === "wallet";
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

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

      {/* 2. SLIDE-IN PANEL */}
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
              {/* Responsive Back Button: Arrow left on mobile, close X on larger screens */}
              <button
                onClick={onClose}
                className="p-2 -ml-2 rounded-lg hover:bg-white/[0.02] text-neutral-400 hover:text-white transition-colors cursor-pointer sm:hidden"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Bell className="text-emerald-400" size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-neutral-200 uppercase">
                    Alert Center
                  </h3>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase">
                    {unreadCount} UNREAD STATUSES
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Close button */}
            <button
              onClick={onClose}
              className="hidden sm:flex p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
              aria-label="Close notifications"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tab Filter Controls */}
          <div className="px-4 md:px-6 py-3 border-b border-white/[0.02] flex gap-2">
            {["all", "unread", "transactions"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeFilter === filter
                    ? "bg-white/[0.03] border-white/[0.12] text-white"
                    : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Live Alerts List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-transparent">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleMarkAsRead(notif.id)}
                  className={`p-4 rounded-xl border transition-all relative group flex gap-3.5 ${
                    notif.unread
                      ? "bg-white/[0.02] border-emerald-500/10 hover:border-emerald-500/20"
                      : "bg-[#050505]/40 border-white/[0.04] opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Read state dot */}
                  {notif.unread && (
                    <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  )}

                  {/* Icon Indicator depending on payload type */}
                  <div className="shrink-0">
                    {notif.type === "match" && (
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Sword size={16} />
                      </div>
                    )}
                    {notif.type === "wallet" && (
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Wallet size={16} />
                      </div>
                    )}
                    {notif.type === "system" && (
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Info size={16} />
                      </div>
                    )}
                  </div>

                  {/* Text Container */}
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-neutral-200 leading-normal font-light">
                      {notif.text}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-neutral-500">
                        {notif.time}
                      </span>
                    </div>

                    {/* Interactive Accept Dual Button */}
                    {notif.type === "match" && notif.lobbyId && (
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAcceptDuel) onAcceptDuel(notif.lobbyId);
                          }}
                          className="px-3 py-1.5 bg-emerald-500 text-[#050505] font-black text-[9px] font-mono uppercase rounded-lg shadow-sm hover:bg-emerald-600 transition-colors cursor-pointer"
                        >
                          Accept Match
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Remove action button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notif.id);
                    }}
                    className="absolute bottom-3 right-3 p-1.5 rounded-md hover:bg-neutral-900 opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 transition-all cursor-pointer"
                    aria-label="Delete alert"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-12 h-12 rounded-full bg-white/[0.01] border border-white/[0.04] flex items-center justify-center mb-3">
                  <Bell className="text-neutral-600" size={20} />
                </div>
                <h4 className="text-xs font-bold text-neutral-400">No active notices</h4>
                <p className="text-[10px] text-neutral-600 max-w-[200px] mt-1 mx-auto leading-normal font-light">
                  Your workspace is clean. Check back here for matched challenges.
                </p>
              </div>
            )}
          </div>

          {/* Quick Clear controls at footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-white/[0.04] bg-[#050505]/40 flex gap-3">
              <button
                onClick={handleMarkAllAsRead}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.06] text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                Mark all read
              </button>
            </div>
          )}

        </motion.div>
      )}
    </>
  );
}
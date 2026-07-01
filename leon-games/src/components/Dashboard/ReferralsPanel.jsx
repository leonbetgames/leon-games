import { 
  Gift, 
  Copy, 
  Share2, 
  Send, 
  MessageCircle, 
  BadgeCheck, 
  Camera, 
  MessageSquare
} from "lucide-react";

export function ReferralsPanel({ 
  referralCode = "LEON_PARTNER_9012", 
  referralUrl = "https://leongames.com/ref/LEON_PARTNER_9012",
  triggerToast 
}) {

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (triggerToast) {
      triggerToast(`📋 Unique ${type} copied to clipboard!`);
    }
  };

  // Pre-formatted templates for sharing
  const shareText = encodeURIComponent(
    `Join me on Leon Games! Challenge real players in 1v1 skill games, double your stakes, and win big. Use my link to get started: `
  );
  const encodedUrl = encodeURIComponent(referralUrl);

  const socialShares = [
    { 
      name: "WhatsApp", 
      icon: <MessageCircle size={16} />, 
      link: `https://api.whatsapp.com/send?text=${shareText}${encodedUrl}`, 
      color: "hover:border-emerald-500/30 hover:text-emerald-400 bg-emerald-500/5 text-emerald-300" 
    },
    { 
      name: "Telegram", 
      icon: <Send size={16} />, 
      link: `https://t.me/share/url?url=${encodedUrl}&text=${shareText}`, 
      color: "hover:border-blue-500/30 hover:text-blue-400 bg-blue-500/5 text-blue-300" 
    },
    { 
      name: "X (Twitter)", 
      icon: <Send size={16} />, 
      link: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`, 
      color: "hover:border-neutral-500/30 hover:text-white bg-white/5 text-neutral-300" 
    },
    { 
      name: "Facebook", 
      icon: <BadgeCheck size={16} />, 
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, 
      color: "hover:border-blue-600/30 hover:text-blue-500 bg-blue-600/5 text-blue-400" 
    },
    { 
      name: "Discord", 
      icon: <MessageSquare size={16} />, 
      link: `https://discord.com`, // Direct intent unavailable, links to Discord 
      color: "hover:border-indigo-500/30 hover:text-indigo-400 bg-indigo-500/5 text-indigo-300" 
    },
    { 
      name: "Instagram", 
      icon: <Camera size={16} />, 
      link: `https://instagram.com`, 
      color: "hover:border-pink-500/30 hover:text-pink-400 bg-pink-500/5 text-pink-300" 
    }
  ];

  return (
    <div className="space-y-6">

      {/* --- REWARDS INTRODUCTION HERO CARD --- */}
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-white/[0.06] rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-3">
          <Gift className="text-emerald-400" size={16} />
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
            Direct Peer Referrals
          </span>
        </div>
        
        <h2 className="text-base sm:text-lg font-black tracking-wide text-white mb-2">
          Earn Passive Capital on Every Active Friend
        </h2>
        <p className="text-xs text-neutral-400 leading-relaxed font-light max-w-xl">
          Wager on your network. Every single friend who registers, completes a deposit, and resolves their very first match victory awards you <strong className="text-emerald-400 font-semibold">₦500.00</strong> credited directly to your withdrawable wallet. No limits. No caps.
        </p>
      </div>

      {/* --- MIDDLE ROW: DOUBLE COPY MATRIX GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card A: Referral Link */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
              Your Unique Referral Link
            </span>
            <p className="text-xs text-neutral-400 font-light">
              Distribute this custom web target link. Match trackers register conversions automatically.
            </p>
          </div>

          <div className="bg-white/[0.01] border border-white/[0.06] p-3 rounded-xl flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-neutral-300 truncate max-w-[200px] sm:max-w-xs">
              {referralUrl}
            </span>
            <button
              onClick={() => handleCopy(referralUrl, "link")}
              className="p-2 rounded-lg bg-neutral-900 border border-white/[0.08] hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
              aria-label="Copy referral link"
            >
              <Copy size={13} />
            </button>
          </div>
        </div>

        {/* Card B: Referral Code */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
              Your Alphanumeric Referral Code
            </span>
            <p className="text-xs text-neutral-400 font-light">
              Have friends input this code manually in their Settings/Profile pane post-registration.
            </p>
          </div>

          <div className="bg-white/[0.01] border border-white/[0.06] p-3 rounded-xl flex items-center justify-between gap-3">
            <span className="text-xs font-mono font-black text-cyan-400 tracking-wider">
              {referralCode}
            </span>
            <button
              onClick={() => handleCopy(referralCode, "code")}
              className="p-2 rounded-lg bg-neutral-900 border border-white/[0.08] hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
              aria-label="Copy referral code"
            >
              <Copy size={13} />
            </button>
          </div>
        </div>

      </div>

      {/* --- BOTTOM ROW: DIRECT SOCIALS SHARING NETWORK --- */}
      <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Share2 className="text-cyan-400" size={14} />
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
            Instant Share Channels
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {socialShares.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-xl border border-white/[0.04] flex flex-col items-center justify-center text-center gap-2 transition-all ${social.color}`}
            >
              {social.icon}
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
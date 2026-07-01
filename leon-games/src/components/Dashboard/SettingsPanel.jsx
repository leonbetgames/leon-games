import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  AlertTriangle, 
  Trash2, 
  ExternalLink, 
  MessageSquare, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  ShieldAlert,
  Compass
} from "lucide-react";

export function SettingsPanel({ triggerToast }) {
  // --- FORM STATES ---
  const [username, setUsername] = useState("UserPeer_99");
  const [email, setEmail] = useState("peer99@leongames.com");
  const [phone, setPhone] = useState("+234 803 123 4567");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    if (triggerToast) {
      triggerToast("✅ Profile details updated successfully.");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      if (triggerToast) triggerToast("❌ Please fill out all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      if (triggerToast) triggerToast("❌ New passwords do not match.");
      return;
    }
    if (triggerToast) {
      triggerToast("🔑 Password successfully re-encrypted.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleVerifyField = (type) => {
    if (triggerToast) {
      triggerToast(`📩 Verification code sent to your registered ${type}.`);
    }
    if (type === "email") setIsEmailVerified(true);
    if (type === "phone") setIsPhoneVerified(true);
  };

  const handle2FAToggle = () => {
    setIs2FAEnabled((prev) => {
      const nextValue = !prev;
      if (triggerToast) {
        triggerToast(`🛡️ 2FA authentication ${nextValue ? "enabled" : "disabled"} successfully.`);
      }
      return nextValue;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

      {/* --- LEFT COLUMN: CORE ACCOUNT SETTINGS FORMS (8 COLS) --- */}
      <div className="lg:col-span-8 space-y-6">

        {/* 1. Account Details Form */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 md:p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <User className="text-cyan-400" size={16} />
            <h3 className="text-xs font-black tracking-widest text-neutral-400 uppercase">
              Profile Configuration
            </h3>
          </div>

          <form onSubmit={handleUpdateAccount} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Username Input */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                Change Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/[0.01] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all font-mono"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Update Email Address
                </label>
                {isEmailVerified ? (
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleVerifyField("email")}
                    className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-bold cursor-pointer"
                  >
                    Verify Email
                  </button>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.01] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-3 text-xs outline-none text-white transition-all"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Update Phone Number
                </label>
                {isPhoneVerified ? (
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleVerifyField("phone")}
                    className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-bold cursor-pointer"
                  >
                    Verify Phone
                  </button>
                )}
              </div>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" size={14} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/[0.01] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-3 text-xs outline-none text-white transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="sm:col-span-2 py-3 bg-neutral-900 hover:bg-white/[0.04] border border-white/[0.08] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* 2. Password Configuration Form */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 md:p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <Lock className="text-cyan-400" size={16} />
            <h3 className="text-xs font-black tracking-widest text-neutral-400 uppercase">
              Update Security Credentials
            </h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current encryption password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white/[0.01] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all"
              />
            </div>

            {/* New Passwords Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/[0.01] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/[0.01] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs outline-none text-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-500 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
            >
              Update Security Password
            </button>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  2FA Authentication
                </p>
                <p className="text-[11px] text-neutral-400">
                  {is2FAEnabled ? "Extra login protection is enabled" : "Add a second verification step"}
                </p>
              </div>
              <button
                type="button"
                onClick={handle2FAToggle}
                aria-pressed={is2FAEnabled}
                className={`relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-all ${is2FAEnabled ? "bg-cyan-400" : "bg-white/[0.12]"}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all ${is2FAEnabled ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* --- RIGHT COLUMN: MANAGEMENT, SOCIALS & DIRECTORY (4 COLS) --- */}
      <div className="lg:col-span-4 space-y-6">

        {/* 1. Account Management (Destructive Operations) */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <ShieldAlert className="text-rose-500" size={16} />
            <h3 className="text-xs font-black tracking-widest text-neutral-400 uppercase">
              Account Management
            </h3>
          </div>

          <div className="space-y-3">
            {/* Close Account Card */}
            <div className="p-3.5 bg-rose-500/[0.01] border border-rose-500/10 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={14} />
              <div className="space-y-2">
                <div>
                  <h4 className="text-[11px] font-bold text-neutral-200 uppercase tracking-wide">
                    Freeze/Close Profile
                  </h4>
                  <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                    Temporarily disable your P2P node. You can re-activate this lobby profile at any time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast && triggerToast("⚠️ Connection request sent to close account.")}
                  className="px-3 py-1.5 rounded-lg border border-rose-500/20 text-[9px] font-mono text-rose-400 font-bold uppercase hover:bg-rose-500/5 transition-all cursor-pointer"
                >
                  Close Account
                </button>
              </div>
            </div>

            {/* Delete Account Card */}
            <div className="p-3.5 bg-rose-500/[0.01] border border-rose-500/10 rounded-xl flex items-start gap-2.5">
              <Trash2 className="text-rose-600 shrink-0 mt-0.5" size={14} />
              <div className="space-y-2">
                <div>
                  <h4 className="text-[11px] font-bold text-neutral-200 uppercase tracking-wide">
                    Terminate Account
                  </h4>
                  <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                    Irreversibly delete your profile, wager statistics, and return transaction records.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast && triggerToast("🚨 Account termination sequence initialized.")}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-transparent text-[9px] font-mono text-rose-400 font-bold uppercase hover:bg-rose-500/20 transition-all cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Official Communities & Social Platforms */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <Compass className="text-cyan-400" size={16} />
            <h3 className="text-xs font-black tracking-widest text-neutral-400 uppercase">
              Community &amp; Socials
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Official Telegram Group", platform: "Telegram", link: "https://t.me/leongames", color: "hover:border-blue-500/30 text-blue-400 bg-blue-500/5" },
              { label: "WhatsApp Broadcast Channel", platform: "WhatsApp", link: "https://whatsapp.com/channel/leongames", color: "hover:border-emerald-500/30 text-emerald-400 bg-emerald-500/5" },
              { label: "Community Discord Hub", platform: "Discord", link: "https://discord.gg/leongames", color: "hover:border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { label: "Official X Profile", platform: "Twitter/X", link: "https://x.com/leongames", color: "hover:border-neutral-500/30 text-neutral-300 bg-white/5" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-xl border border-white/[0.04] flex items-center justify-between transition-all ${social.color}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white uppercase">{social.platform}</span>
                  <span className="text-neutral-500 font-mono text-[9px]">•</span>
                  <span className="text-[10px] text-neutral-400 font-light truncate max-w-[150px]">{social.label}</span>
                </div>
                <ExternalLink size={11} className="opacity-60" />
              </a>
            ))}
          </div>
        </div>

        {/* 3. Site Pages Directories */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <FileText className="text-cyan-400" size={16} />
            <h3 className="text-xs font-black tracking-widest text-neutral-400 uppercase">
              Internal Resources
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold text-neutral-400">
            {[
              { name: "Terms & Conditions", icon: <FileText size={12} /> },
              { name: "Help & Support", icon: <MessageSquare size={12} /> },
              { name: "System FAQs", icon: <HelpCircle size={12} /> },
              { name: "Responsible Play", icon: <User size={12} /> }
            ].map((page, idx) => (
              <button
                key={idx}
                onClick={() => triggerToast && triggerToast(`Opening ${page.name}...`)}
                className="p-3 bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] hover:text-white rounded-xl flex items-center gap-2 transition-all text-left cursor-pointer"
              >
                <span className="text-cyan-500/70 shrink-0">{page.icon}</span>
                <span className="text-[9px] tracking-wide uppercase leading-tight">{page.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
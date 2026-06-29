// components/CommunityLinks.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, FaTelegramPlane, FaDiscord, FaTwitter, 
  FaInstagram, FaFacebookF, FaTiktok, FaYoutube 
} from 'react-icons/fa';
import { FiArrowUpRight, FiUsers } from 'react-icons/fi';

const communityChannels = [
  {
    name: "WhatsApp Player Group",
    type: "Community Chat",
    desc: "Connect directly with fellow local players, share strategy tips, and set up quick custom match lobbies.",
    icon: FaWhatsapp,
    color: "text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    bgColor: "bg-emerald-500/10",
    url: "https://chat.whatsapp.com/invite/placeholder-group"
  },
  {
    name: "WhatsApp Broadcast Channel",
    type: "Announcements Only",
    desc: "Follow our official verified channel to receive weekly bonus codes, event updates, and ranking announcements straight to your feeds.",
    icon: FaWhatsapp,
    color: "text-green-400 border-green-500/20 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]",
    bgColor: "bg-green-500/10",
    url: "https://whatsapp.com/channel/placeholder-channel"
  },
  {
    name: "Telegram Community",
    type: "Global Discussion",
    desc: "Join our active global Telegram group to talk strategy, log feedback with our staff, and vote on upcoming community updates.",
    icon: FaTelegramPlane,
    color: "text-sky-400 border-sky-500/20 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]",
    bgColor: "bg-sky-500/10",
    url: "https://t.me/placeholder-group"
  },
  {
    name: "Telegram Announcements",
    type: "Broadcast Stream",
    desc: "Get instant server notifications, maintenance schedules, leaderboard resets, and tournament brackets automatically.",
    icon: FaTelegramPlane,
    color: "text-blue-400 border-blue-500/20 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    bgColor: "bg-blue-500/10",
    url: "https://t.me/placeholder-channel"
  },
  {
    name: "Discord Server",
    type: "Voice & Tournaments",
    desc: "Jump into active voice lobbies, coordinate live match queues, and participate in official Discord tournaments.",
    icon: FaDiscord,
    color: "text-indigo-400 border-indigo-500/20 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    bgColor: "bg-indigo-500/10",
    url: "https://discord.gg/placeholder-server"
  },
  {
    name: "X / Twitter",
    type: "Real-Time Updates",
    desc: "Follow us on X for live event clips, development log updates, game maintenance alerts, and interactive community polls.",
    icon: FaTwitter,
    color: "text-white border-zinc-800 hover:border-zinc-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]",
    bgColor: "bg-zinc-900/50",
    url: "https://twitter.com/placeholder-profile"
  },
  {
    name: "Instagram",
    type: "Highlights & Media",
    desc: "View visually polished match clips, ranking announcements, player highlight reels, and behind-the-scenes content.",
    icon: FaInstagram,
    color: "text-pink-400 border-pink-500/20 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    bgColor: "bg-pink-500/10",
    url: "https://instagram.com/placeholder-profile"
  },
  {
    name: "Facebook Community",
    type: "Events & Guides",
    desc: "Read long-form game guides, follow event schedules, share your feedback, and connect with other regional competitors.",
    icon: FaFacebookF,
    color: "text-blue-550 border-blue-600/20 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]",
    bgColor: "bg-blue-600/10",
    url: "https://facebook.com/placeholder-page"
  },
  {
    name: "TikTok Hub",
    type: "Reels & Short Clips",
    desc: "Catch high-speed gameplay compilations, player reactions, and short guides explaining competitive tips.",
    icon: FaTiktok,
    color: "text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    bgColor: "bg-cyan-500/10",
    url: "https://tiktok.com/@placeholder-profile"
  },
  {
    name: "YouTube Channel",
    type: "Videos & Tourneys",
    desc: "Watch high-definition tournament streams, detailed patch analysis walkthroughs, and comprehensive strategy reviews.",
    icon: FaYoutube,
    color: "text-rose-500 border-rose-600/20 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    bgColor: "bg-rose-500/10",
    url: "https://youtube.com/c/placeholder-channel"
  }
];

export default function CommunityLinks() {
  return (
    <section className="py-20 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex justify-center">
            <div className="p-2.5 rounded-xl bg-[#00C853]/10 border border-[#00C853]/20 text-[#00C853] mb-2 shadow-inner">
              <FiUsers className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Join Our Community
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
            Get connected across our communication pipelines. Follow our verified handles to receive weekly bonus announcements, system status updates, match tutorials, and community challenges.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {communityChannels.map((channel, idx) => {
            const IconComponent = channel.icon;
            return (
              <motion.a
                key={idx}
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`p-6 rounded-2xl bg-zinc-950/40 border transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden ${channel.color}`}
              >
                {/* Visual Glassmorphic Accent overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="space-y-4 relative z-10">
                  {/* Category Type & Brand Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {channel.type}
                    </span>
                    <div className={`p-2.5 rounded-xl border border-zinc-900 ${channel.bgColor}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[#00C853] transition-colors duration-200">
                      {channel.name}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {channel.desc}
                    </p>
                  </div>
                </div>

                {/* Interactive CTA Link */}
                <div className="pt-4 mt-auto flex items-center justify-between border-t border-zinc-900/80 text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors duration-200 relative z-10">
                  <span>Connect with us</span>
                  <FiArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
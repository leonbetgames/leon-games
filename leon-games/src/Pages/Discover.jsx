import { Navigation } from "../components/common/NavBar";
import HeroSection from "../components/Discover/HeroSection";
import { FeaturedGamesSection } from "../components/Discover/FeaturedGamesSection";
import { HowItWorksSection } from "../components/Discover/HowItWorksSection";
import { LiveActivitySection } from "../components/Discover/LiveActivitySection";
import { TrustSection } from "../components/Discover/TrustSection";
import { PaymentsSection } from "../components/Discover/PaymentsSection";
import { GrowthSection } from "../components/Discover/GrowthSection";
import VideoAdSection from "../components/Discover/VideoAdSection";
import FinalCTASection from "../components/Discover/FinalCTASection";
import Footer from "../components/common/Footer";

export default function Discover() {
    return (
        <div className="bg-[#050505] text-white font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400 min-h-screen overflow-x-hidden relative">
            {/* Background Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 opacity-80" />

            <div className="relative z-10">
                <Navigation />

                <HeroSection />
                <FeaturedGamesSection />
                <HowItWorksSection />
                <PaymentsSection />
                <TrustSection />
                <LiveActivitySection />
                <GrowthSection />
                <VideoAdSection />
                <FinalCTASection />

                <Footer />
            </div>
        </div>
    );
}

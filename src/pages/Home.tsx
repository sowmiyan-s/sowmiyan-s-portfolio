import React from 'react';
import Hero from "@/components/Hero";
import TechNav from "@/components/TechNav";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";
import FrameAnimationBackground from "@/components/FrameAnimationBackground";
import BlogSection from "@/components/BlogSection";
import SkillsSection from "@/components/SkillsSection";
import HireMeSection from "@/components/HireMeSection";
import ContentCreationSection from "@/components/ContentCreationSection";
import MarqueeSection from "@/components/MarqueeSection";
import PopularProjectsSlider from "@/components/PopularProjectsSlider";
import Pattern from "@/components/Pattern";

const Home = () => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
            <CyberBackground />
            <FrameAnimationBackground />
            <TechNav />
            <main className="relative z-10 w-full">
                <div className="relative w-full z-[1] flex items-center min-h-screen">
                    <Hero />
                </div>
                
                <div className="relative w-full z-[2] border-t border-white/5">
                    <SkillsSection />
                </div>

                <div className="relative w-full z-[3] border-t border-white/5">
                    <BlogSection />
                </div>

                <div id="popular-projects-slider" className="relative bg-transparent w-full z-[3.5] border-y border-white/5">
                    <PopularProjectsSlider />
                </div>

                <Pattern>
                    <div className="relative bg-transparent flex items-center justify-center min-h-screen w-full z-[4] border-t border-white/5 py-24 md:py-32">
                        <ContentCreationSection />
                    </div>
                </Pattern>

                <div className="relative w-full z-[5] bg-transparent flex items-center py-24 border-t border-white/5">
                    <HireMeSection />
                </div>

                <div className="relative z-[10] -mt-16 w-full pointer-events-none">
                    <div className="h-0 flex items-center">
                        <MarqueeSection />
                    </div>
                </div>

                
                <div className="relative z-[7] bg-black w-full">
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default Home;

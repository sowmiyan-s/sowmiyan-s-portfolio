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
import PopularProjectsSlider from "@/components/PopularProjectsSlider";
import Pattern from "@/components/Pattern";
import SEOKeywords from "@/components/SEOKeywords";
import MarqueeSection from "@/components/MarqueeSection";

const Home = () => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
            <SEOKeywords />
            <CyberBackground />
            <FrameAnimationBackground />
            <TechNav />
            <main className="relative z-10 w-full">
                <div className="relative w-full z-[1] flex items-center min-h-screen">
                    <Hero />
                </div>

                <MarqueeSection />

                <div className="relative w-full z-[2]">
                    <SkillsSection />
                </div>

                <MarqueeSection />

                <div className="relative w-full z-[3]">
                    <BlogSection />
                </div>

                <MarqueeSection />

                <div id="popular-projects-slider" className="relative bg-transparent w-full z-[3.5]">
                    <PopularProjectsSlider />
                </div>

                <Pattern>
                    <div className="relative bg-transparent flex items-center justify-center w-full z-[4] py-8 md:py-10">
                        <ContentCreationSection />
                    </div>
                </Pattern>

                <MarqueeSection />

                <div className="relative w-full z-[5] bg-transparent">
                    <HireMeSection />
                </div>


                <div className="relative z-[7] bg-black w-full">
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default Home;

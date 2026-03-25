import React from 'react';
import Hero from "@/components/Hero";
import TechNav from "@/components/TechNav";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";
import BlogSection from "@/components/BlogSection";
import SkillsSection from "@/components/SkillsSection";
import HireMeSection from "@/components/HireMeSection";
import ContentCreationSection from "@/components/ContentCreationSection";
import MarqueeSection from "@/components/MarqueeSection";

const Home = () => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
            <CyberBackground />
            <TechNav />
            <main className="relative z-10 w-full">
                <div className="sticky top-0 bg-black min-h-screen w-full z-[1] flex items-center">
                    <Hero />
                </div>
                
                <div className="sticky top-0 bg-[#060606] h-screen overflow-y-auto no-scroll w-full z-[2]">
                    <SkillsSection />
                </div>

                <div className="sticky top-0 bg-[#0d0d0d] h-screen overflow-y-auto no-scroll w-full z-[3]">
                    <BlogSection />
                </div>

                <div className="sticky top-0 bg-[#121212] flex items-center h-screen overflow-y-auto no-scroll w-full z-[4]">
                    <HireMeSection />
                </div>

                <div className="sticky top-0 bg-[#050505] flex items-center h-screen overflow-y-auto no-scroll w-full z-[5] border-t border-white/5">
                    <ContentCreationSection />
                </div>

                <div className="sticky top-0 z-[6] w-full">
                    <MarqueeSection />
                </div>
                
                <div className="relative z-[7] bg-black w-full">
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default Home;

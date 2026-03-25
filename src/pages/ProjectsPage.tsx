import React, { useEffect, useState } from 'react';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
import CyberBackground from '@/components/CyberBackground';

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 font-body overflow-x-hidden">
            <CyberBackground />
            <TechNav />
            <main className="relative z-10 pt-20">
                <div className="max-w-7xl mx-auto px-6 pt-12">
                    <div className="flex flex-col gap-4 border-b border-red-600/30 pb-12 mb-8">
                         <span className="text-xs opacity-40 font-mono italic">PROJECT_ARCHIVE / 03</span>
                         <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter">THE TIMELINE</h1>
                         <div className="w-48 h-1 bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
                    </div>
                </div>
                
                <ProjectsSection />
            </main>
            <Footer />
        </div>
    );
};

export default ProjectsPage;


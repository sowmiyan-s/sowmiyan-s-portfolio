import React from 'react';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import AchievementsSection from '@/components/AchievementsSection';

const AchievementsPage = () => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 font-body overflow-x-hidden">
            <CyberBackground />
            <TechNav />
            <main className="relative z-10 pt-20">
                <AchievementsSection />
            </main>
            <Footer />
        </div>
    );
};

export default AchievementsPage;

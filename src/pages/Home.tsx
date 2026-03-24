import React from 'react';
import Hero from "@/components/Hero";
import TechNav from "@/components/TechNav";
import Footer from "@/components/Footer";
import CyberBackground from "@/components/CyberBackground";
import BlogSection from "@/components/BlogSection";
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
            <CyberBackground />
            <TechNav />
            <main className="relative z-10">
                <section className="pt-20">
                    <Hero />
                </section>
                
                {/* Core Values / Mission Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="py-32 px-6 border-y border-white/5 bg-red-900/5 relative overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] font-mono text-red-600 uppercase tracking-[0.5em]">04 // SYSTEM PRINCIPLES</span>
                            <h2 className="text-4xl md:text-7xl font-heading font-black text-white uppercase leading-none tracking-tighter">ENGINEERING BEYOND BOUNDARIES</h2>
                        </div>
                        <div className="flex flex-col gap-6 font-mono text-xs opacity-40 leading-relaxed max-w-lg">
                            <p>Architecting intelligent ecosystems through multi-agent orchestration and deep learning synthesis. Operating at the intersection of computer vision and human-centric design protocols.</p>
                            <div className="flex gap-4">
                                <div className="p-4 border border-white/10 flex flex-col gap-1 w-full hover:border-red-600 hover:text-red-600 transition-colors">
                                    <span className="font-bold underline uppercase">Optimization</span>
                                    <span>Continuous model refinement and pipeline streamlining.</span>
                                </div>
                                <div className="p-4 border border-white/10 flex flex-col gap-1 w-full hover:border-red-600 hover:text-red-600 transition-colors">
                                    <span className="font-bold underline uppercase">Scalability</span>
                                    <span>Building for infinite expansion and modular growth.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <BlogSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;

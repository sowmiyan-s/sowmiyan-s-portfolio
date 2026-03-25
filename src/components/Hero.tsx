import React from 'react';
import { motion } from 'framer-motion';
import DecodeText from './DecodeText';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden grid-bg z-10 w-full">
            {/* Background Image Placeholder */}
            <div 
                className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')" }} 
            />
            


            <div className="max-w-7xl w-full flex flex-col items-center gap-12 relative z-20 mt-16">
                {/* Visual Accent */}
                <div className="absolute -top-12 right-0 w-32 h-32 border border-white/10 flex items-center justify-center opacity-40">
                    <div className="w-16 h-16 border-t border-r border-red-600 absolute top-0 right-0" />
                    <div className="text-[8px] font-mono leading-none">
                        CRASH_LOG: 001<br/>
                        TIME: 23:29<br/>
                        LOC: CHN_SECTOR<br/>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 w-full text-center">
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative group cursor-none w-full px-4"
                    >
                        <h1 
                            className="text-[clamp(2.5rem,7vw,8rem)] font-heading font-black leading-[1] tracking-tighter text-white uppercase mix-blend-difference transition-all group-hover:scale-[1.02] whitespace-nowrap"
                        >
                            SOWMIYAN <span className="text-red-700">S</span>
                        </h1>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-4 text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-red-600 opacity-80"
                    >
                        <DecodeText text="AI Engineer" />
                        <span className="opacity-50">•</span>
                        <DecodeText text="Software Developer" />
                        <span className="opacity-50">•</span>
                        <DecodeText text="Freelancer" />
                        <span className="opacity-50">•</span>
                        <DecodeText text="Content Creator" />
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="text-sm md:text-base leading-relaxed font-mono mt-4 max-w-2xl text-white/70"
                    >
                        Third-year B.Tech student passionate about AI, Machine Learning, and application development. Skilled in building intelligent solutions using modern tools and cloud platforms.
                    </motion.p>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/20 pt-12 mt-8 text-center md:text-left gap-8 md:gap-0">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-xs font-mono opacity-40 uppercase">Position Current</span>
                        <p className="text-xs md:text-sm font-mono text-white/80 leading-tight">
                            STUDENT - V.S.B COLLEGE OF ENGINEERING TECHNICAL CAMPUS - B.TECH ARTIFICIAL INTELLIGENCE AND DATA SCIENCE (2023-2027)
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 w-full md:w-auto">
                        <div className="flex gap-2 mb-2 justify-end">
                             {[...Array(5)].map((_, i) => (
                                 <div key={i} className="w-3 h-3 bg-red-600/20 hover:bg-red-600 transition-colors cursor-pointer" />
                             ))}
                        </div>
                        <span className="text-xs font-mono opacity-40 uppercase whitespace-nowrap">A 2026 Production</span>
                    </div>
                </div>
            </div>

            {/* Side Labels */}
            <div className="hidden md:flex absolute left-6 bottom-12 [writing-mode:vertical-lr] rotate-180 gap-12 opacity-30 text-[10px] uppercase font-mono tracking-widest z-20">
                <span>Core Processors Running</span>
                <span>System Optimized v1.02</span>
            </div>
            <div className="hidden md:flex absolute right-6 bottom-12 [writing-mode:vertical-lr] gap-12 opacity-30 text-[10px] uppercase font-mono tracking-widest z-20">
                <span>( ARCHIVE - 2026 )</span>
                <span>( SECTOR - RED )</span>
            </div>
        </section>
    );
};

export default Hero;

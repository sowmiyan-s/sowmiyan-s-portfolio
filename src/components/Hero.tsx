import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden grid-bg z-10">
            <div className="absolute top-24 left-6 border-l border-red-600 pl-4 py-4 flex flex-col gap-1 z-20">
                <span className="text-[10px] opacity-40 uppercase tracking-widest">System Initialized</span>
                <span className="text-xs font-mono tracking-tighter text-red-600">USR_AUTH: OK</span>
                <span className="text-xs font-mono tracking-tighter text-red-600">ID: SOWMIYAN_S</span>
            </div>

            <div className="max-w-7xl w-full flex flex-col items-center gap-12 relative">
                {/* Visual Accent */}
                <div className="absolute -top-12 right-0 w-32 h-32 border border-white/10 flex items-center justify-center opacity-40">
                    <div className="w-16 h-16 border-t border-r border-red-600 absolute top-0 right-0" />
                    <div className="text-[8px] font-mono leading-none">
                        CRASH_LOG: 001<br/>
                        TIME: 23:29<br/>
                        LOC: CHN_SECTOR<br/>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                    <motion.h2 
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-red-600 font-ui text-xs md:text-sm uppercase tracking-[1em]"
                    >
                        AI ENGINEER // CORE
                    </motion.h2>
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative group cursor-none"
                    >
                        <h1 
                            className="text-5xl md:text-[11rem] font-heading font-black leading-[0.8] tracking-tighter text-white uppercase mix-blend-difference transition-all group-hover:skew-x-2 group-hover:scale-[1.02]"
                        >
                            SOWMIYAN <span className="text-red-700">S</span>
                        </h1>
                        {/* Glitch Overlay (Hidden by default, shown on hover) */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-10 pointer-events-none overflow-hidden">
                             <div className="absolute inset-0 bg-red-600/20 translate-x-1 animate-pulse" />
                             <div className="absolute inset-0 bg-blue-600/20 -translate-x-1 animate-pulse" />
                        </div>
                    </motion.div>
                </div>

                <div className="w-full flex justify-between items-end border-t border-white/20 pt-12 mt-12">
                    <div className="flex flex-col gap-2 max-w-md">
                        <span className="text-xs font-mono opacity-40 uppercase">Mission Objective</span>
                        <p className="text-sm leading-relaxed font-mono">
                            Third-year B.Tech student passionate about AI, Machine Learning, and application development. Skilled in building intelligent solutions using modern tools and cloud platforms.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-2 mb-2">
                             {[...Array(5)].map((_, i) => (
                                 <div key={i} className="w-3 h-3 bg-red-600/20 hover:bg-red-600 transition-colors cursor-pointer" />
                             ))}
                        </div>
                        <span className="text-xs font-mono opacity-40 uppercase">A 2026 Production</span>
                    </div>
                </div>
            </div>

            {/* Side Labels */}
            <div className="absolute left-6 bottom-12 [writing-mode:vertical-lr] rotate-180 flex gap-12 opacity-30 text-[10px] uppercase font-mono tracking-widest">
                <span>Core Processors Running</span>
                <span>System Optimized v1.02</span>
            </div>
            <div className="absolute right-6 bottom-12 [writing-mode:vertical-lr] flex gap-12 opacity-30 text-[10px] uppercase font-mono tracking-widest">
                <span>( ARCHIVE - 2026 )</span>
                <span>( SECTOR - RED )</span>
            </div>
        </section>
    );
};

export default Hero;

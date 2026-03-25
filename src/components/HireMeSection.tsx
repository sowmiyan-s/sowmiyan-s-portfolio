import React from 'react';
import { motion } from 'framer-motion';
import TopographicBackground from './TopographicBackground';

const HireMeSection = () => {
    return (
        <section className="relative w-full min-h-screen py-32 px-6 border-t border-white/5 bg-black z-10 flex flex-col items-center justify-center overflow-hidden">
            {/* Custom Topographic SVG Background specifically for this section */}
            <TopographicBackground />
            
            <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-16 text-center pointer-events-auto">
                <div className="flex flex-col gap-6 items-center justify-center w-full">
                    <span className="text-xs md:text-sm opacity-40 font-mono tracking-[0.5em] uppercase text-center block w-full text-white">OPEN TO NEW OPPORTUNITIES</span>
                    <h2 className="text-5xl md:text-8xl lg:text-[8rem] font-heading font-black text-white uppercase tracking-tighter text-center leading-none">
                        Hire <span className="text-red-600">Me</span>
                    </h2>
                    <p className="text-lg md:text-2xl font-mono text-white/80 max-w-3xl mt-6 leading-relaxed text-center mx-auto">
                        Available for job opportunities and freelancing projects. Let's build intelligent systems and premium web experiences together.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                    <motion.a 
                        href="mailto:sowmisowmiyan58@gmail.com"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="px-10 py-5 border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all font-heading font-bold uppercase tracking-widest text-sm md:text-base text-center flex items-center justify-center gap-4 group backdrop-blur-sm"
                    >
                        <span>Email Direct</span>
                        <div className="w-4 h-px bg-white group-hover:bg-black group-hover:w-8 transition-all" />
                    </motion.a>
                    
                    <motion.a 
                        href="https://wa.me/919042561295"
                        target="_blank"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="px-10 py-5 border border-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white transition-all font-heading font-bold uppercase tracking-widest text-sm md:text-base text-center flex items-center justify-center gap-4 group text-red-500 backdrop-blur-sm"
                    >
                        <span className="group-hover:text-white transition-colors">WhatsApp Link</span>
                        <div className="w-4 h-px bg-red-600 group-hover:bg-white group-hover:w-8 transition-all" />
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default HireMeSection;

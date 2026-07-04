import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TopographicBackground from './TopographicBackground';

const HireMeSection = () => {
    return (
        <section className="relative w-full min-h-[80vh] py-24 md:py-32 px-4 sm:px-6 border-t border-white/5 bg-black z-10 flex flex-col items-center justify-center overflow-hidden">
            <TopographicBackground />

            <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center gap-10 md:gap-14 text-center">
                <div className="flex flex-col gap-4 items-center">
                    <span className="text-[10px] md:text-xs opacity-50 font-mono tracking-[0.4em] uppercase text-white">
                        Open to Opportunities
                    </span>
                    <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-heading font-black text-white uppercase tracking-tighter leading-none break-words">
                        Hire Me
                    </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center max-w-xl">
                    <motion.a
                        href="mailto:sowmisowmiyan58@gmail.com"
                        whileHover={{ y: -2 }}
                        className="flex-1 px-6 md:px-10 py-4 md:py-5 border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-colors font-heading font-bold uppercase tracking-widest text-xs md:text-base text-center flex items-center justify-center gap-3"
                    >
                        Email Direct
                    </motion.a>

                    <motion.a
                        href="https://wa.me/919042561295"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ y: -2 }}
                        className="flex-1 px-6 md:px-10 py-4 md:py-5 border border-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 transition-colors font-heading font-bold uppercase tracking-widest text-xs md:text-base text-center flex items-center justify-center gap-3"
                    >
                        WhatsApp
                    </motion.a>
                </div>

                <Link
                    to="/contact"
                    className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/50 hover:text-red-500 transition-colors border-b border-white/10 hover:border-red-500 pb-1"
                >
                    More contact options →
                </Link>
            </div>
        </section>
    );
};

export default HireMeSection;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ScrambleText from './ScrambleText';

const TechNav = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-center pointer-events-none">
            <div className="max-w-7xl w-full bg-black/85 border border-red-500/30 backdrop-blur-xl pointer-events-auto px-4 md:px-8 py-2.5 md:py-3 flex items-center justify-between rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(239,68,68,0.1)]">
                {/* Left: Placeholder to keep links centered */}
                <div className="hidden lg:flex lg:flex-1" />
                
                {/* Center: Links */}
                <div className="flex items-center gap-3 md:gap-6 text-[8px] md:text-[10px] font-mono uppercase tracking-[0.15em] md:tracking-[0.2em]">
                    <Link to="/" className={`relative py-1 transition-all font-bold ${isActive('/') ? 'text-red-500' : 'text-white/70 hover:text-red-500'}`}>
                        <ScrambleText text="01_Home" triggerOnHover />
                        {isActive('/') && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full blur-[1px]" />
                        )}
                    </Link>
                    <Link to="/achievements" className={`relative py-1 transition-all font-bold ${isActive('/achievements') ? 'text-red-500' : 'text-white/70 hover:text-red-500'}`}>
                        <ScrambleText text="02_Achievements" triggerOnHover />
                        {isActive('/achievements') && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full blur-[1px]" />
                        )}
                    </Link>
                    <Link to="/projects" className={`relative py-1 transition-all font-bold ${isActive('/projects') ? 'text-red-500' : 'text-white/70 hover:text-red-500'}`}>
                        <ScrambleText text="03_Projects" triggerOnHover />
                        {isActive('/projects') && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full blur-[1px]" />
                        )}
                    </Link>
                    <Link to="/about" className={`relative py-1 transition-all font-bold ${isActive('/about') ? 'text-red-500' : 'text-white/70 hover:text-red-500'}`}>
                        <ScrambleText text="04_About" triggerOnHover />
                        {isActive('/about') && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full blur-[1px]" />
                        )}
                    </Link>
                    <a href="#contact" className="text-white/70 hover:text-red-500 transition-all font-bold" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <ScrambleText text="05_Contact" triggerOnHover />
                    </a>
                </div>

                {/* Right: Status */}
                <div className="hidden lg:flex items-center gap-6 lg:flex-1 justify-end">
                    <div className="flex flex-col text-right items-end opacity-70">
                        <span className="text-[7px] font-mono uppercase text-red-500/80">Status_Operational</span>
                        <div className="flex gap-2 items-center">
                            <div className="w-1 h-1 bg-red-600 animate-pulse rounded-full" />
                            <span className="text-[8px] font-mono whitespace-nowrap tracking-widest leading-none text-white/95">SEC-RED // CHN</span>
                        </div>
                    </div>
                    
                    <a href="/resume.pdf" target="_blank" className="px-4 py-1.5 bg-red-600/20 border border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white transition-all text-[9px] font-heading font-black rounded-lg">
                        <ScrambleText text="RESUME" triggerOnHover />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default TechNav;

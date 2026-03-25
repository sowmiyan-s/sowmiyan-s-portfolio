import React from 'react';
import { Link } from 'react-router-dom';

const TechNav = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start text-[10px] font-mono border-b border-white/5 bg-black/80 backdrop-blur-md pointer-events-auto">
            <div className="flex flex-col gap-1">
                <Link to="/" className="text-white font-bold uppercase tracking-tighter text-2xl font-heading group cursor-pointer hover:text-red-600 transition-colors">
                    SOWMIYAN S
                </Link>
                <span className="opacity-40 uppercase tracking-[0.3em]">AI ENGINEER / FULL STACK</span>
            </div>
            
            <div className="grid grid-cols-6 gap-6 text-[11px]">
                <div className="flex flex-col">
                    <span className="text-[9px] opacity-30 mb-1">01</span>
                    <Link to="/" className="hover:text-red-600 transition-all uppercase font-heading tracking-widest text-white decoration-red-600 underline-offset-4 hover:underline">Home</Link>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] opacity-30 mb-1">02</span>
                    <Link to="/achievements" className="hover:text-red-600 transition-all uppercase font-heading tracking-widest text-white decoration-red-600 underline-offset-4 hover:underline">Achievements</Link>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] opacity-30 mb-1">03</span>
                    <Link to="/projects" className="hover:text-red-600 transition-all uppercase font-heading tracking-widest text-white decoration-red-600 underline-offset-4 hover:underline">Projects</Link>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] opacity-30 mb-1">04</span>
                    <Link to="/about" className="hover:text-red-600 transition-all uppercase font-heading tracking-widest text-white decoration-red-600 underline-offset-4 hover:underline">About me</Link>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] opacity-30 mb-1">05</span>
                    <a href="#contact" className="hover:text-red-600 transition-all uppercase font-heading tracking-widest text-white decoration-red-600 underline-offset-4 hover:underline" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>Contact</a>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] opacity-30 mb-1">06</span>
                    <a href="/resume.pdf" target="_blank" className="hover:text-red-600 transition-all uppercase font-heading tracking-widest text-red-600 font-bold decoration-white underline-offset-4 hover:underline">My Resume</a>
                </div>
            </div>

            <div className="hidden lg:flex flex-col text-right items-end gap-1 opacity-40">
                <span className="uppercase font-mono">Status: Operation Underway</span>
                <div className="flex gap-4 items-center">
                    <div className="w-1.5 h-1.5 bg-red-600 animate-pulse" />
                    <span className="text-[10px]">LOC: NAMAKKAL / CHN</span>
                </div>
            </div>
        </nav>
    );
};

export default TechNav;

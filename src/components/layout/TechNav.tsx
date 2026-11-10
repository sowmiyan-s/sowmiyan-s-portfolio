import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const RESUME_URL = "/resume.pdf";

const navItems = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/contact', label: 'Contact' },
];

const TechNav: React.FC = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-center pointer-events-none">
            {/* Desktop Navbar: Neo Brutal Floating Pill */}
            <div className="hidden md:flex max-w-2xl w-full pointer-events-auto items-center justify-between px-6 py-2.5 bg-white border-2 border-zinc-900 shadow-brutal">
                {/* Brand / Logo */}
                <Link to="/" className="text-xs font-mono font-black tracking-widest text-zinc-900 hover:text-red-600 uppercase transition-colors">
                    SOWMIYAN S
                </Link>

                {/* Center Navigation Links */}
                <div className="flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-wider">
                    {navItems.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`relative py-1 transition-colors ${
                                isActive(item.to) 
                                    ? 'text-red-600' 
                                    : 'text-zinc-700 hover:text-zinc-950'
                            }`}
                        >
                            <span>{item.label}</span>
                            {isActive(item.to) && (
                                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-red-600" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right: Resume CTA */}
                <div className="flex items-center gap-3">
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-zinc-900 text-white transition-all text-xs font-mono font-bold uppercase tracking-wider border border-zinc-900 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                    >
                        <span>Resume</span>
                        <ArrowUpRight size={13} />
                    </a>
                </div>
            </div>

            {/* Mobile Navbar: Neo Brutal Pill */}
            <div className="md:hidden max-w-md w-full bg-white border-2 border-zinc-900 shadow-brutal pointer-events-auto px-5 py-2.5 flex items-center justify-between">
                <Link to="/" className="text-xs font-mono font-black text-zinc-900 uppercase tracking-widest">
                    Sowmiyan S
                </Link>
                <button
                    onClick={() => setOpen(v => !v)}
                    className="text-zinc-900 p-1 border border-zinc-900 hover:bg-stone-100 transition-colors pointer-events-auto shadow-brutal-sm"
                    aria-label="Toggle navigation menu"
                >
                    {open ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {open && (
                <>
                    <div 
                        className="md:hidden fixed inset-0 bg-zinc-900/40 z-40 pointer-events-auto"
                        onClick={() => setOpen(false)}
                    />
                    <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white border-2 border-zinc-900 pointer-events-auto p-3 flex flex-col gap-1 z-50 shadow-brutal animate-in fade-in zoom-in-95 duration-150">
                        {navItems.map(item => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className={`flex items-center justify-between px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors border-b border-zinc-100 ${
                                    isActive(item.to) 
                                        ? 'text-red-600 bg-stone-100' 
                                        : 'text-zinc-800 hover:bg-stone-50'
                                }`}
                            >
                                <span>{item.label}</span>
                                {isActive(item.to) && (
                                    <span className="w-2 h-2 bg-red-600 border border-zinc-900" />
                                )}
                            </Link>
                        ))}
                        
                        <div className="pt-2 mt-1">
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-600 text-white border border-zinc-900 text-xs font-mono font-bold uppercase tracking-wider shadow-brutal-sm"
                            >
                                <span>Download Resume</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default TechNav;

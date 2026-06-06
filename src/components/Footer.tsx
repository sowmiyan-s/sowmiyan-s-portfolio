import React from 'react';
import { Mail, MapPin, Linkedin, Instagram, Phone, PenTool, Twitter } from 'lucide-react';
import ScrambleText from './ScrambleText';

const Footer = () => {
    return (
        <footer id="contact" className="relative py-12 px-6 cross-bg border-t border-white/10 z-10 overflow-hidden bg-black text-white">
            {/* Visual Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 -translate-y-1/2 translate-x-1/2 rotate-45 pointer-events-none opacity-20" />
            
            <div className="max-w-7xl mx-auto flex flex-col gap-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-red-600">
                            <ScrambleText text="Location" triggerOnHover />
                        </span>
                        <div className="flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity">
                            <MapPin size={14} className="mt-1 flex-shrink-0 text-red-600" />
                            <p className="text-xs font-mono tracking-tight leading-relaxed">
                                Namakkal District, Tamil Nadu<br/>
                                India // 637203
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-red-600">
                            <ScrambleText text="Contact Me" triggerOnHover />
                        </span>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:sowmisowmiyan58@gmail.com" className="flex items-center gap-3 text-xs font-mono transition-colors hover:text-red-600 uppercase">
                                <Mail size={14} className="text-red-600" /> <ScrambleText text="Email" triggerOnHover />
                            </a>
                            <a href="https://wa.me/919042561295" target="_blank" className="flex items-center gap-3 text-xs font-mono transition-colors hover:text-red-600 uppercase">
                                <Phone size={14} className="text-red-600" /> <ScrambleText text="WhatsApp" triggerOnHover />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-red-600">
                            <ScrambleText text="Social Media" triggerOnHover />
                        </span>
                        <div className="flex flex-col gap-3">
                            <a href="https://linkedin.com/in/sowmiyan-s" target="_blank" className="flex items-center gap-3 text-xs font-mono transition-colors hover:text-red-600 uppercase">
                                <Linkedin size={14} className="text-red-600" /> <ScrambleText text="LinkedIn" triggerOnHover />
                            </a>
                            <a href="https://instagram.com/sowmiyan.s_" target="_blank" className="flex items-center gap-3 text-xs font-mono transition-colors hover:text-red-600 uppercase">
                                <Instagram size={14} className="text-red-600" /> <ScrambleText text="Instagram" triggerOnHover />
                            </a>
                            <a href="https://twitter.com/sowmiyan_s" target="_blank" className="flex items-center gap-3 text-xs font-mono transition-colors hover:text-red-600 uppercase">
                                <Twitter size={14} className="text-red-600" /> <ScrambleText text="X (Twitter)" triggerOnHover />
                            </a>
                            <a href="https://medium.com/@sowmiyan_s_" target="_blank" className="flex items-center gap-3 text-xs font-mono transition-colors hover:text-red-600 uppercase">
                                <PenTool size={14} className="text-red-600" /> <ScrambleText text="Medium" triggerOnHover />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-left md:text-right justify-between md:items-end">
                        <div className="flex flex-col md:items-end gap-1">
                            <a href="/admin" className="text-[10px] font-mono opacity-40 hover:opacity-100 hover:text-red-500 transition-all uppercase tracking-[0.4em]">Admin Panel</a>
                        </div>
                        <span className="text-[10px] font-mono opacity-40 tracking-widest uppercase italic mt-4 md:mt-0">© 2026 Sowmiyan S</span>
                    </div>
                </div>
            </div>

            {/* Custom Scroll Indicator */}
            <div className="absolute left-6 bottom-12 flex items-center gap-4 group cursor-pointer transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="w-10 h-[1px] bg-red-600 group-hover:w-20 transition-all duration-300" />
                <span className="text-[10px] font-mono uppercase opacity-40 group-hover:opacity-100 transition-opacity">Return to Origin</span>
            </div>
        </footer>
    );
};

export default Footer;

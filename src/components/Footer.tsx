import React from 'react';
import { Mail, MapPin, Linkedin, Instagram, Phone, PenTool, Twitter } from 'lucide-react';
import ScrambleText from './ScrambleText';

const Footer = () => {
    return (
        <footer id="contact" className="relative py-12 px-6 cross-bg border-t border-white/10 z-10 overflow-hidden bg-black text-white">
            {/* Terminal Close-out Details (Static - No Hover) */}
            <div className="absolute top-12 left-12 opacity-20 text-[8px] font-mono uppercase tracking-[0.5em] hidden md:block select-none grayscale cursor-default">
                 <ScrambleText text="Terminal v1.02" delay={4} /><br/>
                 Encryption: SH256<br/>
                 Auth Stable: OK
            </div>

            <div className="absolute top-12 right-12 opacity-20 text-[8px] font-mono uppercase tracking-[0.5em] text-right hidden md:block select-none grayscale cursor-default">
                 Loc Ref: CHN 04<br/>
                 <span className="text-red-500 font-bold">End of Transmission</span>
            </div>

            {/* Visual Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 -translate-y-1/2 translate-x-1/2 rotate-45 pointer-events-none opacity-20" />
            
            <div className="max-w-7xl mx-auto flex flex-col gap-12 relative">
                <div className="flex flex-col gap-4">
                     <span className="text-[10px] opacity-40 font-mono tracking-[0.4em] uppercase text-red-600">
                        <ScrambleText text="06 // Core Contact" />
                     </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-red-600">
                            <ScrambleText text="Physical Archive" triggerOnHover />
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
                            <ScrambleText text="Direct Comms" triggerOnHover />
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
                            <ScrambleText text="Social Matrix" triggerOnHover />
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
                            <span className="text-[8px] font-mono opacity-40 uppercase">Connection Stability</span>
                            <div className="flex gap-1">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className={`w-1 h-3 ${i < 10 ? 'bg-red-600' : 'bg-white/10'}`} />
                                ))}
                            </div>
                            <a href="/admin" className="text-[7px] font-mono opacity-20 hover:opacity-100 transition-opacity uppercase mt-1 tracking-[0.4em]">Management [Root Access]</a>
                        </div>
                        <span className="text-[10px] font-mono opacity-40 tracking-widest uppercase italic mt-4 md:mt-0">© 2026 Archived Intelligence</span>
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

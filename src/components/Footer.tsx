import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="relative py-24 px-6 cross-bg border-t border-white/10 z-10 overflow-hidden">
            {/* Visual Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 -translate-y-1/2 translate-x-1/2 rotate-45 pointer-events-none opacity-20" />
            
            <div className="max-w-7xl mx-auto flex flex-col gap-24 relative">
                <div className="flex flex-col gap-8">
                     <span className="text-[10px] opacity-40 font-mono tracking-[0.4em]">04 // CORE CONTACT</span>
                    <h2 className="text-6xl md:text-[11rem] font-heading font-black leading-none tracking-tighter text-white uppercase mix-blend-difference">
                        SOWMIYAN <span className="text-red-700">S</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Physical Archive</span>
                        <p className="text-xs font-mono tracking-tight leading-relaxed opacity-60">
                            Namakkal District, Tamil Nadu<br/>
                            India // 637203
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Connect Matrix</span>
                        <div className="flex flex-col gap-4">
                            <a href="mailto:sowmisowmiyan58@gmail.com" className="text-xs font-heading font-extrabold transition-colors hover:text-red-600 tracking-widest uppercase">
                                Email Node
                            </a>
                            <div className="flex gap-4">
                                <a href="https://github.com/sowmiyan-s" target="_blank" className="text-[10px] font-mono transition-colors hover:text-red-700 uppercase tracking-tight">[01] GitHub</a>
                                <a href="https://linkedin.com/in/sowmiyan-s" target="_blank" className="text-[10px] font-mono transition-colors hover:text-red-700 uppercase tracking-tight">[02] LinkedIn</a>
                            </div>
                            <span className="text-[10px] font-mono opacity-20 tracking-widest">TEL: +91 9042561295</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-right justify-between items-end">
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-[8px] font-mono opacity-40 uppercase">Connection Stability</span>
                            <div className="flex gap-1">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className={`w-1 h-3 ${i < 10 ? 'bg-red-600' : 'bg-white/10'}`} />
                                ))}
                            </div>
                            <a href="/admin" className="text-[7px] font-mono opacity-20 hover:opacity-100 transition-opacity uppercase mt-1 tracking-[0.4em]">Management [Root Access]</a>
                        </div>
                        <span className="text-[10px] font-mono opacity-40 tracking-widest uppercase italic">© 2026 Archived Intelligence</span>
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

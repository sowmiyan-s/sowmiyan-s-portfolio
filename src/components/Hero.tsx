import ScrambleText from './ScrambleText';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden z-10 w-full bg-black">
            {/* Professional Background Image with Tactical Overlays */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-[1.05]" 
                    style={{ 
                        backgroundImage: "url('/images/hero-bg.png')",
                        filter: "brightness(0.6) contrast(1.1) grayscale(0.4)" 
                    }} 
                />
                
                {/* Tactical Fog / Depth Mask */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
                
                {/* Animated Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
            </div>
            
            <div className="max-w-7xl w-full flex flex-col items-center gap-12 relative z-20 mt-16">
                {/* Top-Right: Crash Log Pod */}
                <div className="absolute -top-12 right-0 w-40 h-40 border border-white/5 flex items-center justify-center opacity-40 group hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 border-t border-r border-red-600 absolute top-0 right-0" />
                    <div className="text-[9px] font-mono leading-relaxed p-4 tracking-tighter">
                        <span className="text-red-500 font-bold">System Entry</span><br/>
                        Crash Log: 001<br/>
                        Time: 23:29:41<br/>
                        Loc: CHN Sector<br/>
                        <span className="opacity-50">----------------</span><br/>
                        <ScrambleText text="Status: Breached" delay={2} />
                    </div>
                </div>

                {/* Top-Left: Core Diagnostics Pod */}
                <div className="absolute -top-8 left-0 w-48 h-20 border-l border-white/10 hidden lg:flex flex-col justify-center pl-6 opacity-30 hover:opacity-80 transition-opacity translate-x-[-20%]">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-red-600 mb-1 font-bold">Core Diagnostics</span>
                    <div className="flex gap-4 text-[9px] font-mono opacity-60">
                         <span>Temp: 42°C</span>
                         <span>Load: 12%</span>
                    </div>
                    <p className="text-[8px] font-mono mt-2 text-white/40">NV GeForce RTX Pulse: Active</p>
                </div>

                {/* Bottom-Left: Connectivity Pod */}
                <div className="absolute bottom-32 -left-12 w-32 h-32 border border-white/5 hidden xl:flex items-center justify-center opacity-20">
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-red-600" />
                    <div className="text-[8px] font-mono text-center tracking-widest leading-loose">
                        Uplink: <ScrambleText text="99.9%" delay={3} /><br/>
                        Signal Int: High<br/>
                        <div className="flex gap-1 justify-center mt-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-red-600 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 w-full text-center">
                    <div className="relative group cursor-none w-full px-4 overflow-hidden">
                        <h1 className="text-[clamp(2.5rem,7vw,8rem)] font-heading font-black leading-[1] tracking-tighter text-white uppercase mix-blend-difference transition-all group-hover:scale-[1.02] whitespace-nowrap">
                            <ScrambleText text="SOWMIYAN S" triggerOnView speed={0.5} delay={0.2} />
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-red-600 opacity-80">
                        <ScrambleText text="AI Engineer" triggerOnView triggerOnHover delay={0.8} />
                        <span className="opacity-50">•</span>
                        <ScrambleText text="Software Developer" triggerOnView triggerOnHover delay={1.0} />
                        <span className="opacity-50">•</span>
                        <ScrambleText text="Freelancer" triggerOnView triggerOnHover delay={1.2} />
                        <span className="opacity-50">•</span>
                        <ScrambleText text="Content Creator" triggerOnView triggerOnHover delay={1.4} />
                    </div>

                    <div className="text-sm md:text-base leading-relaxed font-mono mt-4 max-w-2xl text-white/70">
                        <ScrambleText 
                          text="Third-year B.Tech student passionate about AI, Machine Learning, and application development. Skilled in building intelligent solutions using modern tools and cloud platforms." 
                          triggerOnView 
                          speed={0.2}
                          delay={1.6} 
                        />
                    </div>
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

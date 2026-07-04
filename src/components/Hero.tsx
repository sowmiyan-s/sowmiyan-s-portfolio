import ScrambleText from './ScrambleText';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-start pt-24 pb-12 px-6 md:px-16 overflow-hidden z-10 w-full bg-transparent">
            {/* Professional Background Image with Tactical Overlays */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Animated Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
            </div>
            
            <div className="max-w-7xl w-full flex flex-col items-start gap-12 relative z-20 mt-16">
                <div className="flex flex-col items-start gap-6 w-full text-left">
                    <div className="relative group cursor-none w-full pr-4 overflow-hidden">
                        <h1 className="text-[clamp(2.5rem,7vw,8rem)] font-heading font-black leading-[1] tracking-tighter text-white uppercase transition-all group-hover:scale-[1.02] whitespace-nowrap drop-shadow-[0_5px_15px_rgba(0,0,0,0.95)]">
                            <ScrambleText text="SOWMIYAN S" triggerOnView speed={0.5} delay={0.2} />
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap justify-start items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-red-500 font-bold bg-black/75 backdrop-blur-[3px] px-6 py-3 border border-white/5 shadow-2xl rounded-sm">
                        <ScrambleText text="AI Engineer" triggerOnView triggerOnHover delay={0.8} />
                        <span className="text-white/20 font-light">•</span>
                        <ScrambleText text="Software Developer" triggerOnView triggerOnHover delay={1.0} />
                        <span className="text-white/20 font-light">•</span>
                        <ScrambleText text="Freelancer" triggerOnView triggerOnHover delay={1.2} />
                        <span className="text-white/20 font-light">•</span>
                        <ScrambleText text="Content Creator" triggerOnView triggerOnHover delay={1.4} />
                    </div>

                    <div className="text-sm md:text-base leading-relaxed font-mono mt-4 max-w-2xl text-white/90 bg-black/65 backdrop-blur-[3px] p-5 border border-white/5 text-left">
                        <ScrambleText
                          text="Final-year B.Tech AI & Data Science student. Building LLM applications, multi-agent systems and production-ready web apps."
                          triggerOnView
                          speed={0.2}
                          delay={1.6}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

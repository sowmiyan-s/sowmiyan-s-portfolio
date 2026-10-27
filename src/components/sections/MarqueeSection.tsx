import React from 'react';

interface MarqueeSectionProps {
    items?: string[];
    speed?: string;
    className?: string;
}

const DEFAULT_ITEMS = [
    'AUTONOMOUS AI AGENTS',
    'MULTI-AGENT WORKFLOWS',
    'PRODUCTION FULL-STACK SYSTEMS',
    'HIGH-PERFORMANCE ARCHITECTURES',
    'LLM ORCHESTRATION',
    'DISTRIBUTED DATA PIPELINES',
];

const MarqueeSection: React.FC<MarqueeSectionProps> = ({ 
    items = DEFAULT_ITEMS,
    speed = '45s',
    className = '' 
}) => {
    return (
        <section 
            aria-label="Capabilities Marquee" 
            className={`relative py-2.5 sm:py-3 overflow-hidden bg-neutral-950/70 border-y border-white/10 backdrop-blur-md z-10 select-none ${className}`}
        >
            <div className="relative overflow-hidden w-full flex">
                <div
                    className="animate-marquee-left flex shrink-0 items-center whitespace-nowrap text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-white/85 pointer-events-none"
                    style={{
                        '--marquee-speed': speed,
                    } as React.CSSProperties}
                >
                    {items.map((item, idx) => (
                        <React.Fragment key={`marquee-1-${idx}`}>
                            <span className="mx-3 sm:mx-5 transition-colors hover:text-white">{item}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] inline-block mx-2 shrink-0" aria-hidden="true" />
                        </React.Fragment>
                    ))}
                </div>
                <div
                    className="animate-marquee-left flex shrink-0 items-center whitespace-nowrap text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-white/85 pointer-events-none"
                    aria-hidden="true"
                    style={{
                        '--marquee-speed': speed,
                    } as React.CSSProperties}
                >
                    {items.map((item, idx) => (
                        <React.Fragment key={`marquee-2-${idx}`}>
                            <span className="mx-3 sm:mx-5 transition-colors hover:text-white">{item}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] inline-block mx-2 shrink-0" aria-hidden="true" />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarqueeSection;


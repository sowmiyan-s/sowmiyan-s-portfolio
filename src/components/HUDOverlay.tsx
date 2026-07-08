import React, { useEffect, useState } from 'react';

const HUDOverlay = () => {
    const [fps, setFps] = useState(60);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
        };

        let frameCount = 0;
        let lastTime = performance.now();
        let rafId: number;

        const loop = () => {
            frameCount++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                setFps(Math.round((frameCount * 1000) / (now - lastTime)));
                frameCount = 0;
                lastTime = now;
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden font-mono text-[9px] text-red-500/30 uppercase tracking-[0.2em] select-none hidden md:block">
            {/* Top Left: Diagnostics */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 border-l border-t border-red-500/20 pl-3 pt-3">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                    <span className="text-red-500/50">SYSTEM: ACTIVE</span>
                </div>
                <span>FPS: {fps} // REF_STREAM</span>
                <span>CORE: REACT_GL_v18</span>
            </div>

            {/* Top Right: Location & Identity */}
            <div className="absolute top-6 right-6 flex flex-col gap-1 border-r border-t border-red-500/20 pr-3 pt-3 text-right">
                <span>LOC: 11.3803° N // 77.8927° E</span>
                <span>TOWN: NAMAKKAL, TN</span>
                <span>STREAM: @BOUND-BY-CODE</span>
            </div>

            {/* Bottom Left: Mouse Coordinates */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-1 border-l border-b border-red-500/20 pl-3 pb-3">
                <span>X_COORD: {mousePos.x} PX</span>
                <span>Y_COORD: {mousePos.y} PX</span>
                <span>VECTOR: [{(mousePos.x / (window.innerWidth || 1)).toFixed(2)}, {(mousePos.y / (window.innerHeight || 1)).toFixed(2)}]</span>
            </div>

            {/* Bottom Right: Status Indicators */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-1 border-r border-b border-red-500/20 pr-3 pb-3 text-right">
                <span>PORTFOLIO_CORE // LIVE</span>
                <span>BUILD: 2026.07.07</span>
                <span>LIC: CREATIVE_COMMONS</span>
            </div>

            {/* Subtle Screen Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-red-500/10" />
            <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-red-500/10" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-red-500/10" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-red-500/10" />
        </div>
    );
};

export default HUDOverlay;

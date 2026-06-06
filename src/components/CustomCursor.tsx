import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const xLineRef = useRef<HTMLDivElement>(null);
    const yLineRef = useRef<HTMLDivElement>(null);
    const coordsRef = useRef<HTMLDivElement>(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [shots, setShots] = useState<{ id: number, x: number, y: number }[]>([]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            
            // Core positioning
            if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (xLineRef.current) xLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
            if (yLineRef.current) yLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
            
            if (coordsRef.current) {
                // Offset coordinates to not overlap the lines
                coordsRef.current.style.transform = `translate3d(${x + 24}px, ${y + 24}px, 0)`;
                coordsRef.current.innerHTML = `
                    <div class="flex flex-col gap-0.5">
                        <span class="opacity-40">POS_DATA</span>
                        <div class="flex gap-2 font-black">
                            <span>X:${Math.floor(x)}</span>
                            <span>Y:${Math.floor(y)}</span>
                        </div>
                    </div>
                `;
            }

            const target = e.target as HTMLElement;
            if (target.closest('a, button, .group, [role="button"], .cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            setIsClicking(true);
            const newShot = { id: Date.now(), x: e.clientX, y: e.clientY };
            setShots(prev => [...prev.slice(-10), newShot]);
            
            // Auto cleanup
            setTimeout(() => {
                setShots(prev => prev.filter(s => s.id !== newShot.id));
            }, 600);
        };
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
            {/* Bullet Impacts & Tracers */}
            {shots.map(shot => (
                <div key={shot.id} className="absolute inset-0 pointer-events-none">
                    {/* Central Impact Flash */}
                    <div 
                        className="absolute w-12 h-12 -ml-6 -mt-6 bg-red-600/40 rounded-full blur-xl animate-out fade-out zoom-out duration-300" 
                        style={{ left: shot.x, top: shot.y }} 
                    />
                    {/* Sharp Impact Ring */}
                    <div 
                        className="absolute w-4 h-4 -ml-2 -mt-2 border border-red-600 rounded-full animate-ping duration-200" 
                        style={{ left: shot.x, top: shot.y }} 
                    />
                    {/* Randomized Sparks/Tracers */}
                    {[...Array(4)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full transition-all"
                            style={{ 
                                left: shot.x, 
                                top: shot.y,
                                transform: `rotate(${i * 90 + Math.random() * 45}deg) translate(20px)`,
                            }}
                        >
                            <div className="w-8 h-[1px] bg-gradient-to-r from-red-600 to-transparent animate-out slide-out-to-right-1/2 duration-500" />
                        </div>
                    ))}
                </div>
            ))}

            {/* Tactical Grid Lines (Rulers) */}
            <div 
                ref={xLineRef} 
                className="absolute left-0 right-0 h-[1px] bg-red-600/30 top-0 will-change-transform flex items-center"
            >
                {/* Visual wrapper for jitter/scaling effects */}
                <div className={`w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,0,0,0.5)_20px,rgba(255,0,0,0.5)_21px)] transition-transform duration-200 ${isClicking ? 'translate-x-[2px]' : ''}`} />
            </div>
            
            <div 
                ref={yLineRef} 
                className="absolute top-0 bottom-0 w-[1px] bg-red-600/30 left-0 will-change-transform flex justify-center"
            >
                {/* Visual wrapper for jitter/scaling effects */}
                <div className={`h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(255,0,0,0.5)_20px,rgba(255,0,0,0.5)_21px)] transition-transform duration-200 ${isClicking ? 'translate-y-[2px]' : ''}`} />
            </div>

            {/* Targeting Reticle (The "Box") */}
            <div 
                ref={cursorRef} 
                className="absolute top-0 left-0 -ml-4 -mt-4 w-8 h-8 flex items-center justify-center z-20 will-change-transform"
            >
                {/* Visual container that handles scaling/click-effects (keeping the parent raw for position) */}
                <div className={`w-full h-full flex items-center justify-center transition-transform duration-200 ${isClicking ? 'scale-[0.8]' : 'scale-100'}`}>
                    {/* Muzzle Flash / Shockwave */}
                    <div className={`absolute inset-0 rounded-full bg-red-600 transition-all duration-300 ${isClicking ? 'scale-[4] opacity-0 blur-xl' : 'scale-0 opacity-0'}`} />

                    {/* Visual Reticle Wrapper */}
                    <div className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ${isHovering ? 'scale-[2.5]' : 'scale-100'} ${isClicking ? 'scale-[3]' : ''}`}>
                        {/* Corner Brackets */}
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-red-600 transition-all duration-300" style={{ borderColor: isHovering || isClicking ? 'white' : '#FF0000' }} />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-red-600 transition-all duration-300" style={{ borderColor: isHovering || isClicking ? 'white' : '#FF0000' }} />
                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-red-600 transition-all duration-300" style={{ borderColor: isHovering || isClicking ? 'white' : '#FF0000' }} />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-red-600 transition-all duration-300" style={{ borderColor: isHovering || isClicking ? 'white' : '#FF0000' }} />
                        
                        {/* Central Point */}
                        <div className={`w-1 h-1 transition-all duration-300 rounded-full ${isHovering || isClicking ? 'bg-white scale-150 shadow-[0_0_15px_white]' : 'bg-red-600'}`} />
                    </div>
                </div>
            </div>

            {/* Digital Coordinate Feed */}
            <div 
                ref={coordsRef}
                className={`absolute top-0 left-0 text-[8px] font-mono leading-none flex flex-col will-change-transform transition-colors uppercase tracking-[0.2em] ${isHovering ? 'text-white' : 'text-red-600 shadow-sm'}`}
            />
        </div>
    );
};

export default CustomCursor;

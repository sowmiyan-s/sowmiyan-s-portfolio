import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const xLineRef = useRef<HTMLDivElement>(null);
    const yLineRef = useRef<HTMLDivElement>(null);
    const coordsRef = useRef<HTMLDivElement>(null);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            
            if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (xLineRef.current) xLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
            if (yLineRef.current) yLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
            if (coordsRef.current) {
                coordsRef.current.style.transform = `translate3d(${x + 15}px, ${y + 15}px, 0)`;
                coordsRef.current.innerHTML = `<span>X_${Math.floor(x)}</span><span>Y_${Math.floor(y)}</span>`;
            }

            const target = e.target as HTMLElement;
            if (target.closest('a, button, .group, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Crosshair Axes */}
            <div ref={xLineRef} className="absolute left-0 right-0 h-[1px] bg-red-600/80 top-0 will-change-transform" />
            <div ref={yLineRef} className="absolute top-0 bottom-0 w-[1px] bg-red-600/80 left-0 will-change-transform" />

            {/* Square Targeter */}
            <div 
                ref={cursorRef} 
                className={`absolute top-0 left-0 -ml-2 -mt-2 w-4 h-4 border flex items-center justify-center will-change-transform transition-all duration-150 ${isHovering ? 'scale-[2.5] border-white bg-white/20' : 'border-red-600'}`}
            >
                <div className={`w-1 h-1 transition-all ${isHovering ? 'opacity-0' : 'bg-red-600 opacity-100'}`} />
            </div>

            {/* Coordinates */}
            <div 
                ref={coordsRef}
                className={`absolute top-0 left-0 text-[10px] font-mono font-black leading-tight flex flex-col will-change-transform transition-colors ${isHovering ? 'text-white' : 'text-red-600'}`}
            />
        </div>
    );
};

export default CustomCursor;

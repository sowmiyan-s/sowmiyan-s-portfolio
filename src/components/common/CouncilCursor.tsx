import React, { useEffect, useRef, useState } from 'react';

interface CouncilCursorProps {
  size?: number;
}

const CouncilCursor: React.FC<CouncilCursorProps> = ({ size = 36 }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth <= 1024;
    return !isCoarse && !(hasTouch && isSmall) && !isSmall;
  });

  useEffect(() => {
    const checkMedia = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isSmall = window.innerWidth <= 1024;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setEnabled(!isCoarse && !(hasTouch && isSmall) && !isSmall);
    };

    window.addEventListener('resize', checkMedia, { passive: true });
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let rafId: number | null = null;

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'a, button, [role="button"], input, select, textarea, .cursor-pointer, .clickable, .group'
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    rafId = requestAnimationFrame(render);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999999] overflow-hidden select-none">
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform -ml-2 -mt-1 transition-opacity duration-150"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="transition-transform duration-100 ease-out origin-top-left"
          style={{
            transform: isClicking
              ? 'scale(0.85) rotate(-4deg)'
              : isHovering
              ? 'scale(1.1) rotate(2deg)'
              : 'scale(1) rotate(0deg)',
          }}
        >
          <img
            src="/cursor/angry-cursor.png"
            alt="Custom Cursor"
            width={size}
            height={size}
            className="block select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export const AngryCursor = CouncilCursor;
export default CouncilCursor;

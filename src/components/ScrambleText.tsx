import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const chars = "!<>-_\\/[]{}—=+*^?#________";

interface ScrambleTextProps {
  text: string;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
  className?: string;
  speed?: number;
  delay?: number;
}

const ScrambleText = ({ 
    text = "", 
    triggerOnHover = false, 
    triggerOnView = true,
    className = "", 
    speed = 0.5,
    delay = 0 
}: ScrambleTextProps) => {
  const safeText = text || "";
  const [displayText, setDisplayText] = useState(() => safeText);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.1,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (isScrambling || !safeText) return;
    setIsScrambling(true);
    let iteration = 0;

    // Adaptive speed for long texts
    const adaptiveSpeed = safeText.length > 50 ? speed * 4 : speed;

    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        safeText
          .split("")
          .map((char, index) => {
            if (index < iteration) return safeText[index];
            if (char === " ") return " "; // preserve spaces for readability
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= safeText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(safeText);
        setIsScrambling(false);
      }

      iteration += adaptiveSpeed;
    }, 30);
  };

  useEffect(() => {
    setDisplayText(safeText);
  }, [safeText]);

  useEffect(() => {
    if (triggerOnView && isInView && safeText) {
      const timeoutId = setTimeout(startScramble, (delay * 1000) + 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, triggerOnView, delay, safeText]);

  return (
    <motion.span
      ref={containerRef}
      onMouseEnter={() => triggerOnHover && startScramble()}
      initial={{ opacity: 1 }}
      className={`inline-block ${className} min-h-[1em]`}
    >
      {displayText}
    </motion.span>
  );
};

export default ScrambleText;

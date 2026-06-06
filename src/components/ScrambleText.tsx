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
    text, 
    triggerOnHover = false, 
    triggerOnView = true,
    className = "", 
    speed = 0.5,
    delay = 0 
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(() => 
    text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
  );
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.3, // Require 30% visibility for a deliberate reveal
    margin: "0px 0px -50px 0px"
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;

    // Adaptive speed for long texts
    const adaptiveSpeed = text.length > 50 ? speed * 4 : speed;

    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " "; // preserve spaces for readability
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iteration += adaptiveSpeed;
    }, 30);
  };

  useEffect(() => {
    // If not in view yet, keep it scrambled periodically to look 'alive'
    if (!isInView && !isScrambling) {
        const liveInterval = setInterval(() => {
            setDisplayText(prev => 
                text.split("").map((c, i) => {
                    if (c === " ") return " ";
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
        }, 1500);
        return () => clearInterval(liveInterval);
    }
    
    if (triggerOnView && isInView) {
      const timeoutId = setTimeout(startScramble, (delay * 1000) + 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, triggerOnView, delay, text]);

  return (
    <motion.span
      ref={containerRef}
      onMouseEnter={() => triggerOnHover && startScramble()}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className={`inline-block ${className} min-h-[1em]`}
    >
      {displayText}
    </motion.span>
  );
};

export default ScrambleText;

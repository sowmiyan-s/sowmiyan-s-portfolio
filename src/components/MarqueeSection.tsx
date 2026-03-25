import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useAnimationFrame } from 'framer-motion';

// Wraps the word and repeats it
const wrapText = (text: string, times: number) => {
    return Array(times).fill(text).join(" • ");
};

const MarqueeSection = () => {
    const text = wrapText("Sowmiyan S", 8);
    const text2 = wrapText("Sowmiyan S", 8);

    const baseVelocity = -0.05; // Very slow speed by default
    const baseX = useRef(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    
    // Convert smooth velocity into a modifier that speeds up the marquee purely based on scroll force
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 10], {
        clamp: false
    });

    const [x1, setX1] = useState(0);

    useAnimationFrame((t, delta) => {
        let moveBy = baseVelocity * (delta / 20); // Base idle speed
        
        // Add physics scroll force
        moveBy += moveBy * velocityFactor.get();

        baseX.current += moveBy;

        // Reset seamlessly when it travels half its duplicated width
        if (baseX.current <= -50) {
            baseX.current = 0;
        } else if (baseX.current > 0) {
            baseX.current = -50;
        }

        setX1(baseX.current);
    });

    return (
        <section className="py-6 bg-white overflow-hidden relative border-y border-red-600 -skew-y-2 scale-105 my-12">
            <div className="w-[300vw] flex flex-nowrap items-center text-red-600" style={{ fontFamily: "'Ruthie', cursive" }}>
                <motion.div 
                    className="flex flex-nowrap whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-bold mix-blend-multiply"
                    style={{ transform: `translateX(${x1}%)` }}
                >
                    <span className="mx-8">{text}</span>
                    <span className="mx-8">{text2}</span>
                </motion.div>
            </div>
        </section>
    );
};

export default MarqueeSection;

import React, { useState, useEffect } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

const DecodeText = ({ text, className = '' }: { text: string, className?: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        // Only run if triggered
        if (!isHovering && hasAnimated) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev => {
                return text.split('').map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
            });

            if(iteration >= text.length) {
                clearInterval(interval);
                setHasAnimated(true);
            }
            iteration += 1/3;
        }, 30);

        return () => clearInterval(interval);
    }, [isHovering, text, hasAnimated]);

    return (
        <span 
            className={className} 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </span>
    );
};

export default DecodeText;

import React from 'react';
import { motion } from 'framer-motion';
import { BrutalistStar } from './ArtworkAccents';

const MARQUEE_ITEMS = [
  'AI ENGINEER',
  'FREELANCER',
  'SOFTWARE DEVELOPER',
  'CONTENT CREATOR',
  'FORWARD DEPLOY ENGINEER',
];

export const HeroMarquee: React.FC = () => {
  // Duplicate for smooth seamless loop
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full relative z-20 border-y-2 border-zinc-900 bg-red-600 overflow-hidden select-none shadow-brutal">
      <div className="w-full py-3.5 sm:py-4 overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap gap-8 sm:gap-12 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
        >
          {repeated.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-8 shrink-0">
              <span className="font-heading text-lg sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.6)]">
                {item}
              </span>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-white" />
                <BrutalistStar size={14} color="#FFFFFF" spin={idx % 2 === 0} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroMarquee;

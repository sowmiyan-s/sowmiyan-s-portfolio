import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Top pinned Spring-animated Scroll Progress Bar
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-50 pointer-events-none"
    />
  );
};

/**
 * 8-point Brutalist Geometric Starburst
 */
export const BrutalistStar: React.FC<{
  className?: string;
  size?: number;
  color?: string;
  spin?: boolean;
}> = ({ className = '', size = 32, color = 'currentColor', spin = false }) => {
  const StarSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M50 0 L58 35 L90 20 L70 48 L100 50 L70 52 L90 80 L58 65 L50 100 L42 65 L10 80 L30 52 L0 50 L30 48 L10 20 L42 35 Z" />
    </svg>
  );

  if (spin) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="inline-block"
      >
        {StarSvg}
      </motion.div>
    );
  }

  return StarSvg;
};

/**
 * Traditional Japanese Hanko Stamp / Inkan Red Seal
 * Authentic anime & Japanese editorial signature mark
 */
export const HankoSeal: React.FC<{
  kanji?: string;
  size?: number;
  className?: string;
}> = ({ kanji = '龍', size = 36, className = '' }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center border-2 border-red-600 bg-red-600/10 text-red-600 font-bold select-none p-1 shadow-brutal-sm ${className}`}
      title={`Hanko Seal: ${kanji}`}
    >
      <div className="w-full h-full border border-red-600 flex items-center justify-center">
        <span className="text-sm font-black leading-none">{kanji}</span>
      </div>
    </div>
  );
};

/**
 * Traditional Japanese Kumo (Cloud) SVG Accent
 * Matches the cloud art in Sowmiyan's portrait
 */
export const JapaneseCloud: React.FC<{
  size?: number;
  className?: string;
  color?: string;
}> = ({ size = 64, className = '', color = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 120 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25 45 C15 45 5 40 5 28 C5 16 18 10 30 14 C35 5 50 2 62 10 C72 2 92 4 98 16 C110 16 118 24 115 36 C112 46 100 48 92 46 C86 58 68 62 55 54 C45 60 32 58 25 45 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 28 C40 22 55 24 60 32 M72 26 C82 22 92 28 94 36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="58" cy="38" r="6" stroke={color} strokeWidth="2" />
    </svg>
  );
};

/**
 * Stylized Eastern Coiled Dragon Watermark Motif
 */
export const JapaneseDragonWatermark: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 320, color = '#DC2626' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dragon Head & Horns */}
      <path
        d="M140 40 C155 30 170 35 175 50 C180 65 165 75 150 72 C135 70 120 85 110 75 C100 65 115 50 140 40 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M165 35 L180 18 M155 30 L162 15 M170 48 L190 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Dragon Whiskers */}
      <path d="M145 65 C130 80 110 85 90 82" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M150 72 C140 92 120 100 100 95" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Sinuous Serpent Body Coils */}
      <path
        d="M135 68 C110 80 75 70 60 90 C45 110 55 140 85 150 C115 160 150 140 160 110 C168 85 150 60 120 55 C90 50 50 75 40 110 C30 145 60 180 105 185 C145 190 180 165 185 125"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Dorsal Spine Fins */}
      <path d="M60 85 L52 78 M70 80 L65 70 M85 75 L82 65 M105 75 L108 65 M125 78 L130 68" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M68 142 L62 150 M82 153 L80 163 M100 157 L102 168 M120 153 L125 164" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Dragon Claws */}
      <path d="M50 115 L32 110 M50 120 L30 125 M50 125 L35 135" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M155 125 L175 130 M155 132 L178 140 M150 138 L170 150" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Flame / Pearl */}
      <circle cx="95" cy="115" r="7" stroke={color} strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
};

/**
 * Rotated Neo-Brutalist Sticker Badge
 */
export const StickerBadge: React.FC<{
  text: string;
  bg?: string;
  textColor?: string;
  rotateDeg?: number;
  className?: string;
}> = ({ text, bg = 'bg-white', textColor = 'text-zinc-950', rotateDeg = -2, className = '' }) => (
  <span
    style={{ transform: `rotate(${rotateDeg}deg)` }}
    className={`inline-block px-3 py-1.5 border-2 border-zinc-900 shadow-brutal-sm font-mono text-xs font-black uppercase tracking-wider select-none ${bg} ${textColor} ${className}`}
  >
    {text}
  </span>
);

/**
 * Editorial Kinetic Ribbon
 */
export const KineticRibbon: React.FC<{
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  bgClass?: string;
  textClass?: string;
}> = ({
  items,
  direction = 'left',
  speed = 25,
  className = '',
  bgClass = 'bg-zinc-900 border-y-2 border-zinc-900',
  textClass = 'text-white',
}) => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden py-2.5 sm:py-3 select-none ${bgClass} ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-8 items-center"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0">
            <span className={`font-mono text-xs sm:text-sm font-black uppercase tracking-wider ${textClass}`}>
              {item}
            </span>
            <BrutalistStar size={12} color="#DC2626" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

export interface FloatingCornerCloudProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
  className?: string;
  theme?: 'light' | 'dark';
  variant?: 'white' | 'red';
  sizeClass?: string;
  duration?: number;
  driftX?: number;
  driftY?: number;
}

export const FloatingCornerCloud: React.FC<FloatingCornerCloudProps> = ({
  position = 'top-left',
  className = '',
  theme = 'light',
  variant = 'white',
  sizeClass = 'w-36 sm:w-48 lg:w-56',
  duration = 8,
  driftX = 14,
  driftY = 10,
}) => {
  const positionClasses = {
    'top-left': 'absolute -top-8 -left-8',
    'top-right': 'absolute -top-8 -right-8',
    'bottom-left': 'absolute -bottom-8 -left-8',
    'bottom-right': 'absolute -bottom-8 -right-8',
    'custom': 'absolute',
  }[position];

  const cloudSrc =
    variant === 'red'
      ? '/images/decorations/red-cloud.png'
      : '/images/decorations/cloud-white.png';

  const themeClasses =
    theme === 'dark'
      ? 'opacity-[0.22] invert drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]'
      : 'opacity-[0.18] drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`${positionClasses} ${sizeClass} pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          x: [-driftX, driftX, -driftX],
          y: [-driftY, driftY, -driftY],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full"
      >
        <img
          src={cloudSrc}
          alt=""
          className={`w-full h-auto object-contain ${themeClasses}`}
        />
      </motion.div>
    </motion.div>
  );
};

export default FloatingCornerCloud;


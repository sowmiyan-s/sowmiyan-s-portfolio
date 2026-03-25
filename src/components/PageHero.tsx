import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  sectionNumber: string;
  title: string;
  subtitle?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ sectionNumber, title, subtitle }) => {
  return (
    <section className="relative px-6 pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 border-b border-primary/30 pb-12"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs opacity-40 font-mono italic tracking-widest"
          >
            {sectionNumber}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-heading font-black text-foreground uppercase tracking-tighter"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-48 h-1 bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.8)] origin-left"
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-sm font-mono text-muted-foreground max-w-xl uppercase tracking-wider"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;

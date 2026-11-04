import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';

interface Metric {
  value: string;
  suffix?: string;
  label: string;
  sublabel: string;
}

const METRICS: Metric[] = [
  {
    value: '371',
    suffix: '+',
    label: 'LeetCode Problems',
    sublabel: 'Algorithms & Data Structures',
  },
  {
    value: '01',
    label: 'Indian Patent',
    sublabel: 'Defect Detection System',
  },
  {
    value: '01',
    label: 'Research Paper',
    sublabel: 'IJCRT Journal Publication',
  },
  {
    value: '2nd',
    label: 'Hackathon Award',
    sublabel: 'Kongu Engineering College',
  },
];

export const MetricsStrip: React.FC = () => {
  return (
    <section className="w-full border-y-2 border-zinc-900 bg-white py-8 sm:py-14 px-4 sm:px-10 lg:px-16">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10"
        >
          {METRICS.map((metric, index) => (
            <motion.div
              key={index}
              variants={sectionReveal}
              className="flex flex-col border-l-2 sm:border-l-3 border-zinc-900 pl-3 sm:pl-5 group hover:translate-x-1 transition-transform"
            >
              <div className="flex items-baseline font-black tracking-tight sm:tracking-tighter text-zinc-950 text-4xl sm:text-6xl lg:text-7xl leading-none">
                <span>{metric.value}</span>
                {metric.suffix && (
                  <span className="text-red-600 ml-0.5">{metric.suffix}</span>
                )}
              </div>
              <span className="font-heading font-black text-xs sm:text-base uppercase tracking-tight text-zinc-900 mt-2">
                {metric.label}
              </span>
              <span className="text-[11px] sm:text-sm text-zinc-600 font-sans mt-0.5 leading-snug">
                {metric.sublabel}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsStrip;

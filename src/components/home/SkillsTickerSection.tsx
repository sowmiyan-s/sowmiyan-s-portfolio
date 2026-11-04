import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, viewportConfig } from '@/lib/motionPresets';

const ROW_ONE = [
  'CrewAI',
  'LangChain',
  'Claude API',
  'Autonomous Agents',
  'RAG Architectures',
  'PyTorch',
  'FastAPI',
  'pgvector',
  'Ollama',
  'Hugging Face',
  'n8n Workflows',
  'Prompt Engineering',
];

const ROW_TWO = [
  'Python 3.12',
  'TypeScript',
  'React 18',
  'Next.js',
  'JavaScript (ESNext)',
  'SQL & Relational DBs',
  'Java Core',
  'Tailwind CSS',
  'Framer Motion',
  'WebRTC Data Channels',
];

const ROW_THREE = [
  'PostgreSQL',
  'Supabase',
  'MongoDB',
  'Docker Containerization',
  'Linux CLI & Bash',
  'GitHub Actions CI/CD',
  'REST API Architecture',
  'AWS Services',
  'Vercel Edge',
  'Git Distributed VCS',
];

export const SkillsTickerSection: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 overflow-hidden bg-stone-100 border-y-2 border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 bg-red-600 border border-zinc-900 shadow-brutal-sm inline-block" />
              <span className="font-mono text-xs text-red-600 font-bold uppercase tracking-widest">
                TECHNICAL CAPABILITIES // NO JARGON
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
              PRODUCTION STACK
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-zinc-600 uppercase tracking-wider max-w-md">
            Production-tested frameworks, distributed protocols, and AI orchestration engines.
          </p>
        </motion.div>
      </div>

      {/* Infinite Horizontal Tickers with Opposite Scrolling Directions */}
      <div className="flex flex-col gap-4 group">
        {/* Row 1: Left */}
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-3 animate-ticker whitespace-nowrap group-hover:[animation-play-state:paused] py-1">
            {[...ROW_ONE, ...ROW_ONE, ...ROW_ONE].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-zinc-900 shadow-brutal-sm font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 hover:bg-red-600 hover:text-white transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-red-600 border border-zinc-900" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Right */}
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-3 animate-ticker-reverse whitespace-nowrap group-hover:[animation-play-state:paused] py-1">
            {[...ROW_TWO, ...ROW_TWO, ...ROW_TWO].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-zinc-900 shadow-brutal-sm font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-zinc-900 border border-zinc-900" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Row 3: Left */}
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-3 animate-ticker whitespace-nowrap group-hover:[animation-play-state:paused] py-1">
            {[...ROW_THREE, ...ROW_THREE, ...ROW_THREE].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-zinc-900 shadow-brutal-sm font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 hover:bg-red-600 hover:text-white transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-red-600 border border-zinc-900" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsTickerSection;

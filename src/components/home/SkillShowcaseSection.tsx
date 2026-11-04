import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';
import { Cpu, Code2, Layers, Database } from 'lucide-react';
import { BrutalistStar, StickerBadge } from './ArtworkAccents';

interface SkillDomain {
  id: string;
  name: string;
  icon: any;
  description: string;
  skills: string[];
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'ai',
    name: 'Autonomous AI & Agents',
    icon: Cpu,
    description: 'Tools and frameworks I use to build multi-agent swarms, autonomous workflows, and RAG pipelines.',
    skills: [
      'CrewAI',
      'LangChain',
      'Claude API',
      'FastAPI',
      'pgvector',
      'PyTorch',
      'Ollama',
      'Hugging Face',
      'n8n',
      'RAG Architectures',
    ],
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    icon: Code2,
    description: 'Core languages I write in daily for backend microservices, data structures, and client apps.',
    skills: [
      'Python',
      'TypeScript',
      'JavaScript',
      'Java',
      'SQL',
    ],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack & Systems',
    icon: Layers,
    description: 'Frontend and full-stack libraries I use to build clean, responsive user interfaces and real-time streaming.',
    skills: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'WebRTC P2P',
      'Framer Motion',
      'Supabase',
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Databases',
    icon: Database,
    description: 'Databases, containerization, and infrastructure tools I use to deploy and manage applications.',
    skills: [
      'Docker',
      'PostgreSQL',
      'MongoDB',
      'Linux & Bash',
      'GitHub Actions',
      'AWS',
    ],
  },
];

export const SkillShowcaseSection: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<string>('all');

  const filteredDomains = activeDomain === 'all'
    ? SKILL_DOMAINS
    : SKILL_DOMAINS.filter((d) => d.id === activeDomain);

  return (
    <section id="skills" className="w-full py-14 sm:py-24 px-4 sm:px-10 lg:px-16 bg-red-600 text-white border-y-2 border-zinc-900 relative overflow-hidden">
      {/* Background Graphic Watermark (Wix Studio / Motion aesthetic) */}
      <div className="absolute -top-12 -right-8 pointer-events-none select-none opacity-10 hidden md:block">
        <BrutalistStar size={340} color="#FFFFFF" />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12 pb-6 border-b-2 border-white/30"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-white/90 font-bold uppercase tracking-wider">
                My Tech Stack
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
            <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight sm:tracking-tighter text-white leading-none">
              SKILLS
            </h2>
            <p className="font-sans text-xs sm:text-base text-white/90 mt-2 max-w-xl leading-relaxed">
              Here is my core toolkit across autonomous AI, programming languages, full-stack frameworks, and cloud infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <StickerBadge text="VERIFIED STACK" bg="bg-white" textColor="text-red-600" rotateDeg={2} />
          </div>
        </motion.div>

        {/* Filter Pills with Horizontal Touch Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scroll" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveDomain('all')}
            className={`px-3.5 sm:px-4 py-2 border-2 border-zinc-900 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 ${
              activeDomain === 'all'
                ? 'bg-white text-zinc-950 shadow-brutal-sm'
                : 'bg-red-700/80 text-white hover:bg-red-700'
            }`}
          >
            All Skills ({SKILL_DOMAINS.reduce((acc, d) => acc + d.skills.length, 0)})
          </button>

          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isActive = activeDomain === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomain(domain.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 border-2 border-zinc-900 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-brutal-sm'
                    : 'bg-red-700/80 text-white hover:bg-red-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-600' : 'text-white'}`} />
                <span>{domain.name}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Grid with Framer Motion Layout Animation */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  key={domain.id}
                  className="bg-white text-zinc-950 border-2 border-zinc-900 shadow-brutal p-5 sm:p-7 flex flex-col justify-between group transition-shadow hover:shadow-brutal-lg"
                >
                  <div>
                    {/* Domain Title */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-zinc-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-600 text-white border-2 border-zinc-900 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <h3 className="font-heading text-lg sm:text-xl font-black uppercase tracking-tight text-zinc-950">
                          {domain.name}
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5">
                        {domain.skills.length} skills
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                      {domain.description}
                    </p>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-zinc-200">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-stone-100 border border-zinc-900 font-mono text-xs font-bold text-zinc-900 uppercase hover:bg-red-600 hover:text-white transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillShowcaseSection;

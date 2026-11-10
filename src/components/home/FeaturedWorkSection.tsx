import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';
import { FloatingCornerCloud } from '@/components/common/FloatingCornerCloud';

interface Project {
  id: string;
  num: string;
  title: string;
  desc: string;
  tech: string[];
  image: string;
  github: string;
  demo?: string;
  demoLabel?: string;
}

const REAL_PROJECTS: Project[] = [
  {
    id: 'crewlyze',
    num: '01',
    title: 'crewlyze',
    desc: 'An open-source autonomous multi-agent data analyst platform built with CrewAI and FastAPI. It converts CSV and Excel datasets into executive PDF reports and interactive charts.',
    tech: ['CrewAI', 'FastAPI', 'Python', 'JavaScript'],
    image: '/projects/crewlyze.png',
    github: 'https://github.com/sowmiyan-s/crewlyze',
    demo: 'https://www.npmjs.com/package/crewlyze',
    demoLabel: 'NPM Package',
  },
  {
    id: 'guard-rag',
    num: '02',
    title: 'GUARD-RAG',
    desc: 'An offline RAG chatbot tool packaged for Python. It allows users to interact with sensitive documents locally on their own machines with zero data leakage.',
    tech: ['Python', 'LangChain', 'RAG', 'CLI'],
    image: '/projects/guardrag.png',
    github: 'https://github.com/sowmiyan-s/GUARD-RAG',
  },
  {
    id: 'we-share',
    num: '03',
    title: 'We-Share',
    desc: 'An open-source desktop application for instant, high-speed file transfers between computers with or without an active Wi-Fi router.',
    tech: ['C#', '.NET', 'P2P Networking', 'WPF'],
    image: '/projects/weshare.png',
    github: 'https://github.com/sowmiyan-s/We-Share',
  },
];

export const FeaturedWorkSection: React.FC = () => {
  return (
    <section id="projects" className="w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-16 bg-[#FAFAF9] relative overflow-hidden">
      {/* Decorative Dragon & Cloud Watermarks */}
      <div 
        className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.05] w-[400px] sm:w-[500px]"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/dragon.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Floating Corner Clouds (White & Red Drifting) */}
      <FloatingCornerCloud
        position="top-left"
        variant="red"
        duration={8}
        sizeClass="w-32 sm:w-44"
      />
      <FloatingCornerCloud
        position="bottom-right"
        variant="white"
        duration={9.5}
        sizeClass="w-36 sm:w-52"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Clean Header - No Mini-Title Eyebrows or Terminal Styling */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-zinc-900"
        >
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-950 leading-none">
              RECENT PROJECTS
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-600 mt-2">
              Real open-source tools and software systems I have designed and built.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-zinc-900 text-white border-2 border-zinc-900 shadow-brutal font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all self-start sm:self-auto hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-95"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </Link>
        </motion.div>

        {/* 3 Featured Projects Grid (Optimized for Mobile) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {REAL_PROJECTS.map((proj) => (
            <motion.div
              key={proj.id}
              variants={sectionReveal}
              whileHover={{ y: -4 }}
              className="bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181B] sm:shadow-brutal hover:shadow-brutal-lg hover:border-red-600 p-4 sm:p-6 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Top Number */}
                <div className="flex items-center justify-between pb-2 sm:pb-3 mb-2.5 sm:mb-4 border-b-2 border-zinc-900">
                  <span className="font-sans text-2xl sm:text-3xl font-black text-red-600 leading-none">
                    {proj.num}
                  </span>
                </div>

                {/* Project Image */}
                <div className="w-full aspect-[16/9] bg-stone-100 border-2 border-zinc-900 overflow-hidden mb-2.5 sm:mb-4 relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/og-image.png';
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-zinc-950 group-hover:text-red-600 transition-colors mb-1.5 sm:mb-2">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  {proj.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-6">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-stone-100 border border-zinc-900 text-[10px] sm:text-xs font-sans font-bold text-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 sm:pt-4 border-t-2 border-zinc-900 flex items-center gap-2">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-sans text-xs font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>

                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>{proj.demoLabel || 'Demo'}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;

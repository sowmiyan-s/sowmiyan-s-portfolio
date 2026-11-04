import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Mail, 
  FileText, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Brain, 
  Code2, 
  Database, 
  Layers, 
  Award, 
  BookOpen, 
  Terminal, 
  Clock, 
  Youtube, 
  Linkedin,
  X,
  Download
} from 'lucide-react';
import { certificatesList, Certificate } from '@/lib/certificates';

const RESUME_URL = "https://drive.google.com/file/d/1NmangaAFo0eGT-KAsZi4VWOm6zI-KPk6/view?usp=sharing";
const EMAIL = "sowmisowmiyan58@gmail.com";
const PHONE = "+919042561295";

interface FlagshipProject {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  tech: string[];
  image: string;
  github: string;
  demo?: string;
}

const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'crewlyze',
    title: 'CrewLyze',
    tagline: 'Autonomous Multi-Agent Codebase Intelligence',
    desc: 'Orchestrates collaborative LLM agents with specialized roles to audit, map architectural dependencies, and refactor complex multi-language repositories.',
    tech: ['CrewAI', 'LangChain', 'FastAPI', 'Python', 'React'],
    image: '/projects/crewlyze.png',
    github: 'https://github.com/sowmiyan-s/CrewLyze',
  },
  {
    id: 'guardrag',
    title: 'GuardRAG',
    tagline: 'Enterprise Privacy-Preserving RAG Engine',
    desc: 'High-assurance Retrieval-Augmented Generation pipeline featuring automated PII masking, factual verification guardrails, and pgvector embeddings.',
    tech: ['LangChain', 'Claude API', 'PostgreSQL', 'FastAPI', 'Tailwind'],
    image: '/projects/guardrag.png',
    github: 'https://github.com/sowmiyan-s/GuardRAG',
  },
  {
    id: 'weshare',
    title: 'WeShare',
    tagline: 'Decentralized P2P File Distribution Platform',
    desc: 'Zero-cloud peer-to-peer data streaming platform leveraging WebRTC data channels for encrypted high-throughput browser-to-browser transfers.',
    tech: ['React', 'TypeScript', 'WebRTC', 'Supabase', 'Tailwind CSS'],
    image: '/projects/weshare.png',
    github: 'https://github.com/sowmiyan-s/we-share',
    demo: 'https://weshare-live.vercel.app',
  },
];

const STACK_TAGS = {
  ai: ['LangChain', 'CrewAI', 'Claude API', 'PyTorch', 'FastAPI', 'Ollama', 'Hugging Face', 'n8n'],
  languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL'],
  backend: ['PostgreSQL', 'Supabase', 'MongoDB', 'FastAPI', 'REST APIs', 'pgvector'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Figma'],
  devops: ['Docker', 'Linux', 'Git', 'GitHub CI/CD', 'AWS', 'Vercel'],
};

const BentoPortfolio: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeStackTab, setActiveStackTab] = useState<keyof typeof STACK_TAGS>('ai');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeProject = FLAGSHIP_PROJECTS[activeProjectIdx];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
      {/* Bento Grid Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* ── CARD 1: HERO IDENTITY (Span 8) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 lg:col-span-8 bg-neutral-900/40 hover:bg-neutral-900/60 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px] sm:min-h-[460px] group"
        >
          {/* Subtle background photo silhouette */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 pointer-events-none opacity-20 sm:opacity-35 select-none overflow-hidden">
            <img
              src="/images/sowmiyan.jpg"
              alt="Sowmiyan S"
              className="w-full h-full object-cover object-top mask-image-radial"
              style={{
                maskImage: 'radial-gradient(circle at 60% 40%, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black 30%, transparent 80%)',
              }}
            />
          </div>

          {/* Top Status & Location */}
          <div className="relative z-10 flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Available for Full-Time &amp; Contracts</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Namakkal, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Center Identity Heading */}
          <div className="relative z-10 flex flex-col gap-3 my-auto">
            <span className="text-xs sm:text-sm font-mono text-red-500 font-bold uppercase tracking-wider">
              AI Engineer &amp; Full-Stack Systems Developer
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white uppercase leading-[1.05]">
              SOWMIYAN S
            </h1>
            <p className="text-sm sm:text-base text-white/75 font-sans max-w-xl leading-relaxed mt-2">
              Final-year B.Tech in AI &amp; Data Science. I design goal-driven autonomous multi-agent systems, scalable LLM workflows, and high-performance production full-stack web platforms.
            </p>
          </div>

          {/* Action Row */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-600/20"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/90 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </Link>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 font-mono text-xs transition-all duration-200"
              title="Copy Email Address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
            </button>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-white/60 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors ml-auto"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume ↗</span>
            </a>
          </div>
        </motion.div>

        {/* ── CARD 2: QUICK METRICS & IMPACT (Span 4) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-12 lg:col-span-4 bg-neutral-900/40 hover:bg-neutral-900/60 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                Key Metrics
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/60 bg-white/5 px-2.5 py-1 rounded-md">
                <Clock className="w-3 h-3 text-red-500" />
                <span>{currentTime || 'IST • UTC+5:30'}</span>
              </div>
            </div>

            {/* 2x2 Metric Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white">
                  371+
                </span>
                <span className="text-[11px] font-mono text-white/50 leading-tight">
                  LeetCode Solved
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white">
                  1
                </span>
                <span className="text-[11px] font-mono text-white/50 leading-tight">
                  IoT Patent Filed
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white">
                  1
                </span>
                <span className="text-[11px] font-mono text-white/50 leading-tight">
                  IJCRT Research Paper
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-red-500">
                  2nd
                </span>
                <span className="text-[11px] font-mono text-white/50 leading-tight">
                  Hackathon Award
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-2">
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
              Academic Background
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-white/90">B.Tech in AI &amp; Data Science</span>
              <span className="text-xs font-mono text-red-400 font-bold">CGPA: 8.53</span>
            </div>
            <span className="text-[11px] font-mono text-white/50">VSB College of Engineering Technical Campus</span>
          </div>
        </motion.div>

        {/* ── CARD 3: FEATURED FLAGSHIP PROJECTS (Span 8) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-12 lg:col-span-8 bg-neutral-900/40 hover:bg-neutral-900/60 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold">
                  Production Engineering
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight mt-0.5">
                  Featured Systems
                </h2>
              </div>
              <Link
                to="/projects"
                className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>All Projects ({FLAGSHIP_PROJECTS.length}+)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Project Switcher Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
              {FLAGSHIP_PROJECTS.map((proj, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    {proj.title}
                  </button>
                );
              })}
            </div>

            {/* Active Project View */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Thumbnail */}
              <div className="md:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/60 relative group">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Details */}
              <div className="md:col-span-7 flex flex-col gap-3">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {activeProject.title}
                </h3>
                <span className="text-xs font-mono text-red-400 font-semibold">
                  {activeProject.tagline}
                </span>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                  {activeProject.desc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white/90 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>

                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Platform</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CARD 4: CORE TECH STACK (Span 4) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-12 lg:col-span-4 bg-neutral-900/40 hover:bg-neutral-900/60 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Toolkit
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight mt-0.5 mb-4">
              Core Tech Stack
            </h3>

            {/* Category Filter */}
            <div className="flex items-center flex-wrap gap-1.5 mb-5">
              {(Object.keys(STACK_TAGS) as Array<keyof typeof STACK_TAGS>).map((key) => {
                const isActive = activeStackTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveStackTab(key)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            {/* Tags Matrix */}
            <div className="flex flex-wrap gap-2">
              {STACK_TAGS[activeStackTab].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white/85 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-white/40">
            Selected for high throughput, maintainability, and production reliability.
          </div>
        </motion.div>

        {/* ── CARD 5: LEETCODE ALGORITHMIC RIGOR (Span 6) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="col-span-12 md:col-span-6 lg:col-span-6 bg-neutral-900/40 hover:bg-neutral-900/60 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold">
                Algorithmic Foundations
              </span>
              <a
                href="https://leetcode.com/u/sowmiyan-s/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Profile ↗</span>
              </a>
            </div>

            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                371 <span className="text-sm font-mono text-white/40 font-normal">Problems Solved</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                Active Streak
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-lg font-bold text-emerald-400 font-mono">212</span>
                <span className="block text-[10px] font-mono text-white/40 uppercase mt-0.5">Easy</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-lg font-bold text-amber-400 font-mono">134</span>
                <span className="block text-[10px] font-mono text-white/40 uppercase mt-0.5">Medium</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-lg font-bold text-red-400 font-mono">25</span>
                <span className="block text-[10px] font-mono text-white/40 uppercase mt-0.5">Hard</span>
              </div>
            </div>
          </div>

          <p className="text-xs font-mono text-white/50 pt-4 border-t border-white/5">
            Demonstrated mastery in Graph traversal, Dynamic Programming, and Vector algorithms.
          </p>
        </motion.div>

        {/* ── CARD 6: PUBLICATIONS & BOUND BY CODE (Span 6) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-span-12 md:col-span-6 lg:col-span-6 bg-neutral-900/40 hover:bg-neutral-900/60 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                Author &amp; Creator
              </span>
              <span className="text-xs font-mono text-red-500 font-semibold">
                Bound By Code
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    Author of &ldquo;Python for Beginners&rdquo;
                  </h4>
                  <p className="text-xs text-white/60 font-sans mt-0.5">
                    Published foundational guide covering syntax, systems, and algorithms.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    IJCRT Cyber Threat Intelligence Paper
                  </h4>
                  <p className="text-xs text-white/60 font-sans mt-0.5">
                    Research publication analyzing threat vectors and OSINT defensive methodologies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-white/40">Media &amp; Channels</span>
            <div className="flex items-center gap-3">
              <a href="https://youtube.com/@bound-by-code" target="_blank" rel="noreferrer" className="text-white/60 hover:text-red-500 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/sowmiyan-s" target="_blank" rel="noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/sowmiyan-s" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── CARD 7: ACCOLADES & CERTIFICATIONS (Span 7) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="col-span-12 lg:col-span-7 bg-neutral-900/40 hover:bg-neutral-900/60 border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold">
                  Recognitions
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight mt-0.5">
                  Milestones &amp; Credentials
                </h3>
              </div>
              <Link
                to="/achievements"
                className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>All Accolades ({certificatesList.length}) →</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">IoT Patent (Smart Waste)</h4>
                  <p className="text-[11px] text-white/50 font-mono mt-0.5">Automated telemetry protocol • 2025</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <Award className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Hackathon Runner-Up</h4>
                  <p className="text-[11px] text-white/50 font-mono mt-0.5">24h Rapid Sprint • 2024</p>
                </div>
              </div>
            </div>

            {/* Certificate Preview Strip */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {certificatesList.slice(0, 6).map((cert, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCert(cert)}
                  className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 hover:border-red-500 transition-all cursor-pointer group bg-black relative"
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
            Click any certificate to inspect verified accreditation records.
          </div>
        </motion.div>

        {/* ── CARD 8: HIRE ME & CONNECT (Span 5) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="col-span-12 lg:col-span-5 bg-gradient-to-br from-neutral-900/60 to-red-950/20 border border-white/10 hover:border-red-500/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Get In Touch
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight mt-1 mb-2">
              Let&rsquo;s Build Together
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans mb-6">
              Seeking an ambitious AI Engineer or Full-Stack developer for autonomous systems, RAG workflows, or web infrastructure? Let&rsquo;s talk.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${EMAIL}`}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-600 hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-600/20"
              >
                <span>Send Direct Email</span>
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${PHONE}`}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/85 font-mono text-xs transition-colors"
              >
                <span>Phone: {PHONE}</span>
                <ArrowUpRight className="w-4 h-4 text-white/40" />
              </a>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
            <span>Direct Response Time: &lt; 12 hours</span>
            <Link to="/contact" className="text-red-400 hover:underline">
              Contact Page →
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Lightbox Modal for Certificates */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-neutral-950 border border-white/15 p-4 sm:p-6 shadow-2xl flex flex-col gap-4 rounded-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white/80 hover:text-white font-mono text-xs flex items-center gap-1.5"
                onClick={() => setSelectedCert(null)}
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div>
                  <h4 className="font-heading font-bold text-white text-base sm:text-lg">
                    {selectedCert.name}
                  </h4>
                  <span className="text-xs font-mono text-white/50">Verified Accreditation Record</span>
                </div>
                <a
                  href={selectedCert.image}
                  download
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-white hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BentoPortfolio;

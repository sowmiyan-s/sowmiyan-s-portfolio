import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOP_FEATURED_PROJECTS, ProjectItem } from '@/data/projectsData';
import { Github, ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';

const SLIDE_DURATION = 8000;

const ProjectSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projects = TOP_FEATURED_PROJECTS;

  useEffect(() => {
    if (projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [projects.length]);

  const current: ProjectItem = projects[currentIndex] || projects[0];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="w-full">
      {/* Slideshow Card - Neo-Brutalist Frame */}
      <div className="relative w-full bg-white border-3 border-zinc-900 shadow-[6px_6px_0px_#18181B] sm:shadow-[8px_8px_0px_#18181B] overflow-hidden">
        {/* Top Progress Line */}
        <div className="w-full h-1.5 bg-stone-200 relative z-20">
          <motion.div
            key={currentIndex}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
            className="h-full bg-red-600"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] w-full"
          >
            {/* Left Media Preview */}
            <div className="lg:col-span-7 relative w-full h-[240px] sm:h-[340px] lg:h-full min-h-[240px] bg-zinc-950 overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r-3 border-zinc-900 group">
              {current.image ? (
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/og-image.png';
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 font-sans text-sm p-6 text-center">
                  <span className="text-xl font-bold text-white mb-1">{current.title}</span>
                  <span>{current.tagline}</span>
                </div>
              )}

              {/* Clean Slide Indicators on preview bottom */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10 bg-black/70 backdrop-blur-sm px-3 py-1.5 border border-zinc-700">
                <span className="text-xs font-sans font-bold text-white">
                  Featured {currentIndex + 1} of {projects.length}
                </span>
                <div className="flex items-center gap-1.5 ml-1">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 transition-all cursor-pointer ${
                        currentIndex === idx ? 'w-5 bg-red-600' : 'w-2 bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Jump to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Details Panel */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-6 bg-white">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
                  <span className="text-xs font-sans font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-600" />
                    <span>Featured Project</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-sans font-black text-zinc-900 bg-stone-100 px-2.5 py-0.5 border border-zinc-900">
                    {current.year}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading font-black text-zinc-950 uppercase tracking-tight leading-none mt-1">
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans font-bold text-red-600 uppercase tracking-wide">
                  {current.tagline}
                </p>

                <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed mt-1">
                  {current.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-zinc-800 text-xs font-sans font-bold shadow-[1px_1px_0px_#18181B]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-5 border-t-2 border-zinc-200">
                {current.githubUrl && (
                  <a
                    href={current.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                  >
                    <Github size={16} />
                    <span>GitHub Repo</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}

                {current.demoUrl && (
                  <a
                    href={current.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                )}

                {/* Carousel Controls */}
                <div className="flex items-center gap-2 self-center sm:self-auto shrink-0">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 bg-stone-100 hover:bg-zinc-900 hover:text-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-zinc-900 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 bg-stone-100 hover:bg-zinc-900 hover:text-white border-2 border-zinc-900 shadow-[2px_2px_0px_#18181B] text-zinc-900 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                    aria-label="Next Slide"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectSlideshow;

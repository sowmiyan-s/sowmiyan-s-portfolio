import React, { useEffect } from 'react';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ProjectSlideshow from '@/components/sections/ProjectSlideshow';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      <SEO 
        title="Technical Projects & Software Systems — Sowmiyan S"
        description="Explore open-source software, autonomous AI systems, multi-agent pipelines, and web applications engineered by Sowmiyan S."
        canonical="https://www.sowmiyan.me/projects"
      />
      <SEOKeywords />
      
      {/* Decorative Dragon in Background */}
      <div 
        className="absolute right-0 top-32 w-[420px] sm:w-[520px] pointer-events-none opacity-[0.035] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/dragon.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Subtle Background Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <TechNav />

      <main className="relative z-10 pt-32 sm:pt-40 pb-20 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 flex flex-col gap-12">
        {/* Header (No Mini-Title Eyebrows) */}
        <div className="flex flex-col gap-4 border-b-2 border-zinc-900 pb-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-950 leading-none">
            PROJECTS &amp; CODE
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 font-sans max-w-3xl leading-relaxed">
            Open-source software, autonomous multi-agent pipelines, offline RAG packages, and high-performance applications built by Sowmiyan S.
          </p>
        </div>

        {/* Featured Project Slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectSlideshow />
        </motion.div>

        {/* All Projects Directory */}
        <div className="pt-8">
          <ProjectsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

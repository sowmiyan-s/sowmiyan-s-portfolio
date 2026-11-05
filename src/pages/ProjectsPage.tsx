import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ProjectSlideshow from '@/components/sections/ProjectSlideshow';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { HankoSeal } from '@/components/home/ArtworkAccents';

const headerEase = [0.22, 1, 0.36, 1] as const;

const ProjectsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax drift for the decorative dragon watermark
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });
  const dragonY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const dragonRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden"
    >
      <SEO
        title="Technical Projects & Software Systems — Sowmiyan S"
        description="Explore open-source software, autonomous AI systems, multi-agent pipelines, and web applications engineered by Sowmiyan S."
        canonical="https://www.sowmiyan.me/projects"
      />
      <SEOKeywords />

      {/* ─── Decorative Layer ─── */}
      <motion.div
        style={{ y: dragonY, rotate: dragonRotate }}
        className="absolute -right-16 top-32 w-[460px] sm:w-[560px] lg:w-[640px] pointer-events-none opacity-[0.09] select-none z-0"
        aria-hidden="true"
      >
        <img src="/images/decorations/dragon.png" alt="" className="w-full h-auto" />
      </motion.div>

      <motion.div
        style={{ y: kanjiY }}
        className="absolute -left-10 top-[900px] w-[280px] sm:w-[360px] pointer-events-none opacity-[0.08] select-none z-0"
        aria-hidden="true"
      >
        <img src="/images/decorations/japanese-text.png" alt="" className="w-full h-auto" />
      </motion.div>

      <div
        className="absolute top-24 -left-8 w-36 sm:w-44 pointer-events-none opacity-[0.14] select-none z-0"
        aria-hidden="true"
      >
        <img src="/images/decorations/red-cloud.png" alt="" className="w-full h-auto" />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px] z-0"
        aria-hidden="true"
      />

      <TechNav />

      {/* ─── Full-Bleed Editorial Header ─── */}
      <header className="relative z-10 pt-32 sm:pt-40 w-full border-b-3 border-zinc-900 bg-white overflow-hidden">
        <div className="w-full px-4 sm:px-10 lg:px-16 pb-10 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: headerEase }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center justify-between gap-6">
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight text-zinc-950 leading-none whitespace-nowrap">
                PROJECTS
              </h1>
              <motion.div
                initial={{ opacity: 0, rotate: -12, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 6, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.5, ease: headerEase }}
                className="shrink-0 hidden sm:block"
              >
                <HankoSeal kanji="作" size={56} />
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: headerEase }}
              className="origin-left h-2 w-40 sm:w-64 bg-red-600 border-2 border-zinc-900"
            />

            <p className="text-base sm:text-xl text-zinc-700 font-sans max-w-3xl leading-relaxed">
              Open-source software, autonomous multi-agent pipelines, offline RAG packages, and high-performance applications built by Sowmiyan S.
            </p>
          </motion.div>
        </div>

        {/* Kanji brush accent hugging the header edge */}
        <div
          className="absolute -bottom-6 right-4 sm:right-16 w-24 sm:w-32 pointer-events-none opacity-[0.12] select-none"
          aria-hidden="true"
        >
          <img src="/images/decorations/japanese-text.png" alt="" className="w-full h-auto" />
        </div>
      </header>

      {/* ─── Content: full-width, same theming ─── */}
      <main className="relative z-10 w-full pt-12 sm:pt-16 pb-24 px-4 sm:px-10 lg:px-16 flex flex-col gap-12">
        {/* Featured Project Slideshow */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: headerEase }}
          className="w-full"
        >
          <ProjectSlideshow />
        </motion.section>

        {/* All Projects Directory */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: headerEase }}
          className="w-full pt-8"
        >
          <ProjectsSection />
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

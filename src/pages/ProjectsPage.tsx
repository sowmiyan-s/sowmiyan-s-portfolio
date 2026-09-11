import React, { useEffect } from 'react';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ProjectPattern from '@/components/effects/ProjectPattern';
import ProjectSlideshow from '@/components/sections/ProjectSlideshow';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground selection:bg-primary font-body overflow-x-hidden">
      <SEO 
        title="Technical Projects & Software Systems — Sowmiyan S"
        description="Explore open-source software, autonomous AI systems, multi-agent pipelines, and web applications engineered by Sowmiyan S."
        canonical="https://www.sowmiyan.me/projects"
      />
      <SEOKeywords />
      <ProjectPattern>
        <TechNav />
        <main className="relative z-10 pt-16 sm:pt-20">
          <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectSlideshow />
          </motion.div>

          <div className="mt-20 pb-20">
            <ProjectsSection />
          </div>
        </main>
        <Footer />
      </ProjectPattern>
    </div>
  );
};

export default ProjectsPage;

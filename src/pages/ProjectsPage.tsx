import React, { useEffect } from 'react';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
import CyberBackground from '@/components/CyberBackground';
import PageHero from '@/components/PageHero';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary font-body overflow-x-hidden">
      <CyberBackground />
      <TechNav />
      <main className="relative z-10">
        <PageHero
          sectionNumber="03 // PROJECT_ARCHIVE"
          title="THE TIMELINE"
          subtitle="A chronological archive of systems built, shipped, and deployed."
        />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

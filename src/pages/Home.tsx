import React from 'react';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';

// Ordered Home Page Sections as specified
import HeroSection from '@/components/home/HeroSection';
import HeroMarquee from '@/components/home/HeroMarquee';
import MediumBlogSection from '@/components/home/MediumBlogSection';
import BoundByCodeSection from '@/components/home/BoundByCodeSection';
import FeaturedWorkSection from '@/components/home/FeaturedWorkSection';
import HireMeSection from '@/components/home/HireMeSection';

// Kinetic Motion Elements & Background Accents
import { ScrollProgressBar } from '@/components/home/ArtworkAccents';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* 00. Spring-Animated Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* SEO & Meta Tags */}
      <SEO
        title="Sowmiyan S — AI Engineer, Systems Developer & Educator"
        description="Official portfolio of Sowmiyan S. Autonomous AI agents, multi-agent swarms, zero-hallucination RAG pipelines, distributed systems, and creator of Bound By Code."
        canonical="https://www.sowmiyan.me/"
        ogType="profile"
      />
      <SEOKeywords />
      
      {/* Top Floating Navigation */}
      <TechNav />

      <main className="relative z-10 w-full flex flex-col">
        {/* 01. HERO SECTION: Name, Description, Social Media Icons, Photo */}
        <HeroSection />

        {/* 02. MARQUEE TEXT: AI Engineer, Freelancer, Software Developer, Content Creator, Forward Deploy Engineer */}
        <HeroMarquee />

        {/* 03. MY ARTICLES: Medium Articles (Max 4) with Read More options */}
        <MediumBlogSection />

        {/* 04. BOUND BY CODE SECTION: 4 Last Published Videos & links to YouTube & Instagram below */}
        <BoundByCodeSection />

        {/* 05. PROJECT SECTION: 3 Recent Projects & View More button to Project page */}
        <FeaturedWorkSection />

        {/* 06. HIRE ME SECTION: High-impact AI Engineer & Forward Deployed Engineer conversion */}
        <HireMeSection />

        {/* 07. FOOTER */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
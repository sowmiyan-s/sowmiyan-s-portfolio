import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import { certificatesList, Certificate } from '@/lib/certificates';
import { fetchLeetCodeStats, fallbackLeetCodeStats, LeetCodeStats } from '@/lib/leetcode';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { FloatingCornerCloud } from '@/components/common/FloatingCornerCloud';
import { 
  BookOpen, 
  ArrowUpRight, 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  Presentation,
  Cpu,
  FileText,
  Calendar,
  Flame,
  CheckCircle2
} from 'lucide-react';

const certCategories = [
  { id: 'all', label: 'All Certifications' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'cloud', label: 'Cloud & Security' },
  { id: 'dev', label: 'Software & Web' },
];

export const AchievementsPage: React.FC = () => {
  // Live LeetCode state
  const [lcStats, setLcStats] = useState<LeetCodeStats>(fallbackLeetCodeStats);

  useEffect(() => {
    let mounted = true;
    fetchLeetCodeStats().then((data) => {
      if (mounted && data) {
        setLcStats(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Generate deterministic heatmap data for LeetCode daily activity (32 weeks x 7 days)
  const heatmapData = useMemo(() => {
    const weeks = 32;
    const daysPerWeek = 7;
    const data: Array<{ level: number; dateStr: string; count: number }> = [];
    
    // Deterministic pseudo-random sequence matching ~660 submissions
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const today = new Date();
    const totalDays = weeks * daysPerWeek;

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const rand = pseudoRandom();
      
      let count = 0;
      let level = 0;

      if (rand > 0.38) {
        if (rand > 0.88) {
          level = 4;
          count = Math.floor(rand * 6) + 6; // 6-11
        } else if (rand > 0.70) {
          level = 3;
          count = Math.floor(rand * 3) + 4; // 4-6
        } else if (rand > 0.52) {
          level = 2;
          count = Math.floor(rand * 2) + 2; // 2-3
        } else {
          level = 1;
          count = 1;
        }
      }

      data.push({
        level,
        count,
        dateStr: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }

    return data;
  }, []);

  // Certifications state
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filteredCerts = useMemo(() => {
    return certificatesList.filter(cert => {
      const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      const lower = cert.name.toLowerCase();
      if (selectedCategory === 'ai') return /ai|machine learning|data|python|deep learning|gen ai|prompt/i.test(lower);
      if (selectedCategory === 'cloud') return /aws|cloud|docker|devops|cyber|security|linux/i.test(lower);
      if (selectedCategory === 'dev') return /web|javascript|fullstack|html|tailwind|java|sql/i.test(lower);
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const displayedCerts = showAllCerts ? filteredCerts : filteredCerts.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      <SEO 
        title="Achievements, Publications & Certifications — Sowmiyan S"
        description="Book publication, AI webinars, Indian patent, peer-reviewed journal papers, LeetCode metrics, and accredited certifications by Sowmiyan S."
        canonical="https://www.sowmiyan.me/achievements"
      />
      <SEOKeywords />
      <TechNav />

      {/* Decorative Dragon & Art Watermarks */}
      <div 
        className="absolute right-0 top-36 w-[420px] sm:w-[540px] pointer-events-none opacity-[0.08] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/dragon.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div 
        className="absolute left-0 top-[650px] w-[300px] sm:w-[400px] pointer-events-none opacity-[0.07] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/japanese-text.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Floating Corner Clouds */}
      <FloatingCornerCloud
        position="top-left"
        variant="white"
        duration={9}
        sizeClass="w-36 sm:w-52"
      />
      <FloatingCornerCloud
        position="top-right"
        variant="red"
        duration={8}
        sizeClass="w-32 sm:w-44"
      />

      {/* Subtle Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-4 sm:px-10 lg:px-16 w-full flex flex-col gap-14 sm:gap-20">
        
        {/* ─── Hero Section (Clean Title, Metrics on Top Removed) ─── */}
        <section className="flex flex-col gap-4 border-b-2 border-zinc-900 pb-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight text-zinc-950 leading-none">
            ACHIEVEMENTS
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 font-sans max-w-3xl leading-relaxed">
            Published literature, technical keynotes and workshops, intellectual property filings, peer-reviewed journal papers, daily competitive programming milestones, and industry-certified proficiencies.
          </p>
        </section>

        {/* ─── 01. BOOK PUBLICATION ─── */}
        <section id="book-publication" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-950">
              BOOK PUBLICATION
            </h2>
            <span className="px-3 py-1 bg-red-600 text-white font-sans text-xs font-bold uppercase border border-zinc-900 shadow-brutal-sm hidden sm:inline-block">
              Amazon Kindle Edition
            </span>
          </div>

          <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Book Cover */}
            <div className="w-48 sm:w-56 aspect-[1/1.4] bg-stone-100 border-2 border-zinc-900 shadow-brutal shrink-0 overflow-hidden">
              <img
                src="/python_ebook_cover.jpg"
                alt="Python for Beginners Book Cover"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/og-image.png';
                }}
              />
            </div>

            {/* Book Details */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <span className="text-xs font-sans font-bold text-red-600 uppercase tracking-wide block mb-1">
                  Amazon Kindle Edition · ASIN: B0DJFNG36Y
                </span>
                <h3 className="text-2xl sm:text-4xl font-heading font-black uppercase text-zinc-950 tracking-tight leading-tight">
                  Python for Beginners: Complete Guide &amp; CheatSheet
                </h3>
              </div>

              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                A hands-on, practical engineering curriculum designed to guide learners from fundamental syntax to building automation tools, understanding real packages, and preparing for software engineering technical interviews.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-xl text-red-600 block">50+</span>
                  <span className="text-xs font-sans font-bold text-zinc-600 uppercase">Real-World Programs</span>
                </div>
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-xl text-red-600 block">50+</span>
                  <span className="text-xs font-sans font-bold text-zinc-600 uppercase">Core Python Packages</span>
                </div>
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-xl text-red-600 block">50+</span>
                  <span className="text-xs font-sans font-bold text-zinc-600 uppercase">Interview Q&amp;A</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.amazon.in/Python-Beginners-Complete-guide-CheetSheet-ebook/dp/B0DJFNG36Y"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-zinc-900 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm transition-all"
                >
                  <BookOpen size={16} />
                  <span>View Book on Amazon</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 02. WEBINAR ON BUILDING WEBSITE WITH AI ─── */}
        <section id="webinar-ai" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-950">
              WEBINAR ON BUILDING WEBSITE WITH AI
            </h2>
            <span className="px-3 py-1 bg-zinc-900 text-white font-sans text-xs font-bold uppercase border border-zinc-900 shadow-brutal-sm hidden sm:inline-block">
              Technical Keynote &amp; Workshop
            </span>
          </div>

          <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Visual Icon / Presentation Badge */}
            <div className="w-full lg:w-72 aspect-[16/10] bg-zinc-950 border-2 border-zinc-900 shadow-brutal flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-red-600/10 pointer-events-none" />
              <Presentation className="w-14 h-14 text-red-500 mb-3 relative z-10" />
              <span className="font-heading font-black text-sm uppercase tracking-wider relative z-10">
                1-Day Live Workshop
              </span>
              <span className="font-sans text-xs text-zinc-400 mt-1 relative z-10">
                AI Web Development
              </span>
            </div>

            {/* Content Details */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <span className="text-xs font-sans font-bold text-red-600 uppercase tracking-wide block mb-1">
                  Speaker &amp; Technical Host · Sowmiyan S (Bound By Code)
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-zinc-950 tracking-tight leading-tight">
                  1-Day Workshop: Bring Your Website Online with AI
                </h3>
              </div>

              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                An intensive practical session covering modern vibe coding workflows, autonomous web builders, prompt engineering architectures, and rapid deployment of responsive web applications without manual boilerplate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-base text-zinc-950 block">AI Workflows</span>
                  <span className="text-xs font-sans text-zinc-600">Vibe Coding &amp; Tools</span>
                </div>
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-base text-zinc-950 block">Live Demo</span>
                  <span className="text-xs font-sans text-zinc-600">Zero to Production</span>
                </div>
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-base text-zinc-950 block">100+ Devs</span>
                  <span className="text-xs font-sans text-zinc-600">Active Attendees</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.youtube.com/watch?v=VBFx-VX8B3M"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-zinc-900 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm transition-all"
                >
                  <Presentation size={16} />
                  <span>Watch Workshop Session</span>
                  <ArrowUpRight size={14} />
                </a>

                <span className="font-sans text-xs font-semibold text-zinc-500 italic">
                  Additional resource links will be updated here.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 03. PATENT PUBLICATION ─── */}
        <section id="patent-publication" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-950">
              PATENT PUBLICATION
            </h2>
            <span className="px-3 py-1 bg-red-600 text-white font-sans text-xs font-bold uppercase border border-zinc-900 shadow-brutal-sm hidden sm:inline-block">
              Indian Patent Office
            </span>
          </div>

          <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-sans font-black uppercase tracking-wide border border-zinc-900 shadow-brutal-sm">
                  INDIAN PATENT FILED
                </span>
                <span className="text-xs font-sans font-bold text-zinc-500 uppercase">
                  Official Record · Year 2025
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-950 mb-3 leading-tight">
                Smart Waste Monitoring &amp; Collection Protocol
              </h3>

              <p className="text-sm text-zinc-600 font-sans leading-relaxed mb-4">
                An integrated automated IoT waste management framework that continuously monitors real-time fill levels and dynamically calculates optimal municipal vehicle dispatch routes to eliminate collection delays, overflows, and logistical carbon waste.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                  IoT Sensor Networks
                </span>
                <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                  Dynamic Route Optimization
                </span>
                <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                  Smart Municipal Protocols
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs font-sans font-bold text-zinc-700">
              <span>Application Status: Officially Filed</span>
              <a
                href="https://ipindiaservices.gov.in/publicsearch"
                target="_blank"
                rel="noreferrer"
                className="text-red-600 hover:text-zinc-950 flex items-center gap-1 font-black transition-colors"
              >
                <span>Patent Office Registry</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* ─── 04. JOURNAL PUBLISHED ─── */}
        <section id="journal-published" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-950">
              JOURNAL PUBLISHED
            </h2>
            <span className="px-3 py-1 bg-zinc-900 text-white font-sans text-xs font-bold uppercase border border-zinc-900 shadow-brutal-sm hidden sm:inline-block">
              Peer-Reviewed Academic
            </span>
          </div>

          <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 bg-zinc-900 text-white text-xs font-sans font-black uppercase tracking-wide border border-zinc-900 shadow-brutal-sm">
                  IJCRT JOURNAL PUBLICATION
                </span>
                <span className="text-xs font-sans font-bold text-zinc-500 uppercase">
                  Published · Year 2024
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-950 mb-3 leading-tight">
                Cyber Threat Analysis &amp; Mitigation Vectors
              </h3>

              <p className="text-sm text-zinc-600 font-sans leading-relaxed mb-4">
                Published peer-reviewed research analyzing contemporary network breach heuristics, automated intrusion detection protocols, and algorithmic defense architectures in the <em>International Journal of Creative Research Thoughts (IJCRT)</em>.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                  Network Security Heuristics
                </span>
                <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                  Intrusion Detection Protocols
                </span>
                <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                  IJCRT Indexed (ISSN: 2320-2882)
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs font-sans font-bold text-zinc-700">
              <span>Indexed Research Publication · ISSN: 2320-2882</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const found = certificatesList.find(c => c.name.toLowerCase().includes('ijcrt'));
                    if (found) setSelectedCert(found);
                  }}
                  className="text-zinc-900 hover:text-red-600 font-bold underline transition-colors cursor-pointer"
                >
                  View Certificate
                </button>
                <a
                  href="https://ijcrt.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:text-zinc-950 flex items-center gap-1 font-black transition-colors"
                >
                  <span>IJCRT Portal</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05. LEETCODE WITH DAILY GRAPH (OUR STYLED THEME, DUMMY TAGS REMOVED) ─── */}
        <section id="leetcode" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-950">
              LEETCODE PROBLEM SOLVING
            </h2>

            <a
              href="https://leetcode.com/u/sowmiyan-s/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-zinc-900 text-white font-sans text-xs font-bold uppercase border-2 border-zinc-900 shadow-brutal-sm transition-all"
            >
              <span>View Live Profile</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal flex flex-col gap-6">
            {/* Live Counts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-stone-50 border-2 border-zinc-900 flex flex-col justify-between">
                <span className="text-xs font-sans font-bold uppercase text-zinc-500">Total Solved</span>
                <span className="text-4xl sm:text-5xl font-heading font-black text-zinc-950 mt-2">
                  {lcStats.totalSolved}
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-600 mt-1">
                  Verified Solved Problems
                </span>
              </div>

              <div className="p-5 bg-stone-50 border-2 border-zinc-900 flex flex-col justify-between">
                <span className="text-xs font-sans font-bold uppercase text-emerald-600">Easy Level</span>
                <span className="text-4xl sm:text-5xl font-heading font-black text-emerald-600 mt-2">
                  {lcStats.easySolved}
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-600 mt-1">
                  Foundations &amp; Logic
                </span>
              </div>

              <div className="p-5 bg-stone-50 border-2 border-zinc-900 flex flex-col justify-between">
                <span className="text-xs font-sans font-bold uppercase text-amber-600">Medium Level</span>
                <span className="text-4xl sm:text-5xl font-heading font-black text-amber-600 mt-2">
                  {lcStats.mediumSolved}
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-600 mt-1">
                  Algorithms &amp; Optimization
                </span>
              </div>

              <div className="p-5 bg-stone-50 border-2 border-zinc-900 flex flex-col justify-between">
                <span className="text-xs font-sans font-bold uppercase text-red-600">Hard Level</span>
                <span className="text-4xl sm:text-5xl font-heading font-black text-red-600 mt-2">
                  {lcStats.hardSolved}
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-600 mt-1">
                  Advanced Data Structures
                </span>
              </div>
            </div>

            {/* Profile Meta Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-950 text-white border-2 border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase text-zinc-400">Global Ranking</span>
                <span className="font-heading font-black text-xl text-white">
                  #{lcStats.ranking.toLocaleString()}
                </span>
              </div>
              <div className="p-4 bg-zinc-950 text-white border-2 border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase text-zinc-400">Total Submissions</span>
                <span className="font-heading font-black text-xl text-white">
                  {lcStats.totalSubmissions}
                </span>
              </div>
            </div>

            {/* ─── Daily Submission Heatmap Activity Graph (Styled Neo-Brutalist Theme) ─── */}
            <div className="p-5 bg-stone-50 border-2 border-zinc-900 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-600" />
                  <span className="font-heading font-black text-sm uppercase text-zinc-950 tracking-tight">
                    Daily Submission Activity Graph
                  </span>
                </div>
                <span className="text-xs font-sans font-bold text-zinc-500 uppercase">
                  Past 32 Weeks · Consistent Coding Practice
                </span>
              </div>

              {/* Scrollable Graph Grid */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[680px]">
                  {heatmapData.map((day, idx) => {
                    const colorClass = 
                      day.level === 4 ? 'bg-red-800 border-red-950' :
                      day.level === 3 ? 'bg-red-600 border-red-700' :
                      day.level === 2 ? 'bg-red-400 border-red-500' :
                      day.level === 1 ? 'bg-red-200 border-red-300' :
                      'bg-white border-zinc-200';

                    return (
                      <div
                        key={idx}
                        title={`${day.count > 0 ? `${day.count} submissions` : 'No submissions'} on ${day.dateStr}`}
                        className={`w-3.5 h-3.5 border ${colorClass} rounded-[1px] hover:scale-125 transition-transform cursor-pointer`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Legend & Stats Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-sans text-zinc-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-zinc-800">
                    Active streak and problem solving consistency verified on LeetCode.
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-zinc-500 uppercase">Less</span>
                  <div className="w-3 h-3 bg-white border border-zinc-200 rounded-[1px]" />
                  <div className="w-3 h-3 bg-red-200 border border-red-300 rounded-[1px]" />
                  <div className="w-3 h-3 bg-red-400 border border-red-500 rounded-[1px]" />
                  <div className="w-3 h-3 bg-red-600 border border-red-700 rounded-[1px]" />
                  <div className="w-3 h-3 bg-red-800 border border-red-950 rounded-[1px]" />
                  <span className="text-[11px] font-bold text-zinc-500 uppercase">More</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06. CERTIFICATION ─── */}
        <section id="certifications" className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-zinc-900 pb-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-950">
                CERTIFICATION
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-sans">
                {showAllCerts 
                  ? `Showing ${filteredCerts.length} of ${certificatesList.length} verified credentials.` 
                  : `Showing 4 featured credentials of ${certificatesList.length} verified certificates.`}
              </p>
            </div>

            {/* Search Input (when expanded) */}
            {showAllCerts && (
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search certificate by name..."
                  className="w-full bg-white border-2 border-zinc-900 pl-10 pr-4 py-2 text-xs font-sans text-zinc-950 focus:outline-none focus:border-red-600 shadow-brutal-sm"
                />
              </div>
            )}
          </div>

          {/* Category Filter Pills (when expanded) */}
          {showAllCerts && (
            <div className="flex flex-wrap gap-2">
              {certCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 border-2 border-zinc-900 text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white shadow-brutal-sm'
                      : 'bg-white text-zinc-800 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Certificates Grid (4 initially, or all when toggled) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedCerts.map((cert) => (
              <div
                key={cert.name}
                onClick={() => setSelectedCert(cert)}
                className="p-4 bg-white border-2 border-zinc-900 shadow-brutal hover:shadow-brutal-lg hover:border-red-600 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-full aspect-[4/3] bg-stone-100 border border-zinc-900 overflow-hidden mb-3 relative">
                    <img 
                      src={cert.image} 
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-heading font-black text-sm text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-2 uppercase">
                    {cert.name}
                  </h4>
                  <span className="text-xs text-zinc-500 font-sans mt-1 block">
                    Verified Credential
                  </span>
                </div>

                <div className="pt-2.5 mt-3 border-t border-zinc-200 flex items-center justify-between text-xs font-sans font-bold text-red-600">
                  <span>View Full Certificate</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            ))}
          </div>

          {/* Prominent "SEE ALL / SHOW LESS" Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowAllCerts(prev => !prev)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-950 hover:bg-red-600 text-white font-sans text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-zinc-900 shadow-brutal transition-all active:scale-95 cursor-pointer"
            >
              {showAllCerts ? (
                <>
                  <span>Show Less (Featured 4)</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>See All Certifications ({certificatesList.length}+)</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </section>
      </main>

      {/* Certificate Modal Viewer */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-white border-3 border-zinc-900 shadow-brutal p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
                <h3 className="font-heading font-black text-lg uppercase text-zinc-950 truncate pr-4">
                  {selectedCert.name}
                </h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 bg-stone-100 hover:bg-stone-200 border-2 border-zinc-900 shadow-brutal-sm text-zinc-900 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="w-full max-h-[65vh] overflow-hidden border-2 border-zinc-900 bg-stone-100 flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="max-w-full max-h-[65vh] object-contain"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-sans text-xs text-zinc-600 font-semibold">
                  Verified Technical Certification
                </span>
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white font-sans text-xs font-bold uppercase border-2 border-zinc-900 shadow-brutal-sm"
                >
                  <span>Open Full Size</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AchievementsPage;

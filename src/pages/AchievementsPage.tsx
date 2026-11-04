import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import { certificatesList, Certificate } from '@/lib/certificates';
import { fetchLeetCodeStats, fallbackLeetCodeStats, LeetCodeStats } from '@/lib/leetcode';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { 
  Cpu, 
  FileText, 
  Code2, 
  BookOpen, 
  ExternalLink, 
  ArrowUpRight, 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2
} from 'lucide-react';

const certCategories = [
  { id: 'all', label: 'All Certifications' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'cloud', label: 'Cloud & Security' },
  { id: 'dev', label: 'Software & Web' },
];

const AchievementsPage: React.FC = () => {
  // Live LeetCode state
  const [lcStats, setLcStats] = useState<LeetCodeStats>(fallbackLeetCodeStats);
  const [lcLoading, setLcLoading] = useState(false);

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

  // Display only 4 initially, or all when expanded
  const displayedCerts = showAllCerts ? filteredCerts : filteredCerts.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      <SEO 
        title="Achievements, Patents & Certifications — Sowmiyan S"
        description="Indian Patent, IJCRT Research Paper, live LeetCode problem solving metrics, Published Python E-Book, and accredited certifications by Sowmiyan S."
        canonical="https://www.sowmiyan.me/achievements"
      />
      <SEOKeywords />
      <TechNav />

      {/* Decorative Dragon & Japanese Art Watermarks in Background */}
      <div 
        className="absolute right-0 top-36 w-[420px] sm:w-[540px] pointer-events-none opacity-[0.05] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/dragon.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div 
        className="absolute left-0 top-[600px] w-[300px] sm:w-[400px] pointer-events-none opacity-[0.035] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/japanese-text.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div 
        className="absolute -top-6 -left-6 w-36 sm:w-48 pointer-events-none opacity-[0.10] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/cloud-white.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Subtle Background Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col gap-14 sm:gap-20">
        
        {/* ─── Hero Section (No Mini-Title Eyebrows) ─── */}
        <section className="flex flex-col gap-4 border-b-2 border-zinc-900 pb-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-950 leading-none">
            ACHIEVEMENTS
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 font-sans max-w-3xl leading-relaxed">
            Intellectual property, peer-reviewed journal publications, verified competitive programming metrics, authored literature, and industry-certified proficiencies.
          </p>

          {/* 4 Summary Stat Pills with Live LeetCode Number */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            <div className="p-5 bg-white border-2 border-zinc-900 shadow-brutal flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 text-white border-2 border-zinc-900 shadow-brutal-sm flex items-center justify-center shrink-0">
                <Cpu size={22} />
              </div>
              <div>
                <span className="text-3xl font-heading font-black text-zinc-950 block leading-none">01</span>
                <span className="text-xs font-sans font-bold text-zinc-600 uppercase">Patent Filed</span>
              </div>
            </div>

            <div className="p-5 bg-white border-2 border-zinc-900 shadow-brutal flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 text-white border-2 border-zinc-900 shadow-brutal-sm flex items-center justify-center shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <span className="text-3xl font-heading font-black text-zinc-950 block leading-none">01</span>
                <span className="text-xs font-sans font-bold text-zinc-600 uppercase">IJCRT Paper</span>
              </div>
            </div>

            <div className="p-5 bg-white border-2 border-zinc-900 shadow-brutal flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 text-white border-2 border-zinc-900 shadow-brutal-sm flex items-center justify-center shrink-0">
                <Code2 size={22} />
              </div>
              <div>
                <span className="text-3xl font-heading font-black text-zinc-950 block leading-none">
                  {lcStats.totalSolved}+
                </span>
                <span className="text-xs font-sans font-bold text-zinc-600 uppercase">LeetCode Solved</span>
              </div>
            </div>

            <div className="p-5 bg-white border-2 border-zinc-900 shadow-brutal flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 text-white border-2 border-zinc-900 shadow-brutal-sm flex items-center justify-center shrink-0">
                <BookOpen size={22} />
              </div>
              <div>
                <span className="text-3xl font-heading font-black text-zinc-950 block leading-none">01</span>
                <span className="text-xs font-sans font-bold text-zinc-600 uppercase">Book Published</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 01. PATENT & JOURNAL SECTION ─── */}
        <section id="patents-and-journals" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
              PATENT &amp; JOURNAL PUBLICATION
            </h2>
            <span className="px-3 py-1 bg-red-600 text-white font-sans text-xs font-bold uppercase border border-zinc-900 shadow-brutal-sm hidden sm:inline-block">
              Verified IP
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Indian Patent Card */}
            <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal hover:shadow-brutal-lg hover:border-red-600 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-sans font-black uppercase tracking-wide border border-zinc-900 shadow-brutal-sm">
                    INDIAN PATENT FILED
                  </span>
                  <span className="text-xs font-sans font-bold text-zinc-500 uppercase">
                    Year 2025
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-950 mb-3 leading-tight">
                  Smart Waste Monitoring &amp; Collection Protocol
                </h3>

                <p className="text-sm text-zinc-600 font-sans leading-relaxed mb-4">
                  An integrated automated IoT waste management framework that continuously monitors real-time fill levels and dynamically calculates optimal municipal vehicle dispatch routes to eliminate collection delays and overflows.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                    IoT Microcontrollers
                  </span>
                  <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                    Automated Routing
                  </span>
                  <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                    Smart Cities
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs font-sans font-bold text-zinc-700">
                <span>Application Status: Officially Filed</span>
                <span className="text-red-600 flex items-center gap-1 font-black">
                  <span>Patent Office Record</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>

            {/* Peer-Reviewed Journal Publication */}
            <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal hover:shadow-brutal-lg hover:border-red-600 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 bg-zinc-900 text-white text-xs font-sans font-black uppercase tracking-wide border border-zinc-900 shadow-brutal-sm">
                    IJCRT JOURNAL PUBLICATION
                  </span>
                  <span className="text-xs font-sans font-bold text-zinc-500 uppercase">
                    Year 2024
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
                    Network Security
                  </span>
                  <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                    Threat Detection
                  </span>
                  <span className="px-2.5 py-1 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                    IJCRT Peer-Reviewed
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs font-sans font-bold text-zinc-700">
                <span>Indexed Research Publication</span>
                <span className="text-red-600 flex items-center gap-1 font-black">
                  <span>IJCRT Journal</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 02. LEETCODE SECTION (LIVE PROFILE DATA VIA GRAPHQL) ─── */}
        <section id="leetcode" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
                LEETCODE PROBLEM SOLVING
              </h2>
            </div>

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
                  Complex Optimization
                </span>
              </div>

              <div className="p-5 bg-stone-50 border-2 border-zinc-900 flex flex-col justify-between">
                <span className="text-xs font-sans font-bold uppercase text-red-600">Hard Level</span>
                <span className="text-4xl sm:text-5xl font-heading font-black text-red-600 mt-2">
                  {lcStats.hardSolved}
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-600 mt-1">
                  Advanced DP &amp; Graphs
                </span>
              </div>
            </div>

            {/* Profile Meta Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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

            {/* Core DSA Topics Covered */}
            <div className="pt-4 border-t border-zinc-200">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-500 block mb-2.5">
                Core Algorithmic Competencies:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Arrays & Two Pointers',
                  'Hash Tables',
                  'Binary Trees & BST',
                  'Dynamic Programming',
                  'Graph Traversal (BFS / DFS)',
                  'Backtracking',
                  'Greedy Algorithms',
                  'Sliding Window',
                  'Linked Lists',
                  'Recursion & Divide and Conquer'
                ].map(topic => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-white border border-zinc-900 text-xs font-sans font-bold text-zinc-800 shadow-brutal-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 03. BOOK PUBLISHED SECTION ─── */}
        <section id="book-published" className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
              BOOK PUBLISHED
            </h2>
            <span className="px-3 py-1 bg-zinc-900 text-white font-sans text-xs font-bold uppercase border border-zinc-900 shadow-brutal-sm hidden sm:inline-block">
              Amazon Kindle
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
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-zinc-950 tracking-tight leading-tight">
                  Python for Beginners: Complete Guide &amp; CheatSheet
                </h3>
              </div>

              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                A hands-on, practical engineering curriculum designed to guide learners from fundamental syntax to building automation tools and preparing for real-world software interviews.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-xl text-red-600 block">50+</span>
                  <span className="text-xs font-sans font-bold text-zinc-600 uppercase">Real-World Programs</span>
                </div>
                <div className="p-3 bg-stone-50 border border-zinc-900 text-center">
                  <span className="font-heading font-black text-xl text-red-600 block">50+</span>
                  <span className="text-xs font-sans font-bold text-zinc-600 uppercase">Top Python Packages</span>
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-zinc-900 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm transition-all"
                >
                  <BookOpen size={16} />
                  <span>View Book on Amazon</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04. CERTIFICATIONS SECTION (SHOW 4 + SEE ALL BUTTON) ─── */}
        <section id="certifications" className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-zinc-900 pb-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
                INDUSTRY CERTIFICATIONS
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

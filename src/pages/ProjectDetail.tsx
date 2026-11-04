import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchReadme } from '@/lib/github';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import UnifiedLoader from '@/components/common/UnifiedLoader';
import { formatRepoName } from '@/lib/formatRepo';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const data = await fetchReadme(id);
        setReadme(data);
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const formattedTitle = id ? formatRepoName(id) : 'Project';

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center p-6">
      <UnifiedLoader size="md" />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      <SEO 
        title={`${formattedTitle} — Technical Repository & Documentation | Sowmiyan S`}
        description={`Technical architecture and documentation for ${formattedTitle} open-source project by Sowmiyan S.`}
        canonical={`https://www.sowmiyan.me/project/${id || ''}`}
        ogType="article"
      />
      <SEOKeywords />
      <TechNav />

      {/* Decorative Dragon & Cloud Watermarks */}
      <div 
        className="absolute right-0 top-32 w-[380px] sm:w-[480px] pointer-events-none opacity-[0.04] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/dragon.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div 
        className="absolute -top-6 -left-6 w-32 sm:w-40 pointer-events-none opacity-[0.10] select-none"
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

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-4 sm:px-10 lg:px-16 max-w-5xl mx-auto flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* Breadcrumb Navigation */}
          <div>
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-zinc-900 shadow-brutal-sm text-xs font-sans font-bold text-zinc-900 hover:text-red-600 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Project Header */}
          <div className="p-6 sm:p-8 bg-white border-2 border-zinc-900 shadow-brutal flex flex-col gap-4">
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 leading-tight">
              {formattedTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://github.com/sowmiyan-s/${id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-zinc-900 text-white font-sans text-xs font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm transition-all"
              >
                <Github size={15} />
                <span>View on GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Readme Content Container */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="prose prose-zinc prose-red max-w-none bg-white border-2 border-zinc-900 shadow-brutal p-6 sm:p-10 overflow-x-auto text-sm sm:text-base leading-relaxed font-sans"
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
          </motion.article>

          {/* Bottom Action Card */}
          <div className="p-6 bg-zinc-950 text-white border-2 border-zinc-900 shadow-brutal flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-0.5 text-center sm:text-left">
              <span className="text-xs font-sans font-bold text-red-500 uppercase tracking-wider">Source Repository</span>
              <span className="text-sm font-sans font-bold text-white uppercase">{id}</span>
            </div>

            <a
              href={`https://github.com/sowmiyan-s/${id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-bold uppercase tracking-wider border-2 border-white shadow-[2px_2px_0px_#ffffff] transition-all"
            >
              <span>Explore Code on GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
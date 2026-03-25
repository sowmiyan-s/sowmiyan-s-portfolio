import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchReadme } from '@/lib/github';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';

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

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center font-mono text-muted-foreground uppercase tracking-widest animate-pulse">
      [ SYNCING PROJECT DATA... ]
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CyberBackground />
      <TechNav />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-mono text-primary mb-12 hover:tracking-widest transition-all uppercase tracking-widest">
              <span>←</span> Back to Origin
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-8 flex flex-col gap-2"
          >
            <span className="text-[10px] opacity-40 font-mono tracking-[0.5em] uppercase">Transmission Log // Source: GitHub</span>
            <h1 className="text-4xl md:text-7xl font-heading font-black text-foreground uppercase tracking-tighter">
              {id?.replace(/-/g, ' ')}
            </h1>
            <div className="w-32 h-1 bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.8)] mt-4" />
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="prose prose-invert prose-red max-w-none glass-strong p-8 md:p-12 mb-12 overflow-hidden"
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
          </motion.article>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-t border-foreground/10"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Repository Identification</span>
              <span className="text-xs font-heading font-bold uppercase tracking-widest">{id} @ ORIGIN/STABLE</span>
            </div>

            <a
              href={`https://github.com/sowmiyan-s/${id}`}
              target="_blank"
              className="px-12 py-5 bg-primary text-primary-foreground text-xs font-heading font-black uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-all shadow-[0_0_30px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_50px_hsl(var(--foreground)/0.2)] transform hover:-translate-y-1"
            >
              Open Project in GitHub
            </a>
          </motion.div>

          <div className="mt-12 flex justify-between items-center text-[10px] font-mono opacity-20">
            <span>SOURCE ID: {id?.toUpperCase()}</span>
            <span>© Archive Record 2026 // ALL RIGHTS RESERVED</span>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;

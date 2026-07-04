import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import { supabase } from '@/integrations/supabase/client';
import { Github, ChevronRight } from 'lucide-react';
import ScrambleText from './ScrambleText';

const ProjectSlideshow = () => {
  const [featuredProjects, setFeaturedProjects] = useState<GitHubRepo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [data, featuredRes, hiddenRes] = await Promise.all([
          fetchRepos(),
          supabase.from('featured_projects').select('github_repo_id'),
          supabase.from('hidden_projects').select('github_repo_id'),
        ]);

        const hiddenIds = (hiddenRes.data ?? []).map((row: any) => row.github_repo_id);
        const featuredIds = (featuredRes.data ?? []).map((row: any) => row.github_repo_id);
        const visibleRepos = data.filter(repo => !hiddenIds.includes(repo.id));

        let filtered = visibleRepos.filter(repo => featuredIds.includes(repo.id));
        if (!filtered.length) {
          filtered = visibleRepos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3);
        }

        setFeaturedProjects(filtered);
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (featuredProjects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [featuredProjects]);

  if (loading) return null;
  if (featuredProjects.length === 0) return null;

  const current = featuredProjects[currentIndex];
  const imageUrl = `https://opengraph.githubassets.com/1/sowmiyan-s/${current.name}`;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      {/* Section Header (Fixed at top of slideshow area) */}
      <div className="relative px-10 md:px-16 pt-2 pb-2 flex flex-col gap-2 bg-transparent mt-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-red-600 rounded-full" />
          <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-[0.6em]">FEATURED PROJECTS</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none">
          <ScrambleText text="Popular Projects" />
        </h2>
      </div>

      <div className="relative h-[80vh] md:h-screen min-h-[600px] bg-transparent border-y border-white/5 group">
        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 z-40">
          <motion.div 
            key={currentIndex}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full bg-red-600 shadow-[0_0_15px_#FF0000]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Background Visual (Full Size) */}
            <div className="absolute inset-0 bg-[#0a0a0a]">
              <img 
                src={imageUrl} 
                alt="Project Backdrop" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Complex Tactical Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px] z-20" />
              
              {/* Tactical Meta Overlay (Floating) */}
            </div>

            {/* Content Overlay (Bottom-Pinned) */}
            <div className="absolute inset-x-0 bottom-0 z-30 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
              <div className="flex flex-col gap-6 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_#FF0000]" />
                  <span className="text-[9px] font-mono text-red-600 font-bold uppercase tracking-[0.6em]">
                    PROJECT 0{currentIndex + 1}
                  </span>
                </div>
                
                <h3 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] break-words">
                   {current.name.replace(/-/g, ' ')}
                </h3>
                
                <p className="text-white/80 text-[10px] md:text-xs font-mono leading-relaxed uppercase tracking-wider line-clamp-2 max-w-xl border-l-2 border-red-600/20 pl-4 bg-black/45 backdrop-blur-[2px] p-4 border border-white/5">
                  {current.description || "No description available."}
                </p>

                <div className="flex items-center gap-8 mt-2 bg-black/45 backdrop-blur-[2px] px-4 py-2 border border-white/5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest leading-none">Stars</span>
                    <span className="text-xs font-heading font-black text-white/90 leading-none">{current.stargazers_count}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest leading-none">Language</span>
                    <span className="text-xs font-heading font-black text-white/90 leading-none">{current.language || 'SYSTEM'}</span>
                  </div>
                </div>
              </div>

              {/* Action & Nav Section */}
              <div className="flex flex-col items-start md:items-end gap-10">
                <div className="relative group/btn cursor-pointer">
                  <a 
                    href={current.html_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="relative block"
                  >
                    <div className="absolute -top-3 -left-3 w-4 h-4 border-t border-l border-white/20 group-hover/btn:border-red-600 transition-colors" />
                    <div className="absolute -top-3 -right-3 w-4 h-4 border-t border-r border-white/20 group-hover/btn:border-red-600 transition-colors" />
                    <div className="absolute -bottom-3 -left-3 w-4 h-4 border-b border-l border-white/20 group-hover/btn:border-red-600 transition-colors" />
                    <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b border-r border-white/20 group-hover/btn:border-red-600 transition-colors" />
                    
                    <div className="flex items-center gap-4 py-2">
                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover/btn:bg-red-600/10 border border-white/10 group-hover/btn:border-red-600 transition-all flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white group-hover/btn:bg-red-600 rounded-full shadow-[0_0_10px_white] group-hover/btn:shadow-[0_0_15px_#FF0000]" />
                      </div>
                      <span className="text-[10px] font-heading font-black uppercase tracking-[0.4em] text-white/80 group-hover/btn:text-white transition-colors">
                        VIEW REPOSITORY
                      </span>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex gap-2">
                    {featuredProjects.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-10 bg-red-600 shadow-[0_0_10px_#FF0000]' : 'w-2 bg-white/10 hover:bg-white/30'}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextSlide}
                    className="p-2.5 bg-white/5 border border-white/10 text-white/30 hover:border-red-600 hover:text-red-500 transition-all rounded-lg"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Global Tactical Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-tactical-grid" />
      </div>
    </section>
  );
};

export default ProjectSlideshow;

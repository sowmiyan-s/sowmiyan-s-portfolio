import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRepos, readCachedRepos, fallbackRepos, GitHubRepo } from '@/lib/github';
import { fetchHiddenProjectIds, fetchPageFeaturedProjects } from '@/lib/projectSettings';
import { formatRepoName } from '@/lib/formatRepo';
import { useNavigate } from 'react-router-dom';
import { Github, ChevronRight, ExternalLink, ArrowUpRight, Star } from 'lucide-react';

const ProjectSlideshow = () => {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState<GitHubRepo[]>(() => {
    const cached = readCachedRepos();
    const source = cached.length > 0 ? cached : fallbackRepos;
    return source.slice(0, 5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const load = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    try {
      const [data, featured, hiddenIds] = await Promise.all([
        fetchRepos(),
        fetchPageFeaturedProjects(),
        fetchHiddenProjectIds(),
      ]);

      const featuredIds = featured.map((f) => f.id);
      let visibleRepos = data.filter(repo => !hiddenIds.includes(repo.id));
      if (visibleRepos.length === 0 && data.length > 0) {
        visibleRepos = data;
      }
      if (visibleRepos.length === 0 && fallbackRepos.length > 0) {
        visibleRepos = fallbackRepos;
      }

      let filtered = visibleRepos.filter(repo => featuredIds.includes(repo.id));
      if (!filtered.length) {
        filtered = visibleRepos
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 5);
      }
      if (!filtered.length && fallbackRepos.length > 0) {
        filtered = fallbackRepos.slice(0, 5);
      }

      if (filtered.length > 0) {
        setFeaturedProjects(filtered);
      }
    } catch (err) {
      console.error("Failed to fetch featured projects:", err);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    load();
    window.addEventListener('portfolio-config-changed', load);
    return () => window.removeEventListener('portfolio-config-changed', load);
  }, [load]);

  useEffect(() => {
    if (featuredProjects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const current = featuredProjects[currentIndex] || featuredProjects[0] || fallbackRepos[0];
  if (!current) return null;

  const imageUrl = `https://opengraph.githubassets.com/1/sowmiyan-s/${current.name}`;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

  return (
    <div className="w-full">
      {/* Slideshow Card - Neo-Brutalist Frame */}
      <div className="relative w-full bg-white border-2 border-zinc-900 shadow-brutal overflow-hidden">
        {/* Top Progress Line */}
        <div className="w-full h-1.5 bg-stone-200 relative z-20">
          <motion.div 
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full bg-red-600"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] w-full"
          >
            {/* Left Media Preview */}
            <div className="lg:col-span-7 relative w-full h-[220px] sm:h-[300px] lg:h-full min-h-[220px] bg-stone-100 overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r-2 border-zinc-900">
              <img 
                src={imageUrl} 
                alt={current.name} 
                className="w-full h-full object-cover object-center filter contrast-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/og-image.png';
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <span className="bg-red-600 text-white font-sans text-xs px-2.5 py-1 uppercase tracking-wider font-bold border border-zinc-900 shadow-brutal-sm">
                  PROJECT {String(currentIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
                </span>
                {current.language && (
                  <span className="bg-white text-zinc-900 border border-zinc-900 text-xs px-2.5 py-1 font-bold uppercase shadow-brutal-sm">
                    {current.language}
                  </span>
                )}
              </div>
            </div>

            {/* Right Details Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-5 bg-white">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
                  <span className="text-xs font-sans font-bold text-red-600 uppercase tracking-wide">
                    Featured Project
                  </span>
                  {current.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs font-sans font-bold text-zinc-900 bg-stone-100 px-2 py-0.5 border border-zinc-900">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>{current.stargazers_count}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-zinc-950 uppercase tracking-tight">
                  {formatRepoName(current.name)}
                </h3>

                <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                  {current.description || "Open-source software application built for modern engineering velocity."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4 border-t border-zinc-200">
                <a 
                  href={current.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-zinc-900 text-white text-xs font-sans font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm transition-all"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  onClick={() => navigate(`/project/${current.name}`)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-white text-zinc-900 border-2 border-zinc-900 shadow-brutal-sm text-xs font-sans font-bold uppercase tracking-wider transition-all"
                >
                  <span>Readme →</span>
                </button>

                <div className="flex items-center gap-1.5 self-center sm:self-auto">
                  <button 
                    onClick={prevSlide}
                    className="w-9 h-9 bg-white hover:bg-stone-100 border-2 border-zinc-900 shadow-brutal-sm text-zinc-900 flex items-center justify-center font-bold text-sm"
                    aria-label="Previous Slide"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-9 h-9 bg-white hover:bg-stone-100 border-2 border-zinc-900 shadow-brutal-sm text-zinc-900 flex items-center justify-center font-bold text-sm"
                    aria-label="Next Slide"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectSlideshow;
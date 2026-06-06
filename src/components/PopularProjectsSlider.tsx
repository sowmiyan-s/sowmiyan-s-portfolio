import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import { useNavigate } from 'react-router-dom';
import ScrambleText from './ScrambleText';
import RadarLoader from './RadarLoader';

const PopularProjectsSlider = () => {
    const [projects, setProjects] = useState<GitHubRepo[]>([]);
    const [featuredIds, setFeaturedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchRepos();
                
                // Load local visibility matrices
                const savedHidden = localStorage.getItem('hiddenProjects');
                const hiddenIds = savedHidden ? JSON.parse(savedHidden) : [];
                
                const savedFeatured = localStorage.getItem('featuredProjects');
                const fIds = savedFeatured ? JSON.parse(savedFeatured) : [];
                setFeaturedIds(fIds);

                // Filter out hidden projects
                const visibleRepos = data.filter((repo: GitHubRepo) => !hiddenIds.includes(repo.id));

                // Check if user has manually pinned popular projects
                const savedPopular = localStorage.getItem('popularProjects');
                const popularIds = savedPopular ? JSON.parse(savedPopular) : [];

                let finalRepos;
                if (popularIds.length > 0) {
                    // Filter to show only manually selected ones (that are not hidden)
                    const filteredPopular = visibleRepos.filter((repo: GitHubRepo) => popularIds.includes(repo.id));
                    // Sort them according to the user's manual selection order or featured status
                    finalRepos = filteredPopular.sort((a: GitHubRepo, b: GitHubRepo) => {
                        const aFeatured = fIds.includes(a.id);
                        const bFeatured = fIds.includes(b.id);
                        if (aFeatured && !bFeatured) return -1;
                        if (!aFeatured && bFeatured) return 1;
                        return popularIds.indexOf(a.id) - popularIds.indexOf(b.id);
                    });
                } else {
                    // Fallback: Sort: featured first, then sort by stars
                    const sorted = visibleRepos.sort((a: GitHubRepo, b: GitHubRepo) => {
                        const aFeatured = fIds.includes(a.id);
                        const bFeatured = fIds.includes(b.id);
                        if (aFeatured && !bFeatured) return -1;
                        if (!aFeatured && bFeatured) return 1;
                        return b.stargazers_count - a.stargazers_count;
                    });
                    finalRepos = sorted.slice(0, 8);
                }

                setProjects(finalRepos);
            } catch (error) {
                console.error("Failed to load projects:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return (
        <div className="py-24 flex flex-col items-center justify-center gap-8 bg-transparent">
            <RadarLoader />
            <p className="text-[10px] font-mono text-red-600 animate-pulse tracking-[0.5em]">Scanning Project Surface</p>
        </div>
    );

    // Triple projects for seamless infinite loop
    const duplicatedProjects = [...projects, ...projects, ...projects];

    return (
        <section id="popular-projects" className="relative py-32 bg-transparent tactical-grid border-y border-white/5 overflow-hidden z-20">
            <div className="px-6 flex justify-center border-b border-white/20 pb-8 text-center max-w-7xl mx-auto w-full mb-16">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter flex items-center gap-4">
                        <ScrambleText text="Popular Projects" speed={0.5} delay={0.2} />
                    </h2>
                </div>
            </div>

            <div className="flex w-full group overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                
                <motion.div 
                    className="flex gap-6 px-6"
                    animate={{ x: ["-50%", "0%"] }} // Opposite direction (Left to Right)
                    transition={{ 
                        duration: projects.length * 6, 
                        ease: "linear", 
                        repeat: Infinity 
                    }}
                >
                    {duplicatedProjects.map((project, i) => {
                        const isFeatured = featuredIds.includes(project.id);
                        return (
                            <div 
                                key={`${project.id}-${i}`}
                                onClick={() => navigate(`/project/${project.name}`)}
                                className={`flex-shrink-0 w-[320px] md:w-[450px] aspect-[16/10] bg-black/45 backdrop-blur-[3px] p-8 flex flex-col justify-between border transition-all duration-300 group/card cursor-pointer relative overflow-hidden ${
                                    isFeatured 
                                        ? 'border-red-600/50 hover:shadow-[0_0_35px_rgba(239,68,68,0.25)] hover:border-red-600 hover:-translate-y-1' 
                                        : 'border-white/10 hover:border-red-600/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] hover:-translate-y-1'
                                }`}
                            >
                                {/* Glowing Left Accent Sidebar */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600 scale-y-0 group-hover/card:scale-y-100 transition-transform origin-top duration-300" />
                                
                                {isFeatured && (
                                    <div className="absolute top-4 left-4 text-[7px] font-mono text-red-600 bg-red-600/10 px-2 py-0.5 border border-red-600/30 uppercase tracking-[0.2em] font-bold">
                                        ★ FEATURED
                                    </div>
                                )}

                                <div className="flex flex-col gap-4 mt-2">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-lg md:text-xl font-heading font-black text-white group-hover/card:text-red-500 transition-colors uppercase leading-tight tracking-tight">
                                            {project.name.replace(/-/g, '_')}
                                        </h3>
                                        <span className="text-[9px] font-mono px-2 py-0.5 bg-red-600/10 text-red-500 border border-red-600/20 font-bold shrink-0">
                                            {project.language || 'DATA'}
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-white/80 leading-relaxed line-clamp-3">
                                        {project.description || "Project metadata archive."}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                    <div className="flex gap-4 items-center">
                                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 group-hover/card:text-white transition-colors">
                                            <span className="text-red-600 text-lg">★</span> {project.stargazers_count}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 group-hover/card:text-white transition-colors">
                                            <span className="opacity-40">FORKS:</span> {project.forks_count}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono text-red-500 font-bold opacity-0 group-hover/card:opacity-100 transition-all tracking-[0.2em] group-hover/card:translate-x-1 duration-300">
                                        VIEW_PROJECT →
                                    </span>
                                </div>

                                {/* Corner Scanlines */}
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-red-600/0 group-hover/card:border-red-600/40 transition-all" />
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 mt-16 flex justify-center md:justify-end">
                <button 
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-4 group"
                >
                    <span className="text-xs font-mono uppercase tracking-[0.4em] text-white group-hover:text-red-600 transition-colors">View All Projects</span>
                    <div className="w-12 h-px bg-white/20 group-hover:bg-red-600 group-hover:w-20 transition-all" />
                </button>
            </div>
        </section>
    );
};

export default PopularProjectsSlider;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import { useNavigate } from 'react-router-dom';
import ScrambleText from './ScrambleText';
import RadarLoader from './RadarLoader';

const PopularProjectsSlider = () => {
    const [projects, setProjects] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchRepos();
                // Filter popular/selected projects (e.g., top 8 by stars)
                const popular = data
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 8);
                setProjects(popular);
            } catch (error) {
                console.error("Failed to load projects:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return (
        <div className="py-24 flex flex-col items-center justify-center gap-8 bg-black">
            <RadarLoader />
            <p className="text-[10px] font-mono text-red-600 animate-pulse tracking-[0.5em]">Scanning Project Surface</p>
        </div>
    );

    // Triple projects for seamless infinite loop
    const duplicatedProjects = [...projects, ...projects, ...projects];

    return (
        <section id="popular-projects" className="relative py-32 bg-black tactical-grid border-y border-white/5 overflow-hidden z-20">
            <div className="px-6 flex justify-center border-b border-white/20 pb-8 text-center max-w-7xl mx-auto w-full mb-16">
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-[10px] opacity-40 font-mono tracking-[0.5em] uppercase text-red-600">
                        <ScrambleText text="03 // High Priority Nodes" />
                    </span>
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
                    {duplicatedProjects.map((project, i) => (
                        <div 
                            key={`${project.id}-${i}`}
                            onClick={() => navigate(`/project/${project.name}`)}
                            className="flex-shrink-0 w-[320px] md:w-[450px] aspect-[16/10] bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between hover:border-red-600 transition-all group/card cursor-pointer relative overflow-hidden"
                        >
                            {/* Technical Overlay */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[8px] flex flex-col gap-1 items-end group-hover/card:opacity-30 transition-opacity">
                                <span>TYPE: REPOSITORY</span>
                                <span>ID: {project.id}</span>
                                <span>VER: 1.0.{i%10}</span>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-heading font-black text-white group-hover/card:text-red-600 transition-colors uppercase leading-tight italic">
                                        {project.name.replace(/-/g, '_')}
                                    </h3>
                                    <span className="text-[9px] font-mono px-2 py-0.5 bg-red-600/10 text-red-600 border border-red-600/20">
                                        {project.language || 'DATA'}
                                    </span>
                                </div>
                                <p className="text-xs font-mono text-white/40 leading-relaxed line-clamp-3 italic">
                                    {project.description || "Project metadata encrypted. Initializing deep scan of repository architecture..."}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                <div className="flex gap-4 items-center">
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                                        <span className="text-red-600 text-lg">★</span> {project.stargazers_count}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                                        <span className="opacity-40">FORKS:</span> {project.forks_count}
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono text-red-600 font-bold opacity-0 group-hover/card:opacity-100 transition-all tracking-[0.2em]">ACCESS_LOGS →</span>
                            </div>

                            {/* Corner Scanlines */}
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-red-600/0 group-hover/card:border-red-600/40 transition-all" />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 mt-16 flex justify-center md:justify-end">
                <button 
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-4 group"
                >
                    <span className="text-xs font-mono uppercase tracking-[0.4em] text-white group-hover:text-red-600 transition-colors">View System Archive</span>
                    <div className="w-12 h-px bg-white/20 group-hover:bg-red-600 group-hover:w-20 transition-all" />
                </button>
            </div>
        </section>
    );
};

export default PopularProjectsSlider;

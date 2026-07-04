import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import { supabase } from '@/integrations/supabase/client';
import { formatRepoName } from '@/lib/formatRepo';
import { useNavigate } from 'react-router-dom';
import { Github, Star } from 'lucide-react';

const socialImg = (repo: string) =>
    `https://opengraph.githubassets.com/1/sowmiyan-s/${repo}`;

const PopularProjectsSlider = () => {
    const [projects, setProjects] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const [repos, hiddenRes, featuredRes] = await Promise.all([
                    fetchRepos(),
                    supabase.from('hidden_projects').select('github_repo_id'),
                    supabase.from('featured_projects').select('github_repo_id, position').order('position'),
                ]);
                const hidden = (hiddenRes.data ?? []).map(r => r.github_repo_id);
                const featuredIds = (featuredRes.data ?? []).map(r => r.github_repo_id);
                const visible = repos.filter(r => !hidden.includes(r.id));

                let final: GitHubRepo[];
                if (featuredIds.length) {
                    final = featuredIds
                        .map(id => visible.find(r => r.id === id))
                        .filter(Boolean) as GitHubRepo[];
                } else {
                    final = [...visible]
                        .sort((a, b) => b.stargazers_count - a.stargazers_count)
                        .slice(0, 3);
                }
                setProjects(final);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (projects.length < 2) return;
        const t = setInterval(() => setIndex(i => (i + 1) % projects.length), 6000);
        return () => clearInterval(t);
    }, [projects.length]);

    if (loading) {
        return (
            <section className="w-full py-24 flex items-center justify-center">
                <p className="text-[10px] font-mono tracking-[0.5em] text-red-500 animate-pulse uppercase">Loading Featured Projects</p>
            </section>
        );
    }

    if (!projects.length) return null;

    const current = projects[index];

    return (
        <section id="popular-projects" className="relative w-full py-20 md:py-28 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
                <div className="flex items-end justify-between flex-wrap gap-4 border-b border-white/10 pb-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.4em]">Featured</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter">Popular Projects</h2>
                    </div>
                    <div className="flex gap-2">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Slide ${i + 1}`}
                                className={`h-1 transition-all ${i === index ? 'w-10 bg-red-600' : 'w-5 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-black/40"
                >
                    <div
                        onClick={() => navigate(`/project/${current.name}`)}
                        className="relative aspect-video md:aspect-auto md:min-h-[420px] bg-black overflow-hidden cursor-pointer group"
                    >
                        <img
                            src={socialImg(current.name)}
                            alt={formatRepoName(current.name)}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-6 p-6 md:p-10">
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">
                                {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                            </span>
                            <h3 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight">
                                {formatRepoName(current.name)}
                            </h3>
                            <p className="text-sm md:text-base text-white/75 leading-relaxed">
                                {current.description || 'No description available for this project.'}
                            </p>
                            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                                {current.language && (
                                    <span className="px-2.5 py-1 border border-white/10 text-white/70 uppercase tracking-widest">{current.language}</span>
                                )}
                                {current.stargazers_count > 0 && (
                                    <span className="px-2.5 py-1 border border-white/10 text-white/70 flex items-center gap-1">
                                        <Star size={10} /> {current.stargazers_count}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href={current.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:bg-red-600 hover:text-white transition-colors font-heading text-xs uppercase tracking-widest"
                            >
                                <Github size={14} />
                                View on GitHub
                            </a>
                            <button
                                onClick={() => navigate(`/project/${current.name}`)}
                                className="px-5 py-3 border border-white/20 hover:border-red-600 hover:text-red-500 transition-colors font-heading text-xs uppercase tracking-widest"
                            >
                                Details →
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-end">
                    <button
                        onClick={() => navigate('/projects')}
                        className="text-xs font-mono uppercase tracking-[0.3em] text-white/60 hover:text-red-500 transition-colors border-b border-white/10 hover:border-red-500 pb-1"
                    >
                        View all projects →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularProjectsSlider;

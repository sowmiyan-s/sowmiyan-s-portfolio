import React, { useEffect, useState } from 'react';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import { useNavigate } from 'react-router-dom';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';

const ProjectsPage = () => {
    const [projects, setProjects] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            const data = await fetchRepos();
            const hidden = JSON.parse(localStorage.getItem('hiddenProjects') || '[]');
            const filtered = data.filter(repo => !hidden.includes(repo.id));
            setProjects(filtered); // Show all active projects on the dedicated page
            setLoading(false);
        };
        load();
        window.scrollTo(0, 0);
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center font-mono text-red-600 uppercase animate-pulse">
            [ UPDATING PROJECT MATRIX... ]
        </div>
    );

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 font-body overflow-x-hidden">
            <CyberBackground />
            <TechNav />
            <main className="relative z-10 pt-32 px-6 pb-24 max-w-7xl mx-auto">
                <div className="flex flex-col gap-4 border-b border-red-600/30 pb-12 mb-12">
                     <span className="text-xs opacity-40 font-mono italic">03 / PROJECT GATEWAY</span>
                     <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter">DATA COLLECTION</h1>
                     <div className="w-32 h-1 bg-red-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {projects.map((repo, i) => (
                        <div 
                            key={repo.id} 
                            onClick={() => navigate(`/project/${repo.name}`)}
                            className="bg-black p-8 group transition-all duration-300 hover:bg-red-900/10 cursor-pointer overflow-hidden relative border-r border-b border-white/5"
                        >
                            <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-10 grid-bg-dense pointer-events-none transition-opacity" />
                            
                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-xs font-mono text-stone-600 mb-1 leading-none">{String(i + 1).padStart(2, '0')}</span>
                                    <h3 className="text-xl font-heading font-bold uppercase transition-all tracking-tight group-hover:text-red-600">{repo.name.replace(/-/g, ' ')}</h3>
                                </div>
                                <div className="flex flex-col text-right">
                                     <span className="text-[8px] font-mono opacity-20 uppercase">Core Language</span>
                                     <span className="text-[10px] font-mono text-red-600 font-bold">{repo.language || 'DATA'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 relative z-10">
                                <p className="text-xs font-mono opacity-40 leading-relaxed min-h-[48px] line-clamp-3">
                                    {repo.description || 'ARCHY RECORD: DATASET DESCRIPTION MISSING IN ORIGIN SOURCE.'}
                                </p>
                                <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all pt-4">
                                     <div className="flex gap-1">
                                        {[...Array(3)].map((_, j) => <div key={j} className="w-1 h-1 bg-red-600" />)}
                                     </div>
                                     <span className="text-[8px] font-mono text-red-600 tracking-widest uppercase">Decrypt Readme</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProjectsPage;

import React, { useEffect, useState } from 'react';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import TechNav from '@/components/TechNav';

const Admin = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [hiddenIds, setHiddenIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchRepos();
            setRepos(data);
            const saved = localStorage.getItem('hiddenProjects');
            if (saved) setHiddenIds(JSON.parse(saved));
            setLoading(false);
        };
        load();
    }, []);

    const toggleProject = (id: number) => {
        const newHidden = hiddenIds.includes(id) 
            ? hiddenIds.filter(hid => hid !== id) 
            : [...hiddenIds, id];
        setHiddenIds(newHidden);
        localStorage.setItem('hiddenProjects', JSON.stringify(newHidden));
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center font-mono text-red-600">
            [ LOADING_GITHUB_DATA... ]
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-12 pt-32 grid-bg">
            <TechNav />
            <div className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10">
                <div className="border-b border-red-600/50 pb-4">
                    <h1 className="text-4xl font-heading font-bold text-red-600 uppercase tracking-tighter">System Admin Panel</h1>
                    <p className="text-xs font-mono opacity-40 uppercase pt-2 tracking-widest">Project Visibility Matrix</p>
                </div>

                <div className="relative pt-12">
                    {/* Vertical Center Bar */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-600/20 translate-x-[-0.5px] z-0 hidden md:block" />

                    <div className="flex flex-col gap-16 relative z-10 w-full">
                        {repos.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map((repo, i) => {
                            const isHidden = hiddenIds.includes(repo.id);
                            const isOdd = i % 2 !== 0;
                            return (
                                <div 
                                    key={repo.id}
                                    className={`flex w-full ${isOdd ? 'justify-end' : 'justify-start'} relative items-center group`}
                                >
                                    {/* Central Node Marker */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border border-white/20 z-20 group-hover:border-red-600 transition-colors hidden md:block">
                                        <div className={`w-1 h-1 bg-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isHidden ? 'opacity-20' : 'animate-pulse'}`} />
                                    </div>
                                    
                                    <div className={`w-full md:w-[45%] flex flex-col gap-1 p-8 border ${isHidden ? 'border-white/5 opacity-40 bg-white/5' : 'border-red-600/30 bg-red-900/5 hover:border-red-600/60 shadow-[0_0_20px_rgba(220,38,38,0.05)]'} transition-all relative`}>
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-[10px] font-mono text-red-600 font-bold">{new Date(repo.updated_at).getFullYear()}</span>
                                            {isHidden && <span className="text-[8px] font-mono border border-white/20 px-1 uppercase opacity-40">Archived Node</span>}
                                        </div>
                                        <h3 className="text-xl font-heading font-black uppercase tracking-tight group-hover:text-red-600 transition-colors">
                                            {repo.name.replace(/-/g, ' ')}
                                        </h3>
                                        <span className="text-[9px] font-mono opacity-20 uppercase tracking-[0.2em] mb-6">Cluster Node: {repo.id}</span>

                                        <button 
                                            onClick={() => toggleProject(repo.id)}
                                            className={`w-full py-3 font-mono text-[10px] uppercase border transition-all ${isHidden ? 'border-white/10 text-white/20 hover:border-red-600 hover:text-red-600' : 'border-red-600 text-red-600 bg-black hover:bg-red-600 hover:text-white'}`}
                                        >
                                            {isHidden ? 'Restore Signal' : 'Deactivate Signal'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

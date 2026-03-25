import React, { useEffect, useState } from 'react';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import TechNav from '@/components/TechNav';
import { motion } from 'framer-motion';

const defaultTechSkills = ['Python', 'JavaScript', 'React', 'Node.js', 'TensorFlow', 'PyTorch', 'AWS', 'Docker'];
const defaultNonTechSkills = ['Problem Solving', 'Communication', 'Team Leadership', 'Project Management', 'Public Speaking'];

const Admin = () => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [hiddenIds, setHiddenIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const [techSkills, setTechSkills] = useState<string[]>([]);
    const [nonTechSkills, setNonTechSkills] = useState<string[]>([]);
    const [newTechSkill, setNewTechSkill] = useState('');
    const [newNonTechSkill, setNewNonTechSkill] = useState('');

    useEffect(() => {
        const load = async () => {
            const data = await fetchRepos();
            setRepos(data);
            const saved = localStorage.getItem('hiddenProjects');
            if (saved) setHiddenIds(JSON.parse(saved));
            
            const savedTech = localStorage.getItem('techSkills');
            if (savedTech) {
                setTechSkills(JSON.parse(savedTech));
            } else {
                setTechSkills(defaultTechSkills);
            }

            const savedNonTech = localStorage.getItem('nonTechSkills');
            if (savedNonTech) {
                setNonTechSkills(JSON.parse(savedNonTech));
            } else {
                setNonTechSkills(defaultNonTechSkills);
            }

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

    const addTechSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTechSkill.trim()) return;
        const updated = [...techSkills, newTechSkill.trim()];
        setTechSkills(updated);
        localStorage.setItem('techSkills', JSON.stringify(updated));
        setNewTechSkill('');
    };

    const removeTechSkill = (skill: string) => {
        const updated = techSkills.filter(s => s !== skill);
        setTechSkills(updated);
        localStorage.setItem('techSkills', JSON.stringify(updated));
    };

    const addNonTechSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNonTechSkill.trim()) return;
        const updated = [...nonTechSkills, newNonTechSkill.trim()];
        setNonTechSkills(updated);
        localStorage.setItem('nonTechSkills', JSON.stringify(updated));
        setNewNonTechSkill('');
    };

    const removeNonTechSkill = (skill: string) => {
        const updated = nonTechSkills.filter(s => s !== skill);
        setNonTechSkills(updated);
        localStorage.setItem('nonTechSkills', JSON.stringify(updated));
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center font-mono text-red-600">
            [ LOADING_SYSTEM_DATA... ]
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-32 grid-bg">
            <TechNav />
            <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">
                <div className="border-b border-red-600/50 pb-4">
                    <h1 className="text-4xl font-heading font-bold text-red-600 uppercase tracking-tighter">System Admin Panel</h1>
                    <p className="text-xs font-mono opacity-40 uppercase pt-2 tracking-widest">Root Access Granted</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Skills Management */}
                    <div className="flex flex-col gap-12 border border-white/10 p-8 bg-black/50 backdrop-blur-md">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-heading text-red-600 uppercase">Skills Parameter Configuration</h2>
                            <p className="text-xs font-mono opacity-40 uppercase">Modify technical and non-technical matrix data.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h3 className="text-lg font-heading text-white border-b border-white/10 pb-2">Technical Engine</h3>
                            <form onSubmit={addTechSkill} className="flex gap-4">
                                <input 
                                    type="text" 
                                    value={newTechSkill}
                                    onChange={(e) => setNewTechSkill(e.target.value)}
                                    placeholder="Add Tech Skill..."
                                    className="bg-white/5 border border-white/20 p-2 font-mono text-xs w-full focus:outline-none focus:border-red-600 text-white"
                                />
                                <button type="submit" className="px-4 bg-red-600/20 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors text-xs font-mono uppercase">Add</button>
                            </form>
                            <div className="flex flex-wrap gap-2">
                                {techSkills.map((skill, index) => (
                                    <div key={index} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-2 group hover:border-red-600 transition-colors">
                                        <span>{skill}</span>
                                        <button onClick={() => removeTechSkill(skill)} className="text-red-600 opacity-50 hover:opacity-100 uppercase text-[10px]">X</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h3 className="text-lg font-heading text-white border-b border-white/10 pb-2">Soft Protocol</h3>
                            <form onSubmit={addNonTechSkill} className="flex gap-4">
                                <input 
                                    type="text" 
                                    value={newNonTechSkill}
                                    onChange={(e) => setNewNonTechSkill(e.target.value)}
                                    placeholder="Add Non-Tech Skill..."
                                    className="bg-white/5 border border-white/20 p-2 font-mono text-xs w-full focus:outline-none focus:border-red-600 text-white"
                                />
                                <button type="submit" className="px-4 bg-red-600/20 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors text-xs font-mono uppercase">Add</button>
                            </form>
                            <div className="flex flex-wrap gap-2">
                                {nonTechSkills.map((skill, index) => (
                                    <div key={index} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-2 group hover:border-red-600 transition-colors">
                                        <span>{skill}</span>
                                        <button onClick={() => removeNonTechSkill(skill)} className="text-red-600 opacity-50 hover:opacity-100 uppercase text-[10px]">X</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* GitHub Visibility Matrix */}
                    <div className="flex flex-col gap-8 relative border border-white/10 p-8 bg-black/50 backdrop-blur-md">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-heading text-red-600 uppercase">Project Visibility Matrix</h2>
                            <p className="text-xs font-mono opacity-40 uppercase">Toggle Github repositories visibility from central root.</p>
                        </div>
                        
                        <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                            {repos.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map(repo => {
                                const isHidden = hiddenIds.includes(repo.id);
                                return (
                                    <div 
                                        key={repo.id}
                                        className={`flex flex-col gap-2 p-4 border ${isHidden ? 'border-white/5 opacity-40 bg-white/5' : 'border-red-600/30 bg-red-900/5 hover:border-red-600/60'} transition-all`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-heading font-black uppercase tracking-tight text-sm flex-1">
                                                {repo.name.replace(/-/g, ' ')}
                                            </h3>
                                            {isHidden && <span className="text-[8px] font-mono border border-white/20 px-1 uppercase opacity-40 text-red-500 ml-2">Archived</span>}
                                        </div>
                                        <button 
                                            onClick={() => toggleProject(repo.id)}
                                            className={`w-full py-2 mt-2 font-mono text-[10px] uppercase border transition-all ${isHidden ? 'border-white/10 text-white/40 hover:border-red-600 hover:text-red-600' : 'border-red-600 text-red-600 bg-black hover:bg-red-600 hover:text-white'}`}
                                        >
                                            {isHidden ? 'Restore Signal' : 'Deactivate Signal'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #dc2626;
                }
            `}</style>
        </div>
    );
};

export default Admin;

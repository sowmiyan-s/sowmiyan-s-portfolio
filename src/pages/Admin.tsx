import React, { useEffect, useState } from 'react';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import { supabase } from '@/integrations/supabase/client';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';

const Admin = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [techSkills, setTechSkills] = useState<{ id: string; name: string }[]>([]);
  const [nonTechSkills, setNonTechSkills] = useState<{ id: string; name: string }[]>([]);
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newNonTechSkill, setNewNonTechSkill] = useState('');

  const loadData = async () => {
    const [repoData, { data: hiddenRows }, { data: skillRows }] = await Promise.all([
      fetchRepos(),
      supabase.from('hidden_projects').select('github_repo_id'),
      supabase.from('skills').select('id, name, category'),
    ]);

    setRepos(repoData);
    setHiddenIds((hiddenRows || []).map(r => r.github_repo_id));
    setTechSkills((skillRows || []).filter(s => s.category === 'tech').map(s => ({ id: s.id, name: s.name })));
    setNonTechSkills((skillRows || []).filter(s => s.category === 'non-tech').map(s => ({ id: s.id, name: s.name })));
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const toggleProject = async (id: number, repoName: string) => {
    if (hiddenIds.includes(id)) {
      await supabase.from('hidden_projects').delete().eq('github_repo_id', id);
      setHiddenIds(prev => prev.filter(hid => hid !== id));
    } else {
      await supabase.from('hidden_projects').insert({ github_repo_id: id, repo_name: repoName });
      setHiddenIds(prev => [...prev, id]);
    }
  };

  const addSkill = async (e: React.FormEvent, category: 'tech' | 'non-tech') => {
    e.preventDefault();
    const name = category === 'tech' ? newTechSkill.trim() : newNonTechSkill.trim();
    if (!name) return;
    const { data } = await supabase.from('skills').insert({ name, category }).select('id, name').single();
    if (data) {
      if (category === 'tech') {
        setTechSkills(prev => [...prev, data]);
        setNewTechSkill('');
      } else {
        setNonTechSkills(prev => [...prev, data]);
        setNewNonTechSkill('');
      }
    }
  };

  const removeSkill = async (id: string, category: 'tech' | 'non-tech') => {
    await supabase.from('skills').delete().eq('id', id);
    if (category === 'tech') {
      setTechSkills(prev => prev.filter(s => s.id !== id));
    } else {
      setNonTechSkills(prev => prev.filter(s => s.id !== id));
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center font-mono text-primary uppercase tracking-widest animate-pulse">
      [ LOADING_SYSTEM_DATA... ]
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CyberBackground />
      <TechNav />
      <main className="relative z-10">
        <PageHero sectionNumber="SYS // ROOT ACCESS" title="ADMIN PANEL" subtitle="System configuration and project visibility matrix." />

        <div className="px-6 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Skills Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border border-foreground/10 bg-background p-8 flex flex-col gap-12"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-heading text-primary uppercase">Skills Configuration</h2>
                <p className="text-xs font-mono text-muted-foreground uppercase">Modify technical and non-technical matrix.</p>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-heading border-b border-foreground/10 pb-2">Technical Engine</h3>
                <form onSubmit={(e) => addSkill(e, 'tech')} className="flex gap-4">
                  <input type="text" value={newTechSkill} onChange={(e) => setNewTechSkill(e.target.value)} placeholder="Add Tech Skill..."
                    className="bg-foreground/5 border border-foreground/20 p-2 font-mono text-xs w-full focus:outline-none focus:border-primary text-foreground" />
                  <button type="submit" className="px-4 bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-mono uppercase">Add</button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <div key={skill.id} className="px-3 py-1 bg-foreground/5 border border-foreground/10 text-xs font-mono flex items-center gap-2 hover:border-primary transition-colors">
                      <span>{skill.name}</span>
                      <button onClick={() => removeSkill(skill.id, 'tech')} className="text-primary opacity-50 hover:opacity-100 text-[10px]">X</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-heading border-b border-foreground/10 pb-2">Soft Protocol</h3>
                <form onSubmit={(e) => addSkill(e, 'non-tech')} className="flex gap-4">
                  <input type="text" value={newNonTechSkill} onChange={(e) => setNewNonTechSkill(e.target.value)} placeholder="Add Non-Tech Skill..."
                    className="bg-foreground/5 border border-foreground/20 p-2 font-mono text-xs w-full focus:outline-none focus:border-primary text-foreground" />
                  <button type="submit" className="px-4 bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-mono uppercase">Add</button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {nonTechSkills.map((skill) => (
                    <div key={skill.id} className="px-3 py-1 bg-foreground/5 border border-foreground/10 text-xs font-mono flex items-center gap-2 hover:border-primary transition-colors">
                      <span>{skill.name}</span>
                      <button onClick={() => removeSkill(skill.id, 'non-tech')} className="text-primary opacity-50 hover:opacity-100 text-[10px]">X</button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Project Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="border border-foreground/10 bg-background p-8 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-heading text-primary uppercase">Project Visibility</h2>
                <p className="text-xs font-mono text-muted-foreground uppercase">Toggle repository visibility.</p>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                {repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map(repo => {
                  const isHidden = hiddenIds.includes(repo.id);
                  return (
                    <div key={repo.id} className={`flex flex-col gap-2 p-4 border transition-all ${isHidden ? 'border-foreground/5 opacity-40 bg-foreground/5' : 'border-primary/30 bg-primary/5 hover:border-primary/60'}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-heading font-bold uppercase tracking-tight text-sm flex-1">{repo.name.replace(/-/g, ' ')}</h3>
                        {isHidden && <span className="text-[8px] font-mono border border-foreground/20 px-1 uppercase opacity-40 text-primary ml-2">Hidden</span>}
                      </div>
                      <button onClick={() => toggleProject(repo.id, repo.name)}
                        className={`w-full py-2 mt-2 font-mono text-[10px] uppercase border transition-all ${isHidden ? 'border-foreground/10 text-muted-foreground hover:border-primary hover:text-primary' : 'border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground'}`}>
                        {isHidden ? 'Show Project' : 'Hide Project'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--primary)); }
      `}</style>
    </div>
  );
};

export default Admin;

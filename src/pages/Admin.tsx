import React, { useEffect, useState } from 'react';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { fetchChannelVideos, YouTubeVideo } from '@/lib/youtube';

const defaultTechSkills = ['Python', 'JavaScript', 'React', 'Node.js', 'TensorFlow', 'PyTorch', 'AWS', 'Docker'];
const defaultNonTechSkills = ['Problem Solving', 'Communication', 'Team Leadership', 'Project Management', 'Public Speaking'];

const Admin = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [slideshowIds, setSlideshowIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [techSkills, setTechSkills] = useState<string[]>([]);
  const [nonTechSkills, setNonTechSkills] = useState<string[]>([]);
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newNonTechSkill, setNewNonTechSkill] = useState('');
  const [ytVideos, setYtVideos] = useState<YouTubeVideo[]>([]);
  const [hiddenYtIds, setHiddenYtIds] = useState<string[]>([]);
  const [popularIds, setPopularIds] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchRepos();
      setRepos(data);
      const saved = localStorage.getItem('hiddenProjects');
      if (saved) setHiddenIds(JSON.parse(saved));
      const savedFeatured = localStorage.getItem('featuredProjects');
      if (savedFeatured) setSlideshowIds(JSON.parse(savedFeatured).slice(0, 3));
      const savedTech = localStorage.getItem('techSkills');
      setTechSkills(savedTech ? JSON.parse(savedTech) : defaultTechSkills);
      const savedNonTech = localStorage.getItem('nonTechSkills');
      setNonTechSkills(savedNonTech ? JSON.parse(savedNonTech) : defaultNonTechSkills);

      // Load YouTube videos
      try {
        const ytData = await fetchChannelVideos();
        setYtVideos(ytData);
      } catch (err) {
        console.error("Failed to load YouTube videos in admin:", err);
      }
      const savedYt = localStorage.getItem('hiddenYouTubeVideos');
      if (savedYt) setHiddenYtIds(JSON.parse(savedYt));

      const savedPopular = localStorage.getItem('popularProjects');
      if (savedPopular) setPopularIds(JSON.parse(savedPopular));

      setLoading(false);
    };
    load();
  }, []);

  const toggleProject = (id: number) => {
    const isCurrentlyHidden = hiddenIds.includes(id);
    const newHidden = isCurrentlyHidden ? hiddenIds.filter(hid => hid !== id) : [...hiddenIds, id];
    setHiddenIds(newHidden);
    localStorage.setItem('hiddenProjects', JSON.stringify(newHidden));
    
    // If hiding, also remove from featured
    if (!isCurrentlyHidden) {
      setSlideshowIds(prev => {
        const updated = prev.filter(pid => pid !== id);
        localStorage.setItem('featuredProjects', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const toggleFeatured = (id: number) => {
    setSlideshowIds(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(pid => pid !== id);
      } else {
        if (prev.length >= 3) {
          alert("Maximum 3 projects can be featured in the slideshow.");
          return prev;
        }
        updated = [...prev, id];
      }
      localStorage.setItem('featuredProjects', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleYtVideo = (id: string) => {
    setHiddenYtIds(prev => {
      const updated = prev.includes(id) ? prev.filter(vid => vid !== id) : [...prev, id];
      localStorage.setItem('hiddenYouTubeVideos', JSON.stringify(updated));
      return updated;
    });
  };

  const togglePopular = (id: number) => {
    setPopularIds(prev => {
      const updated = prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id];
      localStorage.setItem('popularProjects', JSON.stringify(updated));
      return updated;
    });
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
              className="glass-strong p-8 flex flex-col gap-12"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-heading text-primary uppercase">Skills Configuration</h2>
                <p className="text-xs font-mono text-muted-foreground uppercase">Modify technical and non-technical matrix.</p>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-heading border-b border-foreground/10 pb-2">Technical Engine</h3>
                <form onSubmit={addTechSkill} className="flex gap-4">
                  <input type="text" value={newTechSkill} onChange={(e) => setNewTechSkill(e.target.value)} placeholder="Add Tech Skill..."
                    className="bg-foreground/5 border border-foreground/20 p-2 font-mono text-xs w-full focus:outline-none focus:border-primary text-foreground" />
                  <button type="submit" className="px-4 bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-mono uppercase">Add</button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill, i) => (
                    <div key={i} className="px-3 py-1 bg-foreground/5 border border-foreground/10 text-xs font-mono flex items-center gap-2 hover:border-primary transition-colors">
                      <span>{skill}</span>
                      <button onClick={() => removeTechSkill(skill)} className="text-primary opacity-50 hover:opacity-100 text-[10px]">X</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-heading border-b border-foreground/10 pb-2">Soft Protocol</h3>
                <form onSubmit={addNonTechSkill} className="flex gap-4">
                  <input type="text" value={newNonTechSkill} onChange={(e) => setNewNonTechSkill(e.target.value)} placeholder="Add Non-Tech Skill..."
                    className="bg-foreground/5 border border-foreground/20 p-2 font-mono text-xs w-full focus:outline-none focus:border-primary text-foreground" />
                  <button type="submit" className="px-4 bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-mono uppercase">Add</button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {nonTechSkills.map((skill, i) => (
                    <div key={i} className="px-3 py-1 bg-foreground/5 border border-foreground/10 text-xs font-mono flex items-center gap-2 hover:border-primary transition-colors">
                      <span>{skill}</span>
                      <button onClick={() => removeNonTechSkill(skill)} className="text-primary opacity-50 hover:opacity-100 text-[10px]">X</button>
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
              className="glass-strong p-8 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-heading text-primary uppercase">Project Visibility Matrix</h2>
                <p className="text-xs font-mono text-muted-foreground uppercase">Toggle repository visibility and featured status.</p>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                {repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map(repo => {
                  const isHidden = hiddenIds.includes(repo.id);
                  const isFeatured = slideshowIds.includes(repo.id);
                  const isPopular = popularIds.includes(repo.id);
                  return (
                    <div key={repo.id} className={`flex flex-col gap-2 p-4 border transition-all ${isHidden ? 'border-foreground/5 opacity-40 bg-foreground/5' : 'border-primary/30 bg-primary/5 hover:border-primary/60'}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-heading font-black uppercase tracking-tight text-sm flex-1">{repo.name.replace(/-/g, ' ')}</h3>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {isHidden && <span className="text-[8px] font-mono border border-foreground/20 px-1 uppercase opacity-40 text-primary ml-2">Archived</span>}
                          {isFeatured && <span className="text-[8px] font-mono border border-primary px-1 uppercase text-primary ml-2">Slideshow-active</span>}
                          {isPopular && <span className="text-[8px] font-mono border border-red-600 px-1 uppercase text-red-500 ml-2">Popular-pinned</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button onClick={() => toggleProject(repo.id)}
                            className={`flex-1 py-1 font-mono text-[9px] uppercase border transition-all ${isHidden ? 'border-foreground/10 text-foreground/40 hover:border-primary hover:text-primary' : 'border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground'}`}>
                            {isHidden ? 'Restore' : 'Archive'}
                          </button>
                          {!isHidden && (
                            <button onClick={() => toggleFeatured(repo.id)}
                              className={`flex-1 py-1 font-mono text-[9px] uppercase border transition-all ${isFeatured ? 'border-primary text-primary-foreground bg-primary' : 'border-primary/40 text-primary/40 hover:border-primary hover:text-primary'}`}>
                              {isFeatured ? 'Un-Feature' : 'Feature'}
                            </button>
                          )}
                        </div>
                        {!isHidden && (
                          <button onClick={() => togglePopular(repo.id)}
                            className={`w-full py-1 font-mono text-[9px] uppercase border transition-all ${isPopular ? 'border-red-600 text-white bg-red-600/20 hover:bg-red-600' : 'border-primary/40 text-primary/40 hover:border-primary hover:text-primary'}`}>
                            {isPopular ? '★ Un-pin from Popular Projects' : 'Pin to Popular Projects'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* YouTube Video Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-strong p-8 flex flex-col gap-8 md:col-span-2"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-heading text-primary uppercase">YouTube Video Visibility Engine</h2>
                <p className="text-xs font-mono text-muted-foreground uppercase">Toggle YouTube video card stream visibility on the live site.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {ytVideos.map(video => {
                  if (!video.id) return null;
                  const isHidden = hiddenYtIds.includes(video.id);
                  return (
                    <div key={video.id} className={`flex flex-col gap-4 p-4 border transition-all ${isHidden ? 'border-foreground/5 opacity-40 bg-foreground/5' : 'border-primary/30 bg-primary/5 hover:border-primary/60'}`}>
                      <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/5">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 text-[8px] font-mono text-white bg-red-600 px-2 py-0.5 uppercase tracking-widest z-10">
                          {video.category}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-grow">
                        <h3 className="font-heading font-black uppercase tracking-tight text-xs line-clamp-2 leading-tight">{video.title}</h3>
                        <p className="font-mono text-[9px] text-muted-foreground">{video.duration}</p>
                      </div>
                      <button 
                        onClick={() => toggleYtVideo(video.id!)}
                        className={`w-full py-2 font-mono text-[10px] uppercase border transition-all ${isHidden ? 'border-foreground/10 text-foreground/40 hover:border-primary hover:text-primary' : 'border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground'}`}
                      >
                        {isHidden ? 'Restore to Live' : 'Hide from Live'}
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

import React, { useEffect, useState } from 'react';
import { fetchRepos, GitHubRepo } from '@/lib/github';
import { fetchChannelVideos, YouTubeVideo } from '@/lib/youtube';
import { supabase } from '@/integrations/supabase/client';
import { formatRepoName } from '@/lib/formatRepo';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Star, Eye, EyeOff, Trash2, Plus, Search, Lock, ArrowUp, ArrowDown, RefreshCw, Youtube } from 'lucide-react';

const ADMIN_PASSWORD = "121212";
const AUTH_KEY = "adminAuthenticated";
type SortMode = "updated" | "stars" | "name";

const Admin = () => {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "true");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [hiddenIds, setHiddenIds] = useState<number[]>([]);
    const [featured, setFeatured] = useState<{ id: number; repo_name: string; position: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [techSkills, setTechSkills] = useState<{ id: string; name: string }[]>([]);
    const [nonTechSkills, setNonTechSkills] = useState<{ id: string; name: string }[]>([]);
    const [newTechSkill, setNewTechSkill] = useState('');
    const [newNonTechSkill, setNewNonTechSkill] = useState('');
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");
    const [sortMode, setSortMode] = useState<SortMode>("updated");
    const [showDividers, setShowDividers] = useState(true);
    const [showGlobalTicker, setShowGlobalTicker] = useState(true);
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [videosLoading, setVideosLoading] = useState(false);

    const featuredIds = featured.map(f => f.id);

    const loadData = async () => {
        setLoading(true);
        const [repoData, hiddenRes, skillRes, featuredRes, settingsRes] = await Promise.all([
            fetchRepos(),
            supabase.from('hidden_projects').select('github_repo_id'),
            supabase.from('skills').select('id, name, category'),
            supabase.from('featured_projects').select('github_repo_id, repo_name, position').order('position', { ascending: true }),
            supabase.from('site_settings').select('key, value'),
        ]);
        setRepos(repoData);
        setHiddenIds((hiddenRes.data ?? []).map((r: any) => r.github_repo_id));
        setFeatured((featuredRes.data ?? []).map((r: any) => ({ id: r.github_repo_id, repo_name: r.repo_name, position: r.position ?? 0 })));
        setTechSkills((skillRes.data ?? []).filter((s: any) => s.category === 'tech').map((s: any) => ({ id: s.id, name: s.name })));
        setNonTechSkills((skillRes.data ?? []).filter((s: any) => s.category === 'non-tech').map((s: any) => ({ id: s.id, name: s.name })));
        for (const row of settingsRes.data ?? []) {
            if (row.key === 'show_dividers') setShowDividers(!!row.value);
            if (row.key === 'show_global_ticker') setShowGlobalTicker(!!row.value);
        }
        setLoading(false);
    };

    const loadVideos = async () => {
        setVideosLoading(true);
        const v = await fetchChannelVideos();
        setVideos(v);
        setVideosLoading(false);
    };

    const toggleFeatured = async (repo: GitHubRepo) => {
        if (featuredIds.includes(repo.id)) {
            await supabase.from('featured_projects').delete().eq('github_repo_id', repo.id);
            setFeatured(prev => prev.filter(f => f.id !== repo.id));
        } else {
            if (featured.length >= 3) { alert('Max 3 featured projects. Unfeature one first.'); return; }
            const position = featured.length;
            await supabase.from('featured_projects').insert({ github_repo_id: repo.id, repo_name: repo.name, position });
            setFeatured(prev => [...prev, { id: repo.id, repo_name: repo.name, position }]);
        }
    };

    const moveFeatured = async (idx: number, dir: -1 | 1) => {
        const next = [...featured];
        const target = idx + dir;
        if (target < 0 || target >= next.length) return;
        [next[idx], next[target]] = [next[target], next[idx]];
        const withPos = next.map((f, i) => ({ ...f, position: i }));
        setFeatured(withPos);
        await Promise.all(
            withPos.map(f =>
                supabase.from('featured_projects').update({ position: f.position }).eq('github_repo_id', f.id)
            )
        );
    };

    const setSetting = async (key: string, value: boolean) => {
        await supabase.from('site_settings').upsert({ key, value: value as any, updated_at: new Date().toISOString() }, { onConflict: 'key' });
        if (key === 'show_dividers') setShowDividers(value);
        if (key === 'show_global_ticker') setShowGlobalTicker(value);
    };

    useEffect(() => { if (authed) { loadData(); loadVideos(); } }, [authed]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, "true");
            setAuthed(true);
            setError("");
        } else {
            setError("ACCESS DENIED // INVALID KEY");
            setPassword("");
        }
    };

    const logout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        setAuthed(false);
    };

    const toggleProject = async (id: number, repoName: string) => {
        if (hiddenIds.includes(id)) {
            await supabase.from('hidden_projects').delete().eq('github_repo_id', id);
            setHiddenIds(prev => prev.filter(hid => hid !== id));
        } else {
            await supabase.from('hidden_projects').insert({ github_repo_id: id, repo_name: repoName });
            setHiddenIds(prev => [...prev, id]);
        }
    };

    const bulkAction = async (action: "hideAll" | "showAll") => {
        if (!confirm(`Are you sure you want to ${action === "hideAll" ? "hide" : "show"} ALL repositories?`)) return;
        if (action === "hideAll") {
            const toHide = repos.filter(r => !hiddenIds.includes(r.id));
            for (const r of toHide) {
                await supabase.from('hidden_projects').insert({ github_repo_id: r.id, repo_name: r.name });
            }
            setHiddenIds(repos.map(r => r.id));
        } else {
            await supabase.from('hidden_projects').delete().neq('github_repo_id', -1);
            setHiddenIds([]);
        }
    };

    const addSkill = async (e: React.FormEvent, category: 'tech' | 'non-tech') => {
        e.preventDefault();
        const name = category === 'tech' ? newTechSkill.trim() : newNonTechSkill.trim();
        if (!name) return;
        const { data } = await supabase.from('skills').insert({ name, category }).select('id, name').single();
        if (data) {
            if (category === 'tech') { setTechSkills(prev => [...prev, data]); setNewTechSkill(''); }
            else { setNonTechSkills(prev => [...prev, data]); setNewNonTechSkill(''); }
        }
    };

    const removeSkill = async (id: string, category: 'tech' | 'non-tech') => {
        await supabase.from('skills').delete().eq('id', id);
        if (category === 'tech') setTechSkills(prev => prev.filter(s => s.id !== id));
        else setNonTechSkills(prev => prev.filter(s => s.id !== id));
    };

    // AUTH GATE
    if (!authed) {
        return (
            <div className="relative min-h-screen bg-black text-white overflow-hidden">
                <CyberBackground />
                <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                    <motion.form
                        onSubmit={handleLogin}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md border border-red-600/30 bg-black/60 backdrop-blur-xl p-8 md:p-12 flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-3">
                            <Lock size={20} className="text-red-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-red-500 tracking-[0.4em] uppercase">SYS // ROOT ACCESS</span>
                                <h1 className="text-2xl font-heading font-black uppercase tracking-tight">Authentication</h1>
                            </div>
                        </div>
                        <div className="border-l-2 border-red-600 pl-3 py-1">
                            <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest">Enter security key to proceed</p>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoFocus
                            placeholder="●●●●●●"
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 text-white font-mono text-lg tracking-[0.6em] text-center focus:outline-none focus:border-red-600 transition-colors"
                        />
                        {error && <span className="text-[10px] font-mono text-red-500 tracking-widest text-center animate-pulse">{error}</span>}
                        <button type="submit" className="py-4 bg-red-600 text-white font-heading font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                            AUTHENTICATE →
                        </button>
                    </motion.form>
                </div>
            </div>
        );
    }

    const filteredRepos = repos
        .filter(r => {
            if (filter === "visible") return !hiddenIds.includes(r.id);
            if (filter === "hidden") return hiddenIds.includes(r.id);
            return true;
        })
        .filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortMode === "stars") return b.stargazers_count - a.stargazers_count;
            if (sortMode === "name") return a.name.localeCompare(b.name);
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

    const visibleCount = repos.length - hiddenIds.length;

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center font-mono text-red-500 uppercase tracking-widest animate-pulse">
            [ LOADING_SYSTEM_DATA... ]
        </div>
    );

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            <CyberBackground />
            <TechNav />
            <main className="relative z-10">
                <PageHero sectionNumber="SYS // ROOT ACCESS" title="ADMIN PANEL" subtitle="System configuration and project visibility matrix." />

                <div className="px-4 sm:px-6 pb-24">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        {/* Session bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border border-red-600/30 bg-red-600/5 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500">Session Active</span>
                            </div>
                            <button onClick={logout} className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-red-500 transition-colors">
                                Terminate Session →
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { label: "Total Repos", value: repos.length },
                                { label: "Visible", value: visibleCount },
                                { label: "Hidden", value: hiddenIds.length },
                                { label: "Skills", value: techSkills.length + nonTechSkills.length },
                            ].map(s => (
                                <div key={s.label} className="border border-white/10 bg-black/40 p-4 flex flex-col gap-1">
                                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-40">{s.label}</span>
                                    <span className="text-2xl md:text-3xl font-heading font-black text-red-500">{s.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* GitHub Manager */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 flex flex-col gap-6"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-heading font-black uppercase text-red-500">GitHub Manager</h2>
                                    <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest">Control repository visibility across the site.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => bulkAction("showAll")} className="px-3 py-2 text-[9px] font-mono uppercase tracking-widest border border-white/10 hover:border-green-500 hover:text-green-500 transition-colors">Show All</button>
                                    <button onClick={() => bulkAction("hideAll")} className="px-3 py-2 text-[9px] font-mono uppercase tracking-widest border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors">Hide All</button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search repositories..."
                                        className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>
                                <div className="flex gap-1">
                                    {(["all", "visible", "hidden"] as const).map(f => (
                                        <button key={f} onClick={() => setFilter(f)}
                                            className={`px-3 py-2.5 text-[9px] font-mono uppercase tracking-widest border transition-colors ${filter === f ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-white/10 text-white/40 hover:text-white'}`}>
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredRepos.length === 0 ? (
                                    <div className="col-span-full text-center py-12 text-white/40 font-mono text-xs uppercase">No repositories match.</div>
                                ) : filteredRepos.map(repo => {
                                    const isHidden = hiddenIds.includes(repo.id);
                                    const isFeatured = featuredIds.includes(repo.id);
                                    return (
                                        <div key={repo.id} className={`flex flex-col gap-3 p-4 border transition-all ${isHidden ? 'border-white/5 opacity-50 bg-white/5' : isFeatured ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-red-500/30 bg-red-500/5 hover:border-red-500'}`}>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-heading font-bold uppercase tracking-tight text-xs flex-1 leading-tight">{formatRepoName(repo.name)}</h3>
                                                {isHidden ? <EyeOff size={12} className="text-white/40 shrink-0" /> : <Eye size={12} className="text-red-500 shrink-0" />}
                                            </div>
                                            <div className="flex items-center gap-3 text-[9px] font-mono opacity-60">
                                                {repo.language && <span>{repo.language}</span>}
                                                {repo.stargazers_count > 0 && <span className="flex items-center gap-1"><Star size={9} /> {repo.stargazers_count}</span>}
                                                {isFeatured && <span className="text-yellow-500">★ FEATURED</span>}
                                            </div>
                                            <div className="flex gap-1">
                                                <button onClick={() => toggleProject(repo.id, repo.name)}
                                                    className={`flex-1 py-2 font-mono text-[9px] uppercase tracking-widest border transition-all ${isHidden ? 'border-white/10 text-white/60 hover:border-red-500 hover:text-red-500' : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}`}>
                                                    {isHidden ? 'Show' : 'Hide'}
                                                </button>
                                                {!isHidden && (
                                                    <button onClick={() => toggleFeatured(repo)}
                                                        className={`flex-1 py-2 font-mono text-[9px] uppercase tracking-widest border transition-all ${isFeatured ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black' : 'border-white/10 text-white/60 hover:border-yellow-500 hover:text-yellow-500'}`}>
                                                        {isFeatured ? '★ Unfeature' : '☆ Feature'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.section>

                        {/* Skills manager */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Technical Skills", cat: "tech" as const, list: techSkills, value: newTechSkill, setValue: setNewTechSkill },
                                { title: "Soft Skills", cat: "non-tech" as const, list: nonTechSkills, value: newNonTechSkill, setValue: setNewNonTechSkill },
                            ].map(section => (
                                <motion.section
                                    key={section.cat}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col gap-5"
                                >
                                    <h3 className="text-lg font-heading font-black uppercase text-red-500">{section.title}</h3>
                                    <form onSubmit={(e) => addSkill(e, section.cat)} className="flex gap-2">
                                        <input type="text" value={section.value} onChange={(e) => section.setValue(e.target.value)} placeholder={`Add ${section.title}...`}
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500" />
                                        <button type="submit" className="px-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-[10px] font-mono uppercase flex items-center gap-1">
                                            <Plus size={12} /> Add
                                        </button>
                                    </form>
                                    <div className="flex flex-wrap gap-2">
                                        {section.list.map(skill => (
                                            <div key={skill.id} className="group px-3 py-1.5 bg-white/5 border border-white/10 text-[11px] font-mono flex items-center gap-2 hover:border-red-500 transition-colors">
                                                <span>{skill.name}</span>
                                                <button onClick={() => removeSkill(skill.id, section.cat)} className="opacity-30 hover:opacity-100 hover:text-red-500"><Trash2 size={10} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>
                            ))}
                        </div>

                        {/* Site Settings */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col gap-5"
                        >
                            <div>
                                <h2 className="text-xl font-heading font-black uppercase text-red-500">Site Settings</h2>
                                <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest">Global visual toggles.</p>
                            </div>
                            {[
                                { key: 'show_dividers', label: 'Show name-ticker dividers between home sections', value: showDividers },
                                { key: 'show_global_ticker', label: 'Show global name-ticker at bottom of every page', value: showGlobalTicker },
                            ].map(s => (
                                <label key={s.key} className="flex items-center justify-between gap-4 p-3 border border-white/10 hover:border-red-500/50 cursor-pointer">
                                    <span className="text-xs font-mono">{s.label}</span>
                                    <input
                                        type="checkbox"
                                        checked={s.value}
                                        onChange={(e) => setSetting(s.key, e.target.checked)}
                                        className="w-4 h-4 accent-red-500"
                                    />
                                </label>
                            ))}
                        </motion.section>
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

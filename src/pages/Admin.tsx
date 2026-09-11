import React, { useEffect, useMemo, useState } from 'react';
import { fetchRepos, clearRepoCache, readCachedRepos, fallbackRepos, GitHubRepo } from '@/lib/github';
import { formatRepoName } from '@/lib/formatRepo';
import {
    fetchHiddenProjectIds,
    fetchHomeFeaturedProjects,
    fetchPageFeaturedProjects,
    saveAllProjectSettingsDb,
    FeaturedProject
} from '@/lib/projectSettings';
import { verifyAdminPassword, setAdminPassword, clearAdminPassword, getAdminPassword } from '@/lib/adminApi';
import { toast } from '@/hooks/use-toast';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import PageHero from '@/components/PageHero';
import UnifiedLoader from '@/components/UnifiedLoader';
import { waitCompleteLoop } from '@/lib/loadingUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Star, Eye, EyeOff, Search, Lock, ArrowUp, ArrowDown, 
    RefreshCw, Save, RotateCcw, AlertTriangle, FileText, 
    ExternalLink, GitFork, LogOut, CheckCircle2 
} from 'lucide-react';

const AUTH_KEY = "adminAuthenticated";
const DOCS_DRIVE_URL = "https://drive.google.com/drive/folders/1riPITGnsqDdkIUxNfURQKYJoGfc9vxRF?usp=sharing";
type SortMode = "updated" | "stars" | "name";

// Helper to ensure every repository is present with no duplicates
const mergeAllRepos = (remote: GitHubRepo[]): GitHubRepo[] => {
    const map = new Map<string, GitHubRepo>();
    for (const r of fallbackRepos) {
        if (r && r.name) map.set(r.name.toLowerCase(), r);
    }
    const cached = readCachedRepos();
    for (const r of cached) {
        if (r && r.name) map.set(r.name.toLowerCase(), r);
    }
    for (const r of remote) {
        if (r && r.name) map.set(r.name.toLowerCase(), r);
    }
    return Array.from(map.values()).sort((a, b) => {
        const timeA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const timeB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
    });
};

const Admin = () => {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "true" && !!getAdminPassword());
    const [authBusy, setAuthBusy] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Repos and Working Draft state
    const [repos, setRepos] = useState<GitHubRepo[]>(() => mergeAllRepos([]));
    const [hiddenIds, setHiddenIds] = useState<number[]>([]);
    const [homeFeatured, setHomeFeatured] = useState<FeaturedProject[]>([]);
    const [pageFeatured, setPageFeatured] = useState<FeaturedProject[]>([]);

    // Saved State snapshots to compare against
    const [savedHiddenIds, setSavedHiddenIds] = useState<number[]>([]);
    const [savedHomeFeatured, setSavedHomeFeatured] = useState<FeaturedProject[]>([]);
    const [savedPageFeatured, setSavedPageFeatured] = useState<FeaturedProject[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [syncingRepos, setSyncingRepos] = useState(false);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");
    const [sortMode, setSortMode] = useState<SortMode>("updated");

    const homeFeaturedIds = useMemo(() => homeFeatured.map(f => f.id), [homeFeatured]);
    const pageFeaturedIds = useMemo(() => pageFeatured.map(f => f.id), [pageFeatured]);

    // Check for unsaved changes
    const hasUnsavedChanges = useMemo(() => {
        const h1 = [...hiddenIds].sort().join(',');
        const h2 = [...savedHiddenIds].sort().join(',');
        if (h1 !== h2) return true;

        const hf1 = homeFeatured.map(f => f.id).join(',');
        const hf2 = savedHomeFeatured.map(f => f.id).join(',');
        if (hf1 !== hf2) return true;

        const pf1 = pageFeatured.map(f => f.id).join(',');
        const pf2 = savedPageFeatured.map(f => f.id).join(',');
        if (pf1 !== pf2) return true;

        return false;
    }, [hiddenIds, savedHiddenIds, homeFeatured, savedHomeFeatured, pageFeatured, savedPageFeatured]);

    const loadData = async (forceRefresh = false) => {
        setLoading(true);
        const startTime = Date.now();
        try {
            const [repoData, hiddenList, homeList, pageList] = await Promise.all([
                fetchRepos(forceRefresh),
                fetchHiddenProjectIds(),
                fetchHomeFeaturedProjects(),
                fetchPageFeaturedProjects(),
            ]);

            const fullRepoList = mergeAllRepos(repoData);
            setRepos(fullRepoList);

            setHiddenIds(hiddenList);
            setSavedHiddenIds(hiddenList);

            setHomeFeatured(homeList);
            setSavedHomeFeatured(homeList);

            setPageFeatured(pageList);
            setSavedPageFeatured(pageList);
        } catch (e) {
            console.error('Error loading admin data:', e);
            const fullRepoList = mergeAllRepos([]);
            setRepos(fullRepoList);
        } finally {
            // Ensure ECG pulse animation completes at least 1 full loop
            await waitCompleteLoop(startTime);
            setLoading(false);
        }
    };

    const syncRepos = async () => {
        setSyncingRepos(true);
        try {
            clearRepoCache();
            const repoData = await fetchRepos(true);
            const fullRepoList = mergeAllRepos(repoData);
            setRepos(fullRepoList);
            toast({
                title: 'GitHub Repositories Synced',
                description: `Successfully loaded all ${fullRepoList.length} repositories.`
            });
        } catch (err) {
            const fullRepoList = mergeAllRepos([]);
            setRepos(fullRepoList);
            toast({
                title: 'Loaded Complete Dataset',
                description: `Displaying all ${fullRepoList.length} repositories from archive.`
            });
        } finally {
            setSyncingRepos(false);
        }
    };

    // Staging / Draft handlers
    const toggleProjectDraft = (id: number) => {
        setHiddenIds(prev => {
            const isHidden = prev.includes(id);
            if (isHidden) {
                return prev.filter(hId => hId !== id);
            } else {
                setHomeFeatured(hf => hf.filter(f => f.id !== id));
                setPageFeatured(pf => pf.filter(f => f.id !== id));
                return [...prev, id];
            }
        });
    };

    const bulkActionDraft = (action: "hideAll" | "showAll") => {
        if (action === "hideAll") {
            const allIds = repos.map(r => r.id);
            setHiddenIds(allIds);
            setHomeFeatured([]);
            setPageFeatured([]);
            toast({ title: 'Draft: All Hidden', description: 'Click Save to apply changes.' });
        } else {
            setHiddenIds([]);
            toast({ title: 'Draft: All Visible', description: 'Click Save to apply changes.' });
        }
    };

    const toggleHomeFeaturedDraft = (repo: GitHubRepo) => {
        const isFeatured = homeFeaturedIds.includes(repo.id);
        if (isFeatured) {
            setHomeFeatured(prev => prev.filter(f => f.id !== repo.id));
        } else {
            if (homeFeatured.length >= 3) {
                toast({ title: 'Limit reached', description: 'Max 3 Home featured projects.' });
                return;
            }
            setHomeFeatured(prev => [...prev, { id: repo.id, repo_name: repo.name, position: prev.length }]);
        }
    };

    const togglePageFeaturedDraft = (repo: GitHubRepo) => {
        const isFeatured = pageFeaturedIds.includes(repo.id);
        if (isFeatured) {
            setPageFeatured(prev => prev.filter(f => f.id !== repo.id));
        } else {
            if (pageFeatured.length >= 5) {
                toast({ title: 'Limit reached', description: 'Max 5 Projects Page featured projects.' });
                return;
            }
            setPageFeatured(prev => [...prev, { id: repo.id, repo_name: repo.name, position: prev.length }]);
        }
    };

    const moveHomeFeaturedDraft = (idx: number, dir: -1 | 1) => {
        const next = [...homeFeatured];
        const target = idx + dir;
        if (target < 0 || target >= next.length) return;
        [next[idx], next[target]] = [next[target], next[idx]];
        setHomeFeatured(next);
    };

    const movePageFeaturedDraft = (idx: number, dir: -1 | 1) => {
        const next = [...pageFeatured];
        const target = idx + dir;
        if (target < 0 || target >= next.length) return;
        [next[idx], next[target]] = [next[target], next[idx]];
        setPageFeatured(next);
    };

    const discardChanges = () => {
        setHiddenIds(savedHiddenIds);
        setHomeFeatured(savedHomeFeatured);
        setPageFeatured(savedPageFeatured);
        toast({ title: 'Changes Reset', description: 'Restored to previously saved state.' });
    };

    const handleSaveAndReload = async () => {
        setSaving(true);
        try {
            const repoMap: Record<number, string> = {};
            repos.forEach(r => { repoMap[r.id] = r.name; });

            await saveAllProjectSettingsDb({
                hiddenIds,
                homeFeatured,
                pageFeatured,
                repoMap,
            });

            toast({
                title: '✓ Changes Saved Successfully!',
                description: 'Applying updates and refreshing view...'
            });

            setTimeout(() => {
                window.location.reload();
            }, 600);
        } catch (err) {
            setSaving(false);
            toast({
                title: 'Save Notice',
                description: (err as Error).message || 'Changes saved to local cache.'
            });
        }
    };

    useEffect(() => {
        if (authed) {
            loadData();
        }
    }, [authed]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthBusy(true);
        const ok = await verifyAdminPassword(password);
        setAuthBusy(false);
        if (ok) {
            setAdminPassword(password);
            sessionStorage.setItem(AUTH_KEY, "true");
            setAuthed(true);
            setError("");
        } else {
            setError("Invalid Security Key");
            setPassword("");
        }
    };

    const logout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        clearAdminPassword();
        setAuthed(false);
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
                        className="w-full max-w-md border border-red-600/30 bg-black/80 backdrop-blur-2xl p-8 md:p-12 flex flex-col gap-6 rounded-2xl shadow-2xl"
                    >
                        <div className="flex items-center gap-3">
                            <Lock size={22} className="text-red-500" />
                            <div className="flex flex-col">
                                <span className="text-xs font-mono text-red-500 tracking-widest uppercase">Admin Panel</span>
                                <h1 className="text-2xl font-heading font-black uppercase tracking-tight">Mainframe Access</h1>
                            </div>
                        </div>
                        <div className="border-l-2 border-red-600 pl-3 py-1">
                            <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest">Enter security key to control repository visibility</p>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoFocus
                            placeholder="●●●●●●"
                            className="w-full px-4 py-4 bg-white/5 border border-white/15 text-white font-mono text-lg tracking-[0.6em] text-center focus:outline-none focus:border-red-600 transition-colors rounded-xl"
                        />
                        {error && <span className="text-[10px] font-mono text-red-500 tracking-widest text-center animate-pulse">{error}</span>}
                        <button 
                            type="submit" 
                            disabled={authBusy} 
                            className="py-4 bg-red-600 text-white font-heading font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all disabled:opacity-50 rounded-xl shadow-lg shadow-red-600/30 font-bold"
                        >
                            AUTHENTICATE →
                        </button>
                    </motion.form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
                <UnifiedLoader text="LOADING REPOSITORY CONTROLS..." size="md" />
            </div>
        );
    }

    const filteredRepos = repos
        .filter(r => {
            if (filter === "visible") return !hiddenIds.includes(r.id);
            if (filter === "hidden") return hiddenIds.includes(r.id);
            return true;
        })
        .filter(r => (r.name || "").toLowerCase().includes(search.toLowerCase()) || (r.language || "").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortMode === "stars") return (b.stargazers_count || 0) - (a.stargazers_count || 0);
            if (sortMode === "name") return (a.name || "").localeCompare(b.name || "");
            const timeA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
            const timeB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
            return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
        });

    const visibleCount = repos.length - hiddenIds.length;

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            <CyberBackground />
            <TechNav />

            {/* STICKY UNSAVED BAR */}
            <AnimatePresence>
                {hasUnsavedChanges && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-16 left-0 right-0 z-50 bg-gradient-to-r from-red-950 via-neutral-900 to-red-950 border-y border-red-500/50 shadow-2xl px-4 py-3 backdrop-blur-xl"
                    >
                        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs">
                                <AlertTriangle size={16} className="animate-pulse text-yellow-400" />
                                <span className="font-bold uppercase tracking-wider">Unsaved Repository Changes</span>
                                <span className="hidden sm:inline opacity-70">· Click Save & Reload to apply changes across the site</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={discardChanges}
                                    disabled={saving}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-white/20 hover:border-white text-white/80 hover:text-white transition-colors rounded-lg"
                                >
                                    <RotateCcw size={12} /> Discard
                                </button>
                                <button
                                    onClick={handleSaveAndReload}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/40 transition-all rounded-lg"
                                >
                                    <Save size={14} className={saving ? "animate-spin" : ""} />
                                    {saving ? "SAVING & RELOADING..." : "💾 SAVE & RELOAD"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 pt-4 pb-20">
                <PageHero 
                    sectionNumber="06 / Admin" 
                    title="ADMIN CONTROL" 
                    subtitle="Repository visibility, featured ordering, and documentation access." 
                />

                <div className="px-4 sm:px-6 max-w-7xl mx-auto flex flex-col gap-6">
                    {/* Top Action & Session Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-neutral-950/80 p-4 sm:p-5 rounded-2xl backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                            <div className="flex flex-col">
                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">Mainframe Session Active</span>
                                <span className="text-[10px] font-mono text-white/50 uppercase">
                                    {hasUnsavedChanges ? "⚠️ Working Draft (Unsaved Changes)" : "✓ Synced with Storage"}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                            {/* DOCUMENT BUTTON LINKING TO GOOGLE DRIVE */}
                            <a
                                href={DOCS_DRIVE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:scale-105"
                                title="Access your documents on Google Drive"
                            >
                                <FileText size={15} className="text-red-500 group-hover:text-black" />
                                <span>Document</span>
                                <ExternalLink size={12} className="opacity-60" />
                            </a>

                            {/* Sync GitHub Repos Button */}
                            <button
                                onClick={syncRepos}
                                disabled={syncingRepos}
                                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border border-white/15 bg-white/5 hover:border-red-500 hover:text-red-400 disabled:opacity-50 transition-all rounded-xl"
                                title="Refresh all repositories from GitHub API"
                            >
                                <RefreshCw size={13} className={syncingRepos ? "animate-spin text-red-500" : ""} />
                                <span>{syncingRepos ? "Syncing..." : "Sync GitHub"}</span>
                            </button>

                            {/* Save & Reload Button */}
                            <button
                                onClick={handleSaveAndReload}
                                disabled={saving}
                                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded-xl shadow-lg ${
                                    hasUnsavedChanges 
                                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/40 animate-pulse' 
                                        : 'bg-white/5 hover:bg-white/15 text-white/80 border border-white/10'
                                }`}
                            >
                                <Save size={14} className={saving ? "animate-spin" : ""} />
                                <span>{saving ? "Saving..." : hasUnsavedChanges ? "Save & Reload" : "Saved"}</span>
                            </button>

                            {/* Logout */}
                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono text-white/50 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 rounded-xl transition-all"
                                title="Logout from Admin"
                            >
                                <LogOut size={13} />
                                <span className="hidden sm:inline">Exit</span>
                            </button>
                        </div>
                    </div>

                    {/* Clean Stats Overview */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="border border-white/10 bg-neutral-950/60 p-4 rounded-xl flex flex-col gap-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Total Repositories</span>
                            <span className="text-2xl sm:text-3xl font-heading font-black text-white">{repos.length}</span>
                        </div>
                        <div className="border border-green-500/20 bg-green-950/10 p-4 rounded-xl flex flex-col gap-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">Visible on Site</span>
                            <span className="text-2xl sm:text-3xl font-heading font-black text-green-400">{visibleCount}</span>
                        </div>
                        <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl flex flex-col gap-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400">Hidden from Site</span>
                            <span className="text-2xl sm:text-3xl font-heading font-black text-red-400">{hiddenIds.length}</span>
                        </div>
                        <div className="border border-yellow-500/20 bg-yellow-950/10 p-4 rounded-xl flex flex-col gap-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400">Featured Projects</span>
                            <span className="text-2xl sm:text-3xl font-heading font-black text-yellow-400">
                                {homeFeatured.length + pageFeatured.length} <span className="text-xs font-mono text-white/40">({homeFeatured.length}H / {pageFeatured.length}P)</span>
                            </span>
                        </div>
                    </div>

                    {/* Featured Projects Order Management */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Home Page Featured (Max 3) */}
                        <div className="border border-yellow-500/30 bg-yellow-950/10 p-4 sm:p-5 flex flex-col gap-3 rounded-2xl">
                            <div className="flex items-center justify-between border-b border-yellow-500/20 pb-2.5">
                                <div className="flex items-center gap-2">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold">Home Featured ({homeFeatured.length}/3)</span>
                                </div>
                                <span className="text-[9px] font-mono text-white/50 uppercase">Homepage Slider</span>
                            </div>
                            {homeFeatured.length === 0 ? (
                                <div className="text-[10px] font-mono text-white/40 py-3 text-center italic">
                                    No custom home featured set. Defaults to top 3 starred.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {homeFeatured.map((f, i) => (
                                        <div key={f.id} className="flex items-center gap-2.5 py-2 px-3 bg-black/60 border border-white/10 rounded-xl">
                                            <span className="text-yellow-400 font-mono text-xs font-bold w-5">0{i + 1}</span>
                                            <span className="flex-1 text-xs font-heading uppercase tracking-tight truncate text-white">
                                                {formatRepoName(f.repo_name)}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => moveHomeFeaturedDraft(i, -1)}
                                                    disabled={i === 0}
                                                    className="p-1.5 border border-white/10 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-lg"
                                                    title="Move Up"
                                                >
                                                    <ArrowUp size={11} />
                                                </button>
                                                <button
                                                    onClick={() => moveHomeFeaturedDraft(i, 1)}
                                                    disabled={i === homeFeatured.length - 1}
                                                    className="p-1.5 border border-white/10 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-lg"
                                                    title="Move Down"
                                                >
                                                    <ArrowDown size={11} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Projects Page Featured (Max 5) */}
                        <div className="border border-red-500/30 bg-red-950/10 p-4 sm:p-5 flex flex-col gap-3 rounded-2xl">
                            <div className="flex items-center justify-between border-b border-red-500/20 pb-2.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-red-400 font-bold">🚀</span>
                                    <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">Projects Page Slideshow ({pageFeatured.length}/5)</span>
                                </div>
                                <span className="text-[9px] font-mono text-white/50 uppercase">Projects Hero</span>
                            </div>
                            {pageFeatured.length === 0 ? (
                                <div className="text-[10px] font-mono text-white/40 py-3 text-center italic">
                                    No custom page featured set. Defaults to top 5 starred.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {pageFeatured.map((f, i) => (
                                        <div key={f.id} className="flex items-center gap-2.5 py-2 px-3 bg-black/60 border border-white/10 rounded-xl">
                                            <span className="text-red-400 font-mono text-xs font-bold w-5">0{i + 1}</span>
                                            <span className="flex-1 text-xs font-heading uppercase tracking-tight truncate text-white">
                                                {formatRepoName(f.repo_name)}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => movePageFeaturedDraft(i, -1)}
                                                    disabled={i === 0}
                                                    className="p-1.5 border border-white/10 hover:border-red-400 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-lg"
                                                    title="Move Up"
                                                >
                                                    <ArrowUp size={11} />
                                                </button>
                                                <button
                                                    onClick={() => movePageFeaturedDraft(i, 1)}
                                                    disabled={i === pageFeatured.length - 1}
                                                    className="p-1.5 border border-white/10 hover:border-red-400 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-lg"
                                                    title="Move Down"
                                                >
                                                    <ArrowDown size={11} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Repository Visibility & Management Grid */}
                    <div className="border border-white/10 bg-neutral-950/80 p-5 sm:p-7 rounded-2xl backdrop-blur-xl flex flex-col gap-6">
                        {/* Filter & Controls Bar */}
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search repositories by name or language..."
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-red-500 rounded-xl transition-colors"
                                />
                            </div>

                            {/* Filters & Bulk */}
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-1 border border-white/10 p-1 rounded-xl bg-white/5">
                                    {([
                                        { key: "all", label: `All (${repos.length})` },
                                        { key: "visible", label: `Visible (${visibleCount})` },
                                        { key: "hidden", label: `Hidden (${hiddenIds.length})` },
                                    ] as const).map(f => (
                                        <button
                                            key={f.key}
                                            onClick={() => setFilter(f.key)}
                                            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all ${
                                                filter === f.key 
                                                    ? 'bg-red-600 text-white font-bold shadow-md' 
                                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>

                                <select
                                    value={sortMode}
                                    onChange={e => setSortMode(e.target.value as SortMode)}
                                    className="px-3 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-red-500 rounded-xl"
                                >
                                    <option value="updated">Sort: Updated</option>
                                    <option value="stars">Sort: Stars</option>
                                    <option value="name">Sort: Name</option>
                                </select>

                                <button
                                    onClick={() => bulkActionDraft("showAll")}
                                    className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider border border-green-500/30 text-green-400 hover:bg-green-500/20 rounded-xl transition-colors"
                                >
                                    Show All
                                </button>
                                <button
                                    onClick={() => bulkActionDraft("hideAll")}
                                    className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                                >
                                    Hide All
                                </button>
                            </div>
                        </div>

                        {/* Complete Repository Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            {filteredRepos.length === 0 ? (
                                <div className="col-span-full text-center py-16 text-white/40 font-mono text-xs uppercase tracking-widest">
                                    No repositories match current filters.
                                </div>
                            ) : (
                                filteredRepos.map(repo => {
                                    const isHidden = hiddenIds.includes(repo.id);
                                    const isHomeFeat = homeFeaturedIds.includes(repo.id);
                                    const isPageFeat = pageFeaturedIds.includes(repo.id);

                                    return (
                                        <div
                                            key={repo.id}
                                            className={`flex flex-col justify-between gap-3.5 p-4 sm:p-5 border transition-all rounded-2xl ${
                                                isHidden 
                                                    ? 'border-white/10 bg-neutral-950/40 opacity-50 hover:opacity-80' 
                                                    : isHomeFeat || isPageFeat 
                                                        ? 'border-red-500/40 bg-red-950/20 shadow-lg shadow-red-950/20' 
                                                        : 'border-white/10 bg-neutral-950/70 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex flex-col gap-2">
                                                {/* Header & Status */}
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-heading font-black uppercase text-sm text-white tracking-tight leading-snug">
                                                        {formatRepoName(repo.name)}
                                                    </h3>
                                                    <span 
                                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase shrink-0 ${
                                                            isHidden 
                                                                ? 'bg-red-500/15 text-red-400 border border-red-500/30' 
                                                                : 'bg-green-500/15 text-green-400 border border-green-500/30'
                                                        }`}
                                                    >
                                                        {isHidden ? <><EyeOff size={10} /> Hidden</> : <><CheckCircle2 size={10} /> Visible</>}
                                                    </span>
                                                </div>

                                                {/* Repo meta description */}
                                                <p className="text-xs text-white/70 font-mono line-clamp-2 leading-relaxed">
                                                    {repo.description || "No description provided."}
                                                </p>

                                                {/* Badges */}
                                                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono pt-1">
                                                    {repo.language && (
                                                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/80 rounded-md">
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    {repo.stargazers_count > 0 && (
                                                        <span className="flex items-center gap-1 text-yellow-400 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                                                            <Star size={10} className="fill-yellow-400" /> {repo.stargazers_count}
                                                        </span>
                                                    )}
                                                    {isHomeFeat && (
                                                        <span className="text-yellow-400 font-bold bg-yellow-500/15 px-2 py-0.5 rounded-md border border-yellow-500/30">
                                                            ★ Home
                                                        </span>
                                                    )}
                                                    {isPageFeat && (
                                                        <span className="text-red-400 font-bold bg-red-500/15 px-2 py-0.5 rounded-md border border-red-500/30">
                                                            🚀 Slideshow
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Toggles */}
                                            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                                                {/* Main Visibility Toggle */}
                                                <button
                                                    onClick={() => toggleProjectDraft(repo.id)}
                                                    className={`w-full py-2 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${
                                                        isHidden 
                                                            ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black shadow-md shadow-green-500/10' 
                                                            : 'border-white/15 text-white/70 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10'
                                                    }`}
                                                >
                                                    {isHidden ? '✓ Make Visible' : '✕ Hide Repository'}
                                                </button>

                                                {/* Featured Toggles (only when visible) */}
                                                {!isHidden && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => toggleHomeFeaturedDraft(repo)}
                                                            className={`flex-1 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all border ${
                                                                isHomeFeat 
                                                                    ? 'border-yellow-400 text-yellow-400 bg-yellow-400/15' 
                                                                    : 'border-white/10 text-white/50 hover:border-yellow-400/50 hover:text-yellow-400'
                                                            }`}
                                                        >
                                                            {isHomeFeat ? '★ Home (Active)' : '★ Set Home (3)'}
                                                        </button>
                                                        <button
                                                            onClick={() => togglePageFeaturedDraft(repo)}
                                                            className={`flex-1 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all border ${
                                                                isPageFeat 
                                                                    ? 'border-red-400 text-red-400 bg-red-400/15' 
                                                                    : 'border-white/10 text-white/50 hover:border-red-400/50 hover:text-red-400'
                                                            }`}
                                                        >
                                                            {isPageFeat ? '🚀 Page (Active)' : '🚀 Set Page (5)'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer Status Counter */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs font-mono text-white/50 uppercase tracking-wider">
                            <span>Showing {filteredRepos.length} of {repos.length} Total Repositories</span>
                            <span>{visibleCount} Visible on Portfolio · {hiddenIds.length} Hidden</span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Admin;

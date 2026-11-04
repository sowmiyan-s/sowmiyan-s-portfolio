import { useCallback, useEffect, useState, useMemo } from "react";
import { useRealtimeRefetch } from "@/hooks/useRealtimeRefetch";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, GitFork, ArrowUpRight, FileText, Search, X } from "lucide-react";
import { fetchRepos, readCachedRepos, fallbackRepos } from "@/lib/github";
import { fetchHiddenProjectIds } from "@/lib/projectSettings";
import { formatRepoName } from "@/lib/formatRepo";
import UnifiedLoader from "@/components/common/UnifiedLoader";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const formatProjectsList = (repoList: any[]) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return repoList
    .sort((a, b) => {
      const timeA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const timeB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
    })
    .map(repo => {
      const dateObj = repo.updated_at ? new Date(repo.updated_at) : new Date();
      const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj;
      const year = validDate.getFullYear().toString();
      const monthName = months[validDate.getMonth()] || "Jan";

      return {
        id: repo.id,
        year,
        name: repo.name,
        title: formatRepoName(repo.name) || repo.name,
        date: `${monthName} ${year}`,
        description: repo.description || "Open-source software application built for modern engineering.",
        tech: repo.language ? [repo.language] : ['System'],
        github: repo.html_url || `https://github.com/sowmiyan-s/${repo.name}`,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0
      };
    });
};

const filterCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'Python & AI' },
  { id: 'web', label: 'Web & Full Stack' },
  { id: 'tools', label: 'Tools & Apps' },
];

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<any[]>(() => {
    const cached = readCachedRepos();
    const source = cached.length > 0 ? cached : fallbackRepos;
    return formatProjectsList(source);
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Modal state
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [readmeText, setReadmeText] = useState("");
  const [loadingReadme, setLoadingReadme] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [data, hiddenIds] = await Promise.all([
        fetchRepos(),
        fetchHiddenProjectIds(),
      ]);
      
      let visible = data.filter((r) => !hiddenIds.includes(r.id));
      if (visible.length === 0 && data.length > 0) visible = data;
      if (visible.length === 0 && fallbackRepos.length > 0) visible = fallbackRepos;

      const formatted = formatProjectsList(visible);
      if (formatted.length > 0) {
        setProjects(formatted);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    window.addEventListener("portfolio-config-changed", load);
    return () => window.removeEventListener("portfolio-config-changed", load);
  }, [load]);

  useRealtimeRefetch(['hidden_projects'], load);

  const handleOpenReadme = async (project: any) => {
    setSelectedProject(project);
    setLoadingReadme(true);
    setReadmeText("");

    try {
      const res = await fetch(`https://raw.githubusercontent.com/sowmiyan-s/${project.name}/main/README.md`);
      if (res.ok) {
        const text = await res.text();
        setReadmeText(text);
        return;
      }

      const res2 = await fetch(`https://raw.githubusercontent.com/sowmiyan-s/${project.name}/master/README.md`);
      if (res2.ok) {
        const text2 = await res2.text();
        setReadmeText(text2);
        return;
      }

      setReadmeText(`# ${project.title}\n\n${project.description}\n\n*View source on GitHub: [${project.github}](${project.github})*`);
    } catch (err) {
      setReadmeText(`# ${project.title}\n\n${project.description}\n\n*View source on GitHub: [${project.github}](${project.github})*`);
    } finally {
      setLoadingReadme(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (activeCategory === 'all') return true;
      const lower = (p.tech.join(" ") + " " + p.name + " " + p.description).toLowerCase();
      if (activeCategory === 'ai') return /python|ai|rag|agent|crew|langchain|model|opencv/i.test(lower);
      if (activeCategory === 'web') return /typescript|javascript|react|html|css|web|next/i.test(lower);
      if (activeCategory === 'tools') return /c#|tool|cli|bot|desktop|share/i.test(lower);
      return true;
    });
  }, [projects, searchQuery, activeCategory]);

  return (
    <section id="projects-list" className="w-full flex flex-col gap-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-zinc-900 pb-5">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
            ALL OPEN SOURCE REPOSITORIES
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans mt-0.5">
            Showing {filteredProjects.length} of {projects.length} repositories from GitHub.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, tech or keyword..."
            className="w-full bg-white border-2 border-zinc-900 pl-10 pr-4 py-2.5 text-xs font-sans text-zinc-950 focus:outline-none focus:border-red-600 shadow-brutal-sm"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 border-2 border-zinc-900 text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-red-600 text-white shadow-brutal-sm'
                : 'bg-white text-zinc-800 hover:bg-stone-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <UnifiedLoader size="md" />
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
              whileHover={{ y: -4 }}
              className="bg-white border-2 border-zinc-900 shadow-brutal hover:shadow-brutal-lg hover:border-red-600 p-6 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-zinc-900">
                  <span className="font-sans text-2xl font-black text-red-600">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.stars > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{project.stars}</span>
                      </span>
                    )}
                    {project.forks > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 border border-zinc-900 text-xs font-sans font-bold text-zinc-800">
                        <GitFork className="w-3 h-3 text-zinc-600" />
                        <span>{project.forks}</span>
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-stone-100 border border-zinc-900 text-[11px] font-sans font-bold uppercase text-zinc-700">
                      {project.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 group-hover:text-red-600 transition-colors mb-2 leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-600 font-sans leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tech & Links */}
              <div className="pt-4 border-t border-zinc-200">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t: string) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 bg-stone-100 border border-zinc-900 text-xs font-sans font-semibold text-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-sans font-bold uppercase tracking-wide border-2 border-zinc-900 shadow-brutal-sm transition-all active:scale-95"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => handleOpenReadme(project)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-stone-100 text-zinc-900 text-xs font-sans font-bold uppercase tracking-wide border-2 border-zinc-900 shadow-brutal-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-600" />
                    <span>Readme</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border-2 border-zinc-900 shadow-brutal">
          <p className="font-heading font-black text-lg text-zinc-800 uppercase">
            No projects matched your search.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
            className="mt-3 px-4 py-2 bg-red-600 text-white font-sans text-xs font-bold uppercase border-2 border-zinc-900 shadow-brutal-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Readme Modal Dialog (Matching Neo-Brutalist Theme) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full max-h-[85vh] bg-white border-3 border-zinc-900 shadow-brutal p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-zinc-900 mb-4 shrink-0">
                <div>
                  <span className="text-xs font-sans font-bold text-red-600 uppercase tracking-wide block">
                    Documentation
                  </span>
                  <h3 className="text-2xl font-black uppercase text-zinc-950">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-stone-100 hover:bg-stone-200 border-2 border-zinc-900 shadow-brutal-sm text-zinc-900 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto pr-2 my-2 prose prose-zinc prose-red max-w-none text-sm leading-relaxed">
                {loadingReadme ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <UnifiedLoader size="sm" />
                    <span className="text-xs font-sans font-bold text-zinc-500 uppercase mt-2">Loading Readme...</span>
                  </div>
                ) : (
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readmeText}</ReactMarkdown>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t-2 border-zinc-900 flex items-center justify-between gap-3 shrink-0">
                <span className="text-xs font-sans font-bold text-zinc-600 uppercase">
                  {selectedProject.tech.join(" • ")}
                </span>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white font-sans text-xs font-bold uppercase border-2 border-zinc-900 shadow-brutal-sm"
                >
                  <span>Open on GitHub</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
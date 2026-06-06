import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork } from "lucide-react";
import { fetchRepos } from "@/lib/github";
import RadarLoader from "./RadarLoader";
import ScrambleText from "./ScrambleText";

const ProjectNode = ({ project, index }: { project: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-12 md:pl-24 mb-16 last:mb-0 group"
    >
      {/* Connector Line */}
      <div className="absolute left-0 top-8 w-12 md:w-24 h-[1px] bg-red-600/30 group-hover:bg-red-600 transition-colors" />

      {/* Node Pulse */}
      <div className="absolute left-[-5px] top-[27px] w-2.5 h-2.5 bg-red-600 rounded-full z-10 shadow-[0_0_10px_rgba(255,0,0,0.5)] group-hover:scale-150 transition-transform" />

      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="block group-hover:translate-x-2 transition-transform duration-500"
      >
        <div className="bg-[#0a0a0a]/80 border border-white/5 group-hover:border-red-600/50 p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-md relative overflow-hidden max-w-4xl shadow-2xl">
          {/* Metadata Overlay */}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-red-600 font-bold tracking-[0.3em] uppercase mb-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-red-600 rounded-full" />
                {project.date}
              </span>
              <h3 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter transition-colors group-hover:text-red-500 leading-none">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-4 py-2 px-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/40 uppercase tracking-widest group-hover:border-red-600/30 transition-all">
                {project.stars > 0 && (
                  <span className="flex items-center gap-1.5"><Star size={10} className="text-yellow-500" /> {project.stars}</span>
                )}
                {project.forks > 0 && (
                  <span className="flex items-center gap-1.5"><GitFork size={10} /> {project.forks}</span>
                )}
                <div className="w-px h-3 bg-white/10" />
                <span className="text-red-600 font-bold">DEPLOYED</span>
              </div>
              <div className="p-3 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg shadow-red-600/0 group-hover:shadow-red-600/20">
                <Github size={18} />
              </div>
            </div>
          </div>

          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <span key={t} className="text-[9px] px-3 py-1 bg-white/[0.03] border border-white/10 rounded-md font-mono text-white/30 uppercase tracking-[0.2em] group-hover:border-white/20 transition-all">
                {t}
              </span>
            ))}
          </div>

          {/* Tactical Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-tactical-grid -z-10" />
        </div>
      </a>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [groupedProjects, setGroupedProjects] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchRepos();
        const saved = localStorage.getItem('hiddenProjects');
        const hiddenIds = saved ? JSON.parse(saved) : [];
        const visible = data.filter((r) => !hiddenIds.includes(r.id));

        const formatted = visible
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map(repo => {
            const dateObj = new Date(repo.updated_at);
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const year = dateObj.getFullYear().toString();

            return {
              id: repo.id,
              year,
              name: repo.name,
              title: repo.name.replace(/-/g, ' '),
              date: `${months[dateObj.getMonth()]} ${year}`,
              description: repo.description || "Project repository description.",
              tech: repo.language ? [repo.language] : ['System'],
              github: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count
            };
          });

        // Group by year
        const groups = formatted.reduce((acc, curr) => {
          if (!acc[curr.year]) acc[curr.year] = [];
          acc[curr.year].push(curr);
          return acc;
        }, {} as Record<string, any[]>);

        setGroupedProjects(groups);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const years = Object.keys(groupedProjects).sort((a, b) => b.localeCompare(a));

  return (
    <section id="projects-list" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-red-600 rounded-full" />
            <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-[0.6em]">PROJECT PORTFOLIO</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none">
            <ScrambleText text="All Projects" />
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-60 gap-12">
            <RadarLoader />
            <p className="font-mono text-[10px] uppercase tracking-[1em] text-red-600 animate-pulse text-center">Reconstructing Timeline Axis</p>
          </div>
        ) : years.length > 0 ? (
          <div className="relative">
            {/* Main Vertical Timeline Axis */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600 via-red-600/20 to-transparent ml-[-1px]" />

            {years.map((year) => (
              <div key={year} className="mb-24 last:mb-0">
                {/* Year Marker */}
                <div className="relative pl-12 md:pl-24 mb-12">
                  <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-red-600 rounded-full z-20 shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
                  <div className="flex items-center gap-6">
                    <h4 className="text-4xl md:text-7xl font-heading font-black text-[#AF47FF] tracking-tighter leading-none select-none">
                      <ScrambleText text={`Year ${year}`} />
                    </h4>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                </div>

                <div className="flex flex-col">
                  {groupedProjects[year].map((project, i) => (
                    <ProjectNode key={project.id} project={project} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]">
            <p className="font-mono text-xl text-red-600 uppercase tracking-widest mb-3 font-black">Timeline Axis Offline</p>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.5em]">No significant events found in the public repository archive.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

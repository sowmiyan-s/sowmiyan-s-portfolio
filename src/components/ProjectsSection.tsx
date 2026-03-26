import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { fetchRepos } from "@/lib/github";
import { supabase } from "@/integrations/supabase/client";
import RadarLoader from "./RadarLoader";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchRepos();

        // Fetch hidden projects from database
        const { data: hiddenRows } = await supabase
          .from('hidden_projects')
          .select('github_repo_id');
        const hiddenIds = (hiddenRows || []).map(r => r.github_repo_id);

        const visible = data.filter((r) => !hiddenIds.includes(r.id));

        const formatted = visible
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            title: repo.name.replace(/-/g, ' '),
            description: repo.description || "No description available.",
            language: repo.language || 'Code',
            github: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updated: new Date(repo.updated_at).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            }),
          }));

        setProjects(formatted);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section id="projects-list" className="py-20 relative z-10 border-t border-foreground/5">
      <div className="container mx-auto px-6 max-w-6xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
            <RadarLoader />
            <p className="font-mono text-xs uppercase tracking-widest text-primary animate-pulse">Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="border border-foreground/10 bg-background p-6 md:p-8 flex flex-col justify-between gap-6 hover:border-primary/40 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{project.language}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{project.updated}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-foreground leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    {project.stars > 0 && <span>★ {project.stars}</span>}
                    {project.forks > 0 && <span>⑂ {project.forks}</span>}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-foreground transition-colors uppercase tracking-wider"
                  >
                    View on GitHub
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-dashed border-foreground/10">
            <p className="font-mono text-lg text-primary uppercase tracking-widest mb-2">No Projects Found</p>
            <p className="text-sm text-muted-foreground">No repositories available in the public archive.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

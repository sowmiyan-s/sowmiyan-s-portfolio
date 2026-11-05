import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Search,
  Cpu,
  Layers,
  Briefcase,
  GitPullRequest,
  Globe,
} from 'lucide-react';
import {
  ALL_PROJECTS,
  CATEGORIES_CONFIG,
  ProjectCategory,
  ProjectItem,
} from '@/data/projectsData';

const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
  freelance: <Briefcase className="w-5 h-5 text-red-600" />,
  contribution: <GitPullRequest className="w-5 h-5 text-red-600" />,
  ai: <Cpu className="w-5 h-5 text-red-600" />,
  website: <Globe className="w-5 h-5 text-red-600" />,
  other: <Layers className="w-5 h-5 text-red-600" />,
};

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects by search query
  const filteredProjects = useMemo(() => {
    let list = ALL_PROJECTS;
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  // Group by category when 'all' is selected and no search filter
  const isPartitionedView = activeCategory === 'all' && !searchQuery.trim();

  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16">
      {/* ─── Control Bar: Filter Tabs & Live Search ─── */}
      <div className="w-full bg-white border-3 border-zinc-900 shadow-[6px_6px_0px_#18181B] p-5 sm:p-7 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-sans font-black uppercase tracking-wider border-2 border-zinc-900 transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-red-600 text-white shadow-[2px_2px_0px_#18181B] -translate-y-0.5'
                : 'bg-stone-50 hover:bg-stone-100 text-zinc-800'
            }`}
          >
            All Projects ({ALL_PROJECTS.length})
          </button>

          {CATEGORIES_CONFIG.map((cat) => {
            const count = ALL_PROJECTS.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-sans font-black uppercase tracking-wider border-2 border-zinc-900 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-[2px_2px_0px_#DC2626] -translate-y-0.5'
                    : 'bg-stone-50 hover:bg-stone-100 text-zinc-800'
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[260px] sm:min-w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border-2 border-zinc-900 font-sans text-xs sm:text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-red-600 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* ─── Projects Display ─── */}
      {isPartitionedView ? (
        // Distinct Categorized Sections
        <div className="flex flex-col gap-16 sm:gap-20">
          {CATEGORIES_CONFIG.map((cat) => {
            const catProjects = ALL_PROJECTS.filter((p) => p.category === cat.id);
            return (
              <section key={cat.id} id={cat.id} className="flex flex-col gap-6 sm:gap-8 scroll-mt-28">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b-3 border-zinc-900">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 bg-zinc-950 text-white border-2 border-zinc-900 shadow-[2px_2px_0px_#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                      {categoryIcons[cat.id]}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-black text-zinc-950 uppercase tracking-tight flex items-baseline gap-3 flex-wrap">
                        <span>{cat.title}</span>
                        <span className="text-xs sm:text-sm font-sans font-bold text-zinc-500 lowercase tracking-normal">
                          ({catProjects.length} projects)
                        </span>
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {catProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // Filtered Grid View
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900">
            <span className="text-sm font-sans font-bold text-zinc-700 uppercase tracking-wide">
              Showing {filteredProjects.length} matching project{filteredProjects.length === 1 ? '' : 's'}
            </span>
            {(activeCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-sans font-bold text-red-600 hover:underline uppercase tracking-wider cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="w-full p-12 bg-white border-2 border-zinc-900 text-center font-sans">
              <p className="text-zinc-600 text-sm">No projects found matching your search.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wider border border-zinc-900 shadow-brutal-sm cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white border-3 border-zinc-900 shadow-[5px_5px_0px_#18181B] hover:shadow-[7px_7px_0px_#DC2626] transition-all flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Card Header Media or Banner */}
        {project.image ? (
          <div className="relative w-full h-44 bg-zinc-950 border-b-3 border-zinc-900 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/og-image.png';
              }}
            />
          </div>
        ) : (
          <div className="px-5 pt-5 pb-3 border-b-2 border-zinc-200 flex items-center justify-between bg-stone-50">
            <span className="text-xs font-sans font-bold uppercase tracking-wider px-2 py-0.5 bg-zinc-900 text-white border border-zinc-900">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-sans font-bold text-zinc-600">
              {project.year}
            </span>
          </div>
        )}

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl font-heading font-black text-zinc-950 uppercase tracking-tight group-hover:text-red-600 transition-colors leading-tight">
            {project.title}
          </h3>

          <p className="text-xs font-sans font-bold text-red-600 uppercase tracking-wide leading-tight">
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-stone-100 border border-zinc-800 text-[11px] font-sans font-bold text-zinc-800 shadow-[1px_1px_0px_#18181B]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0 mt-2">
        <div className="pt-4 border-t-2 border-zinc-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-red-600 text-white border-2 border-zinc-900 text-xs font-sans font-bold uppercase tracking-wider transition-colors shadow-[2px_2px_0px_#18181B]"
              >
                <Github size={13} />
                <span>GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            ) : (
              <span className="text-xs font-sans text-zinc-400">Proprietary</span>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-100 text-zinc-950 border-2 border-zinc-900 text-xs font-sans font-bold uppercase tracking-wider transition-colors shadow-[2px_2px_0px_#18181B]"
              >
                <ExternalLink size={13} />
                <span>Demo</span>
              </a>
            )}
          </div>

          <span className="text-xs font-sans font-bold text-zinc-400">
            {project.year}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectsSection;

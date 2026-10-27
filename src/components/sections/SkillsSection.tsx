import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeRefetch } from '@/hooks/useRealtimeRefetch';

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

const DEFAULT_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    skills: [
      'LangChain',
      'CrewAI',
      'Claude API',
      'PyTorch',
      'FastAPI',
      'Hugging Face',
      'Ollama',
      'n8n',
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java'],
  },
  {
    id: 'backend',
    name: 'Backend & Databases',
    skills: ['PostgreSQL', 'Supabase', 'MongoDB', 'MySQL'],
  },
  {
    id: 'frontend',
    name: 'Frontend & UI',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Figma'],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    skills: ['Docker', 'Linux', 'Git', 'GitHub', 'AWS', 'Vercel', 'Power BI'],
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'languages', label: 'Languages' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'devops', label: 'DevOps' },
];

const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [customSkills, setCustomSkills] = useState<string[]>([]);

  const load = useCallback(async () => {
    try {
      const { data } = await supabase.from('skills').select('name, category');
      if (data && data.length) {
        const t = data
          .filter((s: any) => s.category === 'tech')
          .map((s: any) => s.name);
        if (t.length) setCustomSkills(t);
      }
    } catch {
      /* gracefully handle offline */
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useRealtimeRefetch(['skills'], load);

  const categories = useMemo(() => {
    if (!customSkills.length) return DEFAULT_CATEGORIES;
    const existing = new Set(
      DEFAULT_CATEGORIES.flatMap((c) => c.skills.map((s) => s.toLowerCase()))
    );
    const newItems = customSkills.filter((s) => !existing.has(s.toLowerCase()));
    if (!newItems.length) return DEFAULT_CATEGORIES;

    return DEFAULT_CATEGORIES.map((cat) => {
      if (cat.id === 'backend') {
        return { ...cat, skills: [...cat.skills, ...newItems] };
      }
      return cat;
    });
  }, [customSkills]);

  const visibleCategories = useMemo(() => {
    if (activeTab === 'all') return categories;
    return categories.filter((cat) => cat.id === activeTab);
  }, [activeTab, categories]);

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold">
            Tech Stack
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight mt-1">
            Skills &amp; Technologies
          </h2>
        </div>

        {/* Simple Filter Tabs */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white font-medium'
                    : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Category Rows */}
      <div className="flex flex-col divide-y divide-white/5">
        {visibleCategories.map((group) => (
          <div
            key={group.id}
            className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 py-5 sm:py-6"
          >
            <div className="sm:w-48 shrink-0">
              <span className="text-xs font-mono uppercase tracking-wider text-white/40">
                {group.name}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 flex-1">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-red-500/30 text-xs sm:text-sm font-mono text-white/85 hover:text-white transition-colors cursor-default select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;

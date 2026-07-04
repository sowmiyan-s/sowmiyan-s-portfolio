import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { getSkillIconUrl } from '@/lib/skillIcons';
import { Users, MessageSquare, Target, Brain, Presentation, Handshake } from 'lucide-react';

const defaultTech = [
  'Python',
  'Java',
  'SQL',
  'LLMs',
  'LangChain',
  'CrewAI',
  'Hugging Face',
  'MongoDB',
  'MySQL',
  'AWS',
  'Vercel',
  'Netlify',
  'Docker',
  'Linux',
  'Tailwind CSS',
  'React',
  'Vite',
  'VSCode',
  'Figma',
  'Gigma',
  'Canva',
  'Claude',
  'Git',
  'GitHub',
  'Ollama',
  'n8n',
  'Power BI',
];

const softIconMap: Record<string, any> = {};

const SkillsSection = () => {
    const [tech, setTech] = useState<string[]>(defaultTech);

    useEffect(() => {
        (async () => {
            const { data } = await supabase.from('skills').select('name, category');
            if (data && data.length) {
                const t = data.filter(s => s.category === 'tech').map(s => s.name);
                if (t.length) setTech(t);
            }
        })();
    }, []);

    return (
        <section className="relative py-16 md:py-20 px-4 sm:px-6 bg-transparent z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col gap-3 border-l-2 border-red-600 pl-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-red-500">02 // Capability Matrix</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter">Skills</h2>
                </div>

                <div className="grid gap-8">
                    <div className="grid gap-4">
                        <p className="max-w-3xl text-sm md:text-base text-white/60 leading-relaxed">
                            A practical toolkit for AI product engineering, modern deployment, and visual design. These are the skills I lean on to build fast, functional and production-ready work.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {tech.map((name, i) => {
                            const icon = getSkillIconUrl(name);
                            return (
                                <motion.div
                                    key={`tech-${name}-${i}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: i * 0.03 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col items-center justify-center gap-3 p-4 border border-white/10 bg-white/5 rounded-3xl text-center shadow-[0_20px_40px_rgba(255,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_25px_50px_rgba(255,0,0,0.18)]"
                                    title={name}
                                >
                                    {icon ? (
                                        <img
                                            src={icon}
                                            alt={name}
                                            loading="lazy"
                                            className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 flex items-center justify-center font-mono text-xs text-white/70 border border-white/10 rounded-full">
                                            {name.slice(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="text-[11px] md:text-xs font-mono text-white/75 group-hover:text-white leading-tight tracking-tight">
                                        {name}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

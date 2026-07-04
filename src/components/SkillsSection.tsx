import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { getSkillIconUrl } from '@/lib/skillIcons';
import { Users, MessageSquare, Target, Brain, Presentation, Handshake } from 'lucide-react';

const defaultTech = ['Python', 'Java', 'SQL', 'LLMs', 'LangChain', 'CrewAI', 'Hugging Face', 'MongoDB', 'MySQL', 'AWS', 'Vercel', 'Netlify', 'Git', 'GitHub', 'Ollama', 'n8n', 'Power BI'];
const defaultSoft = ['Problem Solving', 'Communication', 'Team Leadership', 'Presentation', 'Collaboration', 'Adaptability'];

const softIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    'Problem Solving': Brain,
    'Communication': MessageSquare,
    'Team Leadership': Users,
    'Presentation': Presentation,
    'Collaboration': Handshake,
    'Adaptability': Target,
};

const SkillsSection = () => {
    const [tech, setTech] = useState<string[]>(defaultTech);
    const [soft, setSoft] = useState<string[]>(defaultSoft);

    useEffect(() => {
        (async () => {
            const { data } = await supabase.from('skills').select('name, category');
            if (data && data.length) {
                const t = data.filter(s => s.category === 'tech').map(s => s.name);
                const n = data.filter(s => s.category === 'non-tech').map(s => s.name);
                if (t.length) setTech(t);
                if (n.length) setSoft(n);
            }
        })();
    }, []);

    return (
        <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-transparent z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                <div className="flex flex-col gap-2 border-l-2 border-red-600 pl-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-red-500">02 // Capability Matrix</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter">Skills</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                    {/* Tech */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-heading uppercase text-red-500 tracking-[0.3em] border-b border-white/10 pb-3">Technical</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {tech.map((name, i) => {
                                const icon = getSkillIconUrl(name);
                                return (
                                    <motion.div
                                        key={`tech-${name}-${i}`}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.03 }}
                                        viewport={{ once: true }}
                                        className="group aspect-square flex flex-col items-center justify-center gap-2 p-3 border border-white/10 bg-black/40 hover:border-red-600 hover:bg-red-950/10 transition-colors"
                                        title={name}
                                    >
                                        {icon ? (
                                            <img
                                                src={icon}
                                                alt={name}
                                                loading="lazy"
                                                className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-mono text-xs text-white/60 border border-white/10">
                                                {name.slice(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="text-[9px] md:text-[10px] font-mono text-white/60 group-hover:text-white text-center leading-tight tracking-tight">
                                            {name}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Soft */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-heading uppercase text-red-500 tracking-[0.3em] border-b border-white/10 pb-3">Soft Skills</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {soft.map((name, i) => {
                                const Icon = softIconMap[name] || Target;
                                return (
                                    <motion.div
                                        key={`soft-${name}-${i}`}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.04 }}
                                        viewport={{ once: true }}
                                        className="group aspect-square flex flex-col items-center justify-center gap-2 p-4 border border-white/10 bg-black/40 hover:border-red-600 transition-colors"
                                    >
                                        <Icon size={28} />
                                        <span className="text-[10px] md:text-xs font-mono text-white/70 group-hover:text-white text-center leading-tight">
                                            {name}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

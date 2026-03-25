import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DecodeText from './DecodeText';

const defaultTechSkills = ['Python', 'JavaScript', 'React', 'Node.js', 'TensorFlow', 'PyTorch', 'AWS', 'Docker'];
const defaultNonTechSkills = ['Problem Solving', 'Communication', 'Team Leadership', 'Project Management', 'Public Speaking'];

const SkillsSection = () => {
    const [techSkills, setTechSkills] = useState<string[]>([]);
    const [nonTechSkills, setNonTechSkills] = useState<string[]>([]);

    useEffect(() => {
        const savedTech = localStorage.getItem('techSkills');
        const savedNonTech = localStorage.getItem('nonTechSkills');
        
        if (savedTech) {
            setTechSkills(JSON.parse(savedTech));
        } else {
            setTechSkills(defaultTechSkills);
            localStorage.setItem('techSkills', JSON.stringify(defaultTechSkills));
        }

        if (savedNonTech) {
            setNonTechSkills(JSON.parse(savedNonTech));
        } else {
            setNonTechSkills(defaultNonTechSkills);
            localStorage.setItem('nonTechSkills', JSON.stringify(defaultNonTechSkills));
        }
    }, []);

    return (
        <section className="relative py-32 px-6 border-t border-white/5 bg-black z-10 overflow-hidden">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20" />
            
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                <div className="flex flex-col gap-2 border-l-2 border-red-600 pl-4">
                    <span className="text-[10px] opacity-40 font-mono tracking-[0.5em] uppercase">04 // Capability Matrix</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter">Skill Parameters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Tech Skills */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-xl font-heading uppercase text-red-600 tracking-widest border-b border-white/10 pb-4">
                            Technical Skills
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {techSkills.map((skill, index) => (
                                <motion.div 
                                    key={`tech-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="p-4 border border-white/10 bg-white/5 hover:bg-red-900/10 hover:border-red-600/50 transition-all group relative overflow-hidden flex items-center justify-center text-center"
                                >
                                    <DecodeText text={skill} className="relative z-10 font-mono text-xs uppercase text-white/80 group-hover:text-red-400 transition-colors tracking-widest" />
                                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600/0 group-hover:bg-red-600/100 transition-all" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Non-Tech Skills */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-xl font-heading uppercase text-red-600 tracking-widest border-b border-white/10 pb-4">
                            Non-Technical Skills
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            {nonTechSkills.map((skill, index) => (
                                <motion.div 
                                    key={`nontech-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="p-4 border border-white/10 bg-white/5 hover:bg-red-900/10 hover:border-red-600/50 transition-all group relative overflow-hidden flex items-center justify-center text-center"
                                >
                                    <DecodeText text={skill} className="relative z-10 font-mono text-xs uppercase text-white/80 group-hover:text-red-400 transition-colors tracking-widest" />
                                    <div className="absolute top-0 right-0 w-1 h-full bg-red-600/0 group-hover:bg-red-600/100 transition-all" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

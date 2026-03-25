import React from 'react';
import { motion } from 'framer-motion';

const ContentCreationSection = () => {
    const links = [
        { name: "YouTube", url: "#", desc: "Tutorials & Tech Insights" },
        { name: "LinkedIn", url: "#", desc: "Professional Updates" },
        { name: "Instagram", url: "#", desc: "Behind the Scenes" },
        { name: "Discord", url: "#", desc: "Community Server" }
    ];

    return (
        <section className="relative py-32 px-6 border-t border-white/5 bg-black z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                <div className="flex flex-col gap-6 w-full md:w-1/2 relative z-10">
                    <span className="text-[10px] opacity-40 font-mono tracking-[0.5em] uppercase text-red-600">Content Creation</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter">
                        Bound By <span className="text-red-700">Code</span>
                    </h2>
                    <p className="font-mono text-sm leading-relaxed text-white/60">
                        Sharing knowledge, building a tech community, and documenting the journey of software engineering and artificial intelligence. Join the ecosystem and expand your development capabilities.
                    </p>
                </div>
                
                <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    {links.map((link, i) => (
                        <motion.a 
                            key={i}
                            href={link.url}
                            target="_blank"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 border border-white/10 bg-white/5 hover:bg-black hover:border-red-600/50 transition-all flex flex-col gap-2 group relative overflow-hidden"
                        >
                            <span className="font-heading uppercase tracking-widest text-lg group-hover:text-red-600 transition-colors z-10 relative">{link.name}</span>
                            <span className="font-mono text-[10px] opacity-50 uppercase z-10 relative">{link.desc}</span>
                            <div className="absolute top-4 right-4 text-xs font-mono opacity-20 group-hover:opacity-100 group-hover:text-red-500 transition-all">
                                ↗
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContentCreationSection;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchChannelVideos, YouTubeVideo } from '@/lib/youtube';
import ScrambleText from './ScrambleText';
import { Instagram, Youtube, Linkedin, ExternalLink } from 'lucide-react';

const socialIcons: Record<string, any> = {
    Instagram: Instagram,
    YouTube: Youtube,
    LinkedIn: Linkedin
};

const ContentCreationSection = () => {
    const links = [
        { name: "Instagram", url: "https://instagram.com/sowmiyan.s_", desc: "Studio Logs" },
        { name: "YouTube", url: "https://youtube.com/@bound-by-code", desc: "Bound By Code Channel" },
        { name: "LinkedIn", url: "https://linkedin.com/in/sowmiyan-s", desc: "Professional Network" }
    ];

    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const fetched = await fetchChannelVideos();
            setVideos(fetched);
            setLoading(false);
        })();
    }, []);

    const duplicated = videos.length ? [...videos, ...videos, ...videos] : [];

    return (
        <section className="relative py-16 bg-transparent z-10 overflow-hidden w-full">
            <div className="flex flex-col gap-16 items-center w-full">
                <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-6 items-center text-center relative z-10">
                    <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                        <ScrambleText text="Bound By Code" triggerOnView speed={0.22} />
                    </h2>
                    <p className="font-mono text-sm text-white/80 max-w-xl">
                        <ScrambleText text="Tamil-language AI, vibe-coding and developer tutorials." triggerOnView speed={0.2} />
                    </p>
                </div>

                {loading ? (
                    <div className="w-full flex overflow-hidden py-4 justify-center">
                        <div className="flex gap-6 px-4 animate-pulse">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="w-[280px] md:w-[380px] flex flex-col gap-3 border border-white/5 bg-black/40 p-4">
                                    <div className="aspect-[16/9] bg-white/5" />
                                    <div className="h-4 bg-white/5 w-3/4" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="w-full flex justify-center items-center py-16 border border-white/10 bg-black/60 text-xs font-mono text-white/50 uppercase tracking-widest">
                        No videos available right now
                    </div>
                ) : (
                    <div className="w-full flex overflow-hidden relative group py-4 z-10">
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                        <motion.div
                            key={videos.length}
                            className="flex gap-4 md:gap-6 px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: Math.max(duplicated.length * 3.5, 12), ease: "linear", repeat: Infinity }}
                        >
                            {duplicated.map((video, idx) => (
                                <a
                                    key={idx}
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 w-[280px] md:w-[380px] flex flex-col gap-3 border border-white/10 bg-black/60 p-4 hover:border-red-600 transition-colors group/card"
                                >
                                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <h3 className="text-xs md:text-sm font-heading font-black uppercase leading-tight group-hover/card:text-red-500 transition-colors line-clamp-2">
                                        <ScrambleText text={video.title} triggerOnView speed={0.14} className="text-current" />
                                    </h3>
                                    <div className="text-[10px] font-mono text-red-500 uppercase mt-auto tracking-widest flex items-center justify-between">
                                        <ScrambleText text="Watch on YouTube" triggerOnView speed={0.2} className="text-current" />
                                        <span>↗</span>
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                )}

                <div className="w-full px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 max-w-5xl mx-auto">
                    {links.map((link, i) => {
                        const Icon = socialIcons[link.name] || ExternalLink;
                        return (
                            <motion.a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group relative p-8 border border-white/10 bg-neutral-950/60 backdrop-blur-md rounded-2xl overflow-hidden hover:border-red-500 transition-all duration-300 flex flex-col items-center text-center gap-4 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] group/btn"
                            >
                                {/* Futuristic corner decorations */}
                                <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-red-500 transition-colors" />
                                <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/30 group-hover:border-red-500 transition-colors" />
                                <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/30 group-hover:border-red-500 transition-colors" />
                                <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-red-500 transition-colors" />
                                
                                {/* Background scanline effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none" />

                                {/* Social Icon with animated ring */}
                                <div className="relative w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 group-hover:text-red-500 group-hover:border-red-500/50 group-hover:scale-110 transition-all duration-300">
                                    <Icon size={20} />
                                    <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-red-500/20 group-hover:animate-ping opacity-60" />
                                </div>

                                <div className="flex flex-col gap-1 z-10">
                                    <h3 className="font-heading uppercase tracking-[0.2em] text-lg font-black text-white group-hover:text-red-500 transition-colors">
                                        {link.name}
                                    </h3>
                                    <p className="font-mono text-[9px] opacity-50 uppercase tracking-widest text-white/70 group-hover:opacity-80 transition-opacity">
                                        {link.desc}
                                    </p>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContentCreationSection;

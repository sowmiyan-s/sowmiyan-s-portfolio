import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchChannelVideos, YouTubeVideo } from '@/lib/youtube';
import ScrambleText from './ScrambleText';

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
                    {links.map((link, i) => (
                        <motion.a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative p-6 border border-white/10 bg-black/60 hover:border-red-600/60 transition-colors flex flex-col items-center text-center gap-2"
                        >
                            <h3 className="font-heading uppercase tracking-[0.2em] text-lg group-hover:text-red-500 transition-colors">{link.name}</h3>
                            <p className="font-mono text-[10px] opacity-70 uppercase tracking-wider">{link.desc}</p>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContentCreationSection;

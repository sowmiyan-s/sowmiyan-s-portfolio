import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchChannelVideos, YouTubeVideo, fallbackVideos } from '@/lib/youtube';

const ContentCreationSection = () => {
    const links = [
        { name: "Instagram", url: "https://instagram.com/sowmiyan.s_", desc: "Visual Intel // Studio Logs", tag: "VIS-LOG-01" },
        { name: "YouTube", url: "https://youtube.com/@sowmiyan_s_", desc: "Tech Content // Vlogs", tag: "VID-STRM-02" },
        { name: "LinkedIn", url: "https://linkedin.com/in/sowmiyan-s", desc: "Professional Network // AI Sync", tag: "NET-PRO-03" }
    ];

    const [videos, setVideos] = useState<YouTubeVideo[]>(fallbackVideos);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVideos = async () => {
            try {
                console.log("ContentCreationSection: Calling fetchChannelVideos...");
                const fetched = await fetchChannelVideos();
                console.log("ContentCreationSection: Fetched videos:", fetched);
                
                // Apply localStorage visibility filters
                const savedHidden = localStorage.getItem('hiddenYouTubeVideos');
                const hiddenIds: string[] = savedHidden ? JSON.parse(savedHidden) : [];
                console.log("ContentCreationSection: Hidden video IDs in localStorage:", hiddenIds);
                
                const visible = fetched.filter(video => !video.id || !hiddenIds.includes(video.id));
                console.log("ContentCreationSection: Visible videos after filtering:", visible);
                
                if (visible.length > 0) {
                    setVideos(visible);
                } else {
                    console.log("ContentCreationSection: No visible fetched videos, using fallback visible videos.");
                    const fallbackVisible = fallbackVideos.filter(video => !video.id || !hiddenIds.includes(video.id));
                    setVideos(fallbackVisible);
                }
            } catch (err) {
                console.error("ContentCreationSection: Failed to load YouTube videos:", err);
            } finally {
                setLoading(false);
            }
        };
        loadVideos();
    }, []);

    const duplicatedVideos = [...videos, ...videos, ...videos];

    return (
        <section className="relative py-20 bg-transparent z-10 overflow-hidden w-full">
            <div className="flex flex-col gap-16 items-center w-full">
                <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-6 items-center text-center relative z-10">
                    <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                        Bound By <span className="text-red-700">Code</span>
                      </h2>
                    
                    <p className="font-mono text-sm leading-relaxed text-white/95 max-w-2xl text-center bg-black/65 backdrop-blur-[3px] p-6 border border-white/5">
                        Documenting the evolution of intelligent systems and sharing tactical insights into software engineering. Join the ecosystem via established operational channels.
                    </p>
                </div>
                
                {/* Video Slideshow (Horizontal marquee loop similar to medium articles) */}
                {loading ? (
                    <div className="w-full flex overflow-hidden relative py-4 z-10 justify-center">
                        <div className="flex gap-4 md:gap-6 px-4 animate-pulse">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="flex-shrink-0 w-[280px] md:w-[380px] flex flex-col gap-4 border border-white/5 bg-black/40 p-4">
                                    <div className="aspect-[16/9] w-full bg-white/5 border border-white/10" />
                                    <div className="h-4 bg-white/5 rounded w-3/4" />
                                    <div className="h-3 bg-white/5 rounded w-1/2 mt-auto animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="w-full flex justify-center items-center py-16 border border-white/5 bg-black/60 backdrop-blur-md text-xs font-mono text-white/50 uppercase tracking-widest z-10">
                        [ NO_ACTIVE_TRANSMISSIONS ]
                    </div>
                ) : (
                    <div className="w-full flex overflow-hidden relative group py-4 z-10">
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none" />
                        
                        <motion.div 
                            key={videos.length}
                            className="flex gap-4 md:gap-6 px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: Math.max(duplicatedVideos.length * 3.5, 10), ease: "linear", repeat: Infinity }}
                            whileHover={{ animationPlayState: "paused" }}
                        >
                            {duplicatedVideos.map((video, idx) => (
                                <a 
                                    key={idx}
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 w-[280px] md:w-[380px] flex flex-col gap-4 border border-white/5 bg-black/60 backdrop-blur-md p-4 hover:border-red-600 hover:bg-black/80 transition-colors group/card cursor-pointer"
                                >
                                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10">
                                        <img 
                                            src={video.thumbnail} 
                                            alt={video.title} 
                                            className="w-full h-full object-cover opacity-100 group-hover/card:scale-105 transition-all duration-700"
                                        />
                                        {/* Category Badge */}
                                        <div className="absolute top-2 left-2 text-[8px] font-mono text-white bg-red-600 px-2 py-0.5 uppercase tracking-widest z-10">
                                            {video.category}
                                        </div>
                                        {/* Duration Badge */}
                                        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white bg-black/70 px-1.5 py-0.5 border border-white/10 z-10">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-grow mt-1 text-left w-full">
                                        <h3 className="text-xs md:text-sm font-heading font-black uppercase leading-[1.3] group-hover/card:text-red-500 transition-colors line-clamp-2">
                                            {video.title}
                                        </h3>
                                    </div>
                                    <div className="text-[9px] font-mono text-red-600 uppercase mt-auto tracking-widest bg-red-600/10 px-3 py-1.5 flex items-center justify-between border border-red-600/20 group-hover/card:bg-red-600 group-hover/card:text-white transition-all">
                                       <span>WATCH_TRANSMISSION</span>
                                       <span>↗</span>
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                )}


                <div className="w-full px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 max-w-6xl justify-center mx-auto">
                    {links.map((link, i) => (
                        <motion.a 
                            key={i}
                            href={link.url}
                            target="_blank"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative p-8 border border-white/5 bg-black/60 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-red-600/50 hover:bg-black/80 flex flex-col items-center text-center"
                        >
                            {/* Card Decorative Elements */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-red-600 transition-colors" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-red-600 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-red-600 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-red-600 transition-colors" />
                            
                            {/* Scanning Line Animation */}
                            <div className="absolute -left-full top-0 w-full h-[1px] bg-red-600/20 group-hover:animate-scan" />
                            
                            <div className="relative z-10 flex flex-col gap-4 items-center w-full">
                                <div className="flex justify-center items-center w-full relative">
                                    <div className="absolute right-0 text-white/20 group-hover:text-red-600 transition-all transform group-hover:rotate-45">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <h3 className="font-heading uppercase tracking-[0.2em] text-xl group-hover:text-red-500 transition-colors leading-tight">{link.name}</h3>
                                    <p className="font-mono text-[10px] opacity-80 uppercase tracking-wider">{link.desc}</p>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
            
            <style>{`
                @keyframes scan {
                    from { transform: translateX(0); top: 0; }
                    to { transform: translateX(200%); top: 100%; }
                }
                .animate-scan {
                    animation: scan 1.5s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default ContentCreationSection;

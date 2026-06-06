import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMediumPosts, MediumPost } from '@/lib/medium';
import RadarLoader from './RadarLoader';
import ScrambleText from './ScrambleText';

const BlogSection = () => {
    const [posts, setPosts] = useState<MediumPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchMediumPosts();
            setPosts(data.length > 0 ? data : []);
            setLoading(false);
        };
        load();
    }, []);

    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    if (loading) return (
        <div className="py-40 flex flex-col items-center justify-center gap-12 bg-black border-y border-white/5">
            <RadarLoader />
            <p className="font-mono text-[10px] uppercase tracking-[1em] text-red-600 animate-pulse text-center">Interpreting_Global_Feeds</p>
        </div>
    );

    // Duplicate logic for the infinite marquee
    // Create an array large enough to cover the screen seamlessly
    const duplicatedPosts = posts.length > 0 ? [...posts, ...posts, ...posts, ...posts] : [];

    return (
        <section id="blog" className="relative py-32 bg-transparent border-y border-white/10 z-10 overflow-hidden">
            <div className="w-full flex flex-col gap-16">
                <div className="px-6 flex justify-center border-b border-white/20 pb-8 text-center max-w-7xl mx-auto w-full">
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter mx-auto flex">
                            <ScrambleText text="My Articles" speed={0.5} delay={0.2} />
                        </h2>
                    </div>
                </div>

                <div className="flex w-full overflow-hidden relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    
                    {posts.length > 0 ? (
                        <motion.div 
                            key={posts.length}
                            className="flex gap-4 md:gap-8 px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: duplicatedPosts.length * 3, ease: "linear", repeat: Infinity }}
                        >
                            {duplicatedPosts.map((post, i) => (
                                <a 
                                    key={i}
                                    href={post.link}
                                    target="_blank"
                                    className="flex-shrink-0 w-[280px] md:w-[400px] flex flex-col gap-4 border border-white/10 p-4 bg-white/5 hover:border-red-600 hover:bg-black transition-colors group cursor-pointer"
                                >
                                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/5">
                                        <img 
                                            src={post.thumbnail} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute top-2 left-2 text-[8px] font-mono text-white bg-red-600 px-2 py-0.5 uppercase tracking-widest">
                                            {post.categories[0] || 'ARTICLE'}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-grow mt-2">
                                        <h3 className="text-sm font-heading font-black uppercase leading-[1.2] group-hover:text-red-500 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-[10px] font-mono opacity-100 text-white/95 leading-relaxed line-clamp-2 mt-1">
                                            {stripHtml(post.description)}
                                        </p>
                                    </div>
                                    <div className="text-[9px] font-mono text-red-600 uppercase mt-auto tracking-widest bg-red-600/10 px-2 py-1 flex items-center justify-between border border-red-600/20">
                                       <span>READ_TRANSCRIPT</span>
                                       <span>↗</span>
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="w-full text-center py-12 font-mono opacity-20 uppercase tracking-widest">
                            No external transmission detected.
                        </div>
                    )}
                </div>

                <div className="flex justify-center pt-8 px-6">
                    <a 
                        href="https://medium.com/@sowmiyan_s_" 
                        target="_blank" 
                        className="px-12 py-4 border-2 border-red-600 text-xs font-mono font-bold uppercase tracking-[0.2em] bg-red-600/10 hover:bg-red-600 hover:text-white transition-all text-red-500 group flex gap-3 items-center"
                    >
                        <span>Access Medium Profile</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;

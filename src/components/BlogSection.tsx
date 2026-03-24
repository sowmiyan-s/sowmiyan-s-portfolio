import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMediumPosts, MediumPost } from '@/lib/medium';

const BlogSection = () => {
    const [posts, setPosts] = useState<MediumPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchMediumPosts();
            setPosts(data.slice(0, 3)); // Display top 3 real posts
            setLoading(false);
        };
        load();
    }, []);

    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    if (loading) return (
        <div className="py-24 text-center font-mono text-red-600 opacity-40 uppercase animate-pulse">
            [ SYNCING_EXTERNAL_KNOWLEDGE_FEED... ]
        </div>
    );

    return (
        <section id="blog" className="relative py-32 px-6 dot-bg-dense border-t border-white/10 z-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                <div className="flex justify-between items-end border-b border-white/20 pb-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] opacity-40 font-mono tracking-[0.5em]">05 // KNOWLEDGE TRANSFER</span>
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter">LATEST INTEL</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {posts.map((post, i) => (
                        <motion.a 
                            key={i}
                            href={post.link}
                            target="_blank"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6 group cursor-pointer"
                        >
                            <div className="relative aspect-[16/9] bg-white/5 border border-white/10 overflow-hidden">
                                <img 
                                    src={post.thumbnail} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-4 left-4 text-[9px] font-mono text-white bg-red-600 px-3 py-1 uppercase font-bold tracking-widest">
                                    {post.categories[0] || 'DATA'}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
                                    {new Date(post.pubDate).toLocaleDateString()} // ORIGIN: MEDIUM
                                </span>
                                <h3 className="text-xl font-heading font-black uppercase leading-[1.1] group-hover:text-red-600 transition-colors tracking-tight">
                                    {post.title}
                                </h3>
                                <p className="text-xs font-mono opacity-40 leading-relaxed line-clamp-3">
                                    {stripHtml(post.description)}
                                </p>
                            </div>
                            <div className="w-12 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-red-600 transition-all duration-500" />
                        </motion.a>
                    ))}
                    {posts.length === 0 && (
                        <div className="col-span-3 py-12 text-center font-mono opacity-20 uppercase tracking-widest italic">
                            No external transmission detected.
                        </div>
                    )}
                </div>

                <div className="flex justify-center pt-8">
                    <a 
                        href="https://medium.com/@sowmiyan_s_" 
                        target="_blank" 
                        className="px-12 py-4 border border-white/10 text-xs font-heading font-black uppercase tracking-[0.3em] hover:border-red-600 hover:text-red-600 transition-all group overflow-hidden relative"
                    >
                        <span className="relative z-10">Expand Intelligence Matrix</span>
                        <div className="absolute inset-0 bg-red-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;

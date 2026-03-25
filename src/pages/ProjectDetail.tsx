import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchReadme } from '@/lib/github';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import TechNav from '@/components/TechNav';

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [readme, setReadme] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (id) {
                const data = await fetchReadme(id);
                setReadme(data);
                setLoading(false);
            }
        };
        load();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center font-mono text-stone-500 uppercase tracking-widest animate-pulse">
            [ SYNCING PROJECT DATA... ]
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-6 pt-32 grid-bg pb-24">
            <TechNav />
            
            <div className="max-w-4xl mx-auto relative z-10">
                <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-mono text-red-600 mb-12 hover:tracking-widest transition-all uppercase tracking-widest">
                    <span>←</span> Back to Origin
                </Link>

                <div className="mb-8 flex flex-col gap-2">
                    <span className="text-[10px] opacity-40 font-mono tracking-[0.5em] uppercase">Transmission Log // Source: GitHub</span>
                    <h1 className="text-4xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter shrink-0">{id?.replace(/-/g, ' ')}</h1>
                </div>

                <article className="prose prose-invert prose-red max-w-none bg-black/40 p-8 md:p-12 border border-white/5 tech-border mb-12 overflow-hidden">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
                </article>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-t border-white/10">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Repository Identification</span>
                        <span className="text-xs font-heading font-bold uppercase tracking-widest">{id} @ ORIGIN/STABLE</span>
                    </div>
                    
                    <a 
                        href={`https://github.com/sowmiyan-s/${id}`} 
                        target="_blank" 
                        className="px-12 py-5 bg-red-600/90 text-white text-xs font-heading font-black uppercase tracking-[0.3em] hover:bg-white hover:text-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transform hover:-translate-y-1"
                    >
                        Open Project in GitHub
                    </a>
                </div>

                <div className="mt-12 flex justify-between items-center text-[10px] font-mono opacity-20">
                    <span>SOURCE ID: {id?.toUpperCase()}</span>
                    <span>© Archive Record 2026 // ALL RIGHTS RESERVED</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;

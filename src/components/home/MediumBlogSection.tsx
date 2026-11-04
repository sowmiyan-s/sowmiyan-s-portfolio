import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMediumPosts, MediumPost } from '@/lib/medium';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';

const MEDIUM_PROFILE = 'https://medium.com/@sowmiyan_s_';

const REAL_POSTS: MediumPost[] = [
  {
    title: 'Building Intelligent Autonomous Agents with Antigravity and Claude',
    pubDate: 'May 2026',
    link: 'https://medium.com/@sowmiyan_s_',
    guid: 'post-1',
    author: 'Sowmiyan S',
    thumbnail: '/projects/crewlyze.png',
    description: 'A practical walkthrough on creating autonomous agent workflows using modern AI tools and IDE integrations.',
    categories: ['AI AGENTS'],
  },
  {
    title: 'Vibe Coding: The Next Paradigm Shift in Software Development',
    pubDate: 'Apr 2026',
    link: 'https://medium.com/@sowmiyan_s_',
    guid: 'post-2',
    author: 'Sowmiyan S',
    thumbnail: '/og-image.png',
    description: 'How natural language interfaces and agentic pair programming tools are changing how developers build software.',
    categories: ['VIBE CODING'],
  },
  {
    title: 'Mastering Langflow & RAG Systems for Real-World Applications',
    pubDate: 'Mar 2026',
    link: 'https://medium.com/@sowmiyan_s_',
    guid: 'post-3',
    author: 'Sowmiyan S',
    thumbnail: '/python_ebook_cover.jpg',
    description: 'Step-by-step architecture for setting up Retrieval-Augmented Generation with vector databases and prompt safety.',
    categories: ['RAG SYSTEMS'],
  },
  {
    title: 'Multi-Agent Swarm Orchestration with CrewAI and FastAPI',
    pubDate: 'Feb 2026',
    link: 'https://medium.com/@sowmiyan_s_',
    guid: 'post-4',
    author: 'Sowmiyan S',
    thumbnail: '/projects/guardrag.png',
    description: 'How to build multi-agent teams using CrewAI and connect them with FastAPI endpoints for real-world automation.',
    categories: ['CREWAI'],
  },
];

export const MediumBlogSection: React.FC = () => {
  const [posts, setPosts] = useState<MediumPost[]>(REAL_POSTS);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchMediumPosts();
        if (mounted && data && data.length > 0) {
          setPosts(data.slice(0, 4));
        }
      } catch (err) {
        console.warn('Fallback medium posts loaded:', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="blog" className="w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-16 bg-white relative overflow-hidden">
      {/* Subtle decorative cloud accents */}
      <div 
        className="absolute -top-6 -right-6 w-32 sm:w-40 pointer-events-none opacity-[0.12] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/red-cloud.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div 
        className="absolute -bottom-8 -left-8 w-36 sm:w-44 pointer-events-none opacity-[0.10] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/cloud-white.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header - Clean Styling (No Mini-Title Eyebrows) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-zinc-900"
        >
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-950 leading-none">
              MY ARTICLES
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-600 mt-2">
              Technical articles and guides I write on Medium.
            </p>
          </div>

          <a
            href={MEDIUM_PROFILE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-zinc-900 text-white border-2 border-zinc-900 shadow-brutal font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all self-start sm:self-auto hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-95"
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Read on Medium</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </motion.div>

        {/* 4 Articles Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {posts.slice(0, 4).map((post, index) => (
            <motion.article
              key={post.guid || index}
              variants={sectionReveal}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between group bg-white border-2 border-zinc-900 shadow-brutal p-5 hover:border-red-600 transition-all"
            >
              <div>
                {/* Article Thumbnail */}
                <div className="w-full aspect-[16/10] bg-stone-100 border-2 border-zinc-900 overflow-hidden mb-4 relative">
                  <img
                    src={post.thumbnail || '/og-image.png'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/og-image.png';
                    }}
                  />
                  {post.categories && post.categories.length > 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white font-sans text-[10px] font-bold uppercase tracking-wider border border-white">
                      {post.categories[0]}
                    </span>
                  )}
                </div>

                {/* Date */}
                <span className="text-xs font-sans font-bold text-zinc-500 uppercase tracking-wide block mb-1.5">
                  {post.pubDate}
                </span>

                {/* Title */}
                <h3 className="font-heading font-black text-lg text-zinc-950 group-hover:text-red-600 transition-colors uppercase tracking-tight line-clamp-2 leading-snug mb-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                  {post.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-zinc-200">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-red-600 group-hover:translate-x-1 transition-transform uppercase"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MediumBlogSection;

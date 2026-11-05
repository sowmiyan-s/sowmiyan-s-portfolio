import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMediumPosts, MediumPost } from '@/lib/medium';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';
import { FloatingCornerCloud } from '@/components/common/FloatingCornerCloud';

const MEDIUM_PROFILE = 'https://medium.com/@sowmiyan_s_';

const REAL_POSTS: MediumPost[] = [
  {
    title: 'The AI That Plans, Acts, and Learns — Without You Clicking a Button',
    pubDate: 'Sep 16, 2026',
    link: 'https://blog.venturemagazine.net/the-ai-that-plans-acts-and-learns-without-you-clicking-a-button-a055fae796c0',
    guid: 'post-1',
    author: 'Sowmiyan S',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*wf8w2FYyYl89tyTnQ7kJdA.png',
    description: 'Demystifying agentic AI from first principles. Exploring ReAct loops, multi-agent architecture, memory tiers, and autonomous task execution.',
    categories: ['AI AGENTS', 'LLM'],
  },
  {
    title: 'Hermes Agent: The AI That Doesn’t Just Chat — It Thinks, Learns, and Takes Action',
    pubDate: 'Jul 27, 2026',
    link: 'https://blog.venturemagazine.net/hermes-agent-the-ai-that-doesnt-just-chat-it-thinks-learns-and-takes-action-ebf00a425a5e',
    guid: 'post-2',
    author: 'Sowmiyan S',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*sIhYQcA074Fftr4pLt9rkw.png',
    description: 'How Hermes Agent is redefining AI assistants with persistent memory, autonomous reasoning, tool invocation, and real-world execution.',
    categories: ['LLM', 'AI TOOLS'],
  },
  {
    title: 'The Top 10 LLM Models (May 2026)',
    pubDate: 'May 8, 2026',
    link: 'https://blog.venturemagazine.net/the-top-10-llm-models-may-2026-e811735d2ae9',
    guid: 'post-3',
    author: 'Sowmiyan S',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*WOp4Jm3cf9Em8wW1Pu82jw.png',
    description: 'An in-depth breakdown of the leading frontier foundation models, specialized reasoning architectures, and practical benchmarking across real codebases.',
    categories: ['LLM', 'AI BENCHMARKS'],
  },
  {
    title: 'From Prompt to Production: Building a Website without Credit Limits using AI, GitHub, and Netlify',
    pubDate: 'Mar 16, 2026',
    link: 'https://blog.venturemagazine.net/from-prompt-to-production-building-a-website-without-credit-limits-using-ai-github-and-netlify-0b7dbc8f7638',
    guid: 'post-4',
    author: 'Sowmiyan S',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*J8uvF8Lz2teItJqNl53RDw.png',
    description: 'Complete engineering workflow on scaffolding, building, and deploying production web applications using natural language vibe coding, GitHub, and Netlify.',
    categories: ['VIBE CODING', 'DEPLOYMENT'],
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
      {/* Floating Corner Clouds (Drifting Flight Animation) */}
      <FloatingCornerCloud
        position="top-right"
        variant="red"
        duration={8}
        sizeClass="w-32 sm:w-44"
      />
      <FloatingCornerCloud
        position="bottom-left"
        variant="white"
        duration={9}
        sizeClass="w-36 sm:w-52"
      />

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

        {/* 4 Articles Grid (Optimized 2-Cols on Mobile, 4-Cols on Desktop) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6"
        >
          {posts.slice(0, 4).map((post, index) => (
            <motion.article
              key={post.guid || index}
              variants={sectionReveal}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between group bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181B] sm:shadow-brutal p-2.5 sm:p-5 hover:border-red-600 transition-all"
            >
              <div>
                {/* Article Thumbnail */}
                <div className="w-full aspect-[16/10] bg-stone-100 border border-zinc-900 sm:border-2 overflow-hidden mb-2 sm:mb-4 relative">
                  <img
                    src={post.thumbnail || '/og-image.png'}
                    alt={post.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/og-image.png';
                    }}
                  />
                  {post.categories && post.categories.length > 0 && (
                    <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2 py-0.5 bg-red-600 text-white font-sans text-[8px] sm:text-[10px] font-bold uppercase tracking-wider border border-white">
                      {post.categories[0]}
                    </span>
                  )}
                </div>

                {/* Date */}
                <span className="text-[10px] sm:text-xs font-sans font-bold text-zinc-500 uppercase tracking-wide block mb-1 sm:mb-1.5">
                  {post.pubDate}
                </span>

                {/* Title */}
                <h3 className="font-heading font-black text-xs sm:text-lg text-zinc-950 group-hover:text-red-600 transition-colors uppercase tracking-tight line-clamp-2 leading-snug mb-1 sm:mb-2">
                  {post.title}
                </h3>

                {/* Description (Visible on larger screens, compact on mobile) */}
                <p className="hidden sm:block font-sans text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                  {post.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2 sm:pt-3 border-t border-zinc-200">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-sans font-bold text-red-600 group-hover:translate-x-1 transition-transform uppercase"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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

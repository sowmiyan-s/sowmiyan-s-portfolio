import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchChannelVideos, fallbackVideos, YouTubeVideo } from '@/lib/youtube';
import { Youtube, Instagram, Play, ArrowUpRight } from 'lucide-react';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';

const YOUTUBE_URL = 'https://youtube.com/@bound-by-code';
const INSTAGRAM_URL = 'https://instagram.com/sowmiyan.s_';

export const BoundByCodeSection: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>(fallbackVideos.slice(0, 4));

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const fetched = await fetchChannelVideos();
        if (mounted && fetched && fetched.length > 0) {
          setVideos(fetched.slice(0, 4));
        }
      } catch (err) {
        console.warn('Fallback YouTube videos loaded:', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section 
      id="channel" 
      className="w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-16 bg-[#06030c] text-white border-y-2 border-purple-950 relative overflow-hidden"
    >
      {/* Ambient Violet & Dark Lighting Effects */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-purple-700/12 rounded-full blur-[180px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Decorative Dragon & Cloud in Section Background */}
      <div 
        className="absolute -top-10 -right-10 w-72 sm:w-96 pointer-events-none opacity-[0.05] invert select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/dragon.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div 
        className="absolute -bottom-10 -left-10 w-44 pointer-events-none opacity-[0.08] invert select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/cloud-white.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Section Header: Clean Branding + Direct Social Action Buttons (No Mini-Title Badges) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b-2 border-purple-900/50"
        >
          {/* Logo & Channel Identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-purple-500 rounded-xl p-1.5 shadow-[4px_4px_0px_#9333EA] shrink-0 overflow-hidden group hover:scale-105 transition-transform">
              <img
                src="/images/boundbycode-logo.jpg"
                alt="Bound By Code Channel Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                BOUND <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-200">BY CODE</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-purple-200/80 mt-2 max-w-xl leading-relaxed">
                In-depth tutorials on Autonomous AI Agents, Claude Skills, local LLMs, and high-velocity vibe coding workflows.
              </p>
            </div>
          </div>

          {/* Social Action Buttons: View on YouTube & Instagram */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-white shadow-[3px_3px_0px_#ffffff] transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
            >
              <Youtube className="w-4 h-4 fill-white shrink-0" />
              <span>View on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-purple-500 shadow-[3px_3px_0px_#9333EA] transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
            >
              <Instagram className="w-4 h-4 text-fuchsia-400 shrink-0" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </motion.div>

        {/* 4 Cards in Single Row Grid (Compact 4-Block Layout) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {videos.slice(0, 4).map((video, idx) => (
            <motion.a
              key={video.id || idx}
              href={video.url}
              target="_blank"
              rel="noreferrer"
              variants={sectionReveal}
              whileHover={{ y: -4 }}
              className="bg-[#0e071c] border-2 border-purple-900/60 hover:border-purple-400 shadow-[4px_4px_0px_#1e0c38] hover:shadow-[4px_4px_0px_#9333EA] p-3 sm:p-4 group transition-all flex flex-col justify-between"
            >
              <div>
                {/* 16:9 Thumbnail with Overlay */}
                <div className="w-full aspect-[16/9] border border-purple-900/70 relative overflow-hidden mb-3 bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play Button Overlay with Violet Theme */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 border-2 border-white flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  <span className="absolute top-2 left-2 bg-purple-950/90 text-purple-200 border border-purple-500/60 font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {video.category || 'TUTORIAL'}
                  </span>
                </div>

                {/* Compact Title */}
                <h3 className="font-heading font-black text-sm sm:text-base text-white group-hover:text-fuchsia-300 uppercase tracking-tight line-clamp-2 leading-snug transition-colors mb-2">
                  {video.title}
                </h3>
              </div>

              {/* Action Link Footer */}
              <div className="pt-2.5 mt-2 border-t border-purple-950/80 flex items-center justify-between font-sans text-xs">
                <span className="text-purple-300/70 font-sans text-[11px] font-semibold">Bound By Code</span>
                <span className="text-fuchsia-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Watch Video</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BoundByCodeSection;

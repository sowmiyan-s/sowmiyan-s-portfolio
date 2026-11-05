import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchChannelVideos, fallbackVideos, YouTubeVideo } from '@/lib/youtube';
import { Play, ArrowUpRight, Star } from 'lucide-react';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';

const YOUTUBE_URL = 'https://youtube.com/@bound-by-code';
const INSTAGRAM_URL = 'https://instagram.com/sowmiyan.s_';
const UDEMY_COURSE_URL = 'https://www.udemy.com/course/master-generative-ai-without-the-tech-overload/';

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
      className="w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-16 bg-[#040108] text-white border-y-2 border-purple-950/80 relative overflow-hidden"
    >
      {/* ─── Ambient Violet & Black Lighting Atmosphere ─── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[900px] h-[450px] bg-purple-700/15 rounded-full blur-[180px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 bg-fuchsia-600/12 rounded-full blur-[160px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-900/20 rounded-full blur-[170px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Decorative Dragon & Cloud in Violet Section Background */}
      <div 
        className="absolute -top-12 -right-12 w-80 sm:w-96 pointer-events-none opacity-[0.06] invert select-none filter drop-shadow-[0_0_20px_#9333ea]"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/dragon.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div 
        className="absolute -bottom-10 -left-10 w-48 pointer-events-none opacity-[0.07] invert select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/cloud-white.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-12 sm:gap-14">
        {/* ─── 00. Section Header: Channel Identity ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-purple-900/50"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/60 border-2 border-purple-500/70 rounded-2xl p-1 shadow-[0_0_25px_rgba(168,85,247,0.35)] shrink-0 overflow-hidden group hover:scale-105 transition-transform">
              <img
                src="/images/boundbycode-logo.jpg"
                alt="Bound By Code Channel Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="font-sans text-[11px] font-bold text-purple-300/90 uppercase tracking-widest">
                  AI Education &amp; Engineering
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white leading-none">
                BOUND <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-200">BY CODE</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 font-sans text-xs font-bold uppercase tracking-wider">
              Autonomous AI &amp; LLMs
            </span>
          </div>
        </motion.div>

        {/* ─── 01. YouTube Videos Showcase ─── */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                {/* Official YouTube Red SVG */}
                <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                Latest YouTube Videos
              </h3>
            </div>

            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-bold text-purple-300 hover:text-fuchsia-300 uppercase tracking-wider transition-colors"
            >
              <span>View Channel</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

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
                className="bg-[#0b0517]/90 border border-purple-900/60 hover:border-purple-400/90 shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] p-3 sm:p-3.5 rounded-xl group transition-all flex flex-col justify-between"
              >
                <div>
                  {/* 16:9 Thumbnail with Overlay */}
                  <div className="w-full aspect-[16/9] border border-purple-900/70 rounded-lg relative overflow-hidden mb-3 bg-black">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Play Button Overlay with Violet Theme */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 border border-white/80 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.7)] text-white group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      </div>
                    </div>

                    <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-purple-200 border border-purple-500/50 font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {video.category || 'TUTORIAL'}
                    </span>
                  </div>

                  {/* Video Title */}
                  <h4 className="font-heading font-black text-sm text-white group-hover:text-fuchsia-300 uppercase tracking-tight line-clamp-2 leading-snug transition-colors mb-2">
                    {video.title}
                  </h4>
                </div>

                {/* Card Footer Action */}
                <div className="pt-2.5 mt-2 border-t border-purple-950/80 flex items-center justify-between font-sans text-xs">
                  <span className="text-purple-300/70 font-sans text-[11px] font-semibold">Bound By Code</span>
                  <span className="text-fuchsia-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Watch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ─── 02. Published Udemy Course Showcase ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="w-full bg-gradient-to-br from-[#120726] via-[#1b0a38] to-[#0a0314] border-2 border-purple-500/50 hover:border-purple-400/90 shadow-[0_0_35px_rgba(168,85,247,0.22)] rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group transition-all duration-300"
        >
          {/* Subtle Accent Glow */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content Column */}
            <div className="flex flex-col gap-4 max-w-3xl">
              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-900/60 border border-purple-400/60 rounded-full text-purple-200 text-xs font-bold uppercase tracking-wider">
                  {/* Authentic Udemy SVG */}
                  <svg className="w-4 h-4 fill-current text-[#A435F0]" viewBox="0 0 24 24">
                    <path d="M12 16.5c-3.1 0-5.6-2.5-5.6-5.6V3H2.8v7.9c0 5.1 4.1 9.2 9.2 9.2s9.2-4.1 9.2-9.2V3h-3.6v7.9c0 3.1-2.5 5.6-5.6 5.6zM15.4 0H8.6l3.4 3.4L15.4 0z"/>
                  </svg>
                  <span>Published on Udemy</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span>Masterclass</span>
                </div>
              </div>

              {/* Course Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white uppercase tracking-tight leading-tight">
                Master Generative AI Without the Tech Overload
              </h3>

              {/* Concise Visual Highlight Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3 py-1 bg-black/60 border border-purple-900/80 rounded-md text-xs font-sans font-semibold text-purple-200">
                  ⚡ 100% Practical &amp; No-Code
                </span>
                <span className="px-3 py-1 bg-black/60 border border-purple-900/80 rounded-md text-xs font-sans font-semibold text-purple-200">
                  🤖 Autonomous AI &amp; Multi-Agents
                </span>
                <span className="px-3 py-1 bg-black/60 border border-purple-900/80 rounded-md text-xs font-sans font-semibold text-purple-200">
                  🎯 Prompt Engineering &amp; Workflows
                </span>
                <span className="px-3 py-1 bg-black/60 border border-purple-900/80 rounded-md text-xs font-sans font-semibold text-purple-200">
                  📜 Certificate Included
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-purple-300/80">
                Instructor: <strong className="text-white">Sowmiyan S</strong> · Founder of Bound By Code
              </p>
            </div>

            {/* Right Action CTA Column */}
            <div className="shrink-0 flex items-center">
              <a
                href={UDEMY_COURSE_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-sans text-sm sm:text-base font-bold uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(192,132,252,0.45)] hover:shadow-[0_0_40px_rgba(192,132,252,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                {/* Udemy Logo */}
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 16.5c-3.1 0-5.6-2.5-5.6-5.6V3H2.8v7.9c0 5.1 4.1 9.2 9.2 9.2s9.2-4.1 9.2-9.2V3h-3.6v7.9c0 3.1-2.5 5.6-5.6 5.6zM15.4 0H8.6l3.4 3.4L15.4 0z"/>
                </svg>
                <span>View Course on Udemy</span>
                <ArrowUpRight className="w-5 h-5 shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ─── 03. Social Media Links: YouTube & Instagram ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full"
        >
          {/* YouTube Channel Link */}
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-[#0c0517]/90 hover:bg-[#130726] border border-purple-900/60 hover:border-red-500/80 rounded-xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_0_35px_rgba(239,68,68,0.25)] transition-all duration-300 group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-500/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {/* Authentic YouTube SVG */}
                <svg className="w-6 h-6 fill-current text-red-500" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>

              <div>
                <span className="font-sans text-[11px] font-bold text-red-400 uppercase tracking-widest block">
                  YouTube Channel
                </span>
                <span className="font-heading font-black text-lg sm:text-xl text-white group-hover:text-red-300 transition-colors uppercase">
                  @bound-by-code
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-sans text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:translate-x-0.5 transition-all">
              <span>Subscribe</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </div>
          </a>

          {/* Instagram Profile Link */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-[#0c0517]/90 hover:bg-[#130726] border border-purple-900/60 hover:border-fuchsia-500/80 rounded-xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_0_35px_rgba(217,70,239,0.25)] transition-all duration-300 group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-600/15 border border-fuchsia-500/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {/* Authentic Instagram Multi-Color Gradient SVG */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="igIconGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    fill="url(#igIconGradient)"
                  />
                </svg>
              </div>

              <div>
                <span className="font-sans text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest block">
                  Instagram Profile
                </span>
                <span className="font-heading font-black text-lg sm:text-xl text-white group-hover:text-fuchsia-300 transition-colors uppercase">
                  @sowmiyan.s_
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-lg font-sans text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(192,132,252,0.4)] group-hover:translate-x-0.5 transition-all">
              <span>Follow</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BoundByCodeSection;

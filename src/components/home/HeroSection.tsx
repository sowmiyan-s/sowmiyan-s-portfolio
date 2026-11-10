import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  FileText, 
  Github,
  Linkedin,
  Youtube,
  Instagram,
  BookOpen,
  Twitter,
  Briefcase,
  GraduationCap,
  MapPin,
  Copy,
  Check
} from 'lucide-react';
import { slideLeft, slideRight } from '@/lib/motionPresets';
import { toast } from '@/hooks/use-toast';

const RESUME_URL = '/resume.pdf';
const EMAIL = 'sowmiyan.s.dev@gmail.com';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  hoverBg: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/sowmiyan-s',
    icon: Github,
    hoverBg: 'hover:bg-zinc-950 hover:text-white',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/sowmiyan-s',
    icon: Linkedin,
    hoverBg: 'hover:bg-[#0A66C2] hover:text-white',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@bound-by-code',
    icon: Youtube,
    hoverBg: 'hover:bg-red-600 hover:text-white',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/sowmiyan.s_',
    icon: Instagram,
    hoverBg: 'hover:bg-rose-600 hover:text-white',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@sowmiyan_s_',
    icon: BookOpen,
    hoverBg: 'hover:bg-black hover:text-white',
  },
  {
    name: 'X',
    url: 'https://x.com/sowmiyan_s',
    icon: Twitter,
    hoverBg: 'hover:bg-zinc-900 hover:text-white',
  },
];

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    toast({
      title: "Email Copied!",
      description: `${EMAIL} copied to clipboard.`,
    });
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-10 lg:px-16 bg-[#FAFAF9] overflow-hidden">
      {/* Background Decorative Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Decorative Golden S-Dragon in Hero Background */}
      <div 
        className="absolute right-0 lg:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.22] lg:opacity-[0.3] w-[340px] sm:w-[480px] lg:w-[580px] z-0"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/golden-dragon.png"
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(217,119,6,0.3)]"
        />
      </div>

      {/* Decorative Japanese Ink Calligraphy Watermark */}
      <div 
        className="absolute left-2 lg:left-8 top-1/3 -translate-y-1/2 pointer-events-none select-none opacity-[0.09] w-[260px] sm:w-[340px] z-0"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/japanese-text.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Name, Title, Bio, Social Links, CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Main Name (Guaranteed in One Line Across All Devices) & Title */}
            <div>
              <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-zinc-950 leading-none mb-3 whitespace-nowrap">
                SOWMIYAN S
              </h1>
              <p className="text-xl sm:text-3xl lg:text-4xl font-heading font-black text-red-600 uppercase tracking-tight leading-tight">
                AI ENGINEER <span className="text-zinc-900 font-light mx-1">/</span> SOFTWARE DEVELOPER
              </p>

              {/* Recruiter-Friendly Fast-Scan Credentials */}
              <div className="flex flex-wrap items-center gap-2 pt-3 font-sans text-xs sm:text-sm font-bold text-zinc-800">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-zinc-900 shadow-brutal-xs">
                  <GraduationCap className="w-4 h-4 text-red-600 shrink-0" />
                  <span>B.Tech AI &amp; Data Science · VSB College of Engineering</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 border-2 border-zinc-900 text-zinc-700 shadow-brutal-xs">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Tamil Nadu, India · Open to Relocate</span>
                </span>
              </div>
            </div>

            {/* Clear, Engaging Bio */}
            <p className="text-base sm:text-lg text-zinc-700 font-sans leading-relaxed max-w-2xl">
              I build practical AI applications, full-stack software, and open-source tools. I also create tech videos on <a href="https://youtube.com/@bound-by-code" target="_blank" rel="noreferrer" className="font-bold text-zinc-950 underline decoration-red-600 decoration-2 hover:text-red-600 transition-colors">Bound By Code</a>, sharing hands-on tutorials on modern software engineering.
            </p>

            {/* Social Media Dock */}
            <div className="pt-1 w-full">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white text-zinc-900 border-2 border-zinc-900 shadow-brutal-sm ${social.hoverBg} transition-all duration-200 active:scale-95 group`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                      <span className="font-sans text-xs font-bold uppercase tracking-wide">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Clean Neo-Brutalist CTAs */}
            <div className="pt-2 w-full">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 bg-red-600 hover:bg-red-700 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95 text-center"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </a>

                <a
                  href="#hire-me"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95 text-center"
                >
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
                  <span>Hire Me</span>
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-3.5 bg-white hover:bg-stone-100 text-zinc-900 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-center"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 shrink-0" />
                  <span>Resume (PDF)</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-zinc-500" />
                </a>

                {/* 1-Click Copy Email for Recruiters */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 sm:py-3.5 bg-white hover:bg-stone-100 text-zinc-900 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer active:scale-95 text-center"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                      <span className="text-emerald-700 font-black">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-700 shrink-0" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Attractive Photo Card with Floating Cloud Accents */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideRight}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[370px]">
              
              {/* Floating White Japanese Cloud (Top Left Corner of Frame - Large) */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 -left-10 sm:-top-12 sm:-left-12 z-20 w-36 sm:w-44 lg:w-48 pointer-events-none select-none filter drop-shadow-[3px_4px_0px_rgba(0,0,0,0.85)]"
                aria-hidden="true"
              >
                <img
                  src="/images/decorations/cloud-white.png"
                  alt=""
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Floating White Japanese Cloud (Bottom Right Corner of Frame - Large) */}
              <motion.div 
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -right-10 sm:-bottom-12 sm:-right-12 z-20 w-36 sm:w-44 lg:w-48 pointer-events-none select-none filter drop-shadow-[3px_4px_0px_rgba(0,0,0,0.85)]"
                aria-hidden="true"
              >
                <img
                  src="/images/decorations/cloud-white.png"
                  alt=""
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Offset Red Shadow Backdrop */}
              <div 
                className="absolute inset-0 bg-red-600 border-3 border-zinc-900 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 pointer-events-none" 
              />

              {/* Main Photo Card Frame - Pure & Clean */}
              <div className="relative bg-white border-3 border-zinc-900 p-2.5 sm:p-3 shadow-brutal overflow-hidden">
                <div className="relative w-full aspect-[4/5] bg-stone-100 border-2 border-zinc-900 overflow-hidden group">
                  <img
                    src="/images/sowmiyan.jpg"
                    alt="Sowmiyan S — AI Engineer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

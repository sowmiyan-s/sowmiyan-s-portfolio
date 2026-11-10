import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  ArrowUpRight,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';
import { BrutalistStar } from '@/components/home/ArtworkAccents';
import { toast } from '@/hooks/use-toast';

const EMAIL = 'sowmiyan.s.dev@gmail.com';
const RESUME_URL = '/resume.pdf';
const WHATSAPP_URL = `https://wa.me/919042561295?text=${encodeURIComponent('Hi Sowmiyan, I saw your portfolio and would like to discuss a job opportunity.')}`;

export const HireMeSection: React.FC = () => {
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
    <section
      id="hire-me"
      className="w-full py-12 sm:py-24 px-4 sm:px-10 lg:px-16 bg-black text-white relative overflow-hidden border-t-2 border-zinc-900"
    >
      {/* ─── Background Graphic Accents ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Golden Dragon Watermark in Background */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] pointer-events-none opacity-[0.18] select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/golden-dragon.png"
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(217,119,6,0.3)]"
        />
      </motion.div>

      {/* Brush Kanji Watermark — right edge */}
      <div
        className="absolute -right-8 top-8 w-40 sm:w-56 pointer-events-none opacity-[0.07] invert select-none"
        aria-hidden="true"
      >
        <img src="/images/decorations/japanese-text.png" alt="" className="w-full h-auto" />
      </div>

      {/* Decorative Red Cloud on Top Corner */}
      <motion.div
        animate={{ x: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -left-6 w-32 sm:w-44 pointer-events-none opacity-[0.2] select-none z-0"
        aria-hidden="true"
      >
        <img src="/images/decorations/red-cloud.png" alt="" className="w-full h-auto" />
      </motion.div>

      {/* Decorative Inverted White Cloud on Bottom Right (Luminous Flying Cloud Effect) */}
      <motion.div
        animate={{ y: [-10, 10, -10], x: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-8 -right-8 w-36 sm:w-56 pointer-events-none opacity-[0.22] invert select-none z-0 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
        aria-hidden="true"
      >
        <img src="/images/decorations/cloud-white.png" alt="" className="w-full h-auto" />
      </motion.div>

      <div className="w-full max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          {/* Rotating Star Ornaments + Main Heading */}
          <motion.div variants={sectionReveal} className="relative mb-3">
            <div className="absolute -left-16 sm:-left-24 top-1/2 -translate-y-1/2 hidden sm:block">
              <BrutalistStar size={38} color="#DC2626" spin />
            </div>
            <div className="absolute -right-16 sm:-right-24 top-1/2 -translate-y-1/2 hidden sm:block">
              <BrutalistStar size={38} color="#FFFFFF" spin />
            </div>

            <h2 className="text-5xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none drop-shadow-[5px_5px_0px_rgba(220,38,38,0.85)]">
              HIRE ME
            </h2>
          </motion.div>

          <motion.p
            variants={sectionReveal}
            className="text-base sm:text-2xl font-heading font-black text-red-500 uppercase tracking-tight mb-3 sm:mb-4"
          >
            Available All Over India · On-Site, Hybrid &amp; Remote
          </motion.p>

          {/* Clean Description */}
          <motion.p
            variants={sectionReveal}
            className="font-sans text-sm sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8 sm:mb-10"
          >
            AI Systems Engineer &amp; Full-Stack Developer ready to deploy production AI agents, autonomous workflows, and scalable systems. Open to full-time engineering roles anywhere in India with immediate joining.
          </motion.p>

          {/* Direct Actions: Email, Copy Email, Resume, WhatsApp */}
          <motion.div
            variants={sectionReveal}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-3xl"
          >
            {/* Email - Primary Crimson Action */}
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-red-600 hover:bg-red-500 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm border border-red-500 shadow-[0_0_24px_rgba(220,38,38,0.45)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] transition-all duration-200"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-white/80" />
            </motion.a>

            {/* 1-Click Copy Email for ATS & Webmail */}
            <motion.button
              type="button"
              onClick={handleCopyEmail}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm border border-zinc-700 hover:border-zinc-400 shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-200 cursor-pointer active:scale-95"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300 font-black">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>Copy Email</span>
                </>
              )}
            </motion.button>

            {/* Resume - Instant PDF Action */}
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm border border-zinc-700 hover:border-zinc-400 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_24px_rgba(255,255,255,0.18)] transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-red-500 shrink-0" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
            </motion.a>

            {/* WhatsApp - Deep Jade Action */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-[#0d2a20] hover:bg-[#12382c] text-emerald-300 hover:text-emerald-200 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm border border-emerald-500/50 hover:border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] transition-all duration-200"
            >
              <svg className="w-4 h-4 shrink-0 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
              </svg>
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMeSection;

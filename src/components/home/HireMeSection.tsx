import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Copy,
  Check,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import { sectionReveal, staggerContainer, viewportConfig } from '@/lib/motionPresets';
import { BrutalistStar, HankoSeal } from '@/components/home/ArtworkAccents';

const EMAIL = 'sowmisowmiyan58@gmail.com';
const RESUME_URL = 'https://drive.google.com/file/d/1NmangaAFo0eGT-KAsZi4VWOm6zI-KPk6/view?usp=sharing';
const WHATSAPP_URL = `https://wa.me/919042561295?text=${encodeURIComponent('Hi Sowmiyan, I saw your portfolio and would like to discuss a job opportunity.')}`;

export const HireMeSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hire-me"
      className="w-full py-20 sm:py-28 px-4 sm:px-10 lg:px-16 bg-black text-white relative overflow-hidden border-t-2 border-zinc-900"
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

      {/* Decorative Inverted White Cloud on Bottom Right (Luminous on Black Canvas) */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-8 -right-8 w-36 sm:w-48 pointer-events-none opacity-[0.14] invert select-none z-0"
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
          <motion.div variants={sectionReveal} className="relative mb-2">
            <div className="absolute -left-16 sm:-left-24 top-1/2 -translate-y-1/2 hidden sm:block">
              <BrutalistStar size={38} color="#DC2626" spin />
            </div>
            <div className="absolute -right-16 sm:-right-24 top-1/2 -translate-y-1/2 hidden sm:block">
              <BrutalistStar size={38} color="#FFFFFF" spin />
            </div>

            <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none drop-shadow-[5px_5px_0px_rgba(220,38,38,0.85)]">
              HIRE ME
            </h2>
          </motion.div>

          {/* Availability Hanko Stamp */}
          <motion.div variants={sectionReveal} className="mb-5">
            <HankoSeal kanji="求" size={46} className="rotate-3" />
          </motion.div>

          <motion.p
            variants={sectionReveal}
            className="text-lg sm:text-2xl font-heading font-black text-red-500 uppercase tracking-tight mb-4"
          >
            Available All Over India · On-Site, Hybrid &amp; Remote
          </motion.p>

          {/* Clean Description */}
          <motion.p
            variants={sectionReveal}
            className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-10"
          >
            AI Systems Engineer &amp; Full-Stack Developer ready to deploy production AI agents, autonomous workflows, and scalable systems. Open to full-time engineering roles anywhere in India with immediate joining.
          </motion.p>

          {/* Direct Actions: Email, Resume, WhatsApp */}
          <motion.div
            variants={sectionReveal}
            className="flex flex-wrap items-center justify-center gap-4 w-full mb-10"
          >
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-700 text-white border-2 border-white shadow-[4px_4px_0px_#ffffff] font-sans text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Email</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </motion.a>

            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-white hover:bg-zinc-100 text-zinc-950 border-2 border-white shadow-[4px_4px_0px_#DC2626] font-sans text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <FileText className="w-4 h-4 text-red-600 shrink-0" />
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </motion.a>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-white shadow-[4px_4px_0px_#ffffff] font-sans text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </motion.a>
          </motion.div>

          {/* Quick Copy Email helper with Maneki-Neko Mascot */}
          <motion.button
            variants={sectionReveal}
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-950 border-2 border-zinc-700 hover:border-white text-sm text-zinc-300 transition-colors cursor-pointer shadow-[3px_3px_0px_rgba(220,38,38,0.9)]"
          >
            <motion.img
              src="/images/decorations/cat.png"
              alt="Lucky Mascot"
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="w-7 h-7 object-contain inline-block shrink-0"
            />
            <span className="font-sans font-bold tracking-wide text-zinc-200">{EMAIL}</span>
            <span className="text-red-500 border-l border-zinc-700 pl-3 ml-1">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 group-hover:text-white" />}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMeSection;

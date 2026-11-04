import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowUpRight, 
  FileText
} from 'lucide-react';
import { sectionReveal, viewportConfig } from '@/lib/motionPresets';

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
    <section id="hire-me" className="w-full py-20 sm:py-28 px-4 sm:px-10 lg:px-16 bg-black text-white relative overflow-hidden border-t-2 border-zinc-900">
      {/* Background Graphic Accents */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Decorative Golden Dragon Watermark in Background */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] pointer-events-none opacity-[0.10] select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/golden-dragon.png"
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(217,119,6,0.3)]"
        />
      </div>

      {/* Decorative Red Cloud on Top Corner */}
      <div 
        className="absolute -top-6 -left-6 w-32 sm:w-40 pointer-events-none opacity-[0.15] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/red-cloud.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Decorative Inverted White Cloud on Bottom Right (Luminous on Black Canvas) */}
      <div 
        className="absolute -bottom-8 -right-8 w-36 sm:w-48 pointer-events-none opacity-[0.10] invert select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/cloud-white.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col items-center"
        >
          {/* Main Heading (No Mini-Title Eyebrows) */}
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none mb-4">
            HIRE ME
          </h2>

          <p className="text-lg sm:text-2xl font-heading font-black text-red-500 uppercase tracking-tight mb-4">
            Available All Over India · On-Site, Hybrid &amp; Remote
          </p>

          {/* Clean Description */}
          <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-10">
            AI Systems Engineer &amp; Full-Stack Developer ready to deploy production AI agents, autonomous workflows, and scalable systems. Open to full-time engineering roles anywhere in India with immediate joining.
          </p>

          {/* Direct Actions: Email, Resume, WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full mb-8">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-700 text-white border-2 border-white shadow-[4px_4px_0px_#ffffff] font-sans text-sm font-bold uppercase tracking-wider transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Email</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-white hover:bg-zinc-100 text-zinc-950 border-2 border-white shadow-[4px_4px_0px_#DC2626] font-sans text-sm font-bold uppercase tracking-wider transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
            >
              <FileText className="w-4 h-4 text-red-600 shrink-0" />
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-white shadow-[4px_4px_0px_#ffffff] font-sans text-sm font-bold uppercase tracking-wider transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </div>

          {/* Quick Copy Email helper with Maneki-Neko Mascot */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
            <img 
              src="/images/decorations/cat.png" 
              alt="Lucky Mascot" 
              className="w-5 h-5 object-contain inline-block shrink-0" 
            />
            <span className="text-zinc-300">{EMAIL}</span>
            <button
              onClick={handleCopyEmail}
              className="ml-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 inline" /> : <Copy className="w-3.5 h-3.5 inline" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMeSection;

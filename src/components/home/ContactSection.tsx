import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, ArrowUpRight, MessageSquare } from 'lucide-react';
import { sectionReveal, viewportConfig } from '@/lib/motionPresets';

const EMAIL = 'sowmiyan.s.dev@gmail.com';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact-cta" className="w-full py-14 sm:py-28 px-4 sm:px-10 lg:px-16 bg-stone-100 border-t-2 border-zinc-900">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex flex-col items-start gap-4 sm:gap-6 max-w-5xl"
        >
          <span className="font-mono text-xs text-red-600 font-bold uppercase tracking-wider block">
            Get in Touch
          </span>

          {/* Heading */}
          <h2 className="text-4xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight sm:tracking-tighter text-zinc-950 leading-[0.95] sm:leading-[0.88]">
            LET&rsquo;S WORK TOGETHER.
          </h2>

          <p className="text-sm sm:text-xl text-zinc-700 font-sans leading-relaxed max-w-3xl">
            I’m actively looking for full-time AI Engineering &amp; Systems Developer opportunities. I also take on high-impact consulting and agentic architecture projects. Have an idea or role in mind? Reach out directly!
          </p>

          {/* Responsive Action Buttons: 2-col on mobile, flex on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full pt-2">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-3 sm:py-3.5 bg-red-600 hover:bg-zinc-900 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 text-center"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Send Email</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-3.5 bg-white hover:bg-stone-50 text-zinc-900 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 text-center"
            >
              <Phone className="w-4 h-4 text-red-600 shrink-0" />
              <span>Call Me</span>
            </a>

            <a
              href="https://wa.me/919042561295"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-3.5 bg-white hover:bg-stone-50 text-zinc-900 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-3 sm:py-3.5 bg-stone-200 hover:bg-stone-300 text-zinc-900 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider border-2 border-zinc-900 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
              <span>{copied ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>

          <p className="font-sans text-xs sm:text-sm text-zinc-500 pt-2">
            Namakkal, Tamil Nadu, India · Open to Remote &amp; On-Site worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

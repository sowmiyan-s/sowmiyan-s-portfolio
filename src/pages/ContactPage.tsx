import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Send,
  Loader2,
  Mail,
  MessageSquare,
  Briefcase,
  GitPullRequest,
  Building2,
  ArrowDown,
  Copy,
  Check,
} from 'lucide-react';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { FloatingCornerCloud } from '@/components/common/FloatingCornerCloud';
import { toast } from '@/hooks/use-toast';

const EMAIL = "sowmiyan.s.dev@gmail.com";
const WHATSAPP_URL = `https://wa.me/919042561295?text=${encodeURIComponent("Hi Sowmiyan, I saw your portfolio and would like to discuss an opportunity.")}`;

const categories = [
  "Full-Time Role",
  "AI / Software Project",
  "Technical Consulting",
  "General Inquiry",
];

const headerEase = [0.22, 1, 0.36, 1] as const;

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    toast({
      title: "Email Copied!",
      description: `${EMAIL} copied to clipboard.`,
    });
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const formSectionRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const handleSelectCard = (targetCategory: string) => {
    setCategory(targetCategory);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please enter your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      "Sender Name": name.trim(),
      "Sender Email": email.trim(),
      "Inquiry Type": category,
      "Message": message.trim(),
      _subject: `[Portfolio Contact] ${category} from ${name.trim()}`,
      _replyto: email.trim(),
    };

    let delivered = false;

    // Primary: FormSubmit AJAX
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) delivered = true;
    } catch (err) {
      console.warn("FormSubmit notice:", err);
    }

    // Fallback: Web3Forms
    if (!delivered) {
      try {
        const res2 = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: "099a224d-5878-43d9-959c-851532f6a6dc",
            name: name.trim(),
            email: email.trim(),
            subject: `[Portfolio Inquiry] ${category} from ${name.trim()}`,
            message: `Category: ${category}\n\n${message.trim()}`,
          }),
        });
        if (res2.ok) delivered = true;
      } catch (err2) {
        console.warn("Web3Forms notice:", err2);
      }
    }

    setIsSubmitting(false);

    if (delivered) {
      setName('');
      setEmail('');
      setMessage('');
      toast({
        title: "Message Delivered",
        description: "Thank you for reaching out! I will reply directly within 24 hours.",
      });
    } else {
      toast({
        title: "Direct Client Fallback",
        description: "You can reach me directly via Email or WhatsApp below.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden"
    >
      <SEO
        title="Contact Sowmiyan S — AI Engineer & Software Developer"
        description="Get in touch with Sowmiyan S for full-time engineering roles, freelance projects, and open collaborations."
        canonical="https://www.sowmiyan.me/contact"
      />
      <SEOKeywords />

      {/* ─── Decorative Floating Clouds ─── */}
      <FloatingCornerCloud
        position="top-left"
        variant="white"
        duration={9}
        sizeClass="w-36 sm:w-52"
      />
      <motion.div
        style={{ y: cloudY }}
        className="absolute top-24 -right-12 w-48 sm:w-64 pointer-events-none opacity-[0.12] select-none z-0"
        aria-hidden="true"
      >
        <img src="/images/decorations/red-cloud.png" alt="" className="w-full h-auto" />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px] z-0"
        aria-hidden="true"
      />

      <TechNav />

      {/* ─── Full-Bleed Editorial Header ─── */}
      <header className="relative z-10 pt-32 sm:pt-40 w-full border-b-3 border-zinc-900 bg-white overflow-hidden">
        <div className="w-full px-4 sm:px-10 lg:px-16 pb-10 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: headerEase }}
            className="flex flex-col gap-5"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight text-zinc-950 leading-none whitespace-nowrap">
              CONTACT
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: headerEase }}
              className="origin-left h-2 w-40 sm:w-64 bg-red-600 border-2 border-zinc-900"
            />

            <p className="text-base sm:text-xl text-zinc-700 font-sans max-w-3xl leading-relaxed">
              Have a full-time engineering role, freelance project, or open-source idea? Let&apos;s build something exceptional together.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ─── 01. Edge-to-Edge Full-Width Photo Banner (Free, Out of Cards, 0px Margins) ─── */}
      <section className="relative w-full border-b-3 border-zinc-900 overflow-hidden bg-black">
        <div className="w-full h-[260px] sm:h-[380px] md:h-[460px] lg:h-[520px] xl:h-[580px] overflow-hidden">
          <img
            src="/images/contact-banner.jpg"
            alt="Sowmiyan S"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
            className="w-full h-full object-cover object-center filter contrast-[1.04] saturate-[1.02]"
          />
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main className="relative z-10 w-full pt-10 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-10 lg:px-16 flex flex-col gap-10 sm:gap-18">

        {/* ─── 02. Three Action Pathways (Optimized Mobile Layout, Hire Me) ─── */}
        <section className="w-full flex flex-col gap-4 sm:gap-6">
          <div className="pb-3 border-b-2 border-zinc-900">
            <h2 className="text-xl sm:text-3xl font-heading font-black text-zinc-950 uppercase tracking-tight">
              Ways to Collaborate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-8 w-full">
            {/* Card 1: Freelancing Works */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSelectCard("AI / Software Project")}
              className="bg-white border-2 sm:border-3 border-zinc-900 shadow-[3px_3px_0px_#18181B] sm:shadow-[5px_5px_0px_#18181B] hover:shadow-[7px_7px_0px_#DC2626] transition-all p-4 sm:p-8 flex flex-col justify-between gap-3 sm:gap-6 cursor-pointer group"
            >
              <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 border-2 border-zinc-900 text-white flex items-center justify-center shadow-[2px_2px_0px_#18181B] group-hover:scale-105 transition-transform shrink-0">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="flex-1 sm:flex-initial">
                  <h3 className="text-lg sm:text-2xl font-heading font-black text-zinc-950 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    Freelancing Works
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-bold text-red-600 uppercase tracking-wide mt-0.5 sm:mt-1">
                    Custom AI Pipelines &amp; Apps
                  </p>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 border-t-2 border-zinc-100 flex items-center justify-between text-xs font-sans font-black uppercase tracking-wider text-red-600 group-hover:text-zinc-950">
                <span>Discuss Project Scope</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-1" />
              </div>
            </motion.div>

            {/* Card 2: Open Contribution */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSelectCard("General Inquiry")}
              className="bg-white border-2 sm:border-3 border-zinc-900 shadow-[3px_3px_0px_#18181B] sm:shadow-[5px_5px_0px_#18181B] hover:shadow-[7px_7px_0px_#DC2626] transition-all p-4 sm:p-8 flex flex-col justify-between gap-3 sm:gap-6 cursor-pointer group"
            >
              <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-950 border-2 border-zinc-900 text-white flex items-center justify-center shadow-[2px_2px_0px_#18181B] group-hover:scale-105 transition-transform shrink-0">
                  <GitPullRequest className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                </div>

                <div className="flex-1 sm:flex-initial">
                  <h3 className="text-lg sm:text-2xl font-heading font-black text-zinc-950 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    Open Contribution
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-bold text-red-600 uppercase tracking-wide mt-0.5 sm:mt-1">
                    Community Tooling &amp; Tech Talks
                  </p>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 border-t-2 border-zinc-100 flex items-center justify-between text-xs font-sans font-black uppercase tracking-wider text-red-600 group-hover:text-zinc-950">
                <span>Collaborate Together</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-1" />
              </div>
            </motion.div>

            {/* Card 3: Full-Time Jobs */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSelectCard("Full-Time Role")}
              className="bg-white border-2 sm:border-3 border-zinc-900 shadow-[3px_3px_0px_#18181B] sm:shadow-[5px_5px_0px_#18181B] hover:shadow-[7px_7px_0px_#DC2626] transition-all p-4 sm:p-8 flex flex-col justify-between gap-3 sm:gap-6 cursor-pointer group"
            >
              <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 border-2 border-zinc-900 text-white flex items-center justify-center shadow-[2px_2px_0px_#18181B] group-hover:scale-105 transition-transform shrink-0">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="flex-1 sm:flex-initial">
                  <h3 className="text-lg sm:text-2xl font-heading font-black text-zinc-950 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    Full-Time Jobs
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-bold text-red-600 uppercase tracking-wide mt-0.5 sm:mt-1">
                    AI Engineer &amp; Systems Developer
                  </p>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 border-t-2 border-zinc-100 flex items-center justify-between text-xs font-sans font-black uppercase tracking-wider text-red-600 group-hover:text-zinc-950">
                <span>Hire Me</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-1" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 03. Contact Form (Clean, Non-Terminal Header) ─── */}
        <div ref={formSectionRef} className="w-full scroll-mt-28 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-zinc-950 uppercase tracking-tight">
              Send a Message
            </h2>
            <span className="text-xs sm:text-sm font-sans font-bold text-zinc-600">
              Selected: <strong className="text-zinc-950">{category}</strong>
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, ease: headerEase }}
            className="w-full bg-white border-3 border-zinc-900 shadow-[6px_6px_0px_#18181B] sm:shadow-[8px_8px_0px_#18181B] p-6 sm:p-12"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 w-full">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs sm:text-sm font-sans font-black uppercase tracking-wider text-zinc-900">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-5 py-4 bg-stone-50 border-2 border-zinc-900 focus:outline-none focus:bg-white focus:border-red-600 font-sans text-sm sm:text-base text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-inner"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs sm:text-sm font-sans font-black uppercase tracking-wider text-zinc-900">
                    Your Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-5 py-4 bg-stone-50 border-2 border-zinc-900 focus:outline-none focus:bg-white focus:border-red-600 font-sans text-sm sm:text-base text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* Inquiry Type Selector */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs sm:text-sm font-sans font-black uppercase tracking-wider text-zinc-900">
                  Inquiry Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-3.5 text-xs sm:text-sm font-sans font-black uppercase tracking-wider border-2 border-zinc-900 transition-all text-center cursor-pointer ${
                        category === cat
                          ? 'bg-zinc-950 text-white shadow-[3px_3px_0px_#DC2626] -translate-y-0.5'
                          : 'bg-stone-50 hover:bg-stone-100 text-zinc-800 shadow-[2px_2px_0px_#18181B]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Area */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs sm:text-sm font-sans font-black uppercase tracking-wider text-zinc-900">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your team, role requirements, or project vision..."
                  className="w-full px-5 py-4 bg-stone-50 border-2 border-zinc-900 focus:outline-none focus:bg-white focus:border-red-600 font-sans text-sm sm:text-base text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-inner resize-y min-h-[160px]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-3 border-zinc-900 shadow-[4px_4px_0px_#18181B] sm:shadow-[6px_6px_0px_#18181B] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none font-sans text-base sm:text-lg font-black uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      {/* ─── 04. Direct Reachout (Full-Bleed, Only Email & WhatsApp) ─── */}
      <section className="relative w-full border-t-3 border-zinc-900 bg-zinc-950 text-white py-14 sm:py-20 px-4 sm:px-10 lg:px-16 overflow-hidden">
        {/* Subtle Decorative Accents */}
        <div
          className="absolute -top-10 -left-10 w-44 pointer-events-none opacity-[0.08] invert select-none"
          aria-hidden="true"
        >
          <img src="/images/decorations/cloud-white.png" alt="" className="w-full h-auto" />
        </div>

        <div
          className="absolute -right-10 -bottom-10 w-48 sm:w-60 pointer-events-none opacity-[0.10] select-none"
          aria-hidden="true"
        >
          <img src="/images/decorations/golden-dragon.png" alt="" className="w-full h-auto" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              Direct Reachout
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed">
              Prefer instant communication? Connect directly via Email or WhatsApp.
            </p>
          </div>

          {/* Direct Reachout Buttons (Refined & Distinctive) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-2xl">
            {/* Email Button */}
            <a
              href={`mailto:${EMAIL}`}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-500 text-white rounded-sm border border-red-500 font-sans text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(220,38,38,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Email Direct</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* 1-Click Copy Email for Recruiters */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-sm border border-zinc-700 hover:border-zinc-500 font-sans text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Copy email address"
            >
              {copiedEmail ? (
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
            </button>

            {/* WhatsApp Button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm border border-emerald-500 font-sans text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
              </svg>
              <span>WhatsApp Direct</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

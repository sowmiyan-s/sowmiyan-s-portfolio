import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  Send,
  Loader2,
  Mail,
  Phone,
  FileText,
  MessageSquare,
} from 'lucide-react';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { HankoSeal } from '@/components/home/ArtworkAccents';
import { toast } from '@/hooks/use-toast';

const RESUME_URL = "https://drive.google.com/file/d/1NmangaAFo0eGT-KAsZi4VWOm6zI-KPk6/view?usp=sharing";
const EMAIL = "sowmisowmiyan58@gmail.com";
const PHONE = "+919042561295";
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

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    toast({
      title: "Email Copied",
      description: `${EMAIL} copied to clipboard.`,
    });
    setTimeout(() => setCopiedEmail(false), 2000);
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
        description="Get in touch with Sowmiyan S for full-time AI engineering roles across India and software projects."
        canonical="https://www.sowmiyan.me/contact"
      />
      <SEOKeywords />

      {/* ─── Decorative Layer ─── */}
      <motion.div
        style={{ y: cloudY }}
        className="absolute top-24 -right-12 w-48 sm:w-64 pointer-events-none opacity-[0.12] select-none z-0"
        aria-hidden="true"
      >
        <img src="/images/decorations/red-cloud.png" alt="" className="w-full h-auto" />
      </motion.div>

      <motion.div
        style={{ y: kanjiY }}
        className="absolute -left-10 bottom-40 w-[240px] sm:w-[320px] pointer-events-none opacity-[0.08] select-none z-0"
        aria-hidden="true"
      >
        <img src="/images/decorations/japanese-text.png" alt="" className="w-full h-auto" />
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
            <div className="flex items-center justify-between gap-6">
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight text-zinc-950 leading-none whitespace-nowrap">
                CONTACT
              </h1>
              <motion.div
                initial={{ opacity: 0, rotate: -12, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 6, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.5, ease: headerEase }}
                className="shrink-0 hidden sm:block"
              >
                <HankoSeal kanji="縁" size={56} />
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: headerEase }}
              className="origin-left h-2 w-40 sm:w-64 bg-red-600 border-2 border-zinc-900"
            />

            <p className="text-base sm:text-xl text-zinc-700 font-sans max-w-3xl leading-relaxed">
              Have a full-time role, software project, or engineering question? Send a message directly below.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ─── Content: full-width ─── */}
      <main className="relative z-10 w-full pt-12 sm:pt-16 pb-24 px-4 sm:px-10 lg:px-16 flex flex-col gap-10 sm:gap-14">

        {/* ─── Contact Form (Full-Width Centerpiece) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: headerEase }}
          className="relative w-full"
        >
          {/* Offset Red Shadow Layer */}
          <div className="absolute inset-0 bg-red-600 border-3 border-zinc-900 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 pointer-events-none" />

          <div className="relative bg-white border-3 border-zinc-900 shadow-brutal p-6 sm:p-12 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 w-full">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-sans font-bold uppercase tracking-wide text-zinc-900">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-4 py-3.5 bg-stone-50 border-2 border-zinc-900 focus:outline-none focus:bg-white focus:border-red-600 font-sans text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-inner"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-sans font-bold uppercase tracking-wide text-zinc-900">
                    Your Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3.5 bg-stone-50 border-2 border-zinc-900 focus:outline-none focus:bg-white focus:border-red-600 font-sans text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* Inquiry Type Selector */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-sans font-bold uppercase tracking-wide text-zinc-900">
                  Inquiry Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-3 text-xs font-sans font-bold uppercase tracking-wider border-2 border-zinc-900 transition-all text-center cursor-pointer ${
                        category === cat
                          ? 'bg-zinc-950 text-white shadow-brutal-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-zinc-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Area */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-sans font-bold uppercase tracking-wide text-zinc-900">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your team, role requirements, or project vision..."
                  className="w-full px-4 py-3.5 bg-stone-50 border-2 border-zinc-900 focus:outline-none focus:bg-white focus:border-red-600 font-sans text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-inner resize-y min-h-[140px]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4.5 bg-red-600 hover:bg-red-700 text-white border-2 border-zinc-900 shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none font-sans text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ─── Direct Contact Action Strip + Lucky Cat Mascot ─── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: headerEase }}
          className="relative w-full p-6 sm:p-10 bg-zinc-950 text-white border-3 border-zinc-900 shadow-brutal flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden"
        >
          {/* Inverted White Cloud in Dark Container */}
          <div
            className="absolute -top-6 -left-6 w-36 pointer-events-none opacity-[0.12] invert select-none"
            aria-hidden="true"
          >
            <img src="/images/decorations/cloud-white.png" alt="" className="w-full h-auto" />
          </div>

          {/* Golden Dragon glow accent on the dark strip */}
          <div
            className="absolute -right-8 -bottom-10 w-40 sm:w-52 pointer-events-none opacity-[0.14] select-none"
            aria-hidden="true"
          >
            <img src="/images/decorations/golden-dragon.png" alt="" className="w-full h-auto" />
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 z-10">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              DIRECT REACHOUT
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md">
              Connect directly via Email, WhatsApp, or Phone for immediate discussion.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 z-10">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white border-2 border-white shadow-[2px_2px_0px_#ffffff] text-xs font-bold uppercase tracking-wider transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Mail size={14} />
              <span>Email</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-white shadow-[2px_2px_0px_#ffffff] text-xs font-bold uppercase tracking-wider transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border-2 border-zinc-600 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Phone size={14} />
              <span>{PHONE}</span>
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-200 text-zinc-950 border-2 border-white shadow-[2px_2px_0px_#DC2626] text-xs font-bold uppercase tracking-wider transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <FileText size={14} className="text-red-600" />
              <span>Resume ↗</span>
            </a>

            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-2 border-zinc-700 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>

          {/* Decorative Maneki-neko Lucky Cat Mascot */}
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -right-2 -bottom-2 w-20 sm:w-24 pointer-events-none opacity-90 select-none hidden sm:block z-10"
            aria-hidden="true"
          >
            <img
              src="/images/decorations/cat.png"
              alt="Lucky Cat"
              className="w-full h-auto filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

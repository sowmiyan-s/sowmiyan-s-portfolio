import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Check, 
  Copy, 
  Send, 
  Loader2, 
  Mail, 
  Phone, 
  FileText, 
  MessageSquare
} from 'lucide-react';
import TechNav from '@/components/layout/TechNav';
import Footer from '@/components/layout/Footer';
import SEOKeywords from '@/components/common/SEOKeywords';
import SEO from '@/components/common/SEO';
import { toast } from '@/hooks/use-toast';

const RESUME_URL = "https://drive.google.com/file/d/1NmangaAFo0eGT-KAsZi4VWOm6zI-KPk6/view?usp=sharing";
const EMAIL = "sowmisowmiyan58@gmail.com";
const PHONE = "+919042561295";
const WHATSAPP_URL = `https://wa.me/919042561295?text=${encodeURIComponent("Hi Sowmiyan, I saw your portfolio and would like to discuss an opportunity.")}`;

const categories = [
  "Full-Time Role",
  "AI / Software Project",
  "Technical Consulting",
  "General Inquiry"
];

const ContactPage = () => {
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
      title: "Email Copied",
      description: `${EMAIL} copied to clipboard.`
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please enter your name, email, and message.",
        variant: "destructive"
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
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
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
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: "099a224d-5878-43d9-959c-851532f6a6dc",
            name: name.trim(),
            email: email.trim(),
            subject: `[Portfolio Inquiry] ${category} from ${name.trim()}`,
            message: `Category: ${category}\n\n${message.trim()}`
          })
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
        description: "Thank you for reaching out! I will reply directly within 24 hours."
      });
    } else {
      toast({
        title: "Direct Client Fallback",
        description: "You can reach me directly via Email or WhatsApp below.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      <SEO 
        title="Contact Sowmiyan S — AI Engineer & Software Developer"
        description="Get in touch with Sowmiyan S for full-time AI engineering roles across India and software projects."
        canonical="https://www.sowmiyan.me/contact"
      />
      <SEOKeywords />
      <TechNav />

      {/* Decorative Red Cloud in Background */}
      <div 
        className="absolute top-20 -right-10 w-44 sm:w-56 pointer-events-none opacity-[0.06] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/red-cloud.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Subtle Background Accent Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-4 sm:px-8 lg:px-12 w-full max-w-5xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* Header - Clean, No Mini-Title Badges */}
        <div className="text-center flex flex-col items-center gap-3 border-b-2 border-zinc-900 pb-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-zinc-950 leading-none">
            GET IN TOUCH
          </h1>

          <p className="text-base sm:text-xl text-zinc-700 font-sans max-w-2xl leading-relaxed">
            Have a full-time role, software project, or engineering question? Send a message directly below.
          </p>
        </div>

        {/* ─── Contact Form (Full Width Centerpiece) ─── */}
        <div className="relative w-full">
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
        </div>

        {/* ─── ONLY AT BOTTOM: Quick Direct Contact Action Buttons + Mascot ─── */}
        <div className="relative w-full p-6 sm:p-10 bg-zinc-950 text-white border-3 border-zinc-900 shadow-brutal flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          {/* Inverted White Cloud in Dark Container */}
          <div 
            className="absolute -top-6 -left-6 w-36 pointer-events-none opacity-[0.08] invert select-none"
            aria-hidden="true"
          >
            <img
              src="/images/decorations/cloud-white.png"
              alt=""
              className="w-full h-auto"
            />
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 z-10">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              DIRECT REACHOUT
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md">
              Connect directly via Email, WhatsApp, or Phone for immediate discussion.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 z-10">
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
            className="absolute -right-2 -bottom-2 w-20 sm:w-24 pointer-events-none opacity-85 select-none hidden sm:block"
            aria-hidden="true"
          >
            <img
              src="/images/decorations/cat.png"
              alt="Lucky Cat"
              className="w-full h-auto filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        </div>

        {/* Decorative Cloud in Contact Page */}
        <div 
          className="absolute -bottom-6 -left-6 w-36 sm:w-48 pointer-events-none opacity-[0.12] select-none"
          aria-hidden="true"
        >
          <img
            src="/images/decorations/cloud-white.png"
            alt=""
            className="w-full h-auto"
          />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

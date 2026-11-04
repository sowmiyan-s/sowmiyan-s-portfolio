import React from 'react';
import { Mail, MapPin, Linkedin, Instagram, Phone, PenTool, Twitter, Youtube, ArrowUp, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const RESUME_URL = "https://drive.google.com/file/d/1NmangaAFo0eGT-KAsZi4VWOm6zI-KPk6/view?usp=sharing";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-zinc-900 border-t-2 border-zinc-900 py-12 sm:py-16 px-5 sm:px-10 lg:px-16 relative overflow-hidden">
      {/* Subtle Japanese Cloud Accent */}
      <div 
        className="absolute -bottom-8 -right-8 w-44 sm:w-56 pointer-events-none opacity-[0.06] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/cloud-white.png"
          alt=""
          className="w-full h-auto"
        />
      </div>
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Branding Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-900">
          <div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-zinc-950 uppercase tracking-tight">
              Sowmiyan S
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans mt-0.5">
              AI Engineer &amp; Full-Stack Systems Developer · Creator of Bound By Code
            </p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-zinc-900 hover:text-white text-zinc-900 border-2 border-zinc-900 shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto active:scale-95"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-600" />
          </button>
        </div>

        {/* 4 Responsive Columns: 2-cols on mobile, 4-cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Navigation
            </span>
            <ul className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-zinc-700">
              <li>
                <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-red-600 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-red-600 transition-colors">Achievements</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
              </li>
              <li>
                <a href={RESUME_URL} target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors font-medium">
                  Resume ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Contact
            </span>
            <div className="flex flex-col gap-2.5 font-sans text-xs sm:text-sm text-zinc-700">
              <a
                href="mailto:sowmisowmiyan58@gmail.com"
                className="flex items-center gap-2 hover:text-red-600 transition-colors break-all"
              >
                <Mail size={14} className="text-red-600 shrink-0" />
                <span>sowmisowmiyan58@gmail.com</span>
              </a>
              <a
                href="tel:+919042561295"
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <Phone size={14} className="text-red-600 shrink-0" />
                <span>+91 90425 61295</span>
              </a>
              <a
                href="https://wa.me/919042561295"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
              >
                <Phone size={14} className="text-emerald-500 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Social & Channel */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Community &amp; Social
            </span>
            <div className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-zinc-700">
              <a
                href="https://youtube.com/@bound-by-code"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <Youtube size={14} className="text-red-600 shrink-0" />
                <span>YouTube (@bound-by-code)</span>
              </a>
              <a
                href="https://github.com/sowmiyan-s"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-zinc-950 transition-colors"
              >
                <Github size={14} className="text-zinc-900 shrink-0" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/sowmiyan-s"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <Linkedin size={14} className="text-red-600 shrink-0" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://medium.com/@sowmiyan_s_"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <PenTool size={14} className="text-red-600 shrink-0" />
                <span>Medium Blog</span>
              </a>
              <a
                href="https://instagram.com/sowmiyan.s_"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <Instagram size={14} className="text-red-600 shrink-0" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Location & Summary */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Location
            </span>
            <div className="flex items-start gap-2 text-zinc-700">
              <MapPin size={15} className="mt-0.5 text-red-600 shrink-0" />
              <p className="text-xs sm:text-sm font-sans leading-relaxed">
                Namakkal, Tamil Nadu<br />
                India — 637203
              </p>
            </div>
            <p className="text-xs text-zinc-500 font-sans mt-2">
              Open to worldwide remote positions and on-site engineering roles.
            </p>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-zinc-500">
          <span>&copy; {new Date().getFullYear()} Sowmiyan S. All rights reserved.</span>
          <span>Designed with high performance and accessibility in mind.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

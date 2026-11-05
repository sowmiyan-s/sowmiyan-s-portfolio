import React from 'react';
import { Mail, MapPin, Linkedin, Instagram, PenTool, Youtube, ArrowUp, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const EMAIL = 'sowmiyan.s.dev@gmail.com';
const RESUME_URL = 'https://drive.google.com/file/d/1NmangaAFo0eGT-KAsZi4VWOm6zI-KPk6/view?usp=sharing';
const WHATSAPP_URL = 'https://wa.me/919042561295?text=Hi%20Sowmiyan%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-zinc-900 border-t-2 border-zinc-900 py-10 sm:py-16 px-4 sm:px-10 lg:px-16 relative overflow-hidden">
      {/* Subtle Japanese Cloud Watermark */}
      <div 
        className="absolute -bottom-8 -right-8 w-44 sm:w-56 pointer-events-none opacity-[0.10] select-none"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/cloud-white.png"
          alt=""
          className="w-full h-auto"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10 relative z-10">
        {/* Top Branding & Return to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-900">
          <div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-zinc-950 uppercase tracking-tight">
              Sowmiyan S
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans mt-0.5">
              AI Systems Engineer &amp; Full-Stack Developer · Founder of Bound By Code
            </p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-zinc-900 hover:text-white text-zinc-900 border-2 border-zinc-900 shadow-brutal-sm font-sans text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto active:scale-95 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-600" />
          </button>
        </div>

        {/* 4 Clean Columns (2-Cols on Mobile, 4-Cols on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {/* Column 1: Navigation */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-heading font-black uppercase tracking-wider text-red-600">
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
                <a 
                  href={RESUME_URL} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 text-red-600 font-bold hover:underline"
                >
                  <span>Resume</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Direct Reachout */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-heading font-black uppercase tracking-wider text-red-600">
              Direct Contact
            </span>
            <div className="flex flex-col gap-2.5 font-sans text-xs sm:text-sm text-zinc-700">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 hover:text-red-600 transition-colors break-all"
              >
                <Mail size={14} className="text-red-600 shrink-0" />
                <span>{EMAIL}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current text-emerald-600 shrink-0" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
                </svg>
                <span>WhatsApp Message</span>
              </a>

              <div className="flex items-start gap-2 text-zinc-600 pt-1">
                <MapPin size={14} className="text-red-600 shrink-0 mt-0.5" />
                <span className="text-xs">Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Column 3: Bound By Code Channels */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-heading font-black uppercase tracking-wider text-red-600">
              Channels
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
                href="https://instagram.com/bound_by_code"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <Instagram size={14} className="text-red-600 shrink-0" />
                <span>Instagram (@bound_by_code)</span>
              </a>

              <a
                href="https://www.udemy.com/course/master-generative-ai-without-the-tech-overload/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-purple-600 transition-colors"
              >
                <span className="text-xs font-bold text-purple-600">U</span>
                <span>Udemy Masterclass</span>
              </a>
            </div>
          </div>

          {/* Column 4: Professional & Code */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-heading font-black uppercase tracking-wider text-red-600">
              Profiles
            </span>
            <div className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-zinc-700">
              <a
                href="https://github.com/sowmiyan-s"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-zinc-950 transition-colors"
              >
                <Github size={14} className="text-zinc-900 shrink-0" />
                <span>GitHub (sowmiyan-s)</span>
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
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-sans text-zinc-500">
          <span>&copy; {new Date().getFullYear()} Sowmiyan S. All rights reserved.</span>
          <span>Autonomous AI &amp; Scalable Systems Developer.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

/**
 * Kept as a lean legacy export; the Home page uses HireMeSection instead.
 * No forms — direct links only.
 */
const ContactSection = () => (
  <section id="contact" className="py-24 relative">
    <div className="container mx-auto px-6 text-center flex flex-col items-center gap-8">
      <h2 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tighter">
        Get in <span className="text-red-600">Touch</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="mailto:sowmisowmiyan58@gmail.com" className="px-6 py-3 border border-white/20 hover:border-red-500 hover:text-red-500 transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
          <Mail size={14} /> Email
        </a>
        {[
          { icon: Github, href: "https://github.com/sowmiyan-s", label: "GitHub" },
          { icon: Linkedin, href: "https://linkedin.com/in/sowmiyan-s", label: "LinkedIn" },
          { icon: Twitter, href: "https://twitter.com/sowmiyan_s", label: "Twitter" },
        ].map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
             className="w-11 h-11 border border-white/20 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;

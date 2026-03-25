import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Github, Linkedin, Twitter } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase mb-4 opacity-40">06 // Communication Layer</p>
          <h2 className="text-4xl sm:text-7xl font-heading font-black mb-8 uppercase tracking-tighter italic">
            Establish <span className="text-red-600">Contact</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-mono text-sm opacity-60">
            Open a secure channel for project collaboration, research inquiries, or system integration.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto glass rounded-2xl p-8 space-y-5"
        >
          <input
            type="text"
            placeholder="ORIGIN_IDENTIFIER (YOUR NAME)"
            required
            className="w-full px-6 py-4 rounded-none bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-red-600 transition-all text-xs font-mono uppercase tracking-widest"
          />
          <input
            type="email"
            placeholder="COMM_FREQUENCY (YOUR EMAIL)"
            required
            className="w-full px-6 py-4 rounded-none bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-red-600 transition-all text-xs font-mono uppercase tracking-widest"
          />
          <textarea
            placeholder="SIGNAL_CONTENT (YOUR MESSAGE)"
            rows={4}
            required
            className="w-full px-6 py-4 rounded-none bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-red-600 transition-all text-xs font-mono uppercase tracking-widest resize-none"
          />
          <button
            type="submit"
            className="w-full py-5 bg-red-600 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-300"
          >
            {sent ? "TRANSMISSION_SUCCESSFUL // CHANNEL_CLOSED" : (
              <>INITIATE TRANSMISSION <Send size={14} /></>
            )}
          </button>
        </motion.form>

        <div className="flex items-center justify-center gap-6 mt-12">
          {[
            { icon: Github, href: "https://github.com/sowmiyan-s", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/sowmiyan-s", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com/sowmiyan_s", label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-11 h-11 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

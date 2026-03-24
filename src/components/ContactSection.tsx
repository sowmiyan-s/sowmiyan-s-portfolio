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
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Have a project in mind? Let's build something extraordinary together.
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
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
          />
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            {sent ? "Message Sent! ✓" : (
              <>Send Message <Send size={16} /></>
            )}
          </button>
        </motion.form>

        <div className="flex items-center justify-center gap-6 mt-12">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
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

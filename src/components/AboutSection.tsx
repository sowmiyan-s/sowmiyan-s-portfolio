import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Code2, Layers } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "30+", icon: Layers },
  { label: "Technologies Mastered", value: "20+", icon: Code2 },
  { label: "Years Coding", value: "5+", icon: Zap },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
            Crafting the <span className="text-gradient">Future</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            I'm an AI Engineer and Full Stack Developer passionate about building intelligent, 
            scalable systems. From neural networks to production-grade web platforms, I bridge 
            the gap between cutting-edge research and real-world impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="glass rounded-xl p-8 text-center group hover:glow-primary transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="text-primary" size={24} />
              </div>
              <p className="text-4xl font-heading font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

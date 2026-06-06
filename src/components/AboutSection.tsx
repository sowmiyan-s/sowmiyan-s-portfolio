import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Code2, Layers } from "lucide-react";
import ScrambleText from './ScrambleText';

const stats = [
  { label: "Projects Built", value: "30+", icon: Layers },
  { label: "Technologies Used", value: "20+", icon: Code2 },
  { label: "Years of Experience", value: "4+", icon: Zap },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative tactical-grid overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-4xl sm:text-7xl font-heading font-black mb-8 uppercase tracking-tighter italic">
            <ScrambleText text="Crafting the Future" speed={0.5} delay={0.2} />
          </h2>
          <div className="max-w-3xl mx-auto text-white/95 text-lg leading-relaxed font-mono bg-black/65 backdrop-blur-[3px] p-6 border border-white/5">
            <ScrambleText 
              text="I am Sowmiyan S, an AI Engineer and Full Stack Developer dedicated to orchestrating intelligent, scalable architectures. My mission is to bridge the frontier of machine intelligence with the robustness of production-grade systems." 
              speed={0.2}
              delay={0.6}
            />
          </div>
        </div>

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

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Code2, Layers } from "lucide-react";
import ScrambleText from './ScrambleText';

const stats = [
  { label: "Projects Completed", value: "30+", icon: Layers },
  { label: "Technologies Mastered", value: "20+", icon: Code2 },
  { label: "Years Coding", value: "5+", icon: Zap },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative tactical-grid overflow-hidden">
      {/* Static Atmospheric Details (No Hover Interaction) */}
      <div className="absolute top-24 left-12 h-64 w-[1px] bg-gradient-to-b from-red-600/0 via-red-600/40 to-red-600/0 hidden xl:block" />
      <div className="absolute top-24 left-4 [writing-mode:vertical-lr] text-[8px] font-mono text-red-600 tracking-[0.8em] opacity-30 select-none hidden xl:block uppercase">
          Neural Layer v4.1 // Sync Active
      </div>

      <div className="absolute bottom-24 right-12 w-48 border-r border-white/10 pr-6 text-right opacity-30 hidden lg:block">
          <div className="absolute top-0 right-[-1px] w-1 h-8 bg-red-600" />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-red-600 font-bold">Bio Data Log</span>
          <p className="text-[9px] font-mono mt-2 leading-loose">
              System Origin: 2003<br/>
              Uptime: <ScrambleText text="Constant" delay={1} /><br/>
              Core: <span className="text-white">Human v1.02</span>
          </p>
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-[0.5em] uppercase mb-4 opacity-40">
            <ScrambleText text="02 // Identity Core" />
          </p>
          <h2 className="text-4xl sm:text-7xl font-heading font-black mb-8 uppercase tracking-tighter italic">
            <ScrambleText text="Crafting the Future" speed={0.5} delay={0.2} />
          </h2>
          <div className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed font-mono opacity-80 italic">
            <ScrambleText 
              text="I'm an AI Engineer and Full Stack Developer passionate about building intelligent, scalable systems. From neural networks to production-grade web platforms, I bridge the gap between cutting-edge research and real-world impact." 
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

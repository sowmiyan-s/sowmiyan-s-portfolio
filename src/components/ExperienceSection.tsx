import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    role: "AI Engineer",
    company: "TechVision Labs",
    period: "2023 – Present",
    points: [
      "Built production ML pipelines processing 10M+ daily predictions",
      "Led development of multi-modal AI system for document understanding",
      "Reduced inference latency by 60% through model optimization",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "InnovateCo",
    period: "2021 – 2023",
    points: [
      "Architected microservices platform serving 500K+ users",
      "Implemented real-time collaboration features with WebSocket",
      "Mentored junior developers and established code review practices",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "StartupXYZ",
    period: "2020 – 2021",
    points: [
      "Developed REST APIs and integrated third-party services",
      "Built responsive dashboards with React and D3.js",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Experience</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className={`relative mb-12 pl-12 md:pl-0 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-2.5 md:left-auto md:right-auto top-1.5 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30"
                style={i % 2 === 0 ? { right: "-6.5px", left: "auto" } : { left: "-6.5px" }}
              />

              <div className="glass rounded-xl p-6 hover:glow-primary transition-all duration-500">
                <span className="text-primary text-xs font-mono">{exp.period}</span>
                <h3 className="text-lg font-heading font-semibold text-foreground mt-1">{exp.role}</h3>
                <p className="text-muted-foreground text-sm mb-3">{exp.company}</p>
                <ul className={`space-y-1.5 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  {exp.points.map((pt) => (
                    <li key={pt} className="text-muted-foreground text-sm">• {pt}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

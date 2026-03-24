import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

const projects = [
  {
    title: "Neural Vision Pro",
    description: "Real-time object detection system using custom-trained YOLO models with edge deployment capabilities.",
    tech: ["Python", "PyTorch", "OpenCV", "FastAPI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    github: "#",
    live: "#",
  },
  {
    title: "ScaleOps Platform",
    description: "Full-stack SaaS platform for automated infrastructure monitoring with AI-driven anomaly detection.",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    github: "#",
    live: "#",
  },
  {
    title: "LangFlow Engine",
    description: "Conversational AI framework with multi-agent orchestration, tool calling, and memory management.",
    tech: ["LangChain", "OpenAI", "Redis", "TypeScript"],
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&q=80",
    github: "#",
    live: "#",
  },
  {
    title: "DataForge Analytics",
    description: "Real-time data pipeline and visualization dashboard processing millions of events per second.",
    tech: ["Apache Kafka", "React", "D3.js", "AWS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Projects</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold">
            Featured <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              onClick={() => setSelected(i)}
              className="glass rounded-xl overflow-hidden group cursor-pointer hover:glow-primary transition-all duration-500"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl max-w-lg w-full overflow-hidden"
            >
              <img
                src={projects[selected].image}
                alt={projects[selected].title}
                className="w-full h-56 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold text-foreground">{projects[selected].title}</h3>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-muted-foreground mb-6">{projects[selected].description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[selected].tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={projects[selected].live} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a href={projects[selected].github} className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass text-foreground font-semibold text-sm hover:bg-muted/50 transition-all">
                    <Github size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;

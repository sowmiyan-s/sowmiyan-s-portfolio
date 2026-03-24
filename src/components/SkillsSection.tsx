import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    title: "AI / ML",
    color: "primary",
    skills: ["TensorFlow", "PyTorch", "LangChain", "OpenAI", "Computer Vision", "NLP"],
  },
  {
    title: "Backend",
    color: "accent",
    skills: ["Python", "Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    title: "Frontend",
    color: "primary",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion"],
  },
  {
    title: "DevOps",
    color: "accent",
    skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Terraform", "Linux"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Skills</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold">
            My <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass rounded-xl p-8 group hover:glow-primary transition-all duration-500"
            >
              <h3 className={`text-xl font-heading font-semibold mb-5 ${cat.color === "accent" ? "text-accent" : "text-primary"}`}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

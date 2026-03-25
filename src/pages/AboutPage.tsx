import React from 'react';
import { motion } from 'framer-motion';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import TechnicalArsenal from '@/components/TechnicalArsenal';
import PageHero from '@/components/PageHero';

const stats = [
  { label: 'Years Coding', value: '4+' },
  { label: 'Projects Built', value: '30+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Certifications', value: '5+' },
];

const timeline = [
  { year: '2022', title: 'Started B.Tech AI & DS', desc: 'V.S.B. College of Engineering, Coimbatore' },
  { year: '2023', title: 'Founded AI Projects', desc: 'Built intelligent systems with CrewAI & LangChain' },
  { year: '2024', title: 'Published Research & Book', desc: 'Cyber Crime paper (IJCRT) + Python for Beginners' },
  { year: '2025', title: 'Full Stack + Cloud', desc: 'AWS deployments, React apps, and production systems' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary font-body overflow-x-hidden">
      <CyberBackground />
      <TechNav />
      <main className="relative z-10">
        <PageHero
          sectionNumber="01 // IDENTITY CORE"
          title="ABOUT ME"
          subtitle="AI Engineer • Full Stack Developer • Founder — Building intelligent systems that think, adapt, and scale."
        />

        {/* Bio + Stats */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Sowmiyan S — a builder at the intersection of artificial intelligence and full-stack engineering. 
                I design systems that don't just work, they <span className="text-primary font-bold">think</span>. 
                From multi-agent AI architectures to production-grade web platforms, I operate at the edge of what's possible.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed opacity-70">
                Currently pursuing B.Tech in AI & Data Science, I've shipped 30+ projects, authored a book, 
                published research, and led workshops for 50+ students. Every line of code is intentional. Every system is built to scale.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass-strong p-6 flex flex-col gap-2 group hover:border-primary/50 transition-all duration-300"
                >
                  <span className="text-3xl md:text-4xl font-heading font-black text-primary">{stat.value}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 py-20 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-16"
            >
              Journey Log
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative flex flex-col gap-0"
            >
              {/* Vertical line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-primary/20" />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative pl-14 pb-12 group"
                >
                  {/* Dot */}
                  <div className="absolute left-3 top-1 w-3 h-3 border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-primary tracking-widest">{item.year}</span>
                    <h3 className="text-xl font-heading font-bold uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <TechnicalArsenal />

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-6 py-24 border-t border-foreground/5"
        >
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-8 items-center">
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter">
              Let's Build Something
            </h2>
            <p className="text-muted-foreground font-mono text-sm">Ready to collaborate on the next big thing?</p>
            <a
              href="/#contact"
              className="px-12 py-5 bg-primary text-primary-foreground text-xs font-heading font-black uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-all shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
            >
              Get In Touch
            </a>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

import React from 'react';
import { motion } from 'framer-motion';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';

import PageHero from '@/components/PageHero';

// All content strictly from the uploaded resume.
const education = {
  school: 'V.S.B. College of Engineering and Technical Campus, Coimbatore',
  degree: 'B.Tech — Artificial Intelligence & Data Science',
  period: 'Jul 2023 – Present',
  cgpa: '8.6 / 10',
};

const experience = [
  {
    role: 'Freelance Full-Stack Developer & AI Engineer',
    org: 'Self-Employed',
    period: 'Jan 2023 – Present',
    bullets: [
      'Built and deployed custom web applications, AI-powered tools, and automation solutions for diverse client requirements.',
      'Delivered end-to-end software solutions covering development, deployment, UI design, and workflow automation.',
    ],
  },
  {
    role: 'Python Data Science Intern',
    org: 'AISECT',
    period: 'Jan 2026 – Feb 2026',
    bullets: [
      'Developed AI and data science applications with modern Python frameworks and automation tools.',
      'Applied machine learning techniques and data visualization practices to transform raw datasets into actionable insights.',
    ],
  },
];

const achievements = [
  '2nd Prize — Inter-College Hackathon (20+ teams).',
  'Conducted a Generative AI Workshop on web application development for 50+ students.',
  'Published patent: “Smart Dustbin System with Automated Dust Collection, Management, and IoT”.',
  'Research paper: “A Comprehensive Analysis of Cyber Crimes and Cyber Security Tools” — IJCRT.',
];

const certifications = [
  { name: 'Responsible & Safe AI', org: 'NPTEL', date: 'Oct 2025' },
  { name: 'AWS Cloud Foundations', org: 'Infosys Springboard', date: 'Jul 2025' },
  { name: 'Generative AI for Data Science', org: 'Microsoft', date: 'Dec 2025' },
];

const summary =
  'AI and Full-Stack Developer with experience building LLM applications, multi-agent systems, automation workflows, and production-ready applications. Skilled in modern Generative AI technologies. Passionate about developing scalable software solutions that solve real-world problems through AI-driven systems.';

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground selection:bg-primary font-body overflow-x-hidden">
      <TechNav />
      <main className="relative z-10">
        <PageHero
          sectionNumber="Identity"
          title="About"
          subtitle="AI and Full-Stack Developer building LLM applications, multi-agent systems and production-ready apps."
        />

        {/* Summary */}
        <section className="px-6 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base md:text-lg text-white/85 leading-relaxed"
            >
              {summary}
            </motion.p>
          </div>
        </section>

        {/* Education */}
        <section className="px-6 py-12 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-red-500">Education</h2>
            <div className="border border-white/10 bg-black/40 p-6 md:p-8 flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-500">{education.period}</span>
              <h3 className="text-lg md:text-xl font-heading font-bold uppercase">{education.school}</h3>
              <p className="text-sm text-white/70 font-mono">{education.degree}</p>
              <p className="text-xs font-mono text-white/50">CGPA: <span className="text-white">{education.cgpa}</span></p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="px-6 py-12 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-red-500">Experience</h2>
            <div className="flex flex-col gap-4">
              {experience.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-white/10 bg-black/40 p-6 md:p-8 flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-heading font-bold uppercase">{e.role}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-red-500">{e.period}</span>
                  </div>
                  <p className="text-xs font-mono text-white/60 uppercase tracking-wider">{e.org}</p>
                  <ul className="flex flex-col gap-2 text-sm text-white/80 leading-relaxed">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-red-500 shrink-0">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements & Publications */}
        <section className="px-6 py-12 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-red-500">Achievements & Publications</h2>
            <ul className="flex flex-col gap-3">
              {achievements.map((a, i) => (
                <li key={i} className="border border-white/10 bg-black/40 p-4 flex gap-3 text-sm text-white/85">
                  <span className="text-red-500 shrink-0">◆</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Certifications */}
        <section className="px-6 py-12 border-t border-white/5 pb-24">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-red-500">Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {certifications.map((c, i) => (
                <div key={i} className="border border-white/10 bg-black/40 p-5 flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">{c.date}</span>
                  <h3 className="text-sm font-heading font-bold uppercase leading-tight">{c.name}</h3>
                  <p className="text-xs font-mono text-white/60">{c.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

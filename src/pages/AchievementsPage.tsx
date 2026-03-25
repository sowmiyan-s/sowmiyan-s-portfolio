import React from 'react';
import { motion } from 'framer-motion';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import PageHero from '@/components/PageHero';

const achievements = [
  { type: 'PATENT', title: 'SMART DUSTBIN (IOT-01)', desc: 'Integrated IoT-based waste monitoring & automated collection protocol.', icon: '⚙️', hash: 'PAT-7729-AX' },
  { type: 'AWARD', title: 'HACKATHON // RUNNER UP', desc: 'Secured 2nd prize in inter-college coding sprint among 20+ teams.', icon: '🏆', hash: 'AWD-9104-BR' },
  { type: 'WORKSHOP', title: 'INTEL_LEAD // GEN AI', desc: 'Orchestrated generative AI technical session for 50+ students.', icon: '🎓', hash: 'WKS-2231-LD' },
  { type: 'BOOK', title: 'CORE_DOCS // AUTHOR', desc: 'Architected and published "Python for Beginners" technical manual.', icon: '📖', hash: 'PUB-1102-BK' },
  { type: 'PAPER', title: 'OSINT_RSCH // CYBER CRIME', desc: 'Research paper published in IJCRT on digital threat vectors.', icon: '📄', hash: 'RSR-5541-IJ' },
];

const certifications = [
  'Python - Guvi', 'Explore ML - Infosys', 'Data Analytics - Pandas', 'AWS - Infosys', 'Java - Udemy',
];

const counters = [
  { label: 'Patents Filed', value: '1' },
  { label: 'Awards Won', value: '2' },
  { label: 'Certifications', value: '5+' },
  { label: 'Papers Published', value: '1' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const AchievementsPage = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary font-body overflow-x-hidden">
      <CyberBackground />
      <TechNav />
      <main className="relative z-10">
        <PageHero
          sectionNumber="02 // SERVICE RECORDS"
          title="ACCOLADES & RECORDS"
          subtitle="Patents, awards, publications, and certifications earned along the way."
        />

        {/* Animated Counters */}
        <section className="px-6 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {counters.map((c, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-strong p-6 flex flex-col gap-2 text-center group hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-3xl md:text-4xl font-heading font-black text-primary">{c.value}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{c.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Achievements Grid */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: 'hsl(var(--primary) / 0.5)' }}
                  className="glass-strong p-8 flex flex-col gap-4 group transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-primary border border-primary/30 px-3 py-1 uppercase tracking-widest">
                      {item.type}
                    </span>
                    <span className="text-[8px] font-mono text-muted-foreground opacity-50">{item.hash}</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground uppercase leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section className="px-6 py-16 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-12"
            >
              Certifications
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="glass p-5 flex items-center gap-3 group hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-primary shrink-0" />
                  <span className="text-sm font-mono uppercase tracking-wider">{cert}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section className="px-6 py-16 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-strong p-10 flex flex-col gap-4"
            >
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Education_History</span>
              <h3 className="text-2xl font-heading font-bold uppercase">B.Tech in AI & Data Science</h3>
              <p className="text-sm font-mono text-muted-foreground">V.S.B. College of Engineering, Coimbatore</p>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-foreground/5">
                <span className="text-primary font-mono text-sm font-bold">CGPA: 8.53</span>
                <span className="text-[10px] text-muted-foreground font-mono">Present Status: Year 3</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AchievementsPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Youtube, Instagram } from 'lucide-react';
import TechNav from '@/components/TechNav';
import Footer from '@/components/Footer';
import CyberBackground from '@/components/CyberBackground';
import TopographicBackground from '@/components/TopographicBackground';
import PageHero from '@/components/PageHero';
import ScrambleText from '@/components/ScrambleText';

const ContactPage = () => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-red-600 overflow-x-hidden">
            <CyberBackground />
            <TechNav />

            <main className="relative z-10">
                <PageHero
                    sectionNumber="Contact"
                    title="Get in Touch"
                    subtitle="Available for freelance projects, internships and full-time roles."
                />

                <section className="relative w-full py-28 md:py-36 px-4 sm:px-6 border-t border-white/5 bg-black flex flex-col items-center justify-center overflow-hidden">
                    <TopographicBackground />

                    <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center gap-10 text-center">
                        <div className="max-w-3xl">
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                                <ScrambleText text="Say Hello" triggerOnView speed={0.18} />
                            </h2>
                            <p className="mt-6 text-sm md:text-base leading-relaxed text-white/80 font-mono">
                                <ScrambleText text="Available for freelance projects, internships and full-time roles. Let’s turn your AI, web, and product ideas into production-ready results." triggerOnView speed={0.16} />
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-center">
                            <motion.a
                                href="mailto:sowmisowmiyan58@gmail.com"
                                whileHover={{ y: -2 }}
                                className="px-8 md:px-10 py-5 border border-white/10 bg-white/10 hover:bg-white hover:text-black hover:border-white transition-colors font-heading font-bold uppercase tracking-widest text-xs md:text-base text-center flex items-center justify-center gap-3"
                            >
                                <Mail size={16} />
                                <ScrambleText text="Email" triggerOnView speed={0.2} className="text-current" />
                            </motion.a>

                            <motion.a
                                href="https://wa.me/919042561295"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -2 }}
                                className="px-8 md:px-10 py-5 border border-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 transition-colors font-heading font-bold uppercase tracking-widest text-xs md:text-base text-center flex items-center justify-center gap-3"
                            >
                                <Phone size={16} />
                                <ScrambleText text="WhatsApp" triggerOnView speed={0.2} className="text-current" />
                            </motion.a>
                        </div>
                    </div>
                </section>

                <section className="relative px-4 sm:px-6 py-16 md:py-24 border-t border-white/5">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-white/10 bg-black/40 p-6 md:p-8 flex flex-col gap-6">
                            <span className="text-[10px] font-mono text-red-500 tracking-[0.3em] uppercase">Direct Channels</span>

                            <a href="mailto:sowmisowmiyan58@gmail.com" className="flex items-start gap-4 group">
                                <Mail size={18} className="text-red-500 mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono uppercase opacity-40 tracking-widest">Email</span>
                                    <span className="text-sm font-mono group-hover:text-red-500 transition-colors break-all">sowmisowmiyan58@gmail.com</span>
                                </div>
                            </a>

                            <a href="https://wa.me/919042561295" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                                <Phone size={18} className="text-red-500 mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono uppercase opacity-40 tracking-widest">Phone</span>
                                    <span className="text-sm font-mono group-hover:text-red-500 transition-colors">+91 90425 61295</span>
                                </div>
                            </a>

                            <div className="flex items-start gap-4">
                                <MapPin size={18} className="text-red-500 mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono uppercase opacity-40 tracking-widest">Location</span>
                                    <span className="text-sm font-mono leading-relaxed">Namakkal, Tamil Nadu, India</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-white/10 bg-black/40 p-6 md:p-8 flex flex-col gap-4">
                            <span className="text-[10px] font-mono text-red-500 tracking-[0.3em] uppercase">Social</span>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { href: 'https://linkedin.com/in/sowmiyan-s', label: 'LinkedIn', Icon: Linkedin },
                                    { href: 'https://github.com/sowmiyan-s', label: 'GitHub', Icon: Github },
                                    { href: 'https://youtube.com/@bound-by-code', label: 'YouTube', Icon: Youtube },
                                    { href: 'https://instagram.com/sowmiyan.s_', label: 'Instagram', Icon: Instagram },
                                ].map(({ href, label, Icon }) => (
                                    <a key={label} href={href} target="_blank" rel="noreferrer"
                                       className="flex items-center gap-3 p-3 border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors">
                                        <Icon size={16} />
                                        <span className="text-xs font-mono uppercase">{label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;

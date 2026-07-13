import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Check } from 'lucide-react';

const EbookShowcase = () => {
    const [copied, setCopied] = useState(false);
    const amazonLink = "https://www.amazon.in/Python-Beginners-Complete-guide-CheetSheet-ebook/dp/B0DJFNG36Y";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(amazonLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const features = [
        "Basics of Python: variables, data types, loops, functions",
        "File Handling: read, write, and manipulate files",
        "50 popular Python packages & libraries",
        "50 important real-world Python programs",
        "50 top Python interview questions & answers",
    ];

    const audiences = [
        "Complete beginners with no prior experience",
        "Students looking for structured Python intro",
        "Professionals preparing for coding interviews",
        "Anyone building web apps, data analysis, or automation",
    ];

    const handleBookDoubleClick = () => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
        } catch(e){}

        window.dispatchEvent(new CustomEvent('trigger-hud-alert', { 
            detail: { title: "KINDLE_SYNC", desc: "SYNCING SOWMIYAN'S PY-EBOOK DATABASE TO TARGET KINDLE DIRECT." } 
        }));
    };

    return (
        <section className="px-6 py-16 border-t border-foreground/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter"
                    >
                        Published E-Book
                    </motion.h2>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        FORMAT // KINDLE EDITION &nbsp;•&nbsp; ASIN // B0DJFNG36Y
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-strong p-6 md:p-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* Book Cover */}
                        <div className="lg:col-span-4 flex flex-col items-center gap-5">
                            <motion.div
                                onDoubleClick={handleBookDoubleClick}
                                className="relative w-56 md:w-64 aspect-[1/1.45] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(220,38,38,0.2)] rounded-r-lg overflow-hidden border-y border-r border-white/15 cursor-pointer group"
                                style={{ perspective: 1000 }}
                                whileHover={{ rotateY: -12, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <img
                                    src="/python_ebook_cover.jpg"
                                    alt="Python for Beginners Book Cover"
                                    className="w-full h-full object-cover rounded-r-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-white/10 pointer-events-none" />
                                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/70 to-transparent border-r border-white/5" />
                            </motion.div>

                            {/* Pricing & CTA */}
                            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-heading font-black text-white">₹150</span>
                                    <span className="text-xs font-mono text-primary uppercase font-bold">Kindle Edition</span>
                                </div>
                                <a
                                    href={amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center px-6 py-2.5 bg-primary text-[10px] font-mono text-white hover:bg-red-700 transition-all uppercase tracking-widest font-black rounded-sm flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.35)]"
                                >
                                    Buy on Amazon <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button
                                    onClick={copyToClipboard}
                                    className="w-full text-center px-4 py-2 border border-white/10 text-[10px] font-mono text-white/60 hover:text-white hover:border-white/30 transition-all uppercase tracking-wider rounded-sm"
                                >
                                    {copied ? "[ LINK COPIED ✓ ]" : "Copy Share Link"}
                                </button>
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-[9px] font-mono bg-primary/10 border border-primary/30 text-primary px-2 py-0.5 rounded-sm uppercase font-bold">Kindle Edition</span>
                                    <div className="flex text-yellow-500 text-xs">★★★★★</div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-heading font-black text-white uppercase mt-1 leading-snug">
                                    Python For Beginners : Complete guide from basic like CheetSheet
                                </h3>
                                <p className="text-xs font-mono text-muted-foreground uppercase">
                                    by Sowmiyan S (Author) &nbsp;•&nbsp; Format: Kindle Edition
                                </p>
                            </div>

                            <div className="h-[1px] bg-foreground/5" />

                            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                                Learn Python from the ground up! Whether you're just starting or looking to strengthen your programming skills, Python for Beginners offers a comprehensive guide to mastering Python. This book is designed to be an all-in-one resource for new programmers, providing clear explanations, practical examples, and valuable insights into the world of Python.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-xs font-mono text-primary uppercase tracking-widest font-bold">What's Inside</h4>
                                    <ul className="flex flex-col gap-1.5 font-mono text-[10px] text-muted-foreground">
                                        {features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-xs font-mono text-primary uppercase tracking-widest font-bold">Who Should Read This</h4>
                                    <ul className="flex flex-col gap-1.5 font-mono text-[10px] text-muted-foreground">
                                        {audiences.map((a, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                                <span>{a}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EbookShowcase;

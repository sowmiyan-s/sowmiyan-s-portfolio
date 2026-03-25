import React from 'react';

const achievements = [
    { type: 'PATENT', title: 'SMART DUSTBIN (IOT-01)', desc: 'IoT waste monitoring & automated collection protocol.', hash: 'PAT-7729-AX' },
    { type: 'AWARD', title: 'HACKATHON // RUNNER UP', desc: 'Secured 2nd prize in inter-college coding sprint.', hash: 'AWD-9104-BR' },
    { type: 'WORKSHOP', title: 'INTEL_LEAD // GEN AI', desc: 'Generative AI technical session for 50+ students.', hash: 'WKS-2231-LD' },
    { type: 'BOOK', title: 'CORE_DOCS // AUTHOR', desc: 'Published "Python for Beginners" technical manual.', hash: 'PUB-1102-BK' },
    { type: 'PAPER', title: 'OSINT_RSCH // CYBER CRIME', desc: 'Research paper published in IJCRT (Threat Vectors).', hash: 'RSR-5541-IJ' }
];

const certifications = [
    'Python - Guvi', 'Explore ML - Infosys', 'Data Analytics - Pandas', 'AWS - Infosys', 'Java - Udemy'
];

const AchievementsSection = () => {
    return (
        <section id="achievements" className="relative py-24 px-6 grid-bg border-t border-white/10 z-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="flex justify-between items-center py-6 border-y border-white/10 mb-8 bg-black/40 px-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                    <div className="flex flex-col">
                        <span className="text-[10px] opacity-40 font-mono tracking-[0.5em]">02 // SERVICE RECORDS</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight">ACCOLADES AND RECORDS</h2>
                    </div>
                </div>
                <div className="w-full h-1 bg-red-600 mt-2" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Achievements List */}
                    <div className="flex flex-col gap-4">
                        {achievements.map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-4 border border-white/5 hover:border-red-600/50 transition-all bg-black/20 group">
                                <span className="text-[10px] font-mono text-red-600 border border-red-600/30 px-2 py-1 w-20 text-center">
                                    {item.type}
                                </span>
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-sm font-heading font-bold uppercase group-hover:text-red-600 transition-colors">{item.title}</h3>
                                    <p className="text-[10px] font-mono opacity-40 uppercase">{item.desc}</p>
                                </div>
                                <span className="text-[8px] font-mono opacity-20 group-hover:opacity-40">{item.hash}</span>
                            </div>
                        ))}
                    </div>

                    {/* Certifications & Education */}
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6">
                            <span className="text-xs font-mono opacity-40 uppercase tracking-widest border-l-2 border-red-600 pl-4">Validated_Certifications</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {certifications.map((cert, i) => (
                                    <div key={i} className="text-[11px] font-mono opacity-60 flex gap-2 items-center">
                                        <div className="w-1 h-1 bg-red-600" />
                                        {cert.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
                            <span className="text-xs font-mono opacity-40 uppercase tracking-widest">Education_History</span>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-heading font-bold uppercase text-lg">B.Tech in AI & DS</h3>
                                <p className="text-xs font-mono opacity-60">V.S.B. College of Engineering, Coimbatore</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-red-600 font-mono text-xs">CGPA: 8.53</span>
                                    <span className="text-[10px] opacity-20 font-mono">Present Status: Year 3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;

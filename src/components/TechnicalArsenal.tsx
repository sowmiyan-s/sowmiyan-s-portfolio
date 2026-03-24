import React from 'react';

const skills = [
    { title: 'AI_LLM_CREW_AI', level: 95, status: 'OPTIMIZED' },
    { title: 'PROG_PYTHON_JAVA', level: 90, status: 'STABLE' },
    { title: 'DATA_VIS_BI_TOOL', level: 88, status: 'STABLE' },
    { title: 'AWS_CLOUD_DEPLOY', level: 82, status: 'OPTIMIZED' },
    { title: 'SQL_GIT_WORKFLOW', level: 92, status: 'STABLE' },
    { title: 'PROMPT_ENGR_HUD', level: 94, status: 'STABLE' }
];

const TechnicalArsenal = () => {
    return (
        <section id="arsenal" className="relative py-24 px-6 grid-bg-dense border-t border-white/10 z-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-16 relative">
                <div className="flex justify-between items-center py-6 border-y border-white/10 mb-12 bg-stone-900/10 px-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                    <div className="flex flex-col">
                        <span className="text-[10px] opacity-40 font-mono tracking-[0.5em]">04 // CAPABILITY MATRIX</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight">TECHNICAL ARSENAL</h2>
                    </div>
                    <div className="hidden md:flex flex-col text-right">
                        <span className="text-[10px] font-mono opacity-40 uppercase">System Hardware</span>
                        <span className="text-xs font-mono text-red-600">STATE: OPTIMIZED CORE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, i) => (
                        <div key={i} className="flex flex-col gap-4 p-8 border border-white/10 group transition-all duration-300 hover:border-red-600 cursor-default bg-black/40">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-mono opacity-40 uppercase">Skill_{i + 1}</span>
                                <span className={`text-[10px] uppercase font-mono py-1 px-2 border ${skill.status === 'OPTIMIZED' ? 'border-red-600/50 text-red-600' : 'border-white/20 opacity-40'}`}>
                                    {skill.status}
                                </span>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-heading font-bold uppercase tracking-tight">{skill.title}</h3>
                                
                                <div className="w-full h-1 bg-white/10 relative">
                                    <div 
                                        className="h-full bg-red-600 transition-all duration-1000 group-hover:bg-red-500" 
                                        style={{ width: `${skill.level}%` }} 
                                    />
                                    <div className="absolute -bottom-6 right-0 text-xs font-mono opacity-40">
                                        LEVEL: {skill.level}%
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-2 overflow-hidden items-center group-hover:text-red-600 transition-colors">
                                <span className="text-[10px] font-mono tracking-widest opacity-20 group-hover:opacity-100 transition-opacity">
                                    01011101 11001010 00110111
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative Visuals */}
                <div className="absolute -top-12 -right-12 hidden md:block opacity-10">
                    <div className="w-64 h-64 cross-bg border border-white/10 rotate-12" />
                </div>
            </div>
        </section>
    );
};

export default TechnicalArsenal;

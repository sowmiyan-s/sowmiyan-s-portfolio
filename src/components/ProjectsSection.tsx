import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, X, BookOpen, Layers } from "lucide-react";
import { fetchRepos, fetchReadme } from "@/lib/github";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const TimelineItem = ({ project, index, setSelected, total }: { project: any, index: number, setSelected: any, total: number }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.3, 1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, -200]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  
  // Custom scale for the dot that stays on the line
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.3, 0.5]);
  const dotGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothDotScale = useSpring(dotScale, springConfig);

  return (
    <div ref={containerRef} className="relative h-[65vh] flex items-center w-full perspective-[2000px]">
      {/* 
          Stable Tree Node (Axis Connector) 
          Placed outside the motion.div to remain fixed to the line Y-axis position 
      */}
      <div className="absolute left-[25%] md:left-[20%] top-1/2 -translate-y-1/2 z-30 pointer-events-none">
           <motion.div 
              style={{ scale: smoothDotScale }}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center"
           >
              <motion.div 
                style={{ opacity: dotGlow }}
                className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_15px_#ff0000]" 
              />
           </motion.div>
           {/* Horizontal Branch Line (Connects to the animated card) */}
           <motion.div 
             style={{ opacity }}
             className="absolute left-full top-1/2 w-12 md:w-24 h-px bg-gradient-to-r from-white/20 to-transparent transform -translate-y-1/2 -z-10" 
           />
      </div>

      <motion.div
        style={{
          rotateX: smoothRotateX,
          opacity,
          scale: smoothScale,
          z: translateZ,
          y: translateY,
          transformStyle: "preserve-3d"
        }}
        className="relative flex flex-row items-center w-full"
      >
        {/* Date / Timestamp Column (Left) */}
        <div className="w-1/4 md:w-1/5 flex justify-end pr-10 md:pr-16">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-primary mb-1 uppercase tracking-[0.4em] font-bold text-glow">Release</span>
                <span className="text-3xl md:text-6xl font-heading font-black text-white/90 whitespace-nowrap leading-none tracking-tighter italic">
                    {project.month}
                </span>
                <span className="text-sm font-mono text-white/40 mt-1 uppercase tracking-widest">{project.year}</span>
            </div>
        </div>

        {/* Project Card (Right Side) */}
        <div className="flex-1 pl-16 md:pl-32 pr-4 md:pr-16 group">
          <motion.div 
            onClick={() => setSelected(index)}
            className="p-8 md:p-12 rounded-[2rem] overflow-hidden cursor-pointer hover:border-red-600 transition-all duration-700 relative group/card border border-white/5 bg-[#0a0a0a] shadow-2xl"
            whileHover={{ y: -10, x: 20 }}
          >
            {/* Index Background Watermark */}
            <div className="absolute -bottom-10 -right-5 text-[150px] font-black text-white/[0.03] pointer-events-none select-none italic leading-none">
                {String(index + 1).padStart(2, '0')}
            </div>

            <div className="relative z-10 text-left">
              <div className="flex flex-wrap gap-3 mb-8">
                 {project.tech.map((t: string) => (
                   <span key={t} className="text-[9px] px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-white/60 uppercase tracking-[0.2em]">{t}</span>
                 ))}
              </div>
              
              <h3 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 group-hover/card:text-red-600 transition-colors uppercase leading-none italic tracking-tighter">
                {project.title}
              </h3>
              
              <p className="text-white/50 text-base md:text-xl mb-10 max-w-3xl font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex items-center gap-8">
                <button 
                   onClick={(e) => { e.stopPropagation(); setSelected(index); }}
                   className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white group-hover/card:text-red-600 transition-all"
                >
                   Decrypt Metadata <div className="w-16 h-px bg-white/20 group-hover/card:w-32 group-hover/card:bg-red-600 transition-all" /> <Layers size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [readme, setReadme] = useState<string>('');
  const [loadingReadme, setLoadingReadme] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchRepos();
        const saved = localStorage.getItem('hiddenProjects');
        const hiddenIds = saved ? JSON.parse(saved) : [];
        const visible = data.filter((r) => !hiddenIds.includes(r.id));
        
        const formatted = visible
           .sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
           .map(repo => {
              const dateObj = new Date(repo.updated_at);
              const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
              
              return {
                  id: repo.id,
                  name: repo.name,
                  title: repo.name.replace(/-/g, ' '),
                  month: months[dateObj.getMonth()],
                  year: dateObj.getFullYear(),
                  date: `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`,
                  description: repo.description || "Digital core records retrieved. Dataset complete.",
                  tech: repo.language ? [repo.language] : ['GitHub'],
                  image: `https://opengraph.githubassets.com/1/sowmiyan-s/${repo.name}`,
                  github: repo.html_url,
                  live: repo.homepage || repo.html_url,
              };
           });
        setProjects(formatted);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Handle README loading when modal opens
  useEffect(() => {
    if (selected !== null) {
        const loadDoc = async () => {
            setReadme('');
            setLoadingReadme(true);
            const content = await fetchReadme(projects[selected].name);
            setReadme(content);
            setLoadingReadme(false);
        };
        loadDoc();
    }
  }, [selected, projects]);

  return (
    <section id="projects-list" className="py-20 relative min-h-screen bg-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-60 gap-8">
            <div className="relative">
                <div className="w-24 h-24 border border-white/5 rounded-full" />
                <div className="absolute inset-0 border-t border-red-600 rounded-full animate-spin" />
                <div className="absolute inset-4 border-b border-white/20 rounded-full animate-reverse-spin" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.8em] text-white/40 animate-pulse">Syncing Repository Array...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="relative w-full">
            {/* The Tree Trunk (Left Aligned White - Darker) */}
            <div className="absolute left-[25%] md:left-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2 z-0 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            
            <div className="flex flex-col w-full relative z-10">
              {projects.map((project, i) => (
                <TimelineItem key={project.id} project={project} index={i} setSelected={setSelected} total={projects.length} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-left py-40 border-l border-red-600 pl-12 bg-white/[0.01]">
             <p className="font-mono text-2xl text-red-600 uppercase tracking-widest mb-4 italic font-black">[ SYSTEM_NULL_POINTER: DATASET_EMPTY ]</p>
             <p className="text-sm text-white/30 uppercase tracking-[0.4em] leading-relaxed max-w-xl">No public repositories matched the current visibility filter. Update the system admin matrix to restore data signal.</p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col"
          >
              {/* Fullscreen Documentation Explorer */}
              <motion.div
                initial={{ y: "20%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "20%", opacity: 0 }}
                transition={{ type: "spring", damping: 35, stiffness: 200 }}
                className="w-full h-full flex flex-col"
              >
                {/* Global Command Bar (Sticky Header) */}
                <div className="px-6 md:px-12 py-6 border-b border-white/5 flex items-center justify-between bg-black/90 backdrop-blur-md z-50 shrink-0">
                    <div className="flex items-center gap-8">
                        <button 
                          onClick={() => setSelected(null)} 
                          className="group flex items-center gap-3 text-white/40 hover:text-white transition-all text-sm font-light uppercase tracking-[0.3em] bg-white/[0.03] hover:bg-white/10 px-6 py-3 rounded-full border border-white/10"
                        >
                           <X size={16} className="group-hover:rotate-90 transition-transform" /> Back // Return_To_Base
                        </button>
                        <div className="hidden md:block h-6 w-px bg-white/10" />
                        <div className="hidden md:block">
                            <p className="text-primary font-mono text-[10px] tracking-[0.5em] uppercase font-black mb-1 opacity-50">{projects[selected].date} // ARCHIVE_DATA</p>
                            <h3 className="text-xl md:text-3xl font-heading font-black text-white italic tracking-tighter leading-none uppercase">{projects[selected].title}</h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                         <a 
                            href={projects[selected].github} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="hidden md:flex items-center gap-3 px-8 py-3.5 rounded-full border border-red-600/30 bg-red-600/5 text-red-600 font-black text-[10px] hover:bg-red-600 hover:text-white transition-all uppercase tracking-[0.4em]"
                         >
                            Source_Fetch <Github size={14} />
                         </a>
                    </div>
                </div>

                {/* Primary Content Stream */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050505] p-6 md:p-24 selection:bg-red-600 selection:text-white">
                    <div className="max-w-5xl mx-auto py-10 md:py-20">
                        {/* Mobile Header (Shows when main header hides items) */}
                        <div className="md:hidden mb-12 border-l-2 border-red-600 pl-6">
                            <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase font-black block mb-2">{projects[selected].date}</span>
                            <h1 className="text-5xl font-heading font-black text-white uppercase leading-none italic tracking-tighter">{projects[selected].title}</h1>
                        </div>

                        {loadingReadme ? (
                            <div className="flex flex-col items-center justify-center py-60 gap-8">
                                <div className="relative">
                                    <div className="w-16 h-16 border-2 border-white/5 border-t-red-600 rounded-full animate-spin" />
                                    <div className="absolute inset-2 border-2 border-white/10 border-b-white rounded-full animate-reverse-spin" />
                                </div>
                                <p className="font-mono text-xs tracking-[1em] uppercase text-white/40 animate-pulse">Establishing Uplink...</p>
                            </div>
                        ) : (
                            <div className="prose prose-invert prose-red max-w-none 
                                prose-p:text-lg prose-p:text-white/60 prose-p:leading-[1.8] prose-p:font-light prose-p:mb-8
                                prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-widest prose-headings:italic
                                prose-h1:text-7xl prose-h1:font-black prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-10 prose-h1:mb-16 prose-h1:mt-0 prose-h1:tracking-tighter
                                prose-h2:text-4xl prose-h2:text-white prose-h2:mt-24 prose-h2:mb-10 prose-h2:tracking-tight
                                prose-h3:text-2xl prose-h3:text-red-600 prose-h3:mt-12 prose-h3:mb-6
                                prose-a:text-red-600 prose-a:underline-offset-4 hover:prose-a:underline
                                prose-img:rounded-3xl prose-img:border prose-img:border-white/5 prose-img:my-16 prose-img:w-full prose-img:shadow-[0_0_100px_rgba(255,0,0,0.1)]
                                prose-code:text-red-500 prose-code:bg-white/[0.03] prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-code:text-base
                                prose-pre:bg-black prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2.5rem] prose-pre:p-10 prose-pre:my-12
                                prose-ul:my-10 prose-li:text-lg prose-li:text-white/50 prose-li:mb-4
                                ">
                                <ReactMarkdown 
                                  rehypePlugins={[rehypeRaw]}
                                  components={{
                                    img: ({node, ...props}) => {
                                      const src = props.src || "";
                                      const fixedSrc = src.startsWith("http") 
                                        ? src 
                                        : `https://github.com/sowmiyan-s/${projects[selected].name}/raw/main/${src.startsWith("./") ? src.substring(2) : src}`;
                                      
                                      return (
                                          <img 
                                            {...props} 
                                            src={fixedSrc} 
                                            className="block m-auto max-w-full rounded-2xl shadow-2xl" 
                                            alt={props.alt || "Deployment Feed"} 
                                          />
                                      );
                                    }
                                  }}
                                >
                                  {readme + `\n\n---\n\n## [ARCHIVE_ACCESS]\n\nAccess the complete software repository and environmental files via GitHub: \n\n[**${projects[selected].github}**](${projects[selected].github})`}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tactical Action Bar (Mobile only footer or desktop floating) */}
                <div className="p-6 md:p-10 border-t border-white/5 flex items-center justify-center bg-black/60 shrink-0 md:hidden">
                    <a href={projects[selected].github} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                      LINK_GITHUB_REPO <Github size={18} />
                    </a>
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <style>{`
        .animate-reverse-spin {
            animation: reverse-spin 3s linear infinite;
        }
        @keyframes reverse-spin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;





import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2, Hash } from 'lucide-react';

const COMMANDS: Record<string, string | string[]> = {
  help: ["COMMANDS:", "  ls       - List available sectors", "  cat      - Read sector data", "  clear    - Flush terminal buffer", "  whoami   - Identity identification", "  exit     - Terminate session"],
  ls: ["SECTORS:", "  /projects", "  /achievements", "  /contact"],
  "cat about": ["SOWMIYAN_S // IDENTITY_PROFILE", "Role: AI Engineer / Full-Stack Architect", "Status: Active // Level_04_Security", "Goal: Scaling intelligent neural systems."],
  "cat projects": ["RETRIEVING_PROJECT_DATABASE...", "Total: 30+ Archived Records", "Link: /projects sector for full visualization."],
  whoami: ["USER: ANONYMOUS_GUEST", "PERMISSIONS: READ_ONLY", "IP: [ENCRYPTED]"],
};

const TacticalTerminal = ({ onClose }: { onClose: () => void }) => {
  const [history, setHistory] = useState<string[]>(["SYSTEM_READY // INITIALIZING_CLI_v1.02", "Type 'help' for available commands."]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (!cmd) return;

    let response: string[] = [];
    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "exit") {
      onClose();
      return;
    } else if (COMMANDS[cmd]) {
      response = Array.isArray(COMMANDS[cmd]) ? (COMMANDS[cmd] as string[]) : [COMMANDS[cmd] as string];
    } else {
      response = [`ERROR: COMMAND '${cmd}' NOT RECOGNIZED`];
    }

    setHistory(prev => [...prev, `> ${input}`, ...response]);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      drag
      dragMomentum={false}
      className="fixed bottom-10 right-10 w-[90vw] md:w-[500px] h-[400px] bg-black/90 border border-red-900/30 backdrop-blur-xl z-[1000] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden rounded-lg"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5 cursor-move">
        <div className="flex items-center gap-2">
            <Terminal size={14} className="text-red-600" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-white/60">TACTICAL_SHELL // v1.02</span>
        </div>
        <div className="flex items-center gap-3">
            <Minimize2 size={12} className="text-white/20 hover:text-white cursor-pointer" />
            <X size={14} className="text-red-600 hover:text-white cursor-pointer" onClick={onClose} />
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-[11px] overflow-y-auto no-scrollbar selection:bg-red-600/30"
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.startsWith('>') ? 'text-red-500' : line.startsWith('ERROR') ? 'text-red-900 bg-red-100/5 px-1' : 'text-green-500/80'}`}>
            {line}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
          <span className="text-red-600"><Hash size={12} /></span>
          <input 
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white caret-red-600"
            spellCheck={false}
          />
        </form>
      </div>

      {/* Static Footer Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.02),transparent)]" />
    </motion.div>
  );
};

export default TacticalTerminal;

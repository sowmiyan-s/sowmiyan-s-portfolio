import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShieldAlert, Terminal, X, RefreshCw, Trophy, Sparkles, Volume2, VolumeX, Download, Mail, Phone, Copy, RotateCw, AlertTriangle, Monitor, Wifi, Clock } from 'lucide-react';

const themes = [
  { id: 'red', name: 'CYBER_RED', color: '#ef4444' },
  { id: 'blue', name: 'COBALT_BLUE', color: '#3b82f6' },
  { id: 'green', name: 'MATRIX_GREEN', color: '#10b981' },
  { id: 'purple', name: 'NEON_PURPLE', color: '#a855f7' },
  { id: 'yellow', name: 'GOLD_ORANGE', color: '#f59e0b' }
];

const CANDIDATE_CODES = ["A4B1", "E9D2", "B6F2", "D1A9", "9F2C", "2C4F", "F3E2", "5A8D", "7C1E", "3F8A", "8D2C", "B6E9"];

const KONAMI_CODE = [
  "arrowup", "arrowup", 
  "arrowdown", "arrowdown", 
  "arrowleft", "arrowright", 
  "arrowleft", "arrowright", 
  "b", "a"
];

const RESUME_URL = "https://drive.google.com/file/d/1NmangaAFo0eGT-KAsZi4VWOm6zI-KPk6/view?usp=sharing";

// Play dynamic retro synths via Web Audio API without audio files
const playSynthBeep = (freq = 800, duration = 0.08, type: OscillatorType = "sine") => {
  if (typeof window !== 'undefined' && localStorage.getItem('sowmiyan-portfolio-audio-muted') === 'true') {
    return;
  }
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn("Web Audio API warning:", e);
  }
};

const playWinChime = () => {
  setTimeout(() => playSynthBeep(400, 0.15, "triangle"), 0);
  setTimeout(() => playSynthBeep(600, 0.15, "triangle"), 100);
  setTimeout(() => playSynthBeep(800, 0.15, "triangle"), 200);
  setTimeout(() => playSynthBeep(1200, 0.3, "sine"), 300);
};

const playLoseBuzz = () => {
  setTimeout(() => playSynthBeep(120, 0.25, "sawtooth"), 0);
  setTimeout(() => playSynthBeep(90, 0.35, "sawtooth"), 100);
};

const playGodModeChime = () => {
  const steps = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
  steps.forEach((freq, index) => {
    setTimeout(() => playSynthBeep(freq, 0.25, "triangle"), index * 80);
  });
};

const playLaserSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.5);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch (e) {
    console.warn("Laser audio error:", e);
  }
};

const getMatchCount = (guess: string, target: string) => {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === target[i]) count++;
  }
  return count;
};

const ThemeAndEasterEgg = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('red');
  const [typedKeysBuffer, setTypedKeysBuffer] = useState("");
  const konamiIndexRef = useRef(0);

  // Easter Egg Game states
  const [gameOpen, setGameOpen] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [triesLeft, setTriesLeft] = useState(5);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [log, setLog] = useState<string[]>([]);

  // Modals and Alerts
  const [godModeOpen, setGodModeOpen] = useState(false);
  const [secretTrophyOpen, setSecretTrophyOpen] = useState(false);
  const [alert, setAlert] = useState<{ title: string; desc: string } | null>(null);
  
  // Audio state
  const [audioMuted, setAudioMuted] = useState(false);
  
  // Telemetry session data
  const [telemetry, setTelemetry] = useState({
    browser: "Chrome/V8 Engine",
    os: "Windows 11 NT",
    latency: "12ms",
    connection: "4G/LTE",
    uptime: 0
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  // Get session stats & start uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({ ...prev, uptime: prev.uptime + 1 }));
    }, 1000);

    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent;
      let osName = "Windows NT";
      if (ua.indexOf("Win") !== -1) osName = "Windows OS";
      if (ua.indexOf("Mac") !== -1) osName = "macOS UNIX";
      if (ua.indexOf("Linux") !== -1) osName = "Linux System";
      if (ua.indexOf("Android") !== -1) osName = "Android Linux";
      if (ua.indexOf("like Mac") !== -1) osName = "iOS Apple";

      let browserName = "Chrome V8";
      if (ua.indexOf("Chrome") !== -1) browserName = "Chrome V8";
      else if (ua.indexOf("Firefox") !== -1) browserName = "Firefox Gecko";
      else if (ua.indexOf("Safari") !== -1) browserName = "Safari WebKit";
      else if (ua.indexOf("Edge") !== -1) browserName = "Edge Chromium";

      setTelemetry(prev => ({
        ...prev,
        browser: browserName,
        os: osName,
        latency: `${Math.floor(Math.random() * 12) + 6}ms`,
        connection: (navigator as any).connection?.effectiveType?.toUpperCase() || "BROADBAND"
      }));
    }

    return () => clearInterval(timer);
  }, []);

  // Load persistent theme
  useEffect(() => {
    const saved = localStorage.getItem('sowmiyan-portfolio-theme') || 'red';
    setActiveTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    setAudioMuted(localStorage.getItem('sowmiyan-portfolio-audio-muted') === 'true');
  }, []);

  const showAlert = (title: string, desc: string) => {
    setAlert({ title, desc });
    // Clear alert after 4 seconds
    const timer = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timer);
  };

  // Keyboard shortcut listener ("hack" and Konami Code)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // 1. Check Konami Code
      if (key === KONAMI_CODE[konamiIndexRef.current]) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current === KONAMI_CODE.length) {
          triggerGodMode();
          konamiIndexRef.current = 0;
        }
      } else {
        konamiIndexRef.current = key === KONAMI_CODE[0] ? 1 : 0;
      }

      // 2. Check general keyboard shortcut cheat codes
      if (/^[a-zA-Z]$/.test(e.key) || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setTypedKeysBuffer((prev) => {
          const next = (prev + key).slice(-20);
          
          if (next.endsWith("hack")) {
            playSynthBeep(900, 0.2, "sawtooth");
            startHackingGame();
            return "";
          }
          if (next.endsWith("matrix")) {
            changeTheme("green");
            playSynthBeep(600, 0.5, "sine");
            showAlert("SYSTEM_OVERRIDE", "THE MATRIX HAS YOU. FOLLOW THE WHITE RABBIT...");
            return "";
          }
          if (next.endsWith("redpill")) {
            changeTheme("red");
            playSynthBeep(350, 0.6, "sawtooth");
            showAlert("SYSTEM_RESTORED", "RED PILL TAKEN. WELCOME BACK TO THE COLD REALITY.");
            return "";
          }
          if (next.endsWith("bluepill")) {
            changeTheme("blue");
            playSynthBeep(880, 0.4, "sine");
            showAlert("SYSTEM_SIMULATED", "BLUE PILL TAKEN. CHOOSE YOUR COMFORTABLE ILLUSION.");
            return "";
          }
          if (next.endsWith("sudo")) {
            playLoseBuzz();
            showAlert("SECURITY_ERROR", "SOWMIYAN IS NOT IN THE SUDOERS FILE. THIS INCIDENT WILL BE REPORTED.");
            return "";
          }
          if (next.endsWith("doabarrelroll")) {
            playSynthBeep(700, 0.4, "triangle");
            document.body.classList.add("animate-barrel-roll");
            showAlert("SYS_CMD_ENGAGED", "DO A BARREL ROLL // ROTATING VIEWPORT 360 DEG.");
            setTimeout(() => {
              document.body.classList.remove("animate-barrel-roll");
            }, 1000);
            return "";
          }
          if (next.endsWith("sound")) {
            playLaserSound();
            showAlert("AUDIO_PULSE_GEN", "SYNTH SLIDER ENGAGED // LASER BEAM GENERATED.");
            return "";
          }
          if (next.endsWith("cheats")) {
            playSynthBeep(750, 0.2, "sine");
            console.table({
              "Cheat Code": ["hack", "konami", "matrix", "redpill", "bluepill", "sudo", "sound", "doabarrelroll", "resume", "glitch", "secret"],
              "System Action": [
                "Launch Firewall Decryption Game",
                "Unlock God Mode Administrative Panel",
                "Set Green Theme & Matrix quote",
                "Reset theme to red & reality quote",
                "Set blue theme & simulation quote",
                "Trigger security incident error report",
                "Generate dynamic 8-bit laser SFX",
                "Spin the entire viewport 360 degrees",
                "Direct download Google Drive resume file",
                "Trigger visual screen distortion glitch",
                "Unlock Sowmiyan's secret trophy card"
              ]
            });
            showAlert("CONSOLE_DECRYPTED", "SYSTEM CHEAT CODES DUMPED TO DEVELOPER TOOLS CONSOLE (F12).");
            return "";
          }
          if (next.endsWith("resume")) {
            playSynthBeep(800, 0.3, "triangle");
            showAlert("FILE_DOWNLOAD", "INITIATING DIRECT DOWNLOAD: SOWMIYAN_CV.PDF");
            window.open(RESUME_URL, "_blank");
            return "";
          }
          if (next.endsWith("glitch")) {
            playLoseBuzz();
            document.documentElement.classList.add("glitch-filter-active");
            showAlert("DISPLAY_FAILURE", "CRITICAL SIGNAL INTERFERENCE DETECTED.");
            setTimeout(() => {
              document.documentElement.classList.remove("glitch-filter-active");
            }, 800);
            return "";
          }
          if (next.endsWith("secret")) {
            playWinChime();
            setSecretTrophyOpen(true);
            showAlert("SECRET_UNLOCKED", "SOWMIYAN'S ELITE EASTER EGG ACCOLADE DISCOVERED!");
            return "";
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mount global hack() function in browser developer tools
  useEffect(() => {
    (window as any).hack = () => {
      console.log("%c[OVERRIDE_TRIGGERED] Initializing mainframe bypass...", "color: #ef4444; font-weight: bold;");
      startHackingGame();
      return "Mainframe decryption console initialized.";
    };

    return () => {
      delete (window as any).hack;
    };
  }, []);

  // Listen to custom cross-widget DOM events for interactive page eggs
  useEffect(() => {
    const handleStatusEgg = () => {
      playSynthBeep(1000, 0.3, "triangle");
      showAlert("IDENTITY_VERIFIED", "SOWMIYAN // ADMIN_MODE ENABLED.");
    };

    const handleTriggerHacking = () => {
      startHackingGame();
    };

    const handleHudAlert = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        showAlert(customEvent.detail.title, customEvent.detail.desc);
      }
    };

    window.addEventListener('trigger-status-egg', handleStatusEgg);
    window.addEventListener('trigger-hacking-game', handleTriggerHacking);
    window.addEventListener('trigger-hud-alert', handleHudAlert);

    return () => {
      window.removeEventListener('trigger-status-egg', handleStatusEgg);
      window.removeEventListener('trigger-hacking-game', handleTriggerHacking);
      window.removeEventListener('trigger-hud-alert', handleHudAlert);
    };
  }, []);

  const changeTheme = (themeId: string) => {
    setActiveTheme(themeId);
    localStorage.setItem('sowmiyan-portfolio-theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    
    const freqs: Record<string, number> = { red: 500, blue: 600, green: 700, purple: 800, yellow: 900 };
    playSynthBeep(freqs[themeId] || 600, 0.08, "triangle");
  };

  const startHackingGame = () => {
    const target = CANDIDATE_CODES[Math.floor(Math.random() * CANDIDATE_CODES.length)];
    setSecretCode(target);
    setTriesLeft(5);
    setGameStatus('playing');
    setLog(["INITIALIZING ACCESS OVERRIDE...", "DECRYPT SYSTEM FIREWALL PASSWORD TO GRANTED ROOT ACCESS."]);
    setGameOpen(true);
  };

  const triggerGodMode = () => {
    playGodModeChime();
    setGodModeOpen(true);
  };

  const toggleAudio = () => {
    const nextMuted = !audioMuted;
    setAudioMuted(nextMuted);
    localStorage.setItem('sowmiyan-portfolio-audio-muted', nextMuted ? 'true' : 'false');
    
    if (!nextMuted) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch(e){}
    }
    
    showAlert(
      nextMuted ? "AUDIO_OFFLINE" : "AUDIO_ONLINE", 
      nextMuted ? "SYSTEM AUDIO MUTED." : "SYSTEM DYNAMIC SYNTHS ENGAGED."
    );
  };

  const handleGuess = (code: string) => {
    if (gameStatus !== 'playing') return;

    if (code === secretCode) {
      playWinChime();
      setGameStatus('won');
      setLog(prev => [...prev, `> ${code}`, "ACCESS GRANTED. FIREWALL OVERRIDDEN SUCCESSFULLY.", "WELCOME TO ROOT TERMINAL SOWMIYAN S."]);
    } else {
      const matches = getMatchCount(code, secretCode);
      const remaining = triesLeft - 1;
      setTriesLeft(remaining);
      
      if (remaining <= 0) {
        playLoseBuzz();
        setGameStatus('lost');
        setLog(prev => [...prev, `> ${code}`, "ACCESS DENIED. CODES LOCKOUT ACTIVATED.", `CORRECT SYSTEM KEY WAS: ${secretCode}`]);
      } else {
        playSynthBeep(250, 0.15, "sawtooth");
        setLog(prev => [
          ...prev, 
          `> ${code}`, 
          `[ACCESS DENIED] MATCHED: ${matches}/4 CHARACTERS.`,
          `WARNING // LOCKOUT IN ${remaining} TRIES.`
        ]);
      }
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("sowmisowmiyan58@gmail.com");
    setCopiedEmail(true);
    playSynthBeep(900, 0.08, "sine");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const triggerGlitchDisplay = () => {
    playLoseBuzz();
    document.documentElement.classList.add("glitch-filter-active");
    setTimeout(() => {
      document.documentElement.classList.remove("glitch-filter-active");
    }, 700);
  };

  const triggerBarrelRollAxis = () => {
    playSynthBeep(700, 0.4, "triangle");
    document.body.classList.add("animate-barrel-roll");
    setTimeout(() => {
      document.body.classList.remove("animate-barrel-roll");
    }, 1000);
  };

  const formatUptime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Check if we should render the Mainframe cockpit panel
  const isDashboardOpen = godModeOpen || (gameOpen && gameStatus === 'won');

  return (
    <>
      {/* Floating config panel trigger */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            setPanelOpen(!panelOpen);
            playSynthBeep(650, 0.05, "sine");
          }}
          className="w-10 h-10 rounded-full bg-black border border-red-500/30 flex items-center justify-center text-red-500 hover:border-red-500 hover:bg-red-950/20 transition-all shadow-[0_0_12px_rgba(239,68,68,0.2)] focus:outline-none"
          title="System configuration"
        >
          <Settings size={18} className={panelOpen ? 'animate-spin' : ''} />
        </button>

        <button
          onClick={toggleAudio}
          className="w-10 h-10 rounded-full bg-black border border-red-500/30 flex items-center justify-center text-red-500 hover:border-red-500 hover:bg-red-950/20 transition-all shadow-[0_0_12px_rgba(239,68,68,0.2)] focus:outline-none"
          title={audioMuted ? "Unmute system audio" : "Mute system audio"}
        >
          {audioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              className="bg-black/95 border border-red-500/30 p-4 rounded-xl flex flex-col gap-3 shadow-[0_0_20px_rgba(239,68,68,0.25)] backdrop-blur-xl w-60 z-50 text-left pointer-events-auto"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <ShieldAlert size={10} /> SYS_CONFIG // THEME
                </span>
                <button 
                  onClick={() => setPanelOpen(false)}
                  className="text-white/40 hover:text-red-500 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Theme Selector list */}
              <div className="flex flex-col gap-1.5">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => changeTheme(theme.id)}
                    className={`flex items-center justify-between px-3 py-1.5 border rounded-md font-mono text-[9px] uppercase tracking-wider transition-all duration-300
                      ${activeTheme === theme.id 
                        ? 'border-red-500 bg-red-600/10 text-white font-bold' 
                        : 'border-white/5 bg-white/20 text-white/60 hover:border-white/20 hover:text-white'
                      }
                    `}
                  >
                    <span>{theme.name}</span>
                    <span 
                      className="w-2 h-2 rounded-full border border-white/25" 
                      style={{ backgroundColor: theme.color }}
                    />
                  </button>
                ))}
              </div>

              {/* Secret Trigger button */}
              <button
                onClick={() => {
                  setPanelOpen(false);
                  playSynthBeep(850, 0.1, "sine");
                  startHackingGame();
                }}
                className="mt-1.5 py-1.5 bg-red-600 text-white font-mono text-[8px] font-bold uppercase tracking-widest rounded hover:bg-red-700 transition-colors text-center shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse"
              >
                [ SYSTEM BYPASS ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fallout Hacking minigame Modal */}
      <AnimatePresence>
        {gameOpen && gameStatus === 'playing' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4" data-lenis-prevent="true">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-[#030303] border border-red-500/40 p-6 md:p-8 shadow-[0_0_30px_rgba(239,68,68,0.3)] flex flex-col max-h-[85vh] rounded-xl overflow-hidden font-mono"
            >
              {/* Scanline Sweep */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(239,68,68,0.015)_50%)] bg-[length:100%_4px] pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4 z-10">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-red-500 animate-pulse" />
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                    SYSTEM_DECIPHER // PORTAL
                  </span>
                </div>
                <button
                  onClick={() => {
                    playSynthBeep(400, 0.08, "sine");
                    setGameOpen(false);
                  }}
                  className="px-3 py-1 border border-red-600/50 text-[9px] text-red-500 hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest font-bold rounded"
                >
                  Close
                </button>
              </div>

              {/* Main Game Screen */}
              <div className="flex-grow flex flex-col gap-5 overflow-hidden z-10 text-left">
                
                {/* Diagnostic Monitor Console */}
                <div className="bg-[#050505] border border-white/5 rounded-md p-4 h-36 overflow-y-auto scrollbar-none flex flex-col gap-1 text-[9px] text-red-400/80 leading-relaxed uppercase">
                  {log.map((line, idx) => (
                    <div key={idx} className={line.startsWith(">") ? "text-white font-bold" : ""}>
                      {line}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  {/* Access Attempts Remaining Indicator */}
                  <div className="flex justify-between items-center text-[10px] text-white/50 uppercase">
                    <span>Attempts remaining:</span>
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2.5 h-2.5 rounded-sm transition-all duration-300
                            ${idx < triesLeft ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'bg-white/5 border border-white/10'}
                          `}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Candidate grids */}
                  <div className="grid grid-cols-3 gap-2">
                    {CANDIDATE_CODES.map((code) => (
                      <button
                        key={code}
                        onClick={() => handleGuess(code)}
                        className="py-2.5 bg-white/[0.02] border border-white/5 rounded hover:border-red-500 hover:text-red-500 hover:bg-red-600/5 transition-all text-xs font-bold font-mono tracking-widest text-center"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fallout Hacking Lockout / Failure screen */}
      <AnimatePresence>
        {gameOpen && gameStatus === 'lost' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4" data-lenis-prevent="true">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-sm w-full bg-[#030303] border border-red-500/40 p-8 shadow-[0_0_30px_rgba(239,68,68,0.3)] flex flex-col items-center text-center rounded-xl overflow-hidden font-mono"
            >
              <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse mb-4">
                X
              </div>
              <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-2">SYSTEM LOCKOUT</h4>
              <p className="text-[10px] text-white/40 uppercase mb-6 leading-relaxed">
                Security block active. Decryption process expired. Correct code: {secretCode}.
              </p>
              
              <button
                onClick={startHackingGame}
                className="w-full py-3 bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-widest rounded flex items-center justify-center gap-1.5 hover:bg-red-700 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.4)]"
              >
                <RefreshCw size={10} /> Reboot console
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unified Mainframe Administrative & Recruiter Control Dashboard */}
      <AnimatePresence>
        {isDashboardOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/98 backdrop-blur-lg p-4" data-lenis-prevent="true">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full bg-[#050505] border border-red-500/40 p-6 md:p-8 shadow-[0_0_40px_rgba(239,68,68,0.35)] flex flex-col max-h-[90vh] rounded-2xl overflow-y-auto scrollbar-none font-mono"
            >
              {/* Scanline Sweep */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(239,68,68,0.012)_50%)] bg-[length:100%_4px] pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 z-10">
                <div className="flex items-center gap-2.5">
                  <Trophy size={16} className="text-red-500 animate-pulse" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-white font-heading font-black tracking-wider leading-none">
                      MAINFRAME_COCKPIT // SOWMIYAN S.
                    </span>
                    <span className="text-[8px] text-red-500 font-bold uppercase tracking-widest mt-1">
                      {godModeOpen ? "ADMIN OVERRIDE: ACTIVE (KONAMI)" : "FIREWALL OVERRIDE: ACTIVE (DECRYPTED)"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    playSynthBeep(400, 0.08, "sine");
                    setGodModeOpen(false);
                    setGameOpen(false);
                  }}
                  className="px-3.5 py-1.5 border border-red-600/50 text-[9px] text-red-500 hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest font-black rounded-lg"
                >
                  Exit Control
                </button>
              </div>

              {/* Cockpit Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left z-10">
                
                {/* Column 1: Live Telemetry Session Info */}
                <div className="border border-white/5 bg-white/[0.02] p-4 rounded-xl flex flex-col gap-3">
                  <span className="text-[8px] font-bold text-red-500 tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <Monitor size={10} /> SESSION TELEMETRY
                  </span>

                  <div className="flex flex-col gap-2.5 text-[9px] text-white/70 leading-none">
                    <div className="flex justify-between">
                      <span className="opacity-50">CLIENT PLATFORM:</span>
                      <span className="font-bold text-white uppercase">{telemetry.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">ENGINE TYPE:</span>
                      <span className="font-bold text-white uppercase">{telemetry.browser}</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-1">
                      <span className="opacity-50">CONNECTION:</span>
                      <span className="font-bold text-white uppercase flex items-center gap-1"><Wifi size={8} /> {telemetry.connection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">PING LATENCY:</span>
                      <span className="font-bold text-white">{telemetry.latency}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-1">
                      <span className="opacity-50 flex items-center gap-1"><Clock size={8} /> SESSION UPTIME:</span>
                      <span className="font-bold text-red-500 font-mono text-[10px] animate-pulse">{formatUptime(telemetry.uptime)}</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Direct Contact Hub (Recruiter shortcuts) */}
                <div className="border border-white/5 bg-white/[0.02] p-4 rounded-xl flex flex-col gap-3">
                  <span className="text-[8px] font-bold text-red-500 tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <Sparkles size={10} /> RECRUITER ACTION HUB
                  </span>

                  <div className="flex flex-col gap-2">
                    {/* CV Download button */}
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSynthBeep(800, 0.1, "sine")}
                      className="flex items-center justify-between px-3 py-2 bg-red-600 text-white font-bold text-[9px] uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                    >
                      <span>Download Resume</span>
                      <Download size={10} />
                    </a>

                    {/* Email copy button */}
                    <button
                      onClick={copyEmailToClipboard}
                      className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/5 text-white text-[9px] uppercase tracking-wider rounded-lg hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      <span>{copiedEmail ? "[ Copied! ]" : "Copy Email"}</span>
                      <Copy size={10} />
                    </button>

                    {/* Direct WhatsApp link */}
                    <a
                      href="https://wa.me/919042561295?text=Hi%20Sowmiyan,%20I%20am%20a%20recruiter%20and%20just%20unlocked%20your%20mainframe!"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSynthBeep(900, 0.1, "sine")}
                      className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/5 text-white text-[9px] uppercase tracking-wider rounded-lg hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      <span>WhatsApp Chat</span>
                      <Phone size={10} />
                    </a>

                    {/* Email composer link */}
                    <a
                      href="mailto:sowmisowmiyan58@gmail.com?subject=Mainframe%20Inquiry%20-%20AI%20Engineer"
                      onClick={() => playSynthBeep(800, 0.1, "sine")}
                      className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/5 text-white text-[9px] uppercase tracking-wider rounded-lg hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      <span>Email direct</span>
                      <Mail size={10} />
                    </a>
                  </div>
                </div>

                {/* Column 3: Live Visual modifiers (Toggles) */}
                <div className="border border-white/5 bg-white/[0.02] p-4 rounded-xl flex flex-col gap-3">
                  <span className="text-[8px] font-bold text-red-500 tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <AlertTriangle size={10} /> DYNAMIC MODIFIERS
                  </span>

                  <div className="flex flex-col gap-2">
                    {/* Audio mute toggler */}
                    <button
                      onClick={toggleAudio}
                      className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/5 text-white text-[9px] uppercase tracking-wider rounded-lg hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      <span>Toggle Sound SFX</span>
                      {audioMuted ? <VolumeX size={12} className="text-red-500" /> : <Volume2 size={12} className="text-emerald-500" />}
                    </button>

                    {/* Screen glitch filter trigger */}
                    <button
                      onClick={triggerGlitchDisplay}
                      className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/5 text-white text-[9px] uppercase tracking-wider rounded-lg hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      <span>Test screen glitch</span>
                      <RefreshCw size={10} />
                    </button>

                    {/* Barrel roll spin trigger */}
                    <button
                      onClick={triggerBarrelRollAxis}
                      className="flex items-center justify-between px-3 py-2 border border-white/10 bg-white/5 text-white text-[9px] uppercase tracking-wider rounded-lg hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      <span>Test Axis spin</span>
                      <RotateCw size={10} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Status Message Footer */}
              <div className="mt-6 border-t border-white/5 pt-4 text-center">
                <span className="text-[8px] text-white/30 uppercase tracking-[0.3em] font-mono leading-none">
                  ADMINISTRATIVE OVERRIDE GRANTED // SOURCE CODE AUTHORIZED BY SOWMIYAN S.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secret Accolade Trophy Modal */}
      <AnimatePresence>
        {secretTrophyOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/98 backdrop-blur-lg p-4" data-lenis-prevent="true">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full bg-[#050505] border-2 border-red-500/40 p-8 shadow-[0_0_40px_rgba(239,68,68,0.25)] flex flex-col items-center text-center rounded-2xl overflow-hidden font-mono"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(239,68,68,0.015)_50%)] bg-[length:100%_4px] pointer-events-none" />

              <Sparkles size={48} className="text-red-500 animate-pulse mb-4 filter drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              
              <h3 className="text-xl font-heading font-black text-red-500 uppercase tracking-widest mb-2 leading-none">
                Secret Discovered
              </h3>
              <span className="text-[9px] text-red-500/60 uppercase tracking-widest mb-6 font-bold">
                [ ACCESS_GRANT // MASTER_EXPLORER ]
              </span>

              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Congratulations! You have cracked Sowmiyan's hidden repository token. Ultimate Mainframe Explorer Accolade unlocked!
              </p>

              {/* ASCII Cup Trophy */}
              <pre className="bg-black/80 border border-red-500/10 p-4 rounded text-[6px] text-red-400 font-mono tracking-widest mb-6 select-none">
{`       ___________
      '.__==__==__.'
      .-\\:      /-.
     | (|:.     |) |
      '-|:.     |-'
        \\::.    /
         '::.  '
           ) (
         _.' '._
        \`"""""""\``}
              </pre>

              <button
                onClick={() => {
                  playSynthBeep(500, 0.08, "sine");
                  setSecretTrophyOpen(false);
                }}
                className="w-full py-3 bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                Claim Trophy
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating System HUD alerts */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-4 z-[9999] bg-[#070707] border border-red-500/50 px-5 py-3 shadow-[0_0_15px_rgba(239,68,68,0.3)] rounded-md font-mono max-w-sm pointer-events-none text-left"
          >
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <ShieldAlert size={10} className="animate-pulse" /> {alert.title}
            </div>
            <div className="text-[9px] text-white/70 uppercase leading-relaxed font-bold">
              {alert.desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeAndEasterEgg;

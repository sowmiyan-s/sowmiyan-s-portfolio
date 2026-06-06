import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Terminal } from 'lucide-react';

const BOOT_LOGS = [
  "INITIALIZING_TACTICAL_KERNEL_v4.1.0",
  "UPLINK_ESTABLISHED: CHN_SECTOR_04",
  "DECRYPTING_BIO_IDENTITY...",
  "LOADING_NEURAL_WEIGHTS: 175B_PARAMS",
  "SCANNING_LOCAL_PERIPHERALS... OK",
  "ESTABLISHING_SECURE_PROTOCOLS... SH256",
  "MEMORY_CHECK: 64GB_ECC_RAM... PASSED",
  "GPU_DETECTED: NV_RTX_PULSE_ACTIVE",
  "SYSTEM_STATUS: OPTIMAL",
  "WELCOME_SOWMIYAN_S"
];

interface BootLoaderProps {
  onComplete: () => void;
}

const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete
        });
      }
    });

    // 1. Log Sequence
    BOOT_LOGS.forEach((log, i) => {
      tl.to({}, {
        duration: 0.15,
        onStart: () => {
          setCurrentLogs(prev => [...prev, `${log} ... OK`]);
          if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
          }
        }
      });
    });

    // 2. Progress Bar
    tl.to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power4.inOut"
    }, "-=0.5");

    // 3. Final Flash
    tl.to(containerRef.current, {
        filter: "brightness(2) contrast(1.5) blur(5px)",
        duration: 0.3
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100000] bg-black flex items-center justify-center p-6 md:p-12 overflow-hidden"
    >
      <div className="max-w-xl w-full flex flex-col gap-8">
        {/* Terminal Header */}
        <div className="flex items-center gap-4 text-red-600 mb-4 animate-pulse">
            <Terminal size={32} strokeWidth={3} />
            <div className="flex flex-col">
                <span className="text-xl font-heading font-black tracking-[0.2em] uppercase">Tactical Boot v4.1</span>
                <span className="text-[10px] font-mono opacity-60 tracking-[0.5em]">Auth: sowmiyan_s // Secure_Session</span>
            </div>
        </div>

        {/* Log Window */}
        <div 
            ref={logRef}
            className="flex flex-col gap-1 font-mono text-[10px] md:text-xs text-green-500/80 h-48 overflow-y-auto no-scrollbar border-l border-white/5 pl-4"
        >
          {currentLogs.map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="opacity-30">[{i.toString().padStart(2, '0')}]</span>
              <span className="tracking-widest">{log}</span>
            </div>
          ))}
          <div className="w-2 h-4 bg-green-500 animate-[blink_1s_infinite] inline-block mt-2" />
        </div>

        {/* Progress System */}
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase tracking-[0.5em]">
                <span>System_Syncing</span>
                <span>Init_Phase</span>
            </div>
            <div className="w-full h-1 bg-white/5 border border-white/10 relative">
                <div ref={progressRef} className="absolute inset-y-0 left-0 bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)] w-0" />
            </div>
        </div>

        {/* Footer Detail */}
        <div className="text-center opacity-20 hover:opacity-100 transition-opacity">
            <span className="text-[8px] font-mono uppercase tracking-[0.8em]">© 2026 Sowmiyan S</span>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default BootLoader;

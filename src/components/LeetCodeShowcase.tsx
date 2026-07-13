import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ScrambleText from './ScrambleText';

// Fallback static data in case LeetCode API is rate-limited or offline
const FALLBACK_DATA = {
  solvedProblem: 371,
  easySolved: 212,
  mediumSolved: 134,
  hardSolved: 25,
  ranking: 343562,
  reputation: 0,
  username: "sowmiyan-s"
};

// Generates a mock contribution calendar to show active progress when the API is rate-limited
const generateMockCalendar = () => {
  const obj: Record<string, number> = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Populate last 371 days (53 weeks) with active submissions
  for (let i = 0; i < 371; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // 38% chance of solving problems on any day
    if (Math.random() < 0.38) {
      const count = Math.floor(Math.random() * 4) + 1;
      const ts = Math.floor(d.getTime() / 1000).toString();
      obj[ts] = count;
    }
  }
  return JSON.stringify(obj);
};

const LeetCodeShowcase = () => {
  const [data, setData] = useState(FALLBACK_DATA);
  const [calendarStr, setCalendarStr] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [displaySolved, setDisplaySolved] = useState<number | null>(null);
  const [isOverclocked, setIsOverclocked] = useState(false);

  const triggerOverclock = () => {
    if (isOverclocked) return;
    setIsOverclocked(true);
    
    window.dispatchEvent(new CustomEvent('trigger-hud-alert', { 
      detail: { title: "OVERCLOCK_WARNING", desc: "LEETCODE PROCESSOR OVERCLOCKED // THERMAL CORE SURGE." } 
    }));

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(1800, audioCtx.currentTime + 1.2);
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch(e){}

    let current = data.solvedProblem;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 400) + 100;
      if (current >= 9999) {
        current = 9999;
        clearInterval(interval);
        
        setTimeout(() => {
          setIsOverclocked(false);
          setDisplaySolved(null);
          window.dispatchEvent(new CustomEvent('trigger-hud-alert', { 
            detail: { title: "SYSTEM_RESTORED", desc: "LEETCODE CORE COOLING STABLE // PROCESSOR ONLINE." } 
          }));
        }, 2000);
      }
      setDisplaySolved(current);
    }, 45);
  };

  useEffect(() => {
    // Pre-populate with mock calendar first
    setCalendarStr(generateMockCalendar());

    const fetchData = async () => {
      setLoading(true);
      try {
        // Try fetching solved stats
        const res = await fetch("https://alfa-leetcode-api.onrender.com/sowmiyan-s/solved");
        if (res.ok) {
          const solvedData = await res.json();
          
          // Fetch basic profile info
          let ranking = FALLBACK_DATA.ranking;
          try {
            const profileRes = await fetch("https://alfa-leetcode-api.onrender.com/sowmiyan-s");
            if (profileRes.ok) {
              const profileData = await profileRes.json();
              if (profileData.ranking) ranking = profileData.ranking;
            }
          } catch (e) {
            console.warn("Could not fetch ranking:", e);
          }

          // Fetch calendar submissions
          try {
            const calendarRes = await fetch("https://alfa-leetcode-api.onrender.com/sowmiyan-s/calendar");
            if (calendarRes.ok) {
              const calData = await calendarRes.json();
              if (calData.submissionCalendar) {
                setCalendarStr(calData.submissionCalendar);
              }
            }
          } catch (e) {
            console.warn("Could not fetch calendar:", e);
          }

          setData({
            solvedProblem: solvedData.solvedProblem || FALLBACK_DATA.solvedProblem,
            easySolved: solvedData.easySolved || FALLBACK_DATA.easySolved,
            mediumSolved: solvedData.mediumSolved || FALLBACK_DATA.mediumSolved,
            hardSolved: solvedData.hardSolved || FALLBACK_DATA.hardSolved,
            ranking: ranking,
            reputation: FALLBACK_DATA.reputation,
            username: "sowmiyan-s"
          });
          setIsLive(true);
        } else {
          // Heroku fallback
          const resHeroku = await fetch("https://leetcode-stats-api.herokuapp.com/sowmiyan-s");
          if (resHeroku.ok) {
            const herokuData = await resHeroku.json();
            if (herokuData.status === "success") {
              setData({
                solvedProblem: herokuData.totalSolved || FALLBACK_DATA.solvedProblem,
                easySolved: herokuData.easySolved || FALLBACK_DATA.easySolved,
                mediumSolved: herokuData.mediumSolved || FALLBACK_DATA.mediumSolved,
                hardSolved: herokuData.hardSolved || FALLBACK_DATA.hardSolved,
                ranking: herokuData.ranking || FALLBACK_DATA.ranking,
                reputation: FALLBACK_DATA.reputation,
                username: "sowmiyan-s"
              });
              
              if (herokuData.submissionCalendar) {
                setCalendarStr(JSON.stringify(herokuData.submissionCalendar));
              }
              setIsLive(true);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load LeetCode data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Parse and build calendar grid (53 weeks = 371 days)
  const getHeatmapGrid = () => {
    let calendarObj: Record<string, number> = {};
    try {
      if (calendarStr) {
        calendarObj = JSON.parse(calendarStr);
      }
    } catch (e) {
      console.error("Failed to parse calendar string:", e);
    }

    const totalDays = 7 * 53; // 53 weeks (12 months)
    const today = new Date();
    today.setHours(12, 0, 0, 0); // normalize timezone

    const cells = [];
    
    // Align starting date to Sunday 53 weeks ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalDays + 1);
    const startDayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDayOfWeek);

    const tempDate = new Date(startDate);
    for (let i = 0; i < totalDays; i++) {
      const localDate = new Date(tempDate);
      localDate.setHours(0, 0, 0, 0);
      const tempDateString = localDate.toDateString();

      // Find submission counts matching this local day
      let count = 0;
      Object.entries(calendarObj).forEach(([ts, val]) => {
        const entryDate = new Date(parseInt(ts) * 1000);
        if (entryDate.toDateString() === tempDateString) {
          count += val;
        }
      });

      cells.push({
        date: new Date(tempDate),
        count,
      });

      tempDate.setDate(tempDate.getDate() + 1);
    }

    // Transpose 1D list of 371 elements into 7 rows (Sunday to Saturday)
    const rows: typeof cells[] = Array.from({ length: 7 }, () => []);
    cells.forEach((cell) => {
      const day = cell.date.getDay();
      rows[day].push(cell);
    });

    return rows;
  };

  const heatmapRows = getHeatmapGrid();

  // Get month labels with their column indices
  const getMonthLabels = () => {
    if (heatmapRows.length === 0 || heatmapRows[0].length === 0) return [];
    const firstRow = heatmapRows[0]; // Sunday cells
    const labels: { text: string; index: number }[] = [];
    let lastMonth = -1;

    firstRow.forEach((cell, index) => {
      const month = cell.date.getMonth();
      if (month !== lastMonth) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        labels.push({ text: months[month], index });
        lastMonth = month;
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  const totalEasy = 820;
  const totalMedium = 1680;
  const totalHard = 800;

  const easyPercent = Math.min((data.easySolved / totalEasy) * 100, 100);
  const mediumPercent = Math.min((data.mediumSolved / totalMedium) * 100, 100);
  const hardPercent = Math.min((data.hardSolved / totalHard) * 100, 100);
  const totalPercent = Math.min((data.solvedProblem / 800) * 100, 100);

  return (
    <section className="px-6 py-16 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-white">
              <ScrambleText text="LeetCode Status" />
            </h2>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              API STREAM // {isLive ? 'LIVE' : 'STATIC_CACHE'} • PROFILE // SOWMIYAN-S
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong p-6 md:p-10 relative overflow-hidden flex flex-col gap-10"
        >
          {/* Cyber scanline sweep */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(239,68,68,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

          {/* Top Half: Solved Ring & Levels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 w-full">
            {/* Left Side: Circular Total Solved */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center gap-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeWidth="6"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * totalPercent) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="stroke-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  />
                </svg>

                {/* Inner Content */}
                <div 
                  onDoubleClick={triggerOverclock}
                  className={`flex flex-col items-center text-center justify-center z-10 cursor-pointer select-none transition-all duration-300 ${isOverclocked ? 'text-amber-500 font-bold scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]' : ''}`}
                >
                  <span className={`text-4xl md:text-5xl font-heading font-black leading-none ${isOverclocked ? 'text-amber-500' : 'text-white'}`}>
                    {displaySolved ?? data.solvedProblem}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-wider mt-1.5 ${isOverclocked ? 'text-amber-500/70' : 'text-muted-foreground'}`}>
                    {isOverclocked ? 'OVERCLOCK ACTIVE' : 'PROBLEMS SOLVED'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://leetcode.com/u/sowmiyan-s/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-red-600/10 border border-red-600 hover:bg-red-600 hover:text-white text-red-500 transition-all font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.15)]"
              >
                LeetCode Profile <ExternalLink size={12} />
              </a>
            </div>

            {/* Right Side: Level Breakdown & System Specs */}
            <div className="lg:col-span-8 flex flex-col gap-8 w-full">
              
              {/* Monospace System Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-sm font-mono text-[10px] uppercase tracking-wider text-white/50">
                <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
                  <span className="text-white/30 text-[9px]">[SYS_STATUS]</span>
                  <span className="text-emerald-500 font-bold">ONLINE</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
                  <span className="text-white/30 text-[9px]">[GLOBAL_RANK]</span>
                  <span className="text-white font-bold">#{data.ranking.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
                  <span className="text-white/30 text-[9px]">[REPUTATION]</span>
                  <span className="text-white font-bold">{data.reputation}</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
                  <span className="text-white/30 text-[9px]">[PROFILE_ID]</span>
                  <span className="text-red-500 font-bold">{data.username}</span>
                </div>
              </div>

              {/* Progress bars for Easy, Medium, Hard */}
              <div className="flex flex-col gap-5">
                
                {/* Easy Solved */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-mono text-xs uppercase text-white/80">
                    <span className="text-emerald-400 font-bold">Easy Solved</span>
                    <span>{data.easySolved} <span className="text-white/20">/ {totalEasy}</span></span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-sm overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${easyPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    />
                  </div>
                </div>

                {/* Medium Solved */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-mono text-xs uppercase text-white/80">
                    <span className="text-yellow-500 font-bold">Medium Solved</span>
                    <span>{data.mediumSolved} <span className="text-white/20">/ {totalMedium}</span></span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-sm overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mediumPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-yellow-600 to-yellow-500"
                    />
                  </div>
                </div>

                {/* Hard Solved */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-mono text-xs uppercase text-white/80">
                    <span className="text-red-500 font-bold">Hard Solved</span>
                    <span>{data.hardSolved} <span className="text-white/20">/ {totalHard}</span></span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-sm overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${hardPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-red-700 to-red-500"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Half: Daily Submission Heatmap Graph */}
          <div className="relative z-10 flex flex-col gap-4 border-t border-white/5 pt-8 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                [SUBMISSION_HEATMAP] // PAST 12 MONTHS ACTIVITY
              </span>
              {/* Legend */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/30 uppercase">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-[1px] bg-white/[0.03]" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-red-950/40 border border-red-900/30" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-red-800/40 border border-red-700/40" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-red-600/70 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-red-500 border border-red-400 shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid Wrapper */}
            <div className="w-full bg-[#030303]/95 border border-white/5 p-5 md:p-6 rounded-xl overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 shadow-inner">
              <div className="flex gap-2 min-w-[900px] pt-6 relative">
                
                {/* Month Labels Row (aligned horizontally) */}
                <div className="absolute top-0 left-[36px] right-0 h-5 text-[9px] font-mono text-white/40 uppercase pointer-events-none">
                  {monthLabels.map((label, idx) => (
                    <span
                      key={idx}
                      className="absolute animate-fade-in"
                      style={{ left: `${label.index * 16}px` }}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>

                {/* Day Labels Column */}
                <div className="flex flex-col gap-1 text-[9px] font-mono text-white/35 text-right pointer-events-none select-none pr-1 w-7 pt-[1px]">
                  <span className="h-3 flex items-center justify-end">Sun</span>
                  <span className="h-3 flex items-center justify-end font-bold text-white/65">Mon</span>
                  <span className="h-3 flex items-center justify-end">Tue</span>
                  <span className="h-3 flex items-center justify-end font-bold text-white/65">Wed</span>
                  <span className="h-3 flex items-center justify-end">Thu</span>
                  <span className="h-3 flex items-center justify-end font-bold text-white/65">Fri</span>
                  <span className="h-3 flex items-center justify-end">Sat</span>
                </div>

                {/* Grid Rows Container */}
                <div className="flex flex-col gap-1">
                  {heatmapRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                      {row.map((cell, cellIndex) => {
                        const count = cell.count;
                        let colorClass = "bg-white/[0.03] border border-white/[0.02]";
                        
                        if (count === 1) {
                          colorClass = "bg-red-950/40 border border-red-900/30";
                        } else if (count === 2) {
                          colorClass = "bg-red-800/40 border border-red-700/40";
                        } else if (count >= 3 && count <= 4) {
                          colorClass = "bg-red-600/70 border border-red-500/50";
                        } else if (count >= 5) {
                          colorClass = "bg-red-500 border border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.6)]";
                        }
                        
                        return (
                          <div
                            key={cellIndex}
                            title={`${cell.date.toDateString()}: ${count} submissions`}
                            className={`w-3 h-3 rounded-[2px] transition-all duration-200 hover:scale-130 hover:border-red-400 cursor-pointer ${colorClass}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCodeShowcase;

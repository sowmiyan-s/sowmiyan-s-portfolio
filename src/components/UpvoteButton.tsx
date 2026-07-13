import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeRefetch } from "@/hooks/useRealtimeRefetch";

const COOKIE = "sw_voter";
const LS_KEY = "sw_voter_id";

function readVoterId(): string {
  const fromCookie = document.cookie
    .split("; ")
    .find((r) => r.startsWith(COOKIE + "="))
    ?.split("=")[1];
  return fromCookie || localStorage.getItem(LS_KEY) || "";
}

function ensureVoterId(): string {
  let id = readVoterId();
  if (!id) {
    id = crypto.randomUUID();
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `${COOKIE}=${id}; path=/; max-age=${oneYear}; SameSite=Lax`;
    localStorage.setItem(LS_KEY, id);
  }
  return id;
}

const UpvoteButton = () => {
  const [count, setCount] = useState<number>(0);
  const [voted, setVoted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const reduce = useReducedMotion();

  const refresh = useCallback(async () => {
    const voterId = readVoterId();
    try {
      const { data } = await supabase.functions.invoke("vote", {
        method: "GET" as any,
        body: voterId ? { voter_id: voterId } : undefined,
        // functions.invoke doesn't support query params directly; fall back to fetch below on error
      } as any);
      if (data && typeof data.count === "number") {
        setCount(data.count);
        setVoted(!!data.hasVoted);
        return;
      }
    } catch {
      /* fall through */
    }
    // Fallback: read count directly from the public table
    const { count: c } = await supabase.from("site_votes").select("*", { count: "exact", head: true });
    setCount(c ?? 0);
    if (voterId) {
      const { data } = await supabase.from("site_votes").select("voter_id").eq("voter_id", voterId).maybeSingle();
      setVoted(!!data);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);
  useRealtimeRefetch(["site_votes"], refresh);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    const voterId = ensureVoterId();
    const willVote = !voted;
    
    // Play sound feedback and dispatch HUD alert
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (willVote) {
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      } else {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(200, audioCtx.currentTime + 0.25);
        gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      }
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch(e){}

    window.dispatchEvent(new CustomEvent('trigger-hud-alert', { 
      detail: { 
        title: willVote ? "NETWORK_BOOST" : "NETWORK_DEGRADE", 
        desc: willVote ? "MAIN ENCRYPTION SCORE NOMINATED (+1 UPVOTE)." : "MAIN ENCRYPTION SCORE DECREASED (-1 UPVOTE)." 
      } 
    }));

    // optimistic
    setVoted(willVote);
    setCount((c) => c + (willVote ? 1 : -1));
    setPopKey((k) => k + 1);
    try {
      const { data } = await supabase.functions.invoke("vote", {
        method: willVote ? "POST" : ("DELETE" as any),
        body: { voter_id: voterId },
      } as any);
      if (data && typeof data.count === "number") {
        setCount(data.count);
        setVoted(!!data.hasVoted);
      }
    } catch {
      // revert
      setVoted(!willVote);
      setCount((c) => c + (willVote ? -1 : 1));
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={voted}
      aria-label={voted ? "Remove upvote" : "Upvote Sowmiyan"}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      className={`group inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 border font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full transition-colors select-none ${
        voted
          ? "bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          : "bg-white/5 border-white/20 text-white/90 hover:border-red-500 hover:text-red-400"
      }`}
    >
      <motion.span
        key={popKey}
        initial={reduce ? false : { scale: 0.6, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        aria-hidden
      >
        ▲
      </motion.span>
      <span className="font-bold tabular-nums">{count.toLocaleString()}</span>
      <span className="hidden md:inline text-white/40 group-hover:text-current transition-colors">
        {voted ? "Voted" : "Upvote"}
      </span>
    </motion.button>
  );
};

export default UpvoteButton;

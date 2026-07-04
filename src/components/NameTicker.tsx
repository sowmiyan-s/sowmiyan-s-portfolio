import React from "react";
import { motion } from "framer-motion";

interface Props {
  variant?: "divider" | "footer";
}

/**
 * Reusable animated "Sowmiyan S" ticker.
 * - `divider`: compact, used between sections.
 * - `footer`: larger, used globally at page bottom.
 */
const NameTicker: React.FC<Props> = ({ variant = "divider" }) => {
  const items = Array(12).fill("Sowmiyan S");
  const sizeClass =
    variant === "footer"
      ? "text-5xl md:text-7xl lg:text-8xl py-2"
      : "text-3xl md:text-5xl py-1";

  return (
    <div
      className="w-full overflow-hidden bg-white select-none pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className={`flex flex-nowrap whitespace-nowrap font-black text-red-600 ${sizeClass}`}
        style={{ fontFamily: "'Waterfall', cursive" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: variant === "footer" ? 40 : 28, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="mx-6 flex items-center gap-6">
            {t}
            <span className="text-red-600/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default NameTicker;

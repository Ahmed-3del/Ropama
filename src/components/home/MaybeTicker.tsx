"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** "Maybe a latte… maybe a mojito…" — the brand name as a running line. */
export function MaybeTicker({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [reduce, words.length]);

  return (
    <span className={className}>
      <span className="sr-only">Maybe {words.join(", maybe ")}.</span>
      <span aria-hidden className="inline-flex items-baseline gap-[0.3em]">
        <span>Maybe</span>
        <span className="relative inline-grid overflow-hidden">
          {/* Every word sits in the same cell so the width fits the longest one. */}
          {words.map((w) => (
            <span key={w} className="invisible col-start-1 row-start-1">
              {w}
            </span>
          ))}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={words[i]}
              className="col-start-1 row-start-1 text-amber-500"
              initial={{ y: "100%", rotate: 4, opacity: 0 }}
              animate={{ y: "0%", rotate: 0, opacity: 1 }}
              exit={{ y: "-100%", rotate: -4, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {words[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </span>
  );
}

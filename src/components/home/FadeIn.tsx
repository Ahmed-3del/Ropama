"use client";

import { motion } from "motion/react";

/** Mount-time fade used by the hero’s entrance sequence. */
export function FadeIn({ children, delay = 0, duration = 0.9, className }: { children?: React.ReactNode; delay?: number; duration?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

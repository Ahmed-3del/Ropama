"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/format";

/** Reveals a line left-to-right, as if it were being written. */
export function HandwrittenLine({ text, className, delay = 0.7 }: { text: string; className?: string; delay?: number }) {
  return (
    <p className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="block"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 2.4, delay, ease: [0.45, 0, 0.25, 1] }}
      >
        {text}
      </motion.span>
    </p>
  );
}

/** The "Menu Rbma" tag from the printed menu, hanging off the page and swaying gently. */
export function SwingingTag({ href, className }: { href: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("origin-top", className)}
      initial={{ opacity: 0, y: -20, rotate: -14 }}
      animate={reduce ? { opacity: 1, y: 0, rotate: -8 } : { opacity: 1, y: 0, rotate: [-14, -4, -10, -7, -8] }}
      transition={{ duration: 2.2, delay: 1.6, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="group block drop-shadow-[0_12px_14px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:rotate-6"
        aria-label="Open the Rbma menu"
      >
        <span
          className="relative flex h-36 w-24 flex-col items-center justify-end bg-peach pb-5 text-cocoa"
          style={{ clipPath: "polygon(20% 0, 80% 0, 100% 14%, 100% 100%, 0 100%, 0 14%)" }}
        >
          <span aria-hidden className="absolute top-4 h-4 w-4 rounded-full bg-forest-900" />
          <span className="font-hand text-3xl font-bold leading-none">Menu</span>
          <span className="font-hand text-2xl leading-none">Rbma</span>
        </span>
      </Link>
    </motion.div>
  );
}

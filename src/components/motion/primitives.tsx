"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "header" | "p";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

const staggerParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Staggers direct <StaggerItem> children as the group scrolls into view. */
export function Stagger({ children, className, as = "ul" }: { children: React.ReactNode; className?: string; as?: "ul" | "div" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as = "li" }: { children: React.ReactNode; className?: string; as?: "li" | "div" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={staggerChild}>
      {children}
    </Comp>
  );
}

/**
 * Editorial headline reveal: each word rises out of a clipping mask.
 * `animateOnMount` plays immediately (hero) instead of on scroll.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, index: number) => string | undefined;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      aria-label={text}
      role="text"
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName?.(w, i) ?? ""}`}
            variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1.05, ease } } }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Moves its content vertically against the scroll for subtle depth. */
export function Parallax({ children, offset = 60, className }: { children: React.ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-offset, offset]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="relative h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** Reveals an image by opening a clip-path mask from the bottom. */
export function MaskReveal({ children, className, delay = 0, onMount = false }: { children: React.ReactNode; className?: string; delay?: number; onMount?: boolean }) {
  const trigger = onMount ? { animate: { clipPath: "inset(0% 0% 0% 0%)" } } : { whileInView: { clipPath: "inset(0% 0% 0% 0%)" }, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.div className={className} initial={{ clipPath: "inset(100% 0% 0% 0%)" }} {...trigger} transition={{ duration: 1.3, delay, ease }}>
      {children}
    </motion.div>
  );
}

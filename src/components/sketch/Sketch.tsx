"use client";

import { motion } from "motion/react";
import { sketches, type SketchName, type Shape } from "./sketches";

const ease = [0.65, 0, 0.35, 1] as const;

/**
 * Renders a menu-style line drawing. With `draw`, each stroke draws itself in
 * sequence the first time the sketch scrolls into view.
 */
export function Sketch({
  name,
  className,
  strokeWidth = 2.6,
  draw = true,
  delay = 0,
  title,
}: {
  name: SketchName;
  className?: string;
  strokeWidth?: number;
  draw?: boolean;
  delay?: number;
  title?: string;
}) {
  const shapes: Shape[] = sketches[name];
  const anim = (i: number) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition: { pathLength: { duration: 1.1, delay: delay + i * 0.12, ease }, opacity: { duration: 0.01, delay: delay + i * 0.12 } },
        }
      : {};

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {shapes.map((s, i) => {
        switch (s.t) {
          case "path":
            return <motion.path key={i} d={s.d} {...anim(i)} />;
          case "ellipse":
            return <motion.ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} transform={s.r ? `rotate(${s.r} ${s.cx} ${s.cy})` : undefined} {...anim(i)} />;
          case "rect":
            return (
              <motion.rect
                key={i}
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                rx={s.rx}
                transform={s.r ? `rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})` : undefined}
                {...anim(i)}
              />
            );
          case "circle":
            return <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r} {...anim(i)} />;
        }
      })}
    </svg>
  );
}

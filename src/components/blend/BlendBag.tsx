"use client";

import { AnimatePresence, motion } from "motion/react";
import { roastInfo, type HouseBlend, type Size, type StyleId } from "@/data/beans";

// Deterministic "random" layout so server and client render the same specks.
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const rand = seeded(42);
const PODS = Array.from({ length: 7 }, () => ({ x: 104 + rand() * 92, y: 120 + rand() * 96, r: rand() * 180 }));
const SPECKS = Array.from({ length: 14 }, () => ({ x: 98 + rand() * 104, y: 116 + rand() * 104, r: 1.6 + rand() * 1.8 }));

const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)));
  return `rgb(${c(n >> 16)}, ${c((n >> 8) & 255)}, ${c(n & 255)})`;
};

/** Illustrated Rbma coffee bag showing the chosen house blend. */
export function BlendBag({ blend, style, size }: { blend: HouseBlend; style: StyleId; size: Size }) {
  const roast = roastInfo[blend.roast];
  const spiced = style === "spiced";

  return (
    <svg
      viewBox="0 0 300 400"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={`Coffee bag: ${blend.name} blend, ${roast.label} roast, ${spiced ? "spiced" : "plain"}, ${size.label}`}
    >
      <defs>
        <clipPath id="bag-window">
          <circle cx="150" cy="168" r="60" />
        </clipPath>
        <pattern id="grounds" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="rgba(255,255,255,0.18)" />
          <circle cx="5.5" cy="5" r="1" fill="rgba(0,0,0,0.25)" />
        </pattern>
      </defs>

      <ellipse cx="150" cy="388" rx="120" ry="9" fill="rgba(0,0,0,0.25)" />

      <motion.g style={{ originX: 0.5, originY: 1 }} animate={{ scale: size.scale }} transition={{ type: "spring", stiffness: 160, damping: 16 }}>
        {/* Bag body */}
        <path d="M52 64h196l14 300a12 12 0 0 1-12 12H50a12 12 0 0 1-12-12z" fill="#c9ad84" stroke="#7d6446" strokeWidth="2" />
        <path d="M52 64l-14 300a12 12 0 0 0 12 12h14L74 64z" fill="rgba(80,55,30,0.18)" />
        <path d="M248 64l14 300a12 12 0 0 1-12 12h-14L226 64z" fill="rgba(80,55,30,0.12)" />
        {/* Folded, crimped top */}
        <path d="M48 30h204v40H48z" fill="#b8996e" stroke="#7d6446" strokeWidth="2" />
        <path d="M48 30l10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8" fill="none" stroke="#7d6446" strokeWidth="2" strokeLinejoin="round" />
        <path d="M60 50h180" stroke="#7d6446" strokeWidth="1.5" strokeDasharray="4 5" />

        {/* Window into the bag: ground coffee in the blend's roast colour */}
        <circle cx="150" cy="168" r="64" fill="#efe3cc" stroke="#7d6446" strokeWidth="2" />
        <g clipPath="url(#bag-window)">
          <motion.rect x="80" y="100" width="140" height="140" animate={{ fill: shade(roast.color, 10) }} transition={{ duration: 0.6 }} />
          <AnimatePresence initial={false}>
            <motion.g key={`${blend.id}-${style}`} initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 120, damping: 15 }}>
              <rect x="80" y="100" width="140" height="140" fill="url(#grounds)" />
              {spiced &&
                PODS.map((p, i) => (
                  <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
                    <ellipse rx="5" ry="9" fill="#8fae6b" stroke="#5b7a3c" strokeWidth="1" />
                    <path d="M0 -7v14" stroke="#5b7a3c" strokeWidth="0.8" />
                  </g>
                ))}
              {spiced && SPECKS.map((s, i) => <circle key={`s${i}`} cx={s.x} cy={s.y} r={s.r} fill={i % 2 ? "#c2662d" : "#7a3b1d"} />)}
            </motion.g>
          </AnimatePresence>
          <ellipse cx="128" cy="138" rx="26" ry="12" fill="rgba(255,255,255,0.18)" transform="rotate(-30 128 138)" />
        </g>

        {/* Paper label */}
        <g transform="rotate(-2 150 300)">
          <rect x="68" y="246" width="164" height="104" fill="#f3ead4" stroke="#7d6446" strokeWidth="1.5" />
          <rect x="120" y="238" width="60" height="16" fill="rgba(207,224,198,0.85)" transform="rotate(3 150 246)" />
          <text x="150" y="282" textAnchor="middle" fill="#031904" style={{ fontFamily: "var(--font-ruqaa)", fontSize: 22 }}>
            {blend.nameAr}
          </text>
          <text x="150" y="308" textAnchor="middle" fill="#4a3a2e" style={{ fontFamily: "var(--font-caveat)", fontSize: 20, fontWeight: 700 }}>
            {blend.name}
          </text>
          <text x="150" y="327" textAnchor="middle" fill="#4a3a2e" style={{ fontFamily: "var(--font-archivo)", fontSize: 8.5, letterSpacing: 0.6 }}>
            {`${roast.label.toUpperCase()} ROAST · ${spiced ? "SPICED" : "PLAIN"}`}
          </text>
          <text x="150" y="340" textAnchor="middle" fill="#8a7357" style={{ fontFamily: "var(--font-archivo)", fontSize: 8, letterSpacing: 0.6 }}>
            {size.label.toUpperCase()}
          </text>
        </g>
      </motion.g>
    </svg>
  );
}

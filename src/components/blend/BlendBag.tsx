"use client";

import { AnimatePresence, motion } from "motion/react";
import { findChoice, grinds, roasts, spices, weights, type BlendSelection } from "@/data/blend";

// Deterministic "random" layout so server and client render the same beans.
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const rand = seeded(42);
const BEANS = Array.from({ length: 34 }, (_, i) => {
  const row = Math.floor(i / 6);
  const col = i % 6;
  return { x: 92 + col * 23 + (row % 2) * 11 + (rand() - 0.5) * 8, y: 112 + row * 21 + (rand() - 0.5) * 6, r: rand() * 180 };
});
const PODS = Array.from({ length: 7 }, () => ({ x: 104 + rand() * 92, y: 120 + rand() * 96, r: rand() * 180 }));
const SPECKS = Array.from({ length: 16 }, () => ({ x: 98 + rand() * 104, y: 116 + rand() * 104, r: 1.6 + rand() * 1.8 }));

const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)));
  return `rgb(${c(n >> 16)}, ${c((n >> 8) & 255)}, ${c(n & 255)})`;
};

/** Illustrated Rbma coffee bag that reflects the current blend. */
export function BlendBag({ blend, name }: { blend: BlendSelection; name: string }) {
  const roast = findChoice(roasts, blend.roast);
  const spice = findChoice(spices, blend.spice);
  const grind = findChoice(grinds, blend.grind);
  const weight = findChoice(weights, blend.weight);
  const ground = grind.id !== "beans";
  const contentsKey = `${roast.id}-${grind.id}-${spice.id}`;

  return (
    <svg viewBox="0 0 300 400" className="h-auto w-full overflow-visible" role="img" aria-label={`Coffee bag: ${roast.label} roast, ${spice.label}, ${grind.label}, ${weight.label}`}>
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

      <motion.g style={{ originX: 0.5, originY: 1 }} animate={{ scale: weight.scale }} transition={{ type: "spring", stiffness: 160, damping: 16 }}>
        {/* Bag body */}
        <path d="M52 64h196l14 300a12 12 0 0 1-12 12H50a12 12 0 0 1-12-12z" fill="#c9ad84" stroke="#7d6446" strokeWidth="2" />
        <path d="M52 64l-14 300a12 12 0 0 0 12 12h14L74 64z" fill="rgba(80,55,30,0.18)" />
        <path d="M248 64l14 300a12 12 0 0 1-12 12h-14L226 64z" fill="rgba(80,55,30,0.12)" />
        {/* Folded, crimped top */}
        <path d="M48 30h204v40H48z" fill="#b8996e" stroke="#7d6446" strokeWidth="2" />
        <path d="M48 30l10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8" fill="none" stroke="#7d6446" strokeWidth="2" strokeLinejoin="round" />
        <path d="M60 50h180" stroke="#7d6446" strokeWidth="1.5" strokeDasharray="4 5" />

        {/* Window into the bag */}
        <circle cx="150" cy="168" r="64" fill="#efe3cc" stroke="#7d6446" strokeWidth="2" />
        <g clipPath="url(#bag-window)">
          <motion.rect x="80" y="100" width="140" height="140" animate={{ fill: shade(roast.color, ground ? 10 : -10) }} transition={{ duration: 0.6 }} />
          <AnimatePresence initial={false}>
            <motion.g key={contentsKey} initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 120, damping: 15 }}>
              {ground ? (
                <rect x="80" y="100" width="140" height="140" fill="url(#grounds)" />
              ) : (
                BEANS.map((b, i) => (
                  <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}>
                    <ellipse rx="9.5" ry="13" fill={roast.color} stroke={shade(roast.color, -30)} strokeWidth="1.2" />
                    <path d="M0 -11c4 6-4 16 0 22" fill="none" stroke={shade(roast.color, -45)} strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                ))
              )}
              {spice.id !== "plain" &&
                PODS.map((p, i) => (
                  <g key={`p${i}`} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
                    <ellipse rx="5" ry="9" fill="#8fae6b" stroke="#5b7a3c" strokeWidth="1" />
                    <path d="M0 -7v14" stroke="#5b7a3c" strokeWidth="0.8" />
                  </g>
                ))}
              {spice.id === "mixed" && SPECKS.map((s, i) => <circle key={`s${i}`} cx={s.x} cy={s.y} r={s.r} fill={i % 2 ? "#c2662d" : "#7a3b1d"} />)}
            </motion.g>
          </AnimatePresence>
          <ellipse cx="128" cy="138" rx="26" ry="12" fill="rgba(255,255,255,0.18)" transform="rotate(-30 128 138)" />
        </g>

        {/* Paper label */}
        <g transform="rotate(-2 150 300)">
          <rect x="68" y="246" width="164" height="104" fill="#f3ead4" stroke="#7d6446" strokeWidth="1.5" />
          <rect x="120" y="238" width="60" height="16" fill="rgba(207,224,198,0.85)" transform="rotate(3 150 246)" />
          <text x="150" y="282" textAnchor="middle" fill="#031904" style={{ fontFamily: "var(--font-ruqaa)", fontSize: 28 }}>
            ربما
          </text>
          <text x="150" y="308" textAnchor="middle" fill="#4a3a2e" style={{ fontFamily: "var(--font-caveat)", fontSize: 20, fontWeight: 700 }}>
            {name.trim() ? `“${name.trim()}”` : "Your blend"}
          </text>
          <text x="150" y="327" textAnchor="middle" fill="#4a3a2e" style={{ fontFamily: "var(--font-archivo)", fontSize: 8.5, letterSpacing: 0.6 }}>
            {`${roast.label.toUpperCase()} ROAST · ${weight.label.toUpperCase()}`}
          </text>
          <text x="150" y="340" textAnchor="middle" fill="#8a7357" style={{ fontFamily: "var(--font-archivo)", fontSize: 8, letterSpacing: 0.6 }}>
            {`${spice.label.toUpperCase()} · ${grind.label.toUpperCase()}`}
          </text>
        </g>
      </motion.g>
    </svg>
  );
}

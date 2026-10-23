"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { defaultBlend, findChoice, grinds, roasts, spices, weights, type BlendSelection, type Choice } from "@/data/blend";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";
import { BlendBag } from "./BlendBag";

const steps: { key: keyof BlendSelection; title: string; titleAr: string; choices: Choice[] }[] = [
  { key: "roast", title: "Roast", titleAr: "التحميص", choices: roasts },
  { key: "spice", title: "Spice", titleAr: "التحويجة", choices: spices },
  { key: "grind", title: "Grind", titleAr: "الطحنة", choices: grinds },
  { key: "weight", title: "Size", titleAr: "الوزن", choices: weights },
];

export function BlendBuilder({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { add } = useCart();
  const [blend, setBlend] = useState<BlendSelection>(defaultBlend);
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const light = tone === "light";
  const roast = findChoice(roasts, blend.roast);

  const pick = (key: keyof BlendSelection, id: string) => setBlend((b) => ({ ...b, [key]: id }));

  const onKey = (e: React.KeyboardEvent, key: keyof BlendSelection, choices: Choice[]) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const i = choices.findIndex((c) => c.id === blend[key]);
    const next = choices[(i + delta + choices.length) % choices.length];
    pick(key, next.id);
    (e.currentTarget.querySelector(`[data-id="${next.id}"]`) as HTMLElement | null)?.focus();
  };

  const addToOrder = () => {
    const labels = [
      `${roast.label} roast`,
      findChoice(spices, blend.spice).label,
      findChoice(grinds, blend.grind).label,
      findChoice(weights, blend.weight).label,
    ];
    const clean = name.trim();
    add({
      id: `blend:${blend.roast}-${blend.spice}-${blend.grind}-${blend.weight}-${clean.toLowerCase()}`,
      name: clean ? `Rbma blend “${clean}”` : "Rbma blend",
      options: labels,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
        <BlendBag blend={blend} name={name} />
        {/* Strength meter follows the roast. */}
        <div className={cn("mt-6 flex items-center justify-center gap-3 text-sm", light ? "text-ink-soft" : "text-paper/70")}>
          <span className="eyebrow text-[0.58rem]">Strength</span>
          {[1, 2, 3].map((n) => (
            <motion.span
              key={n}
              className="h-2.5 w-8 rounded-full"
              animate={{ backgroundColor: n <= roast.strength ? "#ec9a12" : light ? "rgba(12,26,13,0.15)" : "rgba(244,238,227,0.18)" }}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="space-y-8">
          {steps.map((step, si) => (
            <fieldset key={step.key}>
              <legend className={cn("flex items-baseline gap-3", light ? "text-forest-900" : "text-paper")}>
                <span className="font-hand text-3xl font-bold text-amber-500">{si + 1}</span>
                <span className="font-display text-2xl">{step.title}</span>
                <span lang="ar" className={cn("font-arabic text-sm", light ? "text-ink-soft" : "text-paper/50")}>
                  {step.titleAr}
                </span>
              </legend>
              <div role="radiogroup" aria-label={step.title} className="mt-3 flex flex-wrap gap-2" onKeyDown={(e) => onKey(e, step.key, step.choices)}>
                {step.choices.map((c) => {
                  const active = blend[step.key] === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      tabIndex={active ? 0 : -1}
                      data-id={c.id}
                      onClick={() => pick(step.key, c.id)}
                      className={cn(
                        "relative min-h-12 rounded-full border px-4 py-2 text-left text-sm transition-colors duration-300",
                        active
                          ? "border-amber-500 text-forest-900"
                          : light
                            ? "border-ink/20 text-ink hover:border-ink"
                            : "border-paper/25 text-paper hover:border-paper/70",
                      )}
                    >
                      {active && <motion.span layoutId={`pill-${step.key}`} className="absolute inset-0 rounded-full bg-amber-500" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                      <span className="relative flex items-baseline gap-2">
                        <span className="font-semibold">{c.label}</span>
                        <span lang="ar" className="font-arabic text-xs opacity-70">
                          {c.labelAr}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={blend[step.key]}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn("mt-2 font-hand text-xl", light ? "text-ink-soft" : "text-paper/60")}
                >
                  {findChoice(step.choices, blend[step.key]).hint}
                </motion.p>
              </AnimatePresence>
            </fieldset>
          ))}

          <div>
            <label htmlFor="blend-name" className={cn("flex items-baseline gap-3", light ? "text-forest-900" : "text-paper")}>
              <span className="font-hand text-3xl font-bold text-amber-500">5</span>
              <span className="font-display text-2xl">Name it</span>
              <span className={cn("text-sm", light ? "text-ink-soft" : "text-paper/50")}>(optional — it goes on the label)</span>
            </label>
            <input
              id="blend-name"
              value={name}
              maxLength={22}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mama’s morning cup"
              className={cn(
                "mt-3 h-12 w-full max-w-sm rounded-full border bg-transparent px-5 font-hand text-2xl outline-none transition-colors",
                light ? "border-ink/20 text-forest-900 placeholder:text-ink/30 focus:border-ink" : "border-paper/25 text-paper placeholder:text-paper/30 focus:border-paper",
              )}
            />
          </div>

          <div className="flex flex-wrap items-stretch gap-3 pt-2">
            <div className={cn("flex items-center rounded-full border", light ? "border-ink/20" : "border-paper/25")}>
              <button type="button" aria-label="Fewer bags" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 text-lg">
                −
              </button>
              <span className="w-8 text-center tabular-nums" aria-live="polite" aria-label={`${qty} bag${qty > 1 ? "s" : ""}`}>
                {qty}
              </span>
              <button type="button" aria-label="More bags" onClick={() => setQty((q) => Math.min(20, q + 1))} className="h-12 w-12 text-lg">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={addToOrder}
              className="relative flex min-h-12 flex-1 items-center justify-center overflow-hidden rounded-full bg-amber-500 px-8 text-sm font-semibold text-forest-900 transition-colors hover:bg-amber-400 sm:flex-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={added ? "y" : "n"} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.25 }}>
                  {added ? "Added to your order ✓" : "Add to order"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <p className={cn("text-xs leading-relaxed", light ? "text-ink-soft" : "text-paper/50")}>
            We prepare it the way you picked and confirm the price when you send the order. Pick up at Plaza Mall or ask for delivery.
          </p>
        </div>
      </div>
    </div>
  );
}

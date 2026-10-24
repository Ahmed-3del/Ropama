"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { houseBlends, kiloSizes, roastInfo, styles, type StyleId } from "@/data/beans";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";
import { BlendBag } from "./BlendBag";

type Option = { id: string; label: string; labelAr: string; sub?: string };

/** Keyboard-friendly pill radio group. */
function Choices({ label, options, value, onChange, light }: { label: string; options: Option[]; value: string; onChange: (id: string) => void; light: boolean }) {
  const onKey = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const i = options.findIndex((o) => o.id === value);
    const next = options[(i + delta + options.length) % options.length];
    onChange(next.id);
    (e.currentTarget.querySelector(`[data-id="${next.id}"]`) as HTMLElement | null)?.focus();
  };
  return (
    <div role="radiogroup" aria-label={label} className="mt-3 flex flex-wrap gap-2" onKeyDown={onKey}>
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            data-id={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "relative min-h-12 rounded-full border px-4 py-2 text-left text-sm transition-colors duration-300",
              active ? "border-amber-500 text-forest-900" : light ? "border-ink/20 text-ink hover:border-ink" : "border-paper/25 text-paper hover:border-paper/70",
            )}
          >
            {active && <motion.span layoutId={`pill-${label}`} className="absolute inset-0 rounded-full bg-amber-500" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="relative flex items-baseline gap-2">
              <span lang="ar" className="font-arabic font-semibold">
                {o.labelAr}
              </span>
              <span className="text-xs opacity-75">{o.label}</span>
              {o.sub && <span className="text-[0.65rem] uppercase tracking-wider opacity-60">{o.sub}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function BlendBuilder({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { add } = useCart();
  const [blendId, setBlendId] = useState("rbma");
  const [style, setStyle] = useState<StyleId>("spiced");
  const [sizeId, setSizeId] = useState("quarter");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const light = tone === "light";

  const blend = houseBlends.find((b) => b.id === blendId) ?? houseBlends[0];
  const size = kiloSizes.find((s) => s.id === sizeId) ?? kiloSizes[0];
  const roast = roastInfo[blend.roast];
  const styleInfo = styles.find((s) => s.id === style)!;

  const addToOrder = () => {
    add({
      id: `blend:${blend.id}-${style}-${size.id}`,
      name: `${blend.nameAr} · ${blend.name} blend`,
      options: [`${styleInfo.labelAr} ${styleInfo.label}`, `${roast.label} roast`, `${size.labelAr} (${size.label})`],
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const legend = (n: number, title: string, titleAr: string) => (
    <legend className={cn("flex items-baseline gap-3", light ? "text-forest-900" : "text-paper")}>
      <span className="font-hand text-3xl font-bold text-amber-500">{n}</span>
      <span className="font-display text-2xl">{title}</span>
      <span lang="ar" className={cn("font-arabic text-sm", light ? "text-ink-soft" : "text-paper/50")}>
        {titleAr}
      </span>
    </legend>
  );

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
        <BlendBag blend={blend} style={style} size={size} />
        <div className={cn("mt-6 flex items-center justify-center gap-3 text-sm", light ? "text-ink-soft" : "text-paper/70")}>
          <span className="eyebrow text-[0.58rem]">Roast</span>
          {[1, 2, 3].map((n) => (
            <motion.span
              key={n}
              className="h-2.5 w-8 rounded-full"
              animate={{ backgroundColor: n <= roast.strength ? "#ec9a12" : light ? "rgba(12,26,13,0.15)" : "rgba(244,238,227,0.18)" }}
            />
          ))}
          <span lang="ar" className="font-arabic">
            {roast.labelAr}
          </span>
        </div>
      </div>

      <div className="space-y-8 lg:col-span-7">
        <fieldset>
          {legend(1, "Pick a house blend", "التوليفة")}
          <Choices
            label="Blend"
            light={light}
            value={blendId}
            onChange={setBlendId}
            options={houseBlends.map((b) => ({ id: b.id, label: b.name, labelAr: b.nameAr.replace("توليفة ", ""), sub: roastInfo[b.roast].label }))}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={blend.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={cn("mt-2 font-hand text-xl", light ? "text-ink-soft" : "text-paper/60")}>
              {blend.nameAr} · {roast.label} roast{blend.note ? ` · ${blend.note}` : ""}
            </motion.p>
          </AnimatePresence>
        </fieldset>

        <fieldset>
          {legend(2, "Plain or spiced", "سادة أو محوج")}
          <Choices label="Style" light={light} value={style} onChange={(id) => setStyle(id as StyleId)} options={styles.map((s) => ({ ...s }))} />
        </fieldset>

        <fieldset>
          {legend(3, "Size", "الوزن")}
          <Choices label="Size" light={light} value={sizeId} onChange={setSizeId} options={kiloSizes} />
        </fieldset>

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
          We confirm the price when you send the order. Pick up at Plaza Mall or ask for delivery.
        </p>
      </div>
    </div>
  );
}

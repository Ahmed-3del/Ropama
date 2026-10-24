"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { beanGroups, wholesaleNote, type BeanItem, type Size } from "@/data/beans";
import { useCart } from "@/lib/cart";
import { Tape } from "@/components/scrapbook/Scrapbook";

function BeanRow({ item }: { item: BeanItem }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const onAdd = (size: Size) => {
    add({ id: `bean:${item.id}-${size.id}`, name: `${item.nameAr} · ${item.name}`, options: [`${size.labelAr} (${size.label})`], quantity: 1 });
    setJustAdded(size.id);
    setTimeout(() => setJustAdded(null), 1400);
  };

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-rule py-3">
      <div className="min-w-0">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span lang="ar" className="font-arabic text-lg font-medium text-forest-900">
            {item.nameAr}
          </span>
          <span className="text-sm text-cocoa/80">{item.name}</span>
        </p>
        {item.note && <p className="mt-0.5 text-xs text-cocoa/60">{item.note}</p>}
      </div>
      <div className="flex shrink-0 gap-1.5">
        {item.sizes.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onAdd(s)}
            aria-label={`Add ${item.name}, ${s.label}, to order`}
            className="relative min-h-10 overflow-hidden rounded-full bg-forest-900 px-3.5 text-xs font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={justAdded === s.id ? "ok" : "add"} className="block" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.2 }}>
                {justAdded === s.id ? "Added ✓" : `+ ${s.label}`}
              </motion.span>
            </AnimatePresence>
          </button>
        ))}
      </div>
    </li>
  );
}

/** The full bean list, laid out like the menu's "قائمة البن" pages. */
export function BeanList() {
  return (
    <div className="relative">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 id="bean-list-title" lang="ar" className="font-arabic-display text-6xl text-forest-900 md:text-7xl">
            قائمة البن
          </h2>
          <p className="mt-1 font-hand text-3xl text-cocoa">The full bean list</p>
        </div>
        <p className="relative rotate-2 bg-forest-900 px-5 py-3 text-paper shadow-lg">
          <Tape className="-top-3 left-1/2 w-12 -translate-x-1/2" />
          <span lang="ar" className="block font-arabic text-lg">
            {wholesaleNote.ar}
          </span>
          <span className="block text-xs text-paper/70">{wholesaleNote.en}</span>
        </p>
      </div>

      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {beanGroups.map((g) => (
          <section key={g.slug} aria-labelledby={`beans-${g.slug}`} className="relative bg-notebook/80 px-6 pb-6 pt-8 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.45)]">
            <Tape className="-top-3 left-8 -rotate-3" />
            <h3 id={`beans-${g.slug}`} className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-hand text-4xl font-bold text-forest-900">{g.title}</span>
              <span lang="ar" className="font-arabic text-base text-amber-600">
                {g.titleAr}
              </span>
            </h3>
            {g.intro && <p className="mt-1 text-sm text-cocoa/70">{g.intro}</p>}
            <ul className="mt-3">
              {g.items.map((item) => (
                <BeanRow key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

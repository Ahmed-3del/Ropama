import type { MenuSection } from "@/data/menu";
import { Sketch } from "@/components/sketch/Sketch";
import { LuggageTag } from "@/components/scrapbook/Scrapbook";
import { cn } from "@/lib/format";

/** One menu section as a luggage tag: title, sketch and bilingual items. */
export function MenuTag({ section, compact = false, className }: { section: MenuSection; compact?: boolean; className?: string }) {
  const items = compact ? section.items.slice(0, 5) : section.items;
  return (
    <LuggageTag tone={section.tone} className={cn("h-full", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-hand text-5xl font-bold leading-none">{section.title}</h3>
          <p lang="ar" className="mt-1 font-arabic-display text-2xl opacity-70">
            {section.titleAr}
          </p>
        </div>
        <Sketch name={section.sketch} className="-mr-2 -mt-4 w-24 shrink-0 opacity-80" strokeWidth={3} />
      </div>
      <span aria-hidden className="mt-3 block h-px w-full bg-current opacity-30" />
      {section.intro && <p className="mt-3 font-hand text-xl leading-tight opacity-80">{section.intro}</p>}
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.nameAr} className="flex items-baseline justify-between gap-4">
            <span className="min-w-0">
              <span className="block text-[0.95rem] font-semibold leading-snug">{item.name}</span>
              {item.note && !compact && <span className="block text-xs leading-snug opacity-70">{item.note}</span>}
            </span>
            <span className="flex shrink-0 items-baseline gap-3">
              <span lang="ar" dir="rtl" className="font-arabic text-sm opacity-75">
                {item.nameAr}
              </span>
              {item.price != null && <span className="text-sm font-semibold tabular-nums">{item.price} EGP</span>}
            </span>
          </li>
        ))}
        {compact && section.items.length > items.length && <li className="pt-1 font-hand text-xl opacity-70">+ {section.items.length - items.length} more…</li>}
      </ul>
    </LuggageTag>
  );
}

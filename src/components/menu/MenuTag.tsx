import type { MenuSection } from "@/data/menu";
import { Sketch } from "@/components/sketch/Sketch";
import { LuggageTag } from "@/components/scrapbook/Scrapbook";
import { cn } from "@/lib/format";

/** One menu section as a luggage tag: title, sketch and items. */
export function MenuTag({ section, compact = false, className }: { section: MenuSection; compact?: boolean; className?: string }) {
  const items = compact ? section.items.slice(0, 4) : section.items;
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
      {items.length > 0 ? (
        <ul className="mt-4 space-y-1.5">
          {items.map((item) => (
            <li key={item.name} className="flex items-baseline justify-between gap-3 text-[0.95rem] font-semibold">
              <span>
                {item.name}
                {item.nameAr && (
                  <span lang="ar" className="mr-2 ml-2 font-arabic text-sm font-normal opacity-70">
                    {item.nameAr}
                  </span>
                )}
              </span>
              {item.price != null && <span className="tabular-nums">{item.price} EGP</span>}
            </li>
          ))}
          {compact && section.items.length > items.length && <li className="pt-1 font-hand text-xl opacity-70">+ {section.items.length - items.length} more…</li>}
        </ul>
      ) : null}
      <p className="mt-4 text-sm opacity-75">{section.intro}</p>
    </LuggageTag>
  );
}

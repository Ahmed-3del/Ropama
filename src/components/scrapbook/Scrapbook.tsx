import { cn } from "@/lib/format";

/** A strip of washi tape. Position it with `className` (it is absolutely positioned). */
export function Tape({ className }: { className?: string }) {
  return <span aria-hidden className={cn("tape z-10", className)} />;
}

const tagTones = {
  peach: "bg-peach text-cocoa",
  kraft: "kraft text-cocoa",
  mint: "bg-tape text-forest-900",
  cream: "bg-notebook text-cocoa",
} as const;

export type TagTone = keyof typeof tagTones;

/**
 * Luggage tag, like the ones pinned to Rbma's printed menu:
 * clipped corners, a punched hole and a stitched edge.
 */
export function LuggageTag({ tone = "peach", className, children }: { tone?: TagTone; className?: string; children: React.ReactNode }) {
  return (
    // clip-path would cut off a box-shadow, so the shadow lives on a wrapper as a filter.
    <div className={cn("drop-shadow-[0_14px_18px_rgba(30,20,10,0.35)]", className)}>
      <div className={cn("relative h-full px-6 pb-8 pt-16", tagTones[tone])} style={{ clipPath: "polygon(18% 0, 82% 0, 100% 12%, 100% 100%, 0 100%, 0 12%)" }}>
        <span aria-hidden className="absolute left-1/2 top-5 h-5 w-5 -translate-x-1/2 rounded-full bg-forest-900 ring-4 ring-black/10" />
        <span aria-hidden className="pointer-events-none absolute inset-x-3 bottom-3 top-12 border border-dashed border-current opacity-25" />
        {children}
      </div>
    </div>
  );
}

/** Ruled notebook page with punched holes down one side, like the menu cover. */
export function NotebookPage({ className, children, holes = "right", holeColor = "bg-forest-900" }: { className?: string; children: React.ReactNode; holes?: "left" | "right"; holeColor?: string }) {
  return (
    <div className={cn("notebook relative shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]", className)}>
      <div aria-hidden className={cn("absolute inset-y-6 flex flex-col justify-between", holes === "right" ? "-right-2.5" : "-left-2.5")}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={cn("block h-5 w-5 rounded-full", holeColor)} />
        ))}
      </div>
      {children}
    </div>
  );
}

/** Small paper note, taped at the top. */
export function PaperNote({ className, children, rotate = 0 }: { className?: string; children: React.ReactNode; rotate?: number }) {
  return (
    <div className={cn("relative bg-notebook p-7 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]", className)} style={{ rotate: `${rotate}deg` }}>
      <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      {children}
    </div>
  );
}

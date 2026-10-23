import { SplitWords, Reveal } from "@/components/motion/primitives";
import { cn } from "@/lib/format";

export function SectionHeading({
  eyebrow,
  title,
  arabic,
  intro,
  tone = "dark",
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  arabic?: string;
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
  align?: "left" | "center";
}) {
  const light = tone === "light";
  return (
    <header className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <Reveal y={12}>
        <p className={cn("eyebrow flex items-center gap-3", light ? "text-amber-500" : "text-amber-600", align === "center" && "justify-center")}>
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
          {arabic && (
            <span lang="ar" className="font-arabic text-sm normal-case tracking-normal opacity-80">
              {arabic}
            </span>
          )}
        </p>
      </Reveal>
      <h2 className={cn("mt-5 font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.01em]", light ? "text-paper" : "text-ink")}>
        <SplitWords text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-xl text-base leading-relaxed md:text-lg", light ? "text-paper/70" : "text-ink-soft", align === "center" && "mx-auto")}>{intro}</p>
        </Reveal>
      )}
    </header>
  );
}

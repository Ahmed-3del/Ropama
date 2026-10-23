import { Reveal, SplitWords } from "@/components/motion/primitives";

/** Compact dark masthead for inner pages. */
export function PageHero({ eyebrow, arabic, title, intro, children }: { eyebrow: string; arabic?: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="grain relative mb-4 overflow-hidden bg-forest-900 pb-14 pt-16 text-paper md:pb-20 md:pt-24">
      {arabic && (
        <p aria-hidden lang="ar" className="pointer-events-none absolute -bottom-[0.3em] right-4 select-none font-arabic-display text-[34vw] leading-none text-amber-500/7 md:right-10 md:text-[18vw]">
          {arabic}
        </p>
      )}
      <div className="container-x relative">
        <Reveal y={12}>
          <p className="eyebrow flex items-center gap-3 text-amber-500">
            <span aria-hidden className="h-px w-8 bg-current" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92]">
          <SplitWords text={title} animateOnMount delay={0.1} />
        </h1>
        {intro && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper/60 md:text-base">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

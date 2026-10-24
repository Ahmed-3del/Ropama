import { site } from "@/config/site";
import { houseBlends } from "@/data/beans";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import { BlendBuilder } from "./BlendBuilder";

/** The coffee bean shop: pick one of Rbma's house blends and add it to the order. */
export function BlendSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section id="blend" aria-labelledby="blend-title" className="grain relative scroll-mt-20 overflow-hidden bg-forest-800 py-24 text-paper md:py-32">
      <Sketch name="beans" className="pointer-events-none absolute -left-20 bottom-0 w-104 text-paper/5" strokeWidth={1.4} />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <p className="eyebrow flex items-center gap-3 text-amber-500">
                <span aria-hidden className="h-px w-8 bg-current" />
                The coffee bean shop
              </p>
            </Reveal>
            <H id="blend-title" className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9]">
              <SplitWords text="Pick your" className="block" />
              <span className="block">
                <span lang="ar" className="font-arabic-display text-amber-500">
                  توليفة
                </span>
                .
              </span>
            </H>
          </div>
          <Reveal delay={0.15} className="self-end lg:col-span-5">
            <p className="text-lg leading-relaxed text-paper/70">
              {houseBlends.length} house blends, from light to super dark — each one plain (سادة) or spiced (محوج), by the eighth or the quarter kilo.
            </p>
            <p lang="ar" className="mt-3 font-arabic text-paper/50">
              {site.sloganAr}
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          <BlendBuilder />
        </div>
      </div>
    </section>
  );
}

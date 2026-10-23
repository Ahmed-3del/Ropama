import { site } from "@/config/site";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import { BlendBuilder } from "./BlendBuilder";

/** The coffee-bean shop: build a blend and add it to the order. */
export function BlendSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section id="blend" aria-labelledby="blend-title" className="grain relative scroll-mt-20 overflow-hidden bg-forest-800 py-24 text-paper md:py-32">
      <Sketch name="beans" className="pointer-events-none absolute -left-20 bottom-0 w-[26rem] text-paper/[0.05]" strokeWidth={1.4} />
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
              <SplitWords text="Build your" className="block" />
              <span className="block">
                <SplitWords text="own" className="italic text-amber-500" delay={0.15} />{" "}
                <span lang="ar" className="font-arabic-display text-amber-500">
                  توليفة
                </span>
                .
              </span>
            </H>
          </div>
          <Reveal delay={0.15} className="self-end lg:col-span-5">
            <p className="text-lg leading-relaxed text-paper/70">
              Our coffee is a blend — and yours can be too. Choose the roast, the spice and the grind, and we’ll prepare a bag just the way you like it.
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

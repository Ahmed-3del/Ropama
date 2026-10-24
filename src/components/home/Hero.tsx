import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import { NotebookPage, Tape } from "@/components/scrapbook/Scrapbook";
import { FadeIn } from "./FadeIn";
import { HandwrittenLine, SwingingTag } from "./HeroMotion";
import { MaybeTicker } from "./MaybeTicker";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative overflow-hidden bg-forest-900 text-paper">
      <FadeIn delay={0.6} duration={2} className="pointer-events-none absolute bottom-[-6vw] left-[-3vw] select-none">
        <p aria-hidden lang="ar" className="font-arabic-display text-[52vw] leading-[0.9] text-amber-500/6 lg:text-[30vw]">
          {site.nameAr}
        </p>
      </FadeIn>

      <div className="container-x relative grid min-h-[calc(100svh-6.5rem)] items-center gap-14 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-6">
          <FadeIn delay={0.15}>
            <p className="eyebrow flex items-center gap-3 text-amber-500">
              <span aria-hidden className="h-px w-10 bg-amber-500" />
              Café & coffee beans · Plaza Mall, {site.city}
            </p>
          </FadeIn>

          <h1 id="hero-title" className="mt-7 font-display text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.86] tracking-[-0.02em]">
            <SplitWords text="It’s coffee" animateOnMount delay={0.25} className="block" />
            <SplitWords text="time." animateOnMount delay={0.45} className="block italic text-amber-500" />
          </h1>

          <FadeIn delay={0.85}>
            <p className="mt-8 font-hand text-[clamp(1.9rem,3.6vw,2.8rem)] leading-none text-paper/90">
              <MaybeTicker words={["a latte.", "a mojito.", "a house blend.", "a long sit.", "today."]} />
            </p>
            <p lang="ar" dir="rtl" className="mt-6 max-w-md text-left text-lg text-paper/55">
              {site.sloganAr}
            </p>
          </FadeIn>

          <FadeIn delay={1} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/menu">See the menu</ButtonLink>
            <ButtonLink href="/beans" variant="outline-light" arrow={false}>
              Shop coffee beans
            </ButtonLink>
          </FadeIn>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6">
          <FadeIn delay={0.3} duration={1.2}>
            <NotebookPage className="-rotate-3 px-8 pb-10 pt-12 text-cocoa sm:px-14">
              <Tape className="-top-3 left-10 -rotate-6" />
              <Tape className="-top-3 right-12 rotate-3" />

              <HandwrittenLine text={site.menuLine} className="font-hand text-[clamp(1.6rem,3.4vw,2.3rem)] leading-8 text-forest-900" />
              <p lang="ar" dir="rtl" className="mt-2 font-arabic-display text-2xl leading-8 text-forest-900/70">
                {site.menuLineAr}
              </p>

              <div className="relative mt-6 grid grid-cols-[1fr_auto] items-end gap-4">
                <Sketch name="cup" className="w-full max-w-[15rem] text-cocoa" delay={1.4} strokeWidth={2.2} />
                {/* The real logo, taped onto the page. */}
                <div className="relative rotate-6">
                  <Tape className="-top-3 left-1/2 w-16 -translate-x-1/2 rotate-2" />
                  <Image src={site.logo.portrait.src} alt={`${site.legalName} logo`} width={site.logo.portrait.width} height={site.logo.portrait.height} preload className="h-36 w-auto shadow-lg sm:h-44" />
                </div>
              </div>

              <Link href="/visit" className="mt-6 block font-hand text-2xl text-cocoa/80 hover:text-forest-900">
                Plaza Mall · first floor · {site.contact.phoneDisplay}
              </Link>
            </NotebookPage>
          </FadeIn>

          <SwingingTag href="/menu" className="absolute -bottom-10 -left-4 sm:-left-10" />
        </div>
      </div>
    </section>
  );
}

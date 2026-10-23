import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { MaskReveal, Reveal, SplitWords } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import { PaperNote, Tape } from "@/components/scrapbook/Scrapbook";
import type { SketchName } from "@/components/sketch/sketches";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.legalName} is a café and coffee bean shop at Plaza Mall, ${site.city}. ${site.slogan}`,
  alternates: site.url ? { canonical: "/about" } : undefined,
};

const pillars: { sketch: SketchName; title: string; body: string; href: string; cta: string }[] = [
  { sketch: "latte", title: "The café", body: "A latte, a mojito or a milkshake at Plaza Mall — stay a while.", href: "/menu", cta: "See the menu" },
  { sketch: "beans", title: "The beans", body: "Coffee to take home, blended the way you like it.", href: "/beans", cta: "Build your blend" },
  { sketch: "heart", title: "The people", body: "Guests keep mentioning the same thing: how warm the welcome is.", href: "/visit", cta: "Come say hi" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" arabic={site.nameAr} title="Rbma means “maybe.”" />

      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <MaskReveal className="relative mx-auto w-full max-w-xs -rotate-2 lg:col-span-4">
          <Tape className="-top-3 left-1/2 z-10 -translate-x-1/2" />
          <Image
            src={site.logo.portrait.src}
            alt={`${site.legalName} logo: ربما in white calligraphy inside an amber frame, with coffee beans and steam, and “It’s coffee time”`}
            width={site.logo.portrait.width}
            height={site.logo.portrait.height}
            className="w-full shadow-2xl"
          />
        </MaskReveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95]">
            <SplitWords text="Maybe a quick cup. Maybe a long sit. Maybe a blend to take home." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              <span lang="ar" className="font-arabic-display text-2xl text-forest-600">
                ربما
              </span>{" "}
              is the Arabic word for “maybe” — and {site.name} is a café and coffee bean shop on the first floor of Plaza Mall in {site.city}, built around one idea: <em>it’s coffee time</em>, whatever that looks like for you today.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">Even our menu opens with a maybe:</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 max-w-lg">
            <PaperNote rotate={-1.5}>
              <p className="font-hand text-4xl leading-tight text-forest-900">“{site.menuLine}”</p>
            </PaperNote>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="mt-12 border-l-2 border-amber-500 pl-6">
              <p lang="ar" dir="rtl" className="text-left font-arabic text-2xl leading-relaxed">
                {site.sloganAr}
              </p>
              <p className="mt-2 font-display text-2xl italic text-ink-soft">{site.slogan}</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="kraft py-20 text-cocoa md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <Sketch name={p.sketch} className="w-28 text-forest-900" delay={i * 0.2} />
              <h3 className="mt-4 font-hand text-5xl font-bold text-forest-900">{p.title}</h3>
              <p className="mt-2 max-w-xs">{p.body}</p>
              <ButtonLink href={p.href} variant="outline-dark" className="mt-6">
                {p.cta}
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

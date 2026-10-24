import type { Metadata } from "next";
import { site } from "@/config/site";
import { menu } from "@/data/menu";
import { MenuTag } from "@/components/menu/MenuTag";
import { NotebookPage, Tape } from "@/components/scrapbook/Scrapbook";
import { Reveal } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import { ButtonLink } from "@/components/ui/Button";
import { HandwrittenLine } from "@/components/home/HeroMotion";

export const metadata: Metadata = {
  title: "Menu",
  description: `The ${site.legalName} menu at Plaza Mall, ${site.city}: Turkish and Italian coffee, iced coffee, mojitos, smoothies, milkshakes, breakfast sandwiches and sweets.`,
  alternates: site.url ? { canonical: "/menu" } : undefined,
};

const tilts = ["-rotate-1", "rotate-1", "rotate-[-1.5deg]", "rotate-2"];

export default function MenuPage() {
  return (
    <div className="kraft min-h-screen pb-28 text-cocoa">
      {/* Cover, after the printed menu */}
      <section className="container-x pt-14 md:pt-20">
        <NotebookPage holes="left" holeColor="bg-kraft" className="mx-auto max-w-3xl -rotate-1 px-10 pb-12 pt-14 sm:pl-24">
          <Tape className="-top-3 right-16 rotate-6" />
          <h1 className="sr-only">Menu — {site.legalName}</h1>
          <HandwrittenLine text={site.menuLine} delay={0.3} className="font-hand text-[clamp(1.8rem,4vw,2.6rem)] leading-8 text-forest-900" />
          <p lang="ar" dir="rtl" className="mt-2 font-arabic-display text-2xl leading-8 text-forest-900/70">
            {site.menuLineAr}
          </p>
          <div className="mt-8 flex items-end justify-between gap-6">
            <Sketch name="cup" className="w-40 text-cocoa sm:w-56" delay={0.8} />
            <div className="text-right">
              <p className="font-hand text-6xl font-bold leading-none text-forest-900">Menu</p>
              <p lang="ar" className="font-arabic-display text-4xl text-amber-600">
                {site.nameAr}
              </p>
              <p className="mt-3 text-sm">{site.contact.address}</p>
              <a href={`tel:${site.contact.phone}`} className="text-sm underline-offset-4 hover:underline">
                {site.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </NotebookPage>

        <nav aria-label="Menu sections" className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
          {menu.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="rounded-full bg-notebook/70 px-5 py-2 font-hand text-2xl font-bold text-forest-900 transition-colors hover:bg-forest-900 hover:text-paper">
              {s.title}
            </a>
          ))}
        </nav>
      </section>

      {/* Masonry columns so tags of different lengths pack like a pinboard. */}
      <section className="container-x mt-16 gap-10 md:columns-2">
        {menu.map((section, i) => (
          <Reveal key={section.slug} delay={(i % 2) * 0.1} className="mb-14 break-inside-avoid">
            <div id={section.slug} className={`scroll-mt-28 ${tilts[i % tilts.length]}`}>
              <MenuTag section={section} />
            </div>
          </Reveal>
        ))}
      </section>

      <Reveal className="container-x mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-hand text-4xl font-bold text-forest-900">Hungry for more?</p>
          <p className="mt-3">
            For takeaway or delivery, call us on <a href={`tel:${site.contact.phone}`} className="font-semibold underline underline-offset-4">{site.contact.phoneDisplay}</a>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/beans" variant="dark">
              Take coffee home
            </ButtonLink>
            <ButtonLink href="/visit" variant="outline-dark" arrow={false}>
              Opening hours
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

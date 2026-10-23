import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import { Tape } from "@/components/scrapbook/Scrapbook";
import { HoursTable, OpenBadge } from "./OpeningHours";

/** Location, live hours and contact, laid out like a café receipt. */
export function FindUs({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { contact } = site;
  const H = headingLevel;
  return (
    <section aria-labelledby="find-title" className="grain relative overflow-hidden bg-forest-800 py-24 text-paper md:py-32">
      <Sketch name="kanaka" className="pointer-events-none absolute -right-16 top-10 hidden w-md text-paper/6 lg:block" strokeWidth={1.6} />
      <div className="container-x relative grid items-start gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal y={12}>
            <p className="eyebrow flex items-center gap-3 text-amber-500">
              <span aria-hidden className="h-px w-8 bg-current" />
              Find us
            </p>
          </Reveal>
          <H id="find-title" className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9]">
            <SplitWords text="Plaza Mall," className="block" />
            <SplitWords text="first floor." className="block italic text-amber-500" delay={0.15} />
          </H>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-paper/70">
              {contact.addressLine2}. Head up to the upper first floor — and follow the smell of coffee.
            </p>
            <p lang="ar" className="mt-2 font-arabic text-paper/50">
              {contact.addressAr}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Services">
              {site.services.map((s) => (
                <li key={s} className="rounded-full border border-paper/25 px-4 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={contact.mapUrl}>Open in Google Maps</ButtonLink>
              <ButtonLink href={`tel:${contact.phone}`} variant="outline-light" arrow={false}>
                Call {contact.phoneDisplay}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Receipt */}
        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <div className="relative rotate-1 bg-notebook px-8 pb-10 pt-10 text-cocoa shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 80% 97%, 75% 100%, 70% 97%, 65% 100%, 60% 97%, 55% 100%, 50% 97%, 45% 100%, 40% 97%, 35% 100%, 30% 97%, 25% 100%, 20% 97%, 15% 100%, 10% 97%, 5% 100%, 0 97%)" }}>
            <Tape className="-top-1 left-1/2 -translate-x-1/2 -rotate-2" />
            <p className="text-center font-arabic-display text-4xl text-forest-900">{site.nameAr}</p>
            <p className="eyebrow mt-1 text-center text-[0.6rem]">{site.tagline}</p>
            <div className="my-5 flex justify-center">
              <OpenBadge />
            </div>
            <HoursTable />
            <p className="mt-6 text-center font-hand text-2xl">Thank you — see you soon!</p>
            {site.ratings && (
              <p className="mt-3 text-center text-xs">
                ★ {site.ratings.google.score} on Google · {site.ratings.google.count} reviews
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

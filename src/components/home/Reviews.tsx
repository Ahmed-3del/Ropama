import { site } from "@/config/site";
import { PaperNote } from "@/components/scrapbook/Scrapbook";
import { Reveal } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import { ButtonLink } from "@/components/ui/Button";

export function Reviews() {
  const r = site.ratings;
  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Sketch name="heart" className="w-20 text-amber-500" strokeWidth={4} />
            <h2 id="reviews-title" className="mt-4 font-hand text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.9] text-forest-900">
              Kind words, <br />
              written by guests.
            </h2>
            {r && (
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
                <div>
                  <dt className="eyebrow text-[0.58rem] text-ink-soft">Google</dt>
                  <dd className="mt-1 font-display text-5xl">
                    {r.google.score}
                    <span className="text-2xl text-amber-500"> ★</span>
                  </dd>
                  <dd className="text-xs text-ink-soft">{r.google.count} reviews</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.58rem] text-ink-soft">Facebook</dt>
                  <dd className="mt-1 font-display text-5xl">
                    {r.facebook.score}
                    <span className="text-2xl text-amber-500"> ★</span>
                  </dd>
                  <dd className="text-xs text-ink-soft">{site.socialStats.facebookFollowers} followers</dd>
                </div>
              </dl>
            )}
            <ButtonLink href={site.contact.facebook} variant="outline-dark" className="mt-8" arrow={false}>
              Follow @RbmaASW
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
          {site.reviews.map((rev, i) => (
            <Reveal key={rev.author} delay={i * 0.12} className={i % 2 ? "sm:mt-16" : ""}>
              <PaperNote rotate={i % 2 ? 2 : -2.5}>
                <blockquote>
                  <p className="font-hand text-[1.75rem] leading-[1.15] text-forest-900">“{rev.quote}”</p>
                  <footer className="mt-5 text-sm text-ink-soft">
                    — {rev.author}, <cite className="not-italic">{rev.source}</cite>
                  </footer>
                </blockquote>
              </PaperNote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

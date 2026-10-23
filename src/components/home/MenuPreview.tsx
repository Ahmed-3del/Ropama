import Link from "next/link";
import { menu } from "@/data/menu";
import { MenuTag } from "@/components/menu/MenuTag";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { ButtonLink } from "@/components/ui/Button";

// A slightly different angle per tag, like they were pinned by hand.
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export function MenuPreview() {
  return (
    <section aria-labelledby="menu-title" className="kraft relative overflow-hidden py-24 text-cocoa md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-cocoa/70">
              <span aria-hidden className="h-px w-8 bg-current" />
              From the menu
              <span lang="ar" className="font-arabic text-sm normal-case tracking-normal">
                المنيو
              </span>
            </p>
            <h2 id="menu-title" className="mt-4 font-hand text-[clamp(3.4rem,8vw,6.5rem)] font-bold leading-[0.85] text-forest-900">
              Something cold, <br className="hidden sm:block" />
              something warm.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/menu" variant="dark">
              The full menu
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((section, i) => (
            <StaggerItem key={section.slug}>
              <Link href={`/menu#${section.slug}`} className={`block h-full transition-transform duration-500 ease-out-expo hover:-translate-y-2 hover:rotate-0 ${tilts[i % tilts.length]}`}>
                <MenuTag section={section} compact />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/config/site";
import { menu } from "@/data/menu";
import { Sketch } from "@/components/sketch/Sketch";

export function SiteFooter() {
  const { contact } = site;
  return (
    <footer className="grain relative overflow-hidden bg-forest-900 text-paper">
      <div className="container-x pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image src={site.logo.portrait.src} alt={`${site.legalName} logo`} width={site.logo.portrait.width} height={site.logo.portrait.height} className="h-36 w-auto" />
            <p className="mt-6 max-w-xs font-hand text-2xl leading-tight text-paper/80">“{site.menuLine}”</p>
            <p lang="ar" dir="rtl" className="mt-3 max-w-xs text-left text-sm text-paper/45">
              {site.sloganAr}
            </p>
          </div>

          <FooterColumn title="Explore" className="md:col-span-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Menu" className="md:col-span-2">
            {menu.map((s) => (
              <li key={s.slug}>
                <Link href={`/menu#${s.slug}`} className="link-underline">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/beans" className="link-underline">
                Coffee beans
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Find us" className="md:col-span-4">
            <li>
              <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                {contact.address}
              </a>
              <span className="block text-paper/50">{contact.addressLine2}</span>
              <span lang="ar" className="block font-arabic text-paper/50">
                {contact.addressAr}
              </span>
            </li>
            <li>
              <a href={`tel:${contact.phone}`} className="link-underline">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="text-paper/60">Sat–Wed 9 AM – 12 AM · Thu 9 AM – 1 AM · Fri 3 PM – 1 AM</li>
            <li className="flex gap-5">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">
                Facebook
              </a>
              <a href={contact.messenger} target="_blank" rel="noopener noreferrer" className="link-underline">
                Messenger
              </a>
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Instagram
                </a>
              )}
            </li>
          </FooterColumn>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none relative mt-16 select-none overflow-hidden">
        <Sketch name="cup" draw={false} className="absolute bottom-6 left-1/2 hidden w-40 -translate-x-1/2 text-paper/10 md:block" strokeWidth={1.6} />
        <p className="container-x flex items-end justify-between font-display text-[22vw] leading-[0.75] text-paper/6 md:text-[17vw]">
          <span>{site.name}</span>
          <span lang="ar" className="font-arabic-display text-[0.8em] leading-none">
            {site.nameAr}
          </span>
        </p>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name} <span lang="ar">{site.nameAr}</span> · Plaza Mall, {site.city}
          </p>
          <p>{site.tagline}.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="eyebrow text-[0.62rem] text-amber-500">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-paper/80">{children}</ul>
    </div>
  );
}

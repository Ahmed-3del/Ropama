import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { HoursTable, OpenBadge } from "@/components/visit/OpeningHours";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { NotebookPage, Tape } from "@/components/scrapbook/Scrapbook";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${site.legalName} on ${site.contact.phoneDisplay} or message us on Facebook — takeaway, delivery and coffee bean orders at Plaza Mall, ${site.city}.`,
  alternates: site.url ? { canonical: "/contact" } : undefined,
};

export default function ContactPage() {
  const { contact } = site;
  const channels = [
    { label: "Call", detail: contact.phoneDisplay, href: `tel:${contact.phone}` },
    contact.whatsapp && { label: "WhatsApp", detail: `+${contact.whatsapp}`, href: `https://wa.me/${contact.whatsapp}` },
    { label: "Messenger", detail: "Message us on Facebook", href: contact.messenger },
    { label: "Facebook", detail: `facebook.com/RbmaASW · ${site.socialStats.facebookFollowers} followers`, href: contact.facebook },
    contact.instagram && { label: "Instagram", detail: "Follow us", href: contact.instagram },
    { label: "Visit", detail: `${contact.address}, ${contact.addressLine2}`, href: contact.mapUrl },
  ].filter(Boolean) as { label: string; detail: string; href: string }[];

  return (
    <>
      <PageHero eyebrow="Contact" arabic="تواصل" title="Say hello. Order a coffee." />

      <section className="container-x grid gap-16 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Stagger className="divide-y divide-ink/10 border-y border-ink/10">
            {channels.map((c) => (
              <StaggerItem key={c.label}>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center justify-between gap-6 py-6">
                  <span>
                    <span className="block font-hand text-5xl font-bold text-forest-900 transition-colors group-hover:text-amber-600 md:text-6xl">{c.label}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{c.detail}</span>
                  </span>
                  <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:-rotate-45 group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-paper">
                    →
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <NotebookPage holes="left" holeColor="bg-paper" className="rotate-1 px-8 pb-10 pt-10 pl-14 text-cocoa">
            <Tape className="-top-3 right-8 rotate-3" />
            <h2 className="font-hand text-4xl font-bold text-forest-900">Opening hours</h2>
            <div className="mt-3">
              <OpenBadge />
            </div>
            <HoursTable className="mt-4" />
            <p className="mt-6 font-hand text-2xl leading-tight">Takeaway & delivery — just call.</p>
          </NotebookPage>
        </Reveal>
      </section>
    </>
  );
}

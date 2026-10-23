import type { Metadata } from "next";
import { site } from "@/config/site";
import { FindUs } from "@/components/visit/FindUs";
import { Reviews } from "@/components/home/Reviews";

export const metadata: Metadata = {
  title: `Visit us at Plaza Mall, ${site.city}`,
  description: `${site.legalName} is on the upper first floor of Plaza Mall, Corniche El Nil, ${site.city}. Opening hours, directions and phone.`,
  alternates: site.url ? { canonical: "/visit" } : undefined,
};

export default function VisitPage() {
  return (
    <>
      <FindUs headingLevel="h1" />
      <Reviews />
    </>
  );
}

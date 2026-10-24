import type { Metadata } from "next";
import { site } from "@/config/site";
import { BlendSection } from "@/components/blend/BlendSection";
import { BeanList } from "@/components/blend/BeanList";
import { Reveal } from "@/components/motion/primitives";
import { Sketch } from "@/components/sketch/Sketch";
import type { SketchName } from "@/components/sketch/sketches";

export const metadata: Metadata = {
  title: "Coffee beans",
  description: `Rbma’s house coffee blends (الرايق، نزار، بلازا، ربما، سوبر غامق، ملوكي), single origins, specialty coffee, French and instant coffee at Plaza Mall, ${site.city}. Order by message.`,
  alternates: site.url ? { canonical: "/beans" } : undefined,
};

const howTo: { sketch: SketchName; title: string; body: string }[] = [
  { sketch: "beans", title: "Choose", body: "A house blend, an origin or anything on the bean list — by the eighth or quarter kilo." },
  { sketch: "jar", title: "Send", body: "Your order goes to us as a message. No payment online." },
  { sketch: "kanaka", title: "Brew", body: "We confirm the price, then you pick it up at Plaza Mall or ask for delivery." },
];

export default function BeansPage() {
  return (
    <>
      <BlendSection headingLevel="h1" />

      <section aria-labelledby="bean-list-title" className="kraft py-24 text-cocoa md:py-32">
        <div className="container-x">
          <BeanList />
        </div>
      </section>

      <section aria-labelledby="how-title" className="notebook py-24 text-cocoa">
        <div className="container-x">
          <h2 id="how-title" className="font-hand text-6xl font-bold text-forest-900">
            How ordering works
          </h2>
          <ol className="mt-12 grid gap-12 md:grid-cols-3">
            {howTo.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12}>
                <Sketch name={s.sketch} className="w-28 text-forest-900" delay={i * 0.2} />
                <p className="mt-4 font-hand text-4xl font-bold text-amber-600">
                  {i + 1}. {s.title}
                </p>
                <p className="mt-2 max-w-xs">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { MaybeStrip } from "@/components/home/MaybeStrip";
import { MenuPreview } from "@/components/home/MenuPreview";
import { BlendSection } from "@/components/blend/BlendSection";
import { Reviews } from "@/components/home/Reviews";
import { FindUs } from "@/components/visit/FindUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MaybeStrip />
      <MenuPreview />
      <BlendSection />
      <Reviews />
      <FindUs />
    </>
  );
}

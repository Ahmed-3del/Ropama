import { ButtonLink } from "@/components/ui/Button";
import { Sketch } from "@/components/sketch/Sketch";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[70vh] items-center overflow-hidden bg-forest-900 text-paper">
      <div className="container-x grid items-center gap-10 py-24 md:grid-cols-2">
        <div>
          <p lang="ar" className="font-arabic-display text-7xl text-amber-500/80 md:text-9xl">
            ربما…
          </p>
          <h1 className="mt-6 font-display text-5xl md:text-7xl">Maybe it moved.</h1>
          <p className="mt-4 max-w-md text-paper/65">We couldn’t find that page. The coffee is still where you left it.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/menu">See the menu</ButtonLink>
            <ButtonLink href="/" variant="outline-light" arrow={false}>
              Back home
            </ButtonLink>
          </div>
        </div>
        <Sketch name="cup" className="mx-auto w-64 text-paper/30" />
      </div>
    </section>
  );
}

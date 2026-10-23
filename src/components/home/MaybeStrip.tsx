const phrases = ["maybe a latte", "ربما", "maybe a mojito", "it’s coffee time", "maybe your own blend", "ربما", "maybe a milkshake", "مزاجك مظبوط"];

/** Hand-written ribbon of "maybe"s on ruled paper. Pauses on hover; static for reduced motion. */
export function MaybeStrip() {
  return (
    <div className="notebook group -my-1 overflow-hidden border-y border-cocoa/10 py-5" aria-hidden>
      <div className="flex w-max animate-marquee [animation-duration:55s] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {phrases.map((p, i) => (
              <span key={i} className="flex items-center whitespace-nowrap px-8 text-forest-900">
                <span className={/[؀-ۿ]/.test(p) ? "font-arabic-display text-4xl text-amber-600" : "font-hand text-4xl font-bold"}>{p}</span>
                <span className="ml-16 text-xl text-amber-500">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

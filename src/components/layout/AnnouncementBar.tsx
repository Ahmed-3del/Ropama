import { site } from "@/config/site";

/** Slow, pausable ticker. Duplicated once so the loop is seamless. */
export function AnnouncementBar() {
  const items = [...site.announcements, ...site.announcements];
  return (
    <div className="group relative overflow-hidden bg-amber-500 text-forest-900" role="region" aria-label="Announcements">
      <ul className="sr-only">
        {site.announcements.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <div aria-hidden className="flex w-max animate-marquee py-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((a, i) => (
              <span key={i} className="eyebrow flex items-center whitespace-nowrap px-6 text-[0.62rem]">
                {a}
                <span className="ml-12 inline-block h-1 w-1 rounded-full bg-forest-900/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

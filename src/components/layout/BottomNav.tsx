"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

const icons = {
  home: (
    <>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6.5 10v9h11v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  menu: (
    <>
      <path d="M5 9h12v4a6 6 0 0 1-12 0z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H16.5" />
      <path d="M9 3.5c-1 1.2 1 1.8 0 3M13 3.5c-1 1.2 1 1.8 0 3" />
    </>
  ),
  visit: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  order: (
    <>
      <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </>
  ),
};

function Icon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

/** App-style navigation for phones and tablets. Hides while scrolling down, returns on scroll up. */
export function BottomNav() {
  const pathname = usePathname();
  const { count, open: openCart } = useCart();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Reveal the bar when something is added, so the new count on "Order" is seen.
  const [lastCount, setLastCount] = useState(count);
  if (count !== lastCount) {
    setLastCount(count);
    setHidden(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const atBottom = typeof window !== "undefined" && window.innerHeight + y >= document.documentElement.scrollHeight - 40;
    // Always show near the top and at the very bottom of the page.
    if (y < 120 || atBottom) setHidden(false);
    else if (y > prev + 6) setHidden(true);
    else if (y < prev - 6) setHidden(false);
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const links = [
    { href: "/", label: "Home", icon: icons.home },
    { href: "/menu", label: "Menu", icon: icons.menu },
    { href: "/visit", label: "Visit", icon: icons.visit },
  ];

  const tab = (href: string, label: string, icon: React.ReactNode) => {
    const active = isActive(href);
    return (
      <Link key={href} href={href} aria-current={active ? "page" : undefined} className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2">
        {active && <motion.span layoutId="bottom-nav-active" className="absolute inset-x-3 inset-y-1 rounded-2xl bg-paper/10" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
        <Icon className={cn("relative transition-colors", active ? "text-amber-500" : "text-paper/70")}>{icon}</Icon>
        <span className={cn("relative text-[0.65rem] font-semibold tracking-wide", active ? "text-paper" : "text-paper/60")}>{label}</span>
      </Link>
    );
  };

  const blendActive = isActive("/beans");

  return (
    <motion.nav
      aria-label="Quick navigation"
      initial={{ y: "120%" }}
      animate={{ y: hidden ? "120%" : "0%" }}
      transition={{ duration: 0.45, ease }}
      className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="relative mx-auto flex max-w-md items-stretch rounded-[1.75rem] border border-paper/10 bg-forest-900/95 px-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md">
        {tab(links[0].href, links[0].label, links[0].icon)}
        {tab(links[1].href, links[1].label, links[1].icon)}

        {/* Raised centre action: the blend builder. */}
        <div className="flex flex-1 justify-center">
          <Link href="/beans" aria-current={blendActive ? "page" : undefined} className="group -mt-6 flex flex-col items-center gap-1 pb-2" aria-label="Build your blend">
            <span
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full border-4 border-paper bg-amber-500 text-forest-900 shadow-lg transition-transform duration-300 group-active:scale-90",
                blendActive && "ring-2 ring-amber-300 ring-offset-2 ring-offset-forest-900",
              )}
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
                <ellipse cx="9" cy="12" rx="3.6" ry="5.2" transform="rotate(-20 9 12)" />
                <path d="M8.2 7.4c1.6 2.4-1 6.6.6 9.2" transform="rotate(-20 9 12)" />
                <ellipse cx="15.5" cy="12" rx="3.6" ry="5.2" transform="rotate(20 15.5 12)" />
                <path d="M14.7 7.4c1.6 2.4-1 6.6.6 9.2" transform="rotate(20 15.5 12)" />
              </svg>
            </span>
            <span className="font-hand text-base font-bold leading-none text-amber-500">Blend</span>
          </Link>
        </div>

        {tab(links[2].href, links[2].label, links[2].icon)}

        <button type="button" onClick={openCart} aria-label={`Open order, ${count} item${count === 1 ? "" : "s"}`} className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2">
          <span className="relative">
            <Icon className="text-paper/70">{icons.order}</Icon>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                  className="absolute -right-2.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-forest-900"
                >
                  {count > 99 ? "99+" : count}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span className="text-[0.65rem] font-semibold tracking-wide text-paper/60">Order</span>
        </button>
      </div>
    </motion.nav>
  );
}

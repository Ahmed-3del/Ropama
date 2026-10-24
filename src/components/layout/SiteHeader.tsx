"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { count, open: openCart } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState(72);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className={cn(
          "sticky top-0 z-40 text-paper transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled || menuOpen ? "bg-forest-900/95 shadow-[0_1px_0_rgba(244,238,227,0.08)] backdrop-blur-md" : "bg-forest-900",
        )}
      >
        <div className="container-x flex h-18 items-center justify-between gap-6">
          <Link href="/" className="relative z-10 flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Image src={site.logo.portrait.src} alt="" width={site.logo.portrait.width} height={site.logo.portrait.height} className="h-12 w-auto" preload />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-xl tracking-wide">{site.name}</span>
              <span className="eyebrow mt-1 text-[0.55rem] text-amber-500">{site.tagline}</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="relative block px-3.5 py-2 text-[0.82rem] font-medium tracking-wide text-paper/80 transition-colors hover:text-paper aria-[current=page]:text-paper"
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-px bg-amber-500" transition={{ duration: 0.5, ease }} />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton
              label={`Open order, ${count} item${count === 1 ? "" : "s"}`}
              onClick={openCart}
              badge={
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute right-1 top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-forest-900"
                    >
                      {count > 99 ? "99+" : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              }
            >
              <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8z" />
              <path d="M9 10V7a3 3 0 0 1 6 0v3" />
            </IconButton>
            <Link
              href="/beans"
              className="ml-2 hidden min-h-10 items-center rounded-full bg-amber-500 px-5 text-[0.8rem] font-semibold text-forest-900 transition-colors hover:bg-amber-400 md:inline-flex"
            >
              Coffee beans
            </Link>
            <button
              type="button"
              className="relative ml-1 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 72);
                setMenuOpen((o) => !o);
              }}
            >
              <span className={cn("absolute h-px w-6 bg-paper transition-transform duration-500 ease-out-expo", menuOpen ? "rotate-45" : "-translate-y-1.5")} />
              <span className={cn("absolute h-px w-6 bg-paper transition-transform duration-500 ease-out-expo", menuOpen ? "-rotate-45" : "translate-y-1.5")} />
            </button>
          </div>
        </div>

      </motion.header>

      {/* Lives outside the header: its transform and backdrop-filter would otherwise trap `position: fixed`. */}
      <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.7, ease }}
              style={{ top: menuTop }}
              className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-forest-900 text-paper lg:hidden"
            >
              <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between pb-10 pt-6">
                <ul>
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.05 }}
                      className="border-b border-paper/10"
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="flex items-baseline justify-between py-4 font-display text-4xl text-paper/90 aria-[current=page]:text-amber-500"
                      >
                        {item.label}
                        <span className="eyebrow text-[0.6rem] text-paper/40">0{i + 1}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-3">
                  <Link href="/beans" className="flex min-h-12 items-center justify-center rounded-full bg-amber-500 font-semibold text-forest-900">
                    Coffee beans
                  </Link>
                  <a href={site.contact.messenger} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-full border border-paper/30 text-paper">
                    Message us
                  </a>
                  <p lang="ar" className="mt-6 text-center font-arabic-display text-3xl text-amber-500/80">
                    {site.nameAr}
                  </p>
                </div>
              </nav>
            </motion.div>
          )}
      </AnimatePresence>

    </>
  );
}

function IconButton({ label, onClick, children, badge }: { label: string; onClick: () => void; children: React.ReactNode; badge?: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="relative hidden h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-paper/10 lg:flex">
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
      {badge}
    </button>
  );
}

import Link from "next/link";
import { cn } from "@/lib/format";

type Variant = "amber" | "outline-light" | "outline-dark" | "dark";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 text-sm font-semibold tracking-wide transition-colors duration-500 ease-out-expo disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  amber: "bg-amber-500 text-forest-900 hover:bg-amber-400",
  dark: "bg-forest-900 text-paper hover:bg-forest-700",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-forest-900",
  "outline-dark": "border border-forest-900/30 text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-paper",
};

function Arrow() {
  return (
    <span aria-hidden className="relative inline-block h-3 w-4 overflow-hidden">
      <svg viewBox="0 0 16 12" className="absolute inset-0 h-3 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-full">
        <path d="M0 6h14M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 16 12" className="absolute inset-0 h-3 w-4 -translate-x-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
        <path d="M0 6h14M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

type Common = { variant?: Variant; arrow?: boolean; className?: string; children: React.ReactNode };

export function ButtonLink({ href, variant = "amber", arrow = true, className, children, ...rest }: Common & { href: string } & Omit<React.ComponentProps<"a">, "href">) {
  const external = /^https?:/.test(href);
  const cls = cn(base, variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({ variant = "amber", arrow = false, className, children, ...rest }: Common & React.ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}

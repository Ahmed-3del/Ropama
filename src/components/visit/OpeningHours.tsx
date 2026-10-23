"use client";

import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/site";
import { formatRange, useOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/format";

/** Live "open now" badge, shown once the browser knows the time. */
export function OpenBadge({ className }: { className?: string }) {
  const status = useOpenStatus();
  return (
    <AnimatePresence>
      {status && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold", status.open ? "bg-forest-600 text-paper" : "bg-cocoa/15 text-cocoa", className)}
        >
          <span className="relative flex h-2 w-2">
            {status.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75 motion-reduce:animate-none" />}
            <span className={cn("relative inline-flex h-2 w-2 rounded-full", status.open ? "bg-amber-400" : "bg-cocoa/50")} />
          </span>
          {status.label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/** Weekly hours with today highlighted (Saturday first, as the week runs in Egypt). */
export function HoursTable({ className }: { className?: string }) {
  const status = useOpenStatus();
  const order = [6, 0, 1, 2, 3, 4, 5];
  return (
    <table className={cn("w-full text-sm", className)}>
      <caption className="sr-only">Opening hours (Cairo time)</caption>
      <tbody>
        {order.map((d) => {
          const h = site.hours.find((x) => x.day === d)!;
          const today = status?.today === d;
          return (
            <tr key={d} className={cn("border-b border-dashed border-current/20", today && "font-bold")}>
              <th scope="row" className="py-2 text-left font-normal">
                {h.label}
                {today && <span className="ml-2 font-hand text-lg text-amber-600">today</span>}
              </th>
              <td className="py-2 text-right tabular-nums">{formatRange(h.open, h.close)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

import { useSyncExternalStore } from "react";
import { site } from "@/config/site";

const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Cairo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" });
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Current weekday (0 = Sunday) and fractional hour in Aswan. */
export function cairoNow(date = new Date()) {
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  return { day: DAYS.indexOf(parts.weekday), hour: Number(parts.hour) + Number(parts.minute) / 60 };
}

const fmtHour = (h: number) => {
  const hh = h % 24;
  if (hh === 0) return "12 AM";
  return hh < 12 ? `${hh} AM` : hh === 12 ? "12 PM" : `${hh - 12} PM`;
};

export const formatRange = (open: number, close: number) => `${fmtHour(open)} – ${fmtHour(close)}`;

export type OpenStatus = { open: boolean; today: number; label: string };

export function openStatus(date = new Date()): OpenStatus {
  const { day, hour } = cairoNow(date);
  const today = site.hours.find((h) => h.day === day)!;
  const yesterday = site.hours.find((h) => h.day === (day + 6) % 7)!;
  // Late hours from yesterday spill past midnight (close > 24).
  if (yesterday.close > 24 && hour < yesterday.close - 24) {
    return { open: true, today: day, label: `Open now · until ${fmtHour(yesterday.close)}` };
  }
  if (hour >= today.open && hour < today.close) return { open: true, today: day, label: `Open now · until ${fmtHour(today.close)}` };
  if (hour < today.open) return { open: false, today: day, label: `Closed · opens ${fmtHour(today.open)}` };
  const tomorrow = site.hours.find((h) => h.day === (day + 1) % 7)!;
  return { open: false, today: day, label: `Closed · opens ${fmtHour(tomorrow.open)} tomorrow` };
}

// Re-render once a minute; the server has no clock-dependent output (null).
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 30_000);
  return () => clearInterval(t);
};
const minuteSnapshot = () => Math.floor(Date.now() / 60_000);

export function useOpenStatus(): OpenStatus | null {
  const minute = useSyncExternalStore(subscribe, minuteSnapshot, () => null);
  return minute === null ? null : openStatus(new Date(minute * 60_000));
}

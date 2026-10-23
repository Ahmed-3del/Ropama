import { site } from "@/config/site";
import type { CartLine } from "./cart";

/** Plain-text order request the customer sends to Rbma. */
export function composeOrderMessage(lines: CartLine[]) {
  const items = lines.map((l, i) => {
    const opts = l.options.length ? ` (${l.options.join(" · ")})` : "";
    return `${i + 1}. ${l.name}${opts} × ${l.quantity}`;
  });
  return [`Hello ${site.name}! I’d like to order:`, "", ...items, "", "Please confirm the price and pickup or delivery. Thank you!"].join("\n");
}

export const whatsappLink = (text: string) =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}` : null;

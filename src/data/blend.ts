/**
 * Options for the "Build your blend" coffee-bean order.
 * These are the usual choices at an Egyptian coffee roaster; confirm them
 * with Rbma and edit freely — the builder UI is generated from this file.
 * Prices are confirmed by Rbma when the order is received.
 */

export type Choice = { id: string; label: string; labelAr: string; hint?: string };

export const roasts: (Choice & { color: string; strength: number })[] = [
  { id: "light", label: "Light", labelAr: "فاتح", hint: "Bright and soft", color: "#a36b3a", strength: 1 },
  { id: "medium", label: "Medium", labelAr: "وسط", hint: "Round and balanced", color: "#6b3f22", strength: 2 },
  { id: "dark", label: "Dark", labelAr: "غامق", hint: "Deep and bold", color: "#2f1b10", strength: 3 },
];

export const spices: Choice[] = [
  { id: "plain", label: "Plain", labelAr: "سادة", hint: "Just the coffee" },
  { id: "cardamom", label: "Cardamom", labelAr: "محوج بالحبهان", hint: "The classic" },
  { id: "mixed", label: "Mixed spice", labelAr: "محوج ميكس", hint: "Warm and fragrant" },
];

export const grinds: Choice[] = [
  { id: "turkish", label: "Turkish (fine)", labelAr: "تركي ناعم", hint: "For the kanaka" },
  { id: "espresso", label: "Espresso", labelAr: "إسبريسو", hint: "For the machine" },
  { id: "filter", label: "Filter", labelAr: "فلتر", hint: "For drip & V60" },
  { id: "beans", label: "Whole beans", labelAr: "حبوب كاملة", hint: "Grind at home" },
];

export const weights: (Choice & { scale: number })[] = [
  { id: "250", label: "250 g", labelAr: "ربع كيلو", scale: 0.86 },
  { id: "500", label: "500 g", labelAr: "نص كيلو", scale: 1 },
  { id: "1000", label: "1 kg", labelAr: "كيلو", scale: 1.14 },
];

export type BlendSelection = { roast: string; spice: string; grind: string; weight: string };

export const defaultBlend: BlendSelection = { roast: "medium", spice: "cardamom", grind: "turkish", weight: "250" };

export const findChoice = <T extends Choice>(list: T[], id: string) => list.find((c) => c.id === id) ?? list[0];

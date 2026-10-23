import type { SketchName } from "@/components/sketch/sketches";

export type MenuItem = {
  name: string;
  nameAr?: string;
  /** EGP. Leave null to hide the price. */
  price?: number | null;
  note?: string;
};

export type MenuSection = {
  slug: string;
  title: string;
  titleAr: string;
  sketch: SketchName;
  /** Tag colour, echoing the luggage tags on the printed menu. */
  tone: "peach" | "kraft" | "mint" | "cream";
  intro: string;
  items: MenuItem[];
};

/**
 * Rbma's café menu. Items are taken from the printed menu and Rbma's own
 * Facebook posts; add the rest of the menu (and prices) here.
 */
export const menu: MenuSection[] = [
  {
    slug: "coffee",
    title: "Coffee",
    titleAr: "القهوة",
    sketch: "latte",
    tone: "cream",
    intro: "Latte and plenty more — ask at the bar for the full coffee list.",
    items: [{ name: "Latte", nameAr: "لاتيه ربما", note: "“تحلى الأوقات مع لاتيه ربما”" }],
  },
  {
    slug: "mojito",
    title: "Mojito",
    titleAr: "موهيتو",
    sketch: "mojito",
    tone: "peach",
    intro: "Mint, ice and something bright.",
    items: [
      { name: "Mojito" },
      { name: "Passion fruit mojito" },
      { name: "Mojito Blue Curaçao" },
      { name: "Strawberry mojito" },
      { name: "Mojito berries" },
      { name: "Mojito Cherry Cola" },
    ],
  },
  {
    slug: "milkshake",
    title: "Milkshake",
    titleAr: "ميلك شيك",
    sketch: "blender",
    tone: "kraft",
    intro: "Thick, cold and blended to order.",
    items: [
      { name: "Milkshake Vanilla" },
      { name: "Milkshake Chocolate" },
      { name: "Milkshake Chocolate Hazelnut" },
      { name: "Milkshake KitKat" },
    ],
  },
  {
    slug: "smoothie",
    title: "Smoothie",
    titleAr: "سموزي",
    sketch: "jar",
    tone: "mint",
    intro: "Fruit smoothies — ask at the counter for today’s flavours.",
    items: [],
  },
];

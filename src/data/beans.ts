/**
 * Rbma's coffee bean list, transcribed from the printed menu (قائمة البن).
 * The menu sells beans by the eighth and quarter kilo and lists no prices,
 * so prices are confirmed when the order arrives. Add `price` fields here
 * once Rbma shares them.
 */

export type Roast = "light" | "medium" | "dark";

export const roastInfo: Record<Roast, { label: string; labelAr: string; color: string; strength: number }> = {
  light: { label: "Light", labelAr: "فاتح", color: "#a36b3a", strength: 1 },
  medium: { label: "Medium", labelAr: "وسط", color: "#6b3f22", strength: 2 },
  dark: { label: "Dark", labelAr: "غامق", color: "#2f1b10", strength: 3 },
};

export type Size = { id: string; label: string; labelAr: string; scale: number };

export const kiloSizes: Size[] = [
  { id: "eighth", label: "⅛ kg", labelAr: "ثمن كيلو", scale: 0.88 },
  { id: "quarter", label: "¼ kg", labelAr: "ربع كيلو", scale: 1 },
];

/** Rbma's six house blends. Each comes plain (سادة) or spiced (محوج). */
/** `note` only translates the name; roast levels are as printed on the menu. */
export type HouseBlend = { id: string; name: string; nameAr: string; roast: Roast; note?: string };

export const houseBlends: HouseBlend[] = [
  { id: "rayek", name: "Al-Rayek", nameAr: "توليفة الرايق", roast: "light", note: "“The easy-going one”" },
  { id: "nizar", name: "Nizar", nameAr: "توليفة نزار", roast: "light" },
  { id: "plaza", name: "Plaza", nameAr: "توليفة بلازا", roast: "light" },
  { id: "rbma", name: "Rbma", nameAr: "توليفة ربما", roast: "medium", note: "Our namesake blend" },
  { id: "super-dark", name: "Super Dark", nameAr: "توليفة سوبر غامق", roast: "dark" },
  { id: "malouki", name: "Malouki", nameAr: "توليفة ملوكي", roast: "light", note: "“The royal one”" },
];

export const styles = [
  { id: "plain", label: "Plain", labelAr: "سادة" },
  { id: "spiced", label: "Spiced", labelAr: "محوج" },
] as const;

export type StyleId = (typeof styles)[number]["id"];

/** Everything else on the bean list, grouped as on the menu. */
export type BeanItem = { id: string; name: string; nameAr: string; note?: string; sizes: Size[] };
export type BeanGroup = { slug: string; title: string; titleAr: string; intro?: string; items: BeanItem[] };

const grams = (g: number): Size => ({ id: `${g}g`, label: `${g} g`, labelAr: `${g} جرام`, scale: 1 });
const pack = (label: string, labelAr: string): Size => ({ id: "pack", label, labelAr, scale: 1 });

export const beanGroups: BeanGroup[] = [
  {
    slug: "coffee",
    title: "Coffee for home",
    titleAr: "قهوة",
    items: [
      { id: "espresso", name: "Espresso", nameAr: "إسبرسو", sizes: kiloSizes },
      { id: "americano", name: "Americano", nameAr: "أميركانو", sizes: kiloSizes },
      { id: "arabic", name: "Arabic coffee", nameAr: "قهوة عربي", sizes: kiloSizes },
      { id: "slimming", name: "Slimming coffee", nameAr: "بن التخسيس", sizes: kiloSizes },
    ],
  },
  {
    slug: "french",
    title: "French coffee",
    titleAr: "فرنساوي",
    items: [
      { id: "french", name: "French coffee", nameAr: "فرنساوي", sizes: kiloSizes },
      {
        id: "french-flavoured",
        name: "Flavoured French",
        nameAr: "فرنساوي نكهات",
        note: "Vanilla · caramel · chocolate · hazelnut pieces · apple shisha",
        sizes: kiloSizes,
      },
    ],
  },
  {
    slug: "origins",
    title: "Single origins",
    titleAr: "أصناف تجارية",
    intro: "Everyday origins.",
    items: [
      { id: "brazil", name: "Brazilian", nameAr: "برازيلي", sizes: kiloSizes },
      { id: "colombia", name: "Colombian", nameAr: "كلومبي", sizes: kiloSizes },
      { id: "ethiopia", name: "Ethiopian", nameAr: "اثيوبي", sizes: kiloSizes },
      { id: "india-robusta", name: "Indian Robusta", nameAr: "هندي روبيستا", sizes: kiloSizes },
      { id: "indonesia", name: "Indonesian", nameAr: "اندونيسي", sizes: kiloSizes },
    ],
  },
  {
    slug: "specialty",
    title: "Specialty",
    titleAr: "قسم المختص",
    intro: "Our specialty-grade selection.",
    items: [
      { id: "sp-colombia", name: "Colombian specialty", nameAr: "كلومبي مختص", sizes: kiloSizes },
      { id: "sp-brazil", name: "Brazilian specialty", nameAr: "برازيلي مختص", sizes: kiloSizes },
      { id: "sp-ethiopia", name: "Ethiopian specialty", nameAr: "اثيوبي مختص", sizes: kiloSizes },
      { id: "costa-rica", name: "Costa Rica", nameAr: "كوستاريكا", sizes: kiloSizes },
      { id: "india-arabica", name: "Indian Arabica", nameAr: "هندي ارابيكا", sizes: kiloSizes },
      { id: "salvador", name: "El Salvador", nameAr: "سلفادور", sizes: kiloSizes },
      { id: "guatemala", name: "Guatemala", nameAr: "جواتيمالا", sizes: kiloSizes },
      { id: "nicaragua", name: "Nicaragua", nameAr: "نيكاراجوا", sizes: kiloSizes },
    ],
  },
  {
    slug: "instant",
    title: "Instant coffee",
    titleAr: "مسكافيشو",
    items: [
      { id: "instant-classic", name: "Instant coffee · Classic", nameAr: "مسكافيشو كلاسيك", sizes: [grams(100), grams(200)] },
      { id: "instant-gold", name: "Instant coffee · Gold", nameAr: "مسكافيشو جولد", sizes: [grams(100), grams(200)] },
    ],
  },
  {
    slug: "other",
    title: "Other products",
    titleAr: "منتجات أخرى",
    items: [
      { id: "boba-raw", name: "Boba (uncooked)", nameAr: "بوبا غير مطهية", sizes: [grams(100)] },
      { id: "boba-cooked", name: "Boba (cooked)", nameAr: "بوبا مطهية", sizes: [grams(100)] },
      { id: "matcha", name: "Matcha tea", nameAr: "شاي ماتشا", sizes: [grams(100)] },
      { id: "hot-chocolate", name: "Hot chocolate", nameAr: "هوت شوكليت", sizes: [grams(100)] },
      { id: "v60-filters", name: "V60 filters", nameAr: "فلتر V60", sizes: [pack("5 filters", "٥ فلتر")] },
    ],
  },
];

export const wholesaleNote = { en: "Special prices for wholesale", ar: "أسعار خاصة للجملة" };

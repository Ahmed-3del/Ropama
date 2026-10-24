import type { SketchName } from "@/components/sketch/sketches";

export type MenuItem = {
  name: string;
  nameAr: string;
  note?: string;
  /** EGP. Leave null/undefined to hide the price. */
  price?: number | null;
};

export type MenuSection = {
  slug: string;
  title: string;
  titleAr: string;
  sketch: SketchName;
  /** Tag colour, echoing the luggage tags on the printed menu. */
  tone: "peach" | "kraft" | "mint" | "cream";
  intro?: string;
  items: MenuItem[];
};

/**
 * Rbma's café menu, transcribed from the printed menu (Oct 2026).
 * The menu lists no prices; add `price` to any item to show it.
 * Milkshakes marked "مقاطعة" (boycott) on the menu are left out.
 */
export const menu: MenuSection[] = [
  {
    slug: "coffee",
    title: "World of Coffee",
    titleAr: "عالم القهوة",
    sketch: "kanaka",
    tone: "cream",
    items: [
      { name: "Turkish coffee", nameAr: "تركي" },
      { name: "French coffee", nameAr: "فرنساوي" },
      { name: "Flavoured French", nameAr: "فرنساوي نكهات", note: "Vanilla · caramel · chocolate · apple shisha" },
      { name: "French with spread", nameAr: "فرنساوي سبريد", note: "Lotus · pistachio butter" },
      { name: "Khaleeji (Gulf) coffee", nameAr: "خليجية" },
      { name: "Japanese V60", nameAr: "ياباني V60" },
      { name: "Red Eye", nameAr: "العين الحمرا" },
    ],
  },
  {
    slug: "italian",
    title: "Italian Coffee",
    titleAr: "قهوة إيطالي",
    sketch: "cup",
    tone: "kraft",
    items: [
      { name: "Espresso", nameAr: "إسبرسو" },
      { name: "Double espresso", nameAr: "دابل إسبرسو" },
      { name: "Espresso con panna", nameAr: "إسبرسو كون بنا" },
      { name: "Espresso avocado", nameAr: "إسبرسو أفوكادو" },
      { name: "Latte", nameAr: "لاتيه" },
      { name: "Cappuccino", nameAr: "كابتشينو" },
      { name: "Cortado", nameAr: "كورتادو" },
      { name: "Macchiato", nameAr: "ميكاتو" },
      { name: "Flat white", nameAr: "فلات وايت" },
      { name: "Americano", nameAr: "امريكانو" },
      { name: "Instant coffee", nameAr: "مسكافيتشو" },
      { name: "Hot mocha", nameAr: "هوت موكا", note: "Dark or white" },
      { name: "Matcha latte", nameAr: "ماتشا لاتيه" },
    ],
  },
  {
    slug: "iced",
    title: "Iced Coffee",
    titleAr: "قهوة مثلجة",
    sketch: "iced",
    tone: "mint",
    intro: "Ice, milk, coffee and a cloud of whipped cream.",
    items: [
      { name: "Iced latte", nameAr: "ايس لاتيه" },
      { name: "Spanish latte", nameAr: "اسبانيش لاتيه" },
      { name: "Iced macchiato", nameAr: "ايس ميكاتو" },
      { name: "Iced mocha", nameAr: "ايس موكا", note: "Dark or white" },
      { name: "Iced americano", nameAr: "ايس امريكانو" },
      { name: "Iced dalgona", nameAr: "ايس دالجونا" },
      { name: "Cold brew", nameAr: "كولد برو" },
      { name: "Freddo", nameAr: "فريدو" },
      { name: "Frappé", nameAr: "فرابيه" },
      { name: "Power coffee", nameAr: "باوركوفي" },
      { name: "Aerocano", nameAr: "ايرو كانو" },
      { name: "Iced V60", nameAr: "ايس V60" },
      { name: "Iced tea", nameAr: "ايس تي" },
      { name: "Iced matcha", nameAr: "ايس ماتشا" },
    ],
  },
  {
    slug: "hot",
    title: "Hot Drinks",
    titleAr: "مشروبات ساخنة",
    sketch: "teapot",
    tone: "peach",
    items: [
      { name: "Tea", nameAr: "شاي" },
      { name: "Mate tea", nameAr: "شاي متا" },
      { name: "Karak tea", nameAr: "شاي كرك" },
      { name: "Adeni tea", nameAr: "شاي عدن" },
      { name: "Herbal tea", nameAr: "أعشاب" },
      { name: "Hot cider", nameAr: "هوت سيدر" },
      { name: "Hot chocolate", nameAr: "هوت تشوكليت" },
    ],
  },
  {
    slug: "mojito",
    title: "Mojito",
    titleAr: "موخيتو",
    sketch: "mojito",
    tone: "peach",
    items: [
      { name: "Mojito", nameAr: "موخيتو" },
      { name: "Passion fruit mojito", nameAr: "موخيتو باشن فروت" },
      { name: "Blue Curaçao mojito", nameAr: "موخيتو بلو كروساو" },
      { name: "Strawberry mojito", nameAr: "موخيتو فراولة" },
      { name: "Berry mojito", nameAr: "موخيتو توت" },
      { name: "Cherry Cola mojito", nameAr: "موخيتو شيري كولا" },
    ],
  },
  {
    slug: "smoothie",
    title: "Smoothie",
    titleAr: "سموزي",
    sketch: "jar",
    tone: "mint",
    items: [
      { name: "Watermelon", nameAr: "سموزي بطيخ" },
      { name: "Strawberry", nameAr: "سموزي فراولة" },
      { name: "Pineapple", nameAr: "سموزي اناناس" },
      { name: "Kiwi", nameAr: "سموزي كيوي" },
      { name: "Passion fruit", nameAr: "سموزي باشن فروت" },
      { name: "Berries", nameAr: "سموزي توت" },
      { name: "Cherry", nameAr: "سموزي كريز" },
    ],
  },
  {
    slug: "milkshake",
    title: "Milkshake",
    titleAr: "ميلك شيك",
    sketch: "blender",
    tone: "kraft",
    items: [
      { name: "Rbma milkshake", nameAr: "ميلك شيك ربما", note: "Our signature" },
      { name: "Happiness milkshake", nameAr: "ميلك شيك السعادة" },
      { name: "Vanilla", nameAr: "ميلك شيك فانيليا" },
      { name: "Chocolate", nameAr: "ميلك شيك شكولاته" },
      { name: "Chocolate hazelnut", nameAr: "ميلك شيك شكولاته بندق" },
      { name: "Lotus", nameAr: "ميلك شيك لوتس" },
      { name: "Caramel", nameAr: "ميلك شيك كراميل" },
      { name: "Pistachio", nameAr: "ميلك شيك فسدق" },
      { name: "Matcha", nameAr: "ميلك شيك ماتشا" },
      { name: "Strawberry", nameAr: "ميلك شيك فراولة" },
      { name: "Pineapple", nameAr: "ميلك شيك أناناس" },
      { name: "Kiwi", nameAr: "ميلك شيك كيوي" },
      { name: "Passion fruit", nameAr: "ميلك شيك باش فروت" },
      { name: "Watermelon", nameAr: "ميلك شيك بطيخ" },
    ],
  },
  {
    slug: "breakfast",
    title: "Breakfast Corner",
    titleAr: "ركن الفطار",
    sketch: "sandwich",
    tone: "cream",
    items: [
      { name: "Lebanese breakfast meal", nameAr: "وجبة التريقة اللبناني" },
      { name: "Smoked turkey sandwich", nameAr: "ساندوتش تركي مدخن" },
      { name: "Roast beef sandwich", nameAr: "ساندوتش روز بيف" },
      { name: "Mixed cheese sandwich", nameAr: "ساندوتش مكس جبن" },
      { name: "Tuna sandwich", nameAr: "ساندوتش تونة" },
      { name: "Egg & cheese sandwich", nameAr: "ساندوتش بيض بالجبنة" },
      { name: "Pastrami & cream cheese", nameAr: "ساندوتش بسطرمة بالجبنة الكريمي" },
      { name: "Roumy & Flemish cheese", nameAr: "ساندوتش فص رومي بالفلمنك" },
      { name: "Apple cinnamon sandwich", nameAr: "ساندوتش تفاح بالقرفة" },
      { name: "Chocolate hazelnut sandwich", nameAr: "ساندوتش شكولاته بندق" },
      { name: "Lotus sandwich", nameAr: "ساندوتش لوتس" },
    ],
  },
  {
    slug: "sweets",
    title: "Something Sweet",
    titleAr: "حلو",
    sketch: "cupcake",
    tone: "peach",
    items: [
      { name: "Cheese muffin", nameAr: "مافن بالجبنة" },
      { name: "Kunafa profiterole with pistachio", nameAr: "بروفترول كنافة بالفسدق" },
      { name: "Karak cupcake", nameAr: "كب كيك كرك" },
      { name: "Mini cheesecake", nameAr: "ميني تشيز كيك" },
      { name: "Healthy cookies", nameAr: "كوكيز هيلثي" },
      { name: "Unhealthy cookies", nameAr: "كوكيز ان هيلثي" },
      { name: "Healthy brownies", nameAr: "براونيز هيلثي" },
      { name: "Unhealthy brownies", nameAr: "براونيز ان هيلثي" },
    ],
  },
  {
    slug: "addons",
    title: "Add-ons",
    titleAr: "الإضافات",
    sketch: "heart",
    tone: "mint",
    intro: "Make any drink yours.",
    items: [
      {
        name: "Add a flavour",
        nameAr: "إضافة نكهات",
        note: "Vanilla · caramel · hazelnut · pineapple · passion fruit · all the berries · salted caramel · blue curaçao · cherry · strawberry · watermelon",
      },
      { name: "Add a spread", nameAr: "إضافة سبريد", note: "Lotus butter · pistachio butter" },
      { name: "Add chocolate", nameAr: "إضافة شكوليت", note: "Cookies · brownies · hazelnut chocolate bar" },
    ],
  },
];

/** Sections shown on the homepage preview. */
export const featuredMenu = ["coffee", "iced", "mojito", "milkshake"];

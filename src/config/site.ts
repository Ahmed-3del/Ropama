/**
 * Business configuration for Rbma – ربما.
 *
 * Sources (checked Oct 2026):
 * - Facebook page facebook.com/RbmaASW: name, logo, slogan, location, follower count.
 * - Rbma's printed menu: "I haven't fallen in love until now… but maybe",
 *   "Plaza Mall, First floor, upper floor", +20 109 791 9899.
 * - Google listing (via Restaurant Guru): opening hours, rating, takeaway & delivery.
 * Anything `null` is unknown and hidden by the UI until it's filled in.
 */

export const site = {
  name: "Rbma",
  nameAr: "ربما",
  legalName: "Rbma – ربما",
  tagline: "It’s coffee time",
  /** The line printed on the cover of Rbma's menu. */
  menuLine: "I haven’t fallen in love until now… but maybe",
  menuLineAr: "أنا لم أعشقكِ حتى الآن، لكنْ ربما..",
  sloganAr: "مزاجك مظبوط مع توليفة من أجود وأفضل أنواع البن المختلفة",
  slogan: "Your mood, set just right — with a blend of the finest coffees.",
  city: "Aswan",
  cityAr: "أسوان",

  /** Production URL. Set NEXT_PUBLIC_SITE_URL to enable canonical URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,

  logo: {
    portrait: { src: "/images/brand/rbma-logo.jpg", width: 340, height: 540 },
    square: { src: "/images/brand/rbma-logo-square.jpg", width: 720, height: 720 },
  },

  contact: {
    phone: "+201097919899",
    phoneDisplay: "+20 109 791 9899",
    facebook: "https://www.facebook.com/RbmaASW/",
    messenger: "https://m.me/RbmaASW",
    /** International format without "+". Set it once WhatsApp is confirmed for this number. */
    whatsapp: null as string | null,
    instagram: null as string | null,
    address: "Plaza Mall, first floor (upper level)",
    addressLine2: "Corniche El Nil, Aswan",
    addressAr: "أسوان – مول بلازا – الدور الأول علوي",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Rbma%20cafe%20%D8%B1%D8%A8%D9%85%D8%A7%20Plaza%20Mall%20Aswan",
  },

  /**
   * Opening hours in Cairo time, per weekday (0 = Sunday).
   * `close` past 24 means after midnight (25 = 1 AM).
   */
  hours: [
    { day: 0, label: "Sunday", open: 9, close: 24 },
    { day: 1, label: "Monday", open: 9, close: 24 },
    { day: 2, label: "Tuesday", open: 9, close: 24 },
    { day: 3, label: "Wednesday", open: 9, close: 24 },
    { day: 4, label: "Thursday", open: 9, close: 25 },
    { day: 5, label: "Friday", open: 15, close: 25 },
    { day: 6, label: "Saturday", open: 9, close: 24 },
  ],

  services: ["Dine in", "Takeaway", "Delivery"],

  ratings: {
    google: { score: 4.7, count: 171 },
    facebook: { score: 4.7, count: 14 },
    asOf: "Oct 2026",
  } as { google: { score: number; count: number }; facebook: { score: number; count: number }; asOf: string } | null,

  /** Public Google reviews, quoted verbatim with attribution. */
  reviews: [
    {
      quote: "Great great coffee and the people are super nice. They have a lot of types of coffees. Great place to drink a coffee and chill.",
      author: "Borja G.",
      source: "Google review",
    },
    {
      quote: "Nice people, nice coffee… Coffee is great, people are so warm, and we visited here 3 times.",
      author: "A visitor to Aswan",
      source: "Google review",
    },
  ],

  socialStats: { facebookFollowers: "12K+" },

  announcements: [
    "It’s coffee time — open daily at Plaza Mall, Aswan",
    "Six house blends, plain or spiced — order beans by message",
    "Takeaway & delivery: +20 109 791 9899",
  ],

};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Coffee Beans", href: "/beans" },
  { label: "About Us", href: "/about" },
  { label: "Visit Us", href: "/visit" },
  { label: "Contact", href: "/contact" },
] as const;

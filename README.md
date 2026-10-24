# Rbma – ربما · Website

Website for **Rbma – ربما**, a café and coffee bean shop on the first floor of Plaza Mall, Aswan. "It's coffee time."

The design is built on Rbma's own identity. It uses the green and amber logo, and the scrapbook look of Rbma's printed menu: ruled notebook paper, kraft paper, luggage tags, washi tape and hand-drawn sketches. It also uses the menu's line, "I haven't fallen in love until now… but maybe".

Built with Next.js 16, TypeScript, Tailwind CSS v4 and Motion.

## Pages

- **Home:** notebook-page hero, a "Maybe…" line that changes word every few seconds, menu tags, the blend builder, guest reviews, and a "Find us" receipt with live opening hours.
- **Menu** (`/menu`): every menu section as a luggage tag.
- **Coffee Beans** (`/beans`): pick one of the six house blends (plain or spiced, ⅛ or ¼ kg) on an illustrated bag, plus the full bean list with add-to-order buttons.
- **About**, **Visit Us**, **Contact**.

There's no online payment. The order bag builds a message the customer copies and sends on Messenger, or they call. WhatsApp sending turns on once a number is set.

## Run it

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Set `NEXT_PUBLIC_SITE_URL=https://your-domain` in production for canonical URLs and sharing previews.

## Edit the content

| What | File |
| --- | --- |
| Name, phone, address, hours, ratings, reviews, announcements, WhatsApp/Instagram | `src/config/site.ts` |
| Café menu: sections, items, optional prices | `src/data/menu.ts` |
| House blends and bean list | `src/data/beans.ts` |
| Hand-drawn sketches | `src/components/sketch/sketches.ts` |
| Colours and fonts | `src/app/globals.css` |

To show a price, add `price: 45` (in EGP) to a menu item.

## Sources

- **Rbma's printed menu** (9 pages, supplied Oct 2026): the full café menu, the bean list (house blends, origins, specialty, French, instant, other products), the menu line in English and Arabic, the address and the phone number. Boycotted milkshakes marked "مقاطعة" are left out.
- **Facebook page** (facebook.com/RbmaASW): name, logo, Arabic slogan, location, follower count.
- **Google listing** (via Restaurant Guru): opening hours, 4.7★ from 171 reviews, takeaway and delivery, and the two quoted guest reviews.

Café menu: `src/data/menu.ts`. Bean list and house blends: `src/data/beans.ts`.

## Still to confirm with Rbma

- **Prices.** The printed menu has empty price columns. Add `price` (EGP) to menu items, and prices to the bean list when available.
- A few translations to check: "إسبرسو أفوكادو" is shown as "Espresso avocado", "ساندوتش فص رومي بالفلمنك" as "Roumy & Flemish cheese", and "كب كيك كرك" as "Karak cupcake".
- Whether +20 109 791 9899 is on WhatsApp. If it is, set `contact.whatsapp`.
- Photos of the café and drinks.
- Instagram account, if there is one.

# Ropama

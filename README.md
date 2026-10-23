# Rbma – ربما · Website

Website for **Rbma – ربما**, a café and coffee bean shop on the first floor of Plaza Mall, Aswan. "It's coffee time."

The design is built on Rbma's own identity. It uses the green and amber logo, and the scrapbook look of Rbma's printed menu: ruled notebook paper, kraft paper, luggage tags, washi tape and hand-drawn sketches. It also uses the menu's line, "I haven't fallen in love until now… but maybe".

Built with Next.js 16, TypeScript, Tailwind CSS v4 and Motion.

## Pages

- **Home:** notebook-page hero, a "Maybe…" line that changes word every few seconds, menu tags, the blend builder, guest reviews, and a "Find us" receipt with live opening hours.
- **Menu** (`/menu`): every menu section as a luggage tag.
- **Coffee Beans** (`/beans`): the "Build your توليفة" builder. Customers pick roast, spice, grind and size, can name their blend, and add it to an order.
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
| Blend builder choices: roasts, spices, grinds, sizes | `src/data/blend.ts` |
| Hand-drawn sketches | `src/components/sketch/sketches.ts` |
| Colours and fonts | `src/app/globals.css` |

To show a price, add `price: 45` (in EGP) to a menu item.

## Sources

- **Facebook page** (facebook.com/RbmaASW): name, logo, Arabic slogan, location, follower count.
- **Rbma's printed menu**, from a customer photo: the menu line, the mojito and milkshake items, the smoothie section, the address and the phone number.
- **Rbma's Facebook post** "تحلى الأوقات مع لاتيه ربما": the Latte.
- **Google listing** (via Restaurant Guru): opening hours, 4.7★ from 171 reviews, takeaway and delivery, and the two quoted guest reviews.

## Still to confirm with Rbma

- The full menu, including the coffee list, and prices.
- The blend builder choices in `src/data/blend.ts` are the usual Egyptian coffee-shop options, not taken from Rbma.
- Whether +20 109 791 9899 is on WhatsApp. If it is, set `contact.whatsapp`.
- Photos of the café and drinks. None are used, because the only ones online belong to customers.
- Instagram account, if there is one.
# Ropama

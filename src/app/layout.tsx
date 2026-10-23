import type { Metadata, Viewport } from "next";
import { Archivo, Aref_Ruqaa, Caveat, IBM_Plex_Sans_Arabic, Instrument_Serif } from "next/font/google";
import { site } from "@/config/site";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Providers } from "@/components/layout/Providers";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const ruqaa = Aref_Ruqaa({ variable: "--font-ruqaa", subsets: ["arabic"], weight: ["400", "700"] });
const plexArabic = IBM_Plex_Sans_Arabic({ variable: "--font-plex-arabic", subsets: ["arabic"], weight: ["400", "500"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

const description = `${site.legalName} — café and coffee bean shop at Plaza Mall, ${site.city}. Lattes, mojitos, milkshakes, and coffee beans blended your way. ${site.tagline}.`;

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: { default: `${site.legalName} | Café & Coffee Beans · Plaza Mall, ${site.city}`, template: `%s | ${site.name} ${site.nameAr}` },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.legalName} — ${site.tagline}`,
    description,
    locale: "en_EG",
    alternateLocale: ["ar_EG"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#031904" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${archivo.variable} ${ruqaa.variable} ${plexArabic.variable} ${caveat.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-60 rounded-full bg-amber-500 px-5 py-3 font-semibold text-forest-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Providers>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}

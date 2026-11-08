import type { Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDict } from "@/content";
import { site } from "@/content/site";
import { dir, isLocale, locales } from "@/lib/i18n";
import "@/styles/globals.css";

// Self-hosted fonts (Barlow Condensed, DM Sans, Heebo — SIL Open Font License).
const display = localFont({
  src: [
    { path: "../../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "../../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-display-face",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});
const sans = localFont({ src: "../../fonts/dm-sans-latin-wght-normal.woff2", weight: "100 1000", variable: "--font-sans-face", display: "swap" });
const hebrew = localFont({ src: "../../fonts/heebo-hebrew-wght-normal.woff2", weight: "100 900", variable: "--font-hebrew", display: "swap", preload: false });

export const viewport: Viewport = { themeColor: "#030607", colorScheme: "dark" };
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const fontVars = `${display.variable} ${sans.variable}${lang === "he" ? ` ${hebrew.variable}` : ""}`;
  const orgLd = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url };

  return (
    <html lang={lang} dir={dir(lang)} className={fontVars}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />
        <Header locale={lang} t={t.nav} />
        {lang === "he" && !site.hebrewApproved && <div className="draft-banner" role="note">{t.draftNotice}</div>}
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer locale={lang} t={t.footer} nav={t.nav} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}

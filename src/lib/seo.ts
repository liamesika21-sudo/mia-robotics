import type { Metadata } from "next";
import { site } from "@/content/site";
import { getDict } from "@/content";
import { href, locales, type Locale, type PageKey } from "./i18n";

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const t = getDict(locale).meta[page];
  const url = `${site.url}${href(locale, page)}`;
  const languages: Record<string, string> = { en: `${site.url}${href("en", page)}`, "x-default": `${site.url}${href("en", page)}` };
  if (site.hebrewApproved) languages.he = `${site.url}${href("he", page)}`;
  const draftHe = locale === "he" && !site.hebrewApproved;
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    alternates: { canonical: url, languages },
    robots: draftHe ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: t.title,
      description: t.description,
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "MIA R4X4" }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: ["/og.jpg"] },
  };
}

export const allLocales = locales;

import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { href, type Locale, type PageKey } from "@/lib/i18n";

const pages: PageKey[] = ["home", "platform", "company", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const langs: Locale[] = site.hebrewApproved ? ["en", "he"] : ["en"];
  return pages.flatMap((p) =>
    langs.map((l) => ({
      url: `${site.url}${href(l, p)}`,
      changeFrequency: "monthly" as const,
      priority: p === "home" ? 1 : 0.7,
      alternates: site.hebrewApproved
        ? { languages: { en: `${site.url}${href("en", p)}`, he: `${site.url}${href("he", p)}` } }
        : undefined,
    }))
  );
}

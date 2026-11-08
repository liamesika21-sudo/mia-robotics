export const locales = ["en", "he"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function dir(locale: Locale) {
  return locale === "he" ? "rtl" : "ltr";
}

export type PageKey = "home" | "platform" | "company" | "contact";
const slugs: Record<PageKey, string> = { home: "", platform: "/platform", company: "/company", contact: "/contact" };

export function href(locale: Locale, page: PageKey, query?: string) {
  return `/${locale}${slugs[page]}${query ? `?${query}` : ""}`;
}

/** Swap the locale segment of a pathname, keeping the rest of the path. */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (parts[1] && isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}

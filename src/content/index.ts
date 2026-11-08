import en, { type Dict } from "./en";
import he from "./he";
import type { Locale } from "@/lib/i18n";

const dicts: Record<Locale, Dict> = { en, he };
export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
export type { Dict };

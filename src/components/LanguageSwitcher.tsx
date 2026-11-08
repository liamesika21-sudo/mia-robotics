"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";

function Switcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const search = useSearchParams();
  const qs = search?.toString();
  return (
    <div className="lang" role="group" aria-label={label}>
      {locales.map((l, i) => (
        <span key={l} className="lang__item">
          {i > 0 && <span className="lang__sep" aria-hidden="true">|</span>}
          {l === locale ? (
            <span className="lang__opt is-active" aria-current="true" lang={l}>
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              className="lang__opt"
              href={`${switchLocalePath(pathname, l)}${qs ? `?${qs}` : ""}`}
              hrefLang={l}
              lang={l}
              aria-label={l === "he" ? "עברית" : "English"}
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

export default function LanguageSwitcher(props: { locale: Locale; label: string }) {
  return (
    <Suspense fallback={<div className="lang" />}>
      <Switcher {...props} />
    </Suspense>
  );
}

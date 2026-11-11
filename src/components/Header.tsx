"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href, type Locale, type PageKey } from "@/lib/i18n";
import type { Dict } from "@/content";
import { Arrow, Logo } from "./ui";
import LanguageSwitcher from "./LanguageSwitcher";

const pages: PageKey[] = ["home", "platform", "company", "contact"];

export default function Header({ locale, t }: { locale: Locale; t: Dict["nav"] }) {
  const pathname = usePathname() || `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("menu-open");
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (p: PageKey) => {
    const h = href(locale, p);
    return p === "home" ? pathname === h : pathname.startsWith(h);
  };

  return (
    <header className={`site-header${scrolled ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <div className="site-header__inner">
        <Link href={href(locale, "home")} className="site-header__logo" aria-label="MIA Robotics home">
          <Logo />
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {pages.map((p) => (
              <li key={p}>
                <Link href={href(locale, p)} aria-current={isActive(p) ? "page" : undefined} className="site-nav__link">
                  {t[p]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher locale={locale} label={t.langLabel} />
          <Link href={href(locale, "contact")} className="btn btn--primary btn--sm site-header__cta">
            <span>{t.demo}</span>
            <Arrow />
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__text">{open ? t.close : t.menu}</span>
            <span className="menu-toggle__bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ol>
            {pages.map((p, i) => (
              <li key={p}>
                <Link href={href(locale, p)} aria-current={isActive(p) ? "page" : undefined}>
                  <span className="mobile-menu__n">0{i + 1}</span>
                  <span className="mobile-menu__t">{t[p]}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu__foot">
          <LanguageSwitcher locale={locale} label={t.langLabel} />
          <Link href={href(locale, "contact")} className="btn btn--primary">
            <span>{t.demo}</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </header>
  );
}

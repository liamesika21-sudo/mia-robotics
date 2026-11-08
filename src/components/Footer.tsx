import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content";
import { Logo } from "./ui";

export default function Footer({ locale, t, nav }: { locale: Locale; t: Dict["footer"]; nav: Dict["nav"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Logo />
          <p>{t.tagline}</p>
        </div>
        <div className="site-footer__cols">
          <div>
            <h2 className="site-footer__h">{t.navigate}</h2>
            <ul>
              <li><Link href={href(locale, "home")}>{nav.home}</Link></li>
              <li><Link href={href(locale, "platform")}>{nav.platform}</Link></li>
              <li><Link href={href(locale, "company")}>{nav.company}</Link></li>
              <li><Link href={href(locale, "contact")}>{nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__h">{t.connect}</h2>
            <ul>
              <li><Link href={href(locale, "contact")}>{nav.demo}</Link></li>
              <li><Link href={href(locale, "contact", "request=datasheet")}>{locale === "he" ? "דף נתונים" : "Datasheet"}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>© {year} {t.rights}</p>
        <p className="site-footer__tech" dir="ltr">MIA R4X4 / Ground mobility platform</p>
      </div>
    </footer>
  );
}

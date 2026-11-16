import type { Metadata } from "next";
import localFont from "next/font/local";
import en from "@/content/en";
import he from "@/content/he";
import { Logo } from "@/components/ui";
import "@/styles/globals.css";

/**
 * Site-wide 404 for any URL that matches no route. It sits outside the [lang] layout, so it can't
 * know the visitor's language: it shows English and Hebrew side by side, each with a link home.
 */

const display = localFont({
  src: [{ path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700" }],
  variable: "--font-display-face",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});
const sans = localFont({ src: "../fonts/dm-sans-latin-wght-normal.woff2", weight: "100 1000", variable: "--font-sans-face", display: "swap" });
const hebrew = localFont({ src: "../fonts/heebo-hebrew-wght-normal.woff2", weight: "100 900", variable: "--font-hebrew", display: "swap" });

export const metadata: Metadata = {
  title: "Page not found | MIA Robotics",
  robots: { index: false, follow: false },
};

const langs = [
  { code: "en", dir: "ltr", t: en.notFound, home: "/en" },
  { code: "he", dir: "rtl", t: he.notFound, home: "/he" },
] as const;

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${hebrew.variable}`}>
      <body>
        <main className="nf">
          <span className="final__lines" aria-hidden="true" />
          <div className="container nf__inner">
            <a href="/en" className="nf__logo" aria-label="MIA Robotics home">
              <Logo />
            </a>
            <p className="nf__code" aria-hidden="true">404</p>
            <div className="nf__langs">
              {langs.map((l) => (
                <section key={l.code} lang={l.code} dir={l.dir} className="nf__lang">
                  <h1 className="display">
                    {l.t.title.map((line, i) => (
                      <span key={i} className={`display__line${i === 1 ? " is-accent" : ""}`}>
                        {line}
                      </span>
                    ))}
                  </h1>
                  <p className="lead">{l.t.body}</p>
                  <a href={l.home} className="btn btn--primary">
                    <span>{l.t.home}</span>
                  </a>
                </section>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

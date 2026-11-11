import type { Metadata } from "next";
import { Suspense } from "react";
import { getDict } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import DemoRequestForm from "@/components/DemoRequestForm";
import { Title } from "@/components/ui";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata((isLocale(lang) ? lang : "en") as Locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const t = getDict(locale).contact;

  return (
    <section className="section section--black contact" aria-labelledby="contact-title">
      <span className="final__lines" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__intro">
          <Title as="h1" lines={t.title} accentFrom={t.accentFrom} id="contact-title" />
          <p className="lead">{t.body}</p>
          <ul className="contact__aside">
            {t.aside.map((a, i) => (
              <li key={a.t}>
                <span className="contact__n">0{i + 1}</span>
                <span>
                  <b>{a.t}</b>
                  <span>{a.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact__panel">
          <Suspense fallback={null}>
            <DemoRequestForm t={t.form} locale={locale} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { getDict } from "@/content";
import { site } from "@/content/site";
import { href, isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import { Button, DynamicsLogo, Logo, Title } from "@/components/ui";
import { TeamGrid } from "@/components/sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata((isLocale(lang) ? lang : "en") as Locale, "company");
}

export default async function CompanyPage({ params }: Props) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const t = getDict(locale);
  const C = t.company;
  const investorHref = site.investorsEmail ? `mailto:${site.investorsEmail}` : href(locale, "contact");

  return (
    <>
      <section className="section section--black c-hero" aria-labelledby="c-hero-title">
        <span className="c-hero__type" aria-hidden="true" dir="ltr">MIA</span>
        <span className="final__lines" aria-hidden="true" />
        <div className="container c-hero__inner">
          <Title as="h1" lines={C.hero.title} accentFrom={C.hero.accentFrom} className="display--hero" id="c-hero-title" />
        </div>
      </section>

      <section className="section section--light about" aria-labelledby="about-title">
        <div className="container about__grid">
          <Reveal className="about__copy">
            <Title lines={C.about.title} accentFrom={C.about.accentFrom} id="about-title" />
            <p className="lead lead--rule">{C.about.body[0]}</p>
            <p className="body-l">{C.about.body[1]}</p>
          </Reveal>
          <Reveal className="about__img" delay={120}>
            <Image src="/images/r4x4-field-side.webp" alt={C.about.imageAlt} width={1920} height={1080} sizes="(max-width: 900px) 100vw, 55vw" />
          </Reveal>
        </div>
      </section>

      <section className="section section--black group" aria-labelledby="group-title">
        <div className="container">
          <Reveal>
            <Title lines={C.group.title} accentFrom={C.group.accentFrom} id="group-title" />
          </Reveal>
          <Reveal className="relation" delay={100}>
            <div className="relation__node">
              <DynamicsLogo />
              <span>{C.group.parentRole}</span>
            </div>
            <div className="relation__link" aria-hidden="true">
              <span />
            </div>
            <div className="relation__node relation__node--child">
              <Logo />
              <span>{C.group.childRole}</span>
            </div>
          </Reveal>
          <Reveal className="group__body">
            <p className="lead">{C.group.body}</p>
          </Reveal>
        </div>
      </section>

      <TeamGrid t={C.team} locale={locale} />

      <section className={`section ${site.teamApproved ? "section--black" : "section--light"} investors`} aria-labelledby="inv-title">
        <div className="container investors__inner">
          <Reveal>
            <Title lines={C.investors.title} accentFrom={C.investors.accentFrom} id="inv-title" />
          </Reveal>
          <Reveal className="investors__side" delay={120}>
            <p className="lead">{C.investors.body}</p>
            {site.investorsEmail && <p className="investors__mail" dir="ltr">{site.investorsEmail}</p>}
            <Button href={investorHref} variant="ghost">
              {C.investors.cta}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

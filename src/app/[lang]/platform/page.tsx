import type { Metadata } from "next";
import Image from "next/image";
import { getDict } from "@/content";
import { href, isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import PlatformTilt from "@/components/PlatformTilt";
import SteeringComparison from "@/components/SteeringComparison";
import { Title } from "@/components/ui";
import { DatasheetCTA, PlatformHero, ProductConfigurations, TechnicalSpecifications, TechnologyCapabilities } from "@/components/sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata((isLocale(lang) ? lang : "en") as Locale, "platform");
}

export default async function PlatformPage({ params }: Props) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const t = getDict(locale);
  const P = t.platform;
  const S = t.steering;
  const datasheetHref = href(locale, "contact", "request=datasheet");

  return (
    <>
      <PlatformHero t={P.hero} demo={t.common.requestDemo} datasheet={t.common.requestDatasheet} demoHref={href(locale, "contact")} datasheetHref={datasheetHref} />

      <section className="section section--light p-tilt" aria-labelledby="p-tilt-title">
        <div className="container p-tilt__grid">
          <Reveal className="p-tilt__copy">
            <Title lines={P.tilt.title} accentFrom={P.tilt.accentFrom} id="p-tilt-title" />
            {P.tilt.body.map((b, i) => (
              <p key={i} className="body-l">{b}</p>
            ))}
            <div className="p-tilt__photo">
              <Image src="/images/tilt-field.webp" alt={t.tilt.fieldAlt} width={1920} height={1080} sizes="(max-width: 900px) 100vw, 40vw" />
            </div>
          </Reveal>
          <PlatformTilt t={P.tilt} labels={t.tilt} />
        </div>
      </section>

      <section className="section section--black p-steer" id="maneuver" aria-labelledby="p-steer-title">
        <div className="container p-steer__grid">
          <Reveal className="p-steer__copy">
            <Title lines={P.steering.title} accentFrom={P.steering.accentFrom} id="p-steer-title" />
            {P.steering.body.map((b, i) => (
              <p key={i} className="body-l">{b}</p>
            ))}
          </Reveal>
          <Reveal className="diagram diagram--dark diagram--circles" delay={120}>
            <span className="diagram__corner" aria-hidden="true" />
            <SteeringComparison
              tone="dark"
              labels={{ standard: S.standard, mia: S.mia, radius: S.radius, robot: S.robot, scale: S.scale, replay: S.replay, title: S.svgTitle }}
            />
          </Reveal>
        </div>
      </section>

      <TechnologyCapabilities t={P.capabilities} />
      <ProductConfigurations t={P.configs} />
      <TechnicalSpecifications t={P.specs} locale={locale} />
      <DatasheetCTA t={P.datasheet} cta={t.common.requestDatasheet} ctaHref={datasheetHref} />
    </>
  );
}

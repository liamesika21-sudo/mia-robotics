import type { Metadata } from "next";
import { getDict } from "@/content";
import { site } from "@/content/site";
import { href, isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import CinematicHero from "@/components/CinematicHero";
import ProductVideoSection from "@/components/ProductVideoSection";
import AdaptiveTiltExplainer from "@/components/AdaptiveTiltExplainer";
import SteeringComparison from "@/components/SteeringComparison";
import { BackedSection, ChallengeSection, FinalCTA, MissionApplicationsGrid, PayloadStrip, SteeringSection } from "@/components/sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata((isLocale(lang) ? lang : "en") as Locale, "home");
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const t = getDict(locale);
  const demo = href(locale, "contact");
  const s = t.steering;

  // Rhythm: black · light · black · charcoal · light · black · light · charcoal · black
  return (
    <>
      <CinematicHero t={t.hero} common={t.common} demoHref={demo} />
      <ChallengeSection t={t.challenge} />
      <ProductVideoSection t={t.film} youtubeId={site.youtubeId} locale={locale} />
      <AdaptiveTiltExplainer t={t.tilt} cta={t.common.explorePlatform} ctaHref={href(locale, "platform")} />
      <SteeringSection t={s} cta={t.common.seeHowItMoves} ctaHref={`${href(locale, "platform")}#maneuver`}>
        <SteeringComparison
          labels={{ standard: s.standard, mia: s.mia, radius: s.radius, robot: s.robot, scale: s.scale, replay: s.replay, title: s.svgTitle }}
        />
      </SteeringSection>
      <PayloadStrip t={t.payload} />
      <MissionApplicationsGrid t={t.missions} />
      <BackedSection t={t.backed} />
      <FinalCTA t={t.finalCta} cta={t.common.requestDemo} ctaHref={demo} />
    </>
  );
}

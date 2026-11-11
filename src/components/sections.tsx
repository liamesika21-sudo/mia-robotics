import Image from "next/image";
import type { Dict } from "@/content";
import { site } from "@/content/site";
import { specs } from "@/content/specs";
import { team } from "@/content/team";
import type { Locale } from "@/lib/i18n";
import Reveal from "./Reveal";
import { Button, DynamicsMark, Title } from "./ui";

/* ───────── Home ───────── */

export function ChallengeSection({ t }: { t: Dict["challenge"] }) {
  return (
    <section className="section section--light challenge" id="main-start" aria-labelledby="challenge-title">
      <div className="container challenge__grid">
        <Reveal className="challenge__copy">
          <Title lines={t.title} accentFrom={t.accentFrom} id="challenge-title" />
          <p className="lead lead--rule">{t.body}</p>
        </Reveal>
        <Reveal className="challenge__media" delay={120}>
          <div className="challenge__img" data-type="MIA R">
            <Image src="/images/r4x4-studio-cutout.webp" alt={t.imageAlt} width={794} height={449} sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SteeringSection({
  t,
  cta,
  ctaHref,
  children,
}: {
  t: Dict["steering"];
  cta: string;
  ctaHref: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section section--light steering" aria-labelledby="steering-title">
      <div className="container steering__grid">
        <Reveal className="steering__copy">
          <p className="kicker">{t.kicker}</p>
          <Title lines={t.title} accentFrom={t.accentFrom} id="steering-title" />
          <p className="body-l">{t.body}</p>
          <p className="highlight">{t.highlight}</p>
          <span className="rule-accent" aria-hidden="true" />
          <Button href={ctaHref} variant="text">
            {cta}
          </Button>
        </Reveal>
        <Reveal className="diagram diagram--light diagram--circles" delay={120}>
          <span className="diagram__corner" aria-hidden="true" />
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function PayloadStrip({ t }: { t: Dict["payload"] }) {
  return (
    <section className="section section--black payload" aria-labelledby="payload-title">
      <div className="container payload__grid">
        <Reveal className="payload__media">
          <div className="payload__main">
            <Image src="/images/payload-deck.webp" alt={t.deckAlt} width={1920} height={1080} sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <div className="payload__inset">
            <Image src="/images/payload-loaded.webp" alt={t.loadedAlt} width={1920} height={1080} sizes="(max-width: 900px) 50vw, 22vw" />
          </div>
        </Reveal>
        <Reveal className="payload__copy" delay={120}>
          <p className="kicker">{t.kicker}</p>
          <Title lines={t.title} accentFrom={t.accentFrom} id="payload-title" />
          <p className="body-l">{t.body}</p>
          <ul className="payload__points">
            {t.points.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function MissionApplicationsGrid({ t }: { t: Dict["missions"] }) {
  return (
    <section className="section section--light missions" aria-labelledby="missions-title">
      <div className="container">
        <div className="split-head">
          <Reveal>
            <Title lines={t.title} accentFrom={t.accentFrom} id="missions-title" />
          </Reveal>
          <Reveal className="split-head__side" delay={120}>
            <p className="lead">{t.side}</p>
          </Reveal>
        </div>
        <ul className="missions__grid">
          {t.items.map((m, i) => (
            <Reveal as="li" key={m.n} className="mission" delay={(i % 3) * 70}>
              <div className="mission__head">
                <span className="mission__n">{m.n}</span>
                <h3 className="mission__t">{m.t}</h3>
              </div>
              <div className="mission__frame">
                <Image
                  src={`/images/mission-0${i + 1}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="mission__img"
                />
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="missions__civil">
          <b>{t.civilianLead}</b> {t.civilian}
        </p>
        <p className="notice notice--light">* {t.notice}</p>
      </div>
    </section>
  );
}

export function BackedSection({ t }: { t: Dict["backed"] }) {
  return (
    <section className="section section--charcoal backed" aria-labelledby="backed-title">
      <div className="container backed__grid">
        <Reveal>
          <Title lines={t.title} accentFrom={t.accentFrom} id="backed-title" />
        </Reveal>
        <Reveal className="backed__copy" delay={120}>
          <p className="lead">{t.body}</p>
          <DynamicsMark tone="light" />
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA({ t, cta, ctaHref }: { t: Dict["finalCta"]; cta: string; ctaHref: string }) {
  return (
    <section className="section section--black final" aria-labelledby="final-title">
      <span className="final__type" aria-hidden="true" dir="ltr">MIA R</span>
      <span className="final__lines" aria-hidden="true" />
      <div className="container final__inner">
        <Reveal>
          <Title lines={t.title} accentFrom={t.accentFrom} id="final-title" />
          <p className="lead">{t.body}</p>
          <div className="btn-row">
            <Button href={ctaHref}>{cta}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Platform ───────── */

export function PlatformHero({
  t,
  demo,
  datasheet,
  demoHref,
  datasheetHref,
}: {
  t: Dict["platform"]["hero"];
  demo: string;
  datasheet: string;
  demoHref: string;
  datasheetHref: string;
}) {
  return (
    <section className="section section--black p-hero" aria-labelledby="p-hero-title">
      <div className="p-hero__glow" aria-hidden="true" />
      <div className="container p-hero__grid">
        <div className="p-hero__copy">
          <h1 className="display display--xl" id="p-hero-title" dir="ltr">
            <span className="display__line">MIA <span className="is-accent">R</span></span>
          </h1>
          <p className="lead">{t.body}</p>
          <div className="btn-row">
            <Button href={demoHref}>{demo}</Button>
            <Button href={datasheetHref} variant="ghost">
              {datasheet}
            </Button>
          </div>
        </div>
        <div className="p-hero__media">
          <Image src="/images/r4x4-studio-cutout.webp" alt={t.imageAlt} width={794} height={449} priority sizes="(max-width: 900px) 100vw, 60vw" />
        </div>
      </div>
    </section>
  );
}

export function TechnologyCapabilities({ t }: { t: Dict["platform"]["capabilities"] }) {
  return (
    <section className="section section--charcoal caps" aria-labelledby="caps-title">
      <div className="container">
        <Reveal>
          <Title lines={t.title} accentFrom={t.accentFrom} id="caps-title" />
        </Reveal>
        <ul className="caps__grid">
          {t.items.map((c, i) => (
            <Reveal as="li" key={c.n} className="cap" delay={(i % 3) * 80}>
              <span className="cap__n">{c.n}</span>
              <h3 className="cap__t">{c.t}</h3>
              <p className="cap__d">{c.d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const configImages = ["/images/payload-loaded.webp", "/images/r4x4-field-side.webp", "/images/mission-03.webp", "/images/payload-deck.webp"];

export function ProductConfigurations({ t }: { t: Dict["platform"]["configs"] }) {
  return (
    <section className="section section--light configs" aria-labelledby="configs-title">
      <div className="container">
        <Reveal>
          <Title lines={t.title} accentFrom={t.accentFrom} id="configs-title" />
        </Reveal>
        <ul className="configs__grid">
          {t.items.map((c, i) => (
            <Reveal as="li" key={c.t} className="config" delay={i * 80}>
              <div className="config__img">
                <Image src={configImages[i]} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
              </div>
              <div className="config__body">
                <span className={`status status--${c.k}`}>
                  <i aria-hidden="true" />
                  {c.s}
                </span>
                <h3 className="config__t">{c.t}</h3>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="notice notice--light">* {t.note}</p>
      </div>
    </section>
  );
}

/** Renders NOTHING (no markup, no data) until specs are approved. */
export function TechnicalSpecifications({ t, locale }: { t: Dict["platform"]["specs"]; locale: Locale }) {
  if (!site.specsApproved || specs.length === 0) return null;
  return (
    <section className="section section--charcoal specs" aria-labelledby="specs-title">
      <div className="container">
        <h2 className="display display--m" id="specs-title">{t.title}</h2>
        <dl className="specs__list">
          {specs.map((s) => (
            <div key={s.label.en} className="specs__row">
              <dt>{s.label[locale]}</dt>
              <dd>{s.value[locale]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function DatasheetCTA({ t, cta, ctaHref }: { t: Dict["platform"]["datasheet"]; cta: string; ctaHref: string }) {
  return (
    <section className="section section--black final final--compact" aria-labelledby="ds-title">
      <span className="final__lines" aria-hidden="true" />
      <div className="container final__inner">
        <Reveal>
          <Title lines={t.title} accentFrom={t.accentFrom} id="ds-title" />
          <p className="lead">{t.body}</p>
          <div className="btn-row">
            <Button href={ctaHref}>{cta}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Company ───────── */

export function TeamGrid({ t, locale }: { t: Dict["company"]["team"]; locale: Locale }) {
  const ready = site.teamApproved && team.length > 0 && team.every((m) => m.photo);
  if (!ready) return null;
  return (
    <section className="section section--light team" aria-labelledby="team-title">
      <div className="container">
        <Title lines={t.title} accentFrom={t.accentFrom} id="team-title" />
        <ul className="team__grid">
          {team.map((m) => (
            <li key={m.name.en} className="member">
              <div className="member__img">
                <Image src={m.photo} alt={m.name[locale]} fill sizes="(max-width: 700px) 50vw, 33vw" />
              </div>
              <h3>{m.name[locale]}</h3>
              <p>{m.role[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

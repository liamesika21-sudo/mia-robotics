import Image from "next/image";
import type { Dict } from "@/content";
import { site } from "@/content/site";
import { specs } from "@/content/specs";
import { team } from "@/content/team";
import type { Locale } from "@/lib/i18n";
import Reveal from "./Reveal";
import { Button, DynamicsMark, SectionLabel, Title } from "./ui";

/* ───────── Shared ───────── */

export function Ticker({ items }: { items: readonly string[] }) {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="container ticker__row">
        {items.map((i) => (
          <span key={i}>
            {i} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────── Home ───────── */

export function ChallengeSection({ t }: { t: Dict["challenge"] }) {
  return (
    <section className="section section--light challenge" id="main-start" aria-labelledby="challenge-title">
      <div className="container challenge__grid">
        <Reveal className="challenge__copy">
          <SectionLabel>{t.label}</SectionLabel>
          <Title lines={t.title} accentFrom={t.accentFrom} id="challenge-title" />
          <p className="lead lead--rule">{t.body}</p>
        </Reveal>
        <Reveal className="challenge__media" delay={120}>
          <div className="challenge__img">
            <Image
              src="/images/r4x4-studio-cutout.webp"
              alt={t.imageAlt}
              width={794}
              height={449}
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
          <p className="caption">{t.caption}</p>
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
          <SectionLabel>{t.label}</SectionLabel>
          <p className="kicker">{t.kicker}</p>
          <Title lines={t.title} accentFrom={t.accentFrom} id="steering-title" />
          <p className="body-l">{t.body}</p>
          <span className="rule-accent" aria-hidden="true" />
          <Button href={ctaHref} variant="text">
            {cta}
          </Button>
        </Reveal>
        <Reveal className="diagram diagram--light" delay={120}>
          <span className="diagram__corner" aria-hidden="true" />
          <span className="diagram__tag">{t.diagramTag}</span>
          {children}
          <p className="diagram__note">{t.diagramNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function MissionApplicationsGrid({ t, concept }: { t: Dict["missions"]; concept: string }) {
  return (
    <section className="section section--black missions" aria-labelledby="missions-title">
      <div className="container">
        <div className="split-head">
          <Reveal>
            <SectionLabel>{t.label}</SectionLabel>
            <Title lines={t.title} accentFrom={t.accentFrom} id="missions-title" />
          </Reveal>
          <Reveal className="split-head__side" delay={120}>
            <p className="lead">{t.side}</p>
          </Reveal>
        </div>
        <ul className="missions__grid">
          {t.items.map((m, i) => (
            <li key={m.n} className="mission">
              <Image
                src={`/images/mission-0${i + 1}.webp`}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                className="mission__img"
              />
              <span className="mission__shade" aria-hidden="true" />
              <span className="mission__tag">{concept}</span>
              <div className="mission__bar">
                <span className="mission__n">{m.n}</span>
                <span className="mission__sep" aria-hidden="true" />
                <h3 className="mission__t">{m.t}</h3>
              </div>
            </li>
          ))}
        </ul>
        <p className="missions__civil">
          <b>{t.civilianLead}</b> {t.civilian}
        </p>
        <p className="notice">* {t.notice}</p>
      </div>
    </section>
  );
}

export function BackedSection({ t }: { t: Dict["backed"] }) {
  return (
    <section className="section section--light backed" aria-labelledby="backed-title">
      <div className="container">
        <div className="split-head">
          <Reveal>
            <SectionLabel>{t.label}</SectionLabel>
            <Title lines={t.title} accentFrom={t.accentFrom} id="backed-title" />
          </Reveal>
          <Reveal className="split-head__side" delay={120}>
            <p className="lead">{t.side}</p>
          </Reveal>
        </div>
        <Pillars items={t.pillars} />
        <div className="backed__foot">
          <DynamicsMark />
          <p>{t.groupLine}</p>
        </div>
      </div>
    </section>
  );
}

const pillarIcons = [
  // factory
  <path key="0" d="M4 26V12l7 4v-4l7 4v-4l7 4V6h3v20z M8 21h3M14 21h3M20 21h3" />,
  // compact vehicle
  <path key="1" d="M5 20h22M8 20a3 3 0 1 0 6 0M18 20a3 3 0 1 0 6 0M7 20l3-8h12l3 8M12 12V8h8v4" />,
  // shield / patent
  <path key="2" d="M16 4 26 8v7c0 6-4 10-10 13C10 25 6 21 6 15V8zM11 16l3.5 3.5L21 13" />,
];

export function Pillars({ items, dark = false }: { items: readonly { n: string; t: string; d: string }[]; dark?: boolean }) {
  return (
    <ul className={`pillars${dark ? " pillars--dark" : ""}`}>
      {items.map((p, i) => (
        <Reveal as="li" key={p.n} className="pillar" delay={i * 90}>
          <svg className="pillar__icon" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
              {pillarIcons[i % 3]}
            </g>
          </svg>
          <span className="pillar__n">{p.n} /</span>
          <h3 className="pillar__t">{p.t}</h3>
          <p className="pillar__d">{p.d}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export function FinalCTA({ t, cta, ctaHref }: { t: Dict["finalCta"]; cta: string; ctaHref: string }) {
  return (
    <section className="section section--black final" aria-labelledby="final-title">
      <span className="final__type" aria-hidden="true" dir="ltr">R4X4</span>
      <span className="final__lines" aria-hidden="true" />
      <div className="container final__inner">
        <Reveal>
          <SectionLabel>{t.label}</SectionLabel>
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
          <SectionLabel className="label--light">{t.label}</SectionLabel>
          <h1 className="display display--xl" id="p-hero-title" dir="ltr">
            <span className="display__line">MIA</span>
            <span className="display__line is-accent">R4X4</span>
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
          <Image
            src="/images/r4x4-studio-cutout.webp"
            alt={t.imageAlt}
            width={794}
            height={449}
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
          />
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
          <SectionLabel>{t.label}</SectionLabel>
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

const configImages = ["/images/r4x4-payload.webp", "/images/r4x4-field-side.webp", "/images/mission-03.webp", "/images/r4x4-studio-rear.webp"];

export function ProductConfigurations({ t, concept }: { t: Dict["platform"]["configs"]; concept: string }) {
  return (
    <section className="section section--light configs" aria-labelledby="configs-title">
      <div className="container">
        <Reveal>
          <SectionLabel>{t.label}</SectionLabel>
          <Title lines={t.title} accentFrom={t.accentFrom} id="configs-title" />
        </Reveal>
        <ul className="configs__grid">
          {t.items.map((c, i) => (
            <Reveal as="li" key={c.t} className="config" delay={i * 80}>
              <div className="config__img">
                <Image src={configImages[i]} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                {i === 2 && <span className="mission__tag">{concept}</span>}
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
        <SectionLabel>{t.label}</SectionLabel>
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
          <SectionLabel>{t.label}</SectionLabel>
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
        <SectionLabel>{t.label}</SectionLabel>
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

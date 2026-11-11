"use client";

import { useRef } from "react";
import type { Dict } from "@/content";
import { useScrollProgress, usePrefersReducedMotion } from "@/lib/useScrollProgress";
import TiltVisual from "./TiltVisual";
import { Button, Title } from "./ui";

/**
 * Home §04 — scroll-driven explanation. The section is taller than the viewport and the
 * diagram is pinned; scrolling moves the robot across the terrain.
 * With reduced motion it renders one static frame mid-climb (chassis tilted, platform level).
 */
export default function AdaptiveTiltExplainer({ t, cta, ctaHref }: { t: Dict["tilt"]; cta: string; ctaHref: string }) {
  const wrap = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const live = useScrollProgress(wrap, "sticky", reduce);
  const p = reduce ? 0.6 : live;
  const step = p < 0.14 ? 0 : p < 0.5 ? 1 : 2;

  return (
    <section ref={wrap} className={`section section--charcoal tilt${reduce ? " is-static" : ""}`} aria-labelledby="tilt-title">
      <div className="tilt__pin">
        <div className="container tilt__grid">
          <div className="tilt__copy">
            <p className="kicker">{t.kicker}</p>
            <Title lines={t.title} accentFrom={t.accentFrom} id="tilt-title" />
            <p className="body-l">{t.body}</p>
            <ol className="steps" aria-label={t.kicker}>
              {t.steps.map((s, i) => (
                <li key={s.n} className={`steps__item${i === step ? " is-active" : ""}${i < step ? " is-done" : ""}`}>
                  <span className="steps__n">{s.n}</span>
                  <span>
                    <b>{s.t}</b>
                    <span className="steps__d">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <span className="rule-accent" aria-hidden="true" />
            <Button href={ctaHref} variant="text">
              {cta}
            </Button>
          </div>

          <figure className="diagram diagram--dark">
            <span className="diagram__corner" aria-hidden="true" />
            <TiltVisual
              progress={p}
              labels={{ levelRef: t.levelRef, platform: t.platform, chassis: t.chassis, title: t.svgTitle }}
            />
            <div className="diagram__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${p})` }} />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

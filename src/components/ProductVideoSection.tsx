"use client";

import { useState } from "react";
import type { Dict } from "@/content";
import { Title, PlayGlyph } from "./ui";
import Reveal from "./Reveal";

/**
 * Cinematic film block. Shows a custom poster and play control; the YouTube player
 * (privacy-enhanced domain) is only injected after the visitor clicks play.
 */
export default function ProductVideoSection({
  t,
  youtubeId,
  locale,
}: {
  t: Dict["film"];
  youtubeId: string;
  locale: string;
}) {
  const [active, setActive] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&hl=${locale}`;

  return (
    <section className="section section--black film" id="film" aria-labelledby="film-title">
      <div className="container">
        <div className="split-head">
          <Reveal>
            <Title lines={t.title} accentFrom={t.accentFrom} id="film-title" />
          </Reveal>
          <Reveal className="split-head__side" delay={120}>
            <p className="lead">{t.side}</p>
          </Reveal>
        </div>

        <Reveal className="film__frame">
          {active ? (
            <iframe
              className="film__iframe"
              src={src}
              title={t.play}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button type="button" className="film__poster" onClick={() => setActive(true)} aria-label={t.play}>
              <img src="/images/film-poster.webp" alt={t.posterAlt} loading="lazy" decoding="async" />
              <span className="film__shade" aria-hidden="true" />
              <span className="film__center">
                <span className="film__play" aria-hidden="true">
                  <PlayGlyph size={26} />
                </span>
                <span className="film__watch">{t.watch}</span>
              </span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}

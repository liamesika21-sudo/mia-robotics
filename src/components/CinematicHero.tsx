"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content";
import { Button } from "./ui";

/**
 * Full-viewport hero with a muted, looping product clip.
 * - Picks a lighter encode on small screens.
 * - Never autoplays for prefers-reduced-motion or Save-Data; the poster stays.
 * - Has a visible pause control (WCAG 2.2.2).
 */
export default function CinematicHero({
  t,
  common,
  demoHref,
}: {
  t: Dict["hero"];
  common: Dict["common"];
  demoHref: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!enabled || !v) return;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const sources = small
      ? [{ src: "/video/hero-854.mp4", type: "video/mp4" }]
      : [
          { src: "/video/hero-1280.webm", type: "video/webm" },
          { src: "/video/hero-1280.mp4", type: "video/mp4" },
        ];
    v.innerHTML = "";
    sources.forEach((s) => {
      const el = document.createElement("source");
      el.src = s.src;
      el.type = s.type;
      v.appendChild(el);
    });
    v.load();
    v.play().then(
      () => setPlaying(true),
      () => setPlaying(false) // autoplay blocked: poster remains
    );
    // Pause when off-screen to save battery.
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (v.dataset.userPaused !== "1") v.play().catch(() => {});
    });
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.dataset.userPaused = "0";
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.dataset.userPaused = "1";
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <picture>
          <source media="(max-width: 760px)" srcSet="/images/hero-poster-960.webp" />
          <img src="/images/hero-poster.webp" alt="" className="hero__poster" fetchPriority="high" />
        </picture>
        <video
          ref={video}
          className={`hero__video${playing ? " is-playing" : ""}`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={t.videoLabel}
          poster="/images/hero-poster.webp"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
      </div>

      <div className="container hero__content">
        <h1 className="display display--hero" id="hero-title">
          {t.lines.map((l, i) => (
            <span key={i} className={`display__line hero__line${i === t.accentLine ? " is-accent" : ""}`} style={{ animationDelay: `${120 + i * 120}ms` }}>
              {l}
            </span>
          ))}
        </h1>
        <p className="hero__body">{t.body}</p>
        <div className="btn-row">
          <Button href={demoHref}>{common.requestDemo}</Button>
          <Button href="#film" variant="ghost" icon="play">
            {common.watchVideo}
          </Button>
        </div>
      </div>

      {enabled && (
        <div className="container hero__foot">
          <button type="button" className="hero__pause" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>
            {playing ? (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" /></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1v8l7-4z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

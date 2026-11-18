"use client";

import { useEffect, useRef, useState } from "react";

const CLIPS = {
  balance: { desktop: "/video/balance-1280.mp4", mobile: "/video/balance-854.mp4", poster: "/images/balance-poster.webp" },
  power: { desktop: "/video/power-1280.mp4", mobile: "/video/power-854.mp4", poster: "/images/power-poster.webp" },
};

/**
 * Muted looping product clip (balance = MIA_R_Balance, power = MIA_R_POWER).
 * Loads only when it scrolls near the viewport, pauses off screen,
 * shows the poster only for reduced motion / Save-Data, and has a visible pause control.
 */
export default function BalanceVideo({ label, className = "", clip = "balance" }: { label: string; className?: string; clip?: keyof typeof CLIPS }) {
  const c = CLIPS[clip];
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduce && !saveData) setEnabled(true);
  }, []);

  useEffect(() => {
    const el = box.current;
    const v = video.current;
    if (!enabled || !el || !v) return;
    let loaded = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!loaded) {
            v.src = window.matchMedia("(max-width: 760px)").matches ? c.mobile : c.desktop;
            loaded = true;
          }
          if (!userPaused.current) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, c]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div ref={box} className={`balance-video ${className}`}>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster={c.poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {enabled && (
        <button type="button" className="balance-video__toggle" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" /></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1v8l7-4z" fill="currentColor" /></svg>
          )}
        </button>
      )}
    </div>
  );
}

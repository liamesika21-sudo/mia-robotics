"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useScrollProgress";

/**
 * Top-down schematic: the same corner in the same corridor.
 * Standard (front-only) steering needs a wider arc and its rear axle cuts inside the front path;
 * front + rear steering follows a tighter arc with the rear tracking the front.
 * Conceptual only — no turning radius is claimed.
 */

type Labels = {
  standard: { t: string; d: string };
  mia: { t: string; d: string };
  replay: string;
  title: string;
};

// Corridor: vertical lane x 120–240 (bottom → y 40), horizontal lane y 40–160 (x 120 → 360).
const WALLS = "M120 320 V40 H360 M240 320 V160 H360";

// Front-axle paths
const STD = "M180 330 V205 A105 105 0 0 1 285 100 H325";
const STD_REAR = "M190.6 330 V205 A94.4 94.4 0 0 1 285 110.6 H325";
const MIA = "M180 330 V160 A60 60 0 0 1 240 100 H325";

function Panel({
  kind,
  progress,
  label,
}: {
  kind: "std" | "mia";
  progress: number;
  label: { t: string; d: string };
}) {
  const front = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [pose, setPose] = useState({ x: 180, y: 300, a: 0, steer: 0 });

  useEffect(() => {
    if (front.current) setLen(front.current.getTotalLength());
  }, []);

  useEffect(() => {
    const path = front.current;
    if (!path || !len) return;
    const d = Math.max(1, progress * (len - 1));
    const pt = path.getPointAtLength(d);
    const ahead = path.getPointAtLength(Math.min(len, d + 1));
    const a = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI + 90;
    // Steering input only while the heading is changing (inside the arc).
    const inArc = a > 2 && a < 88;
    setPose({ x: pt.x, y: pt.y, a, steer: inArc ? (kind === "mia" ? 26 : 22) : 0 });
  }, [progress, len, kind]);

  const accent = kind === "mia";
  const stroke = accent ? "#00B8B0" : "#8ea0a4";
  const body = accent ? "#16282b" : "#1d2629";
  const tyre = accent ? "#00D5CC" : "#7f8f92";
  const dash = len ? `${len} ${len}` : undefined;
  const offset = len ? len * (1 - progress) : 0;

  return (
    <figure className={`steer-panel steer-panel--${kind}`}>
      <svg viewBox="0 0 360 340" aria-hidden="true">
        <defs>
          <pattern id={`floor-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#9fb3b6" strokeOpacity=".18" />
          </pattern>
        </defs>
        <path d="M120 340 V40 H360 V160 H240 V340Z" fill={`url(#floor-${kind})`} />
        <path d={WALLS} fill="none" stroke="#4d6064" strokeWidth="3" />
        {/* full ghost path */}
        <path d={kind === "mia" ? MIA : STD} fill="none" stroke={stroke} strokeOpacity=".18" strokeWidth="2" />
        {/* animated trace */}
        <path
          ref={front}
          d={kind === "mia" ? MIA : STD}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeDasharray={dash}
          strokeDashoffset={offset}
        />
        {kind === "std" && (
          <path d={STD_REAR} fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 6" opacity={0.25 + progress * 0.6} />
        )}
        {/* vehicle */}
        <g transform={`translate(${pose.x} ${pose.y}) rotate(${pose.a})`}>
          <rect x="-17" y="-28" width="34" height="56" rx="7" fill={body} stroke={stroke} strokeWidth="1.5" />
          <rect x="-9" y="-14" width="18" height="24" rx="2" fill="#2a3a3e" />
          {[
            [-21, -18, pose.steer],
            [21, -18, pose.steer],
            [-21, 18, kind === "mia" ? -pose.steer : 0],
            [21, 18, kind === "mia" ? -pose.steer : 0],
          ].map(([x, y, s], i) => (
            <rect key={i} x={x - 4} y={y - 9} width="8" height="18" rx="2" fill={tyre} transform={`rotate(${s} ${x} ${y})`} />
          ))}
        </g>
      </svg>
      <figcaption>
        <b>{label.t}</b>
        <span>{label.d}</span>
      </figcaption>
    </figure>
  );
}

export default function SteeringComparison({ labels, tone = "light" }: { labels: Labels; tone?: "light" | "dark" }) {
  const reduce = usePrefersReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const raf = useRef(0);

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const dur = 2800;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setP(t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (reduce) {
      setP(1);
      return;
    }
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [reduce, play]);

  return (
    <div ref={box} className={`steer steer--${tone}`} onPointerEnter={() => !reduce && p >= 1 && play()}>
      <div className="steer__panels" role="img" aria-label={labels.title}>
        <Panel kind="std" progress={p} label={labels.standard} />
        <Panel kind="mia" progress={p} label={labels.mia} />
      </div>
      {!reduce && (
        <button type="button" className="steer__replay" onClick={play}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M10 6a4 4 0 1 1-1.2-2.8M10 1v2.6H7.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {labels.replay}
        </button>
      )}
    </div>
  );
}

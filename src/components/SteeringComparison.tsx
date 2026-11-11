"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useScrollProgress";

/**
 * Turning circles drawn TO SCALE (units = millimetres) next to the robot.
 * Data from the client datasheet: robot 740 × 1,460 mm; turning radius 1,600 mm with front
 * steering only, 820 mm with front and rear steering. Both panels share one scale.
 */

const ROBOT_W = 740;
const ROBOT_L = 1460;
const WHEEL_L = 330;
const WHEEL_W = 150;
const AXLE = 1460 / 2 - 260; // axle offset from the robot centre
const VIEW = 4300; // same viewBox for both panels → same scale
const C = VIEW / 2;

type Panel = { t: string; r: string };
type Labels = { standard: Panel; mia: Panel; radius: string; robot: string; scale: string; replay: string; title: string };

function Robot({ kind, steer }: { kind: "std" | "mia"; steer: number }) {
  const accent = kind === "mia";
  const body = accent ? "#16282b" : "#1d2629";
  const stroke = accent ? "#00D5CC" : "#9fb0b3";
  const tyre = accent ? "#00D5CC" : "#7f8f92";
  // robot drawn heading +x (forward), centred at 0,0
  const wheels: [number, number, number][] = [
    [AXLE, -ROBOT_W / 2, steer],
    [AXLE, ROBOT_W / 2, steer],
    [-AXLE, -ROBOT_W / 2, kind === "mia" ? -steer : 0],
    [-AXLE, ROBOT_W / 2, kind === "mia" ? -steer : 0],
  ];
  return (
    <g>
      {wheels.map(([x, y, s], i) => (
        <rect
          key={i}
          x={x - WHEEL_L / 2}
          y={y - WHEEL_W / 2}
          width={WHEEL_L}
          height={WHEEL_W}
          rx="40"
          fill={tyre}
          transform={`rotate(${s} ${x} ${y})`}
        />
      ))}
      <rect x={-ROBOT_L / 2} y={-ROBOT_W / 2 + 40} width={ROBOT_L} height={ROBOT_W - 80} rx="90" fill={body} stroke={stroke} strokeWidth="22" />
      <rect x={-ROBOT_L / 2 + 280} y={-ROBOT_W / 2 + 150} width={ROBOT_L - 560} height={ROBOT_W - 300} rx="30" fill="#2a3a3e" />
      {/* forward marker */}
      <path d={`M${ROBOT_L / 2 - 150} -90 L${ROBOT_L / 2 - 40} 0 L${ROBOT_L / 2 - 150} 90`} fill="none" stroke={stroke} strokeWidth="26" />
    </g>
  );
}

function CirclePanel({ kind, R, label, progress, tone, radiusLabel }: { kind: "std" | "mia"; R: number; label: Panel; progress: number; tone: "light" | "dark"; radiusLabel: string }) {
  const accent = kind === "mia";
  const ring = accent ? "#00B8B0" : tone === "dark" ? "#8ea0a4" : "#7c8f93";
  const circ = 2 * Math.PI * R;
  const angle = progress * 300; // degrees travelled
  // Steering angle so each axle points at the turn centre (illustrative).
  const steer = kind === "mia" ? (Math.atan(AXLE / R) * 180) / Math.PI : (Math.atan((2 * AXLE) / R) * 180) / Math.PI;
  const grid = tone === "dark" ? "rgba(150,200,202,.08)" : "rgba(30,127,134,.09)";
  const txt = tone === "dark" ? "#c9d6d8" : "#3e5155";

  return (
    <figure className={`circle-panel circle-panel--${kind}`}>
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} aria-hidden="true">
        <defs>
          <pattern id={`g-${kind}-${tone}`} width="500" height="500" patternUnits="userSpaceOnUse">
            <path d="M500 0H0V500" fill="none" stroke={grid} strokeWidth="10" />
          </pattern>
        </defs>
        <rect width={VIEW} height={VIEW} fill={`url(#g-${kind}-${tone})`} />
        {/* full circle (ghost) + travelled arc */}
        <circle cx={C} cy={C} r={R} fill="none" stroke={ring} strokeOpacity=".22" strokeWidth="14" strokeDasharray="60 60" />
        <circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke={ring}
          strokeWidth="26"
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={circ * (1 - progress * (300 / 360))}
          transform={`rotate(-90 ${C} ${C})`}
          strokeLinecap="round"
        />
        {/* radius line + label */}
        <g transform={`rotate(${angle} ${C} ${C})`}>
          <line x1={C} y1={C} x2={C} y2={C - R} stroke={ring} strokeWidth="14" strokeDasharray="40 30" />
          <g transform={`translate(${C} ${C - R})`}>
            <Robot kind={kind} steer={steer} />
          </g>
        </g>
        <circle cx={C} cy={C} r="46" fill={ring} />
        <text x={C + 90} y={C + 260} className="circle-panel__r" fill={txt}>
          R {label.r}
        </text>
      </svg>
      <figcaption>
        <span className="circle-panel__t">{label.t}</span>
        <span className="circle-panel__v">
          <small>{radiusLabel}</small> {label.r}
        </span>
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
    const dur = 3200;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setP(t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (reduce) {
      setP(0.25);
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
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [reduce, play]);

  return (
    <div ref={box} className={`steer steer--${tone}`}>
      <div className="steer__panels" role="img" aria-label={labels.title}>
        <CirclePanel kind="std" R={1600} label={labels.standard} progress={p} tone={tone} radiusLabel={labels.radius} />
        <CirclePanel kind="mia" R={820} label={labels.mia} progress={p} tone={tone} radiusLabel={labels.radius} />
      </div>
      <div className="steer__foot">
        <span>{labels.robot}</span>
        <span>{labels.scale}</span>
        {!reduce && (
          <button type="button" className="steer__replay" onClick={play}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M10 6a4 4 0 1 1-1.2-2.8M10 1v2.6H7.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {labels.replay}
          </button>
        )}
      </div>
    </div>
  );
}

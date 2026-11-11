/**
 * FRONT VIEW schematic of the adaptive tilt principle (side to side roll).
 * MIA R drives toward the viewer; the wheels on one side climb a step, the chassis
 * rolls with the ground, the upper platform stays level.
 * Pure render: the caller supplies `progress` (0 → 1). Illustrative only, no real angles.
 */

const W = 800;
const H = 440;
const GROUND = 384;
const TRACK = 380; // distance between wheel centres (front view)
const WHEEL_W = 62;
const WHEEL_H = 132;
const STEP = 74; // step height

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function rot(x: number, y: number, a: number): [number, number] {
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
}

export type TiltLabels = { levelRef: string; platform: string; chassis: string; title: string };

export default function TiltDiagram({
  progress,
  labels,
  showParts = false,
  tone = "dark",
}: {
  progress: number;
  labels: TiltLabels;
  showParts?: boolean;
  tone?: "dark" | "light";
}) {
  const p = clamp(progress);
  // 0–0.12 approach · 0.12–0.5 left wheels climb the step · then hold
  const lift = ease(clamp((p - 0.12) / 0.38)) * STEP;
  // the step slides in under the left wheels during the approach
  const stepIn = ease(clamp(p / 0.14));

  const cx = W / 2;
  const lx = cx - TRACK / 2;
  const rx = cx + TRACK / 2;
  const ly = GROUND - WHEEL_H / 2 - lift;
  const ry = GROUND - WHEEL_H / 2;
  const a = Math.atan2(ry - ly, TRACK);
  const mx = (lx + rx) / 2;
  const my = (ly + ry) / 2;
  const deg = (a * 180) / Math.PI;

  const BODY_TOP = -112;
  const top = (x: number): [number, number] => {
    const [px, py] = rot(x, BODY_TOP, a);
    return [mx + px, my + py];
  };
  const pivot = top(0);
  const platY = pivot[1] - 46;
  const platX = pivot[0];
  const supL = top(-78);
  const supR = top(78);

  const dark = tone === "dark";
  const ink = dark ? "#c9d6d8" : "#3e5155";
  const groundCol = dark ? "#4b5e62" : "#55696d";
  const tyre = dark ? "#6f8084" : "#6f8084";
  const accent = "#00D5CC";
  const stepX = lx - 92;
  const stepW = 150;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="tilt-svg" role="img" aria-labelledby="tilt-svg-title">
      <title id="tilt-svg-title">{labels.title}</title>
      <defs>
        <linearGradient id="tiltBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={dark ? "#2d3b40" : "#2f3d41"} />
          <stop offset="1" stopColor="#141c1f" />
        </linearGradient>
        <pattern id="tiltHatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke={groundCol} strokeWidth="1" opacity=".45" />
        </pattern>
      </defs>

      {/* Ground + step */}
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="url(#tiltHatch)" />
      <g transform={`translate(${-(1 - stepIn) * 260} 0)`} opacity={stepIn}>
        <rect x={stepX} y={GROUND - STEP} width={stepW} height={STEP} fill="url(#tiltHatch)" stroke={groundCol} strokeWidth="3" />
      </g>
      <line x1="0" x2={W} y1={GROUND} y2={GROUND} stroke={groundCol} strokeWidth="4" />

      {/* Level reference (always horizontal) */}
      <line x1="30" x2={W - 30} y1={platY} y2={platY} stroke={accent} strokeWidth="1.5" strokeDasharray="7 7" opacity=".85" />
      <text x={W - 30} y={platY - 12} textAnchor="end" className="tilt-svg__ref" fill={accent}>
        {labels.levelRef}
      </text>

      {/* Chassis, suspension and wheels (roll together) */}
      <g transform={`translate(${mx} ${my}) rotate(${deg})`}>
        <line x1="-300" x2="300" y1={BODY_TOP} y2={BODY_TOP} stroke={ink} strokeWidth="1" strokeDasharray="3 6" opacity=".45" />
        {/* suspension arms */}
        {[-1, 1].map((s) => (
          <g key={s} stroke={ink} strokeOpacity=".55" strokeWidth="5" strokeLinecap="round">
            <line x1={s * 70} y1="-22" x2={s * (TRACK / 2 - 20)} y2="-14" />
            <line x1={s * 70} y1="12" x2={s * (TRACK / 2 - 20)} y2="10" />
          </g>
        ))}
        {/* angular body, as seen from the front */}
        <polygon
          points={`-118,${BODY_TOP} 118,${BODY_TOP} 132,-60 96,30 -96,30 -132,-60`}
          fill="url(#tiltBody)"
          stroke={ink}
          strokeOpacity=".4"
          strokeWidth="1.5"
        />
        <polygon points={`-70,-92 70,-92 60,10 -60,10`} fill="none" stroke={ink} strokeOpacity=".15" />
        {/* fender wings */}
        {[-1, 1].map((s) => (
          <polygon
            key={`f${s}`}
            points={`${s * 118},${BODY_TOP} ${s * (TRACK / 2 + 44)},${BODY_TOP - 22} ${s * (TRACK / 2 + 40)},${BODY_TOP - 6} ${s * 128},-74`}
            fill="#1a2427"
            stroke={ink}
            strokeOpacity=".35"
          />
        ))}
        {/* wheels */}
        {[-1, 1].map((s) => (
          <g key={`w${s}`} transform={`translate(${s * (TRACK / 2)} 0)`}>
            <rect x={-WHEEL_W / 2} y={-WHEEL_H / 2} width={WHEEL_W} height={WHEEL_H} rx="18" fill={tyre} />
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={i} x1={-WHEEL_W / 2 + 6} x2={WHEEL_W / 2 - 6} y1={-WHEEL_H / 2 + 14 + i * 17} y2={-WHEEL_H / 2 + 14 + i * 17} stroke="#111719" strokeOpacity=".5" strokeWidth="5" />
            ))}
          </g>
        ))}
      </g>

      {/* Tilt mechanism */}
      <line x1={platX - 78} y1={platY + 6} x2={supL[0]} y2={supL[1]} stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <line x1={platX + 78} y1={platY + 6} x2={supR[0]} y2={supR[1]} stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <line x1={platX} y1={platY + 6} x2={pivot[0]} y2={pivot[1]} stroke={accent} strokeWidth="2" opacity=".6" />
      <circle cx={pivot[0]} cy={pivot[1]} r="6" fill="#030607" stroke={accent} strokeWidth="2" />

      {/* Level platform with a sensor mast */}
      <g transform={`translate(${platX} ${platY})`}>
        <rect x="-170" y="-4" width="340" height="10" rx="2" fill={accent} />
        <line x1="-170" x2="-170" y1="-14" y2="16" stroke={accent} strokeWidth="2" />
        <line x1="170" x2="170" y1="-14" y2="16" stroke={accent} strokeWidth="2" />
        <rect x="-17" y="-36" width="34" height="32" rx="2" fill="none" stroke={accent} strokeWidth="2" />
        <line x1="0" x2="0" y1="-36" y2="-72" stroke={accent} strokeWidth="2" />
        <circle cx="0" cy="-76" r="4" fill={accent} />
        <text x="-150" y="-16" className="tilt-svg__plat" fill={accent}>
          {labels.platform}
        </text>
      </g>

      {showParts && (
        <g fontSize="13">
          <PartTag x={platX + 196} y={platY} k="A" ink={ink} />
          <PartTag x={supR[0] + 34} y={(platY + supR[1]) / 2 + 6} k="B" ink={ink} />
          <PartTag x={rx + 62} y={ry - 50} k="C" ink={ink} />
        </g>
      )}

      <text x="30" y={H - 18} className="tilt-svg__note" fill={ink} opacity=".75">
        {labels.chassis}
      </text>
    </svg>
  );
}

function PartTag({ x, y, k, ink }: { x: number; y: number; k: string; ink: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="13" fill="#030607" stroke={ink} strokeOpacity=".6" />
      <text textAnchor="middle" dy="4.5" fill="#fff" fontWeight="700">
        {k}
      </text>
    </g>
  );
}

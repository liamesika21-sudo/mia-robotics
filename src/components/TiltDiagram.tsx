/**
 * Side-view schematic of the adaptive tilt principle.
 * Pure render: the caller supplies `progress` (0 → 1 = robot position along the terrain).
 * Geometry is illustrative only — no real angles or dimensions are implied.
 */

const W = 800;
const H = 440;
const WHEELBASE = 210;
const R = 30;

// Terrain profile: flat → ramp up → plateau → ramp down → flat.
const profile: [number, number][] = [
  [0, 360],
  [240, 360],
  [400, 292],
  [520, 292],
  [640, 360],
  [800, 360],
];

function groundY(x: number) {
  for (let i = 0; i < profile.length - 1; i++) {
    const [x0, y0] = profile[i];
    const [x1, y1] = profile[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return profile[profile.length - 1][1];
}

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
  const p = Math.min(1, Math.max(0, progress));
  const cx = 130 + p * 550;
  const rx = cx - WHEELBASE / 2;
  const fx = cx + WHEELBASE / 2;
  const ry = groundY(rx) - R;
  const fy = groundY(fx) - R;
  const a = Math.atan2(fy - ry, WHEELBASE);
  const mx = (rx + fx) / 2;
  const my = (ry + fy) / 2;
  const deg = (a * 180) / Math.PI;

  // Chassis top pivot points (local coords → world).
  const top = (lx: number): [number, number] => {
    const [x, y] = rot(lx, -62, a);
    return [mx + x, my + y];
  };
  const pivot = top(0);
  const platY = pivot[1] - 40;
  const platX = pivot[0];
  const supL = top(-62);
  const supR = top(62);

  const groundPts = profile.map(([x, y]) => `${x},${y}`).join(" ");
  const ink = tone === "dark" ? "#c9d6d8" : "#3e5155";
  const body = tone === "dark" ? "#1d2629" : "#1b2427";
  const wheel = tone === "dark" ? "#7f8f92" : "#7f8f92";
  const groundCol = tone === "dark" ? "#46585c" : "#4d6064";
  const accent = "#00D5CC";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="tilt-svg" role="img" aria-labelledby="tilt-svg-title">
      <title id="tilt-svg-title">{labels.title}</title>
      <defs>
        <linearGradient id="tiltBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={tone === "dark" ? "#28353a" : "#2a383c"} />
          <stop offset="1" stopColor={body} />
        </linearGradient>
        <pattern id="tiltHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={groundCol} strokeWidth="1" opacity=".35" />
        </pattern>
      </defs>

      {/* Ground */}
      <polygon points={`${groundPts} 800,440 0,440`} fill="url(#tiltHatch)" />
      <polyline points={groundPts} fill="none" stroke={groundCol} strokeWidth="4" strokeLinejoin="round" />

      {/* Level reference — always horizontal */}
      <line x1="24" x2={W - 24} y1={platY} y2={platY} stroke={accent} strokeWidth="1.5" strokeDasharray="7 7" opacity=".9" />
      <text x={W - 24} y={platY - 12} textAnchor="end" className="tilt-svg__ref" fill={accent}>
        {labels.levelRef}
      </text>

      {/* Chassis + wheels */}
      <g transform={`translate(${mx} ${my}) rotate(${deg})`}>
        <line x1="-240" x2="240" y1="-37" y2="-37" stroke={ink} strokeWidth="1" strokeDasharray="3 5" opacity=".45" />
        <rect x="-140" y="-62" width="280" height="50" rx="8" fill="url(#tiltBody)" stroke={ink} strokeOpacity=".35" />
        <rect x="-126" y="-52" width="70" height="28" rx="3" fill="none" stroke={ink} strokeOpacity=".18" />
        <rect x="56" y="-52" width="70" height="28" rx="3" fill="none" stroke={ink} strokeOpacity=".18" />
        {[-WHEELBASE / 2, WHEELBASE / 2].map((x) => (
          <g key={x}>
            <circle cx={x} cy="0" r={R} fill={wheel} />
            <circle cx={x} cy="0" r={R - 9} fill="#111719" />
            <circle cx={x} cy="0" r="4" fill={wheel} />
          </g>
        ))}
      </g>

      {/* Tilt mechanism supports */}
      <line x1={platX - 62} y1={platY + 6} x2={supL[0]} y2={supL[1]} stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <line x1={platX + 62} y1={platY + 6} x2={supR[0]} y2={supR[1]} stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <circle cx={pivot[0]} cy={pivot[1]} r="5" fill="#030607" stroke={accent} strokeWidth="2" />
      <line x1={platX} y1={platY + 6} x2={pivot[0]} y2={pivot[1]} stroke={accent} strokeWidth="2" opacity=".6" />

      {/* Level platform with a sensor mast */}
      <g transform={`translate(${platX} ${platY})`}>
        <rect x="-150" y="-4" width="300" height="10" rx="2" fill={accent} />
        <line x1="-150" x2="-150" y1="-14" y2="16" stroke={accent} strokeWidth="2" />
        <line x1="150" x2="150" y1="-14" y2="16" stroke={accent} strokeWidth="2" />
        <rect x="70" y="-34" width="34" height="30" rx="2" fill="none" stroke={accent} strokeWidth="2" />
        <line x1="87" x2="87" y1="-34" y2="-66" stroke={accent} strokeWidth="2" />
        <circle cx="87" cy="-70" r="4" fill={accent} />
        <text x="-60" y="-16" textAnchor="middle" className="tilt-svg__plat" fill={accent}>
          {labels.platform}
        </text>
      </g>

      {showParts && (
        <g className="tilt-svg__parts" fontSize="13">
          <PartTag x={platX - 150} y={platY - 40} k="A" ink={ink} />
          <PartTag x={supL[0] - 34} y={(platY + supL[1]) / 2} k="B" ink={ink} />
          <PartTag x={mx - 175} y={my - 30} k="C" ink={ink} />
        </g>
      )}

      <text x="24" y={H - 18} className="tilt-svg__note" fill={ink} opacity=".7">
        {labels.chassis}
      </text>
    </svg>
  );
}

function PartTag({ x, y, k, ink }: { x: number; y: number; k: string; ink: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="12" fill="#030607" stroke={ink} strokeOpacity=".6" />
      <text textAnchor="middle" dy="4.5" fill={ink} fontWeight="700">
        {k}
      </text>
    </g>
  );
}

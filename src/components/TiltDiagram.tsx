/**
 * FRONT VIEW schematic of the adaptive tilt behaviour, matched to the MIA R reference render
 * and product film: when one wheel climbs a step, it rises on its double suspension arms,
 * both wheels stay upright, and the body with its top deck stays LEVEL.
 * Pure render: the caller supplies `progress` (0 → 1). Illustrative only, no real dimensions.
 */

const W = 800;
const H = 440;
const GROUND = 396;
const TRACK = 470; // distance between wheel centres
const WHEEL_W = 76;
const WHEEL_H = 168;
const STEP = 86;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

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
  const stepIn = ease(clamp(p / 0.16)); // block slides in under the right wheel
  const lift = ease(clamp((p - 0.14) / 0.4)) * STEP; // right wheel climbs

  const cx = W / 2;
  const lx = cx - TRACK / 2;
  const rx = cx + TRACK / 2;
  const ly = GROUND - WHEEL_H / 2; // left hub
  const ry = GROUND - WHEEL_H / 2 - lift; // right hub (on the step)

  // Body stays level; it rides at the mean wheel height.
  const by = (ly + ry) / 2 - 18; // body reference (arm pivot height)
  const deckY = by - 150;

  const dark = tone === "dark";
  const ink = dark ? "#c9d6d8" : "#3e5155";
  const groundCol = dark ? "#4b5e62" : "#55696d";
  const tyre = "#6f8084";
  const arm = dark ? "#9fb0b3" : "#5d7175";
  const accent = "#00D5CC";

  // Body outline (front view of MIA R: wide deck, V-shaped nose)
  const body = [
    [-150, deckY - by + 16],
    [150, deckY - by + 16],
    [118, 34],
    [62, 70],
    [-62, 70],
    [-118, 34],
  ]
    .map(([x, y]) => `${cx + x},${by + y}`)
    .join(" ");

  // Double wishbone arms: body pivots → wheel upright
  const arms = (side: -1 | 1, hubY: number) => {
    const hubX = side < 0 ? lx + WHEEL_W / 2 + 10 : rx - WHEEL_W / 2 - 10;
    const bx = cx + side * 96;
    return { upper: [bx, by - 26, hubX, hubY - 34], lower: [bx - side * 14, by + 40, hubX, hubY + 34], hubX };
  };
  const L = arms(-1, ly);
  const R = arms(1, ry);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="tilt-svg" role="img" aria-labelledby="tilt-svg-title">
      <title id="tilt-svg-title">{labels.title}</title>
      <defs>
        <linearGradient id="tiltBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={dark ? "#33434a" : "#36464b"} />
          <stop offset="1" stopColor="#121a1d" />
        </linearGradient>
        <pattern id="tiltHatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke={groundCol} strokeWidth="1" opacity=".45" />
        </pattern>
      </defs>

      {/* Ground + step block under the right wheel */}
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="url(#tiltHatch)" />
      <g transform={`translate(${(1 - stepIn) * 300} 0)`} opacity={stepIn}>
        <rect x={rx - 84} y={GROUND - STEP} width="190" height={STEP} fill={dark ? "#1b2427" : "#e9eef0"} stroke={groundCol} strokeWidth="3" />
      </g>
      <line x1="0" x2={W} y1={GROUND} y2={GROUND} stroke={groundCol} strokeWidth="4" />

      {/* Ground angle: line through both hubs (follows the terrain) */}
      <line
        x1={lx - 60}
        y1={ly + ((ry - ly) / TRACK) * -60}
        x2={rx + 60}
        y2={ry + ((ry - ly) / TRACK) * 60}
        stroke={ink}
        strokeWidth="1"
        strokeDasharray="3 6"
        opacity=".5"
      />

      {/* Level reference on the deck */}
      <line x1="24" x2={W - 24} y1={deckY} y2={deckY} stroke={accent} strokeWidth="1.5" strokeDasharray="7 7" opacity=".85" />
      <text x={W - 24} y={deckY - 12} textAnchor="end" className="tilt-svg__ref" fill={accent}>
        {labels.levelRef}
      </text>

      {/* Suspension arms + shock absorbers */}
      {[L, R].map((a, i) => (
        <g key={i} stroke={arm} strokeWidth="9" strokeLinecap="round">
          <line x1={a.upper[0]} y1={a.upper[1]} x2={a.upper[2]} y2={a.upper[3]} />
          <line x1={a.lower[0]} y1={a.lower[1]} x2={a.lower[2]} y2={a.lower[3]} />
          <line x1={a.upper[0] + (i ? -24 : 24)} y1={a.upper[1] - 34} x2={(a.lower[0] + a.lower[2]) / 2} y2={(a.lower[1] + a.lower[3]) / 2} strokeWidth="6" stroke={ink} strokeOpacity=".7" />
          {[a.upper, a.lower].map((s, j) => (
            <g key={j} strokeWidth="0" fill="#0c1113">
              <circle cx={s[0]} cy={s[1]} r="6" stroke={arm} strokeWidth="2.5" />
              <circle cx={s[2]} cy={s[3]} r="6" stroke={arm} strokeWidth="2.5" />
            </g>
          ))}
        </g>
      ))}

      {/* Wheels: always upright */}
      {[
        [lx, ly],
        [rx, ry],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect x={-WHEEL_W / 2} y={-WHEEL_H / 2} width={WHEEL_W} height={WHEEL_H} rx="22" fill={tyre} />
          {Array.from({ length: 9 }).map((_, k) => (
            <line key={k} x1={-WHEEL_W / 2 + 7} x2={WHEEL_W / 2 - 7} y1={-WHEEL_H / 2 + 14 + k * 17.5} y2={-WHEEL_H / 2 + 14 + k * 17.5} stroke="#111719" strokeOpacity=".5" strokeWidth="6" />
          ))}
        </g>
      ))}

      {/* Body (level) */}
      <polygon points={body} fill="url(#tiltBody)" stroke={ink} strokeOpacity=".45" strokeWidth="1.5" />
      <polygon
        points={[[-74, deckY - by + 40], [74, deckY - by + 40], [52, 40], [-52, 40]].map(([x, y]) => `${cx + x},${by + y}`).join(" ")}
        fill="none"
        stroke={ink}
        strokeOpacity=".16"
      />
      {/* Top deck with fenders over the wheels */}
      <rect x={lx - 34} y={deckY} width={TRACK + 68} height="16" fill="#1b2528" stroke={ink} strokeOpacity=".4" />
      <rect x={cx - 150} y={deckY - 6} width="300" height="8" fill={accent} />
      <rect x={cx + 80} y={deckY - 40} width="34" height="34" rx="2" fill="none" stroke={accent} strokeWidth="2" />
      <line x1={cx + 97} x2={cx + 97} y1={deckY - 40} y2={deckY - 74} stroke={accent} strokeWidth="2" />
      <circle cx={cx + 97} cy={deckY - 78} r="4" fill={accent} />
      <text x={cx - 140} y={deckY - 18} className="tilt-svg__plat" fill={accent}>
        {labels.platform}
      </text>

      {showParts && (
        <g fontSize="13">
          <PartTag x={cx - 196} y={deckY - 26} k="A" ink={ink} />
          <PartTag x={(R.upper[0] + R.upper[2]) / 2 + 6} y={(R.upper[1] + R.upper[3]) / 2 - 26} k="B" ink={ink} />
          <PartTag x={lx - 64} y={ly} k="C" ink={ink} />
        </g>
      )}

      <text x="24" y={H - 14} className="tilt-svg__note" fill={ink} opacity=".75">
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

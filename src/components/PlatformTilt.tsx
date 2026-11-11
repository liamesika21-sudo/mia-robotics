"use client";

import { useRef } from "react";
import type { Dict } from "@/content";
import { usePrefersReducedMotion, useScrollProgress } from "@/lib/useScrollProgress";
import TiltVisual from "./TiltVisual";

/** Platform page tilt diagram with labelled parts; progress follows the figure through the viewport. */
export default function PlatformTilt({ t, labels }: { t: Dict["platform"]["tilt"]; labels: Dict["tilt"] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const live = useScrollProgress(ref, "pass", reduce);
  const p = reduce ? 0.6 : live;
  return (
    <figure ref={ref} className="diagram diagram--light diagram--parts">
      <span className="diagram__corner" aria-hidden="true" />
      <TiltVisual progress={p} showParts tone="light" labels={{ levelRef: labels.levelRef, platform: labels.platform, chassis: labels.chassis, title: labels.svgTitle }} />
      <ul className="parts">
        {t.parts.map((x) => (
          <li key={x.k}>
            <span className="parts__k">{x.k}</span>
            <span>
              <b>{x.t}</b>
              <span>{x.d}</span>
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

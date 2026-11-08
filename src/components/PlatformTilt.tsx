"use client";

import { useRef } from "react";
import type { Dict } from "@/content";
import { usePrefersReducedMotion, useScrollProgress } from "@/lib/useScrollProgress";
import TiltDiagram from "./TiltDiagram";

/** Platform page tilt diagram with labelled parts; progress follows the figure through the viewport. */
export default function PlatformTilt({ t, labels }: { t: Dict["platform"]["tilt"]; labels: Dict["tilt"] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const live = useScrollProgress(ref, "pass", reduce);
  const p = reduce ? 0.34 : live;
  return (
    <figure ref={ref} className="diagram diagram--light diagram--parts">
      <span className="diagram__corner" aria-hidden="true" />
      <figcaption className="diagram__tag">{labels.diagramTag}</figcaption>
      <TiltDiagram progress={p} showParts tone="light" labels={{ levelRef: labels.levelRef, platform: labels.platform, chassis: labels.chassis, title: labels.svgTitle }} />
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
      <p className="diagram__note">{labels.diagramNote}</p>
    </figure>
  );
}

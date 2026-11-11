"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import TiltDiagram, { type TiltLabels } from "./TiltDiagram";

/**
 * The slot for the adaptive tilt visual.
 * Until the client's illustrated front view animation arrives, it renders the schematic.
 * Once site.tiltIllustration is set, the video is scrubbed by the same scroll progress.
 */
export default function TiltVisual({
  progress,
  labels,
  showParts,
  tone,
}: {
  progress: number;
  labels: TiltLabels;
  showParts?: boolean;
  tone?: "dark" | "light";
}) {
  const ill = site.tiltIllustration;
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    v.currentTime = Math.min(v.duration - 0.05, progress * v.duration);
  }, [progress]);

  if (ill) {
    return (
      <video
        ref={video}
        className="tilt-video"
        src={ill.src}
        poster={ill.poster}
        muted
        playsInline
        preload="auto"
        aria-label={labels.title}
      />
    );
  }
  return <TiltDiagram progress={progress} labels={labels} showParts={showParts} tone={tone} />;
}

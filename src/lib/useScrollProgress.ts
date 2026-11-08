"use client";

import { useEffect, useState, type RefObject } from "react";

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return reduce;
}

/**
 * 0 → 1 progress of an element through the viewport.
 * mode "sticky": progress across a tall wrapper (top hits viewport top → bottom hits viewport bottom).
 * mode "pass":   progress while the element crosses the viewport.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, mode: "sticky" | "pass", disabled = false) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (disabled) return;
    let raf = 0;
    let target = 0;
    let current = 0;
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (mode === "sticky") {
        const total = r.height - vh;
        target = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      } else {
        target = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height) * 1.5 - 0.2));
      }
    };
    const tick = () => {
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.0005) current = target;
      setP(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, mode, disabled]);
  return p;
}

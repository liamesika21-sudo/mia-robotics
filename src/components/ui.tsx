import Link from "next/link";
import { site } from "@/content/site";
import type { ReactNode } from "react";

/** "— 01 / THE CHALLENGE" label with the thin turquoise rule from the Figma. */
export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className}`}>
      <span className="label__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** Editorial heading: lines from `accentFrom` onward are turquoise. */
export function Title({
  lines,
  accentFrom,
  as: Tag = "h2",
  className = "",
  id,
}: {
  lines: readonly string[];
  accentFrom?: number;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={`display ${className}`} id={id}>
      {lines.map((l, i) => (
        <span key={i} className={`display__line${accentFrom !== undefined && i >= accentFrom ? " is-accent" : ""}`}>
          {l}
        </span>
      ))}
    </Tag>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "text";
  icon?: "arrow" | "play" | "none";
  className?: string;
  onClick?: () => void;
};

/** Arrow glyph that mirrors in RTL (CSS handles the flip). */
export function Arrow() {
  return (
    <svg className="icon-arrow" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
export function PlayGlyph({ size = 10 }: { size?: number }) {
  return (
    <svg className="icon-play" width={size} height={size} viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 1v8l7-4z" fill="currentColor" />
    </svg>
  );
}

export function Button({ href, children, variant = "primary", icon = "arrow", className = "" }: BtnProps) {
  const isInPage = href.startsWith("#");
  const content = (
    <>
      <span>{children}</span>
      {icon === "arrow" && <Arrow />}
      {icon === "play" && <PlayGlyph />}
    </>
  );
  const cls = `btn btn--${variant} ${className}`;
  return isInPage ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/**
 * MIA Robotics logo. Uses the official file from site.logo when set,
 * otherwise a temporary text wordmark.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  if (site.logo) {
    const src = tone === "dark" && site.logo.dark ? site.logo.dark : site.logo.light;
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="logo-img" src={src} alt="MIA Robotics" width={site.logo.width} height={site.logo.height} />;
  }
  return (
    <span className={`logo logo--${tone}`} dir="ltr">
      <svg className="logo__mark" width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
        <path d="M1 15 7 1l6 14L19 1l6 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="bevel" />
      </svg>
      <span className="logo__word">
        MIA <b>ROBOTICS</b>
      </span>
    </span>
  );
}

/** Temporary MIA Dynamics wordmark — replace with the official vector file once supplied. */
export function DynamicsMark({ tone = "dark" }: { tone?: "light" | "dark" }) {
  return (
    <span className={`dyn-mark dyn-mark--${tone}`} dir="ltr">
      <svg width="30" height="18" viewBox="0 0 26 16" aria-hidden="true">
        <path d="M1 15 7 1l6 14L19 1l6 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="bevel" />
      </svg>
      <span>
        MIA <b>DYNAMICS</b>
      </span>
    </span>
  );
}

/**
 * Publication switches. Everything that needs client approval is gated here.
 * Flip a switch only after the client has approved the matching content.
 */
export const site = {
  name: "MIA Robotics",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  /** Full product film on YouTube (lazy-loaded, privacy-enhanced embed). */
  youtubeId: "5NRKtT-eUHc",

  /**
   * Hebrew copy is a DRAFT until the client approves it. While false:
   * Hebrew pages are noindex, excluded from the sitemap and hreflang, and show a draft notice.
   */
  hebrewApproved: false,

  /** Technical specifications stay completely out of the HTML until approved (see content/specs.ts). */
  specsApproved: false,

  /** Team grid stays hidden until names, roles AND approved photos exist (see content/team.ts). */
  teamApproved: false,

  investorsEmail: process.env.NEXT_PUBLIC_INVESTORS_EMAIL || "",
};

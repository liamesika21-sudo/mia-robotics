/**
 * Publication switches. Everything that needs client approval is gated here.
 * Flip a switch only after the client has approved the matching content.
 */
export const site = {
  name: "MIA Robotics",
  /**
   * Public address used for canonical, og:url, og:image, hreflang, robots.txt and sitemap.xml.
   * Order: NEXT_PUBLIC_SITE_URL (set this once the custom domain is live), then the production
   * domain Vercel exposes at build time, then a local fallback for `npm run dev`.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "https://mia-robotics.vercel.app"
  ).replace(/\/$/, ""),

  /** Full product film on YouTube (lazy-loaded, privacy-enhanced embed). */
  youtubeId: "5NRKtT-eUHc",

  /**
   * Hebrew copy is a DRAFT until the client approves it. While false, Hebrew pages are noindex and
   * show a draft notice. They are listed in the sitemap and hreflang either way (client request, 16 Nov).
   */
  hebrewApproved: false,

  /** Technical specifications stay completely out of the HTML until approved (see content/specs.ts). */
  specsApproved: false,

  /** Team grid stays hidden until names, roles AND approved photos exist (see content/team.ts). */
  teamApproved: false,

  /**
   * Official logo files. Leave null to use the temporary text wordmark.
   * Drop the SVGs into /public/brand and set e.g. "/brand/mia-robotics.svg".
   */
  logo: { light: "/brand/mia-robotics-white.png", width: 258, height: 28 } as null | { light: string; dark?: string; width: number; height: number },

  /**
   * The client's illustrated front view tilt animation (video). While null, the schematic is shown.
   * Example: { src: "/video/tilt-front.mp4", poster: "/images/tilt-front.webp" }
   */
  tiltIllustration: null as null | { src: string; poster?: string },

  /** Public contact email shown in the closing "See it in the field" section. Empty = not shown. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",

  /** Parent company site (opened from the MIA Dynamics logo). */
  dynamicsUrl: "https://miadynamics.com/",

  investorsEmail: process.env.NEXT_PUBLIC_INVESTORS_EMAIL || "",
};

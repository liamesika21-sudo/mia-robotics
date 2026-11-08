# QA & Security checklist — MIA Robotics website

Build under test: local production build (`next build && next start`), 8 Nov 2026.
Evidence: automated Playwright runs against the production server, with screenshots reviewed at 1440 px and 390 px.

Status key: **PASS** · **FAIL** · **PENDING** (needs a client input or the production environment)

## Build

| Check | Status | Evidence |
|---|---|---|
| `next build` completes, 0 TypeScript errors | PASS | 8 locale pages + `/api/contact`, sitemap, robots, icon generated |
| All pages statically generated per locale | PASS | `/en`, `/he` × home/platform/company/contact = SSG |
| No console errors on any page | PASS | 0 errors on all 5 pages tested × 2 widths |

## Layout and responsiveness

| Check | Status | Evidence |
|---|---|---|
| No horizontal overflow at 1440 / 390 | PASS | `scrollWidth − innerWidth = 0` on every page, both widths |
| Header: sticky, transparent over hero, solid on scroll, active-page indicator | PASS | Screenshots |
| Mobile menu: dialog, focus trap, Esc closes, scroll lock | PASS | Code review (`Header.tsx`) |
| Black → white → black rhythm, black dominant | PASS | Home: B/W/B/charcoal/W/B/W/B · Platform: B/W/B/charcoal/W/B |
| Tablet (768–1180) and small mobile (≤380) breakpoints | PASS (CSS) | Dedicated breakpoints. Spot-check on real devices recommended |
| RTL: mirrored nav, text alignment, arrows, form selects | PASS | `/he` screenshots at 1440 and 390 |

## Video

| Check | Status | Evidence |
|---|---|---|
| Hero loop autoplay + muted + loop + playsinline, poster fallback | PASS | Plays in Chrome. Poster shown first |
| Mobile gets a lighter encode (854 px, 1.3 MB) | PASS | Desktop: 1280 px WebM 2.2 MB / MP4 2.8 MB |
| Reduced motion / Save-Data: no autoplay, poster only | PASS | Tested with `reducedMotion: reduce` |
| Visible pause control (WCAG 2.2.2) | PASS | Pause button in the hero footer |
| Full film: custom poster, YouTube injected only on click (nocookie) | PASS | No iframe in the initial HTML |
| Final hero loop from the client's optimized master | PENDING | The current loop is cut from `MIA_R_WEB_.mp4` (20–36 s) |

## Contact form

| Check | Status | Evidence |
|---|---|---|
| Required fields validated client + server | PASS | Empty submit → 4 field errors + summary, focus moved to the summary |
| Invalid email rejected | PASS | "Enter a valid email address." |
| Localized errors (HE) | PASS | "שדה חובה." ×4 |
| `?request=datasheet` preselects the checkbox | PASS | `isChecked = true` |
| No false success when delivery isn't configured | PASS | Shows "The form isn't connected yet…". API returns 503 |
| Honeypot rejects bots | PASS | `{"error":"rejected"}` |
| Too-fast submissions rejected (< 2.5 s) | PASS | `{"error":"rejected"}` |
| Rate limit (5 per 10 min per IP) | PASS | Requests 6–7 → 429 |
| Cross-origin POST blocked | PASS | `Origin: https://evil.com` → 403 |
| HTML escaped in the notification email | PASS | Code review (`esc()`) |
| No auto-reply email to the visitor | PASS | Only `CONTACT_TO_EMAIL` receives mail |
| **End-to-end delivery to the verified MIA inbox** | **PENDING** | Needs `RESEND_API_KEY`, a verified domain and the recipient address |

## Content gates (nothing unapproved is published)

| Check | Status | Evidence |
|---|---|---|
| Technical specs absent from HTML/JS | PASS | Section returns `null`. `specs.ts` holds no draft numbers |
| Team names absent from the build output | PASS | grep of `.next/` for the draft names: 0 matches |
| IP67 not mentioned | PASS | grep: 0 matches |
| Patent counts / manufacturing volumes not stated | PASS | Copy uses only the brief's qualitative wording |
| Scenario images labelled "Concept visual" + illustration notice | PASS | Home §06, Platform configurations |
| Hebrew draft: noindex + banner + excluded from sitemap/hreflang | PASS | `<meta name="robots" content="noindex, nofollow">` |
| Placeholder emails | PASS | None. Investors email comes from an env var or falls back to the form |

## SEO

| Check | Status | Evidence |
|---|---|---|
| Unique title/description per page and locale | PASS | `content/en.ts → meta` |
| Canonical + hreflang (en, x-default; he once approved) | PASS | `<link rel="canonical">` / `alternate` |
| sitemap.xml, robots.txt | PASS | Generated |
| OG / Twitter cards | PASS | `/og.jpg` 1200×630 |
| Organization JSON-LD (name + URL only) | PASS | |
| Production domain | PENDING | Set `NEXT_PUBLIC_SITE_URL` |

## Security

| Check | Status | Evidence |
|---|---|---|
| CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy | PASS | Response headers verified |
| No secrets in frontend code | PASS | Only `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_INVESTORS_EMAIL` are public |
| `X-Powered-By` removed | PASS | `poweredByHeader: false` |
| Shared rate-limit store for serverless | PENDING | In-memory limiter is per instance (see README) |

## Accessibility

| Check | Status | Evidence |
|---|---|---|
| Skip link, landmarks, one h1 per page, ordered headings | PASS | |
| Keyboard focus visible | PASS | `:focus-visible` turquoise outline |
| Form labels, `aria-invalid`, `aria-describedby`, live error summary | PASS | |
| Diagrams have text alternatives | PASS | `<title>` / `aria-label` on the tilt and steering diagrams |
| Reduced-motion fallbacks | PASS | Static tilt frame, full steering paths, no reveals |
| Contrast: turquoise text on light uses `#00968F` | PASS | |
| Full audit with a screen reader (VoiceOver/NVDA) | PENDING | Before launch |

## Assets still required from the client

- Official vector logos for MIA Robotics and MIA Dynamics (temporary text wordmarks are in place)
- High-resolution originals of the six scenario images (current ones come from the Figma file at 467 px)
- The final optimized hero loop
- Approved Hebrew copy, technical specifications, team photos and roles
- Verified recipient address, investors address and production domain

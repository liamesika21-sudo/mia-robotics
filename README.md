# MIA Robotics — website

Bilingual (EN / HE) marketing site for **MIA Robotics** and the **MIA R4X4** UGV.
Next.js 16 (App Router) · React 19 · TypeScript · plain CSS (design tokens in `src/styles/globals.css`).

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000  →  redirects to /en
npm run build && npm start   # production build
npm run lint                 # TypeScript check
```

Node 20.9+ is required. Fonts are self-hosted (`src/fonts`), so the build needs no network access.

## Pages and routes

| Page     | EN             | HE             |
|----------|----------------|----------------|
| Home     | `/en`          | `/he`          |
| Platform | `/en/platform` | `/he/platform` |
| Company  | `/en/company`  | `/he/company`  |
| Contact  | `/en/contact`  | `/he/contact`  |

`/en/contact?request=datasheet` opens the form with "Send me the datasheet" ticked.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production domain, e.g. `https://www.miarobotics.com`. Used for canonical, hreflang, sitemap, OG. |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) (the sending domain must be verified there). |
| `CONTACT_TO_EMAIL` | The verified MIA recipient (comma-separated for several). |
| `CONTACT_FROM_EMAIL` | Sender on the verified domain, e.g. `MIA Website <web@miarobotics.com>`. |
| `NEXT_PUBLIC_INVESTORS_EMAIL` | Verified investors address. Empty = the Investors button goes to the contact form. |

If any of the three contact variables is missing, the form shows an error ("The form isn't connected yet") and **never** a false success. The visitor gets no automatic email.

## Publication switches — `src/content/site.ts`

Content that needs client approval stays hidden until a switch is flipped:

| Switch | Effect while `false` |
|---|---|
| `hebrewApproved` | Hebrew pages are `noindex`, left out of the sitemap and hreflang, and show a "draft translation" banner. |
| `specsApproved` | The specifications section renders **nothing**: no markup, no data in the page source. |
| `teamApproved` | The team grid is not rendered. It also needs every member to have an approved photo. |

## How to update content

- **All copy:** `src/content/en.ts` (English) and `src/content/he.ts` (Hebrew, same structure, enforced by TypeScript).
- **Technical specifications:** add approved rows to `src/content/specs.ts`, then set `specsApproved: true`.
- **Team:** add members (name, role, photo path in `/public/images/team/…`) to `src/content/team.ts`, then set `teamApproved: true`.
- **Full product film:** change `youtubeId` in `src/content/site.ts`.
- **Hero loop:** replace the files in `public/video/` and keep the names:
  - `hero-1280.mp4` and `hero-1280.webm` (desktop), `hero-854.mp4` (mobile)
  - poster images `public/images/hero-poster.webp` and `hero-poster-960.webp`
  - Suggested encode (10–20 s, no audio):
    `ffmpeg -i in.mp4 -an -t 16 -vf scale=1280:-2 -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart hero-1280.mp4`
- **Logos:** `Logo` and `DynamicsMark` in `src/components/ui.tsx` are temporary text wordmarks. Replace them with the official SVGs when they arrive.

## Architecture

```
src/
  app/[lang]/            layout + 4 pages (statically generated per locale)
  app/api/contact/       form endpoint (validation, honeypot, timing trap, rate limit, Resend delivery)
  app/sitemap.ts, robots.ts, icon.svg
  components/            Header, LanguageSwitcher, CinematicHero, ProductVideoSection,
                         AdaptiveTiltExplainer + TiltDiagram, SteeringComparison,
                         sections.tsx (Challenge, Missions, Backed, Final CTA, Platform/Company blocks),
                         DemoRequestForm, Footer, Reveal
  content/               en.ts, he.ts, site.ts (switches), specs.ts, team.ts
  lib/                   i18n, SEO metadata, contact schema, scroll hooks
  styles/globals.css     tokens + all styles (logical properties for RTL)
```

Motion respects `prefers-reduced-motion`. The hero clip doesn't autoplay then, the tilt explainer shows one static frame, the steering diagram shows the full paths, and no content depends on animation.

## Deployment notes

- Built for Vercel or any Node host. The contact route runs on the server.
- The rate limiter is in-memory, which suits a single instance. On multi-instance or serverless hosting, move it to a shared store such as Upstash or Vercel KV.
- Security headers (CSP, HSTS, frame-ancestors, etc.) are set in `next.config.ts`.

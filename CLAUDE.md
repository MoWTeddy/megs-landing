# megs-landing — Claude Code instructions

## What this is

Marketing landing page for **Megs**, the 5-a-side football management app at `app.megs.club`. This is a **standalone repo** — entirely separate from the main app codebase at `/Users/eddie/fairteams-git/`.

Eddie is the sole developer / owner. This is the public-facing site at the apex domain `megs.club`.

## Stack

- **Astro** v5 + **Tailwind v4** (via `@tailwindcss/vite`)
- TypeScript (strict)
- Static-rendered — ships near-zero JS by default
- Hosting: Vercel (auto-deploys on push to `main`); DNS at GoDaddy

## Key facts

- Tagline: **"Your weekly football, sorted."**
- Primary CTA: `https://app.megs.club/create` (drops straight into the create-group wizard)
- Secondary: `https://app.megs.club` (for returning users)
- The app's privacy notice lives at `/Users/eddie/fairteams-git/PRIVACY.md` — when you build the `/privacy` route, copy from there (don't re-write).

## Brand

Mirrors the app's tokens — keep these in sync if you change them in `src/styles/global.css`:

| Token | Hex | Use |
|---|---|---|
| Astro Green | `#2BD06B` | Page background |
| Boot Black | `#0E0F0C` | Primary buttons + body text |
| Panini Cream | `#F4EFE0` | Card surfaces |
| Mercurial Orange | `#FF5B1F` | Urgency / accent |

Fonts: **Bagel Fat One** (display headings), **Inter Tight** (body) — loaded from Google Fonts in `global.css`.

The app's full Tailwind config and CSS variables are in `/Users/eddie/fairteams-git/tailwind.config.ts` and `/Users/eddie/fairteams-git/src/index.css` — reference them if you need to match a particular shadow / radius / etc.

## Workflow

1. **`npm run dev`** to start the dev server (port 4321 by default)
2. **`npm run build`** for production build → outputs to `dist/`
3. **Push to `main`** → Vercel auto-deploys

## What's already in place

- `src/layouts/Layout.astro` — base HTML layout, SEO + OG tags
- `src/pages/index.astro` — placeholder hero + 3 feature cards + footer
- `src/styles/global.css` — Tailwind import + brand tokens + font loading
- `public/` — all brand assets copied from the app (`megs-logo.svg`, `apple-touch-icon.png`, `favicon.png`, `og-image.png` etc.)

## What's next

The hero is a first draft — Eddie will want to iterate on copy, layout, screenshots, and add a `/privacy` page. There's no analytics wired up yet (likely Plausible or PostHog when ready).

## Don'ts

- Don't break the build — `npm run build` must pass before pushing.
- Don't copy code wholesale from the app repo — this is a marketing site, not a SPA. Keep JS minimal.
- Don't add interactive components unless genuinely needed — Astro ships zero JS by default and that's the point.
- Don't change the brand tokens without asking — they're synced with the app.

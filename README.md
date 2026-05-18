# megs-landing

Marketing landing page for [Megs](https://app.megs.club) — the 5-a-side football management app.

- **Stack:** Astro + Tailwind v4
- **Domain:** `megs.club` (apex) — the app lives at `app.megs.club`
- **Brand assets:** copied in from the app repo (`/Users/eddie/fairteams-git/public/`)
- **Primary CTA:** `https://app.megs.club/create` (drops straight into the "create a group" wizard)

## Develop locally

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

## Deploy

Connected to Vercel — auto-deploys on push to `main`. DNS for `megs.club` lives at GoDaddy.

## Brand tokens

Mirrors the app's Tailwind theme. Edit `src/styles/global.css` to keep in sync.

- Astro Green `#2BD06B` — page background
- Boot Black `#0E0F0C` — primary buttons + text
- Panini Cream `#F4EFE0` — card surfaces
- Mercurial Orange `#FF5B1F` — urgency / accent

Fonts: **Bagel Fat One** (display), **Inter Tight** (body).

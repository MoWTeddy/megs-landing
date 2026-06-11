# Screenshot capture spec

Drop captured PNGs in this directory using the exact filenames below. Astro's `<Image />` component will optimise them automatically at build time.

## Capture rules

- **Source:** your real demo group in the app (`app.megs.club`) - names, fixtures, history all real.
- **Device:** iPhone 15 Pro (393×852pt) or larger, in light mode. Capture at 2x DPR minimum.
- **Chrome:** no system status bar, no device frame - just the app surface. We add framing in CSS.
- **Theme:** keep the app's default cream/black palette so it sits naturally on the page.

## Files needed

| Filename | Aspect | What to capture | Used in |
|---|---|---|---|
| `hero-fixture-card.png` | ~3:4 portrait | The "next fixture" card on the group home - Tuesday, kick-off countdown, IN/OUT count, auto-balanced bibs vs skins | Hero (right side) |
| `step-1-create.png` | 9:19.5 phone | Create-game wizard mid-flow (time/pitch/players visible) | "How it works" step 1 |
| `step-2-share.png` | 9:19.5 phone | The share screen or the joining flow as seen by a player | "How it works" step 2 |
| `step-3-teams.png` | 9:19.5 phone | The auto-balanced teams view (bibs/skins, ratings visible) | "How it works" step 3 |
| `balancing-ratings.png` | 4:3 landscape slice | Player-ratings panel OR the auto-balanced teams view showing each player's rating | "How balancing works" section |
| `feature-teams.png` | 4:3 landscape slice | Just the balanced-teams panel, no app chrome around it | "What Megs handles" - Teams card |
| `feature-availability.png` | 4:3 landscape slice | The IN/OUT/BENCH player list | "What Megs handles" - Who's playing card |
| `feature-payments.png` | 4:3 landscape slice | The payments panel showing who's paid and who hasn't | "What Megs handles" - Payments card |
| `feature-stats.png` | 4:3 landscape slice | A leaderboard / form table / Man of the Match summary | "What Megs handles" - Stats card |

## Optional / later

| Filename | Aspect | What to capture | Used in |
|---|---|---|---|
| `cta-home.png` | 9:19.5 phone | The group home screen in its best state | Final CTA (optional) |

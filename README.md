# Crestline Cricket — Premium Cricket Landing Page

A premium, sports-broadcast-inspired cricket landing page built with React,
Vite and Tailwind CSS. Live scoreboard, upcoming matches with countdowns,
player stats, tournament standings, video-style highlights, news, testimonials,
newsletter/contact forms, and a full set of micro-interactions.

All team, player, tournament and brand names are original fictional content
created for this demo — not affiliated with any real league or athlete.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)
- Swiper.js (carousels: upcoming matches, testimonials)

## Getting Started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL printed in your terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

`npm run build` outputs a production-ready bundle to `dist/`. `npm run preview`
serves that build locally so you can verify it before deploying.

## Project Structure

```
src/
  components/     Reusable UI components (Navbar, Hero, LiveScore, ...)
  context/        ToastContext — app-wide toast notifications
  data/           cricketData.js — all match/player/news content in one place
  hooks/          useCountUp, useCountdown
  App.jsx         Assembles all sections
  index.css       Tailwind import + design tokens (colors, fonts)
public/
  favicon.svg, og-image.svg
```

## Customizing Content

Almost all text content (matches, players, standings, news, testimonials,
stats) lives in `src/data/cricketData.js`. Edit that file to plug in your own
teams, players and copy — components will update automatically.

Colors and fonts are defined as design tokens in `src/index.css` under the
`@theme` block (e.g. `--color-cyan`, `--font-display`). Change them there to
retheme the whole site.

## Notes

- Respects `prefers-reduced-motion` (animations are shortened/disabled).
- The match-alerts popup dismissal is stored in `localStorage` so it won't
  reappear once a visitor closes it.
- Images are illustrated with SVG/CSS rather than photos, so there are no
  external image licenses to manage — swap in your own photography under
  `public/` and reference it from the relevant component if you'd prefer
  real photos.

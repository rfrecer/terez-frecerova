# CLAUDE.md — Terez Frecerová Portfolio

Guidance for AI assistants working on this repository. See also [README.md](README.md) for design philosophy.

## Project overview

Single-page Slovak artist portfolio for Terez Frecerová (writer, songwriter, lyricist). Neo-brutalist visual style. No backend, no router, no CMS. Live at [terezfrecerova.sk](https://terezfrecerova.sk) (GitHub Pages).

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview dist locally
npm run lint     # ESLint (must pass before merge)
```

## Tech stack

- React 19, Vite 7, Tailwind CSS v4 via `@tailwindcss/vite`
- Framer Motion (hero draggable photos)
- Lucide React icons
- Deploy: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)

## Directory map

```
index.html              → SEO shell, OG tags
src/main.jsx            → React entry
src/index.css           → fonts, Tailwind, custom utility classes
src/data/siteData.js    → all site content (concerts, album, projects, nav)
src/App.jsx             → section components + page layout
public/concerts/        → gig photos ({YYYY-MM-DD}-{venue-slug}.{jpg|jpeg})
public/hero/            → hero1–3.jpg
public/projects/        → album/book/podcast art
public/fonts/           → Space Mono, Syne, Modak
public/icons/           → favicons
public/social-preview.jpg
```

## Page structure (scroll order)

`Marquee` → `Navbar` → `#home` Hero → `#music` Album → `#concerts` Archive → `#projects` (3 blocks) → `#contact` Footer

Nav uses `scrollIntoView` on section IDs defined in `navItems`.

## Architecture conventions

- **Monolithic by design:** section components live as local functions in `src/App.jsx`, not in `src/components/`. Do not split files unless explicitly requested.
- **Data in `src/data/siteData.js`:** content constants are exported from a dedicated module and imported into `App.jsx`.
- **Static assets via string paths:** images/fonts referenced as `/concerts/...`, never imported as modules.
- **No env secrets:** static site; no `.env` needed.

## Design system rules (when adding UI)

- Default card/button: `border-2 border-black bg-white neo-shadow`
- Section dividers: `border-b-2 border-black`
- Base page bg: `#f8f5f2`; texture: `.noise-bg`
- Fonts: `.font-syne` (headlines), `.font-mono` / default sans (UI), `.font-bubbly` (decorative)
- Custom shadows/animation live in `src/index.css` — prefer existing classes over new one-offs
- Avoid soft shadows, heavy rounding, gray SaaS patterns

## Content editing guide

| Task | Where |
|------|-------|
| Add concert | Append to `rawConcerts` in `src/data/siteData.js`; `date` must be `YYYY-MM-DD` |
| Add concert photo | Save as `public/concerts/{YYYY-MM-DD}-{venue-slug}.jpg`, set `photoUrl` |
| Add marquee link | Edit duplicated `Marquee` content in `App.jsx` (both sets for loop) |
| Update album | Edit `album` + `projectImages.malaBySom` in `siteData.js` |
| Update project | Edit `projects` array + matching `projectImages` key in `siteData.js` |
| Add hero photo | Drop in `public/hero/`, update `projectImages.hero` |

## Concert sorting behavior

`useMemo` in `App` splits `rawConcerts` by `new Date()` into `upcoming` (ascending) and `past` (descending). Adds `displayDate` / `displayYear` via `sk-SK` locale.

## Past concerts

Past archive cards use horizontal scroll (`.no-scrollbar`). Each card links to the event URL (`gig.link`) — not a lightbox or gallery.

## Concert photo naming

Convention: `{YYYY-MM-DD}-{venue-slug}.{jpg|jpeg}` — lowercase extension, hyphens instead of spaces.

Example: `2026-05-21-kurnik.jpg`

## Known quirks / do-not-break

- Hero uses `min-h-[90svh]` on mobile to avoid address-bar resize jump
- `ProjectsSection` render order (Rapíky → LSDolina → Smiešna) uses `getProjectById()` lookups
- `base: './'` in `vite.config.js` required for GitHub Pages relative paths

## Deployment

Push to `main` triggers CI build + GitHub Pages deploy. Build output: `dist/` with `.nojekyll` added in workflow.

## Future work (out of scope unless requested)

- Scroll-spy for `activeSection` (currently click-only)
- `window.innerWidth` in HeroSection render — won't update on resize
- Data-driven Marquee (currently duplicated markup for seamless loop)

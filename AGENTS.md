# Agent instructions — Terez Frecerová Portfolio

Canonical guidance for AI coding agents. See [README.md](README.md) for long-form design philosophy. Claude Code loads this via [CLAUDE.md](CLAUDE.md).

## Project overview

Single-page Slovak artist portfolio for Terez Frecerová (writer, songwriter, lyricist). Neo-brutalist visual style. No backend, no router, no CMS. Live at [terezfrecerova.sk](https://terezfrecerova.sk) (GitHub Pages).

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview dist locally
npm run lint     # ESLint (MUST pass before merge)
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

Nav uses `scrollIntoView` on section IDs defined in `navItems`, with `IntersectionObserver` scroll-spy updating `activeSection` while scrolling.

## Architecture conventions

- **Monolithic by design:** section components MUST live as local functions in `src/App.jsx`. NEVER create `src/components/` or split section files unless the user explicitly requests it.
- **Data in `src/data/siteData.js`:** content constants MUST be exported from that module and imported into `App.jsx`.
- **Static assets via string paths:** images/fonts MUST be referenced as `/concerts/...` (etc.). NEVER import them as JS modules.
- **No env secrets:** static site; no `.env` needed.

## Design system rules (when adding UI)

- Default card/button MUST use: `border-2 border-black bg-white neo-shadow`
- Section dividers MUST use: `border-b-2 border-black`
- Base page bg MUST be `#f8f5f2`; texture MUST use `.noise-bg`
- Fonts: `.font-syne` (headlines), `.font-mono` / default sans (UI), `.font-bubbly` (decorative)
- Custom shadows/animation live in `src/index.css` — prefer existing classes over new one-offs
- NEVER use soft shadows, heavy rounding, or gray SaaS patterns

## Content editing guide

| Task | Where |
|------|-------|
| Add concert | Append to `rawConcerts` in `src/data/siteData.js`; `date` MUST be `YYYY-MM-DD` |
| Add concert photo | Save as `public/concerts/{YYYY-MM-DD}-{venue-slug}.jpg`, set `photoUrl` |
| Add marquee link | Append to `marqueeItems` in `src/data/siteData.js` (rendered twice for seamless loop) |
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

- Hero uses `min-h-[90svh]` on mobile to avoid address-bar resize jump — do not replace with plain `vh`
- Hero drag on the main photo uses `useMediaQuery('(min-width: 768px)')` and updates on resize
- `ProjectsSection` render order (Rapíky → LSDolina → Smiešna) uses `getProjectById()` lookups
- `base: './'` in `vite.config.js` is REQUIRED for GitHub Pages relative paths — do not change to `/`

## Deployment

Push to `main` triggers CI build + GitHub Pages deploy. Build output: `dist/` with `.nojekyll` added in workflow.

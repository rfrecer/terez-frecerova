# Terez Frecerová - Artist Portfolio

A highly visual, neo-brutalist single-page portfolio for Terez Frecerová (writer, songwriter, lyricist). Built with React, Vite, Tailwind CSS, and Framer Motion.

For AI assistant conventions and content-editing guides, see [CLAUDE.md](CLAUDE.md).

## Architecture & Tech Stack

* **Framework:** React 19 + Vite (for fast HMR and optimized builds)
* **Styling:** Tailwind CSS v4
* **Animation:** Framer Motion (used primarily for the draggable interactive hero diorama)
* **Icons:** Lucide React
* **Typography:** Custom fonts loaded locally (`Space Mono`, `Syne`, `Modak`)
* **Component Structure:** To keep the repository lightweight and scannable, major UI sections (e.g., `Marquee`, `HeroSection`, `AlbumSection`, `ConcertArchive`) are defined as local functional sub-components directly within `App.jsx` rather than fragmented across a `components/` directory.
* **Data:** Site content lives in `src/data/siteData.js`

## Design Philosophy

The site uses a **Neo-brutalist** aesthetic characterized by high contrast, rigid geometry, and playful interactions. Key design pillars include:

1. **Hard Lines & Borders:** Heavy, consistent use of `2px solid black` borders (`border-2 border-black`) on almost all structural elements, buttons, and image frames.
2. **Sharp Shadows:** Un-blurred, solid black drop shadows (`neo-shadow` custom class: `box-shadow: 4px 4px 0px 0px #000000`, and `neo-shadow-lg` for larger 8px pop-outs).
3. **Divider Styling:** Major sections are separated by distinct, full-width `2px solid black` bottom borders (`border-b-2 border-black`). Within sections, short thick strokes (e.g., `h-1 bg-black`) are used as thematic dividers.
4. **Typography-Driven Hierarchy:** Large, bold typography dictates the layout.
    * **Syne:** Used for massive, imposing headers (weights ranging from 400 to 800).
    * **Space Mono:** Provides a technical, structured contrast for utility text, tags, dates, and buttons.
    * **Modak:** Used sparingly for bubbly, decorative background text.
5. **Texture & Color:** The base background is an off-white/beige (`#f8f5f2`) overlaid with a subtle SVG fractal noise background (`.noise-bg`) to break up digital flatness. Accent colors are flat and punchy (lime green `#bef264`, purples, bright oranges).

## File Structure & Asset Management

Static assets are strictly organized within the root `public/` directory so they can be easily referenced via absolute standard string paths without requiring JavaScript imports.

* `/public/concerts/` - Archive of gig photography (naming convention: `{YYYY-MM-DD}-{venue-slug}.jpg`)
* `/public/hero/` - Core images for the top draggable diorama section (`hero1.jpg`, `hero2.jpg`, etc.)
* `/public/projects/` - Assets specific to highlighted works (e.g., album covers, book covers, podcast backgrounds)
* `/public/fonts/` - Local `.ttf` and variable font files referenced in `index.css`
* `/public/icons/` - Favicon (`favicon-32.png`, `icon-192.png`, etc.)
* `/public/social-preview.jpg` - Image explicitly placed at the root for Open Graph and Twitter card meta tags.

## Data Management

Site data (concert dates, project details, album info) is managed in `src/data/siteData.js`.

* **Concerts:** The application automatically sorts the raw concert array into `upcoming` (ascending date) and `past` (descending date) based on the current system date.
* **Past concerts:** Archive cards link to event URLs — not a lightbox gallery.

## Development Notes

* **Styling Components:** When adding new UI elements, default to `border-2 border-black bg-white neo-shadow` rather than standard modern web patterns (like rounded grays with soft drop-shadows).
* **Concert Additions:** Append an object to `rawConcerts` in `src/data/siteData.js`. Ensure the `date` string follows the strict `YYYY-MM-DD` format for the sorting algorithm to work accurately.

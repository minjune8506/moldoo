# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for **Moldoo STUDIO**, a Korean creative production company. Hosted on GitHub Pages at `moldoo.info`. No build process, no package manager, no dependencies — files are served directly.

## Development

To preview the site locally, open any HTML file in a browser or serve the directory with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There are no build, lint, or test commands.

## Architecture

Multi-page static site with shared CSS and modular JavaScript.

**Pages:** `index.html` (home), `about.html`, `project.html` (primary portfolio), `portfolio.html` (alternate view), `contact.html`

**Stylesheet:** `style.css` — single file (~1,200 lines) for all pages. Uses CSS custom properties defined in `:root`:
- `--background: #1c1d1d` (dark theme)
- `--text-white: #ffffff`
- `--primary: #eb6301` (orange accent)

Responsive breakpoints: **768px** (mobile) and **1024px** (tablet).

**Font:** Pretendard (Korean-optimized) via CDN.

**JavaScript modules** (`javascript/` directory):
- `navbar.js` — Fixed navbar with scroll effect (adds `.scrolled` class at 50px), active page highlighting, dropdown for PROJECT section, sessionStorage for tab state
- `portfolio.js` — YouTube video embed tab system (FILM / DESIGN tabs) with IntersectionObserver lazy loading; first 3 videos load eagerly, rest load with 200px margin
- `design.js` — Renders design portfolio items with gradient fallback for failed images
- `services.js` — Dynamically renders 6 service cards (Korean labels)
- `contact-form.js` — EmailJS integration for contact form with phone (9–11 digit) and email validation
- `smooth.js` — Smooth scroll for anchor links

**Assets:** `assets/` — SVGs for icons/logos, PNGs for portfolio images. Note: `assets/design/achv.png` is ~11 MB.

## Key Implementation Details

**EmailJS** (contact form): Credentials are hardcoded in `contact-form.js` — this is intentional for a client-side-only site. The public key is safe to expose; the service/template IDs are EmailJS-specific.

**Tab state**: `project.html` uses `sessionStorage` (key managed in `navbar.js`) to preserve the active tab (FILM/DESIGN) when navigating back to the page.

**Adding portfolio videos**: Edit the video array in `portfolio.js`. Each entry needs a YouTube video ID and metadata; the lazy-loading logic handles iframe injection automatically.

**Adding design items**: Edit the items array in `design.js`. The component renders a card with an image and fallback gradient if the image fails to load.

**Language**: Site content is primarily Korean (`<html lang="ko">`).

# GNews — Editorial News Experience

An award-worthy news aggregation platform built with Next.js, featuring immersive WebGL backgrounds, editorial typography, and fluid animations. Designed with an Awwwards-inspired aesthetic.

## Features

- **Cinematic WebGL Background** — Real-time aurora fluid shader using Three.js and React Three Fiber
- **Editorial Typography** — Playfair Display for headlines, Geist Sans for body text
- **Immersive Animations** — Framer Motion scroll-triggered animations with staggered reveals
- **Smooth Scrolling** — Lenis smooth scroll integration
- **Magazine-Style Cards** — Portrait-aspect editorial cards with image overlays and hover effects
- **Live News Data** — Powered by [NewsAPI.org](https://newsapi.org)
- **Category Filtering** — Browse top headlines by category (Business, Tech, Sports, etc.)
- **Search** — Full-text search across millions of articles
- **Sources Directory** — Browse and explore news sources worldwide
- **Grain Texture Overlay** — Subtle film grain for tactile editorial feel

## Tech Stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion, GSAP, Lenis
- **3D / WebGL** — Three.js, React Three Fiber
- **Fonts** — Playfair Display, Geist Sans / Mono (Google Fonts)
- **Data** — NewsAPI.org

## Getting Started

### Prerequisites

- Node.js 20+
- A [NewsAPI.org](https://newsapi.org) API key (free tier available)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEWS_API_KEY=your_newsapi_key_here
NEWS_BASE_URL=https://newsapi.org/v2
```

> **Note:** NewsAPI free tier only works on localhost during development.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Project Structure

```
app/
  page.tsx              # Home — top headlines with editorial hero
  search/page.tsx       # Search results
  sources/page.tsx      # News sources directory
  layout.tsx            # Root layout with fonts + grain overlay
  globals.css           # Editorial theme + CSS variables
components/
  WebGLBackground.tsx   # Aurora fluid shader (Three.js)
  Navbar.tsx            # Floating minimal navigation
  NewsCard.tsx          # Editorial portrait card
  HeroCard.tsx          # Featured story hero
  SearchBar.tsx         # Pill-style search input
  CategoryFilter.tsx    # Horizontal category tabs
  AnimatedSection.tsx   # Scroll-triggered fade-in wrapper
  StaggerContainer.tsx  # Staggered children animation
  Footer.tsx            # Site footer
lib/
  newsapi.ts            # NewsAPI client + fetch helpers
```

## Design System

| Token | Value |
|---|---|
| Background | `#050507` |
| Foreground | `#f2f0ea` |
| Accent Warm | `#d4a853` |
| Surface | `rgba(255,255,255,0.04)` |
| Border | `rgba(255,255,255,0.08)` |
| Muted | `#8a8795` |
| Serif Font | Playfair Display |
| Sans Font | Geist Sans |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT — feel free to fork and customize.

# Serendib-Explorer

A modern, high-performance React + Tailwind web app scaffold for showcasing beautiful places in Sri Lanka.

## Features included in this scaffold
- React 18 + Vite
- TailwindCSS with dark mode and custom animations
- Theme context + localStorage persistence
- React Router with lazy loaded detail page
- Sample Destination JSON data
- Components: Navigation, DestinationGrid, Hero, DestinationDetail
- React Player for video embedding
- React Leaflet map integration
- Google Analytics (GA4) integration helper (`react-ga4`) — add your `VITE_GA_ID`
- Accessibility & performance minded: lazy loading opportunities, Suspense, modular architecture

## How to run locally (5 minutes)
1. Ensure Node 18+ and npm are installed.
2. Clone or unzip this scaffold.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add Google Analytics ID (optional) in `.env`:
   ```
   VITE_GA_ID=G-XXXXXXXXXX
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```
6. Open http://localhost:5173

## Project structure (important files)
- `src/data/destinations.json` — JSON-driven content. Edit to add destinations.
- `src/hooks` — custom hooks (useLocalStorage, useTheme, useFetch)
- `src/context/ThemeContext.jsx` — theme provider using Context API
- `src/pages/DestinationDetail.jsx` — map, videos, hotels
- `tailwind.config.cjs` — extended theme + animations

## Next steps (recommended)
- Replace placeholder images (files in `/assets`) with high-quality optimized images (WebP)
- Add a build pipeline to optimize images and generate responsive `srcset`
- Implement server-side rendering or prerender pages for SEO if needed
- Add admin dashboard or CMS to edit `destinations.json` via UI or connect to a headless CMS
- Add testing with React Testing Library
- Configure CI/CD + deploy (Netlify, Vercel)

## Notes
This scaffold is intentionally lightweight but designed to be production-ready when extended.

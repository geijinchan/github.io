# Workspace

## Overview

pnpm workspace monorepo using TypeScript. The main artifact is an immersive 3D portfolio website for ABHISHEK (Data Scientist).

## Portfolio Site (artifacts/portfolio)

- **Type**: React + Vite (static, no backend)
- **Preview path**: / (root)
- **Owner**: Abhishek — Data Scientist from India
- **GitHub**: geijinchan / geijinchan.github.io

### Features
- Immersive loading screen with status text and progress bar
- Three.js particle background (800 particles, mouse parallax)
- Magnetic custom cursor (desktop)
- Text scramble engine (Web Audio synthesized sounds)
- Film grain overlay + scanlines
- Chromatic aberration glitch effects
- GSAP ScrollTrigger scroll animations
- Hero with 3D rotating wireframe icosahedron + morphing geometry
- Pinned About section with word-by-word reveal
- Projects section: live GitHub API fetch (geijinchan repos)
- Experience: timeline + graph view toggle
- Skills: Three.js wireframe globe with Fibonacci sphere distribution
- Contact: multi-step terminal form → Formspree
- GitHub Actions deploy to GitHub Pages (.github/workflows/deploy.yml)

### Key Files
- `src/App.tsx` — root, all section components
- `src/components/` — all section components
- `src/lib/sound.ts` — Web Audio API sound engine
- `src/index.css` — design tokens (dark palette, Space Grotesk/Mono)
- `index.html` — Three.js + GSAP CDN script tags
- `.github/workflows/deploy.yml` — GitHub Actions for GitHub Pages
- `public/.nojekyll` — disables Jekyll for GitHub Pages

### Design System
- Background: #04060d (deepest), #080b16 (secondary), #0d1124 (tertiary)
- Accent: #7c6fcd (purple), #3ecfb2 (teal)
- Fonts: Space Grotesk (sans) + Space Mono (mono)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 (api-server, not used by portfolio)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/portfolio run dev` — run portfolio locally
- `pnpm --filter @workspace/portfolio run build` — production build (BASE_PATH=/ PORT=3000)

## GitHub Pages Deployment

Push `artifacts/portfolio` code to `geijinchan/geijinchan.github.io` repo.
The `.github/workflows/deploy.yml` auto-deploys on push to main.
Repo settings required:
- Settings → Pages → Source: GitHub Actions
- Settings → Actions → General → Workflow permissions: Read and write

# YUBRAJ'S PORTFOLIO - AGENT BRAIN (`brain.md`)

Welcome! This document outlines everything you need to know about the architecture, technology stack, routing, styling, configuration, and build processes of Yubraj Kurmi's Portfolio Project.

---

## 🚀 Project Overview
This project is an ambitious, modern, and visionary portfolio showcasing the **full-stack web development** and **graphic design** work of Yubraj Kurmi (based in Rupandehi, Nepal). It is designed with a premium, editorial aesthetic featuring high-contrast dark backgrounds, glowing gradients (gold, silver, white), and responsive layouts.

---

## 🛠️ Technology Stack
- **Core Framework**: React 18.3.1
- **Build Tooling**: Vite 6.3.5
- **Styling**: Tailwind CSS v4.1.12 (`@tailwindcss/vite` plugin)
- **Animations**: `motion` (Framer Motion) v12.23.24
- **Icons**: `lucide-react` v0.487.0
- **Routing & Deployment**: Cloudflare Pages (`wrangler` integration)
- **Language**: TypeScript v5.8.3

---

## 📁 Key File Structure & Architecture

```
portfolio/
├── .agents/                    # Agent customizations
├── dist/                       # Output build directory (generated)
├── public/                     # Static files (icons, SEO assets)
├── src/
│   ├── app/
│   │   ├── components/         # React Section Components
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── CreativeShowcase.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   └── ServicesSection.tsx
│   │   ├── config/
│   │   │   └── siteConfig.ts   # Central Data Configuration File
│   │   └── App.tsx             # App Entry point rendering sections
│   ├── assets/                 # Local image & graphic assets (.png)
│   ├── styles/
│   │   └── globals.css         # Global Styles, variables, font injections
│   └── main.tsx                # Client entry point
├── package.json                # Project script mappings & dependencies
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite plugins and server setup
└── wrangler.toml               # Cloudflare Pages deployment configuration
```

---

## 🎛️ Central Configuration (`siteConfig.ts`)
All data displayed on the website is configured in one central file: [siteConfig.ts](file:///c:/Users/NIC/.antigravity-ide/portfolio/src/app/config/siteConfig.ts).

### What is Configured Here:
1. **Personal Information**: Name, taglines, about paragraphs, and statistics.
2. **Contact Info**: Phone numbers, emails, location coordinates, and API endpoints.
3. **Social Links**: GitHub, Twitter, LinkedIn, and Instagram.
4. **Services**: Service titles, descriptions, and color accents.
5. **Portfolio Projects**: Title, category, description, year, technologies, and mockup assets.
6. **SEO & Keywords**: Meta titles, descriptions, and tags.
7. **Legal Metadata**: Copyright holder, year, and custom text.

---

## 🎨 Theme & Styling System
- **Fonts**: Modern typography is injected via Google Fonts:
  - **Outfit** (`--font-display`): Used for bold, impactful headings.
  - **Inter** (`--font-sans`): Used for body text and navigation labels.
- **Palette**: Dark luxury mode:
  - Primary Background: Pitch Black (`#000000`) and Dark Gray (`#1a1a1a`).
  - Colors: Silver (`#c0c0c0`), Gold (`#ffd700`), and pure White (`#ffffff`).
- **Glow & Highlights**: Applied using radial background gradients, gold shadows, custom scrollbars, and customized text selection colors in [globals.css](file:///c:/Users/NIC/.antigravity-ide/portfolio/src/styles/globals.css).

---

## ⚡ Performance Guidelines & Best Practices
Animations can quickly degrade page load performance on lower-end devices. The following rules have been implemented to guarantee smooth 60fps scrolling:
1. **Limited Particle Footprint**: Do **NOT** exceed **85 active background particle nodes** globally across all sections. 
2. **GPU Hardware Acceleration**: Always apply `will-change: transform, opacity` directly in CSS or style tags for moving particles or rotating 3D geometric visual cards.
3. **Lazy Loading**: Major page sections are lazy-loaded via React `lazy` and wrapped in `Suspense` inside [App.tsx](file:///c:/Users/NIC/.antigravity-ide/portfolio/src/app/App.tsx) to improve time-to-interactive (TTI) scores.

---

## 🌐 Build & Cloudflare Pages Deployment
- **SPA Routing**: Configured inside [wrangler.toml](file:///c:/Users/NIC/.antigravity-ide/portfolio/wrangler.toml) using the `[assets]` block:
  ```toml
  [assets]
  directory = "./dist"
  not_found_handling = "single-page-application"
  ```
  *Note: Direct wildcard `_redirects` files in `public/` must NOT be used, as they clash with Cloudflare's asset deployment.*
- **Clean Builds**: Vite is configured with `emptyOutDir: true` in [vite.config.ts](file:///c:/Users/NIC/.antigravity-ide/portfolio/vite.config.ts) to clean build output and prevent stale caching.
- **Deploy Command**: 
  - Deploy via CLI: `npm run build` followed by `npm run pages:deploy`.
  - Connect GitHub to Cloudflare Pages for automatic builds on push.

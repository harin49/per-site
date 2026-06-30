# agents.md — harinarayanan.dev

## Purpose

A personal website and portfolio for Harinarayanan — designed in Canva, built with Next.js and MDX. The goal is a minimalist, text-forward site that feels personal and authentic: a place to present ongoing projects, writing, and a genuine sense of who I am, inspired by the substance-over-flash aesthetic of sites like mayurbhoi.com.

The site should feel handcrafted, not templated — personality comes through in the content and typography, not in visual gimmicks.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Plain CSS with CSS custom properties (no CSS-in-JS) |
| Content | MDX via Contentlayer (planned) |
| Linting | ESLint 8 + `@typescript-eslint` + `next/core-web-vitals` |
| Formatting | Prettier 3 |
| CSS Reset | normalize.css |

---

## Standards

### TypeScript
- Strict mode is on and must stay on — do not disable any strict flags.
- No `any` types in production code (allowed in config/tooling files only).
- No unused locals or parameters; these are set to `error`.
- Exact optional property types enforced (`exactOptionalPropertyTypes: true`).

### Code Style
- Prettier handles all formatting; do not configure editors to override it.
- Print width: 120 characters. Tab width: 2 spaces. Single quotes. Trailing commas (ES5). Semicolons on.
- ESLint errors must be resolved before committing — `prettier` rule violations are treated as errors.

### Components
- Use React Server Components by default. Add `"use client"` only when the component genuinely needs browser APIs or interactivity.
- Components live in `src/components/`. Providers live in `src/providers/`.
- No component should import from another component's internal files — only from the component's public export.

### Styling
- All theme values are CSS custom properties defined in `global.css`. Never hardcode colors or spacing inline.
- Light/dark mode is toggled by adding `light-mode` or `dark-mode` to the `<html>` element — keep that contract.
- Transitions on theme changes use `0.5s` on `background-color` and `color`. Do not remove these; they prevent jarring flashes.
- No CSS-in-JS libraries. No Tailwind. Plain CSS only.

### Content (MDX)
- All written content (posts, project writeups) goes through MDX via Contentlayer.
- Keep frontmatter fields consistent across content types — define a schema and don't deviate.

### File & Module Conventions
- `src/app/` — Next.js App Router pages and layouts only.
- `src/components/` — reusable UI components.
- `src/providers/` — React context providers.
- `src/styles/` — global CSS only.
- Path alias `@/*` maps to `src/*` (configured in tsconfig).

### Git
- Commit messages are clear and imperative ("add hero section", not "added hero section" or "wip").
- No commits with failing lint or type errors.

---

## Planned Sections

Inspired by mayurbhoi.com, the site will have:

- **Home / Bio** — a short, personal introduction with photo.
- **Projects** — active and completed work, each with a brief write-up.
- **Writing** — blog posts via MDX, linked from the home page.
- **Now** — a reflective, living section about current focus and interests.
- **Connect** — social links and contact.

---

## Current Status

The project is in early scaffolding. What exists:

- [x] Next.js 14 App Router setup with TypeScript strict mode
- [x] ESLint + Prettier configured and integrated
- [x] Global CSS with CSS custom properties for light/dark theming
- [x] ThemeProvider context and ThemeSwitcher component (proof-of-concept)
- [x] normalize.css reset applied
- [ ] MDX / Contentlayer integration (tsconfig paths configured, not yet wired up)
- [ ] Home page content and layout
- [ ] Navigation
- [ ] Projects section
- [ ] Writing / blog section
- [ ] "Now" section
- [ ] Deployment (domain: harinarayanan.dev)

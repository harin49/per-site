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
| Content | MDX via `next-mdx-remote` (Server Components, no separate build pipeline) |
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
- All written content (posts, project writeups) lives as `.mdx` files in `content/writing/`, compiled at request/build time with `compileMDX` from `next-mdx-remote/rsc` — no Contentlayer, no separate build step.
- Frontmatter is deliberately minimal: `title` and `date` only. Keep this consistent across all posts — don't add fields ad hoc.
- The filename (minus `.mdx`) is the post's slug, used as-is in the URL (`/writing/<slug>`) — no date prefix.
- `src/lib/posts.ts` is the single source of truth for reading posts (`getAllPosts`, `getPostBySlug`, `getAllSlugs`). Don't read from `content/writing/` directly elsewhere.
- `src/app/writing/[slug]/page.tsx` renders posts and is fully statically generated via `generateStaticParams` — no client JS for content.
- The home page's Writing section lists all posts (via `getAllPosts()`) and links out to their `/writing/[slug]` pages; there is no separate `/writing` index page.
- Post-specific images live under `public/images/writing/<slug>/`, referenced from the MDX as `/images/writing/<slug>/<file>`. Images shared across the site (e.g. bio photos) stay flat in `public/images/`.
- `gray-matter` parses frontmatter; because of `noPropertyAccessFromIndexSignature`, access frontmatter fields via bracket notation (`data['title']`), not dot notation.

### File & Module Conventions
- `src/app/` — Next.js App Router pages and layouts only.
- `src/components/` — reusable UI components.
- `src/providers/` — React context providers.
- `src/lib/` — plain utility modules (e.g. `posts.ts`), no React, safe to use Node APIs like `fs`/`path` since they only run in Server Components/build time.
- `src/styles/` — CSS files, one per page/feature (not just global) — imported directly by the component/page that needs them.
- `content/writing/` — MDX post source files, at the repo root (not under `src/`) since it's data, not source code.
- No `@/*` path alias — imports use the bare `src/...` form (works via `baseUrl: "."` in tsconfig), e.g. `import Nav from 'src/components/Nav'`.

### Git
- Commit messages are clear and imperative ("add hero section", not "added hero section" or "wip").
- No commits with failing lint or type errors.

---

## Planned Sections

Inspired by mayurbhoi.com, the site will have:

- **Home / Bio** — a short, personal introduction with photo. Photo area has 5 slots, one visible at random per load (grayscale, full color on hover), 3 currently wired to real photos and 2 left as placeholders.
- **Projects** — active and completed work, each with a brief write-up. Currently a stub page ("in-progress").
- **Writing** — blog posts via MDX, listed on the home page and rendered at `/writing/[slug]`. No separate `/writing` index page.
- **Now** — a reflective, living section about current focus and interests. Currently a stub page ("in-progress").
- **Connect** — social links and contact. Placeholder links on the home page for now.
- **Resume** / **News** — linked from the top nav, currently stub pages ("in-progress").

---

## Current Status

- [x] Next.js 14 App Router setup with TypeScript strict mode
- [x] ESLint + Prettier configured and integrated
- [x] Global CSS with CSS custom properties for light/dark theming
- [x] ThemeProvider context and ThemeSwitcher component (sun/moon icon toggle)
- [x] normalize.css reset applied
- [x] Sticky top nav (Home / Resume / News + theme switcher), active route highlighted
- [x] Home page layout: Bio (with photo), Writing, Connect sections
- [x] MDX wired up via `next-mdx-remote` — `content/writing/*.mdx` → `/writing/[slug]`, statically generated
- [x] 3 real posts migrated from the old Jekyll site (harin49.github.io)
- [ ] Projects section (stub page only)
- [ ] "Now" section (stub page only)
- [ ] Resume / News real content (stub pages only)
- [ ] Deployment (domain: harinarayanan.dev)

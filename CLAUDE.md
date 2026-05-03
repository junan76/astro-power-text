# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Astro dev server (default `http://localhost:4321`).
- `npm run build` — Production build into `dist/`.
- `npm run preview` — Serve the built `dist/` for verification.
- `npm run astro -- check` — Run Astro's type / content-schema check (no test framework configured; use this plus `npm run build` to validate changes).

Node `>=22.12.0` is required (see `package.json` `engines`).

## Architecture

This is a static personal blog built on **Astro 6** content collections. There is no backend, no client framework, and no testing framework — everything renders to static HTML at build time.

### Content model (`src/content.config.ts`)

Two collections, both loaded via the `glob` loader from `src/content/`:

- **`posts`** — `src/content/posts/**/*.{md,mdx}`. The on-disk directory path under `posts/` becomes part of the URL slug (e.g. `posts/notes/hello-astro.md` → `/posts/notes/hello-astro/`). The first path segment is purely organisational, *not* a category surfaced in routing.
- **`projects`** — `src/content/projects/**/*.{md,mdx}`. Each immediate subdirectory of `projects/` is one project. Its `index.md` is the project landing page; sibling files in the same directory are articles belonging to that project. The schema extends the post schema with `status`, `repository`, `website`.

Both schemas share: `title`, `description`, `date`, optional `updated`, `tags[]`, `featured`, `draft`.

### Routing

Routes in `src/pages/` consume the collections through helpers in `src/lib/content.ts`:

- `posts/[...slug].astro` — every published post entry.
- `projects/[project]/index.astro` — project landing page (rendered from each project's `index.md`).
- `projects/[project]/[...slug].astro` — project sub-articles.
- `tags/[tag].astro` + `tags/index.astro` — tag pages, slugified via `slugifyTag` (Unicode-aware, `&` → `and`).
- `archive.astro`, `index.astro`, `about.astro` — flat pages.
- `rss.xml.ts`, `sitemap.xml.ts` — generated feeds that merge `posts` and non-index `projects` entries.

### Filtering rules in `src/lib/content.ts`

Several invariants are enforced here and must be respected by any new page or feed:

- `isPublishedPost` — drops `draft: true` and any entry whose `id` ends in `/index` (so project `index.md` files never leak into post lists or RSS).
- `isProjectIndex` — identifies project landing pages by `index.md`/`index.mdx` filePath or top-level id.
- `getPostPath` / `getProjectPath` / `getProjectArticlePath` — single source of truth for URL construction; do not hand-build content URLs elsewhere.
- `sortByDateDesc` — used wherever ordered lists are shown.

When adding a new listing, route, or feed, compose these helpers rather than re-implementing the filter/sort/path logic.

### Site configuration (`src/config/site.ts` + `src/lib/url.ts`)

`siteConfig` owns site-level metadata: title, description, language, navigation, author, social links, and homepage counts (`featuredPostCount`, `recentPostCount`). Deployment URL pieces live in `astro.config.mjs` only — `site` (origin) and `base` (sub-path). `src/lib/url.ts` reads them at build time via `import.meta.env.SITE` and `import.meta.env.BASE_URL`; `BaseLayout.astro` reads `Astro.site` for canonical. Do not reintroduce parallel `siteUrl` / `basePath` fields in `siteConfig` — the duplication-and-sync pattern is what these helpers replaced.

### Layouts and styling

`BaseLayout.astro` injects `<head>` metadata (canonical, OG, RSS link, favicon) and the global stylesheet `src/styles/global.css`. `PostLayout.astro` wraps article pages. The visual design is a "terminal" aesthetic — class names like `terminal-page`, `terminal-command`, `terminal-scroll`, `prose`, `site-shell` are defined in `global.css` and re-used across pages; prefer existing classes over introducing new ones.

## Conventions

- TypeScript config extends `astro/tsconfigs/strict`. Keep frontmatter and `.ts` files type-safe.
- `.astro` files use **tab** indentation; match the existing style.
- Page filenames in `src/pages/` are lowercase, route-oriented (`about.astro`, `tags/[tag].astro`). Reusable components in `src/components/` use `PascalCase.astro`.
- Do not edit `dist/` (build output) or `.astro/` (generated types).

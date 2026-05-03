# Repository Guidelines

## Project Structure & Module Organization

This is a static personal blog built on Astro 6 content collections — no backend, no client framework, all HTML generated at build time. Pages in `src/pages/` map URLs to routes (`archive.astro`, `tags/[tag].astro`, `posts/[...slug].astro`, …). Content lives in `src/content/`: `posts/**` flows into the `posts` collection, `projects/<name>/{index,*.md}` into `projects` (the immediate subdirectory is the project; sibling files are its articles). Schemas are declared in `src/content.config.ts`. Reusable components are in `src/components/` (`PascalCase.astro`); shared layouts in `src/layouts/`. Helpers in `src/lib/content.ts` enforce filtering / sorting / URL construction invariants — compose them rather than rebuilding the logic. Site metadata in `src/config/site.ts`; deployment URL (`site`, `base`) only in `astro.config.mjs`. Static files (favicons) in `public/`. Build output in `dist/` is never edited.

## Build, Test, and Development Commands

Run from the repository root:

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Astro dev server (default `http://localhost:4321`).
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves `dist/` locally for verification.
- `npm run astro -- check` runs type / content-schema checks (requires `@astrojs/check`; not installed by default).

Node.js `>=22.12.0` is required (see `package.json` `engines`).

## Coding Style & Naming Conventions

`tsconfig.json` extends `astro/tsconfigs/strict`; keep frontmatter and `.ts` files type-safe. `.astro` files use tab indentation — match the existing style. Page filenames in `src/pages/` are lowercase, route-oriented (`about.astro`, `tags/[tag].astro`); reusable components in `src/components/` are `PascalCase.astro`. Prefer existing terminal-aesthetic classes from `src/styles/global.css` (`terminal-page`, `terminal-command`, `terminal-scroll`, `prose`, `site-shell`, …) over introducing new ones. For internal links, always go through `withBase()` / `getPostPath()` / `getProjectPath()` / `getTagPath()` / `getProjectArticlePath()` from `src/lib/url.ts` and `src/lib/content.ts` — never hand-build URL strings.

## Testing Guidelines

No test framework is configured. Verify changes with `npm run build` plus a visual pass via `npm run dev` or `npm run preview`. For URL/routing changes, also smoke-test with `astro.config.mjs:base = '/blog/'` to confirm sub-path deployment still works. If tests are introduced later, place them under `tests/` and wire up an `npm test` script.

## Commit & Pull Request Guidelines

Commit subjects are short, imperative, and describe the user-visible change (e.g. `Switch about page to markdown, add Chinese usage docs, refine hover popover`). Group related changes into one commit; do not bundle unrelated cleanups. PRs should include a concise summary, the commands used for verification, linked issues when applicable, and screenshots for UI changes.

## Agent-Specific Instructions

Respect the invariants documented in `CLAUDE.md` — they are not stylistic preferences:

- `isPublishedPost` drops drafts and any `*/index` entry; never bypass it when listing posts or building feeds.
- `isProjectIndex` identifies project landing pages; project sub-articles need both filters together (`isPublishedPost && !isProjectIndex`).
- URL construction is centralized in `src/lib/content.ts` (path helpers) and `src/lib/url.ts` (`withBase`, `absoluteUrl`); do not reimplement.
- `siteConfig` (in `src/config/site.ts`) does **not** contain `siteUrl` or `basePath` — those live in `astro.config.mjs:site` and `:base` respectively, read via `import.meta.env.SITE` / `import.meta.env.BASE_URL` / `Astro.site`. Do not reintroduce parallel fields.
- Do not edit `dist/` (build output) or `.astro/` (generated types).

Keep changes scoped to the requested feature or fix; prefer existing Astro patterns over new tools or abstractions.

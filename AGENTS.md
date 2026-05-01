# Repository Guidelines

## Project Structure & Module Organization

This is a minimal Astro project. Source pages live in `src/pages/`; each `.astro` or `.md` file becomes a route based on its file path. The current entry page is `src/pages/index.astro`. Static files that should be served unchanged belong in `public/`, such as `public/favicon.svg` and `public/favicon.ico`. Project configuration is kept at the repository root in `astro.config.mjs`, `tsconfig.json`, `package.json`, and `package-lock.json`. Build output is generated into `dist/` and should not be edited directly.

## Build, Test, and Development Commands

Run commands from the repository root:

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Astro development server, usually at `http://localhost:4321`.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves the built site locally for final checks.
- `npm run astro -- --help` lists Astro CLI options; use `npm run astro -- check` if type checking support is added.

The project requires Node.js `>=22.12.0`.

## Coding Style & Naming Conventions

Use Astro components and TypeScript-aware configuration. `tsconfig.json` extends `astro/tsconfigs/strict`, so prefer explicit, type-safe code when adding scripts or component frontmatter. Existing `.astro` markup uses tabs for indentation; follow that style in Astro files. Use lowercase, route-oriented filenames in `src/pages/` such as `about.astro` or `blog/index.astro`. Put reusable UI in `src/components/` when it becomes useful, using `PascalCase.astro` component filenames.

## Testing Guidelines

No test framework is configured yet. For now, verify changes with `npm run build` and, for UI changes, inspect the page through `npm run dev` or `npm run preview`. If tests are introduced, keep them close to the code they cover or in a clearly named `tests/` directory, and add the matching `npm test` script to `package.json`.

## Commit & Pull Request Guidelines

The repository currently only has the initial Astro commit, so there is no established custom convention. Use short, imperative commit subjects, for example `Add landing page layout` or `Update favicon assets`. Pull requests should include a concise summary, the commands run for verification, linked issues when applicable, and screenshots for visible UI changes.

## Agent-Specific Instructions

Keep changes scoped to the requested feature or fix. Do not modify generated `dist/` files, dependency folders, or unrelated untracked files. Prefer existing Astro patterns before adding new tools or abstractions.

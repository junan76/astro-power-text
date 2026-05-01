---
title: "Static Blog Architecture Notes"
description: "A longer article used to test article page scrolling, prose rhythm, code blocks, headings, and mixed-language content."
date: 2026-06-03
tags: ["architecture", "astro", "longform", "中文"]
featured: true
draft: false
---

A static blog looks simple from the outside: Markdown goes in, HTML comes out. The implementation details matter because they decide how easy the site is to maintain after the first week.

This article is intentionally long. It exists to test article scrolling, heading spacing, paragraph rhythm, code block behavior, and mixed-language content inside the fixed viewport layout.

## Goals

The first goal is to keep authoring plain. A post should be a Markdown file with frontmatter, not an object hidden inside a database or a CMS export.

The second goal is to make routing predictable. A file under `src/content/posts/frontend/routing.md` should clearly map to a URL under `/posts/frontend/routing/`.

The third goal is to keep rendering boring. Static pages should be generated at build time, deployed as files, and served without runtime infrastructure.

## Content Model

There are two content areas:

- regular posts under `src/content/posts`
- project entries and project articles under `src/content/projects`

Regular posts can use nested directories. Project articles inherit ownership from their directory. This avoids writing the project slug into every article and removes one source of drift.

中文内容也应该保持同样的模型。页面元素和 URL 可以使用英文，但正文、标题、摘要和标签都应该支持中文。这样既能保持部署路径稳定，也不会限制写作语言。

## Project Metadata

Each project directory has an `index.md` file. That file acts as the project record and project introduction. Other Markdown files in the same directory are project articles.

This structure makes project pages straightforward:

```text
src/content/projects/static-search/index.md
src/content/projects/static-search/search-index-design.md
src/content/projects/static-search/query-matching.md
```

The project list reads `index.md` entries. The project detail page renders the index content and lists all sibling project articles.

## Layout

The visual design should stay sparse. Most pages are lists, so the layout should make scanning easy:

- command-style page headings
- compact rows
- dates in monospace
- titles as plain links
- descriptions hidden until hover when useful

The article page is different. Long reading needs normal prose spacing. A terminal-style command at the top is enough to connect it with the rest of the site.

## Fixed Viewport

The site now uses a fixed viewport layout. The header and footer occupy stable regions, while the main content area scrolls.

For list pages, the command line stays visible and only the list area scrolls. This makes long archives easier to inspect because the context remains visible.

For article pages, the main article area scrolls normally. That is better for reading because the whole article behaves as one document.

## CSS Notes

The CSS should remain small and local to the site. A utility framework would work, but it would also add another layer of naming and configuration.

The key rules are simple:

```css
body {
	display: grid;
	grid-template-rows: auto minmax(0, 1fr) auto;
	height: 100dvh;
	overflow: hidden;
}

.main-content {
	min-height: 0;
	overflow: auto;
}
```

Nested scroll areas need `min-height: 0`; otherwise they may refuse to shrink inside a grid or flex parent.

## URLs

URLs should be stable and readable. File names are part of the public interface, so they should be short, lowercase, and descriptive.

For English posts:

```text
/posts/astro/content-collections-in-practice/
/posts/web/css/responsive-reading-layouts/
```

For Chinese posts, the file name can still be English:

```text
/posts/frontend/minimal-blog-design-zh/
```

This keeps links easy to share across tools that do not handle non-ASCII paths well.

## RSS and Sitemap

RSS should include recent posts and project articles. The sitemap should include index pages, post pages, project pages, project article pages, and tag pages.

These generated files are useful because the site is static. They give readers and crawlers a reliable way to discover content without relying on client-side code.

## Future Search

Search can start with a static JSON index. The first version only needs title, description, tags, and URL.

Full-text indexing is possible, but it should wait until there is enough content to justify the payload size.

中文搜索需要特别注意分词。Before adding a heavy dependency, a simple substring search can validate whether the interaction is useful.

## Deployment

GitHub Pages is a good target for this project. The important configuration is whether the site is deployed at the root domain or under a repository path.

For a user site:

```js
export default defineConfig({
	site: "https://username.github.io",
	base: "",
});
```

For a project site:

```js
export default defineConfig({
	site: "https://username.github.io",
	base: "/repository-name",
});
```

The content should not depend on the deployment target. Only URL helpers and Astro config should need to know about the base path.

## Closing Notes

The best version of this blog is not the version with the most features. It is the version that is easy to write in, easy to build, and easy to keep consistent over time.

The design should stay quiet. The content should carry the site.

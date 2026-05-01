---
title: "GitHub Pages Deployment"
description: "Notes on deploying an Astro static site to GitHub Pages."
date: 2025-11-10
tags: ["github-pages", "deployment", "astro"]
featured: false
draft: false
---

GitHub Pages works well for a fully static Astro site. The main detail is deciding whether the site is deployed at the root domain or under a repository path.

For a user site such as `username.github.io`, the base path is usually empty. For a project site, the base path should match the repository name.

The build command remains the same:

```sh
npm run build
```

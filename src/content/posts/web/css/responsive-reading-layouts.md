---
title: "Responsive Reading Layouts"
description: "A practical approach to readable article pages on desktop and mobile."
date: 2026-03-12
tags: ["css", "web", "design"]
featured: true
draft: false
---

A blog layout does not need many breakpoints. Most of the work comes from choosing a readable line length and letting the page adapt around it.

Good defaults:

- keep article width around `680px` to `760px`
- use comfortable line height for long paragraphs
- let navigation wrap on narrow screens
- make tables and code blocks scroll horizontally
- avoid fixed-height content containers

The goal is not to create different desktop and mobile sites. The goal is to make one layout that remains calm as the viewport changes.

## Code blocks

Long lines should not break the page:

```css
pre {
	overflow-x: auto;
}
```

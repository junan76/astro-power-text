---
title: "Search Index Design"
description: "Choosing the fields that should be included in a static search index."
date: 2026-02-20
tags: ["search", "javascript"]
featured: false
draft: false
---

A static search index should be useful but small. For an early version, the index can include each page's title, description, tags, and URL.

Full article body indexing is possible, but it increases payload size quickly. A personal blog can usually start with metadata search and add body excerpts later.

## Suggested shape

```json
{
	"title": "Search Index Design",
	"description": "Choosing the fields that should be included in a static search index.",
	"tags": ["search", "javascript"],
	"url": "/projects/static-search/search-index-design/"
}
```

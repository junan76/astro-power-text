---
title: "Query Matching"
description: "Simple matching rules for a no-dependency static search prototype."
date: 2026-03-01
tags: ["search", "ux"]
featured: false
draft: false
---

The first query matcher can be intentionally small. Lowercase the query, split it into terms, and check whether each term appears in the searchable text.

This approach is not sophisticated, but it is transparent. It also keeps the search code easy to replace later.

Ranking can start with a few simple weights:

- title matches first
- tag matches second
- description matches last

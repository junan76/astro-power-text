---
title: "Astro Blog"
description: "你正在浏览的这个站点本身。一个用 Astro content collections 搭建的极简技术博客。"
date: 2026-04-15
tags: ["astro", "blog"]
featured: true
draft: false
status: "active"
---

这个项目就是你正在浏览的站点本身。它的目标只有一个：在尽可能少的依赖与抽象之上，提供一个能长期维护的个人写作空间。

## 设计取舍

- **静态优先**：完全在构建时渲染，不引入客户端框架，部署只需一个静态主机。
- **内容驱动**：所有内容是 Markdown，frontmatter 由 zod schema 校验，不会出现"字段写错没人提醒"的情况。
- **样式简单**：单一 `global.css`，伪终端风格，没有 design system，也没有 CSS-in-JS。

## 当前状态

`status: active`。日常会随着写作习惯的变化继续微调，但不会做大规模重构。后续的设计变更和决策记录会以子文章的形式发在这个项目下。

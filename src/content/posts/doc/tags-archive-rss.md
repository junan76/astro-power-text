---
title: "标签、归档与 RSS：自动生成的页面"
description: "解释标签页是怎么从 frontmatter.tags 聚合出来的，归档页的分组规则，以及 RSS / sitemap 的内容来源。"
date: 2026-04-25
tags: ["doc", "tags", "rss"]
featured: false
draft: false
---

主页和文章详情页之外，这个站点还会自动生成几类聚合页面。它们没有手写的源 Markdown，全部由 `src/pages/` 下的脚本在构建时根据集合数据生成。

## 标签页

文章 frontmatter 里的 `tags` 数组每个元素都会经过 `slugifyTag`：

```ts
// src/lib/content.ts
export const slugifyTag = (tag: string) =>
  tag
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
```

要点：

- 大小写无关（`React` 和 `react` 会合并）。
- `&` 会被替换成 `and`。
- 连续的非"字母数字"字符（含空格、标点、CJK 符号外的所有特殊字符）会被压成单个 `-`。
- 中日韩文字属于 Unicode `\p{Letter}` 范围，所以"前端"、"性能调优"这类中文标签会原样保留。

聚合规则：

- `/tags/` 列出所有出现过的标签和各自的文章数。
- `/tags/<slug>/` 列出该标签下的所有文章。

## 归档页

`/archive/` 把所有"已发布"的内容按年份分组，每组按日期降序。"已发布"的判断标准是 `isPublishedPost`：非 draft、且不是项目主页。所以归档页会包含普通文章和项目子文章，但不会包含项目主页。

每行只显示日期和标题；鼠标悬浮到标题上时会通过 `data-description` 属性显示一个浮层，内容是 frontmatter 的 `description`。

## RSS 与 sitemap

- `/rss.xml` 由 `src/pages/rss.xml.ts` 生成。它合并普通文章和项目子文章（同样排除项目主页和草稿），按日期降序取前 20 条。
- `/sitemap.xml` 由 `src/pages/sitemap.xml.ts` 生成。它的覆盖面更大，会包含所有静态页面、文章、项目主页与项目子文章。

两个 feed 的 URL 都是绝对地址，由 `src/lib/url.ts` 的 `absoluteUrl` 拼接 `siteConfig.siteUrl + basePath + path`。如果你的部署 URL 变了，记得同步更新 `siteConfig` 和 `astro.config.mjs`，否则 feed 里的链接会指向错误的域名。

## 调整出现的位置

如果想让某些文章不进入 RSS（比如内部备忘），目前的做法是给它打 `draft: true`。如果未来需要"公开但不进 feed"的语义，需要在 schema 里增加新字段并在 `src/pages/rss.xml.ts` 中过滤。

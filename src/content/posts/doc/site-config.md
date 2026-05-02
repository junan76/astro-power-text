---
title: "站点配置：siteConfig 与 astro.config 的协同"
description: "站点元数据集中在 src/config/site.ts，部署相关的 site / base 在 astro.config.mjs，两边需要保持一致。"
date: 2026-04-22
tags: ["doc", "config"]
featured: false
draft: false
---

站点的"自我介绍"——标题、描述、作者、社交链接、导航条目、以及部署 URL——分布在两个地方。这篇说明它们各自负责什么，以及为什么必须同步。

## src/config/site.ts

这是单一事实源（single source of truth），所有页面的元数据都从这里读取：

```ts
export const siteConfig = {
  title: "junan",
  description: "Personal technical notes on software engineering.",
  language: "en",
  siteUrl: "https://yourname.github.io",
  basePath: "",
  author: {
    name: "junan",
    bio: "...",
  },
  nav: [
    { label: "archive", href: "/archive/" },
    { label: "tags", href: "/tags/" },
    { label: "projects", href: "/projects/" },
    { label: "about", href: "/about/" },
  ],
  home: {
    featuredPostCount: 3,
    recentPostCount: 5,
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "RSS", href: "/rss.xml" },
  ],
};
```

字段说明：

- **`siteUrl`**：站点的根地址。RSS 与 sitemap 中的绝对链接、`<link rel="canonical">` 都从这里拼接。
- **`basePath`**：当你部署到 `https://example.com/blog/` 这种子路径时，把它设为 `"/blog"`。所有内部链接会通过 `withBase()` 自动加前缀。本仓库默认是空字符串。
- **`nav`**：顶部导航顺序与名称。新增页面要不要进导航，自己决定。
- **`home.featuredPostCount` / `home.recentPostCount`**：主页两个列表的数量上限。

## astro.config.mjs

```js
export default defineConfig({
  site: 'https://yourname.github.io',
  base: '',
});
```

Astro 自己也需要知道 `site` 和 `base`，用于生成 `<link rel="canonical">` 的默认值、`Astro.site`、`Astro.url` 等。**这两个值必须和 `siteConfig.siteUrl` / `siteConfig.basePath` 保持一致**，否则可能出现 canonical URL 与内部链接前缀不匹配的情况。

## URL 助手

`src/lib/url.ts` 提供两个函数，所有内部链接构造都应该走它们：

```ts
withBase("/posts/foo/")    // → "/blog/posts/foo/"  (假设 basePath=/blog)
absoluteUrl("/posts/foo/") // → "https://example.com/blog/posts/foo/"
```

`withBase` 会自动跳过外链（以 `http` 开头的字符串原样返回）。在写组件时，如果要拼站内路径，调用它而不是手写字符串拼接，可以避免 `basePath` 改动后大面积出错。

## 修改后需要做什么

修改 `siteConfig` 后通常不需要重启 dev server——Vite 会热更新。但如果你改了 `astro.config.mjs`，**必须重启** `npm run dev`，因为 Astro 配置在启动时只读一次。

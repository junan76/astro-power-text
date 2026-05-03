---
title: "站点配置：siteConfig 与 astro.config 的协同"
description: "站点元数据集中在 src/config/site.ts，部署相关的 site / base 在 astro.config.mjs，两边各管一段，互不重叠。"
date: 2026-04-22
tags: ["doc", "config"]
featured: false
draft: false
---

站点的"自我介绍"——标题、描述、作者、社交链接、导航条目、以及部署 URL——分布在两个文件，各管一段：`src/config/site.ts` 负责站点元数据，`astro.config.mjs` 负责部署配置。

## src/config/site.ts

这是站点元数据的单一事实源（single source of truth），所有页面都从这里读取：

```ts
export const siteConfig = {
  title: "junan",
  description: "Personal technical notes on software engineering.",
  language: "en",
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

- **`title` / `description` / `language`**：HTML `<title>`、meta description、`<html lang>`。
- **`nav`**：顶部导航顺序与名称。新增页面要不要进导航，自己决定。
- **`home.featuredPostCount` / `home.recentPostCount`**：主页两个列表的数量上限。
- `socialLinks` 里 `RSS` 用相对路径 `/rss.xml`，`withBase()` 会自动加上部署前缀；`GitHub` 是外链，原样输出。

注意 `siteConfig` 里**不再**包含站点根 URL 和子路径——这两项归 `astro.config.mjs` 管，避免双源（见下）。

## astro.config.mjs

```js
export default defineConfig({
  site: 'https://yourname.github.io',
  base: '/',
});
```

- **`site`**：站点根 URL。RSS / sitemap 里的绝对链接、`<link rel="canonical">` 全部从这里来。代码里通过 `import.meta.env.SITE` 或 `Astro.site` 读取——别在 `siteConfig` 里再开一个 `siteUrl` 字段。
- **`base`**：部署到子路径时的唯一开关。比如 GitHub Pages 项目页 `https://yourname.github.io/blog/` 设成 `'/blog'`；用户主页或自定义域名直接 `'/'`。代码里通过 `import.meta.env.BASE_URL` 读取，`src/lib/url.ts:withBase` 已经包了一层。

`site` 和 `base` 都是构建期常量——`astro.config.mjs` 改了之后必须重启 dev server。

## URL 助手

`src/lib/url.ts` 提供两个函数，所有内部链接构造都应该走它们：

```ts
withBase("/posts/foo/")    // → "/blog/posts/foo/"  (假设 base='/blog')
absoluteUrl("/posts/foo/") // → "https://example.com/blog/posts/foo/"
```

`withBase` 会自动跳过外链（以 `http` 开头的字符串原样返回）。在写 `<a href>`、`<link>` 等任何内部路径时，调用它而不是手写字符串拼接，可以避免 `base` 改动后大面积出错。

## 修改后需要做什么

改 `siteConfig` 后通常不需要重启 dev server——Vite 会热更新。但 `astro.config.mjs` 的字段（包括 `site` 和 `base`）是构建期注入的，改了之后**必须重启** `npm run dev`。

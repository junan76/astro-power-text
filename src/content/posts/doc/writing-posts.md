---
title: "写一篇文章：frontmatter 与 URL 规则"
description: "讲清楚每个字段的含义、目录如何映射到 URL、草稿与精选标记的作用，以及 Markdown / MDX 的支持范围。"
date: 2026-04-30
tags: ["doc", "writing"]
featured: true
draft: false
---

写文章只有两步：在 `src/content/posts/` 下放一个 Markdown 文件，写好 frontmatter。下面把每个细节展开。

## frontmatter 字段

`src/content.config.ts` 用 zod 定义了 schema，违反规则的文章会在 `astro:content` 读取时直接报错。字段如下：

```yaml
---
title: "文章标题"            # 必填
description: "一句话摘要"    # 必填，主页/归档的 hover 提示也用这里
date: 2026-05-01             # 必填，用作排序与归档分组
updated: 2026-05-02          # 可选，标记最近修订
tags: ["doc", "writing"]     # 可选，默认 []
featured: true               # 可选，默认 false
draft: false                 # 可选，默认 false
---
```

几个容易踩坑的点：

- `date` 字段会被 zod 用 `z.coerce.date()` 强制转换。直接写 `2026-05-01` 就行，不需要加引号。
- `description` 不要写得太长。在主页和归档页的 hover popover 中会被截断到 160 个字符以内。
- `tags` 元素会经过 `slugifyTag` 转成 URL 安全的形式（小写、Unicode 字母数字之外的字符全部转成 `-`）。两个标签会被合并到同一个 `/tags/<slug>/` 页。

## 目录与 URL

`src/content/posts/` 下的目录结构会原样反映到 URL 里。比如：

```
src/content/posts/doc/getting-started.md
```

会渲染成：

```
/posts/doc/getting-started/
```

第一级子目录（`doc`、`notes`、`tools` 等）只是用来在源代码里做组织分类，并不会单独生成"分类页"。如果想做分类聚合，目前的方式是用 `tags`，标签页会自动汇总。

## 草稿与精选

- `draft: true` 的文章不会出现在主页、归档、标签页或 RSS 里，但是仍然会被 Astro 编译。换句话说，草稿不会泄露在公开列表，但你可以用直链访问到。如果想完全不发布，把文件留在仓库外或加个 `.draft.md` 之类的扩展也是可以的（但要让 glob 排除它）。
- `featured: true` 的文章会进入主页的 "featured" 区。`siteConfig.home.featuredPostCount` 决定显示几条，默认 3。

## Markdown 还是 MDX

两个集合的 glob 模式都是 `**/*.{md,mdx}`，所以 `.mdx` 文件会被自动识别。普通文字内容写 `.md` 就够了；需要在文章里嵌入 Astro 组件（比如自定义图表、交互式示例）时再切换到 `.mdx`。

## 一个最小示例

```markdown
---
title: "今天学到了什么"
description: "记录一下最近读到的 CSS Grid 相关坑点。"
date: 2026-05-02
tags: ["css", "笔记"]
---

正文写在这里。Markdown 的所有语法都能用：标题、列表、代码块、链接、图片……
```

保存后，`npm run dev` 不需要重启就会立刻刷新。

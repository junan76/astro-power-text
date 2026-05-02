---
title: "项目集合：长期主题的归集方式"
description: "项目集合 (projects) 是一个独立于普通文章的内容空间，每个项目有自己的主页和子文章。这篇说明它的目录约定与 schema。"
date: 2026-04-28
tags: ["doc", "projects"]
featured: true
draft: false
---

普通文章 (`posts`) 和项目 (`projects`) 是两个独立的内容集合。项目的存在是为了把一个长期主题下的零散笔记归拢起来：每个项目有一个主页，主页下面挂若干篇相关文章。

## 目录约定

`src/content/projects/` 下的每个一级子目录就是一个项目。比如：

```
src/content/projects/
├── astro-blog/
│   ├── index.md          ← 项目主页
│   └── design-notes.md   ← 子文章
└── note-cli/
    ├── index.md
    └── cli-design.md
```

对应 URL：

```
/projects/astro-blog/                ← 项目主页
/projects/astro-blog/design-notes/   ← 子文章
/projects/note-cli/
/projects/note-cli/cli-design/
```

约定上，每个项目目录**必须**有一个 `index.md`（或 `index.mdx`），它会被识别为项目主页。同目录下其余 Markdown 文件是子文章。

## frontmatter

项目集合的 schema 在普通文章 schema 之上扩展了三个可选字段：

```yaml
---
title: "Astro Blog"
description: "本博客的设计与实现笔记。"
date: 2026-04-15
tags: ["astro", "blog"]
featured: true
draft: false
status: "active"                         # active / paused / completed / archived
repository: "https://github.com/.../"    # 可选
website: "https://example.com"           # 可选
---
```

`status` 是一个枚举，目前只有四个值：`active`、`paused`、`completed`、`archived`。`repository` 和 `website` 必须是合法的 URL，否则 zod 会抛错。

## 主页列表与归档行为

`src/lib/content.ts` 里的几个过滤器决定了项目的内容会出现在哪里：

- 项目 `index.md` 会被 `isPublishedPost` 过滤掉（它的 id 以 `/index` 结尾），所以 **主页的 "recent" 列表、归档页和 RSS 中都不会出现项目主页**，只会出现项目子文章。
- 项目主页只在 `/projects/` 列表和它自己的 `/projects/<slug>/` 页面中显示。
- 子文章混入归档和 RSS 时按日期排序，与普通文章不区分对待。

这个设计的意图是：项目主页一般是导航性质的，不应当在"最近文章"里抢位置；项目下的具体笔记则是真实的内容，理应出现在归档里。

## 何时用项目而不是文章

判断标准很简单：如果你预计会围绕同一个主题持续写多篇相关笔记，并且希望它们有一个共同的入口，就开一个项目；否则用普通文章 + 标签 就够了。

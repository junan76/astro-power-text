---
title: "样式与布局：终端风格的可复用 class"
description: "Layout 组件的职责划分、PostList 的两种 variant，以及实现「标题 hover 显示描述」的细节。"
date: 2026-04-20
tags: ["doc", "styling"]
featured: false
draft: false
---

整个站点的视觉风格围绕一个"伪终端"概念：黑底白字、等宽字体、提示符开头的小标题。这一篇说明组件层与样式层是怎么配合的，以及在写新页面时可以直接复用哪些 class。

## Layout

- **`BaseLayout.astro`** 是所有页面的外壳：注入 `<head>`（标题、描述、canonical、OG 标签、RSS 链接、favicon）、引入全局样式、渲染顶部 `Header` 与底部 `Footer`，并把页面主体放进一个限宽容器。`wide` prop 切换"普通宽度"和"加宽"两种容器。
- **`PostLayout.astro`** 在 `BaseLayout` 之上再包一层，负责文章详情页的标题、日期、标签和"提示符"前缀。

新增普通页面时套 `BaseLayout` 就够了；新增文章式页面（带元信息、prose 排版）则套 `PostLayout`。

## PostList 的两种 variant

`src/components/PostList.astro` 是文章列表的统一组件，提供两种外观：

- **`compact`**：单行 `日期 + 标题`，给主页和归档之类的密集列表用。会把 `description` 截断到 160 字符放到 `data-description` 属性，hover 时通过 CSS 浮层显示。
- **`default`**：卡片式，标题 + 日期 + 描述 + 标签，给 listing 页用。

```astro
<PostList posts={items} variant="compact" />
<PostList posts={items} variant="default" />
```

`PostItem` 类型是组件自带的，要传 `title` / `description` / `date` / `href` / `tags?`。如果传了空数组，会显示 `empty` prop 指定的占位文字。

## 终端风格的常用 class

下面这些 class 都定义在 `src/styles/global.css`，写新页面时优先复用：

| class                   | 用途                                                |
| ----------------------- | --------------------------------------------------- |
| `terminal-page`         | 页面主区域容器，控制纵向间距                        |
| `terminal-command`      | 提示符样式的小标题，前面通常带 `$`                  |
| `terminal-scroll`       | 多个分区共享的滚动容器                              |
| `terminal-list`         | 紧凑列表，配合 `terminal-row` / `terminal-link` 用  |
| `terminal-row`          | grid 布局的"日期 + 标题"行                          |
| `terminal-link`         | 列表中的链接，`data-description` 触发 hover 浮层    |
| `terminal-project-row`  | 项目列表行，左右两栏（标题 / 状态信息）             |
| `terminal-meta`         | 灰色辅助文字                                        |
| `terminal-kv-list`      | key-value 双栏列表（about 页之类）                  |
| `prose`                 | Markdown 渲染区，正文排版用                         |

## hover 显示描述：实现细节

主页、归档、项目列表都有同一个交互：鼠标停在文章标题上时弹出一个浮层显示文章描述。关键约束：浮层只能由 **标题文字本身** 触发，不能整行触发。

实现方式有两点：

1. 在 `<a class="terminal-link">` 上挂 `data-description="..."` 属性，CSS 通过 `::after` 伪元素读取这个属性渲染浮层。
2. 在 `<a>` 外面包一层 `<span>`。这是因为 grid 子元素会被自动 blockify（即便 `<a>` 本来是 inline，作为 grid 的直接子节点也会撑满 cell），导致整行都能触发 hover。包一层 span 后，grid item 变成 span（撑满 cell、长标题能折行），里面的 `<a>` 重新变回 inline，hover 区只覆盖文字。

如果未来加新的列表页，记住这两条：**给链接挂 `data-description`**，**用 span 包一层**。

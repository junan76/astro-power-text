---
title: "快速上手：安装与本地预览"
description: "介绍这个博客的目录结构、运行环境要求，以及日常使用的几个 npm 命令。"
date: 2026-05-01
tags: ["doc", "getting-started"]
featured: true
draft: false
---

这是一份从零开始的入门指南，目标是让你在十分钟内把这个博客在本地跑起来，并对项目布局形成最初的印象。

## 运行环境

项目使用 Astro 6 构建，`package.json` 中的 `engines.node` 字段规定了 Node 版本下限：

```
"engines": {
  "node": ">=22.12.0"
}
```

请使用 22.12 或更新的 Node。推荐通过 `nvm`、`fnm`、`volta` 等版本管理工具切换，避免污染系统环境。

## 安装与启动

仓库已经把 `package-lock.json` 一并提交，安装时直接：

```bash
npm install
```

随后常用的几个脚本：

| 命令              | 用途                                              |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | 启动本地开发服务器，默认 `http://localhost:4321`  |
| `npm run build`   | 生成静态文件到 `dist/`                            |
| `npm run preview` | 在本地预览 `dist/` 的产物，部署前最后一道检查     |
| `npm run astro`   | 调用 Astro CLI，例如 `npm run astro -- check`     |

由于这个项目没有引入测试框架，验证改动是否正确的常规手段是 `npm run astro -- check`（类型与内容 schema 检查）加上 `npm run build`（确保整站能完整构建）。涉及视觉的改动还需要 `npm run dev` 在浏览器里看一眼。

## 目录速览

```
src/
├── components/   可复用 UI 组件
├── config/       站点元数据 (siteConfig)
├── content/      文章与项目的源 Markdown
│   ├── about.md
│   ├── posts/
│   └── projects/
├── content.config.ts   定义内容集合的 schema
├── layouts/      页面外壳与文章外壳
├── lib/          帮助函数（URL、日期、过滤、排序）
├── pages/        路由
└── styles/       全局样式
```

写文章只需要碰 `src/content/posts/`；改站点信息看 `src/config/site.ts`；新增页面看 `src/pages/`。其余目录基本上是按需进入。

## 下一步

后面几篇文档分别讲：如何写文章、项目集合是怎么组织的、标签/归档/RSS 的生成机制、以及如何调整站点配置和样式。建议按顺序读，每一篇都尽量短小。

---
title: "Note CLI"
description: "一个示例项目：用来演示项目集合的组织方式。设想是一个最小化的命令行笔记工具。"
date: 2026-04-10
tags: ["cli", "tools"]
featured: false
draft: false
status: "paused"
---

> 这个项目是为了演示"项目集合"的用法而存在的占位条目，不是一个真实在维护的工具。

设想中的 Note CLI 是一个极简的命令行笔记工具，目标是：

- 全部数据存为本地 Markdown 文件，不引入数据库。
- 通过文件名前缀（日期）和 frontmatter（标签）做检索。
- 支持快速捕获 (`note new`)、按标签查询 (`note tag <name>`)、全文搜索 (`note grep <keyword>`)。

## 当前状态

`status: paused`。最初做了一版原型，发现 90% 的需求其实直接用 `vim` + `ripgrep` + 一个简单的 shell 脚本就能解决，所以暂停了。这个项目主页留在这里，主要是给浏览站点的人提供一个项目结构的样例。

子文章里记录了原型阶段做过的几个设计实验，可以当作"项目暂停后该如何归档"的参考。

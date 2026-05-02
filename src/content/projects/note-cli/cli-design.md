---
title: "命令设计：从用户输入推回数据模型"
description: "原型阶段对 Note CLI 命令集的设想，以及为什么最后觉得收益不足以继续推进。"
date: 2026-04-12
tags: ["cli", "design"]
featured: false
draft: false
---

这是 Note CLI 原型阶段的设计草稿，归档存放在这里。

## 命令草案

设计时希望命令组只有三个高频动作：

```bash
note new "标题"               # 创建一篇新笔记
note tag <name>               # 列出某个标签下的笔记
note grep <keyword>           # 全文搜索
```

第二层动作（列表、删除、编辑）通过文件路径直接交给系统工具处理，不在 CLI 内重做：

```bash
ls ~/notes
rm ~/notes/2026-05-01-foo.md
$EDITOR ~/notes/2026-05-01-foo.md
```

## 数据模型

每篇笔记是一个 Markdown 文件，文件名是 `<date>-<slug>.md`，frontmatter 至少包含 `tags`：

```markdown
---
tags: [reading, papers]
---

正文……
```

`note tag <name>` 通过扫描所有文件的 frontmatter 实现；`note grep` 直接 fork 一个 `ripgrep` 子进程。

## 为什么暂停

写完原型后试用了两周，得出的结论是：

1. `note new` 替代不了 `vim ~/notes/$(date +%F)-foo.md` 多少。
2. `note tag` 在 frontmatter 上线前就一直没有用上——日常其实通过文件夹分类就够了。
3. `note grep` 完全是 `rg ~/notes` 的子集。

也就是说，CLI 提供的抽象比直接用文件系统加 ripgrep 多不出多少价值，而维护一个独立工具的成本是实在的。最终决定先把项目挂起来，等真的有重复劳动多到无法忍受时再回头。

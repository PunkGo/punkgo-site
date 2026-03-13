---
layout: blog
title: "我审计了 25,000 次 AI 操作——发现了什么"
date: "2026-03-13"
description: "两周，116 个 session，每次工具调用都有密码学回执"
author: "Felix"
---

两周前我在 Claude Code 旁边装了 [punkgo-jack](https://github.com/PunkGo/punkgo-jack)。一行命令。然后忘了这回事，继续干活。

今天跑了 `punkgo-jack presence`，看到了这个：

```
  2/28 Sat                                                       0
  3/1  Sun                                                       0
  3/2  Mon                                                       5
  3/3  Tue                                                     876
  3/4  Wed                                                     184
  3/5  Thu                                                   1,781
  3/6  Fri                                                   2,801
  3/7  Sat                                                   2,389
  3/8  Sun                                                  10,684
  3/9  Mon                                                   2,596
  3/10 Tue                                                   1,684
  3/11 Wed                                                       0
  3/12 Thu                                                     443
  3/13 Fri                                                   1,753

  ⚡25,196 energy · 24,264 actions · 1,011 decisions · 116 sessions
```

25,000 能量消耗，24,000+ 次操作。每一次都记录在本地 SQLite 数据库。每一次都被哈希进 Merkle 树。每一次都可以用密码学证明验证——离线，不需要信任任何人。

我来讲讲发现了什么。

## AI 工作的形状

热力图讲了一个故事。每行是一天，每格是一小时。越亮 = 消耗能量越多。

**高峰时段：22:00。** 深夜码代码的 session 才是真正出活的时候。3 月 8 日周日是个怪物——单日 10,684 能量。那天我在做 kernel 的 IPC 架构重设计，Claude Code 在多个 crate 里编辑了几十个文件的深度架构 session。

**3 月 11 日周三：零。** 那天没碰电脑。热力图知道。

这就是 GitHub contribution graph 的进化版——如果它追踪的不是 commit，而是每一次操作。

## 25,000 次操作长什么样

跑了 `punkgo-jack export --format json`，统计了事件类型：

| 操作类型 | 数量 | 占比 |
|---------|-----:|----:|
| command_execution（命令执行） | 5,976 | 24.6% |
| file_read（文件读取） | 2,336 | 9.6% |
| user_prompt（用户提示） | 1,022 | 4.2% |
| file_edit（文件编辑） | 1,003 | 4.1% |
| content_search（内容搜索） | 755 | 3.1% |
| web_search（网络搜索） | 641 | 2.6% |
| mcp_tool_call（MCP 工具调用） | 581 | 2.4% |
| file_write（文件写入） | 343 | 1.4% |
| web_request（网络请求） | 157 | 0.6% |
| file_search（文件搜索） | 157 | 0.6% |

pre/post 配对说明了一切——每个 `file_edit_pre` 都有对应的 `file_edit` 回执。每个 `command_execution_pre` 都有结果。

**关键比率：1,011 个决策触发了 24,264 次操作。** 平均每个人类提示 ~24 次工具调用。我的每个决策级联出十几次文件读取、几次编辑、几次命令执行。这就是 AI 辅助编程的放大系数——也正是审计日志重要的原因。

## 回执是真的

每个操作都是 Merkle 树（RFC 6962）中的一个叶子。树生成 checkpoint：

```
punkgo-kernel v0
24322
dG3LS7kqx+8f...  (base64 根哈希)
```

这个 checkpoint 是一个承诺。它说："这个日志里恰好有 24,322 条记录，根哈希是这个值。" 数量比 24,264 次操作略多，因为包含了 session 生命周期事件（start、end）。如果任何人——我、CI 系统、合规审计师——想验证某个特定操作是否发生，只需要 ~15 个哈希（log2(24,322)），而不是全部 24,322 条记录。

离线验证任意事件：

```bash
$ punkgo-jack verify --leaf 18201
Leaf 18201 verified against tree size 24322.
```

因为证明格式遵循 RFC 6962，我可以用 Go、Rust、或任何有 `sumdb/tlog` 实现的语言验证同一个证明。**零供应商锁定。**

## 让我意外的事

**1. AI 比我想象的更努力。**

每个 prompt 24 次操作意味着，当我输入"修这个 bug"，Claude Code 会读 5-10 个文件、搜索代码库、编辑 2-3 个文件、跑测试，有时还搜索网络——这一切发生在我看到回复之前。没有审计日志，我根本不知道黑箱里发生了什么。

**2. 失败也被记录了。**

187 次 `command_execution_failed`。44 次 `file_read_failed`。30 次 `mcp_tool_call_failed`。这些不是错误——是证据。当 AI 尝试某件事但没成功，这次尝试就在日志里。永久的。你无法理解 AI 做了什么，除非你知道它*试图*做什么。

**3. 开销是隐形的。**

两周日常使用，我从没注意到 jack 在运行。它挂接到 Claude Code 的事件系统，通过 IPC 向本地守护进程记录事件，然后待在一边不碍事。24,000+ 事件的 SQLite 数据库不到 20MB。

## 为什么重要

AI 行业建立在信任之上。"相信我们，模型是安全的。""相信我们，agent 遵循了指令。""相信我们，什么坏事都没发生。"

信任不是安全模型。验证才是。

当你的 AI agent 通宵运行——编辑代码、部署服务、管理基础设施——唯一重要的问题是：**你能证明它做了什么吗？**

不是"你记录了吗"（日志可以被编辑）。不是"你签名了吗"（签名无法证明完整性）。而是：**有没有数学证明，日志是完整的、未篡改的、可独立验证的？**

这就是 25,000 张密码学回执给你的。

## 试试

```bash
curl -fsSL https://raw.githubusercontent.com/PunkGo/punkgo-jack/main/install.sh | sh
punkgo-jack setup claude-code
```

两条命令。从此每次 AI 操作都有回执。

跑几个 session 后，运行 `punkgo-jack presence` 看看你自己的热力图。你可能会惊讶于你的 AI 一直在干什么。

---

*[PunkGo](https://punkgo.dev) 是开源的。kernel、jack 和所有验证工具都在 [GitHub](https://github.com/PunkGo) 上。Merkle 证明遵循 RFC 6962，可与 Go 标准库 `sumdb/tlog` 交叉验证。*

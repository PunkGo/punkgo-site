---
layout: blog
title: "哈希链 vs Merkle 树"
date: "2026-03-13"
description: "为什么大多数 AI agent 审计方案无法证明完整性"
author: "Felix"
---

你的 AI agent 刚跑了 47 次工具调用。你想知道：**审计日志记全了吗？还是有人悄悄删了几条尴尬的记录？**

这个问题——完整性——是真正的问责与安全戏剧的分水岭。大多数 AI agent 审计工具在这里翻了车，因为它们选错了密码学原语。

## 赛道现状

2026 年 Q1，至少十个项目打着「AI agent 密码学收据」的旗号上线了。它们分成三个阵营：

| 方案 | 代表 | 能证明什么 |
|------|------|-----------|
| **签名收据** | Circe, AgentMint, Sanna | "这个 action 发生过" |
| **哈希链** | Unworldly, AIR Blackbox | "这个序列没被篡改" |
| **透明日志** | Certificate Transparency, PunkGo | "日志只增长——没有记录被删除" |

听起来差不多。本质完全不同。

<img src="/blog/three-approaches.svg" alt="三种方案对比：签名收据无法检测缺失事件，哈希链无法检测尾部删除，Merkle 树检测所有篡改" />

## 签名收据：证明个体

签名收据是一个独立的工件——对 JSON 载荷做 Ed25519 签名。你可以把它交给任何人验证：

- 这个 action 被记录了
- 签名有效
- 载荷没被改过

```
{
  "action": "bash:rm -rf /tmp/data",
  "timestamp": "2026-03-12T14:02:31Z",
  "signature": "base64(Ed25519(...))"
}
```

**缺口：** 签名收据是独立的。删掉一张，剩下的照样验证通过。收据之间没有结构关系。如果你的 agent 跑了 47 个 action，你只看到 45 张收据——你怎么知道少了两张？

你不会知道。

## 哈希链：证明序列

哈希链把事件串起来。每个事件包含前一个的哈希值：

```
event[0].hash = SHA256(event[0].data)
event[1].hash = SHA256(event[1].data + event[0].hash)
event[2].hash = SHA256(event[2].data + event[1].hash)
```

如果有人篡改 event[1]，event[2] 的哈希就对不上。中间篡改可以检测。

**缺口：** 验证哈希链需要遍历整条链。第三方审计师需要看到*所有*事件才能验证*任何*一个事件。10,000 个事件 = 10,000 次哈希计算。

更糟糕的是：截断是隐形的。如果链上有 47 个事件，有人删掉最后 5 个，你看到的是一条有效的 42 事件链。一切正常——除非你事先知道链应该更长。

而如果链的验证者和写入者是同一方——**谁来监督守望者？**

## 透明日志：证明完整性

透明日志（RFC 6962）把事件存在 Merkle 树里——一棵二叉哈希树，根节点概括了整个日志。这个结构给你两个哈希链做不到的东西：

### 包含证明（Inclusion Proof）

"事件 e5 在日志里。" 证明只需要 **对数级** 数量的哈希——100 万个事件的日志，只需要 ~20 个哈希，不是 100 万个。任何第三方无需看到其他事件就能验证。

<img src="/blog/inclusion-proof.svg" alt="包含证明：验证 e5 只需 3 个哈希，8 个事件中的 O(log n)" />

### 一致性证明（Consistency Proof）

"日志从 4 条增长到 6 条，前 4 条没变。" 这是关键原语。

<img src="/blog/consistency-proof.svg" alt="一致性证明：日志从 4 增长到 6，旧事件完整保留" />如果你在 42 条时做了 checkpoint，后来日志到了 47 条，一致性证明在数学上保证：

- 没有事件被删除
- 没有事件被重排
- 唯一的变化是追加了 5 条新事件

**这就是「完整性」的含义。** 不是"这个事件存在"（签名收据）。不是"这个序列完好"（哈希链）。而是"日志只增长，我可以向任何人证明。"

## 这不是理论

Certificate Transparency 从 2013 年开始就在全球规模运行这个架构。每张公共 CA 签发的 TLS 证书都被记录在透明日志中。浏览器强制执行。结果：流氓证书在数小时内就能被发现，而不是数年。

Go 的模块生态（`sum.golang.org`）用的同一个结构。每个 Go 模块版本都有透明日志条目，`go mod verify` 在本地检查包含证明。

Sigstore 的 Rekor 对软件签名做同样的事。

数学基础是 RFC 6962（和更新的 RFC 9162）。Checkpoint 格式是 [C2SP tlog-checkpoint](https://c2sp.org/tlog-checkpoint)。这些不是私有协议——任何人都可以实现验证器。

## 一个具体例子

下面是 Merkle 包含证明在实践中的样子。同一个证明，两种语言的独立实现都能验证：

**Rust**（使用 `tlog_tiles` crate）：
```rust
let valid = tlog::check_record(
    &proof,        // 对数级哈希路径
    tree_size,     // 当前树大小
    tree_root,     // 当前根哈希
    leaf_index,    // 哪个事件
    leaf_hash      // 事件的哈希
);
```

**Go**（使用 `golang.org/x/mod/sumdb/tlog`）：
```go
err := tlog.CheckRecord(
    proof,        // 同一条哈希路径
    treeSize,     // 同一个树大小
    treeRoot,     // 同一个根哈希
    leafIndex,    // 同一个事件
    leafHash,     // 同一个哈希
)
```

同一个数学。同一个证明。两种语言。零信任。

## 决策框架

为 AI agent 审计选择密码学原语时，问三个问题：

1. **第三方能否在不看整个日志的情况下验证单个事件？**
   - 签名收据：能，但无法检测删除
   - 哈希链：不能——需要完整链
   - Merkle 树：**能——O(log n) 证明**

2. **能否检测尾部事件被删除？**
   - 签名收据：不能
   - 哈希链：不能（截断隐形）
   - Merkle 树：**能——一致性证明**

3. **验证协议是否标准化？**
   - 签名收据：各种（Ed25519, HMAC, JWS...）
   - 哈希链：通常自定义
   - Merkle 树：**RFC 6962 / 9162, C2SP checkpoint**

## 这对 AI Agent 意味着什么

当你的 AI agent 通宵运行 8 小时，编辑代码库、部署到生产环境、管理基础设施——审计日志是"我信任我的 agent"和"我能证明我的 agent 做了什么"之间唯一的分界线。

"我信任"是一个策略声明。"我能证明"是一个数学声明。

哈希链给你篡改检测。Merkle 树给你**篡改检测 + 完整性 + 高效第三方验证**。工程成本差不多。问责差距天壤之别。

---

*本文描述的透明日志方案，正是我们在 [PunkGo](https://github.com/PunkGo/punkgo-jack) 中实现的——一个开源 Rust CLI，为 AI agent 行为创建 RFC 6962 审计日志。Merkle 证明可与 Go 标准库 `sumdb/tlog` 交叉验证。*

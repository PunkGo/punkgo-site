---
layout: blog
title: "I Audited 25,000 AI Actions — Here's What I Found"
date: "2026-03-13"
description: "Two weeks, 116 sessions, and every tool call got a cryptographic receipt"
author: "Felix"
---

Two weeks ago I installed [punkgo-jack](https://github.com/PunkGo/punkgo-jack) alongside Claude Code. One line of setup. Then I forgot about it and went back to work.

Today I ran `punkgo-jack presence` and saw this:

```
  ⚡ punkgo-jack presence

  2/28 Sat  ░░░░░░░░░░░░░░░░░░░░░░░░      0
  3/1  Sun  ░░░░░░░░░░░░░░░░░░░░░░░░      0
  3/2  Mon  ░░░░░░░░░░░░░░░░░░░░░░░▒      5
  3/3  Tue  ▒▒░░░░░░░░░░░░░░░░░░░▒▒▒    876
  3/4  Wed  ▒░░░░░░░░░░░░░░░░░░░░░▒▒    184
  3/5  Thu  ▒░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒  1,781
  3/6  Fri  ▒░░░░░░░░░░▒▓▒▒▒▒▒▒▒▒▓▒▒  2,801
  3/7  Sat  ▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▓  2,389
  3/8  Sun  ▒▓▒░░░░░░░▒▒▒▓▓█▓█▓▒▓▓█▓ 10,684
  3/9  Mon  ▓▒░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▓▓  2,596
  3/10 Tue  ▓▒░░░░░░░░░▒▒▒▒▒▒▒▒░▒▒▒▒  1,684
  3/11 Wed  ░░░░░░░░░░░░░░░░░░░░░░░░      0
  3/12 Thu  ░░░░░░░░░░░░░░▒▒▒░░░░░░░    443
  3/13 Fri  ░░░░░░░░░░░░░░▓▒▒▓▒░▒▒░░  1,753

  ⚡25,196 energy · 24,264 actions · 1,011 decisions
  116 sessions · peak 22:00 · 14 days
```

25,000 energy spent across 24,000+ actions. Each one recorded in a local SQLite database. Each one hashed into a Merkle tree. Each one verifiable with a cryptographic proof — offline, without trusting anyone.

Let me tell you what I learned.

## The Shape of AI Work

The heatmap tells a story. Each row is a day, each cell is an hour. Brighter = more energy spent.

**Peak hour: 22:00.** Late-night coding sessions are where the real work happens. Sunday March 8th was a monster — 10,684 energy in a single day. That was when I was doing the kernel's IPC redesign, a deep architectural session where Claude Code was editing dozens of files across multiple crates.

**Wednesday March 11th: zero.** I didn't touch the computer. The heatmap knows.

This is what a GitHub contribution graph would look like if it tracked every keystroke, not just commits.

## What 25,000 Actions Look Like

I ran `punkgo-jack export --format json` and counted the event types:

| Action Type | Count | % |
|-------------|------:|--:|
| command_execution | 5,976 | 24.6% |
| file_read | 2,336 | 9.6% |
| user_prompt | 1,022 | 4.2% |
| file_edit | 1,003 | 4.1% |
| content_search | 755 | 3.1% |
| web_search | 641 | 2.6% |
| mcp_tool_call | 581 | 2.4% |
| file_write | 343 | 1.4% |
| web_request | 157 | 0.6% |
| file_search | 157 | 0.6% |

The pre/post pairs tell the full story — every `file_edit_pre` has a corresponding `file_edit` post. Every `command_execution_pre` has a result.

**The ratio that matters: 1,011 decisions triggered 24,264 actions.** That's ~24 tool calls per human prompt. Each of my decisions cascaded into a dozen file reads, a handful of edits, and a few command executions. This is the amplification factor of AI-assisted coding — and exactly why audit trails matter.

## The Receipts Are Real

Every action gets a leaf in a Merkle tree (RFC 6962). The tree produces a checkpoint:

```
punkgo-kernel v0
24322
dG3LS7kqx+8f...  (base64 root hash)
```

This checkpoint is a commitment. It says: "there are exactly 24,322 entries in this log, and the root hash is this value." The count is slightly higher than the 24,264 actions because it includes session lifecycle events (start, end). If anyone — me, a CI system, a compliance auditor — wants to verify that a specific action happened, they need just ~15 hashes (log2 of 24,322), not all 24,322 entries.

I can verify any event offline:

```bash
$ punkgo-jack verify --leaf 18201
Leaf 18201 verified against tree size 24322.
```

And because the proof format follows RFC 6962, I can verify the same proof in Go, Rust, or any language with a `sumdb/tlog` implementation. **Zero vendor lock-in.**

## What Surprised Me

**1. The AI works harder than I thought.**

24 actions per prompt means that when I type "fix this bug," Claude Code reads 5-10 files, searches the codebase, edits 2-3 files, runs the tests, and sometimes searches the web — all before I see the response. Without an audit trail, I'd have no idea what actually happened inside that black box.

**2. Failures are recorded too.**

187 `command_execution_failed` events. 44 `file_read_failed`. 30 `mcp_tool_call_failed`. These aren't errors — they're evidence. When the AI tries something and it doesn't work, that attempt is in the log. Permanently. You can't understand what an AI did without knowing what it *tried* to do.

**3. The overhead is invisible.**

Two weeks of daily use and I never noticed jack running. It hooks into Claude Code's event system, records events via IPC to a local daemon, and stays out of the way. The SQLite database for 24,000+ events is under 20MB.

## Why This Matters

The AI industry is built on trust. "Trust us, the model is safe." "Trust us, the agent followed instructions." "Trust us, nothing bad happened."

Trust is not a security model. Verification is.

When your AI agent runs overnight — editing code, deploying services, managing infrastructure — the only question that matters is: **can you prove what it did?**

Not "did you log it" (logs can be edited). Not "did you sign it" (signatures don't prove completeness). But: **is there a mathematical proof that the log is complete, unaltered, and independently verifiable?**

That's what 25,000 cryptographic receipts give you.

## Try It

```bash
curl -fsSL https://raw.githubusercontent.com/PunkGo/punkgo-jack/main/install.sh | sh
punkgo-jack setup claude-code
```

Two commands. Every AI action gets a receipt from that point forward.

After a few sessions, run `punkgo-jack presence` and see your own heatmap. You might be surprised at what your AI has been doing.

---

*[PunkGo](https://punkgo.dev) is open-source. The kernel, jack, and all verification tools are on [GitHub](https://github.com/PunkGo). The Merkle proofs follow RFC 6962 and are cross-verifiable with Go's `sumdb/tlog` library.*

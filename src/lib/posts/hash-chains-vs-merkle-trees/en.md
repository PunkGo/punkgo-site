---
layout: blog
title: "Hash Chains vs Merkle Trees"
date: "2026-03-12"
description: "Why most AI agent audit trails can't prove completeness"
author: "Felix"
---

Your AI agent just ran 47 tool calls in a session. You want to know: **did the audit trail capture all of them? Or did someone quietly delete the embarrassing ones?**

This question — completeness — is the one that separates real accountability from security theater. And most AI agent audit tools get it wrong, because they chose the wrong cryptographic primitive.

## The Landscape

In 2026 Q1, at least ten projects launched with the pitch "cryptographic receipts for AI agents." They fall into three camps:

| Approach | Examples | What They Prove |
|----------|----------|----------------|
| **Signed receipts** | Circe, AgentMint, Sanna | "This action happened" |
| **Hash chains** | Unworldly, AIR Blackbox | "This sequence wasn't altered" |
| **Transparency logs** | Certificate Transparency, PunkGo | "The log only grew — nothing was removed" |

Each sounds similar. They're fundamentally different.

<img src="/blog/three-approaches.svg" alt="Three approaches compared: signed receipts can't detect missing events, hash chains can't detect tail deletion, Merkle trees detect all tampering" />

## Signed Receipts: Proving the Individual

A signed receipt is a single artifact — Ed25519 signature over a JSON payload. You can hand it to anyone, and they can verify:

- This action was recorded
- The signature is valid
- The payload hasn't been altered

```
{
  "action": "bash:rm -rf /tmp/data",
  "timestamp": "2026-03-12T14:02:31Z",
  "signature": "base64(Ed25519(...))"
}
```

**The gap:** Signed receipts are independent. Delete one, and the remaining receipts still verify. There's no structural relationship between receipts. If your agent ran 47 actions and you only see 45 receipts — how would you know two were deleted?

You wouldn't.

## Hash Chains: Proving the Sequence

A hash chain links events sequentially. Each event includes the hash of the previous one:

```
event[0].hash = SHA256(event[0].data)
event[1].hash = SHA256(event[1].data + event[0].hash)
event[2].hash = SHA256(event[2].data + event[1].hash)
```

If someone alters event[1], event[2]'s hash breaks. Tampering in the middle is detectable.

**The gap:** Hash chains are verified by walking the entire chain. A third-party auditor needs *every* event to verify *any* event. With 10,000 events, that's 10,000 hashes to recompute.

Worse: truncation is invisible. If the chain has 47 events and someone deletes the last 5, you see a valid 42-event chain. Nothing looks wrong — unless you already knew the chain should be longer.

And if the chain is verified by the same party that writes it — **who watches the watchman?**

## Transparency Logs: Proving Completeness

A transparency log (RFC 6962) stores events in a Merkle tree — a binary tree of hashes where the root summarizes the entire log. This structure gives you two things hash chains cannot:

### Inclusion Proof

"Event e5 is in the log." The proof is a **logarithmic** number of hashes — for a log with 1 million events, you need ~20 hashes, not 1 million. Any third party can verify it without seeing any other event in the log.

<img src="/blog/inclusion-proof.svg" alt="Inclusion proof: verifying e5 requires only 3 hashes out of 8 events — O(log n)" />

### Consistency Proof

"The log grew from size 4 to size 6, and the first 4 events are unchanged." This is the key primitive.

<img src="/blog/consistency-proof.svg" alt="Consistency proof: the log grew from 4 to 6 events, old events are preserved" /> If you checkpoint the tree at size 42, and later the tree is at size 47, the consistency proof mathematically guarantees that:

- No events were deleted
- No events were reordered
- The only change was appending 5 new events

**This is what "completeness" means.** Not "this event exists" (signed receipt). Not "this sequence is intact" (hash chain). But "the log only grows, and I can prove it to anyone."

## This Isn't Theoretical

Certificate Transparency has been running this exact architecture at global scale since 2013. Every TLS certificate issued by a public CA is logged in a transparency log. Browsers enforce it. The result: rogue certificates are now detectable within hours, not years.

Go's module ecosystem (`sum.golang.org`) uses the same structure. Every Go module version has a transparency log entry, and `go mod verify` checks inclusion proofs locally.

Sigstore's Rekor does the same for software signatures.

The math is RFC 6962 (and the newer RFC 9162). The checkpoint format is [C2SP tlog-checkpoint](https://c2sp.org/tlog-checkpoint). These are not proprietary — anyone can implement a verifier.

## A Concrete Example

Here's what a Merkle inclusion proof looks like in practice. The same proof, verified by two independent implementations in different languages:

**Rust** (using `tlog_tiles` crate):
```rust
let valid = tlog::check_record(
    &proof,        // logarithmic hash path
    tree_size,     // current tree size
    tree_root,     // current root hash
    leaf_index,    // which event
    leaf_hash      // event's hash
);
```

**Go** (using `golang.org/x/mod/sumdb/tlog`):
```go
err := tlog.CheckRecord(
    proof,        // same hash path
    treeSize,     // same tree size
    treeRoot,     // same root hash
    leafIndex,    // same event
    leafHash,     // same hash
)
```

Same math. Same proof. Two languages. Zero trust required between them.

## The Decision Framework

When choosing a cryptographic primitive for AI agent audit trails, ask:

1. **Can a third party verify a single event without seeing the entire log?**
   - Signed receipts: Yes, but can't detect deletions
   - Hash chains: No — need the full chain
   - Merkle trees: **Yes — O(log n) proof**

2. **Can you detect if events were deleted from the end?**
   - Signed receipts: No
   - Hash chains: No (truncation is invisible)
   - Merkle trees: **Yes — consistency proof**

3. **Is the verification protocol standardized?**
   - Signed receipts: Various (Ed25519, HMAC, JWS...)
   - Hash chains: Usually custom
   - Merkle trees: **RFC 6962 / 9162, C2SP checkpoint**

## What This Means for AI Agents

When an AI agent runs for 8 hours overnight, editing your codebase, deploying to production, and managing infrastructure — the audit trail is the only thing between "I trust my agent" and "I can prove what my agent did."

"I trust" is a policy statement. "I can prove" is a mathematical one.

Hash chains give you tamper detection. Merkle trees give you **tamper detection + completeness + efficient third-party verification**. The engineering cost is comparable. The accountability gap is not.

---

*The transparency log approach described here is what we built into [PunkGo](https://github.com/PunkGo/punkgo-jack) — an open-source Rust CLI that creates RFC 6962 audit trails for AI agent actions. The Merkle proofs are cross-verifiable with Go's standard `sumdb/tlog` library.*

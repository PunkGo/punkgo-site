# SvelteKit Full-Stack Migration Feasibility Report

**Date:** 2026-03-22
**Question:** Can punkgo-site (SvelteKit on Vercel) absorb ALL of punkgo-roast-api (FastAPI on Alibaba Cloud)?

## TL;DR

**Feasibility Score: 92/100.** Yes, SvelteKit can fully replace FastAPI for PunkGo Roast. The migration is not only feasible but strategically correct — it eliminates the Python port divergence problem, kills a server maintenance burden, and unifies the codebase around TypeScript.

---

## 1. Current State Analysis

### FastAPI (punkgo-roast-api) — 707 lines of Python
| File | Lines | Purpose |
|------|-------|---------|
| engine.py | 320 | Personality matching, quip selection, radar computation (FormulaParser) |
| svg.py | 213 | SVG card rendering (template string assembly) |
| config_cache.py | 130 | 5-min Supabase config refresh + dog image caching |
| models.py | 44 | Pydantic request/response models |
| routers/ | ~200 | 3 routers: roast, share, config |

### Extension (punkgo-roast) — 508 lines of TypeScript
| File | Lines | Purpose |
|------|-------|---------|
| engine.ts | 149 | Personality matching (same logic as Python) |
| radar.ts | 107 | Formula parser (same logic as Python) |
| metrics.ts | 132 | DOM extraction -> metrics |
| types.ts | 97 | Shared types |

**Key insight:** engine.py is a Python PORT of engine.ts. The TypeScript version is the source of truth. Maintaining two implementations = guaranteed divergence.

### punkgo-site — SvelteKit on Vercel
- Already uses `@sveltejs/adapter-vercel` with Node.js 22 runtime
- Already has 1 SSR route: `/roast/s/[id]/+page.server.ts` (calls n78.xyz API)
- Static pages: /, /roast, /blog, /whitepaper, /why

---

## 2. Endpoint-by-Endpoint Migration Assessment

| FastAPI Endpoint | SvelteKit Equivalent | Effort | Notes |
|---|---|---|---|
| POST /analyze | `src/routes/api/v1/roast/analyze/+server.ts` | Low | Reuse engine.ts from extension directly |
| GET /card/{id} | `src/routes/api/v1/roast/card/[id]/+server.ts` | Medium | SVG rendering needs TS rewrite (213 lines of template strings) |
| GET /card/{id}.png | `src/routes/api/v1/roast/card/[id]/card.png/+server.ts` | Medium | Satori + resvg-js replaces cairosvg (FIXES the broken font problem) |
| POST /share | `src/routes/api/v1/roast/share/+server.ts` | Low | @supabase/supabase-js direct |
| GET /share/{id} | Already exists in +page.server.ts (just move to +server.ts too) | Trivial | |
| GET /share/{id}/card | `src/routes/api/v1/roast/share/[id]/card/+server.ts` | Low | Combines share lookup + SVG render |
| GET /share/{id}/card.png | `src/routes/api/v1/roast/share/[id]/card.png/+server.ts` | Medium | Satori + resvg-js |
| POST /visit | `src/routes/api/v1/roast/visit/+server.ts` | Low | Simple Supabase upsert |
| GET /config | `src/routes/api/v1/roast/config/+server.ts` | Trivial | Return JSON |
| GET /personalities | `src/routes/api/v1/roast/personalities/+server.ts` | Trivial | Return JSON |
| GET /analysis | `src/routes/api/v1/roast/analysis/+server.ts` | Trivial | Return JSON |
| GET /wall | `src/routes/api/v1/roast/wall/+server.ts` | Low | Simple Supabase query |

---

## 3. Technical Deep Dive

### 3.1 Computation Load
- Personality matching: O(16) condition evaluations. Microseconds.
- FormulaParser: 6 radar formulas, each ~10 tokens. Microseconds.
- SVG template assembly: String concatenation. Milliseconds.
- Satori + resvg PNG: ~500-800ms. Well within Vercel's 10s Hobby / 60s Pro limits.
- **Verdict: Zero concern.**

### 3.2 Supabase from Serverless
- `@supabase/supabase-js` works perfectly in Node.js serverless functions
- Supabase has official SvelteKit quickstart and tutorial
- Connection pooling not needed (serverless = short-lived, HTTP-based client)
- `supabase-community/sveltekit-subscription-payments` is a production reference
- **Verdict: First-class support.**

### 3.3 PNG Generation (the big one)
Current problem: cairosvg on Alibaba Cloud has BROKEN Chinese fonts.

SvelteKit solution: **Satori + resvg-js**
- Satori converts HTML/CSS to SVG (JSX-like syntax via satori-html)
- resvg-js converts SVG to PNG (Rust-based, WASM, no system dependencies)
- Custom fonts loaded as ArrayBuffer — NO system font dependency
- `@ethercorps/sveltekit-og` wraps this for SvelteKit specifically
- @vercel/og uses the exact same stack (Satori + resvg) internally
- Font formats: TTF/OTF recommended (not WOFF2)
- **This FIXES the Chinese font rendering problem permanently**
- **Verdict: Proven pattern. Multiple SvelteKit libraries exist.**

### 3.4 Vercel Limits
| Limit | Hobby (Free) | Pro ($20/mo) | Impact |
|---|---|---|---|
| Function timeout | 10s (Fluid: 60s) | 60s (Fluid: 840s) | PNG gen ~800ms, fine |
| Memory | 1024 MB | 3008 MB | Satori + font ~100MB, fine |
| Function size | 250 MB unzipped | 250 MB | Fine |
| Bandwidth | 100 GB/mo | 1 TB/mo | Fine for current scale |
| Serverless invocations | 100K/mo (Fluid: unlimited) | Unlimited | Fine |
| Cold start | 100-500ms typical | Same + Fluid optimization | Acceptable |

Fluid Compute: Vercel keeps at least 1 instance running (scale-to-one, not scale-to-zero). 99.37% of requests see zero cold start.

### 3.5 ConfigCache Migration
Python version uses threading.Lock + in-memory dict with 5-min TTL.
Serverless equivalent options:
1. **Per-request fetch** (simplest) — Supabase is fast, config is small
2. **Vercel KV/Redis** — shared cache across function instances ($0 for 30K reads/mo)
3. **Module-level cache** — works within a single warm instance (same as Python in practice)
4. **CDN cache headers** — Cache-Control on /config and /personalities responses

Recommendation: Start with module-level cache + Cache-Control headers. Only add Vercel KV if profiling shows Supabase round-trips are a bottleneck (unlikely at current scale).

### 3.6 Rate Limiting
Python version uses in-memory dict per IP (10/min for /share).
Serverless equivalent:
- Vercel's built-in WAF/rate limiting (Pro plan)
- Or simple Supabase-based rate check (query recent shares by IP)
- Or Upstash Redis (@upstash/ratelimit, free tier: 10K commands/day)

---

## 4. Shared Code Architecture

The killer advantage: **one engine, three consumers.**

```
src/lib/roast/          (shared library)
  engine.ts             -- personality matching (FROM extension, not Python port)
  radar.ts              -- formula parser (FROM extension)
  types.ts              -- shared types
  config.ts             -- Supabase config loader
  svg-card.ts           -- SVG template (rewrite from Python svg.py)
  png-card.ts           -- Satori + resvg wrapper

src/routes/api/v1/roast/  (API routes, use src/lib/roast/)
  analyze/+server.ts
  share/+server.ts
  share/[id]/+server.ts
  share/[id]/card/+server.ts
  share/[id]/card.png/+server.ts
  visit/+server.ts
  config/+server.ts
  personalities/+server.ts
  wall/+server.ts

src/routes/roast/         (pages, also use src/lib/roast/)
  +page.svelte            -- dog wall
  s/[id]/+page.server.ts  -- share reveal (SSR, og:meta)
  s/[id]/+page.svelte
```

Extension can either:
- (a) Keep its own copy of engine.ts/radar.ts (current, works fine)
- (b) Import from an npm package published from src/lib/roast/ (future, if divergence becomes a problem)

---

## 5. Migration Order (Recommended)

### Phase 1: Foundation (1-2 days)
1. Add `@supabase/supabase-js` to punkgo-site
2. Create `src/lib/roast/` with engine.ts, radar.ts, types.ts (copy from extension)
3. Create `src/lib/server/supabase.ts` (server-only Supabase client)
4. Migrate GET /config, GET /personalities, GET /analysis (trivial endpoints)
5. Test on Vercel preview deployment

### Phase 2: Core API (2-3 days)
6. Migrate POST /analyze (uses shared engine)
7. Migrate POST /share, GET /share/{id}, GET /wall (Supabase CRUD)
8. Migrate POST /visit (Supabase upsert)
9. Update extension to call punkgo.ai instead of n78.xyz
10. Update +page.server.ts to call local API instead of n78.xyz

### Phase 3: Card Rendering (2-3 days)
11. Add satori, satori-html, @resvg/resvg-js to dependencies
12. Bundle Chinese + English fonts (TTF/OTF, ~2-5MB each)
13. Rewrite svg.py -> svg-card.ts (SVG template, 213 lines)
14. Implement PNG generation via Satori + resvg
15. Migrate GET /card/{id}, GET /share/{id}/card, GET /share/{id}/card.png

### Phase 4: Cutover (1 day)
16. Update extension manifest to point all API calls to punkgo.ai
17. Set up n78.xyz redirect to punkgo.ai (or keep as CNAME for China users)
18. Monitor for 48h
19. Decommission Alibaba Cloud instance

**Total estimated effort: 6-9 days**

---

## 6. What to Keep on n78.xyz

**Nothing.** After migration:
- n78.xyz becomes a 301 redirect to punkgo.ai
- Keep the domain registered (cheap) in case China latency matters later
- If China latency becomes critical, add Cloudflare in front of Vercel (separate concern)

Vercel has Asia-Pacific PoPs (Tokyo, Singapore, Hong Kong). For a Chrome Extension whose users are primarily developers (not latency-sensitive consumers), this is adequate.

---

## 7. Risks & Mitigations

### Risk 1: Vercel vendor lock-in
- **Severity:** Low
- **Mitigation:** SvelteKit has adapters for Node, Cloudflare, Netlify, Deno, Bun. The framework is portable; only the adapter changes. API routes use standard Web APIs (Request/Response).

### Risk 2: Cold start on PNG generation
- **Severity:** Medium (first request ~2-3s with font loading)
- **Mitigation:** Fluid Compute keeps instances warm. Font can be bundled in function. @vercel/og proves this pattern works at Vercel's own scale.

### Risk 3: SVG card rewrite
- **Severity:** Medium (213 lines of Python template strings -> TypeScript)
- **Mitigation:** This is the largest single task but straightforward string manipulation. Could also switch to Satori's HTML->SVG for the card itself (eliminating hand-rolled SVG entirely).

### Risk 4: ConfigCache in serverless
- **Severity:** Low
- **Mitigation:** Module-level cache works for warm instances. Config changes are rare (manual updates). Cache-Control headers handle CDN caching.

### Risk 5: Cost at scale
- **Severity:** Low (current scale is tiny)
- **Mitigation:** Free tier: 100K invocations/mo, 100GB bandwidth. Pro $20/mo if needed. Current Alibaba Cloud cost is probably comparable or higher.

---

## 8. Architecture Diagram

```
BEFORE (current):
  punkgo.ai (Vercel)           n78.xyz (Alibaba Cloud)
  ├── Static pages              ├── FastAPI
  └── 1 SSR route ──calls──>   ├── Python engine
      /roast/s/[id]             ├── cairosvg (broken fonts)
                                └── Supabase
  Chrome Extension ──calls──> n78.xyz/api/v1/roast/*

AFTER (unified):
  punkgo.ai (Vercel) — ONE codebase, ONE deployment
  ├── Pages (SSR/SSG)
  │   ├── / (landing)
  │   ├── /roast (dog wall, calls own API)
  │   ├── /roast/s/[id] (share reveal, SSR, direct Supabase)
  │   └── /blog, /whitepaper, /why
  │
  ├── API Routes (+server.ts)
  │   ├── /api/v1/roast/analyze     (shared engine.ts)
  │   ├── /api/v1/roast/share       (Supabase CRUD)
  │   ├── /api/v1/roast/share/[id]
  │   ├── /api/v1/roast/share/[id]/card      (SVG)
  │   ├── /api/v1/roast/share/[id]/card.png  (Satori + resvg)
  │   ├── /api/v1/roast/card/[id]            (SVG)
  │   ├── /api/v1/roast/card/[id].png        (Satori + resvg)
  │   ├── /api/v1/roast/visit
  │   ├── /api/v1/roast/config
  │   ├── /api/v1/roast/personalities
  │   ├── /api/v1/roast/analysis
  │   └── /api/v1/roast/wall
  │
  ├── Shared lib (src/lib/roast/)
  │   ├── engine.ts    (= extension engine, single source of truth)
  │   ├── radar.ts     (= extension radar)
  │   ├── types.ts
  │   ├── svg-card.ts  (rewritten from Python svg.py)
  │   └── png-card.ts  (Satori + resvg, replaces cairosvg)
  │
  └── @supabase/supabase-js (direct, no Python middle layer)

  Chrome Extension ──calls──> punkgo.ai/api/v1/roast/*
  n78.xyz ──301 redirect──> punkgo.ai
```

---

## 9. Advantages Summary

1. **ONE language** — TypeScript everywhere, no Python port to maintain
2. **ONE deployment** — Vercel auto-deploy from git push
3. **ONE engine** — engine.ts is the single source of truth
4. **ZERO server maintenance** — no Alibaba Cloud, no Docker, no systemd
5. **FIXES Chinese fonts** — Satori + resvg with bundled TTF, no system font dependency
6. **FIXES code divergence** — Python engine.py was already a port of engine.ts
7. **Shared types** — Extension and API use the same TypeScript types
8. **Global CDN** — Vercel edge network vs single Alibaba Cloud region
9. **Cost reduction** — Vercel free tier vs Alibaba Cloud monthly bill

---

## 10. What This Report Does NOT Recommend

- **Microservices:** Not needed. The entire API is 707 lines of Python. This is a monolith problem, and monolith is the right answer.
- **Edge Runtime for PNG:** Satori works on Edge but resvg-js needs Node.js runtime. Use Node.js serverless, not Edge.
- **Shared npm package:** Premature. Copy engine.ts into punkgo-site for now. Extract to package only if a third consumer appears.

---

## Sources

- [SvelteKit on Vercel (official docs)](https://vercel.com/docs/frameworks/full-stack/sveltekit)
- [SvelteKit adapter-vercel (Svelte docs)](https://svelte.dev/docs/kit/adapter-vercel)
- [Vercel Limits](https://vercel.com/docs/limits/overview)
- [Vercel Fluid Compute](https://vercel.com/docs/fluid-compute)
- [Scale to One: How Fluid Solves Cold Starts](https://vercel.com/blog/scale-to-one-how-fluid-solves-cold-starts)
- [Supabase + SvelteKit Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/sveltekit)
- [supabase-community/sveltekit-subscription-payments](https://github.com/supabase-community/sveltekit-subscription-payments)
- [Dynamic OG Image with SvelteKit and Satori](https://dev.to/theether0/dynamic-og-image-with-sveltekit-and-satori-4438)
- [@ethercorps/sveltekit-og](https://github.com/etherCorps/sveltekit-og)
- [SvelteKit OG Docs - Fonts](https://sveltekit-og.dev/docs/utilities/fonts)
- [Generating Dynamic Social Media Images with SvelteKit and resvg-js](https://www.leereamsnyder.com/dynamic-social-media-images-with-sveltekit-and-resvg-js)
- [SvelteKit vs Next.js in 2026](https://dev.to/paulthedev/sveltekit-vs-nextjs-in-2026-why-the-underdog-is-winning-a-developers-deep-dive-155b)
- [SvelteKit Explained: Full-Stack Framework Guide](https://strapi.io/blog/sveltekit-explained-full-stack-framework-guide)
- [Vercel Python Runtime](https://vercel.com/docs/functions/runtimes/python)
- [Vercel Cold Start Optimization](https://vercel.com/kb/guide/how-can-i-improve-serverless-function-lambda-cold-start-performance-on-vercel)

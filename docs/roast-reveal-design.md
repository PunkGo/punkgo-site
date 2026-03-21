# Roast Reveal Page — Design Document

Date: 2026-03-21

## Overview

Two new pages on punkgo-site:
1. `/roast/s/[id]/` — Share reveal page (card flip + CTA)
2. `/roast/` — Landing page upgrade (add dog wall + stats)

---

## Page 1: `/roast/s/[id]/` — Share Reveal

### Data Flow

```
URL: punkgo.ai/roast/s/abc12345/

1. Page mounts (client-side, no SSR)
2. Extract `id` from URL params
3. Fetch GET https://n78.xyz/api/v1/roast/share/{id}
   → Returns: personality_id, personality_name, personality_name_zh,
              mbti, card_color, accent_color, quip, catchphrase,
              catchphrase_zh, radar[], stats_events, stats_days,
              platform, locale, dog_image
4. Set page language from share data's `locale` field (not browser)
5. Show card flip animation → auto-flip after 2.4s sequence
6. After flip: show SVG card image + CTA + share buttons
```

### API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/roast/share/{id}` | Full share data as JSON |
| `GET /api/v1/roast/share/{id}/card` | Rendered SVG card (for og:image and display) |

### Layout

```
[Dark background #0A0A0A, full viewport, centered]

  [Phase 1: Card Flip — same as extension's CardFlip.svelte]
    Back face:
      - #111 background, green glow border (conic-gradient rotation)
      - Paw emoji (0.3 opacity) + "PUNKGO ROAST" + "?"
      - Glow pulse animation (1.2s), shake (3x wiggle), then "ready"
    Front face:
      - Card color background from share data
      - Personality name + MBTI + dog image + catchphrase
    Sequence: glow 1s → shake 1.4s → tap to flip (or auto-flip after 4s)
    Flip: rotateY(180deg), 0.7s ease-out
    Confetti on flip complete (canvas-confetti)

  [Phase 2: Result — after flip completes]
    SVG card as <img>
      src = "https://n78.xyz/api/v1/roast/share/{id}/card"
      400x520, border-radius 20px, box-shadow

    [CTA area, below card, 400px width]
      Headline: "你的 AI 是什么狗？" / "What kind of dog is your AI?"
      [安装插件 / Install Extension] → Chrome Web Store link
        Style: #39ff14 bg, dark text, full width, 14px 36px padding
      [保存图片 / Save Image] → download PNG
        Style: transparent bg, #39ff14 border, full width

    [Share buttons, horizontal row]
      [复制链接 / Copy Link] → clipboard API, "已复制!" feedback
      [分享到 X / Share on X] → intent URL with pre-filled text
        Text: "{name_zh} ({mbti}) — 你的 AI 是什么狗？ punkgo.ai/roast/s/{id}"

    [Footer line]
      "punkgo.ai/roast" · "已有 X 只狗被鉴定" (from wall count or omit if no API)
```

### Card Flip Component — Reuse Strategy

The extension's `CardFlip.svelte` is directly reusable with minor changes:

**Keep as-is:**
- All CSS animations (glowPulse, rotateBorder, wiggle, pulse)
- Card dimensions (400x520)
- Timing sequence (glow → shake → ready → flip → confetti)
- Visual structure (back face + front face)

**Changes needed:**
- Remove `chrome.storage` dependency (extension-only)
- Dog image URL: use Supabase storage URL directly (already in CardFlip)
- Accept share data shape instead of `MatchedPersonality` type
- Language from share data's `locale`, not `navigator.language`
- Add auto-flip timeout (4s) for users who don't know to tap

**Decision: Copy CardFlip.svelte into punkgo-site's `$lib/components/`, adapt the type interface. Don't try to share code between extension and site — different build systems, different deps.**

### Save PNG on Web

Same approach as extension's `Reveal.svelte`:

```
1. Fetch SVG from /api/v1/roast/share/{id}/card as text
2. Create Blob + Object URL (avoids CORS tainted canvas)
3. Load into Image element
4. Draw on 800x1040 canvas (2x for retina)
5. canvas.toDataURL('image/png') → trigger download
```

No additional dependencies needed. The API SVG embeds dog images as base64, so the SVG is self-contained.

### i18n

Language is determined by `share.locale` from the API response, not browser language.

Strings needed (minimal set):
```json
{
  "zh": {
    "reveal.tap": "点击翻牌",
    "reveal.loading": "加载中...",
    "reveal.not_found": "卡片不存在",
    "reveal.cta_headline": "你的 AI 是什么狗？",
    "reveal.install": "安装插件",
    "reveal.save": "保存图片",
    "reveal.save_failed": "保存失败",
    "reveal.copy_link": "复制链接",
    "reveal.copied": "已复制!",
    "reveal.share_x": "分享到 X"
  },
  "en": {
    "reveal.tap": "TAP TO REVEAL",
    "reveal.loading": "Loading...",
    "reveal.not_found": "Card not found",
    "reveal.cta_headline": "What kind of dog is your AI?",
    "reveal.install": "Install Extension",
    "reveal.save": "Save Image",
    "reveal.save_failed": "Save failed",
    "reveal.copy_link": "Copy Link",
    "reveal.copied": "Copied!",
    "reveal.share_x": "Share on X"
  }
}
```

Add these to the existing `$lib/i18n/zh.json` and `$lib/i18n/en.json`.

---

## Page 2: `/roast/` — Landing Page Upgrade

The current `/roast/` page already has: hero, example card, install section, how-it-works, 16-dog grid, footer. Upgrade plan:

### New Sections (insert between hero and install)

```
[Hero — existing, keep as-is]

[Stats bar — NEW]
  "已鉴定 2,847 只 AI 狗" / "2,847 AI dogs diagnosed"
  Client-side fetch: GET https://n78.xyz/api/v1/roast/wall → count = response.length
  Simple counter, #39ff14 accent, centered

[Dog wall — NEW, masonry-ish grid]
  Data: GET https://n78.xyz/api/v1/roast/wall → recent 50 shares
  Each card:
    - Dog image (from Supabase storage, keyed by personality_id)
    - Personality name (zh or en based on site locale)
    - MBTI badge (accent color)
    - Card background = card_color from share data
  Click → navigate to /roast/s/{id}/
  Layout: CSS grid, 4 columns desktop / 2 columns mobile
  Animation: fade-in on scroll (IntersectionObserver)

  If API fails or returns empty: hide section entirely (graceful degradation)

[Example Card — existing, keep]
[Install — existing, keep]
[How it works — existing, keep]
[16 Personalities grid — existing, keep]
[Footer — existing, keep]
```

### Wall Card Design

```
[160px x 200px card, rounded corners 12px]
  [Background: card_color from share data]
  [Dog image: 80x80, centered, from Supabase storage]
  [Name: personality_name_zh or personality_name, 14px bold]
  [MBTI: 11px, accent_color, letter-spacing 2px]
  [Hover: translateY(-4px) + shadow]
```

---

## Critical Technical Decision: og:image + SSG

### The Problem

punkgo-site uses `@sveltejs/adapter-static` (GitHub Pages). All pages are pre-rendered at build time.

Social crawlers (Twitter, Facebook, Slack, Discord) do NOT execute JavaScript. They read the raw HTML.

For `/roast/s/[id]/`, the `id` is dynamic and unknown at build time. Therefore:
- `<meta property="og:image">` cannot be set correctly in static HTML
- Social previews will show a generic fallback or nothing

### Options Evaluated

| Option | og:image works? | Effort | Infra change? |
|---|---|---|---|
| A. Client-side only (current setup) | NO | Low | No |
| B. Move punkgo-site to Vercel/Cloudflare Pages | YES (SSR) | Medium | Yes |
| C. API server (n78.xyz) serves reveal HTML | YES | Medium | No new infra |
| D. Cloudflare Worker as og:meta proxy | YES | Low | Minimal |

### Recommended: Option C — API serves the reveal HTML

**How it works:**

1. Share URL is `punkgo.ai/roast/s/{id}/`
2. punkgo.ai (GitHub Pages) serves a static shell page
3. BUT: the actual social preview URL uses `n78.xyz/roast/s/{id}`
4. The API server (n78.xyz, FastAPI) adds a new endpoint:

```python
@router.get("/roast/s/{share_id}", response_class=HTMLResponse)
async def share_page(share_id: str):
    """Serve minimal HTML with og:meta for social crawlers.
    Real users get redirected to punkgo.ai via JS."""
    share = fetch_share(share_id)
    if not share:
        return redirect to punkgo.ai/roast/

    name_display = share["personality_name_zh"] or share["personality_name"]
    og_image = f"https://n78.xyz/api/v1/roast/share/{share_id}/card"

    return f"""<!DOCTYPE html>
    <html>
    <head>
      <meta property="og:title" content="{name_display} ({share['mbti']}) — PunkGo Roast">
      <meta property="og:description" content="我的AI是一只{name_display}。你的呢？">
      <meta property="og:image" content="{og_image}">
      <meta property="og:url" content="https://punkgo.ai/roast/s/{share_id}/">
      <meta name="twitter:card" content="summary_large_image">
      <meta http-equiv="refresh" content="0; url=https://punkgo.ai/roast/s/{share_id}/">
    </head>
    <body>Redirecting...</body>
    </html>"""
```

5. When sharing to X/WeChat/Slack, use `n78.xyz/roast/s/{id}` as the share URL
6. Social crawlers get og:meta from n78.xyz HTML response
7. Real users get `<meta http-equiv="refresh">` redirect to punkgo.ai
8. punkgo.ai page loads the client-side flip animation

**Pros:**
- No infra change (n78.xyz already runs FastAPI)
- og:image works perfectly (server-rendered HTML)
- punkgo.ai stays on GitHub Pages (free, fast CDN)
- Clean separation: API handles social crawlers, site handles UX

**Cons:**
- Share URL domain is n78.xyz, not punkgo.ai (acceptable for Chinese users)
- Extra redirect hop for real users (~100ms, imperceptible)

**Alternative for punkgo.ai domain:** Set up a Cloudflare Worker on punkgo.ai that intercepts `/roast/s/[id]` requests, checks User-Agent for bots (Twitterbot, facebookexternalhit, Slackbot), and returns og:meta HTML for bots while serving the static page for real users. This is Option D and can be added later if domain consistency matters.

### SvelteKit Static Adapter Config

The `/roast/s/[id]/` route is dynamic. With `adapter-static`, we need:

1. Set `prerender = false` for this route (it can't be pre-rendered)
2. The static adapter's `fallback: '404.html'` config means unknown routes get 404
3. **Fix:** Change fallback to `'200.html'` or add SPA fallback behavior

Actually, the cleaner approach:

```
svelte.config.js:
  adapter: adapter({
    fallback: 'index.html',  // SPA fallback for dynamic routes
    // OR keep 404.html and add explicit fallback route
  })
```

Better: Keep `fallback: '404.html'` but add a catch-all route:
- `src/routes/roast/s/[id]/+page.ts` with `export const prerender = false; export const ssr = false;`
- This tells SvelteKit to handle it as a client-side route

Wait — `adapter-static` with `strict: true` will fail if any route has `prerender = false`. We need to either:
1. Set `strict: false` in adapter config, OR
2. Use `fallback: '200.html'` so GitHub Pages serves the SPA shell for unknown paths

**Decision: Set `strict: false` and `fallback: '200.html'`** in the adapter config. This allows the `/roast/s/[id]/` route to work as a client-side SPA route without breaking the static build.

The `+page.ts` for the share route:
```ts
export const prerender = false;
export const ssr = false;
```

---

## File Structure

```
src/routes/roast/
  +page.svelte              # existing landing page (upgrade with wall)
  s/[id]/
    +page.svelte            # share reveal page
    +page.ts                # prerender=false, ssr=false

src/lib/components/
  CardFlipWeb.svelte        # adapted from extension's CardFlip.svelte
  DogWall.svelte            # wall grid component
  ShareButtons.svelte       # copy link + share to X

src/lib/api.ts              # API fetch helpers (n78.xyz base URL)
src/lib/types/share.ts      # ShareData type matching API response
```

---

## Open Questions

1. **Share URL domain**: `n78.xyz/roast/s/{id}` (og:meta works) vs `punkgo.ai/roast/s/{id}` (cleaner but no og:meta without Cloudflare Worker). Start with n78.xyz, add Worker later.

2. **Auto-flip vs tap-to-flip**: Extension requires tap. Web should auto-flip after 4s timeout (mobile users might not know to tap). Keep tap as shortcut.

3. **Confetti dependency**: `canvas-confetti` is 6KB gzipped. Worth adding to punkgo-site? Yes — it's the "wow" moment.

4. **Wall refresh**: Static page, client-side fetch. Cache wall data for 5 minutes in memory? Or just fetch on every page load? Start with fetch-on-load, add cache if API latency is an issue.

5. **Chrome Web Store link**: Extension not yet published. Use placeholder `#install` anchor that scrolls to install section. Update when published.

6. **og:image format**: The API returns SVG. Twitter/X supports SVG in og:image? **No — Twitter requires rasterized images (PNG/JPG).** Need to add a PNG render endpoint to the API, or convert SVG to PNG server-side. Options:
   - Add `/share/{id}/card.png` endpoint using `cairosvg` or `Pillow` to rasterize
   - Use a headless browser (heavy, avoid)
   - **Decision: Add `cairosvg` to punkgo-roast-api, render PNG on demand, cache in Supabase storage.** This is a separate task for the API repo.

7. **NES.css conflict**: punkgo-site uses NES.css globally. The roast reveal page has its own aesthetic (dark, modern, Space Grotesk). Need to scope or disable NES.css on `/roast/s/` routes. The existing `/roast/` page already uses Space Grotesk, so this pattern exists — just ensure the layout doesn't inject NES styles that clash.

---

## Implementation Order

1. **API: og:meta HTML endpoint** — `GET n78.xyz/roast/s/{id}` returns HTML with og:meta + redirect (punkgo-roast-api)
2. **API: PNG card endpoint** — `GET /api/v1/roast/share/{id}/card.png` for Twitter og:image (punkgo-roast-api)
3. **Site: SvelteKit config** — `strict: false`, fallback, dynamic route setup
4. **Site: CardFlipWeb component** — port from extension, adapt types
5. **Site: `/roast/s/[id]/` page** — fetch + flip + result + CTA + share
6. **Site: i18n strings** — add reveal.* keys to zh.json and en.json
7. **Site: `/roast/` wall upgrade** — fetch wall API, render grid
8. **Test: end-to-end** — create a share via extension → open share URL → verify flip + og:image

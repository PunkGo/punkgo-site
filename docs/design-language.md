---
title: PunkGo Roast Design Language Specification
author: pg-design
date: 2026-03-25
version: "1.0"
status: final
---

# PunkGo Roast Design Language Specification

## 0. Design Direction Decision

**Chosen: Direction B — Dual-Face (Dark Site + Bright Cards), evolved with Wes Anderson sweetness.**

Rationale:

- Direction A (pure Neon Cyberpunk) conflicts with the IP pivot toward "sweet humor + shareability." Dark neon share cards underperform in bright social feeds.
- Direction C (full softening) abandons PunkGo's punk/hacker identity entirely — brand suicide.
- Direction B preserves the dark, edgy in-site experience (roast genre expectation) while allowing share cards to maximize virality in bright social feeds. The bridge between dark site and bright cards is the 16 dog avatars + consistent typography + brand mark.

The IP direction mandates: **sweet humor > cold cool, shareability > polish, Wes Anderson = cute but every frame is a wallpaper.** Direction B is the only path that serves both the roast atmosphere AND the share-first IP strategy.

**One-line design philosophy:**

> **"Warm poison in a dark glass"** — the site feels like a moody cocktail bar; the share card is the pretty drink you photograph before sipping.

---

## 1. Color System

### 1.1 Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand` | `#39ff14` | Primary brand color. CTA buttons, active states, key highlights. |
| `--color-brand-soft` | `#2ad10f` | Muted brand green for less aggressive contexts (hover bg, subtle accents). |
| `--color-accent-pink` | `#ff5ca1` | Secondary accent. Roast-specific highlights, nav active, playful emphasis. |
| `--color-accent-blue` | `#00d4ff` | Tertiary accent. Links, informational highlights, subtitle text. |
| `--color-accent-yellow` | `#ffe066` | Warmth accent. Punchlines, quip highlights, star ratings. |
| `--color-accent-purple` | `#b388ff` | Soft purple for personality category grouping, badge backgrounds. |

### 1.2 Dark Theme Color Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-base` | `#0c0c0f` | Page background (near-black with slight blue undertone). |
| `--color-bg-elevated` | `#141419` | Elevated surface (sections, content areas). |
| `--color-bg-card` | `#1c1c24` | Card backgrounds, modals, popovers. |
| `--color-bg-input` | `#22222c` | Input fields, quiz option default state. |
| `--color-border-subtle` | `#2a2a36` | Default borders, dividers. |
| `--color-border-medium` | `#3a3a48` | Hover borders, active dividers. |
| `--color-text-primary` | `#f0f0f2` | Headings, primary body text. |
| `--color-text-secondary` | `#a0a0b0` | Secondary text, descriptions, labels. |
| `--color-text-tertiary` | `#686878` | Placeholder text, disabled text, captions. |
| `--color-text-inverse` | `#0c0c0f` | Text on bright backgrounds (brand buttons, share cards). |

### 1.3 Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#34d399` | Success states, positive feedback. |
| `--color-warning` | `#fbbf24` | Warning states, attention required. |
| `--color-error` | `#f87171` | Error states, destructive actions. |
| `--color-info` | `#60a5fa` | Informational states, tips. |

### 1.4 Brand Green Usage Rules

`--color-brand` (`#39ff14`) is the signature neon green. Rules:

1. **DO** use for primary CTA buttons (background), active navigation indicators, and key interactive affordances.
2. **DO** use with glow effect (`box-shadow: 0 0 20px rgba(57, 255, 20, 0.3)`) for reveal/celebration moments only.
3. **DO NOT** use for body text — contrast ratio on dark bg is only 8.2:1 at small sizes, and the neon hue causes eye fatigue in long-form reading.
4. **DO NOT** use glow on more than one element per viewport simultaneously.
5. **DO NOT** apply to large background areas (> 200px width) — it overwhelms. Use `--color-brand-soft` for larger fills if needed.
6. For text-on-dark contexts where green is desired, use `--color-brand` at `font-size >= 16px` and `font-weight >= 600` only.

### 1.5 Share Card Color Mode

Share cards use a **bright/pastel palette** per dog personality. Each dog's `card_color` and `accent_color` (already defined in the codebase) are the card background and accent respectively. Additional rules:

| Token | Value | Usage |
|-------|-------|-------|
| `--card-text-dark` | `#1a1a1a` | Card primary text (name, quip). |
| `--card-text-medium` | `#5a5a5a` | Card secondary text (labels, stats). |
| `--card-text-light` | `#8a8a8a` | Card tertiary text (brand footer, URL). |
| `--card-border` | `rgba(0, 0, 0, 0.06)` | Subtle card border for definition on white backgrounds. |

The 16 dog card colors remain as defined. They are intentionally bright/pastel to maximize share performance in social feeds.

### 1.6 Confetti Colors

Confetti must use the following palette (matching brand + dog personality warmth):

```
['#39ff14', '#ff5ca1', '#00d4ff', '#ffe066', '#b388ff']
```

Reference these via the design tokens, not hardcoded hex in JS.

---

## 2. Typography

### 2.1 Font Families

**Two font families only. No exceptions.**

| Token | Stack | Usage |
|-------|-------|-------|
| `--font-display` | `'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif` | Headings, buttons, labels, UI text. |
| `--font-mono` | `'JetBrains Mono', 'Consolas', 'Noto Sans SC', monospace` | Code snippets, MBTI codes, technical labels, CLI install commands. |

**Removed:**
- `Press Start 2P` — pixel font retired from Roast pages (may remain on homepage only until homepage redesign).
- `VT323` — unused, remove.
- `DM Sans` — replaced by Space Grotesk.
- `Bricolage Grotesque` — replaced by Space Grotesk.
- `ChillBitmap` — pixel font, homepage only scope.

**Loading:** Space Grotesk (weights 400, 500, 600, 700) and JetBrains Mono (weights 400, 700) via Google Fonts `<link>` in the root layout `<svelte:head>`. One `<link>` tag, not per-page. Noto Sans SC (weights 400, 700) for CJK fallback.

### 2.2 Type Scale

Base unit: `16px` (1rem). Scale ratio: ~1.25 (Major Third).

| Token | Size | Weight | Line Height | Font | Usage |
|-------|------|--------|-------------|------|-------|
| `--text-h1` | `48px` (3rem) | 700 | 1.1 | display | Page hero titles |
| `--text-h2` | `36px` (2.25rem) | 700 | 1.15 | display | Section titles |
| `--text-h3` | `28px` (1.75rem) | 600 | 1.2 | display | Subsection titles, quip text |
| `--text-h4` | `22px` (1.375rem) | 600 | 1.25 | display | Card titles, CTA headings |
| `--text-h5` | `18px` (1.125rem) | 600 | 1.3 | display | Small section headings |
| `--text-h6` | `16px` (1rem) | 600 | 1.35 | display | Label headings |
| `--text-body` | `16px` (1rem) | 400 | 1.6 | display | Body text, descriptions |
| `--text-body-sm` | `14px` (0.875rem) | 400 | 1.5 | display | Secondary body text |
| `--text-caption` | `13px` (0.8125rem) | 400 | 1.4 | display | Captions, trait tags, meta info |
| `--text-label` | `12px` (0.75rem) | 600 | 1.3 | display | Badges, small labels, overlines |
| `--text-code` | `14px` (0.875rem) | 400 | 1.5 | mono | Code blocks, MBTI codes |

### 2.3 Mobile Overrides (< 640px)

| Token | Mobile Size |
|-------|-------------|
| `--text-h1` | `32px` (2rem) |
| `--text-h2` | `26px` (1.625rem) |
| `--text-h3` | `22px` (1.375rem) |
| `--text-h4` | `18px` (1.125rem) |

---

## 3. Spacing System

### 3.1 Base Unit

Base: **4px**. All spacing values are multiples of 4.

### 3.2 Spacing Tokens

| Token | Value | Px | Usage |
|-------|-------|-----|-------|
| `--space-xs` | `0.25rem` | 4px | Tight gaps (icon-to-label, inline elements). |
| `--space-sm` | `0.5rem` | 8px | Small gaps (between tags, compact padding). |
| `--space-md` | `1rem` | 16px | Default gap (component internal padding, list item spacing). |
| `--space-lg` | `1.5rem` | 24px | Comfortable gap (between related components, card padding). |
| `--space-xl` | `2rem` | 32px | Section internal padding, card groups. |
| `--space-2xl` | `3rem` | 48px | Section separation, major content blocks. |
| `--space-3xl` | `4rem` | 64px | Page section gaps, hero padding. |
| `--space-4xl` | `6rem` | 96px | Major page sections (hero top/bottom). |

### 3.3 Component Padding Guidelines

| Context | Padding | Token |
|---------|---------|-------|
| Button (sm) | `8px 16px` | `--space-sm --space-md` |
| Button (md) | `12px 24px` | `0.75rem --space-lg` |
| Button (lg) | `16px 32px` | `--space-md --space-xl` |
| Card | `24px` | `--space-lg` |
| Section | `48px 24px` | `--space-2xl --space-lg` |
| Page container | `64px 24px` | `--space-3xl --space-lg` |
| Tag/Badge | `4px 12px` | `--space-xs 0.75rem` |

### 3.4 Component Gap Guidelines

| Context | Gap | Token |
|---------|-----|-------|
| Between tags/badges | `8px` | `--space-sm` |
| Between form fields | `16px` | `--space-md` |
| Between cards in grid | `20px` | `1.25rem` |
| Between content sections | `48px` | `--space-2xl` |

---

## 4. Border Radius System

**Four radius tokens. No other values permitted.**

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Badges, MBTI tags, small labels, input fields. |
| `--radius-md` | `12px` | Buttons, small cards, CTA sections, install command boxes. |
| `--radius-lg` | `20px` | Cards (quiz cards, reveal cards, dog cards, SVG cards), modals. |
| `--radius-full` | `9999px` | Pills (trait tags, fully rounded buttons), avatars. |

**Migration from current state:**
- `0px` (NES pixel) → remains on homepage only, Roast pages must not use.
- `8px` → upgrade to `--radius-md` (12px).
- `16px` → upgrade to `--radius-lg` (20px).
- `20px` → map to `--radius-lg`.
- `50%` → map to `--radius-full`.

---

## 5. Component Specifications

### 5.1 Buttons

All buttons use `font-family: var(--font-display)`, `font-weight: 600`, `cursor: pointer`, `transition: background 150ms ease, color 150ms ease, transform 150ms ease, box-shadow 150ms ease`.

#### Primary Button

```css
.btn-primary {
  background: var(--color-brand);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 700;
  padding: 12px 24px;
}
.btn-primary:hover {
  background: var(--color-brand-soft);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(57, 255, 20, 0.25);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}
```

#### Secondary Button

```css
.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
}
.btn-secondary:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
  background: rgba(57, 255, 20, 0.05);
}
```

#### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
}
.btn-ghost:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.05);
}
```

#### Size Variants

| Size | Font Size | Padding | Min Height |
|------|-----------|---------|------------|
| sm | `14px` | `8px 16px` | `36px` |
| md (default) | `16px` | `12px 24px` | `44px` |
| lg | `18px` | `16px 32px` | `52px` |

### 5.2 Cards

#### Quiz Option Card (Dog Card)

```css
.dog-card {
  background: var(--card-bg); /* per-dog card_color */
  border-radius: var(--radius-lg);
  padding: var(--space-lg); /* 24px */
  border: 2px solid transparent;
  transition: all 200ms ease;
}
.dog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.dog-card:active {
  transform: translateY(-2px);
}
```

#### Reveal Card (Flip Card Back)

```css
.card-back {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  border: 2px solid rgba(57, 255, 20, 0.3);
  box-shadow: 0 0 20px rgba(57, 255, 20, 0.15);
}
```

#### Share Card (SVG / Image Export)

- Background: per-dog `card_color` (bright pastel).
- Border radius: `20px` (`rx="20"` in SVG).
- Text: `--card-text-dark` for name/quip, `--card-text-medium` for labels, `--card-text-light` for footer.
- Font: `Space Grotesk` for Latin, `Noto Sans SC` for CJK (self-hosted in SVG, not CDN).
- Size: `400x520px` (default), `1080x1350` (IG feed), `1080x1920` (IG story).

#### CTA Section Card

```css
.cta-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-xl); /* 32px */
}
```

### 5.3 Tags & Badges

#### Trait Tag (Pill)

```css
.trait-tag {
  background: var(--color-bg-input);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  padding: 4px 14px;
  font-size: var(--text-caption); /* 13px */
  color: var(--color-text-secondary);
  font-weight: 500;
}
```

#### MBTI Badge

```css
.mbti-badge {
  background: var(--color-bg-input);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-sm);
  padding: 4px 10px;
  font-family: var(--font-mono);
  font-size: var(--text-label); /* 12px */
  font-weight: 700;
  color: var(--color-brand);
  letter-spacing: 1px;
}
```

### 5.4 Input / Quiz Option States

Quiz options (dog cards) have four states:

| State | Border | Background | Shadow |
|-------|--------|------------|--------|
| Default | `2px solid transparent` | `var(--card-bg)` | none |
| Hover | `2px solid rgba(57, 255, 20, 0.3)` | `var(--card-bg)` | `0 8px 24px rgba(0,0,0,0.3)` |
| Selected | `2px solid var(--color-brand)` | `var(--card-bg)` | `0 0 16px rgba(57, 255, 20, 0.2)` |
| Disabled | `2px solid transparent` | `var(--card-bg)` at `opacity: 0.5` | none |

### 5.5 Accessibility Requirements

- Quiz option cards: `role="radio"`, `aria-checked="true|false"`, `tabindex="0"`, keyboard navigation via arrow keys.
- All buttons: visible focus ring (`outline: 2px solid var(--color-brand); outline-offset: 2px`) on `:focus-visible`.
- Color contrast: text on dark bg minimum 4.5:1 (WCAG AA). `--color-text-primary` on `--color-bg-base` = 17.4:1 ✅.
- Touch targets: minimum 44x44px on all interactive elements (already in responsive spec).
- Confetti: `prefers-reduced-motion: reduce` → skip confetti animation entirely.

### 5.6 CTA Area

```css
.cta-section {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-xl); /* 32px */
  text-align: center;
}
.cta-section h2 {
  font-size: var(--text-h4); /* 22px */
  font-weight: 700;
  margin-bottom: var(--space-md); /* 16px */
}
.cta-section p {
  font-size: var(--text-caption); /* 13px */
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg); /* 24px */
}
```

---

## 6. Motion & Animation

### 6.1 Transition Defaults

| Context | Duration | Easing |
|---------|----------|--------|
| Hover states (color, border) | `150ms` | `ease` |
| Transform (translate, scale) | `200ms` | `ease-out` |
| Opacity fade | `300ms` | `ease-in-out` |
| Page/section enter | `400ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |

### 6.2 Card Flip Animation

```css
/* Flip container */
.card-flip {
  perspective: 1200px;
}
.card-flip-inner {
  transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}
.card-flip-inner.flipped {
  transform: rotateY(180deg);
}
```

Sequence: glow pulse (200ms) -> flip (300ms) -> confetti burst (100ms after flip start). Total ceremony < 500ms.

### 6.3 Confetti

- Colors: `['#39ff14', '#ff5ca1', '#00d4ff', '#ffe066', '#b388ff']` (must match brand palette tokens).
- Particle count: 80-120.
- Spread: 70 degrees.
- Duration: 3 seconds.
- Gravity: 1.2.

### 6.4 Page Transitions

Content enters with staggered fade-up:

```css
.fade-up-enter {
  opacity: 0;
  transform: translateY(16px);
}
.fade-up-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease-out, transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

Stagger delay between elements: `80ms`.

### 6.5 Hover / Active States

- Buttons: `translateY(-1px)` on hover, `translateY(0)` on active.
- Cards: `translateY(-4px)` on hover, `translateY(-2px)` on active.
- Links: color transition `150ms`, underline on hover.
- No `scale` transforms on interactive elements (causes layout shift on mobile).

---

## 7. Responsive Breakpoints

Mobile-first approach. Base styles target mobile; add complexity upward.

| Token | Value | Target |
|-------|-------|--------|
| `--bp-sm` | `640px` | Large phones (landscape), small tablets. |
| `--bp-md` | `768px` | Tablets (portrait). |
| `--bp-lg` | `1024px` | Tablets (landscape), small laptops. |
| `--bp-xl` | `1280px` | Desktop. |

### 7.1 Breakpoint Usage

```css
/* Mobile first — base styles are mobile */
.dog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px) {
  .dog-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}
@media (min-width: 1024px) {
  .dog-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}
```

### 7.2 Quiz Page Interaction

**Quiz flow:** one question per screen, tap to select, auto-advance to next question after 300ms delay. Progress bar at top. No swipe (error-prone on mobile), no scroll quiz (breaks analytics per-question).

**Layout per question:**
- Question text: centered, `--text-h3` (28px desktop / 22px mobile)
- 4 option cards: 2x2 grid on mobile, 1x4 horizontal row on desktop
- Option card size: min `140x100px` on mobile, `200x140px` on desktop
- Progress: thin bar at top, `--color-brand` fill, 5 segments

**Result loading:** skeleton pulse animation (300ms pulse cycle), then confetti + reveal.

### 7.3 Dog Grid & Card Flip

- Dog grid: 2 columns on mobile, 3 on tablet, 4 on desktop.
- Card flip area: `320x416px` on mobile (< 480px), `400x520px` on desktop.
- Result actions (share buttons): stack vertically on mobile, horizontal on desktop.
- Touch targets: minimum `44px` height on all interactive elements.
- Page container: `padding: 0 16px` on mobile, `0 24px` on tablet+.

### 7.3 Max Width

```css
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-lg); /* 64px 24px */
}
```

Mobile override: `padding: var(--space-2xl) var(--space-md);` (48px 16px).

---

## 8. Brand Elements

### 8.1 16 Dog Avatars

The 16 breed avatars are the primary IP asset. Usage rules:

1. **Always show at 1:1 aspect ratio** — never stretch or crop the dog images.
2. **Minimum display size:** `48px` (badges/inline), recommended `80px`+ for cards.
3. **On dark backgrounds:** display directly, no additional border needed.
4. **On bright backgrounds (share cards):** may add `border-radius: 50%` with a subtle shadow (`0 2px 8px rgba(0,0,0,0.1)`).
5. **Never apply color filters or overlays** to the dog avatars — they are pre-designed with their own color identity.
6. **Order:** display in the canonical order defined in the personality data, not alphabetically.

File paths: `/static/roast/dog-{breed-slug}.png`

### 8.2 Logo

- Primary usage: text wordmark "PunkGo" in `var(--font-display)` at `font-weight: 700`.
- On dark backgrounds: `var(--color-text-primary)` (#f0f0f2).
- On bright backgrounds: `var(--color-text-inverse)` (#0c0c0f).
- The ASCII art logo is homepage-only scope; do not use in Roast pages.
- Minimum clear space around logo: `--space-md` (16px) on all sides.
- Favicon and app icon remain as-is (`/static/favicon.ico`, `/static/icon-192.png`).

### 8.3 Tagline: "What's your AI vibe?"

- Font: `var(--font-display)`, `font-weight: 500`.
- Size: `var(--text-h5)` (18px) in hero contexts, `var(--text-body-sm)` (14px) in card footers.
- Color: `var(--color-text-secondary)` on dark backgrounds, `var(--card-text-medium)` on share cards.
- Always sentence case: "What's your AI vibe?" — never all-caps, never title case.
- Position: below the hero title on the Roast landing page, and in the footer area of share cards.

---

## 9. Share Card Specifications

Share cards are the primary viral asset. They deserve special attention.

### 9.1 Formats

| Format | Size | Ratio | Use Case |
|--------|------|-------|----------|
| Default card | `400x520` | ~3:4 | In-page reveal, OG preview base |
| IG Feed / X | `1080x1350` | 4:5 | Instagram feed, Twitter/X post |
| IG Story | `1080x1920` | 9:16 | Instagram story, TikTok share (safe area: top/bottom 250px) |
| OG Image | `1200x630` | ~1.91:1 | Link preview (Twitter summary_large_image, Open Graph) |

### 9.2 Card Layout (Default 400x520)

```
┌────────────────────────────┐
│  [Dog Avatar - 80x80, centered]  │
│                                   │
│  Dog Breed Name (28px, 800w)     │
│  MBTI Badge (12px, mono)         │
│                                   │
│  "Quip text here, the roast     │
│   punchline" (16px, 600w)        │
│                                   │
│  [Radar Chart - 180x180]         │
│                                   │
│  ──────────────────────          │
│  punkgo.ai  •  What's your AI vibe?│
│  [Stats: accuracy / fun / roast]  │
└────────────────────────────┘
```

### 9.3 Card Color Rules

- Background: per-dog `card_color` (pastel).
- Accent elements (radar chart fill, MBTI badge border): per-dog `accent_color`.
- Text: always `--card-text-dark` (#1a1a1a) for primary, never white text on pastel cards.
- Brand footer: `--card-text-light` (#8a8a8a).

### 9.4 Card Font Rules

- Self-host `Space Grotesk` and `Noto Sans SC` in SVG via base64 `@font-face` — **never use external CDN `@import`** (fails in China, fails offline).
- Fallback chain in SVG: `'Space Grotesk', 'Noto Sans SC', sans-serif`.

---

## 10. Prohibited Patterns

The following are **strictly forbidden** in all Roast-related code:

### Colors
- **NO hardcoded hex values** in component `<style>` blocks. All colors must reference CSS custom properties (tokens).
- **NO new gray values** beyond the defined scale (#0c0c0f / #141419 / #1c1c24 / #22222c / #2a2a36 / #3a3a48 / #686878 / #a0a0b0 / #f0f0f2).
- **NO `rgba()` with arbitrary values** for backgrounds — use the defined tokens with opacity utilities if needed.

### Typography
- **NO introducing new font families.** Only `--font-display` and `--font-mono` are permitted in Roast pages.
- **NO Google Fonts `<link>` in individual page components.** Font loading happens once in the root layout.
- **NO `font-size` values outside the type scale.** If a size is needed that doesn't exist, propose adding it to this spec first.
- **NO pixel font (`Press Start 2P`, `ChillBitmap`, `VT323`)** in any Roast page.

### Spacing & Layout
- **NO hardcoded spacing values** in component styles. Use `--space-*` tokens.
- **NO `!important`** except when overriding third-party library styles (and those must be documented with a comment explaining why).
- **NO new border-radius values.** Only `--radius-sm`, `--radius-md`, `--radius-lg`, and `--radius-full`.

### Components
- **NO NES.css components** (`.nes-btn`, `.nes-container`, etc.) in Roast pages.
- **NO scanline or noise overlays** on Roast pages (these are homepage-scoped).
- **NO z-index values above 100** without explicit approval and documentation.

### Brand
- **NO modifying dog avatar images** (no filters, no crops, no color shifts).
- **NO alternative logo treatments** — use the text wordmark as specified.
- **NO "PunkGo" in all-caps** outside of the ASCII art context.

### Performance
- **NO external font CDN calls in SVG cards** — self-host via base64.
- **NO animations with `margin` or `padding`** — use `transform` and `opacity` only.
- **NO `transition: all`** — always specify exact properties (`transition: transform 200ms ease, opacity 200ms ease`).

---

## Appendix A: CSS Custom Properties (Complete Reference)

```css
:root {
  /* Colors — Core */
  --color-brand: #39ff14;
  --color-brand-soft: #2ad10f;
  --color-accent-pink: #ff5ca1;
  --color-accent-blue: #00d4ff;
  --color-accent-yellow: #ffe066;
  --color-accent-purple: #b388ff;

  /* Colors — Dark Theme Scale */
  --color-bg-base: #0c0c0f;
  --color-bg-elevated: #141419;
  --color-bg-card: #1c1c24;
  --color-bg-input: #22222c;
  --color-border-subtle: #2a2a36;
  --color-border-medium: #3a3a48;
  --color-text-primary: #f0f0f2;
  --color-text-secondary: #a0a0b0;
  --color-text-tertiary: #686878;
  --color-text-inverse: #0c0c0f;

  /* Colors — Semantic */
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-error: #f87171;
  --color-info: #60a5fa;

  /* Colors — Share Card */
  --card-text-dark: #1a1a1a;
  --card-text-medium: #5a5a5a;
  --card-text-light: #8a8a8a;
  --card-border: rgba(0, 0, 0, 0.06);

  /* Typography */
  --font-display: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', 'Noto Sans SC', monospace;

  /* Type Scale */
  --text-h1: 48px;
  --text-h2: 36px;
  --text-h3: 28px;
  --text-h4: 22px;
  --text-h5: 18px;
  --text-h6: 16px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-caption: 13px;
  --text-label: 12px;
  --text-code: 14px;

  /* Spacing */
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --space-xl: 2rem;     /* 32px */
  --space-2xl: 3rem;    /* 48px */
  --space-3xl: 4rem;    /* 64px */
  --space-4xl: 6rem;    /* 96px */

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;

  /* Breakpoints (reference only — use in @media queries) */
  /* --bp-sm: 640px; */
  /* --bp-md: 768px; */
  /* --bp-lg: 1024px; */
  /* --bp-xl: 1280px; */
}

/* Mobile overrides */
@media (max-width: 639px) {
  :root {
    --text-h1: 32px;
    --text-h2: 26px;
    --text-h3: 22px;
    --text-h4: 18px;
  }
}
```

---

## Appendix B: Migration Checklist

When implementing this spec, address the following audit findings in order:

1. **P0:** Unify Roast page fonts — remove DM Sans reference from reveal page, ensure Space Grotesk `<link>` is in root layout.
2. **P0:** Replace all hardcoded color values in `roast/+page.svelte` and `roast/s/[id]/+page.svelte` with CSS custom properties.
3. **P1:** Replace all hardcoded border-radius values with `--radius-*` tokens.
4. **P1:** Replace all hardcoded spacing values with `--space-*` tokens.
5. **P1:** Replace gray scale (`#555`, `#666`, `#888`, `#8b8b8b`, `#aaa`, `#ccc`) with `--color-text-*` tokens.
6. **P1:** Move confetti color array to reference design tokens.
7. **P2:** Remove unused CSS variables (`--font-terminal`, `--pixel-border`, `--text-secondary` alias).
8. **P2:** Self-host fonts in SVG cards via base64 instead of Google Fonts CDN `@import`.
9. **P2:** Consolidate duplicate `.divider` styles into a shared component or global class.

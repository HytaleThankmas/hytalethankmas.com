# Hytale Thankmas — Brand Assets

Designer source of truth. Assets are the original SVG exports (v1).

## Palette

| Role | Color | Hex |
| --- | --- | --- |
| Flat gold | Primary accent | `#ffc864` |
| Pine green | Dark base / backgrounds | `#1e3228` |

Site tokens live in `src/styles/app.css` (`@theme`):
`pine-*` (darks), `gold-*` (accents), `cream-*` (text neutrals), `sage-*` (secondary green accent, a light tint of pine).

## Type

- **Logotype:** [Salsa](https://fonts.google.com/specimen/Salsa) (single weight) — used for the wordmark, hero, and footer.
- Site body/display: Sora, Fraunces, IBM Plex Mono (see `public/fonts/`).

## Files

| File | Use |
| --- | --- |
| `Hytale Thankmas Full logo v1.svg` | Circular badge: tree + curved logotype + year. The "main" logo. |
| `HT Short Tree Icon.svg` / `HT Tall Tree Icon.svg` | Tree mark (white, one-color). |
| `HT Spark Icon.svg` | Four-point sparkle (white, one-color). |
| `Hytale Thankmas Logotype Horizontal v1.svg` | Horizontal lockup (white). |
| `Hytale Thankmas Logotype v1.svg` | Stacked lockup (white). |
| `Hytale Thankmas Logotype Curved v1.svg` | Curved lockup (white). |
| `Thankmas Logotype*.svg` | "Thankmas" word-only variants (white). |

One-color exports are white-fill for use on dark backgrounds.

## Web-ready exports

`public/` holds rasterized derivatives (regenerate with `npx tsx scripts/gen-assets.ts`):

- `public/logo.svg` — full badge with the "20 26" text baked to paths (no font dependency; inkscape export).
- `public/logo.png` (1024), `public/og.png` (1200×630 social card), favicon set.

> Note: `Hytale Thankmas Full logo v1.svg` contains a live `<text>` element in Salsa; if you edit it in a vector tool, re-bake text to paths before shipping (the local copy of Salsa is installed at `~/.local/share/fonts/Salsa-Regular.ttf`).

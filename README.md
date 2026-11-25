# hytalethankmas.com

Landing site for [Hytale Thankmas](THANKMAS.md) — the Hytale community's yearly charity livestream, part of Jacksepticeye's Thankmas.

Built with [TanStack Start](https://tanstack.com/start) (Vite), React, and Tailwind CSS, built with Bun, and deployed as a fully static site to GitHub Pages.

## Development

```sh
bun install
bun run dev
```

Dev server runs at http://localhost:3000.

## Build

```sh
bun run build
```

Runs `vite build` (which prerenders all routes to static HTML in `dist/client/`), then `tsc --noEmit`, then normalizes `404/index.html` to `404.html` for GitHub Pages soft 404s.

To preview the static output: `bun run preview`.

## Deployment

Deploys automatically on every push to `main` via [GitHub Actions](.github/workflows/deploy.yml): the app is prerendered to static HTML and published with `actions/deploy-pages`. Pages source must be set to **GitHub Actions** in repo settings (already configured).

GitHub Pages serves project sites from a subpath (`/hytalethankmas.com/`), so CI builds with `GITHUB_PAGES=true`, which sets Vite's `base` accordingly. Public assets referenced as literal strings (head links, logos, manifest) go through the [`asset()` helper](src/utils/assets.ts) to stay base-path correct in both local and Pages builds.

### Switching to a custom domain

When the domain goes live:

1. Flip `base` in `vite.config.ts` to `'/'` for all builds (drop the `GITHUB_PAGES` gate).
2. Drop a `CNAME` file into `public/` and set the custom domain in repo → Settings → Pages.
3. Update the `og:image` URL in `src/routes/__root.tsx`.

## Project notes

- Event data (dates, goal, history, program) lives in `src/utils/thankmas.ts` — see [THANKMAS.md](THANKMAS.md) for what still needs filling in.
- Brand assets and palette reference: [brand/](brand/).
- Favicon/OG images are generated from the brand SVGs by `scripts/gen-assets.ts`.

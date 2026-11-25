import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project sites are served from a subpath:
//   https://hytalethankmas.github.io/hytalethankmas.com/
// Set GITHUB_PAGES=true in CI to opt into it. Once a custom domain is live,
// flip this to '/' for all builds (and drop the CNAME file into public/).
const isGithubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGithubPages ? '/hytalethankmas.com/' : '/',
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      // Fully static output so the site can be hosted on GitHub Pages.
      // '/404' is emitted as 404.html, which GH Pages serves for unknown URLs.
      prerender: {
        enabled: true,
        crawlLinks: true,
        // `pages` is supported by the plugin at runtime but missing from the
        // published types, so pass it via spread (exempt from excess-property
        // checks). Per-page prerender options are stripped at runtime, hence
        // scripts/normalize-404.mjs.
        ...({ pages: [{ path: '/404' }] }),
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
})

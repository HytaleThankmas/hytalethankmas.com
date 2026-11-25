import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '~/components/NotFound'
import { seo } from '~/utils/seo'

// Rendered to /404.html at build time so GitHub Pages serves it for unknown
// URLs (soft 404).
export const Route = createFileRoute('/404')({
  head: () => ({
    meta: seo({
      title: 'Page Not Found – Hytale Thankmas',
    }),
  }),
  component: NotFound,
})

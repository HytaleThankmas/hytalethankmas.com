import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { getCurrentPhase, type EventPhase } from '~/utils/thankmas'

const PHASE_META: Record<EventPhase, { description: string }> = {
  before: {
    description:
      "The Hytale community's yearly charity livestream, part of Jacksepticeye's Thankmas. December 12, 2026, raising money for the Make-A-Wish Foundation.",
  },
  during: {
    description:
      "The Hytale community's charity livestream is on right now! Watch live, join the in-game event on Hytale, and donate to the Make-A-Wish Foundation.",
  },
  after: {
    description:
      "That's a wrap on Hytale Thankmas 2026. See what the community raised for the Make-A-Wish Foundation, relive the stream, and get ready for next year.",
  },
}

export const Route = createRootRoute({
  head: () => {
    const meta = PHASE_META[getCurrentPhase()]
    return {
      meta: [
        { charSet: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        ...seo({
          title: 'Hytale Thankmas',
          description: meta.description,
          image: 'https://hytalethankmas.com/og.png',
        }),
      ],
      links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }
},
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

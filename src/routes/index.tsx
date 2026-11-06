import { createFileRoute } from '@tanstack/react-router'
import { Closing } from '~/components/landing/Closing'
import { Experience } from '~/components/landing/Experience'
import { Hero } from '~/components/landing/Hero'
import { Stats } from '~/components/landing/Stats'
import { Story } from '~/components/landing/Story'
import { Timeline } from '~/components/landing/Timeline'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Story />
      <Timeline />
      <Experience />
      <Closing />
    </main>
  )
}

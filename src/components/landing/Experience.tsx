import { EVENT } from '~/utils/thankmas'
import { useEventPhase } from '~/utils/useEventPhase'
import { Program } from '~/components/landing/Program'

const FORMAT = [
  {
    title: 'The Livestream',
    body: 'Sunday, December 13, from 17:00 to 02:00 CET. Nine hours of panels, games, music, and community creations, supporting Make-A-Wish.',
    accent: 'gold' as const,
  },
  {
    title: 'In-Game, on Hytale',
    body: 'For the first time, the playable side of Thankmas runs on Hytale itself. Explore the custom server hub and play new minigames and maps with friends and viewers.',
    accent: 'sage' as const,
  },
  {
    title: 'Winter SMP & Building Competition',
    body: 'A dedicated winter-themed SMP opens to everyone in early December, with a festive house building competition leading up to the stream.',
    accent: 'sage' as const,
  },
  {
    title: 'Festive Gadgets ModJam',
    body: 'Create festive gadgets for the Thankmas Hub in a mini ModJam. The top three entries will be showcased live during the event.',
    accent: 'gold' as const,
  },
]

export function Experience() {
  const phase = useEventPhase()

  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-sage-400 uppercase">
        {phase === 'before' && 'The Event'}
        {phase === 'during' && 'Tonight'}
        {phase === 'after' && 'The Recap'}
      </p>
      <h2 className="max-w-2xl text-4xl leading-tight font-bold sm:text-5xl">
        {phase === 'before' && <>Watch the stream. Play on Hytale.</>}
        {phase === 'during' && <>Tonight&rsquo;s program.</>}
        {phase === 'after' && <>How it went.</>}
      </h2>

      {phase === 'before' && (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FORMAT.map((item) => (
            <article
              key={item.title}
              className="panel group relative flex h-full flex-col gap-4 overflow-hidden p-8 sm:p-10 hover:border-gold-500/40"
            >
              <div
                aria-hidden="true"
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.accent === 'gold'
                    ? 'bg-[radial-gradient(ellipse_at_top_left,rgba(255,200,100,0.08),transparent_60%)]'
                    : 'bg-[radial-gradient(ellipse_at_top_left,rgba(163,199,171,0.08),transparent_60%)]'
                  }`}
              />
              <span
                aria-hidden="true"
                className={`h-3 w-3 ${item.accent === 'gold' ? 'bg-gold-500' : 'bg-sage-400'
                  }`}
              />
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="leading-relaxed text-cream-300">{item.body}</p>
            </article>
          ))}
        </div>
      )}

      <div className="mt-14">
        <h3 className="font-mono text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase">
          {phase === 'before' && 'Confirmed segments'}
          {phase === 'during' && 'Live now, up next'}
          {phase === 'after' && 'The full stream'}
        </h3>
        <div className="mt-6">
          <Program />
        </div>
        <p className="mt-6 font-mono text-xs text-cream-500">
          {phase === 'before'
            ? 'Segment times and running order are still subject to change.'
            : 'Times shown in your local timezone. Segment details may change.'}
        </p>
      </div>

      {phase === 'before' && (
        <p className="mt-8 font-mono text-sm text-cream-500">
          The winter SMP opens in early December. ModJam details and information
          on how to join the activities will be announced soon.
        </p>
      )}

      {phase === 'during' && (
        <div className="panel mt-12 flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold">Join in right now</h3>
            <p className="mt-2 text-cream-300">
              Watch the stream, or jump into the in-game event on Hytale. Every
              donation goes straight to {EVENT.charity}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={EVENT.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3"
            >
              Watch Live
            </a>
            <a href="#donate" className="btn-secondary px-6 py-3 font-semibold">
              Donate
            </a>
          </div>
        </div>
      )}

      {phase === 'after' && (
        <div className="panel mt-12 flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold">Thanks for showing up</h3>
            <p className="mt-2 text-cream-300">
              Every dollar raised goes to {EVENT.charity}. The full stream is up
              if you want to relive it.
            </p>
          </div>
          <a
            href={EVENT.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-6 py-3"
          >
            Watch the VOD
          </a>
        </div>
      )}
    </section>
  )
}

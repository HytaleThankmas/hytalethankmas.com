import { EVENT } from '~/utils/thankmas'
import { useEventPhase } from '~/utils/useEventPhase'
import { Program } from '~/components/landing/Program'

const FORMAT = [
  {
    title: 'The Livestream',
    body: 'A full day on stream with people from the Hytale community: panels, games, and plenty of messing about. Past years have run anywhere from seven and a half to nearly eleven hours.',
    accent: 'gold' as const,
  },
  {
    title: 'In-Game, on Hytale',
    body: 'For the first time, the playable side of the event runs on Hytale itself. Join the server and take part in the games instead of just watching them.',
    accent: 'sage' as const,
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
        {phase === 'before' && <>One day. Two ways to be there.</>}
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
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  item.accent === 'gold'
                    ? 'bg-[radial-gradient(ellipse_at_top_left,rgba(255,200,100,0.08),transparent_60%)]'
                    : 'bg-[radial-gradient(ellipse_at_top_left,rgba(163,199,171,0.08),transparent_60%)]'
                }`}
              />
              <span
                aria-hidden="true"
                className={`h-3 w-3 ${
                  item.accent === 'gold' ? 'bg-gold-500' : 'bg-sage-400'
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
          {phase === 'before' && 'The schedule'}
          {phase === 'during' && 'Live now, up next'}
          {phase === 'after' && 'The full stream'}
        </h3>
        <div className="mt-6">
          <Program />
        </div>
        <p className="mt-6 font-mono text-xs text-cream-500">
          Times shown in your local timezone.
        </p>
      </div>

      {phase === 'before' && (
        <p className="mt-8 font-mono text-sm text-cream-500">
          More details, like the full lineup and how to join the in-game event,
          land here closer to the day.
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

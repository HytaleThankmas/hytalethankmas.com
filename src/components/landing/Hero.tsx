import { CURRENT_YEAR_ENTRY, EVENT } from '~/utils/thankmas'
import { useEventLive, useEventPhase, useMounted } from '~/utils/useEventPhase'
import { useLiveTotal } from '~/utils/useLiveTotal'
import { Snowfall } from '~/components/Snowfall'
import { Spark } from '~/components/Spark'
import { Countdown } from '~/components/landing/Countdown'
import { LiveBadge } from '~/components/landing/LiveBadge'

function TreeMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 47.22 66.59"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M47.22,54.78c-4.58-5.83-8.32-14.61-10.93-22.69,2.28-.32,3.93-1.48,4.9-2.46C32.54,19.32,24.03,2.2,22.96,0c-.96,2.08-8.37,16.48-16.86,24.79.98,1.06,2.7,2.48,5.27,2.81-2.36,7.97-5.95,19.31-11.37,25.94,2.03,2.64,10.14,4.61,15.25,1.72l-1.65,9.13c.4.22,3.96,2.2,9.35,2.2s8.89-1.98,9.29-2.2l-1.45-9.13c4.56,3.09,13.79,1.98,16.42-.47ZM22.22,20.2h1.36s5.95,22.72,5.95,22.72h-13.12l5.82-22.72Z" />
    </svg>
  )
}

function liveTime(d: Date) {
  return d.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })
}

function BeforeBlock() {
  return (
    <>
      <div
        className="animate-rise mt-10 flex flex-col items-center gap-4 sm:flex-row"
        style={{ animationDelay: '0.45s' }}
      >
        <a href="#donate" className="btn-primary px-10 py-4 text-lg">
          Donate Now
        </a>
        <a
          href="#experience"
          className="btn-secondary px-10 py-4 text-lg font-semibold"
        >
          Watch the Stream
        </a>
      </div>

      <div className="animate-rise mt-14" style={{ animationDelay: '0.6s' }}>
        <Countdown />
      </div>

      <div
        className="animate-rise mt-8 flex items-center gap-4 font-mono text-sm text-cream-500"
        style={{ animationDelay: '0.7s' }}
      >
        <span className="animate-flicker inline-block h-2 w-2 rounded-full bg-gold-400" />
        <time dateTime="2026-12-12" className="tracking-[0.2em] uppercase">
          {EVENT.date}
        </time>
      </div>
    </>
  )
}

function DuringBlock() {
  const { raised, goal } = useLiveTotal()
  const { streamLive, inGameLive } = useEventLive()
  const mounted = useMounted()
  const pct = Math.min((raised / goal) * 100, 100)

  const badgeLabel = streamLive
    ? 'Live now'
    : inGameLive
      ? 'In-game event open'
      : 'Wrapping up'
  const status =
    !streamLive && inGameLive
      ? `The stream is over. The in-game event stays open until ${
          mounted ? liveTime(EVENT.inGameEnd) : '--:--'
        }`
      : null

  return (
    <>
      <div className="animate-rise mt-10" style={{ animationDelay: '0.4s' }}>
        <LiveBadge label={badgeLabel} />
      </div>

      <div
        className="animate-rise mt-6 flex flex-col items-center gap-4 sm:flex-row"
        style={{ animationDelay: '0.5s' }}
      >
        <a
          href={EVENT.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-10 py-4 text-lg"
        >
          {streamLive ? 'Watch Live' : 'Watch the Stream'}
        </a>
        <a id="donate" href="#donate" className="btn-secondary px-10 py-4 text-lg font-semibold">
          Donate Now
        </a>
      </div>

      {status && (
        <p
          className="animate-rise mt-4 font-mono text-xs tracking-widest text-cream-500 uppercase"
          style={{ animationDelay: '0.55s' }}
        >
          {status}
        </p>
      )}

      <div className="animate-rise mt-8 w-full max-w-md" style={{ animationDelay: '0.6s' }}>
        <div className="flex items-baseline justify-between font-mono text-sm">
          <span className="tracking-[0.25em] text-cream-500 uppercase">Raised so far</span>
          <span className="font-semibold text-gold-400 tabular-nums">
            ${raised.toLocaleString('en-US')}
            <span className="text-cream-500"> / ${goal.toLocaleString('en-US')}</span>
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={raised}
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-label="2026 donation goal progress"
          className="mt-2 h-2 overflow-hidden rounded-full bg-pine-700"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </>
  )
}

function AfterBlock() {
  const amount = CURRENT_YEAR_ENTRY.amount

  return (
    <>
      <p
        className="animate-rise mt-10 text-2xl font-semibold text-gold-300"
        style={{ animationDelay: '0.45s' }}
      >
        That&rsquo;s a wrap!
      </p>
      {amount !== null ? (
        <p
          className="animate-rise mt-3 font-mono text-4xl font-semibold text-gold-400 tabular-nums"
          style={{ animationDelay: '0.55s' }}
        >
          ${amount.toLocaleString('en-US')} raised for {EVENT.charity}
        </p>
      ) : (
        <p
          className="animate-rise mt-3 text-cream-300"
          style={{ animationDelay: '0.55s' }}
        >
          The final total is being added up. We&rsquo;ll post it here soon.
        </p>
      )}

      <div
        className="animate-rise mt-8 flex flex-col items-center gap-4 sm:flex-row"
        style={{ animationDelay: '0.65s' }}
      >
        <a
          href={EVENT.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-10 py-4 text-lg"
        >
          Watch the VOD
        </a>
        <a
          href="#history"
          className="btn-secondary px-10 py-4 text-lg font-semibold"
        >
          See how it went
        </a>
      </div>

      <div
        className="animate-rise mt-10 flex items-center gap-4 font-mono text-sm text-cream-500"
        style={{ animationDelay: '0.75s' }}
      >
        <time dateTime="2026-12-12" className="tracking-[0.2em] uppercase">
          {EVENT.date}
        </time>
      </div>
    </>
  )
}

export function Hero() {
  const phase = useEventPhase()

  return (
    <header className="relative flex min-h-svh flex-col overflow-hidden">
      {/* backdrop glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% 118%, rgba(255,200,100,0.18), transparent 60%),' +
            'radial-gradient(ellipse 60% 40% at 82% -8%, rgba(163,199,171,0.12), transparent 65%),' +
            'radial-gradient(ellipse 40% 30% at 8% 20%, rgba(163,199,171,0.06), transparent 70%)',
        }}
      />
      <Snowfall />

      {/* floating sparks */}
      <Spark className="animate-twinkle absolute top-[22%] left-[12%] h-4 w-4 text-gold-400" />
      <Spark className="animate-twinkle [animation-delay:1.6s] absolute top-[16%] right-[16%] h-3 w-3 text-cream-100" />
      <Spark className="animate-twinkle [animation-delay:0.8s] absolute bottom-[30%] left-[24%] h-2.5 w-2.5 text-sage-300" />

      {/* nav */}
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="#top" className="flex items-center gap-2.5">
          <TreeMark className="h-8 w-auto text-cream-100" />
          <span className="font-logotype text-lg text-gold-400">
            Hytale&nbsp;Thankmas
          </span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-6 font-mono text-xs tracking-widest text-cream-300 uppercase sm:flex">
            <a href="#story" className="transition-colors hover:text-gold-300">
              Story
            </a>
            <a href="#history" className="transition-colors hover:text-gold-300">
              History
            </a>
          </div>
          {phase === 'during' ? (
            <div className="flex items-center gap-3">
              <a
                href={EVENT.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-4 py-2 font-mono text-xs font-semibold tracking-widest text-pine-950 uppercase"
              >
                Watch Live
              </a>
              <a
                href="#donate"
                className="btn-secondary px-4 py-2 font-mono text-xs font-semibold tracking-widest text-gold-300 uppercase"
              >
                Donate
              </a>
            </div>
          ) : (
            <a
              href="#donate"
              className="btn-primary px-4 py-2 font-mono text-xs font-semibold tracking-widest text-pine-950 uppercase"
            >
              Donate
            </a>
          )}
        </div>
      </nav>

      {/* hero core */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 text-center">
        <h1
          className="animate-rise text-glow-gold font-logotype text-[clamp(3.25rem,16vw,8rem)] leading-[1.02] tracking-[0.02em]"
          style={{ animationDelay: '0.15s' }}
        >
          Hytale
          <br />
          <span className="text-gold-400">Thankmas</span>
        </h1>

        <p
          className="animate-rise mt-8 max-w-xl text-lg text-cream-300 sm:text-xl"
          style={{ animationDelay: '0.3s' }}
        >
          The Hytale community's yearly charity livestream returns for its{' '}
          <strong className="font-semibold text-cream-100">
            {EVENT.edition}th year
          </strong>
          , this time raising money for the{' '}
          <a
            href={EVENT.charityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap font-semibold text-gold-300 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-400 hover:decoration-gold-400"
          >
            {EVENT.charity}
          </a>
          .
        </p>

        {phase === 'before' && <BeforeBlock />}
        {phase === 'during' && <DuringBlock />}
        {phase === 'after' && <AfterBlock />}
      </div>

      {/* bottom fade into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pine-950 to-transparent"
      />
    </header>
  )
}

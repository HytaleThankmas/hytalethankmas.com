import { CURRENT_YEAR_ENTRY, EVENT, TOTAL_RAISED } from '~/utils/thankmas'
import { useEventPhase } from '~/utils/useEventPhase'
import { useLiveTotal } from '~/utils/useLiveTotal'
import { Spark } from '~/components/Spark'
import { LiveBadge } from '~/components/landing/LiveBadge'

export function Closing() {
  const phase = useEventPhase()
  const { raised } = useLiveTotal()
  const finalAmount = CURRENT_YEAR_ENTRY.amount

  return (
    <footer className="relative overflow-hidden border-t border-pine-700">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 120%, rgba(255,200,100,0.14), transparent 60%)',
        }}
      />
      {/* soft tree silhouette at the bottom of the closing section */}
      <Spark className="animate-twinkle absolute top-16 right-[10%] h-4 w-4 text-gold-400 [animation-delay:1.2s]" />
      <Spark className="animate-twinkle absolute bottom-40 left-[8%] h-3 w-3 text-sage-300" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <img
          src="/logo.svg"
          alt="Hytale Thankmas logo"
          width={300}
          height={300}
          className="animate-rise h-36 w-36 sm:h-48 sm:w-48"
          style={{ animationDelay: '0.1s' }}
        />
        <p className="animate-rise mt-10 mb-6 font-mono text-xs tracking-[0.3em] text-sage-400 uppercase [animation-delay:0.2s]">
          <time dateTime="2026-12-12">{EVENT.date}</time>
        </p>

        {phase === 'before' && (
          <>
            <h2 className="animate-rise text-glow-gold max-w-3xl text-4xl leading-tight font-extrabold sm:text-6xl [animation-delay:0.3s]">
              See you in{' '}
              <span className="text-gold-400">December</span>.
            </h2>
            <p className="animate-rise mt-6 max-w-xl text-lg text-cream-300 [animation-delay:0.4s]">
              {'$' + TOTAL_RAISED.toLocaleString('en-US')} raised over six years.
              This time it's for the {EVENT.charity}, and for the first time
              we're playing on Hytale.
            </p>
            <div className="animate-rise mt-10 flex flex-col items-center gap-4 sm:flex-row [animation-delay:0.5s]">
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
          </>
        )}

        {phase === 'during' && (
          <>
            <div className="animate-rise [animation-delay:0.3s]">
              <LiveBadge />
            </div>
            <h2 className="animate-rise text-glow-gold max-w-3xl text-4xl leading-tight font-extrabold sm:text-6xl [animation-delay:0.35s]">
              We&rsquo;re live.{' '}
              <span className="text-gold-400">Join us.</span>
            </h2>
            <p className="animate-rise mt-6 max-w-xl text-lg text-cream-300 [animation-delay:0.45s]">
              <span className="font-semibold text-gold-300 tabular-nums">
                ${raised.toLocaleString('en-US')}
              </span>{' '}
              raised so far for the {EVENT.charity}, and every dollar goes straight
              to them.
            </p>
            <div className="animate-rise mt-10 flex flex-col items-center gap-4 sm:flex-row [animation-delay:0.55s]">
              <a
                href={EVENT.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 py-4 text-lg"
              >
                Watch Live
              </a>
              <a
                href="#donate"
                className="btn-secondary px-10 py-4 text-lg font-semibold"
              >
                Donate Now
              </a>
            </div>
          </>
        )}

        {phase === 'after' && (
          <>
            <h2 className="animate-rise text-glow-gold max-w-3xl text-4xl leading-tight font-extrabold sm:text-6xl [animation-delay:0.3s]">
              <span className="text-gold-400">Thank you.</span>
            </h2>
            <p className="animate-rise mt-6 max-w-xl text-lg text-cream-300 [animation-delay:0.4s]">
              {finalAmount !== null ? (
                <>
                  Together we raised{' '}
                  <span className="font-semibold text-gold-300 tabular-nums">
                    ${finalAmount.toLocaleString('en-US')}
                  </span>{' '}
                  for the {EVENT.charity}. See you next year.
                </>
              ) : (
                <>
                  The final total is being added up and will be posted here
                  soon. Thanks for being part of it. See you next year.
                </>
              )}
            </p>
            <div className="animate-rise mt-10 flex flex-col items-center gap-4 sm:flex-row [animation-delay:0.5s]">
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
          </>
        )}

        <div className="animate-rise mt-24 flex w-full flex-col items-center justify-center gap-4 border-t border-pine-700 pt-8 [animation-delay:0.6s]">
          <span className="font-logotype text-xl text-gold-400">
            Hytale Thankmas
          </span>
          <span className="font-mono text-xs tracking-widest text-cream-500 uppercase">
            {EVENT.year}
          </span>
        </div>
      </div>
    </footer>
  )
}

import { HISTORY } from '~/utils/thankmas'
import { useEventPhase } from '~/utils/useEventPhase'
import { useLiveTotal } from '~/utils/useLiveTotal'

const MAX_AMOUNT = Math.max(
  ...HISTORY.map((e) => e.amount ?? 0),
)

export function Timeline() {
  const phase = useEventPhase()
  const { raised } = useLiveTotal()
  return (
    <section
      id="history"
      className="relative border-t border-pine-700 bg-pine-900/30 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-sage-400 uppercase">
          The History
        </p>
        <h2 className="max-w-2xl text-4xl leading-tight font-bold sm:text-5xl">
          Six years in,
          <br />
          <span className="text-gold-400">still showing up.</span>
        </h2>

        <div className="mt-16 space-y-3">
          {HISTORY.map((entry) => (
            <div
              key={entry.year}
              className={`group grid grid-cols-[4.5rem_1fr] items-center gap-4 sm:grid-cols-[6rem_1fr_17rem] sm:gap-6 ${
                entry.current ? 'py-2' : ''
              }`}
            >
              <span
                className={`font-mono text-lg font-semibold tabular-nums sm:text-xl ${
                  entry.current ? 'text-gold-400' : 'text-cream-500'
                }`}
              >
                {entry.year}
              </span>

              <div className="relative h-10 overflow-hidden sm:h-12">
                {entry.amount !== null ? (
                  <a
                    href={entry.tiltify}
                    target="_blank"
                    rel="noreferrer"
                    title={`${entry.year} campaign on Tiltify`}
                    className="rounded-sm flex h-full items-center bg-gradient-to-r from-pine-700 via-pine-600 to-gold-600/40 transition-all hover:to-gold-500/60"
                    style={{
                      width: `${Math.max((entry.amount / MAX_AMOUNT) * 100, 14)}%`,
                    }}
                  >
                    <span className="px-3 font-mono text-sm font-semibold whitespace-nowrap text-gold-300 tabular-nums sm:px-4 sm:text-base">
                      {'$' + entry.amount.toLocaleString('en-US')}
                    </span>
                  </a>
                ) : entry.current && phase === 'during' ? (
                  <div
                    className="rounded-sm flex h-full items-center bg-gradient-to-r from-pine-700 via-pine-600 to-gold-600/40 shadow-[0_0_30px_rgba(255,200,100,0.15)] transition-all"
                    style={{
                      width: `${Math.max((raised / MAX_AMOUNT) * 100, 14)}%`,
                    }}
                  >
                    <span className="px-3 font-mono text-sm font-semibold whitespace-nowrap text-gold-300 tabular-nums sm:px-4 sm:text-base">
                      {'$' + raised.toLocaleString('en-US')}
                      <span className="ml-2 font-mono text-xs tracking-widest text-gold-400 uppercase">
                        live
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="rounded-sm flex h-full w-full items-center border border-dashed border-gold-500/60 bg-gold-500/5 shadow-[0_0_30px_rgba(255,200,100,0.12)]">
                    <span className="px-3 font-mono text-sm font-semibold tracking-[0.3em] text-gold-400 uppercase sm:px-4">
                      You decide
                    </span>
                  </div>
                )}
              </div>

              <span
                className={`col-start-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:col-start-auto sm:whitespace-nowrap sm:justify-end sm:text-right ${
                  entry.current ? 'font-semibold text-cream-100' : 'text-cream-500'
                }`}
              >
                <span>
                  <a
                    href={entry.charityUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-pine-600 underline-offset-4 transition-colors hover:text-cream-100 hover:decoration-cream-500"
                  >
                    {entry.charity}
                  </a>
                  {entry.current && (
                    <span
                      className={`ml-2 font-mono text-xs tracking-widest text-gold-400 uppercase ${
                        phase === 'during' ? 'animate-flicker' : ''
                      }`}
                    >
                      · {phase === 'during' ? 'live now' : 'this year'}
                    </span>
                  )}
                </span>
                {entry.vod && (
                  <a
                    href={entry.vod.url}
                    target="_blank"
                    rel="noreferrer"
                    title={`Watch the ${entry.year} stream on YouTube`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-sage-400 uppercase transition-colors hover:text-sage-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
                    </svg>
                    {entry.vod.duration}
                  </a>
                )}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-xl text-cream-500">
          Amounts link to the original Tiltify campaigns. The streams are still
          up on YouTube if you want to see what a Thankmas looks like. What
          2026 raises is up to everyone who shows up.
        </p>
      </div>
    </section>
  )
}

import { PROGRAM, type ProgramKind } from '~/utils/thankmas'
import { useEventPhase, useMounted, useNow } from '~/utils/useEventPhase'

const KIND_LABEL: Record<ProgramKind, string> = {
  opening: 'Opening',
  panel: 'Panel',
  game: 'Game',
  segment: 'Segment',
  intermission: 'Intermission',
  closing: 'Finale',
}

const KIND_ACCENT: Record<ProgramKind, string> = {
  opening: 'bg-gold-500',
  panel: 'bg-gold-500',
  game: 'bg-sage-400',
  segment: 'bg-sage-400',
  intermission: 'bg-pine-500',
  closing: 'bg-gold-500',
}

function time(d: Date) {
  return d.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })
}

export function Program() {
  const phase = useEventPhase()
  const now = useNow(15_000)
  const mounted = useMounted()
  const currentIndex = PROGRAM.findIndex((e) => now >= e.start && now < e.end)

  return (
    <ol className="space-y-3">
      {PROGRAM.map((entry, i) => {
        const isCurrent = i === currentIndex
        const isPast = entry.end <= now
        return (
          <li
            key={entry.start.getTime()}
            className={`panel flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6 ${
              isCurrent
                ? 'border-gold-500/70 bg-gold-500/5 shadow-[0_0_30px_rgba(255,200,100,0.15)]'
                : isPast && phase === 'during'
                  ? 'opacity-50'
                  : ''
            }`}
          >
            <span className="shrink-0 font-mono text-sm text-cream-500 tabular-nums sm:w-36">
              {mounted ? time(entry.start) : '--:--'}
              <span className="text-cream-500/60"> – </span>
              {mounted ? time(entry.end) : '--:--'}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 ${KIND_ACCENT[entry.kind]}`}
                />
                <span className="font-mono text-[10px] tracking-[0.25em] text-cream-500 uppercase">
                  {KIND_LABEL[entry.kind]}
                </span>
                {isCurrent && (
                  <span className="animate-flicker font-mono text-[10px] font-semibold tracking-[0.25em] text-gold-400 uppercase">
                    · Now
                  </span>
                )}
              </div>
              <p
                className={`mt-1 text-lg font-semibold ${
                  isCurrent ? 'text-gold-300' : 'text-cream-100'
                }`}
              >
                {entry.title}
              </p>
              {entry.hosts && (
                <p className="mt-0.5 text-sm text-cream-500">
                  with {entry.hosts.join(', ')}
                </p>
              )}
            </div>

            {phase === 'after' && entry.vodUrl && (
              <a
                href={entry.vodUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 font-mono text-xs tracking-wider text-sage-400 uppercase transition-colors hover:text-sage-300"
              >
                Watch segment ↗
              </a>
            )}
          </li>
        )
      })}
    </ol>
  )
}

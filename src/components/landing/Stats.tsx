import {
  CURRENT_YEAR_ENTRY,
  EVENT,
  TOTAL_RAISED,
  TOTAL_STREAM_HOURS,
} from '~/utils/thankmas'
import { useEventPhase } from '~/utils/useEventPhase'
import { useLiveTotal } from '~/utils/useLiveTotal'
import { useCountUp } from '~/utils/useCountUp'

function Stat({
  value,
  suffix,
  label,
  prefix = '',
}: {
  value: number
  suffix?: string
  label: string
  prefix?: string
}) {
  const { ref, value: current } = useCountUp(value)
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="font-mono text-4xl font-semibold text-gold-400 tabular-nums sm:text-5xl"
      >
        {prefix}
        {current.toLocaleString('en-US')}
        {suffix}
      </span>
      <span className="font-mono text-xs tracking-[0.25em] text-cream-500 uppercase">
        {label}
      </span>
    </div>
  )
}

export function Stats() {
  const phase = useEventPhase()
  const { raised, goal } = useLiveTotal()
  const pct = Math.min((raised / goal) * 100, 100)

  const stats = {
    before: [
      { value: TOTAL_RAISED, prefix: '$', label: 'Raised so far' },
      { value: EVENT.edition, label: 'Years running' },
      { value: 4, label: 'Charities supported' },
      { value: TOTAL_STREAM_HOURS, label: 'Hours streamed' },
    ],
    during: [
      { value: raised, prefix: '$', label: 'Raised this year' },
      { value: EVENT.edition, label: 'Years running' },
      { value: 4, label: 'Charities supported' },
      { value: TOTAL_STREAM_HOURS, label: 'Hours streamed' },
    ],
    after: [
      {
        value: CURRENT_YEAR_ENTRY.amount ?? TOTAL_RAISED,
        prefix: '$',
        label:
          CURRENT_YEAR_ENTRY.amount !== null ? 'Raised in 2026' : 'Raised so far',
      },
      { value: EVENT.edition, label: 'Years running' },
      { value: 4, label: 'Charities supported' },
      { value: TOTAL_STREAM_HOURS, label: 'Hours streamed' },
    ],
  }[phase]

  return (
    <section className="relative border-y border-pine-700 bg-pine-900/50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>

      {phase === 'during' && (
        <div className="mx-auto w-full max-w-6xl px-6 pb-12">
          <div className="flex items-baseline justify-between font-mono text-xs tracking-[0.25em] text-cream-500 uppercase">
            <span>2026 goal</span>
            <span className="text-gold-400 tabular-nums">
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
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-pine-700"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

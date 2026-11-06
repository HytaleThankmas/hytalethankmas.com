import { Fragment } from 'react'
import { EVENT } from '~/utils/thankmas'
import { useMounted, useNow } from '~/utils/useEventPhase'

const pad = (n: number) => String(n).padStart(2, '0')

function diff(target: Date, now: Date) {
  const ms = Math.max(target.getTime() - now.getTime(), 0)
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

export function Countdown() {
  const now = useNow(1000)
  const mounted = useMounted()
  const { days, hours, minutes, seconds } = diff(EVENT.streamStart, now)

  const cells = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ]

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-mono text-xs tracking-[0.3em] text-cream-500 uppercase">
        The stream starts in
      </span>
      {/*
        One grid, two implicit rows, 7 columns: num sep num sep num sep num.
        Number columns are shared by both rows, so each label is forced into
        the exact same column width as the number above it. Separators live
        in their own 1ch columns, which sit empty in the label row, so the ':'
        only ever centers against the number boxes.
      */}
      <div
        role="timer"
        aria-label="Time until the stream starts"
        className="grid grid-cols-[auto_1ch_auto_1ch_auto_1ch_auto] items-center gap-x-2 sm:gap-x-3"
      >
        {/* number row */}
        {cells.map((cell, i) => (
          <Fragment key={cell.label}>
            {i > 0 && (
              <span
                className="text-center font-mono text-2xl text-gold-600"
                aria-hidden="true"
              >
                :
              </span>
            )}
            <span className="min-w-[3.5ch] rounded-sm border border-pine-600 bg-pine-900/70 px-3 py-2 text-center font-mono text-2xl font-semibold text-gold-400 tabular-nums sm:text-3xl">
              {mounted ? pad(cell.value) : '--'}
            </span>
          </Fragment>
        ))}
        {/* label row: separator columns left empty */}
        {cells.map((cell, i) => (
          <Fragment key={cell.label}>
            {i > 0 && <span aria-hidden="true" />}
            <span className="text-center font-mono text-[10px] tracking-[0.25em] text-cream-500 uppercase">
              {cell.label}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

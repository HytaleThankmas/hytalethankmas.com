export type YearEntry = {
  year: number
  amount: number | null
  charity: string
  charityUrl: string
  tiltify: string
  vod?: { url: string; duration: string }
  current?: boolean
}

export const HISTORY: Array<YearEntry> = [
  {
    year: 2021,
    amount: 16805,
    charity: 'New Story',
    charityUrl: 'https://newstorycharity.org',
    tiltify: 'https://tiltify.com/+hytale-helpers/hytale-thankmas-2021',
    vod: { url: 'https://www.youtube.com/watch?v=aIZ_nY5Fzh8', duration: '9h 15m' },
  },
  {
    year: 2022,
    amount: 7500,
    charity: 'World Central Kitchen',
    charityUrl: 'https://wck.org',
    tiltify: 'https://tiltify.com/+hytale-helpers/hytale-thankmas-2022',
    vod: { url: 'https://www.youtube.com/watch?v=NHuH8IdM45E', duration: '10h 49m' },
  },
  {
    year: 2023,
    amount: 10962,
    charity: 'World Central Kitchen',
    charityUrl: 'https://wck.org',
    tiltify: 'https://tiltify.com/+hytale-helpers/hytale-thankmas-2023',
    vod: { url: 'https://www.youtube.com/watch?v=tMREjBO1QL4', duration: '9h 04m' },
  },
  {
    year: 2024,
    amount: 15200,
    charity: 'Tiltify Impact Fund',
    charityUrl: 'https://tiltify.com/tif',
    tiltify: 'https://tiltify.com/+hytale-helpers/hytale-thankmas-2024',
    vod: { url: 'https://www.youtube.com/watch?v=cmZGBwu18kE', duration: '8h 38m' },
  },
  {
    year: 2025,
    amount: 17841,
    charity: 'World Central Kitchen',
    charityUrl: 'https://wck.org',
    tiltify: 'https://tiltify.com/+hytale-helpers/hytale-thankmas-2025',
    vod: { url: 'https://www.youtube.com/watch?v=ZjAOlgat0ks', duration: '7h 35m' },
  },
  {
    year: 2026,
    amount: null,
    charity: 'Make-A-Wish Foundation',
    charityUrl: 'https://wish.org',
    tiltify: 'https://tiltify.com/+hytale-helpers',
    current: true,
  },
]

/** The current (2026) entry — the maintainer fills in `amount` after the event. */
export const CURRENT_YEAR_ENTRY =
  HISTORY.find((e) => e.current) ?? HISTORY[HISTORY.length - 1]

export const TOTAL_RAISED = HISTORY.reduce(
  (sum, e) => sum + (e.amount ?? 0),
  0,
)

export const TOTAL_STREAM_HOURS = Math.round(
  HISTORY.reduce((sum, e) => {
    if (!e.vod?.duration) return sum
    const h = Number(/(\d+)h/.exec(e.vod.duration)?.[1] ?? 0)
    const m = Number(/(\d+)m/.exec(e.vod.duration)?.[1] ?? 0)
    return sum + h + m / 60
  }, 0),
)

/** All event-day times are in the same (CET) timezone; entries render in the viewer's local time. */
const at = (time: string) => new Date(`2026-12-12T${time}+01:00`)

export const EVENT = {
  year: 2026,
  edition: 7,
  date: 'December 12, 2026',
  dateShort: '12.12.2026',
  charity: 'Make-A-Wish Foundation',
  charityUrl: 'https://wish.org',
  // TODO: replace with the real stream/channel link
  streamUrl: 'https://www.youtube.com/@hytalethankmas',
  // ── placeholders, adjust once the day's timeline is confirmed ──
  /** When the livestream starts (also when the in-game event opens). */
  streamStart: at('14:00'),
  /** When the livestream wraps. */
  streamEnd: at('23:00'),
  /** The in-game event keeps running after the stream ends, until this time. */
  inGameEnd: new Date('2026-12-13T02:00:00+01:00'),
  /**
   * When the site flips to the post-event ("after") version.
   * Should be at/after `inGameEnd` so "during" covers the whole event.
   */
  afterStart: new Date('2026-12-13T02:00:00+01:00'),
}

export type EventPhase = 'before' | 'during' | 'after'

/** Pure, time-based phase lookup. */
export function getPhase(now: Date): EventPhase {
  if (now < EVENT.streamStart) return 'before'
  if (now < EVENT.afterStart) return 'during'
  return 'after'
}

/** Whether the livestream itself is on the air right now. */
export function streamLiveAt(now: Date): boolean {
  return now >= EVENT.streamStart && now < EVENT.streamEnd
}

/** Whether the in-game event is open right now (runs longer than the stream). */
export function inGameLiveAt(now: Date): boolean {
  return now >= EVENT.streamStart && now < EVENT.inGameEnd
}

/**
 * Manual phase override for deploy-time forcing (e.g. to be safe on event day).
 * `null` = derive from the clock. Preview other phases with `?phase=before|during|after`.
 */
export const EVENT_PHASE_OVERRIDE: EventPhase | null = null

/** The phase the site should currently show (override wins over the clock). */
export function getCurrentPhase(): EventPhase {
  return EVENT_PHASE_OVERRIDE ?? getPhase(new Date())
}

export type ProgramKind =
  | 'opening'
  | 'panel'
  | 'game'
  | 'segment'
  | 'intermission'
  | 'closing'

export type ProgramEntry = {
  start: Date
  end: Date
  title: string
  kind: ProgramKind
  hosts?: string[]
  /** Optional segment VOD, shown once it exists (after the event). */
  vodUrl?: string
}

/**
 * The stream schedule. Placeholder lineup — replace with the real one as it
 * firms up. Only covers the livestream (the in-game event runs alongside it
 * and continues until EVENT.inGameEnd).
 */
export const PROGRAM: ProgramEntry[] = [
  { start: at('14:00'), end: at('15:00'), title: 'Opening & welcome', kind: 'opening' },
  { start: at('15:00'), end: at('16:30'), title: 'Community panel: year in Hytale', kind: 'panel' },
  { start: at('16:30'), end: at('18:00'), title: 'In-game games on Hytale', kind: 'game' },
  { start: at('18:00'), end: at('18:30'), title: 'Intermission', kind: 'intermission' },
  { start: at('18:30'), end: at('20:00'), title: 'Main panel: the charity', kind: 'panel' },
  { start: at('20:00'), end: at('22:00'), title: 'Community games & challenges', kind: 'game' },
  { start: at('22:00'), end: at('23:00'), title: 'Finale, totals & thank yous', kind: 'closing' },
]

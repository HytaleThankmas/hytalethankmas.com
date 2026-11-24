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
export const EVENT = {
  year: 2026,
  edition: 7,
  date: 'Sunday, December 13, 2026',
  dateShort: '13.12.2026',
  dateIso: '2026-12-13',
  streamTime: '17:00–02:00 CET',
  goal: 15_000,
  charity: 'Make-A-Wish Foundation',
  charityUrl: 'https://wish.org',
  // TODO: replace with the real stream/channel link
  streamUrl: 'https://www.youtube.com/@hytalethankmas',
  /** The livestream and event-day in-game activities run from 17:00 to 02:00 CET. */
  streamStart: new Date('2026-12-13T17:00:00+01:00'),
  streamEnd: new Date('2026-12-14T02:00:00+01:00'),
  inGameEnd: new Date('2026-12-14T02:00:00+01:00'),
  /** The site switches to the post-event version when the event closes. */
  afterStart: new Date('2026-12-14T02:00:00+01:00'),
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

/** Whether the event-day in-game activities are open right now. */
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
  title: string
  kind: ProgramKind
  description: string
  /** Added when the final running order and segment times are confirmed. */
  start?: Date
  end?: Date
  hosts?: string[]
  /** Optional segment VOD, shown once it exists (after the event). */
  vodUrl?: string
}

/** Confirmed segments in the announced order. Segment times and the final running order are still subject to change. */
export const PROGRAM: ProgramEntry[] = [
  {
    title: 'Welcome Wagon',
    kind: 'opening',
    description: 'A welcome to the event and the cause, with an on-stage musical performance to get things started.',
  },
  {
    title: 'Server Hub, SMP & ModJam',
    kind: 'segment',
    description: 'Explore the custom Hytale server hub, the winter SMP builds, and the top three ModJam entries.',
  },
  {
    title: 'Hytale Rewind 2026',
    kind: 'segment',
    description: 'A community-curated look back at the entire year in the world of Hytale.',
  },
  {
    title: 'Roundtable: In-Game',
    kind: 'panel',
    description: 'The first roundtable hosted in the alterverse, featuring your favorite creators.',
  },
  {
    title: 'The Tritale Games',
    kind: 'game',
    description: 'Three tests of skill, knowledge, and creativity to select the GOATs of 2026.',
  },
  {
    title: 'Server Minigames',
    kind: 'game',
    description: 'Save the Kweebecs and play new maps and mechanics with friends and viewers.',
  },
  {
    title: 'Community Show',
    kind: 'segment',
    description: 'Art, music, pre-recorded videos, mods, and creations of every kind, submitted by the community.',
  },
  {
    title: 'Gaia Gauntlet: Christmas Special',
    kind: 'game',
    description: 'The popular live event shakes up its format for a festive Thankmas competition.',
  },
  {
    title: 'The Final Battle',
    kind: 'game',
    description: 'Details of the final battle have not been announced yet.',
  },
  {
    title: 'Closing Ceremony',
    kind: 'closing',
    description: 'The Hytale Awards, competition winners, and a fireworks display to close out the night.',
  },
]

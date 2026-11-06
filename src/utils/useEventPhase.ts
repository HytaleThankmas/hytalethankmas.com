import { useEffect, useState } from 'react'
import {
  EVENT_PHASE_OVERRIDE,
  getPhase,
  inGameLiveAt,
  streamLiveAt,
  type EventPhase,
} from '~/utils/thankmas'

/** Current time, re-rendered every `intervalMs`. */
export function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    setNow(new Date()) // re-sync on mount
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}

/**
 * False during SSR and the first client render, true after hydration.
 * Gate time/locale-dependent text on this so the server and client render
 * identical HTML (avoids React hydration mismatches).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

const PHASE_QUERY = 'phase'

/** Preview override via `?phase=before|during|after` (dev/tools only). */
function getQueryOverride(): EventPhase | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search).get(PHASE_QUERY)
  return p === 'before' || p === 'during' || p === 'after' ? p : null
}

function resolvePhase(now: Date): EventPhase {
  return EVENT_PHASE_OVERRIDE ?? getQueryOverride() ?? getPhase(now)
}

/**
 * The phase the site currently shows. Auto-flips at phase boundaries without
 * a reload. Preview other phases with `?phase=before|during|after`.
 */
export function useEventPhase(): EventPhase {
  return resolvePhase(useNow())
}

/** Live status details. While in a forced 'during' phase, live flags read as on. */
export function useEventLive() {
  const now = useNow(15_000)
  const override = EVENT_PHASE_OVERRIDE ?? getQueryOverride()
  return {
    phase: override ?? getPhase(now),
    streamLive: override === 'during' || streamLiveAt(now),
    inGameLive: override === 'during' || inGameLiveAt(now),
  }
}

import { useEffect, useState } from 'react'
import { EVENT } from "~/utils/thankmas";

// ── manual placeholder for now ──────────────────────────────────────────────
// The plan is to wire this to the Tiltify API (or our own backend) before the
// event. This hook is the only place that knows where the number comes from,
// so swapping the source later means touching just this file.
const LIVE_TOTAL = 0 // TODO: set to the real number on event day
export type LiveTotal = { raised: number; goal: number }

export function useLiveTotal(): LiveTotal {
  const [total, setTotal] = useState<LiveTotal>({
    raised: LIVE_TOTAL,
    goal: EVENT.goal,
  })

  useEffect(() => {
    // Later: fetch from Tiltify / our backend, refresh on an interval, and
    // update state here. Nothing else in the codebase changes.
    setTotal({ raised: LIVE_TOTAL, goal: EVENT.goal })
  }, [])

  return total
}

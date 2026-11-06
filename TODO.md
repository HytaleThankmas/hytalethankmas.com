- change title to just "Hytale Thankmas"
- add a "get involved" or "become part of the team" section, which shows contact info and lists people that worked on thankmas (we are enough that a plain list doesnt work, so probably a scrolling pfp list or so)

## Before the event (placeholders to fill in)

- `src/utils/thankmas.ts`:
  - set real `streamStart` / `streamEnd` / `inGameEnd` / `afterStart` timestamps
  - replace `EVENT.streamUrl` with the real stream/channel link
  - replace the placeholder `PROGRAM` schedule with the real lineup
  - `src/utils/useLiveTotal.ts`: set `LIVE_TOTAL` on event day, and confirm `LIVE_GOAL`
- wire the live total to a real API (Tiltify or our own backend) — swap only `useLiveTotal.ts`

## After the event

- fill in the 2026 `amount` + remove `current: true` in `HISTORY` (after-phase sections pick it up automatically)
- add the 2026 VOD to the 2026 entry, and optional per-segment `vodUrl`s in `PROGRAM`

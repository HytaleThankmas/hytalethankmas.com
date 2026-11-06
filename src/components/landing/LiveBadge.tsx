export function LiveBadge({ label = 'Live now' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-gold-500/60 bg-gold-500/10 px-3 py-1.5 font-mono text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase">
      <span className="animate-flicker inline-block h-2 w-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(255,200,100,0.8)]" />
      {label}
    </span>
  )
}

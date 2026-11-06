import { useEffect, useRef } from 'react'

type Flake = {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  phase: number
  opacity: number
}

export function Snowfall({ density = 90 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let flakes: Array<Flake> = []
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      flakes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 2.2,
        speed: 0.25 + Math.random() * 0.9,
        drift: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.25 + Math.random() * 0.65,
      }))
    }

    let t = 0
    const tick = () => {
      t += 0.008
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#f6f0e0'
      for (const f of flakes) {
        f.y += f.speed
        f.x += Math.sin(t + f.phase) * f.drift * 0.4
        if (f.y > height + 4) {
          f.y = -4
          f.x = Math.random() * width
        }
        ctx.globalAlpha = f.opacity
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

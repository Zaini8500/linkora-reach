import { useEffect, useRef } from 'react'

/**
 * Animated publisher-network canvas: central LINKORA REACH node,
 * orbiting publisher nodes, animated connecting lines, floating
 * particles and pulsing gold highlights. Static frame when
 * prefers-reduced-motion is set.
 */
export default function NetworkVisual({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let w = 0
    let h = 0
    let t = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 9 }, (_, i) => {
      const angle = (i / 9) * Math.PI * 2
      const rx = 0.38
      const ry = 0.34
      return { angle, rx, ry, speed: 0.12 + (i % 3) * 0.04, size: 5 + (i % 3) * 2, gold: i % 3 === 0 }
    })
    const particles = Array.from({ length: 26 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + 0.6, s: 0.1 + Math.random() * 0.25,
    }))

    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2

      // Particles
      particles.forEach((p) => {
        const y = ((p.y + t * p.s * 0.2) % 1) * h
        ctx.beginPath()
        ctx.arc(p.x * w, y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(198,166,107,0.45)'
        ctx.fill()
      })

      // Outer orbit ring
      ctx.beginPath()
      ctx.ellipse(cx, cy, w * 0.42, h * 0.4, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.lineWidth = 1
      ctx.stroke()

      const pts = nodes.map((n) => {
        const a = n.angle + t * n.speed
        return { x: cx + Math.cos(a) * w * n.rx, y: cy + Math.sin(a) * h * n.ry, ...n }
      })

      // Connecting lines (animated dash)
      pts.forEach((p, i) => {
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = p.gold ? 'rgba(198,166,107,0.55)' : 'rgba(255,255,255,0.22)'
        ctx.setLineDash([5, 7])
        ctx.lineDashOffset = -t * 30
        ctx.lineWidth = 1
        ctx.stroke()
        const next = pts[(i + 1) % pts.length]
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(next.x, next.y)
        ctx.strokeStyle = 'rgba(255,255,255,0.10)'
        ctx.stroke()
      })
      ctx.setLineDash([])

      // Publisher nodes
      pts.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + 3, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? 'rgba(198,166,107,0.18)' : 'rgba(255,255,255,0.08)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? '#C6A66B' : '#F5F3EF'
        ctx.fill()
      })

      // Central glowing node
      const pulse = 1 + Math.sin(t * 2) * 0.06
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64 * pulse)
      grad.addColorStop(0, 'rgba(198,166,107,0.55)')
      grad.addColorStop(1, 'rgba(198,166,107,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 64 * pulse, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, 34, 0, Math.PI * 2)
      ctx.fillStyle = '#C6A66B'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, 34, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.fillStyle = '#14263D'
      ctx.font = '800 22px Manrope, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('L', cx, cy + 1)

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-[340px] w-full sm:h-[420px] lg:h-[480px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-14 rounded-full border border-gold/40 bg-navy-900/80 px-4 py-2 text-xs font-semibold tracking-widest text-gold backdrop-blur">
        LINKORA REACH
      </div>
    </div>
  )
}

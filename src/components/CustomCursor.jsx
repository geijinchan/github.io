import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const hlineRef = useRef(null)
  const vlineRef = useRef(null)
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const coordRef = useRef(null)
  const visible  = useRef(false)

  useEffect(() => {
    const hline = hlineRef.current
    const vline = vlineRef.current
    const dot   = dotRef.current
    const ring  = ringRef.current
    const coord = coordRef.current
    if (!hline || !vline || !dot) return

    // Lines trail a tiny bit behind the dot for a "plotting tool" feel
    const hY   = gsap.quickTo(hline, 'y', { duration: 0.18, ease: 'power2.out' })
    const vX   = gsap.quickTo(vline, 'x', { duration: 0.18, ease: 'power2.out' })
    const dotX = gsap.quickTo(dot,   'x', { duration: 0.07 })
    const dotY = gsap.quickTo(dot,   'y', { duration: 0.07 })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' })

    const show = () => {
      if (visible.current) return
      visible.current = true
      gsap.to([hline, vline, dot, ring, coord], { opacity: 1, duration: 0.35 })
    }
    const hide = () => {
      visible.current = false
      gsap.to([hline, vline, dot, ring, coord], { opacity: 0, duration: 0.3 })
    }

    const onMove = (e) => {
      show()
      const { clientX: x, clientY: y } = e

      hY(y)
      vX(x)
      // dot and ring are 10px wide — offset -5 centers them on cursor
      dotX(x - 5)
      dotY(y - 5)
      ringX(x - 14)
      ringY(y - 14)

      if (coord) {
        coord.textContent = `x:${Math.round(x)}  y:${Math.round(y)}`
        gsap.set(coord, { x: x + 18, y: y + 14 })
      }
    }

    // Hover state: dot expands into a ring, lines fade back
    const onOver = (e) => {
      const isClickable = e.target.closest('a, button, [role="button"], input, select, textarea')
      if (isClickable) {
        gsap.to(dot,  { scale: 0, duration: 0.2 })
        gsap.to(ring, { scale: 1.8, opacity: 0.7, duration: 0.25, ease: 'back.out(2)' })
        gsap.to([hline, vline], { opacity: 0.1, duration: 0.2 })
        gsap.to(coord, { opacity: 0, duration: 0.15 })
      } else {
        gsap.to(dot,  { scale: 1, duration: 0.2 })
        gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.2 })
        gsap.to([hline, vline], { opacity: 1, duration: 0.2 })
        gsap.to(coord, { opacity: 1, duration: 0.2 })
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseleave', hide)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseleave', hide)
    }
  }, [])

  return (
    <div className="cursor__root" aria-hidden="true">
      {/* Full-viewport axis lines */}
      <div ref={hlineRef} className="cursor__hline" />
      <div ref={vlineRef} className="cursor__vline" />
      {/* Outer ring — expands on hover over clickables */}
      <div ref={ringRef} className="cursor__ring" />
      {/* Precise center dot */}
      <div ref={dotRef} className="cursor__dot" />
      {/* Live coordinate readout */}
      <div ref={coordRef} className="cursor__coord" />
    </div>
  )
}

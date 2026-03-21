import { useRef, useEffect, useCallback } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './ScrollScaleCards.css'

const COLOR_VARIANTS = ['green', 'cyan', 'rose', 'violet', 'amber', 'emerald']

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

/* ── Single card with vanilla-tilt ── */
function ProjectCard({ project, index, color, onMount }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    onMount(index, node)
    VanillaTilt.init(node, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.18,
      scale: 1.02,
      perspective: 900,
    })
    return () => { node.vanillaTilt?.destroy(); onMount(index, null) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const padStr = String(index + 1).padStart(2, '0')

  return (
    <div ref={ref} className={`ssc__card ssc__card--${color}`}>
      <span className="ssc__card-ghost">{padStr}</span>
      <div className="ssc__card-header">
        <span className="ssc__card-tag">{padStr} / Project</span>
        <span className="ssc__card-icon">{project.icon}</span>
      </div>
      <h3 className="ssc__card-title">{project.title}</h3>
      <p className="ssc__card-subtitle">{project.subtitle}</p>
      <p className="ssc__card-desc">{project.description}</p>
      <div className="ssc__card-tags">
        {project.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="ssc__tag">{tag}</span>
        ))}
      </div>
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="ssc__card-link">
          <GithubIcon />
          View Code
        </a>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   SINGLE-COLUMN  (Projects page) — scroll-box mode
──────────────────────────────────────────────────────────── */
function SingleColumnScroll({ projects, label }) {
  const scrollRef   = useRef(null)
  const cardEls     = useRef({})
  const progressRef = useRef(null)
  const counterRef  = useRef(null)
  const SEG = 420

  const onMount = useCallback((i, node) => {
    if (node) cardEls.current[i] = node
    else delete cardEls.current[i]
  }, [])

  const onScroll = useCallback(() => {
    const sc = scrollRef.current
    if (!sc) return
    const st  = sc.scrollTop
    const sh  = sc.scrollHeight - sc.clientHeight
    if (progressRef.current) progressRef.current.style.width = `${sh > 0 ? st / sh * 100 : 0}%`

    const count  = projects.length
    const OFFSET = 60

    Object.entries(cardEls.current).forEach(([iStr, card]) => {
      if (!card) return
      const i = Number(iStr)
      const t = (st - OFFSET - i * SEG) / SEG
      let scale, opacity

      if (i === 0) {
        scale   = 1 + Math.max(0, Math.min(0.1, 0.1 - t * 0.1)) - Math.max(0, t * 0.12)
        opacity = Math.max(0.15, 1 - Math.max(0, t - 0.35) * 3)
      } else if (i === count - 1) {
        const enter = Math.max(0, Math.min(1, t + 1))
        scale   = 1.14 - enter * 0.14
        opacity = enter
      } else {
        const enter = Math.max(0, Math.min(1, t + 1))
        const exit  = Math.max(0, Math.min(1, t))
        scale   = (1.14 - enter * 0.14) * (1 - exit * 0.12)
        opacity = Math.max(0, enter - Math.max(0, exit - 0.35) * 3)
      }

      card.style.transform = `scale(${scale})`
      card.style.opacity   = opacity
    })

    if (counterRef.current) {
      const idx = Math.min(count, Math.max(1, Math.floor((st - OFFSET) / SEG) + 1))
      counterRef.current.textContent = `${idx} / ${count}`
    }
  }, [projects])

  useEffect(() => {
    const sc = scrollRef.current
    if (!sc) return
    sc.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => sc.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [projects])

  const trackH = 60 + projects.length * SEG + 60

  return (
    <div className="ssc">
      <div className="ssc__header">
        <span className="ssc__label">⬡ {label}</span>
        <span className="ssc__hint">↓ scroll to explore</span>
      </div>
      <div className="ssc__scroll" ref={scrollRef}>
        <div className="ssc__spacer" />
        <div style={{ height: trackH, position: 'relative' }}>
          {projects.map((p, i) => (
            <div key={p.id} className="ssc__card-wrap" style={{ top: i * SEG }}>
              <ProjectCard project={p} index={i}
                color={COLOR_VARIANTS[i % COLOR_VARIANTS.length]} onMount={onMount} />
            </div>
          ))}
        </div>
        <div className="ssc__spacer" />
      </div>
      <div className="ssc__progress">
        <div className="ssc__progress-fill" ref={progressRef} />
      </div>
      <div className="ssc__counter" ref={counterRef}>1 / {projects.length}</div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   TWO-COLUMN STICKY STACKING  (Home page)
   Like nikolaradeski.com — each pair stacks ON TOP of the
   previous as you scroll. Pure CSS sticky positioning with
   scale/opacity driven by scroll position.
──────────────────────────────────────────────────────────── */
function TwoColumnStack({ projects }) {
  const pairs = []
  for (let i = 0; i < projects.length; i += 2)
    pairs.push(projects.slice(i, i + 2))

  const trackRef  = useRef(null)
  const pairRefs  = useRef([])
  const cardEls   = useRef({})
  const SEG       = 560   // scroll pixels per pair transition
  const TOP_STACK = 60    // how much each pair peeks above the next

  const onMount = useCallback((globalIdx, node) => {
    if (node) cardEls.current[globalIdx] = node
    else delete cardEls.current[globalIdx]
  }, [])

  const onScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const rect    = track.getBoundingClientRect()
    const scrolled = Math.max(0, -rect.top)

    pairs.forEach((pair, pi) => {
      // How far into this pair's segment are we?
      const t = (scrolled - pi * SEG) / SEG   // -1..∞, active at 0..1

      pair.forEach((_, j) => {
        const globalIdx = pi * 2 + j
        const card = cardEls.current[globalIdx]
        if (!card) return

        let scale, translateY

        if (pi === 0) {
          // First pair: starts normal, shrinks as next pair comes in
          const shrink = Math.max(0, Math.min(1, t))
          scale      = 1 - shrink * 0.07
          translateY = 0
        } else {
          // Other pairs: start from below, slide up into place
          const enter = Math.max(0, Math.min(1, t + 1))
          const shrink = Math.max(0, Math.min(1, t))
          const yStart = 80   // pixels below
          translateY = yStart * (1 - enter)
          scale      = 1 - shrink * 0.07
        }

        card.style.transform = `translateY(${translateY}px) scale(${scale})`
        card.style.opacity   = pi === 0 ? 1
          : Math.max(0, Math.min(1, (t + 1) * 2))
      })
    })
  }, [pairs])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Total track height: enough scroll space for all pair transitions
  const trackH = pairs.length * SEG + 600

  return (
    <div ref={trackRef} className="ssc__stack-track" style={{ height: trackH }}>
      {pairs.map((pair, pi) => (
        <div
          key={pi}
          className="ssc__stack-row"
          style={{ top: pi * TOP_STACK }}  // sticky top offset creates peek effect
        >
          <div className="ssc__stack-pair">
            {pair.map((project, j) => {
              const globalIdx = pi * 2 + j
              const color = COLOR_VARIANTS[globalIdx % COLOR_VARIANTS.length]
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={globalIdx}
                  color={color}
                  onMount={onMount}
                />
              )
            })}
            {pair.length === 1 && <div className="ssc__stack-ghost-card" />}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Public API ── */
export default function ScrollScaleCards({ projects, label = 'Portfolio', columns = 1 }) {
  if (columns === 2) return <TwoColumnStack projects={projects} />
  return <SingleColumnScroll projects={projects} label={label} />
}

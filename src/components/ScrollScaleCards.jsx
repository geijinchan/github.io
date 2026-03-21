import { useRef, useEffect, useCallback } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './ScrollScaleCards.css'

const COLOR_VARIANTS = ['green', 'cyan', 'rose', 'violet', 'amber', 'emerald']

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

/* ── Single card — mounts tilt, stores its own DOM ref ── */
function ProjectCard({ project, index, color, onMount }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Tell parent our DOM node immediately after mount
    onMount(index, node)

    VanillaTilt.init(node, {
      max: 14,
      speed: 400,
      glare: true,
      'max-glare': 0.22,
      scale: 1.02,
      perspective: 800,
    })

    return () => {
      node.vanillaTilt?.destroy()
      onMount(index, null)
    }
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
   SINGLE-COLUMN  (Projects page)
   Self-contained scroll box, all N cards one per segment.
──────────────────────────────────────────────────────────── */
function SingleColumnScroll({ projects, label }) {
  const scrollRef  = useRef(null)
  const cardEls    = useRef({})         // { index -> DOM node }
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
    const scrollTop  = sc.scrollTop
    const scrollH    = sc.scrollHeight - sc.clientHeight
    const progress   = scrollH > 0 ? scrollTop / scrollH : 0
    const count      = projects.length
    const OFFSET     = 60

    if (progressRef.current)
      progressRef.current.style.width = `${progress * 100}%`

    Object.entries(cardEls.current).forEach(([iStr, card]) => {
      if (!card) return
      const i = Number(iStr)
      const t = (scrollTop - OFFSET - i * SEG) / SEG
      let scale, opacity

      if (i === 0) {
        scale   = lerp(1.1, 0.9, t)
        opacity = lerp(1,   0.1, Math.max(0, t - 0.35) * 3)
      } else if (i === count - 1) {
        const enter = Math.max(0, Math.min(1, t + 1))
        scale   = lerp(1.14, 1.0, enter)
        opacity = lerp(0,    1,   enter)
      } else {
        const enter = Math.max(0, Math.min(1, t + 1))
        const exit  = Math.max(0, Math.min(1, t))
        scale   = lerp(lerp(1.14, 1.0, enter), 0.9,  exit)
        opacity = lerp(lerp(0,    1,   enter), 0.1, Math.max(0, exit - 0.35) * 3)
      }

      card.style.transform = `scale(${scale})`
      card.style.opacity   = opacity
    })

    if (counterRef.current) {
      const idx = Math.min(count, Math.max(1,
        Math.floor((scrollTop - OFFSET) / SEG) + 1))
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
              <ProjectCard
                project={p}
                index={i}
                color={COLOR_VARIANTS[i % COLOR_VARIANTS.length]}
                onMount={onMount}
              />
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
   TWO-COLUMN  (Featured / Home page)
   Uses the PAGE scroll (window). Cards arranged in pairs,
   each pair stacks together as you scroll.
──────────────────────────────────────────────────────────── */
function TwoColumnScroll({ projects }) {
  // Group into pairs [ [p0,p1], [p2,p3], ... ]
  const pairs = []
  for (let i = 0; i < projects.length; i += 2)
    pairs.push(projects.slice(i, i + 2))

  // One DOM ref per card
  const cardEls = useRef({})
  // One wrapper ref per pair (for sticky positioning)
  const pairWrapRefs = useRef({})
  const containerRef = useRef(null)
  const SEG = 480        // scroll distance per pair
  const CARD_SEG = 480   // same, cards in a pair move together

  const onMount = useCallback((i, node) => {
    if (node) cardEls.current[i] = node
    else delete cardEls.current[i]
  }, [])

  const onScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    // scrolled distance inside this section (relative to the top of the section)
    const scrolled = Math.max(0, -rect.top)
    const OFFSET = 0

    projects.forEach((_, i) => {
      const card = cardEls.current[i]
      if (!card) return

      const pairIdx = Math.floor(i / 2)
      const t = (scrolled - OFFSET - pairIdx * SEG) / CARD_SEG

      let scale, opacity
      const isLastPair = pairIdx === pairs.length - 1

      if (pairIdx === 0 && pairs.length === 1) {
        // only one pair
        scale   = lerp(1.06, 1.0, Math.max(0, Math.min(1, t)))
        opacity = 1
      } else if (pairIdx === 0) {
        scale   = lerp(1.08, 0.9,  Math.max(0, Math.min(1, t)))
        opacity = lerp(1,    0.15, Math.max(0, t - 0.4) * 3)
      } else if (isLastPair) {
        const enter = Math.max(0, Math.min(1, t + 1))
        scale   = lerp(1.12, 1.0, enter)
        opacity = lerp(0,    1,   enter)
      } else {
        const enter = Math.max(0, Math.min(1, t + 1))
        const exit  = Math.max(0, Math.min(1, t))
        scale   = lerp(lerp(1.12, 1.0, enter), 0.9,  exit)
        opacity = lerp(lerp(0,    1,   enter), 0.15, Math.max(0, exit - 0.4) * 3)
      }

      card.style.transform = `scale(${scale})`
      card.style.opacity   = opacity
    })
  }, [projects, pairs.length])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Total height of the scroll track = pairs * SEG + viewport for last pair
  const trackH = pairs.length * SEG + 560

  return (
    <div
      ref={containerRef}
      className="ssc__two-col-container"
      style={{ height: trackH }}
    >
      {/* Sticky viewport that stays in view while scrolling through */}
      <div className="ssc__two-col-sticky">
        {/* Pair wrappers — all live in the same sticky area, positioned by transform */}
        <div className="ssc__two-col-grid">
          {pairs.map((pair, pairIdx) => (
            <div
              key={pairIdx}
              ref={(el) => { pairWrapRefs.current[pairIdx] = el }}
              className="ssc__two-col-pair"
            >
              {pair.map((project, j) => {
                const globalIdx = pairIdx * 2 + j
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
              {/* Fill empty slot if odd number of projects */}
              {pair.length === 1 && <div className="ssc__card-placeholder" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Public API ── */
export default function ScrollScaleCards({ projects, label = 'Portfolio', columns = 1 }) {
  if (columns === 2) return <TwoColumnScroll projects={projects} />
  return <SingleColumnScroll projects={projects} label={label} />
}

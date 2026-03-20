import { useRef, useEffect, useState, useCallback } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './ScrollScaleCards.css'

const COLOR_VARIANTS = ['green', 'cyan', 'rose', 'violet', 'amber', 'emerald']

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

/* ── Single tilt-enabled card ── */
function TiltCard({ children, className, cardRef }) {
  const innerRef = useRef(null)

  useEffect(() => {
    const node = innerRef.current
    if (!node) return

    VanillaTilt.init(node, {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.25,
      scale: 1.02,
      perspective: 800,
    })

    return () => node.vanillaTilt?.destroy()
  }, [])

  // Expose DOM node to parent
  useEffect(() => {
    if (cardRef) cardRef(innerRef.current)
  }, [cardRef])

  return (
    <div ref={innerRef} className={className}>
      {children}
    </div>
  )
}

/* ── GitHub icon SVG ── */
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

/* ── Main scroll-scale component ── */
export default function ScrollScaleCards({ projects, label = 'Portfolio' }) {
  const scrollRef = useRef(null)
  const cardElsRef = useRef([])
  const progressRef = useRef(null)
  const counterRef = useRef(null)

  const segHeight = 400

  const handleScroll = useCallback(() => {
    const sc = scrollRef.current
    if (!sc) return

    const scrollTop = sc.scrollTop
    const scrollHeight = sc.scrollHeight - sc.clientHeight
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
    const count = projects.length
    const offset = 60

    // Update progress bar
    if (progressRef.current) {
      progressRef.current.style.width = (progress * 100) + '%'
    }

    // Update each card's transform
    cardElsRef.current.forEach((card, i) => {
      if (!card) return

      const cardStart = offset + i * segHeight
      const t = (scrollTop - cardStart) / segHeight

      let scale, opacity
      if (i === 0) {
        scale = lerp(1.1, 0.88, t)
        opacity = lerp(1, 0.2, Math.max(0, t - 0.4) * 2.5)
      } else if (i === count - 1) {
        const enterT = Math.max(0, Math.min(1, t + 1))
        scale = lerp(1.15, 1.0, enterT)
        opacity = lerp(0, 1, enterT)
      } else {
        const enterT = Math.max(0, Math.min(1, t + 1))
        const exitT = Math.max(0, Math.min(1, t))
        scale = lerp(lerp(1.15, 1.0, enterT), 0.88, exitT)
        opacity = lerp(
          lerp(0, 1, enterT),
          0.2,
          Math.max(0, exitT - 0.4) * 2.5
        )
      }

      card.style.transform = `scale(${scale})`
      card.style.opacity = opacity
    })

    // Update counter
    if (counterRef.current) {
      const activeIdx = Math.min(
        count,
        Math.max(1, Math.floor((scrollTop - offset) / segHeight) + 1)
      )
      counterRef.current.textContent = `${activeIdx} / ${count}`
    }
  }, [projects])

  // Attach scroll listener
  useEffect(() => {
    const sc = scrollRef.current
    if (!sc) return

    // Reset card refs array size
    cardElsRef.current = cardElsRef.current.slice(0, projects.length)

    sc.addEventListener('scroll', handleScroll, { passive: true })
    // Run once to set initial state
    handleScroll()
    return () => sc.removeEventListener('scroll', handleScroll)
  }, [handleScroll, projects])

  // Reset scroll position when projects list changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [projects])

  const totalTrackHeight = 60 + projects.length * segHeight + 60
  const count = projects.length

  return (
    <div className="ssc">
      {/* Header bar */}
      <div className="ssc__header">
        <span className="ssc__label">⬡ {label}</span>
        <span className="ssc__hint">↓ scroll inside to explore</span>
      </div>

      {/* Scrollable area */}
      <div className="ssc__scroll" ref={scrollRef}>
        <div className="ssc__spacer" />

        <div style={{ height: totalTrackHeight, position: 'relative' }}>
          {projects.map((project, i) => {
            const color = COLOR_VARIANTS[i % COLOR_VARIANTS.length]
            const padStr = String(i + 1).padStart(2, '0')

            return (
              <div
                key={project.id}
                className="ssc__card-wrap"
                style={{ top: i * segHeight }}
              >
                <TiltCard
                  className={`ssc__card ssc__card--${color}`}
                  cardRef={(el) => { cardElsRef.current[i] = el }}
                >
                  {/* Ghost watermark number */}
                  <span className="ssc__card-ghost">{padStr}</span>

                  {/* Header row */}
                  <div className="ssc__card-header">
                    <span className="ssc__card-tag">
                      {padStr} / Project
                    </span>
                    <span className="ssc__card-icon">{project.icon}</span>
                  </div>

                  {/* Title + subtitle */}
                  <h3 className="ssc__card-title">{project.title}</h3>
                  <p className="ssc__card-subtitle">{project.subtitle}</p>

                  {/* Description */}
                  <p className="ssc__card-desc">{project.description}</p>

                  {/* Tags */}
                  <div className="ssc__card-tags">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="ssc__tag">{tag}</span>
                    ))}
                  </div>

                  {/* GitHub link */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ssc__card-link"
                    >
                      <GithubIcon />
                      View Code
                    </a>
                  )}
                </TiltCard>
              </div>
            )
          })}
        </div>

        <div className="ssc__spacer" />
      </div>

      {/* Progress bar */}
      <div className="ssc__progress">
        <div className="ssc__progress-fill" ref={progressRef} />
      </div>

      {/* Counter */}
      <div className="ssc__counter" ref={counterRef}>
        1 / {count}
      </div>
    </div>
  )
}

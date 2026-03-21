import { useRef, useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt'
import './GlassProjectGrid.css'

const COLOR_VARIANTS = ['green', 'cyan', 'rose', 'violet', 'amber', 'emerald']

/* ── Single tilt-enabled glass card ── */
function GlassCard({ project, index, color }) {
  const cardRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = cardRef.current
    if (!node) return

    VanillaTilt.init(node, {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02,
      perspective: 900,
    })

    // Intersection Observer for scroll-triggered entrance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          node.classList.add('gpg__card--visible')
        }
      },
      { threshold: 0.15, rootMargin: '-40px' }
    )
    observer.observe(node)

    return () => {
      node.vanillaTilt?.destroy()
      observer.disconnect()
    }
  }, [])

  const padStr = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={cardRef}
      className={`gpg__card gpg__card--${color}`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      {/* Ghost watermark */}
      <span className="gpg__ghost">{padStr}</span>

      {/* Header */}
      <div className="gpg__card-header">
        <span className="gpg__card-tag">{padStr} / Project</span>
        <span className="gpg__card-icon">{project.icon}</span>
      </div>

      {/* Content */}
      <h3 className="gpg__card-title">{project.title}</h3>
      <p className="gpg__card-subtitle">{project.subtitle}</p>
      <p className="gpg__card-desc">{project.description}</p>

      {/* Tags */}
      <div className="gpg__card-tags">
        {project.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="gpg__tag">{tag}</span>
        ))}
      </div>

      {/* Link */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="gpg__card-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          View Code
        </a>
      )}
    </div>
  )
}

/* ── Main grid component ── */
export default function GlassProjectGrid({ projects }) {
  return (
    <div className="gpg">
      {projects.map((project, i) => (
        <GlassCard
          key={project.id}
          project={project}
          index={i}
          color={COLOR_VARIANTS[i % COLOR_VARIANTS.length]}
        />
      ))}
    </div>
  )
}

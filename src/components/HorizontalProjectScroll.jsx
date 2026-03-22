import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VanillaTilt from 'vanilla-tilt'
import './HorizontalProjectScroll.css'

gsap.registerPlugin(ScrollTrigger)

const COLORS = ['green', 'cyan', 'rose', 'violet', 'amber', 'emerald']

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function ProjectCard({ project, index, color }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    VanillaTilt.init(node, { max: 10, speed: 400, glare: true, 'max-glare': 0.18, scale: 1.02 })
    return () => node.vanillaTilt?.destroy()
  }, [])

  const pad = String(index + 1).padStart(2, '0')

  return (
    <div ref={ref} className={`hps__card hps__card--${color}`}>
      <span className="hps__card-ghost">{pad}</span>
      <div className="hps__card-header">
        <span className="hps__card-tag">{pad} / Project</span>
        <span className="hps__card-icon">{project.icon}</span>
      </div>
      <h3 className="hps__card-title">{project.title}</h3>
      <p className="hps__card-subtitle">{project.subtitle}</p>
      <p className="hps__card-desc">{project.description}</p>
      <div className="hps__card-tags">
        {project.tags.slice(0, 4).map((t) => <span key={t} className="hps__tag">{t}</span>)}
      </div>
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hps__card-link">
          <GithubIcon /> View Code
        </a>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   HorizontalProjectScroll
   • Section pins to viewport using GSAP ScrollTrigger
   • Cards arranged horizontally; scrubbing scrolls them right → left
   • ScrollTrigger is killed and recreated when `projects` changes (filter)
────────────────────────────────────────────────────────────────────────── */
export default function HorizontalProjectScroll({ projects }) {
  const sectionRef = useRef(null)
  const stripRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const strip   = stripRef.current
    if (!section || !strip) return

    const ctx = gsap.context(() => {
      // Give DOM time to render the new cards before measuring
      requestAnimationFrame(() => {
        const totalScrollX = strip.scrollWidth - strip.clientWidth

        if (totalScrollX > 0) {
          gsap.to(strip, {
            x: -totalScrollX,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1.2,
              start: 'top top',
              end: () => `+=${totalScrollX + 200}`,
              invalidateOnRefresh: true,
            },
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [projects]) // Re-run when filter changes

  if (projects.length === 0) {
    return (
      <div className="hps hps--empty">
        <p>No projects found for this filter.</p>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="hps">
      {/* Hint bar */}
      <div className="hps__meta">
        <span className="hps__meta-count">{projects.length} Projects</span>
        <span className="hps__meta-hint">← scroll to explore →</span>
      </div>

      {/* Horizontal strip */}
      <div ref={stripRef} className="hps__strip">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            color={COLORS[i % COLORS.length]}
          />
        ))}
      </div>
    </div>
  )
}

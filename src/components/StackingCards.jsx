import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VanillaTilt from 'vanilla-tilt'
import './StackingCards.css'

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
    VanillaTilt.init(node, { max: 8, speed: 400, glare: true, 'max-glare': 0.15, scale: 1.01 })
    return () => node.vanillaTilt?.destroy()
  }, [])

  const pad = String(index + 1).padStart(2, '0')

  return (
    <div ref={ref} className={`sc__card sc__card--${color}`}>
      <span className="sc__card-ghost">{pad}</span>
      <div className="sc__card-header">
        <span className="sc__card-tag">{pad} / Project</span>
        <span className="sc__card-icon">{project.icon}</span>
      </div>
      <h3 className="sc__card-title">{project.title}</h3>
      <p className="sc__card-subtitle">{project.subtitle}</p>
      <p className="sc__card-desc">{project.description}</p>
      <div className="sc__card-tags">
        {project.tags.slice(0, 5).map((t) => <span key={t} className="sc__tag">{t}</span>)}
      </div>
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="sc__card-link">
          <GithubIcon /> View Code
        </a>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   StackingCards
   • Section pins to viewport via GSAP ScrollTrigger
   • The header (label + title + subtitle) stays frozen at the top
   • Each pair of cards slides up from the bottom and stacks on the previous
────────────────────────────────────────────────────────────────────────── */
export default function StackingCards({ projects }) {
  const sectionRef = useRef(null)

  // Chunk projects into pairs
  const pairs = []
  for (let i = 0; i < projects.length; i += 2)
    pairs.push(projects.slice(i, i + 2))

  const SCROLL_PER_PAIR = 720  // px of scroll each pair takes to enter

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const pairEls = gsap.utils.toArray('.sc__pair', section)

      // All pairs start translated 110% below their natural position (off-screen bottom)
      gsap.set(pairEls, { yPercent: 110 })

      // One timeline scrubbed to the entire scroll window
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          start: 'top top',
          end: `+=${SCROLL_PER_PAIR * pairs.length}`,
        },
      })

      pairEls.forEach((pair, i) => {
        // Bring this pair in
        tl.to(pair, { yPercent: 0, duration: 1 }, i)
        // Slightly scale back previous pairs to create physical stack depth
        for (let j = 0; j < i; j++) {
          const depth = i - j
          tl.to(pairEls[j], { scale: 1 - depth * 0.04, duration: 1 }, i)
        }
      })
    }, section)

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs.length])

  return (
    <div ref={sectionRef} className="sc">
      {/* ── Frozen header ── */}
      <div className="sc__head">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="sc__subtitle">
          A selection of my most impactful work in AI, ML, and data science.
        </p>
      </div>

      {/* ── Cards area — pairs emerge from here ── */}
      <div className="sc__cards-area">
        {pairs.map((pair, pi) => (
          <div
            key={pi}
            className="sc__pair"
            style={{ zIndex: pi + 1 }}
          >
            {pair.map((project, j) => {
              const gi = pi * 2 + j
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={gi}
                  color={COLORS[gi % COLORS.length]}
                />
              )
            })}
            {/* Spacer if odd number */}
            {pair.length === 1 && <div />}
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="sc__cta">
        <Link to="/projects" className="btn btn-outline">View All Projects →</Link>
      </div>
    </div>
  )
}

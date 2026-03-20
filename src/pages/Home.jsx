import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects, experience, skills, socialLinks } from '../data/projects'
import './Home.css'

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const PARTICLE_COUNT = 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.5 + 0.1
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`
        ctx.fill()
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      drawLines()
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__particles" />
}

/* ── Typing animation ── */
function TypingText() {
  const roles = [
    'Data Scientist',
    'AI Engineer',
    'ML Ops Practitioner',
    'GenAI Builder',
    'RAG Specialist',
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setCharIndex((c) => c + 1)
          } else {
            setTimeout(() => setDeleting(true), 1500)
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1)
          } else {
            setDeleting(false)
            setRoleIndex((r) => (r + 1) % roles.length)
          }
        }
      },
      deleting ? 40 : 80
    )
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  return (
    <span className="hero__typing">
      {roles[roleIndex].slice(0, charIndex)}
      <span className="hero__cursor">|</span>
    </span>
  )
}

/* ── Stats ── */
function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Built' },
    { value: '1', label: 'IEEE Publication' },
    { value: '24', label: 'GitHub Repos' },
  ]

  return (
    <section ref={ref} className="stats section">
      <div className="container stats__grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stats__item glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <span className="stats__value gradient-text">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ── Home page ── */
export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero__greeting', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
      })
      gsap.from('.hero__name', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scale: 0.95,
      })
      gsap.from('.hero__role', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.6,
      })
      gsap.from('.hero__desc', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.8,
      })
      gsap.from('.hero__actions', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 1.0,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const featured = projects.filter((p) => p.featured).slice(0, 6)

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        <ParticleCanvas />
        <div className="container hero__content">
          <p className="hero__greeting">
            <span className="hero__wave">👋</span> Hey, I'm
          </p>
          <h1 className="hero__name">
            Abhishek<span className="hero__dot">.</span>
          </h1>
          <h2 className="hero__role">
            <TypingText />
          </h2>
          <p className="hero__desc">
            Data Scientist with expertise in RAG systems, LLMs, deep learning,
            and production ML. I build AI-powered products from zero to
            production on AWS &amp; Azure.
          </p>
          <div className="hero__actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="./March2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Download Resume
            </a>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="hero__scroll-dot"
          />
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsSection />

      {/* ── Featured Projects ── */}
      <section className="featured section">
        <div className="container">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of my most impactful work in AI, ML, and data science.
          </p>

          <div className="featured__grid">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="featured__cta">
            <Link to="/projects" className="btn btn-outline">
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Experience preview ── */}
      <section className="exp-preview section">
        <div className="container">
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            Where I've <span className="gradient-text">Worked</span>
          </h2>

          <div className="exp-preview__list">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="exp-preview__item glass-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="exp-preview__dot" />
                <div className="exp-preview__content">
                  <span className="exp-preview__period">{exp.period}</span>
                  <h3 className="exp-preview__role">{exp.role}</h3>
                  <p className="exp-preview__company">{exp.company}</p>
                  <p className="exp-preview__desc">{exp.description}</p>
                  <div className="exp-preview__tags">
                    {exp.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="featured__cta">
            <Link to="/about" className="btn btn-outline">
              More About Me →
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

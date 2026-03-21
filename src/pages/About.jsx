import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import HorizontalTimeline from '../components/HorizontalTimeline.jsx'
import {
  experience,
  education,
  skills,
  certifications,
} from '../data/projects'
import './About.css'

/* ── Skill bar ── */
function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <div ref={ref} className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay * 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function About() {
  return (
    <PageTransition>
      {/* ── Intro ── */}
      <section className="about-hero section">
        <div className="container">
          <span className="section-label">About me</span>
          <h1 className="section-title">
            Passionate about building{' '}
            <span className="gradient-text">intelligent systems</span>
          </h1>
          <div className="about-hero__content">
            <div className="about-hero__text">
              <p>
                I'm Abhishek, a Data Scientist and AI Engineer from Kanpur,
                India. I specialize in building production-grade AI systems —
                from retrieval-augmented generation (RAG) pipelines and LLM
                orchestration to end-to-end ML deployments on AWS and Azure.
              </p>
              <p>
                Currently working as a Founding Engineer at a startup, building
                AI-powered products from the ground up using serverless
                architectures, reinforcement learning, and semantic search. I'm
                driven by the mission to transform complex data into intelligent,
                deployed solutions.
              </p>
              <p>
                My work spans deep learning, NLP, computer vision, generative AI,
                and MLOps. I've published research in IEEE Xplore and built
                systems that serve real users in production.
              </p>
            </div>
            <div className="about-hero__highlights">
              <div className="about-hero__highlight glass-card">
                <span className="about-hero__highlight-icon">🎓</span>
                <span className="about-hero__highlight-text">M.Sc Data Science</span>
              </div>
              <div className="about-hero__highlight glass-card">
                <span className="about-hero__highlight-icon">📄</span>
                <span className="about-hero__highlight-text">IEEE Xplore Published</span>
              </div>
              <div className="about-hero__highlight glass-card">
                <span className="about-hero__highlight-icon">🚀</span>
                <span className="about-hero__highlight-text">Founding Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="skills-section section">
        <div className="container">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>

          <div className="skills-section__grid">
            {Object.entries(skills).map(([category, items], catIdx) => (
              <motion.div
                key={category}
                className="skills-section__category glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: catIdx * 0.1, duration: 0.5 }}
              >
                <h3 className="skills-section__category-title">{category}</h3>
                <div className="skills-section__bars">
                  {items.map((skill, skillIdx) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={skillIdx}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience timeline ── */}
      <section className="timeline-section section">
        <div className="container">
          <span className="section-label">Career</span>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>
        <HorizontalTimeline items={experience} />
      </section>

      {/* ── Education ── */}
      <section className="education-section section">
        <div className="container">
          <span className="section-label">Education</span>
          <h2 className="section-title">
            Academic <span className="gradient-text">Background</span>
          </h2>

          <div className="education-section__grid">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                className="education-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="education-card__badge">🎓</div>
                <h3 className="education-card__degree">{edu.degree}</h3>
                <p className="education-card__institution">{edu.institution}</p>
                <p className="education-card__location">{edu.location}</p>
                <span className="education-card__period">{edu.period}</span>
                <span className="tag" style={{ marginTop: '0.75rem' }}>
                  {edu.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="certs-section section">
        <div className="container">
          <span className="section-label">Certifications</span>
          <h2 className="section-title">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <div className="certs-section__grid">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                className="cert-badge glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <span className="cert-badge__icon">🏆</span>
                <span>{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

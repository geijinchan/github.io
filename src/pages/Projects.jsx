import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/projects'
import './Projects.css'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'rag', label: 'RAG & LLMs' },
  { key: 'ml', label: 'ML & DL' },
  { key: 'mlops', label: 'MLOps' },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <PageTransition>
      <section className="projects-page section">
        <div className="container">
          <span className="section-label">Portfolio</span>
          <h1 className="section-title">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="section-subtitle">
            Explore my work across RAG systems, machine learning, deep learning,
            and MLOps.
          </p>

          {/* Filter tabs */}
          <div className="projects-page__filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`projects-page__filter ${
                  activeFilter === cat.key
                    ? 'projects-page__filter--active'
                    : ''
                }`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
                {activeFilter === cat.key && (
                  <motion.div
                    className="projects-page__filter-bg"
                    layoutId="filter-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            className="projects-page__grid"
            layout
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

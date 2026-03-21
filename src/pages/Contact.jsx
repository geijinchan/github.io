import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import { socialLinks } from '../data/projects'
import './Contact.css'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')   // idle | sending | sent | error
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' })

  function onChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setFields({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <section className="contact-page section">
        <div className="container">
          <span className="section-label">Get in touch</span>
          <h1 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="section-subtitle">
            I'm always open to discussing new projects, collaborations, or opportunities in AI and data science.
          </p>

          <div className="contact-page__grid">
            {/* Contact info cards */}
            <div className="contact-page__cards">
              <motion.a
                href={`mailto:${socialLinks.email}`}
                className="contact-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="contact-card__icon">📧</div>
                <h3 className="contact-card__title">Email</h3>
                <p className="contact-card__value">{socialLinks.email}</p>
              </motion.a>

              <motion.div
                className="contact-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="contact-card__icon">📍</div>
                <h3 className="contact-card__title">Location</h3>
                <p className="contact-card__value">{socialLinks.location}</p>
              </motion.div>

              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="contact-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h3 className="contact-card__title">GitHub</h3>
                <p className="contact-card__value">geijinchan</p>
              </motion.a>
            </div>

            {/* Contact form */}
            <motion.div
              className="contact-form-wrap glass-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="contact-form__title">Send a Message</h3>
              <p className="contact-form__sub">I'll get back to you within 24 hours.</p>

              <form ref={formRef} className="contact-form" onSubmit={onSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="cf-name">Name</label>
                    <input
                      id="cf-name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={fields.name}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="cf-email">Email</label>
                    <input
                      id="cf-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={fields.email}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="cf-phone">Phone <span className="optional">(optional)</span></label>
                  <input
                    id="cf-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 xxxxxxxxxx"
                    value={fields.phone}
                    onChange={onChange}
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={fields.message}
                    onChange={onChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-form__btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>

                {status === 'sent' && (
                  <p className="contact-form__feedback contact-form__feedback--ok">
                    ✅ Message sent! I'll reply soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="contact-form__feedback contact-form__feedback--err">
                    ⚠️ Something went wrong. Email me directly at {socialLinks.email}
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HorizontalTimeline.css'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalTimeline({ items }) {
  const sectionRef  = useRef(null)
  const stripRef    = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const strip   = stripRef.current
    if (!section || !strip) return

    // Kill any lingering triggers on re-render
    const ctx = gsap.context(() => {
      const totalScroll = strip.scrollWidth - strip.clientWidth

      gsap.to(strip, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${totalScroll + 300}`,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [items])

  return (
    <div ref={sectionRef} className="htl">
      {/* Year label that changes as you scroll — decorative */}
      <div className="htl__meta">
        <span className="htl__meta-label">Scroll →</span>
        <span className="htl__meta-hint">time goes backwards</span>
      </div>

      <div ref={stripRef} className="htl__strip">
        {/* Horizontal line */}
        <div className="htl__line" />

        {items.map((item, i) => {
          const isEven = i % 2 === 0
          return (
            <div key={item.id ?? i} className={`htl__item ${isEven ? 'htl__item--top' : 'htl__item--bottom'}`}>
              {/* Card */}
              <div className="htl__card glass-card">
                <span className="htl__period">{item.period}</span>
                <h3 className="htl__role">{item.role}</h3>
                <p className="htl__company">{item.company}</p>
                <p className="htl__desc">{item.description}</p>
                <div className="htl__tags">
                  {item.technologies?.slice(0, 4).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Dot on the line */}
              <div className="htl__dot-wrap">
                <div className="htl__dot" />
                <div className="htl__dot-year">{item.period?.split('–')[0]?.trim()}</div>
              </div>
            </div>
          )
        })}

        {/* End cap */}
        <div className="htl__end">
          <div className="htl__end-dot" />
          <span className="htl__end-label">The Beginning</span>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Reveal, { SectionHeading } from './Reveal.jsx'

// PLACEHOLDERS ONLY — replace with genuine client testimonials.
// Do not present these as real clients, quotes or ratings.
const PLACEHOLDERS = [
  {
    badge: 'Sample Placeholder 1',
    text: '[Sample placeholder — replace this with a genuine client testimonial once one is supplied. Do not publish this text as a real client quote.]',
    who: 'Placeholder Client',
    role: 'SEO Agency — placeholder',
  },
  {
    badge: 'Sample Placeholder 2',
    text: '[Sample placeholder — replace this with a genuine client testimonial once one is supplied. Do not publish this text as a real client quote.]',
    who: 'Placeholder Client',
    role: 'SaaS Company — placeholder',
  },
  {
    badge: 'Sample Placeholder 3',
    text: '[Sample placeholder — replace this with a genuine client testimonial once one is supplied. Do not publish this text as a real client quote.]',
    who: 'Placeholder Client',
    role: 'Growing Business — placeholder',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % PLACEHOLDERS.length), 7000)
    return () => clearInterval(id)
  }, [paused])

  const current = PLACEHOLDERS[index]
  return (
    <section className="bg-ivory py-20 lg:py-28" aria-label="Testimonials">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What Our Partners Say" description="Testimonials below are clearly marked sample placeholders until genuine client feedback is supplied." />
        <Reveal delay={150}>
          <div
            className="relative mt-12 rounded-[2rem] border border-navy/10 bg-white p-8 text-center shadow-card sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="inline-block rounded-full bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark">
              {current.badge}
            </span>
            <Quote className="mx-auto mt-6 h-8 w-8 text-gold" aria-hidden="true" />
            <blockquote key={index} className="mt-4 min-h-[96px] font-heading text-xl font-bold leading-relaxed text-navy sm:text-2xl">
              {current.text}
            </blockquote>
            <p className="mt-6 text-sm font-bold text-navy">{current.who}</p>
            <p className="text-sm text-slate-light">{current.role}</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button type="button" onClick={() => setIndex((index - 1 + PLACEHOLDERS.length) % PLACEHOLDERS.length)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-gold hover:bg-gold hover:text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
                {PLACEHOLDERS.map((p, i) => (
                  <button key={p.badge} type="button" role="tab" aria-selected={i === index} aria-label={`Testimonial ${i + 1}`} onClick={() => setIndex(i)} className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-gold' : 'w-2.5 bg-navy/20 hover:bg-navy/40'}`} />
                ))}
              </div>
              <button type="button" onClick={() => setIndex((index + 1) % PLACEHOLDERS.length)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-gold hover:bg-gold hover:text-white">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

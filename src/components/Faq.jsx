import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Reveal, { SectionHeading } from './Reveal.jsx'

const FAQS = [
  { q: 'What is guest posting?', a: 'Guest posting is publishing an original, relevant article on another website in your niche, usually with a link back to your own site. It helps you reach a new audience and build authority through a relevant, editorial placement.' },
  { q: 'What is link building?', a: 'Link building is earning links from other relevant websites to your pages. Those links act as signals of relevance and trust, and — when they come from genuinely relevant, quality publishers — they support your wider SEO and visibility work. We do not promise guaranteed rankings or traffic.' },
  { q: 'How does your publisher outreach process work?', a: 'We start by understanding your goals, industry and target pages, then research relevant publishers, share suitable options and transparent pricing for your approval, prepare original content, coordinate publication, verify the live placement and report it clearly.' },
  { q: 'Do you provide white-label link-building services?', a: 'Yes. We provide discreet, white-label publisher outreach and link-building fulfilment for SEO agencies and digital marketing professionals, with organised reporting you can share under your own brand.' },
  { q: 'Can I review publishers before approving a placement?', a: 'Yes. We share suitable publisher options and transparent pricing before anything is published, so you can approve the opportunities that fit your goals.' },
  { q: 'Do you provide content writing?', a: 'Yes. We prepare original, relevant content that follows each publisher’s editorial requirements, as part of our guest posting and publisher placement services.' },
  { q: 'Which industries do you serve?', a: 'We work across a wide range of industries for SEO agencies, SaaS companies, digital marketers and growing businesses. Relevance is the deciding factor — if a publisher is not a genuine fit for your niche, we will not recommend it. Tell us your industry in the proposal form and we will review suitable opportunities.' },
  { q: 'How do I get a custom quotation?', a: 'Complete the proposal form below with your website, target pages, required service and monthly budget. Our team will review your requirements and share suitable outreach opportunities and pricing.' },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-12 space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`overflow-hidden rounded-2xl border transition ${isOpen ? 'border-gold/60 shadow-card' : 'border-navy/10'}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 bg-white px-6 py-5 text-left"
                  >
                    <span className="font-heading text-base font-extrabold text-navy sm:text-lg">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div id={`faq-panel-${i}`} className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-slate sm:text-base">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

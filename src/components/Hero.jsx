import { useEffect, useState } from 'react'
import { ArrowRight, Compass } from 'lucide-react'
import Reveal from './Reveal.jsx'
import NetworkVisual from './NetworkVisual.jsx'

const HIGHLIGHTS = ['Guest Posting', 'Publisher Outreach', 'Link Building', 'White-label SEO', 'Digital PR', 'Content Placements']

export default function Hero() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setOffset(window.scrollY * 0.12))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <section id="home" className="relative overflow-hidden bg-navy pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
        {/* Gold glow behind headline + subtle pattern */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-gold/20 blur-[120px]" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[100px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '36px 36px' }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
          <div style={{ transform: `translateY(${offset}px)` }}>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                <span className="relative flex h-2 w-2"><span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-gold" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span>
                Building Connections. Growing Authority.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-heading text-[2.65rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-[4.25rem]">
                Build Authority.<br />
                <span className="text-gold">Expand Your Reach.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Strategic link building and publisher outreach for SEO agencies and ambitious brands. We connect your business
                with relevant publishers through quality content, meaningful relationships and transparent campaigns.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-light">
                  Get a Free Proposal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:border-gold hover:text-gold">
                  <Compass className="h-4 w-4" /> Explore Our Services
                </a>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <p className="mt-8 text-sm text-slate-400">Serving SEO agencies, SaaS companies and growing businesses in the USA, UK and worldwide.</p>
            </Reveal>
          </div>
          <Reveal variant="reveal-right" delay={200} className="relative">
            <div className="animate-floaty rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-premium backdrop-blur">
              <NetworkVisual />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights strip — animated marquee, no logos or statistics */}
      <section aria-label="Service highlights" className="marquee overflow-hidden border-y border-navy/10 bg-ivory py-5">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...HIGHLIGHTS, ...HIGHLIGHTS].map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-navy">
              {item} <span className="h-2 w-2 rotate-45 bg-gold" aria-hidden="true" />
            </span>
          ))}
        </div>
      </section>
    </>
  )
}

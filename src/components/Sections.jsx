import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Target, BadgeCheck, FileCheck, PenLine, Link2, Users,
  Megaphone, FileText, Search, Eye, CheckCircle2, BarChart3, ShieldCheck, Layers,
  MessageSquare, TrendingUp, Globe, Newspaper, Award, HeartHandshake,
} from 'lucide-react'
import Reveal, { SectionHeading } from './Reveal.jsx'

/* ---------------- About ---------------- */
const FEATURES = [
  { icon: Target, title: 'Relevance First', text: 'Every placement starts with fit — the right niche, the right audience and the right context for your brand.' },
  { icon: BadgeCheck, title: 'Quality-Focused Outreach', text: 'We evaluate publishers carefully and build genuine relationships, not bulk lists or low-quality placements.' },
  { icon: FileCheck, title: 'Transparent Campaign Management', text: 'You see the opportunities, the pricing and the live placements — nothing hidden, nothing vague.' },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Linkora Reach"
              title="Building Digital Authority Through Meaningful Connections."
              description="At Linkora Reach, we believe successful link building starts with relevance, quality and genuine publisher relationships. We help brands and SEO agencies expand their digital visibility through strategic outreach and carefully managed content placements."
            />
            <Reveal delay={200}>
              <p className="mt-5 leading-relaxed text-slate">
                We work with SEO agencies, SaaS companies, digital marketers and growing businesses in the USA, UK and worldwide —
                focusing on placements that make sense for your audience and your goals, and reporting them clearly.
              </p>
            </Reveal>
          </div>
          {/* Animated website → publishers illustration */}
          <Reveal variant="reveal-right" delay={150}>
            <div className="rounded-[2rem] border border-navy/10 bg-ivory p-6 shadow-card sm:p-8" role="img" aria-label="Illustration of a website connected to multiple publishers">
              <div className="mx-auto w-fit rounded-2xl bg-navy px-6 py-4 text-center shadow-premium">
                <Globe className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-2 font-heading text-sm font-extrabold text-white">Your Website</p>
              </div>
              <svg viewBox="0 0 400 90" className="mx-auto h-20 w-full max-w-md" aria-hidden="true">
                <line x1="200" y1="0" x2="60" y2="80" stroke="#C6A66B" strokeWidth="2" className="dash-flow" />
                <line x1="200" y1="0" x2="200" y2="80" stroke="#C6A66B" strokeWidth="2" className="dash-flow" />
                <line x1="200" y1="0" x2="340" y2="80" stroke="#C6A66B" strokeWidth="2" className="dash-flow" />
              </svg>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {['Niche Blog', 'Industry Site', 'News & Media'].map((label, i) => (
                  <div key={label} className="animate-floaty rounded-2xl border border-navy/10 bg-white p-4 text-center shadow-sm" style={{ animationDelay: `${i * 0.7}s` }}>
                    <Newspaper className="mx-auto h-5 w-5 text-gold" />
                    <p className="mt-2 text-xs font-bold text-navy">{label}</p>
                    <p className="mt-1 text-[11px] text-slate-light">Publisher</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 140}>
              <article className="group h-full rounded-3xl border border-navy/10 bg-ivory p-7 transition hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-navy">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-extrabold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Services ---------------- */
export const SERVICES = [
  { id: 'Guest Posting', icon: PenLine, title: 'Guest Posting', text: 'Original, relevant articles published on carefully evaluated websites.' },
  { id: 'Contextual Link Insertions', icon: Link2, title: 'Contextual Link Insertions', text: 'Relevant link opportunities within existing editorial content.' },
  { id: 'Blogger Outreach', icon: Users, title: 'Blogger Outreach', text: 'Strategic communication and relationship building with niche publishers.' },
  { id: 'White-label Link Building', icon: Layers, title: 'White-label Link Building', text: 'Behind-the-scenes link-building support for SEO and digital marketing agencies.' },
  { id: 'Digital PR Outreach', icon: Megaphone, title: 'Digital PR Outreach', text: 'Connect brands, useful resources and stories with relevant online publications.' },
  { id: 'Content & Publisher Placement', icon: FileText, title: 'Content & Publisher Placement', text: 'Content preparation, publisher coordination and publication management.' },
]

export function Services({ onLearnMore }) {
  return (
    <section id="services" className="scroll-mt-24 bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Outreach Services Built Around Relevance and Quality"
          description="Choose one service or combine them into a campaign. Every placement is reviewed for relevance before we recommend it."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 140} variant={i % 2 ? 'reveal-right' : 'reveal-left'}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-premium">
                <span className="absolute inset-x-0 top-0 h-1 bg-gold opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold transition group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-extrabold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
                <button
                  type="button"
                  onClick={() => onLearnMore(s.id)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy transition hover:text-gold-dark"
                >
                  Learn More
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- How It Works ---------------- */
const STEPS = [
  { n: '01', title: 'Understand Your Goals', text: "Understand the client's industry, campaign requirements, target pages and audience." },
  { n: '02', title: 'Research Relevant Publishers', text: 'Identify websites based on niche relevance, audience fit, organic visibility and content quality.' },
  { n: '03', title: 'Review Opportunities', text: 'Share suitable publisher options and transparent pricing for client approval.' },
  { n: '04', title: 'Content Creation', text: 'Prepare original and relevant content that follows publisher editorial requirements.' },
  { n: '05', title: 'Publication Coordination', text: 'Manage publisher communication and verify the final live placement.' },
  { n: '06', title: 'Campaign Reporting', text: 'Provide a clear report containing published URLs, anchor text, target URLs and placement status.' },
]

export function HowItWorks() {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const seen = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - rect.top) / rect.height))
      setFill(seen)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How It Works" title="A Clear, Transparent Process — From Brief to Live Placement" />
        <div ref={ref} className="relative mt-16">
          <div className="absolute bottom-0 left-[27px] top-0 w-1 rounded bg-navy/10 lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true" />
          <div
            className="absolute left-[27px] top-0 w-1 rounded bg-gold transition-[height] duration-300 lg:left-1/2 lg:-translate-x-1/2"
            style={{ height: `${fill * 100}%` }}
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`relative flex gap-6 lg:w-1/2 ${i % 2 ? 'lg:ml-auto lg:pl-14' : 'lg:pr-14'}`}>
                <Reveal delay={100} className="w-full">
                  <div className="rounded-3xl border border-navy/10 bg-ivory p-6 shadow-sm transition hover:border-gold/60 hover:shadow-card sm:p-7">
                    <span className="font-heading text-sm font-extrabold tracking-widest text-gold">STEP {s.n}</span>
                    <h3 className="mt-2 font-heading text-xl font-extrabold text-navy">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
                  </div>
                </Reveal>
                <span className="absolute left-0 top-6 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-white bg-navy font-heading text-sm font-extrabold text-gold shadow-lg lg:left-auto lg:right-0 lg:translate-x-1/2" style={i % 2 ? { left: '-56px', right: 'auto' } : undefined}>
                  {s.n}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Why Choose ---------------- */
const ADVANTAGES = [
  { icon: Target, title: 'Niche-Relevant Opportunities', text: 'Placements chosen for relevance to your industry and audience — not just any available site.' },
  { icon: Search, title: 'Quality Publisher Research', text: 'Publishers evaluated on relevance, visibility, editorial quality and genuine audience value.' },
  { icon: Eye, title: 'Transparent Pricing', text: 'Clear publisher options and pricing shared before you approve anything.' },
  { icon: PenLine, title: 'Original Content', text: 'Relevant, original content prepared to meet each publisher’s editorial requirements.' },
  { icon: HeartHandshake, title: 'Dedicated Campaign Management', text: 'One organised point of contact from research through to live placement and reporting.' },
  { icon: Layers, title: 'White-label Agency Support', text: 'Discreet fulfilment your agency can offer under its own brand.' },
]

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading dark eyebrow="Why Choose Linkora Reach" title="More Than Links. A Strategic Outreach Partner." description="Link building works best as a partnership — with clear communication, careful publisher selection and reporting you can actually use." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 140}>
              <article className="group h-full rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:-translate-y-1.5 hover:border-gold/50">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-navy transition group-hover:scale-110">
                  <a.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-extrabold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- White-label ---------------- */
const WL_BENEFITS = [
  { icon: ShieldCheck, title: 'Discreet white-label fulfillment' },
  { icon: Layers, title: 'Flexible campaign requirements' },
  { icon: Eye, title: 'Transparent pricing' },
  { icon: BarChart3, title: 'Organised reporting' },
  { icon: MessageSquare, title: 'Dedicated communication' },
  { icon: TrendingUp, title: 'Scalable campaign support' },
]

export function WhiteLabel() {
  return (
    <section id="for-agencies" className="scroll-mt-24 bg-ivory py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="For Agencies"
            title="Your Link Building Partner Behind the Scenes."
            description="Expand your agency's delivery capacity without expanding your internal team. Linkora Reach provides white-label publisher outreach and link-building fulfillment designed for SEO agencies and digital marketing professionals."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {WL_BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <div className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3.5 shadow-sm">
                  <b.icon className="h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm font-semibold text-navy">{b.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <a href="#contact" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg">
              Become a Partner <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
        <Reveal variant="reveal-right" delay={150}>
          <div className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-card sm:p-8" role="img" aria-label="Diagram: an agency connected through Linkora Reach to publisher websites">
            <div className="rounded-2xl bg-navy px-5 py-4 text-center">
              <p className="font-heading text-sm font-extrabold text-white">Your Agency</p>
              <p className="text-xs text-slate-300">Your brand, your client</p>
            </div>
            <div className="flex justify-center py-1" aria-hidden="true"><span className="h-8 w-0.5 bg-gold" /></div>
            <div className="rounded-2xl bg-gold px-5 py-4 text-center shadow-premium">
              <p className="font-heading text-sm font-extrabold text-navy">LINKORA REACH</p>
              <p className="text-xs font-medium text-navy/70">White-label fulfilment</p>
            </div>
            <div className="flex justify-center py-1" aria-hidden="true"><span className="h-8 w-0.5 bg-gold" /></div>
            <div className="grid grid-cols-3 gap-3">
              {['Publisher A', 'Publisher B', 'Publisher C'].map((label, i) => (
                <div key={label} className="animate-floaty rounded-2xl border border-navy/10 bg-ivory p-3 text-center text-xs font-bold text-navy" style={{ animationDelay: `${i * 0.6}s` }}>{label}</div>
              ))}
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs font-semibold text-slate">
              <CheckCircle2 className="h-4 w-4 text-gold" /> Reporting returned under your agency’s brand
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Publisher network ---------------- */
const CRITERIA = [
  { icon: Target, title: 'Industry relevance', text: 'The site’s topic and audience should genuinely fit your business.' },
  { icon: TrendingUp, title: 'Organic visibility', text: 'We look at real organic presence, not vanity metrics alone.' },
  { icon: Award, title: 'Editorial quality', text: 'Well-maintained sites with real editorial standards and quality content.' },
  { icon: Users, title: 'Genuine audience value', text: 'Placements readers can actually find useful — not pages built only for links.' },
]

export function PublisherNetwork() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal variant="reveal-left">
          <div className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center sm:h-[400px] sm:w-[400px]" role="img" aria-label="Animated globe with publisher connections">
            <div className="spin-slow absolute inset-0 rounded-full border border-dashed border-gold/50" aria-hidden="true" />
            <div className="absolute inset-8 rounded-full border border-navy/10 bg-ivory" aria-hidden="true" />
            <Globe className="relative h-32 w-32 text-navy sm:h-40 sm:w-40" strokeWidth={1} />
            <span className="absolute left-6 top-10 h-3 w-3 rounded-full bg-gold shadow-lg" aria-hidden="true" />
            <span className="absolute bottom-12 right-8 h-3 w-3 rounded-full bg-navy shadow-lg" aria-hidden="true" />
            <span className="absolute right-4 top-16 h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            <span className="absolute bottom-6 left-14 rounded-full bg-navy px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">Publishers worldwide</span>
          </div>
        </Reveal>
        <div>
          <SectionHeading
            align="left"
            eyebrow="Publisher Network"
            title="Connecting Brands With Relevant Publishers."
            description="Before we recommend a publisher, we evaluate it against clear criteria. That review is what keeps placements relevant, credible and useful — for readers as well as for search visibility."
          />
          <div className="mt-8 space-y-4">
            {CRITERIA.map((c, i) => (
              <Reveal key={c.title} delay={i * 110}>
                <div className="flex gap-4 rounded-2xl border border-navy/10 bg-ivory p-5 transition hover:border-gold/60">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold"><c.icon className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-heading text-base font-extrabold text-navy">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm leading-relaxed text-navy">
              <strong>Compliance note:</strong> where a placement is a paid editorial link, we follow Google’s sponsored-link
              qualification practices, such as <code>rel="sponsored"</code> or <code>rel="nofollow"</code>, as appropriate.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

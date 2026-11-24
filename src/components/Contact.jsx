import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import Reveal, { SectionHeading } from './Reveal.jsx'
import { SERVICES } from './Sections.jsx'

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.id), 'Other / Not sure yet']
const BUDGETS = ['Under $500 / month', '$500 – $1,000 / month', '$1,000 – $2,500 / month', '$2,500 – $5,000 / month', '$5,000+ / month', 'To be discussed']

const initialForm = {
  name: '', email: '', company: '', website: '',
  service: 'Guest Posting', budget: '$500 – $1,000 / month',
  country: '', details: '',
}

export default function Contact({ preselectedService, onServiceConsumed }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState('')

  useEffect(() => {
    if (preselectedService) {
      setForm((f) => ({ ...f, service: preselectedService }))
      onServiceConsumed?.()
    }
  }, [preselectedService, onServiceConsumed])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid business email.'
    if (!form.company.trim()) errs.company = 'Please enter your company name.'
    if (form.website.trim() && !/^https?:\/\/.+\..+/.test(form.website.trim()) && !/^[\w-]+\.[\w.-]+$/.test(form.website.trim())) {
      errs.website = 'Please enter a valid website URL, e.g. example.com.'
    }
    if (!form.service) errs.service = 'Please choose a service.'
    if (!form.details.trim()) errs.details = 'Please tell us a little about your project.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        // Honest failure: never show a fake success when the backend is not configured.
        throw new Error(data.error || 'Something went wrong. Please try again or email us directly.')
      }
      setReference(data.reference || '')
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  const inputCls = (hasError) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-light focus:border-gold focus:ring-2 focus:ring-gold/30 ${
      hasError ? 'border-red-400' : 'border-navy/15'
    }`

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-navy py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              dark
              align="left"
              eyebrow="Contact"
              title="Let's Build Something Meaningful."
              description="Tell us about your link-building goals. Our team will review your requirements and help you explore suitable outreach opportunities."
            />
            <Reveal delay={200}>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-gold" /> Publisher options shared for your approval</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-gold" /> Transparent pricing before any placement</li>
                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-gold" /> Clear reporting with live URLs and anchor text</li>
              </ul>
              <p className="mt-8 text-sm text-slate-400">
                Prefer email? Write to{' '}
                <a href="mailto:hello@linkorareach.com" className="font-semibold text-gold hover:underline">hello@linkorareach.com</a>
                {' '}— please note this is a placeholder address until a real inbox is confirmed.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="lg:col-span-3">
            {status === 'success' ? (
              <div className="rounded-[2rem] bg-white p-8 text-center shadow-premium sm:p-12" role="status">
                <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
                <h3 className="mt-5 font-heading text-2xl font-extrabold text-navy">Request received — thank you.</h3>
                <p className="mx-auto mt-3 max-w-md text-slate">
                  We have received your proposal request and will review your requirements.
                  {reference ? <> Your reference is <strong className="text-navy">{reference}</strong>.</> : null}
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-7 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-800">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-6 shadow-premium sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-navy">Full Name *</label>
                    <input id="name" value={form.name} onChange={set('name')} placeholder="Your full name" className={inputCls(errors.name)} autoComplete="name" />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-navy">Business Email *</label>
                    <input id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputCls(errors.email)} autoComplete="email" />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-bold text-navy">Company Name *</label>
                    <input id="company" value={form.company} onChange={set('company')} placeholder="Company Ltd" className={inputCls(errors.company)} autoComplete="organization" />
                    {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
                  </div>
                  <div>
                    <label htmlFor="website" className="mb-1.5 block text-sm font-bold text-navy">Website URL</label>
                    <input id="website" value={form.website} onChange={set('website')} placeholder="example.com" className={inputCls(errors.website)} autoComplete="url" inputMode="url" />
                    {errors.website && <p className="mt-1 text-xs text-red-600">{errors.website}</p>}
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-bold text-navy">Required Service *</label>
                    <select id="service" value={form.service} onChange={set('service')} className={inputCls(errors.service)}>
                      {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-1.5 block text-sm font-bold text-navy">Monthly Budget *</label>
                    <select id="budget" value={form.budget} onChange={set('budget')} className={inputCls(errors.budget)}>
                      {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="country" className="mb-1.5 block text-sm font-bold text-navy">Target Country</label>
                    <input id="country" value={form.country} onChange={set('country')} placeholder="e.g. United States, United Kingdom" className={inputCls(false)} autoComplete="country-name" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="details" className="mb-1.5 block text-sm font-bold text-navy">Project Details *</label>
                    <textarea id="details" rows={4} value={form.details} onChange={set('details')} placeholder="Your industry, target pages, goals and anything else that will help us recommend suitable publishers." className={inputCls(errors.details)} />
                    {errors.details && <p className="mt-1 text-xs text-red-600">{errors.details}</p>}
                  </div>
                </div>
                {status === 'error' && (
                  <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {message}
                  </p>
                )}
                <button type="submit" disabled={status === 'loading'} className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                  {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Request a Free Proposal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

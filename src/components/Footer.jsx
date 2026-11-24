import { useState } from 'react'
import { Linkedin, Facebook, Instagram, Mail, X } from 'lucide-react'
import { NAV_LINKS, Logo } from './Header.jsx'
import { SERVICES } from './Sections.jsx'

const PRIVACY = `Privacy Policy — Linkora Reach

We collect only the information you provide through the proposal form (name, business email, company, website, service, budget, target country and project details) and use it solely to review your request and respond to you. We do not sell your personal information. You may ask us to correct or delete your information at any time by contacting us. This is a starter policy — have it reviewed by a legal adviser before relying on it for your business.`

const TERMS = `Terms & Conditions — Linkora Reach

Linkora Reach provides guest posting, publisher outreach, link-building and digital PR services as described on this website. Publisher options and pricing are shared for your approval before any placement. We do not promise or guarantee specific Google rankings, traffic or results. Where a placement is a paid editorial link, applicable sponsored-link qualification (such as rel="sponsored" or rel="nofollow") is applied as appropriate. This is a starter document — have it reviewed by a legal adviser before relying on it for your business.`

function PolicyDialog({ title, body, onClose }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-950/70 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7 shadow-premium sm:p-9" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-2xl font-extrabold text-navy">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition hover:bg-ivory"><X className="h-5 w-5" /></button>
        </div>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate">{body}</p>
      </div>
    </div>
  )
}

export default function Footer({ onLearnMore }) {
  const [policy, setPolicy] = useState(null)
  return (
    <footer className="bg-navy-950 pb-8 pt-16 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 text-sm leading-relaxed">Building Connections. Growing Authority.</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Linkora Reach is a professional guest posting, link-building and digital outreach agency serving SEO agencies,
              SaaS companies, digital marketers and growing businesses in the USA, UK and worldwide.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Linkora Reach on LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold"><Linkedin className="h-4 w-4" /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Linkora Reach on Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold"><Facebook className="h-4 w-4" /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Linkora Reach on Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>
          <nav aria-label="Quick navigation">
            <h3 className="font-heading text-base font-extrabold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => <li key={l.href}><a href={l.href} className="transition hover:text-gold">{l.label}</a></li>)}
            </ul>
          </nav>
          <nav aria-label="Services">
            <h3 className="font-heading text-base font-extrabold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}><button type="button" onClick={() => onLearnMore(s.id)} className="text-left transition hover:text-gold">{s.title}</button></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="font-heading text-base font-extrabold text-white">Contact</h3>
            <p className="mt-4 flex items-start gap-2 text-sm">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href="mailto:hello@linkorareach.com" className="transition hover:text-gold">hello@linkorareach.com</a>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Placeholder email — replace with a real inbox once confirmed. No phone number or postal address is published.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <button type="button" onClick={() => setPolicy('privacy')} className="underline-offset-4 transition hover:text-gold hover:underline">Privacy Policy</button>
              <button type="button" onClick={() => setPolicy('terms')} className="underline-offset-4 transition hover:text-gold hover:underline">Terms &amp; Conditions</button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © 2026 Linkora Reach. All Rights Reserved.
        </div>
      </div>
      {policy === 'privacy' && <PolicyDialog title="Privacy Policy" body={PRIVACY} onClose={() => setPolicy(null)} />}
      {policy === 'terms' && <PolicyDialog title="Terms & Conditions" body={TERMS} onClose={() => setPolicy(null)} />}
    </footer>
  )
}

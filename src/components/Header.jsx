import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Agencies', href: '#for-agencies' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Logo({ dark = false }) {
  return (
    <a href="#home" className="flex items-center gap-3" aria-label="Linkora Reach — home">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold font-heading text-xl font-extrabold text-navy shadow-lg">
        L
      </span>
      <span className="leading-none">
        <span className={`block font-heading text-lg font-extrabold tracking-wide ${dark ? 'text-navy' : 'text-white'}`}>
          LINKORA REACH
        </span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
          Building Connections
        </span>
      </span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy/95 shadow-premium backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Logo />
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-white/85 transition hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-lg sm:inline-flex"
          >
            Get a Free Proposal <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {/* Scroll progress bar */}
      <div className="h-[3px] bg-white/10" aria-hidden="true">
        <div className="h-full bg-gold transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>
      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-navy-900 transition-all duration-500 lg:hidden ${
          open ? 'max-h-[480px] border-t border-white/10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${i * 40}ms` }}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-heading text-base font-bold text-white/90 transition hover:bg-white/5 hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy"
            >
              Get a Free Proposal <ArrowRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

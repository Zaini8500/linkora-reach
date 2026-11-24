import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal wrapper. Uses IntersectionObserver; honours
 * prefers-reduced-motion via CSS (elements are shown immediately).
 */
export default function Reveal({ children, className = '', variant = '', delay = 0, as: Tag = 'div', id }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${variant} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, description, dark = false, align = 'center' }) {
  return (
    <Reveal className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
      <span className={`gold-rule mt-4 ${align === 'center' ? 'mx-auto' : ''}`} aria-hidden="true" />
      <h2 className={`mt-5 font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-slate-300' : 'text-slate'}`}>{description}</p>
      )}
    </Reveal>
  )
}

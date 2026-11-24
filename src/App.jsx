import { useCallback, useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import { About, Services, HowItWorks, WhyChoose, WhiteLabel, PublisherNetwork } from './components/Sections.jsx'
import Testimonials from './components/Testimonials.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [preselectedService, setPreselectedService] = useState(null)
  const [showTop, setShowTop] = useState(false)

  const handleLearnMore = useCallback((service) => {
    setPreselectedService(service)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white font-body">
      <a href="#services" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-navy">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Services onLearnMore={handleLearnMore} />
        <HowItWorks />
        <WhyChoose />
        <WhiteLabel />
        <PublisherNetwork />
        <Testimonials />
        <Faq />
        <Contact preselectedService={preselectedService} onServiceConsumed={() => setPreselectedService(null)} />
      </main>
      <Footer onLearnMore={handleLearnMore} />

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gold text-navy shadow-premium transition-all duration-300 hover:-translate-y-1 hover:bg-gold-light ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Features from './components/Features'
import InterfaceDemo from './components/InterfaceDemo'
import BeforeAfter from './components/BeforeAfter'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  const { t, i18n } = useTranslation()

  // Update <html lang>, document.title, meta description on language change
  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.title = t('meta.title')

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', t('meta.description'))
    }

    // Direction support (LTR for all current languages; ready for RTL if Arabic/Hebrew added)
    const rtlLanguages = ['ar', 'he']
    document.documentElement.dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr'
  }, [i18n.language, t])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <InterfaceDemo />
      <BeforeAfter />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ChatWidget />
    </div>
  )
}

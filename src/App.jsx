import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

// SEO: Dynamic head management (title, meta, OG, hreflang, structured data)
import SEOHead from './components/SEOHead'

// Above-the-fold: load eagerly
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Below-the-fold: lazy load for better LCP
const TrustedBy = lazy(() => import('./components/TrustedBy'))
const Features = lazy(() => import('./components/Features'))
const InterfaceDemo = lazy(() => import('./components/InterfaceDemo'))
const BeforeAfter = lazy(() => import('./components/BeforeAfter'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Pricing = lazy(() => import('./components/Pricing'))
const FAQ = lazy(() => import('./components/FAQ'))
const FinalCTA = lazy(() => import('./components/FinalCTA'))
const Footer = lazy(() => import('./components/Footer'))
const ChatWidget = lazy(() => import('./components/ChatWidget'))

// Structured data (JSON-LD): loaded eagerly since it's critical for SEO
const StructuredData = lazy(() => import('./components/StructuredData'))

/** Invisible fallback — avoids layout shift while lazy chunks load */
const LazyFallback = () => <div className="min-h-[200px]" />

export default function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* SEO: All dynamic meta tags, OG, Twitter Cards, hreflang */}
      <SEOHead />

      {/* SEO: Structured data (JSON-LD) */}
      <Suspense fallback={null}>
        <StructuredData />
      </Suspense>

      {/* Skip-to-content link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        {t('a11y.skipToContent', 'Перейти к контенту')}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<LazyFallback />}>
          <TrustedBy />
          <Features />
          <InterfaceDemo />
          <BeforeAfter />
          <HowItWorks />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ChatWidget />
      </Suspense>
    </div>
  )
}

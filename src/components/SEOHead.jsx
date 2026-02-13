import { Helmet } from '@dr.pogodin/react-helmet'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://youpub.1tlt.ru'
const SUPPORTED_LANGS = ['ru', 'en', 'zh', 'hi', 'de', 'fr', 'nl']

/**
 * OG locale mapping for each language
 */
const OG_LOCALES = {
  ru: 'ru_RU',
  en: 'en_US',
  zh: 'zh_CN',
  hi: 'hi_IN',
  de: 'de_DE',
  fr: 'fr_FR',
  nl: 'nl_NL',
}

/**
 * SEOHead — dynamic <head> manager for all SEO meta tags.
 * Uses @dr.pogodin/react-helmet (React 19 compatible fork).
 *
 * Handles:
 * - <html lang> and dir attributes
 * - <title> and <meta name="description">
 * - Canonical URL
 * - Open Graph (og:*) tags
 * - Twitter Card tags
 * - Hreflang alternate links for all 7 languages
 * - Keywords meta
 * - Theme color
 */
export default function SEOHead() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const canonicalUrl = SITE_URL + '/'

  const title = t('meta.title')
  const description = t('meta.description')
  const ogTitle = t('meta.ogTitle', title)
  const ogDescription = t('meta.ogDescription', description)
  const ogLocale = OG_LOCALES[lang] || 'ru_RU'
  const keywords = t('meta.keywords', '')

  // Alternate OG locales (all except current)
  const alternateLocales = SUPPORTED_LANGS
    .filter((l) => l !== lang)
    .map((l) => OG_LOCALES[l])

  return (
    <Helmet>
      {/* Base */}
      <html lang={lang} dir="ltr" className="dark scroll-smooth" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="YouPub" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang for all supported languages */}
      {SUPPORTED_LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${SITE_URL}/?lang=${l}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content="YouPub" />
      <meta property="og:locale" content={ogLocale} />
      {alternateLocales.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle} />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
      <meta name="twitter:image:alt" content={ogTitle} />

      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />

      {/* Mobile web app */}
      <meta name="application-name" content="YouPub" />
      <meta name="apple-mobile-web-app-title" content="YouPub" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  )
}

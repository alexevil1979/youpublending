/* global process */
/**
 * Post-build SEO enhancement script.
 * Injects static structured data (JSON-LD) into dist/index.html
 * so that crawlers without JS still get rich snippets.
 *
 * Usage: node scripts/postbuild-seo.js
 * Runs automatically after `npm run build` via postbuild script.
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distHtml = resolve(__dirname, '..', 'dist', 'index.html')

const SITE_URL = 'https://youpub.1tlt.ru'

// Load Russian locale (fallback) for static structured data
const ruLocale = JSON.parse(
  readFileSync(resolve(__dirname, '..', 'src', 'i18n', 'locales', 'ru.json'), 'utf-8')
)

// --- Structured Data schemas (static, Russian fallback) ---
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'YouPub',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description: ruLocale.meta.description,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@youpub.ru',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'English', 'Chinese', 'Hindi', 'German', 'French', 'Dutch'],
  },
}

const softwareApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YouPub',
  url: SITE_URL,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  description: ruLocale.meta.description,
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '0', priceCurrency: 'RUB', description: ruLocale.pricing.starter.description },
    { '@type': 'Offer', name: 'Pro', price: '1490', priceCurrency: 'RUB', description: ruLocale.pricing.pro.description },
    { '@type': 'Offer', name: 'Agency', price: '4990', priceCurrency: 'RUB', description: ruLocale.pricing.agency.description },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1200',
    bestRating: '5',
    worstRating: '1',
  },
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ruLocale.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

// Build JSON-LD script tags
const jsonLdScripts = [organization, softwareApp, faqPage]
  .map((schema) => `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`)
  .join('\n')

// Read dist/index.html and inject JSON-LD before </head>
try {
  let html = readFileSync(distHtml, 'utf-8')

  // Inject JSON-LD before </head>
  html = html.replace('</head>', `\n    <!-- SEO: Static structured data for crawlers -->\n${jsonLdScripts}\n  </head>`)

  writeFileSync(distHtml, html, 'utf-8')
  console.log('✅ Post-build SEO: Injected structured data into dist/index.html')
} catch (err) {
  console.error('❌ Post-build SEO failed:', err.message)
  process.exit(1)
}

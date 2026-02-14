import { Helmet } from '@dr.pogodin/react-helmet'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://youpub.site'

/**
 * StructuredData — injects JSON-LD structured data into <head>.
 * All schemas are dynamically localized via i18n.
 *
 * Includes:
 * - Organization
 * - WebSite
 * - SoftwareApplication (with pricing offers)
 * - FAQPage (from i18n FAQ items)
 * - BreadcrumbList
 */
export default function StructuredData() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  // --- Organization ---
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YouPub',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description: t('meta.description'),
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@youpub.ru',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'English', 'Chinese', 'Hindi', 'German', 'French', 'Dutch'],
    },
    sameAs: [],
  }

  // --- WebSite ---
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YouPub',
    url: SITE_URL,
    inLanguage: lang,
    description: t('meta.description'),
    publisher: {
      '@type': 'Organization',
      name: 'YouPub',
    },
  }

  // --- SoftwareApplication ---
  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouPub',
    url: SITE_URL,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    description: t('meta.description'),
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter',
        price: '0',
        priceCurrency: 'RUB',
        description: t('pricing.starter.description'),
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '1490',
        priceCurrency: 'RUB',
        description: t('pricing.pro.description'),
      },
      {
        '@type': 'Offer',
        name: 'Agency',
        price: '4990',
        priceCurrency: 'RUB',
        description: t('pricing.agency.description'),
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
  }

  // --- FAQPage (dynamic from i18n) ---
  const faqItems = t('faq.items', { returnObjects: true })
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.isArray(faqItems)
      ? faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        }))
      : [],
  }

  // --- BreadcrumbList ---
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('meta.title'),
        item: SITE_URL,
      },
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organization)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(website)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(softwareApp)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqPage)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumb)}
      </script>
    </Helmet>
  )
}

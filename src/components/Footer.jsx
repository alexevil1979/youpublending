import { Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const footerLinks = {
    [t('footer.product')]: [
      { name: t('footer.links.features'), href: '#features' },
      { name: t('footer.links.pricing'), href: '#pricing' },
      { name: t('footer.links.interface'), href: '#interface' },
      { name: t('footer.links.api'), href: '#faq' },
      { name: t('footer.links.updates'), href: '#' },
    ],
    [t('footer.company')]: [
      { name: t('footer.links.about'), href: '#' },
      { name: t('footer.links.blog'), href: '#' },
      { name: t('footer.links.careers'), href: '#' },
      { name: t('footer.links.partners'), href: '#' },
      { name: t('footer.links.contacts'), href: '#' },
    ],
    [t('footer.support')]: [
      { name: t('footer.links.documentation'), href: '#' },
      { name: t('footer.links.knowledgeBase'), href: '#' },
      { name: t('footer.links.telegramChat'), href: '#' },
      { name: t('footer.links.serviceStatus'), href: '#' },
      { name: t('footer.links.feedback'), href: '#' },
    ],
    [t('footer.legal')]: [
      { name: t('footer.links.privacy'), href: '#' },
      { name: t('footer.links.terms'), href: '#' },
      { name: t('footer.links.offer'), href: '#' },
      { name: t('footer.links.cookie'), href: '#' },
    ],
  }

  const handleNavClick = (e, href) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer aria-label="Site footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#030712' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px' }}>
          {/* Brand */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Zap style={{ width: '16px', height: '16px', color: 'white' }} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
                You<span className="gradient-text">Pub</span>
              </span>
            </a>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
              {t('footer.description')}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { abbr: 'TG', label: 'Telegram' },
                { abbr: 'YT', label: 'YouTube' },
                { abbr: 'VK', label: 'VKontakte' },
              ].map(s => (
                <a key={s.abbr} href="#" aria-label={s.label} style={{
                  width: '32px', height: '32px', borderRadius: '8px', background: '#1f2937',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: '#9ca3af', textDecoration: 'none', fontWeight: '600'
                }}>{s.abbr}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>{category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                      style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#d1d5db'}
                      onMouseLeave={e => e.target.style.color = '#6b7280'}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px'
        }}>
          <p style={{ fontSize: '13px', color: '#4b5563' }}>{t('footer.copyright')}</p>
          <p style={{ fontSize: '13px', color: '#4b5563' }}>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}

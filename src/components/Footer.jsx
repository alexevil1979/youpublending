import { Zap } from 'lucide-react'

const footerLinks = {
  'Продукт': [
    { name: 'Возможности', href: '#features' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Интерфейс', href: '#interface' },
    { name: 'API', href: '#faq' },
    { name: 'Обновления', href: '#' },
  ],
  'Компания': [
    { name: 'О нас', href: '#' },
    { name: 'Блог', href: '#' },
    { name: 'Карьера', href: '#' },
    { name: 'Партнёрам', href: '#' },
    { name: 'Контакты', href: '#' },
  ],
  'Поддержка': [
    { name: 'Документация', href: '#' },
    { name: 'База знаний', href: '#' },
    { name: 'Telegram-чат', href: '#' },
    { name: 'Статус сервиса', href: '#' },
    { name: 'Обратная связь', href: '#' },
  ],
  'Юридическое': [
    { name: 'Политика конфиденциальности', href: '#' },
    { name: 'Условия использования', href: '#' },
    { name: 'Оферта', href: '#' },
    { name: 'Cookie', href: '#' },
  ],
}

export default function Footer() {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#030712' }}>
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
              Автоматическая публикация видео на 5 платформ с AI и аналитикой.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['TG', 'YT', 'VK'].map(s => (
                <a key={s} href="#" style={{
                  width: '32px', height: '32px', borderRadius: '8px', background: '#1f2937',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: '#9ca3af', textDecoration: 'none', fontWeight: '600'
                }}>{s}</a>
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
          <p style={{ fontSize: '13px', color: '#4b5563' }}>© 2026 YouPub. Все права защищены.</p>
          <p style={{ fontSize: '13px', color: '#4b5563' }}>Сделано с любовью для контент-мейкеров</p>
        </div>
      </div>
    </footer>
  )
}

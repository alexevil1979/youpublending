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
    <footer className="border-t border-white/5 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                You<span className="gradient-text">Pub</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Автоматическая публикация видео на 5 платформ с AI и аналитикой.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-xs">
                TG
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-xs">
                YT
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-xs">
                VK
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2026 YouPub. Все права защищены.
          </p>
          <p className="text-sm text-gray-600">
            Сделано с ❤️ для контент-мейкеров
          </p>
        </div>
      </div>
    </footer>
  )
}

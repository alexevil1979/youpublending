# YouPub Landing — AI Context

## Проект
Продающий лендинг для SaaS-сервиса **YouPub** — платформы автоматической публикации видеоконтента на 5 платформ (YouTube, Telegram, TikTok, Instagram, Pinterest).

## Стек
- **React 19** + **Vite 7** + **Tailwind CSS 4**
- **Framer Motion** — анимации при скролле
- **Lucide React** — иконки
- **Шрифт:** Inter (Google Fonts)
- Все стили — inline (`style={}`) из-за конфликтов Tailwind v4 с кастомными CSS-классами
- Кастомные CSS-классы (`gradient-text`, `glass`, `btn-primary`, `btn-secondary`, `card-hover`, `hero-bg`, `animate-pulse-glow`) определены в `src/index.css` через `@layer utilities`

## Структура компонентов (`src/components/`)
| # | Компонент | Секция | id для навигации |
|---|-----------|--------|------------------|
| 1 | `Navbar.jsx` | Фиксированный navbar, glass при скролле | — |
| 2 | `Hero.jsx` | Главный экран + мокап дашборда | — |
| 3 | `TrustedBy.jsx` | Цифры: 1200+ авторов, 50+ агентств... | — |
| 4 | `Features.jsx` | 8 карточек преимуществ | `#features` |
| 5 | `InterfaceDemo.jsx` | 5 интерактивных вкладок с мокапами | `#interface` |
| 6 | `BeforeAfter.jsx` | Сравнение до/после | — |
| 7 | `HowItWorks.jsx` | 5 шагов работы | `#how-it-works` |
| 8 | `Testimonials.jsx` | 4 отзыва с метриками | `#testimonials` |
| 9 | `Pricing.jsx` | 4 тарифа (Starter/Pro/Agency/Custom) | `#pricing` |
| 10 | `FAQ.jsx` | 8 вопросов, аккордеон | `#faq` |
| 11 | `FinalCTA.jsx` | Финальный призыв к действию | — |
| 12 | `Footer.jsx` | Навигация, ссылки, копирайт | — |

## Деплой
- **GitHub:** https://github.com/alexevil1979/youpublending
- **GitHub Actions:** `.github/workflows/deploy.yml` — автобилд + SCP на VPS при push в `main`
- **Environment secrets (GitHub → Environments → "new"):** `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`
- **VPS:** Apache, путь `/ssd/www/youpublanding/`
- **Домен:** https://youpub.1tlt.ru (SSL через Let's Encrypt, DNS-challenge)
- **Apache конфиги:** `youpublanding.conf` (HTTP→HTTPS redirect) + `youpublanding-ssl.conf` (HTTPS)
- **`.htaccess`** в `public/` — SPA fallback, gzip, кэширование

## Текущее состояние (09.02.2026)
- Все 12 блоков лендинга реализованы и задеплоены
- SSL настроен (Let's Encrypt)
- CI/CD работает: push → build → deploy на VPS
- Вёрстка переписана на inline-стили для совместимости с Tailwind v4
- Тёмная тема с неоновыми акцентами (фиолетовый/синий/розовый)
- Мобильная адаптивность через `clamp()`, `auto-fit`, `minmax()`
- Все тексты на русском языке

## Известные ограничения
- Скриншоты интерфейса — HTML-мокапы (не реальные изображения)
- Отзывы — вымышленные (для демо)
- Навбар использует `hidden`/`lg:hidden` Tailwind-классы (единственное место с Tailwind-классами для responsive)
- Секция InterfaceDemo использует CSS-grid `grid-cols-2` без responsive fallback на мобильных

## Следующие шаги
1. **Мобильная адаптация** — проверить и доработать все секции на экранах <768px (особенно InterfaceDemo grid, Hero dashboard mockup)
2. **Реальные скриншоты** — заменить HTML-мокапы на изображения реального интерфейса, когда будет готов
3. **Метрики и аналитика** — добавить Яндекс.Метрику / Google Analytics
4. **Формы** — подключить обработку CTA-кнопок (регистрация, демо)
5. **SEO** — добавить Open Graph теги, structured data, sitemap.xml
6. **Оптимизация** — lazy loading для секций ниже fold, оптимизация шрифтов
7. **A/B тестирование** — варианты заголовков и CTA для повышения конверсии

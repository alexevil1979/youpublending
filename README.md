# YouPub Landing

Продающий лендинг для SaaS-сервиса **YouPub** — платформы автоматической публикации видеоконтента на 5 платформ: YouTube, Telegram, TikTok, Instagram, Pinterest.

**Продакшен:** https://youpub.site

---

## Стек технологий

| Технология | Версия | Назначение |
|---|---|---|
| React | 19 | UI-фреймворк |
| Vite | 7 | Сборщик, HMR, dev-сервер |
| Tailwind CSS | 4 | Утилитарные стили, кастомные классы через `@layer` |
| Framer Motion | 12 | Анимации при скролле, переходы |
| @dr.pogodin/react-helmet | 3 | Динамические мета-теги, OG, hreflang (React 19 совместим) |
| Lucide React | — | SVG-иконки |
| i18next + react-i18next | — | Интернационализация (7 языков) |
| Express | 5 | API-сервер (чат-виджет, формы) |
| React Hook Form + Zod | — | Валидация форм |
| Vitest + Testing Library | — | Тесты |

**Шрифт:** Inter (Google Fonts)
**Дизайн:** Dark theme с неоновыми акцентами (фиолетовый / синий / розовый)

---

## Структура проекта

```
youpublanding/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: build → SCP на VPS
├── dist/                        # Production build (gitignored)
├── public/
│   ├── .htaccess                # Apache: SPA fallback, gzip, cache
│   ├── favicon.svg              # YouPub favicon (SVG)
│   ├── og-image.png             # OG/Twitter Card изображение (1200×630)
│   ├── og-image.svg             # OG изображение (SVG-шаблон)
│   ├── robots.txt               # Правила для краулеров
│   └── sitemap.xml              # Multilingual sitemap с hreflang
├── scripts/
│   └── postbuild-seo.js         # Инжектирует JSON-LD в dist/index.html
├── src/
│   ├── main.jsx                 # Точка входа React + HelmetProvider + i18n
│   ├── App.jsx                  # Корневой компонент + SEOHead + StructuredData
│   ├── index.css                # Tailwind v4, @theme, кастомные классы
│   ├── i18n/
│   │   ├── index.js             # Конфиг i18next (detection, fallback)
│   │   └── locales/
│   │       ├── ru.json          # Русский (оригинал, fallback)
│   │       ├── en.json          # English
│   │       ├── zh.json          # 中文 (Simplified Chinese)
│   │       ├── hi.json          # हिन्दी (Hindi)
│   │       ├── de.json          # Deutsch (German)
│   │       ├── fr.json          # Français (French)
│   │       └── nl.json          # Nederlands (Dutch)
│   └── components/
│       ├── SEOHead.jsx          # 🔍 Динамические мета-теги, OG, hreflang
│       ├── StructuredData.jsx   # 🔍 JSON-LD (Organization, FAQ, Software...)
│       ├── Navbar.jsx           # Фиксированный navbar, glass-эффект
│       ├── Hero.jsx             # Главный экран + мокап дашборда
│       ├── TrustedBy.jsx        # Цифры доверия (1200+ авторов...)
│       ├── Features.jsx         # 8 карточек преимуществ
│       ├── InterfaceDemo.jsx    # 5 интерактивных вкладок с мокапами
│       ├── BeforeAfter.jsx      # Сравнение «До / После»
│       ├── HowItWorks.jsx       # 5 шагов работы сервиса
│       ├── Testimonials.jsx     # 4 отзыва с метриками роста
│       ├── Pricing.jsx          # 4 тарифных плана
│       ├── FAQ.jsx              # 8 вопросов, аккордеон
│       ├── FinalCTA.jsx         # Финальный призыв к действию
│       ├── Footer.jsx           # Навигация, ссылки, копирайт
│       ├── ChatWidget.jsx       # Чат-виджет поддержки
│       └── ErrorBoundary.jsx    # Обработка ошибок React
├── server.js                    # Express API-сервер
├── .env                         # Переменные окружения (не в git)
├── .env.example                 # Шаблон переменных
├── deploy.sh                    # Скрипт ручного деплоя
├── setup-vps.sh                 # Настройка VPS
├── ecosystem.config.cjs         # PM2 конфиг для сервера
├── vite.config.js               # Конфиг Vite + Tailwind + оптимизации
├── package.json                 # Зависимости и скрипты
└── index.html                   # HTML-шаблон (fallback meta + noscript)
```

---

## Секции лендинга (в порядке на странице)

| # | Секция | Компонент | Якорь |
|---|--------|-----------|-------|
| 1 | Навигация | `Navbar` | — |
| 2 | Главный экран (Hero) | `Hero` | — |
| 3 | Цифры доверия | `TrustedBy` | — |
| 4 | Возможности | `Features` | `#features` |
| 5 | Демо интерфейса | `InterfaceDemo` | `#interface` |
| 6 | До / После | `BeforeAfter` | — |
| 7 | Как это работает | `HowItWorks` | `#how-it-works` |
| 8 | Отзывы | `Testimonials` | `#testimonials` |
| 9 | Тарифы | `Pricing` | `#pricing` |
| 10 | FAQ | `FAQ` | `#faq` |
| 11 | Финальный CTA | `FinalCTA` | — |
| 12 | Футер | `Footer` | — |
| 13 | Чат-виджет | `ChatWidget` | — |

---

## Скрипты

```bash
npm run dev          # Запуск Vite dev-сервера (фронтенд)
npm run dev:server   # Запуск Express API-сервера
npm run dev:full     # Оба сервера параллельно
npm run build        # Production-сборка в dist/
npm run start        # Production-запуск Express
npm run test         # Запуск тестов (Vitest)
npm run lint         # ESLint проверка
```

---

## Деплой

### Автоматический (CI/CD)
Каждый `git push` в ветку `main` запускает GitHub Actions:
1. Checkout → Install → Build
2. SCP `dist/*` на VPS в `/ssd/www/youpublanding/`

Секреты хранятся в GitHub → Settings → Environments → **"new"**:
- `VPS_HOST` — IP-адрес сервера
- `VPS_USER` — SSH-пользователь (root)
- `VPS_SSH_KEY` — Приватный ED25519-ключ

### Ручной
```bash
./deploy.sh
```

### VPS
- **ОС:** Ubuntu / Debian
- **Веб-сервер:** Apache 2.4
- **SSL:** Let's Encrypt (DNS-challenge)
- **Путь:** `/ssd/www/youpublanding/`
- **Домен:** youpub.site

---

## Стилизация

Все компоненты используют **inline-стили** (`style={{}}`) для надёжности с Tailwind CSS v4.

Кастомные CSS-классы определены в `src/index.css`:
- `gradient-text` — градиентный текст (фиолетовый → синий → розовый)
- `glass` / `glass-light` — стеклянный эффект с backdrop-blur
- `btn-primary` — основная CTA-кнопка с градиентом
- `btn-secondary` — второстепенная кнопка с бордером
- `card-hover` — эффект подъёма карточки при наведении
- `hero-bg` — фоновые радиальные градиенты для Hero
- `animate-pulse-glow` — пульсирующее свечение фоновых орбов

Цвета легко менять через `@theme` в `src/index.css`.

---

## Мультиязычность (i18n)

Лендинг полностью локализован на **7 языков** с помощью `react-i18next`:

| Код | Язык | Статус |
|-----|------|--------|
| `ru` | Русский | Оригинал (fallback) |
| `en` | English | Полный перевод |
| `zh` | 中文 (Simplified Chinese) | Полный перевод |
| `hi` | हिन्दी (Hindi) | Полный перевод |
| `de` | Deutsch (German) | Полный перевод |
| `fr` | Français (French) | Полный перевод |
| `nl` | Nederlands (Dutch) | Полный перевод |

### Архитектура i18n

- **Библиотеки:** `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- **Конфиг:** `src/i18n/index.js` — LanguageDetector (localStorage → navigator → htmlTag)
- **Переводы:** `src/i18n/locales/*.json` — статические JSON, бандлятся в сборку
- **Использование:** `const { t } = useTranslation()` → `{t('hero.title')}`
- **Переключатель:** Dropdown с флагами в Navbar (десктоп + мобильное меню)
- **SEO:** Динамический `<html lang>`, OG, hreflang, JSON-LD через `SEOHead` + `StructuredData`
- **RTL:** Готов механизм `dir="rtl"` для арабского/иврита (Hindi — LTR)

### Как добавить новый язык

1. Создать `src/i18n/locales/XX.json` (скопировать `en.json` как шаблон)
2. Добавить импорт и ресурс в `src/i18n/index.js`
3. Добавить язык в массив `supportedLanguages` в `src/i18n/index.js`
4. Перевести все ключи в JSON-файле
5. Обновить `SUPPORTED_LANGS` и `OG_LOCALES` в `src/components/SEOHead.jsx`
6. Добавить hreflang URL в `public/sitemap.xml`

---

## SEO-оптимизация

### Архитектура SEO (обновлено: Февраль 2026)

Лендинг оптимизирован для SPA SEO без миграции на SSR/Next.js:

| Компонент | Файл | Описание |
|-----------|------|----------|
| **SEOHead** | `src/components/SEOHead.jsx` | Динамические мета-теги через `@dr.pogodin/react-helmet` |
| **StructuredData** | `src/components/StructuredData.jsx` | JSON-LD схемы (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList) |
| **Post-build SEO** | `scripts/postbuild-seo.js` | Инжектирует JSON-LD в статический `dist/index.html` для краулеров |

### Мета-теги (динамические)
- `<title>` и `<meta description>` — из i18n (меняются при смене языка)
- `<link rel="canonical">` — динамический
- `<html lang>` — автоматически по языку
- Keywords — локализованные по языку

### Open Graph & Twitter Cards
- `og:title`, `og:description`, `og:locale` — из i18n
- `og:image` → `/og-image.png` (1200×630px)
- `og:locale:alternate` — для всех 7 языков
- `twitter:card` = `summary_large_image`
- `twitter:image` → `/og-image.png`

### Hreflang
- `<link rel="alternate" hreflang="XX">` для 7 языков + `x-default`
- Дублирование в `sitemap.xml` через `xhtml:link`

### Structured Data (JSON-LD)
- **Organization** — имя, URL, логотип, контакт, языки
- **WebSite** — имя, URL, язык, издатель
- **SoftwareApplication** — категория, цены (3 тарифа), рейтинг
- **FAQPage** — 8 вопросов из i18n (динамический язык)
- **BreadcrumbList** — минимальный (главная)

### Performance & Core Web Vitals
- Code splitting: 6 vendor-чанков (react, framer, i18n, helmet)
- Lazy loading: Below-the-fold компоненты через `React.lazy()`
- Font: Inter с `font-display: swap`, `preconnect`
- Build: `target: 'es2020'`, `cssMinify: 'lightningcss'`
- Gzip/Brotli через `.htaccess`
- Cache: 1 год для статических ресурсов

### Crawl & Indexing
- `robots.txt` — Allow: /, Disallow: /api/, Sitemap
- `sitemap.xml` — 8 URLs (7 языков + default) с hreflang
- `<noscript>` fallback в `index.html`
- Post-build: JSON-LD инжектирован в статический HTML

### Accessibility (a11y → SEO)
- Skip-to-content ссылка
- `aria-labelledby` на секциях (Features, Pricing, Testimonials)
- `aria-label` на социальных ссылках и footer
- Семантичные теги: `<main>`, `<section>`, `<footer>`, `<nav>`
- FAQ: `aria-expanded`, `aria-controls`

### Lighthouse целевые показатели
- **Performance:** 90+
- **SEO:** 95+
- **Accessibility:** 90+
- **Best Practices:** 95+

### Чек-лист при обновлении
- [ ] Обновить `lastmod` в `public/sitemap.xml`
- [ ] Проверить все 7 JSON-локалей при изменении FAQ/Pricing
- [ ] Запустить `npm run build` — postbuild скрипт обновит JSON-LD
- [ ] Проверить OG через https://developers.facebook.com/tools/debug/
- [ ] Проверить structured data через https://search.google.com/test/rich-results

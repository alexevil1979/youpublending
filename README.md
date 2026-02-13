# YouPub Landing

Продающий лендинг для SaaS-сервиса **YouPub** — платформы автоматической публикации видеоконтента на 5 платформ: YouTube, Telegram, TikTok, Instagram, Pinterest.

**Продакшен:** https://youpub.1tlt.ru

---

## Стек технологий

| Технология | Версия | Назначение |
|---|---|---|
| React | 19 | UI-фреймворк |
| Vite | 7 | Сборщик, HMR, dev-сервер |
| Tailwind CSS | 4 | Утилитарные стили, кастомные классы через `@layer` |
| Framer Motion | 12 | Анимации при скролле, переходы |
| Lucide React | — | SVG-иконки |
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
│   └── .htaccess                # Apache: SPA fallback, gzip, cache
├── src/
│   ├── main.jsx                 # Точка входа React
│   ├── App.jsx                  # Корневой компонент, сборка секций
│   ├── index.css                # Tailwind v4, @theme, кастомные классы
│   └── components/
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
│       └── ChatWidget.jsx       # Чат-виджет поддержки
├── server.js                    # Express API-сервер
├── .env                         # Переменные окружения (не в git)
├── .env.example                 # Шаблон переменных
├── deploy.sh                    # Скрипт ручного деплоя
├── setup-vps.sh                 # Настройка VPS
├── ecosystem.config.cjs         # PM2 конфиг для сервера
├── AI_CONTEXT.md                # Контекст для AI-ассистента
├── vite.config.js               # Конфиг Vite + Tailwind плагин
├── package.json                 # Зависимости и скрипты
└── index.html                   # HTML-шаблон, мета-теги, шрифты
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
- **Домен:** youpub.1tlt.ru

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

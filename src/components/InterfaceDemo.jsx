import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  Eye,
  BarChart3,
} from 'lucide-react'

const tabs = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'Дашборд',
    title: 'Единый центр управления',
    description: 'Все ваши платформы, видео, статистика и настройки — в одном окне. Не нужно переключаться между кабинетами.',
  },
  {
    id: 'calendar',
    icon: CalendarDays,
    label: 'Календарь',
    title: 'Умный календарь публикаций',
    description: 'Волновой, случайный, линейный режимы. Перетаскивайте видео между слотами, настраивайте интервалы и часовые пояса.',
  },
  {
    id: 'ai',
    icon: Sparkles,
    label: 'AI-генерация',
    title: 'AI создаёт метаданные за вас',
    description: 'Загрузите видео — AI анализирует контент и создаёт заголовок, описание, теги и хештеги отдельно для каждой платформы.',
  },
  {
    id: 'autoview',
    icon: Eye,
    label: 'AutoView',
    title: 'Автопросмотры для быстрого старта',
    description: 'Настройте стартовые просмотры для каждого видео. Алгоритмы платформ подхватывают контент с хорошим начальным откликом.',
  },
  {
    id: 'stats',
    icon: BarChart3,
    label: 'Статистика',
    title: 'Аналитика по всем платформам',
    description: 'Сравнивайте эффективность на YouTube, Telegram, TikTok, Instagram и Pinterest в одном дашборде.',
  },
]

// Mockup screens for each tab
const screens = {
  dashboard: (
    <div className="space-y-4">
      <div className="flex gap-3 mb-4">
        <div className="flex-1 bg-gray-800/60 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-gray-500">Видео сегодня</p>
          <p className="text-2xl font-bold text-white">24</p>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: '80%' }} />
          </div>
        </div>
        <div className="flex-1 bg-gray-800/60 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-gray-500">Просмотры</p>
          <p className="text-2xl font-bold text-white">14.2K</p>
          <p className="text-xs text-green-400 mt-2">↑ 23% vs вчера</p>
        </div>
        <div className="flex-1 bg-gray-800/60 rounded-xl p-4 border border-white/5 hidden md:block">
          <p className="text-xs text-gray-500">AI-генераций</p>
          <p className="text-2xl font-bold text-white">156</p>
          <p className="text-xs text-blue-400 mt-2">за эту неделю</p>
        </div>
      </div>
      <div className="space-y-2">
        {['YouTube — 8 публикаций', 'Telegram — 6 публикаций', 'TikTok — 5 публикаций', 'Instagram — 3 публикации', 'Pinterest — 2 публикации'].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-red-500' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-white' : i === 3 ? 'bg-pink-500' : 'bg-red-600'
              }`} />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
            <span className="text-xs text-green-400">✓</span>
          </div>
        ))}
      </div>
    </div>
  ),
  calendar: (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-3">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
          <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
        ))}
        {Array.from({ length: 28 }, (_, i) => {
          const hasVideo = [2, 5, 8, 11, 14, 17, 20, 23, 26].includes(i)
          const isToday = i === 8
          return (
            <div key={i} className={`text-center text-xs py-2 rounded-lg ${
              isToday ? 'bg-violet-500/30 text-violet-300 border border-violet-500/40' :
              hasVideo ? 'bg-gray-800/60 text-white border border-white/5' :
              'text-gray-600'
            }`}>
              {i + 1}
              {hasVideo && <div className="w-1 h-1 rounded-full bg-violet-400 mx-auto mt-0.5" />}
            </div>
          )
        })}
      </div>
      <div className="mt-3 space-y-1">
        <div className="text-xs text-gray-500 mb-2">Расписание на 9 февраля</div>
        {['09:00 — Reels: Утренний лайфхак', '12:00 — YouTube: Обзор инструментов', '18:00 — TikTok: Тренд недели'].map((item, i) => (
          <div key={i} className="p-2 bg-gray-800/40 rounded-lg text-xs text-gray-300 border border-white/5">{item}</div>
        ))}
      </div>
    </div>
  ),
  ai: (
    <div className="space-y-4">
      <div className="p-4 bg-gray-800/60 rounded-xl border border-white/5">
        <p className="text-xs text-gray-500 mb-2">Видео загружено</p>
        <div className="flex items-center gap-3">
          <div className="w-16 h-10 rounded bg-gradient-to-br from-violet-500/30 to-blue-500/30 flex items-center justify-center text-xs">▶</div>
          <div>
            <p className="text-sm text-white">marketing_tips_2026.mp4</p>
            <p className="text-xs text-gray-500">4:32 · 248 MB</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <p className="text-xs text-violet-300 font-medium">AI сгенерировал метаданные</p>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-500">YouTube заголовок</p>
            <p className="text-sm text-white">🚀 5 маркетинговых стратегий, которые ВЗОРВУТ в 2026!</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">TikTok заголовок</p>
            <p className="text-sm text-white">Повтори и получи 1000 клиентов 💰</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Теги</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {['маркетинг', 'бизнес2026', 'smm', 'рост', 'стратегия'].map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  autoview: (
    <div className="space-y-4">
      <div className="p-4 bg-gray-800/60 rounded-xl border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-white font-medium">Очередь AutoView</p>
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Активна</span>
        </div>
        <div className="space-y-2">
          {[
            { name: '5 маркетинговых стратегий', views: '1,200 / 2,000', progress: 60 },
            { name: 'Обзор нейросетей для видео', views: '800 / 1,000', progress: 80 },
            { name: 'Как начать SMM в 2026', views: '2,000 / 2,000', progress: 100 },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-gray-800/40 rounded-lg border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-300">{item.name}</p>
                <p className="text-xs text-gray-500">{item.views}</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${item.progress === 100 ? 'bg-green-500' : 'bg-violet-500'}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-xs text-blue-300">
        💡 AutoView работает органично и безопасно — алгоритмы платформ считают эти просмотры естественными
      </div>
    </div>
  ),
  stats: (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800/60 rounded-xl p-3 border border-white/5 text-center">
          <p className="text-xs text-gray-500">Всего просмотров</p>
          <p className="text-xl font-bold text-white">89.4K</p>
        </div>
        <div className="bg-gray-800/60 rounded-xl p-3 border border-white/5 text-center">
          <p className="text-xs text-gray-500">Подписчиков</p>
          <p className="text-xl font-bold text-white">+2,341</p>
        </div>
        <div className="bg-gray-800/60 rounded-xl p-3 border border-white/5 text-center">
          <p className="text-xs text-gray-500">CTR</p>
          <p className="text-xl font-bold text-white">8.7%</p>
        </div>
      </div>
      {/* Simple bar chart mockup */}
      <div className="p-4 bg-gray-800/60 rounded-xl border border-white/5">
        <p className="text-xs text-gray-500 mb-3">Просмотры по платформам</p>
        <div className="space-y-2">
          {[
            { name: 'YouTube', value: 85, color: 'bg-red-500' },
            { name: 'TikTok', value: 72, color: 'bg-white' },
            { name: 'Instagram', value: 58, color: 'bg-pink-500' },
            { name: 'Telegram', value: 45, color: 'bg-blue-400' },
            { name: 'Pinterest', value: 30, color: 'bg-red-600' },
          ].map(item => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-20">{item.name}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-10 text-right">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export default function InterfaceDemo() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <section id="interface" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium text-blue-400 tracking-wider uppercase mb-4">
            Интерфейс
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Посмотрите, как это{' '}
            <span className="gradient-text">выглядит внутри</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Интуитивный интерфейс, в котором каждая деталь продумана для скорости и удобства
          </p>
        </motion.div>

        {/* Tabs + Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Side */}
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                {tabs.filter(t => t.id === activeTab).map(tab => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      {tab.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      {tab.description}
                    </p>
                    <a
                      href="#pricing"
                      className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
                    >
                      Попробовать бесплатно →
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Screen Mockup Side */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10 rounded-3xl blur-xl" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 glass">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-800 rounded-lg px-3 py-1 text-xs text-gray-400 text-center">
                        app.youpub.ru/{activeTab}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-gray-900/60 min-h-[360px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                      >
                        {screens[activeTab]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

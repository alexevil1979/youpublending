import { motion } from 'framer-motion'
import { Play, ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden pt-20">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">
              Новое поколение автопубликации видео
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Загружай видео один раз —{' '}
            <span className="gradient-text glow-text">
              публикуй везде автоматически
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            <strong className="text-white">YouPub</strong> — умная платформа для авторов, SMM-специалистов
            и агентств. <span className="text-violet-400">5 платформ</span>, AI-заголовки,{' '}
            <span className="text-blue-400">5 видов расписаний</span>, автопросмотры
            и встроенная монетизация
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#pricing"
              className="btn-primary px-8 py-4 rounded-2xl text-lg font-semibold text-white flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Начать бесплатно — 14 дней
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#interface"
              className="btn-secondary px-8 py-4 rounded-2xl text-lg font-semibold text-violet-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Play className="w-5 h-5" />
              Смотреть демо
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 rounded-2xl text-lg font-medium text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-600 hover:decoration-violet-500"
            >
              Выбрать тариф
            </a>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Glow Behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-pink-500/20 rounded-3xl blur-2xl" />

            {/* Dashboard Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 glass">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-800 rounded-lg px-4 py-1.5 text-xs text-gray-400 text-center">
                    app.youpub.ru/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="bg-gray-900/60 p-6 md:p-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Панель управления</h3>
                    <p className="text-sm text-gray-500">Февраль 2026</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-300 text-sm font-medium">+ Загрузить видео</div>
                    <div className="px-4 py-2 rounded-lg bg-gray-800 text-gray-400 text-sm">Настройки</div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Публикаций', value: '1,247', change: '+12%', color: 'violet' },
                    { label: 'Просмотров', value: '89.4K', change: '+34%', color: 'blue' },
                    { label: 'AI-генераций', value: '3,891', change: '+8%', color: 'pink' },
                    { label: 'Платформ', value: '5', change: 'Все', color: 'green' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-800/60 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className={`text-xs mt-1 ${
                        stat.color === 'violet' ? 'text-violet-400' :
                        stat.color === 'blue' ? 'text-blue-400' :
                        stat.color === 'pink' ? 'text-pink-400' :
                        'text-green-400'
                      }`}>{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Platform Icons Row */}
                <div className="flex items-center gap-3 mb-4">
                  {['YouTube', 'Telegram', 'TikTok', 'Instagram', 'Pinterest'].map((platform) => (
                    <div key={platform} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/60 border border-white/5">
                      <div className={`w-2 h-2 rounded-full ${
                        platform === 'YouTube' ? 'bg-red-500' :
                        platform === 'Telegram' ? 'bg-blue-400' :
                        platform === 'TikTok' ? 'bg-white' :
                        platform === 'Instagram' ? 'bg-pink-500' :
                        'bg-red-600'
                      }`} />
                      <span className="text-xs text-gray-400 hidden sm:inline">{platform}</span>
                    </div>
                  ))}
                  <div className="text-xs text-green-400 ml-auto">● Все подключены</div>
                </div>

                {/* Recent Publications */}
                <div className="space-y-2">
                  {[
                    { title: 'Как создать вирусный Reels за 5 минут', platforms: 3, views: '12.4K', status: 'Опубликовано' },
                    { title: 'Топ-10 трендов маркетинга 2026', platforms: 5, views: '8.7K', status: 'Опубликовано' },
                    { title: 'Секреты YouTube Shorts алгоритма', platforms: 4, views: '—', status: 'В очереди' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/40 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/30 to-blue-500/30 flex items-center justify-center text-xs">▶</div>
                        <div>
                          <p className="text-sm text-white">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.platforms} платформ · {item.views} просмотров</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === 'Опубликовано' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

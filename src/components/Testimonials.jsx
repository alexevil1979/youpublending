import { motion } from 'framer-motion'
import { Star, TrendingUp } from 'lucide-react'

const testimonials = [
  {
    name: 'Алексей Петров',
    role: 'YouTube-блогер, 120K подписчиков',
    avatar: 'АП',
    text: 'За первый месяц с YouPub мои просмотры выросли на 340%. Я экономлю 4 часа каждый день на публикации. AI-заголовки — это магия.',
    metric: '+340% просмотров',
    metricColor: 'text-green-400',
    gradient: 'from-violet-500 to-blue-500',
  },
  {
    name: 'Мария Козлова',
    role: 'SMM-менеджер, агентство «Digital Pulse»',
    avatar: 'МК',
    text: 'Ведём 15 клиентов и публикуем 200+ видео в неделю. Раньше это занимало целую команду, теперь — один человек с YouPub.',
    metric: '200+ видео/нед',
    metricColor: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Дмитрий Сидоров',
    role: 'Предприниматель, e-commerce',
    avatar: 'ДС',
    text: 'AutoView дал моим товарным видео стартовый толчок. Продажи из соцсетей выросли на 85% уже через 3 недели использования.',
    metric: '+85% продаж',
    metricColor: 'text-pink-400',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Анна Волкова',
    role: 'Контент-мейкер, TikTok + Reels',
    avatar: 'АВ',
    text: 'Я создаю контент, а YouPub делает всю рутину. Расписание, заголовки, теги — всё автоматически. Наконец-то могу сфокусироваться на творчестве!',
    metric: '5 часов экономии/день',
    metricColor: 'text-violet-400',
    gradient: 'from-violet-500 to-pink-500',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-violet-400 tracking-wider uppercase mb-4">
            Отзывы
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Что говорят наши{' '}
            <span className="gradient-text">пользователи</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Реальные результаты реальных авторов, агентств и бизнесов
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-white/5 card-hover flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-1">
                «{t.text}»
              </p>

              {/* Metric */}
              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-gray-800/60 border border-white/5">
                <TrendingUp className={`w-4 h-4 ${t.metricColor}`} />
                <span className={`text-sm font-semibold ${t.metricColor}`}>{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

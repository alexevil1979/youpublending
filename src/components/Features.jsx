import { motion } from 'framer-motion'
import {
  MonitorPlay,
  Sparkles,
  CalendarClock,
  Eye,
  FolderKanban,
  CreditCard,
  Globe,
  Shield,
} from 'lucide-react'

const features = [
  {
    icon: MonitorPlay,
    title: 'Мультиплатформенность',
    description:
      'YouTube, Telegram, TikTok, Instagram, Pinterest — одна загрузка, публикация на все 5 платформ одновременно.',
    color: 'violet',
  },
  {
    icon: Sparkles,
    title: 'AI-генерация контента',
    description:
      'Искусственный интеллект создаёт цепляющие заголовки, описания и хештеги на каждой платформе по-своему.',
    color: 'blue',
  },
  {
    icon: CalendarClock,
    title: '5 видов расписаний',
    description:
      'Линейное, волновое, случайное, по часовым поясам и интервальное — умная публикация когда ваша аудитория активна.',
    color: 'pink',
  },
  {
    icon: Eye,
    title: 'AutoView — автопросмотры',
    description:
      'Встроенный движок стартовых просмотров разгоняет ваше видео в первые часы после публикации.',
    color: 'green',
  },
  {
    icon: FolderKanban,
    title: 'Группы контента',
    description:
      'Организуйте видео по проектам, клиентам или тематикам. Массовые операции с группами в пару кликов.',
    color: 'yellow',
  },
  {
    icon: CreditCard,
    title: 'Встроенный биллинг',
    description:
      'Прозрачные тарифы, оплата через карту или криптовалюту, автоматическое продление и история платежей.',
    color: 'orange',
  },
  {
    icon: Globe,
    title: 'API для интеграций',
    description:
      'Открытый REST API для подключения YouPub к вашим CRM, автоматизациям и внутренним системам.',
    color: 'cyan',
  },
  {
    icon: Shield,
    title: 'Безопасность и надёжность',
    description:
      'Шифрование данных, OAuth авторизация, 99.9% uptime и ежедневные бэкапы всех ваших видео.',
    color: 'indigo',
  },
]

const colorMap = {
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'hover:border-violet-500/30' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'hover:border-blue-500/30' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'hover:border-pink-500/30' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'hover:border-green-500/30' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'hover:border-yellow-500/30' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'hover:border-orange-500/30' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'hover:border-cyan-500/30' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'hover:border-indigo-500/30' },
}

export default function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-32">
      {/* Background */}
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
            Возможности
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Всё, что нужно для{' '}
            <span className="gradient-text">масштабной публикации</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            YouPub объединяет мощь автоматизации, AI и аналитики в одном удобном интерфейсе.
            Экономьте часы каждый день.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`group p-6 rounded-2xl bg-gray-900/50 border border-white/5 ${colors.border} card-hover`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

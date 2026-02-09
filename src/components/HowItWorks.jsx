import { motion } from 'framer-motion'
import {
  Upload,
  Layers,
  Sparkles,
  CalendarClock,
  Rocket,
} from 'lucide-react'

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Загружаете видео',
    description: 'Загрузите одно видео или целую пачку. Поддерживаем массовую загрузку до 100 файлов одновременно.',
    color: 'violet',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Выбираете платформы и группу',
    description: 'Отметьте YouTube, Telegram, TikTok, Instagram, Pinterest — любую комбинацию. Создайте группу контента.',
    color: 'blue',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'AI создаёт метаданные',
    description: 'Искусственный интеллект анализирует видео и генерирует уникальные заголовки, описания и теги для каждой платформы.',
    color: 'pink',
  },
  {
    icon: CalendarClock,
    number: '04',
    title: 'Настраиваете расписание',
    description: 'Выберите один из 5 режимов: линейный, волновой, случайный, по часовым поясам или интервальный.',
    color: 'cyan',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Запускаете и отслеживаете',
    description: 'Нажмите «Запустить» — видео публикуется по расписанию. AutoView даёт стартовые просмотры. Следите за аналитикой.',
    color: 'green',
  },
]

const colorClasses = {
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', line: 'from-violet-500' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', line: 'from-blue-500' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', line: 'from-pink-500' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', line: 'from-cyan-500' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', line: 'from-green-500' },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-cyan-400 tracking-wider uppercase mb-4">
            Как это работает
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            От загрузки до публикации —{' '}
            <span className="gradient-text">5 простых шагов</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Весь процесс занимает меньше 3 минут. Без сложных настроек, без ручной работы.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/20 via-blue-500/20 to-green-500/20" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color]
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
                    index !== steps.length - 1 ? 'lg:mb-16' : ''
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900 border-2 border-violet-500/50 z-10" />

                  {/* Content */}
                  <div className={`${isEven ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                    <div className={`inline-flex items-center gap-3 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <step.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <span className={`text-sm font-mono font-bold ${colors.text}`}>
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { X, Check, Clock, Frown, Smile, ArrowRight } from 'lucide-react'

const beforeItems = [
  { icon: Clock, text: '3–5 часов в день на ручную публикацию' },
  { icon: X, text: 'Переключение между 5 разными кабинетами' },
  { icon: X, text: 'Копипаст заголовков и описаний вручную' },
  { icon: X, text: 'Скучные однотипные метаданные' },
  { icon: X, text: '0 стартовых просмотров — видео тонет' },
  { icon: Frown, text: 'Выгорание и упущенные охваты' },
]

const afterItems = [
  { icon: Check, text: '3 клика — видео на всех 5 платформах' },
  { icon: Check, text: 'Один дашборд для всего' },
  { icon: Check, text: 'AI создаёт уникальные метаданные для каждой площадки' },
  { icon: Check, text: 'Цепляющие заголовки = выше CTR' },
  { icon: Check, text: 'AutoView разгоняет видео в первые часы' },
  { icon: Smile, text: 'Больше времени на творчество и рост' },
]

export default function BeforeAfter() {
  return (
    <section className="relative py-20 lg:py-32">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-pink-400 tracking-wider uppercase mb-4">
            Трансформация
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Почувствуйте{' '}
            <span className="gradient-text">разницу</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Сравните свою работу до и после YouPub — экономия времени очевидна
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative">
          {/* Arrow in the middle */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-red-500/5 border border-red-500/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Frown className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">До YouPub</h3>
                <p className="text-sm text-red-400">Ручная рутина и хаос</p>
              </div>
            </div>
            <div className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-green-500/5 border border-green-500/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Smile className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">С YouPub</h3>
                <p className="text-sm text-green-400">Автоматизация и рост</p>
              </div>
            </div>
            <div className="space-y-4">
              {afterItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

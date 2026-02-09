import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Rocket } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-pink-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 mb-8 shadow-lg shadow-violet-500/30">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Готовы автоматизировать публикации и{' '}
            <span className="gradient-text">расти быстрее конкурентов?</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Присоединяйтесь к 1 200+ авторам, которые уже экономят часы каждый день
            и получают больше просмотров на автомате. Бесплатный старт — без карты.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="btn-primary px-10 py-4 rounded-2xl text-lg font-bold text-white flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Начать бесплатно — 14 дней
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@youpub.ru"
              className="btn-secondary px-10 py-4 rounded-2xl text-lg font-semibold text-violet-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Связаться с нами
            </a>
          </div>

          {/* Trust Line */}
          <p className="text-sm text-gray-500 mt-8">
            Бесплатно · Без кредитной карты · Настройка за 2 минуты
          </p>
        </motion.div>
      </div>
    </section>
  )
}

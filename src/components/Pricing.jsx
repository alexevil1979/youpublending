import { motion } from 'framer-motion'
import { Check, Zap, Crown, Building2, Headphones } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: '0',
    period: 'навсегда',
    description: 'Для тех, кто хочет попробовать',
    popular: false,
    features: [
      '10 видео / месяц',
      '2 платформы',
      '20 AI-генераций',
      '1 аккаунт',
      '1 ГБ хранилище',
      'Базовая статистика',
    ],
    limitations: [
      'Без AutoView',
      'Без приоритетной поддержки',
    ],
    cta: 'Начать бесплатно',
    ctaClass: 'btn-secondary',
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '1 490',
    period: '/ месяц',
    description: 'Для авторов и SMM-специалистов',
    popular: true,
    features: [
      '100 видео / месяц',
      'Все 5 платформ',
      '500 AI-генераций',
      '5 аккаунтов',
      '50 ГБ хранилище',
      'AutoView — 5 000 просмотров',
      'Умные расписания',
      'Группы контента',
      'Расширенная аналитика',
    ],
    limitations: [],
    cta: 'Выбрать Pro',
    ctaClass: 'btn-primary',
  },
  {
    name: 'Agency',
    icon: Building2,
    price: '4 990',
    period: '/ месяц',
    description: 'Для агентств и больших команд',
    popular: false,
    features: [
      '500 видео / месяц',
      'Все 5 платформ',
      '2 000 AI-генераций',
      '25 аккаунтов',
      '200 ГБ хранилище',
      'AutoView — 25 000 просмотров',
      'Все виды расписаний',
      'API доступ',
      'Командный доступ (5 человек)',
      'Приоритетная поддержка',
    ],
    limitations: [],
    cta: 'Выбрать Agency',
    ctaClass: 'btn-secondary',
  },
  {
    name: 'Custom',
    icon: Headphones,
    price: 'По запросу',
    period: '',
    description: 'Индивидуальные условия',
    popular: false,
    features: [
      'Безлимитные видео',
      'Все 5 платформ',
      'Безлимитные AI-генерации',
      'Безлимитные аккаунты',
      'Безлимитное хранилище',
      'AutoView — любой объём',
      'Выделенный менеджер',
      'SLA 99.9%',
      'Кастомные интеграции',
      'On-premise вариант',
    ],
    limitations: [],
    cta: 'Связаться с нами',
    ctaClass: 'btn-secondary',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-32">
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
          <span className="inline-block text-sm font-medium text-green-400 tracking-wider uppercase mb-4">
            Тарифы
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Выберите план для{' '}
            <span className="gradient-text">вашего роста</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Начните бесплатно и масштабируйтесь по мере роста. Все платные планы включают 14-дневный бесплатный период.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl flex flex-col ${
                plan.popular
                  ? 'bg-gradient-to-b from-violet-500/10 to-blue-500/5 border-2 border-violet-500/30'
                  : 'bg-gray-900/50 border border-white/5'
              } card-hover`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-xs font-bold text-white shadow-lg shadow-violet-500/30">
                    Самый популярный
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.popular ? 'bg-violet-500/20' : 'bg-gray-800'
                  }`}>
                    <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-violet-400' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-bold text-white">
                    {plan.price === '0' ? 'Бесплатно' : plan.price === 'По запросу' ? '' : `${plan.price} ₽`}
                  </span>
                  {plan.price === 'По запросу' && (
                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                  )}
                  {plan.period && plan.price !== '0' && plan.price !== 'По запросу' && (
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${
                      plan.popular ? 'text-violet-400' : 'text-green-400'
                    }`} />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limit) => (
                  <div key={limit} className="flex items-start gap-2 opacity-50">
                    <span className="w-4 h-4 mt-0.5 shrink-0 text-center text-gray-600 text-xs">—</span>
                    <span className="text-sm text-gray-500">{limit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className={`w-full py-3 rounded-xl font-semibold text-sm ${plan.ctaClass} text-white`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          Все цены указаны с учётом НДС. Оплата картой, СБП или криптовалютой. Отмена в любой момент.
        </motion.p>
      </div>
    </section>
  )
}

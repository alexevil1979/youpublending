import { motion } from 'framer-motion'
import { Check, Zap, Crown, Building2, Headphones } from 'lucide-react'

const plans = [
  {
    name: 'Starter', icon: Zap, price: '0', period: 'навсегда',
    description: 'Для тех, кто хочет попробовать', popular: false,
    features: ['10 видео / месяц', '2 платформы', '20 AI-генераций', '1 аккаунт', '1 ГБ хранилище', 'Базовая статистика'],
    limitations: ['Без AutoView', 'Без приоритетной поддержки'],
    cta: 'Начать бесплатно', primary: false,
  },
  {
    name: 'Pro', icon: Crown, price: '1 490', period: '/ месяц',
    description: 'Для авторов и SMM-специалистов', popular: true,
    features: ['100 видео / месяц', 'Все 5 платформ', '500 AI-генераций', '5 аккаунтов', '50 ГБ хранилище', 'AutoView — 5 000 просмотров', 'Умные расписания', 'Группы контента', 'Расширенная аналитика'],
    limitations: [], cta: 'Выбрать Pro', primary: true,
  },
  {
    name: 'Agency', icon: Building2, price: '4 990', period: '/ месяц',
    description: 'Для агентств и больших команд', popular: false,
    features: ['500 видео / месяц', 'Все 5 платформ', '2 000 AI-генераций', '25 аккаунтов', '200 ГБ хранилище', 'AutoView — 25 000 просмотров', 'Все виды расписаний', 'API доступ', 'Командный доступ (5 человек)', 'Приоритетная поддержка'],
    limitations: [], cta: 'Выбрать Agency', primary: false,
  },
  {
    name: 'Custom', icon: Headphones, price: 'По запросу', period: '',
    description: 'Индивидуальные условия', popular: false,
    features: ['Безлимитные видео', 'Все 5 платформ', 'Безлимитные AI-генерации', 'Безлимитные аккаунты', 'Безлимитное хранилище', 'AutoView — любой объём', 'Выделенный менеджер', 'SLA 99.9%', 'Кастомные интеграции', 'On-premise вариант'],
    limitations: [], cta: 'Связаться с нами', primary: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            Тарифы
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            Выберите план для <span className="gradient-text">вашего роста</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            Начните бесплатно и масштабируйтесь по мере роста. Все платные планы включают 14-дневный бесплатный период.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover"
              style={{
                position: 'relative', padding: '28px', borderRadius: '16px',
                display: 'flex', flexDirection: 'column',
                background: plan.popular ? 'linear-gradient(180deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))' : 'rgba(17,24,39,0.5)',
                border: plan.popular ? '2px solid rgba(139,92,246,0.35)' : '1px solid rgba(255,255,255,0.06)'
              }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                  <span style={{
                    padding: '4px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: '700', color: 'white',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.4)'
                  }}>
                    Самый популярный
                  </span>
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: plan.popular ? 'rgba(139,92,246,0.2)' : '#1f2937',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <plan.icon style={{ width: '20px', height: '20px', color: plan.popular ? '#a78bfa' : '#9ca3af' }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>{plan.name}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>{plan.description}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  {plan.price === '0' ? (
                    <span style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>Бесплатно</span>
                  ) : plan.price === 'По запросу' ? (
                    <span style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>По запросу</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>{plan.price} ₽</span>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{plan.period}</span>
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check style={{ width: '16px', height: '16px', color: plan.popular ? '#a78bfa' : '#4ade80', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13px', color: '#d1d5db' }}>{f}</span>
                  </div>
                ))}
                {plan.limitations.map((l) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', opacity: 0.5 }}>
                    <span style={{ width: '16px', textAlign: 'center', color: '#6b7280', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>—</span>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{l}</span>
                  </div>
                ))}
              </div>

              <button className={plan.primary ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '600', fontSize: '14px', color: 'white', border: plan.primary ? 'none' : undefined }}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '32px' }}>
          Все цены указаны с учётом НДС. Оплата картой, СБП или криптовалютой. Отмена в любой момент.
        </motion.p>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Check, Zap, Crown, Building2, Headphones } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const planConfigs = [
  { key: 'starter', icon: Zap, price: '0', popular: false, primary: false },
  { key: 'pro', icon: Crown, price: '1 490', popular: true, primary: true },
  { key: 'agency', icon: Building2, price: '4 990', popular: false, primary: false },
  { key: 'custom', icon: Headphones, price: null, popular: false, primary: false },
]

export default function Pricing() {
  const { t } = useTranslation()

  const plans = planConfigs.map(cfg => ({
    ...cfg,
    name: cfg.key.charAt(0).toUpperCase() + cfg.key.slice(1),
    period: cfg.price === '0' ? t('pricing.forever') : cfg.price === null ? '' : t('pricing.perMonth'),
    description: t(`pricing.${cfg.key}.description`),
    features: t(`pricing.${cfg.key}.features`, { returnObjects: true }),
    limitations: t(`pricing.${cfg.key}.limitations`, { returnObjects: true }),
    cta: t(`pricing.${cfg.key}.cta`),
  }))

  return (
    <section id="pricing" aria-labelledby="pricing-heading" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            {t('pricing.badge')}
          </span>
          <h2 id="pricing-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            {t('pricing.title')}<span className="gradient-text">{t('pricing.titleHighlight')}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
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
                    {t('pricing.mostPopular')}
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
                    <span style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>{t('pricing.free')}</span>
                  ) : plan.price === null ? (
                    <span style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>{t('pricing.onRequest')}</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>{plan.price} ₽</span>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{plan.period}</span>
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                {plan.features.map((f, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check style={{ width: '16px', height: '16px', color: plan.popular ? '#a78bfa' : '#4ade80', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13px', color: '#d1d5db' }}>{f}</span>
                  </div>
                ))}
                {plan.limitations.map((l, li) => (
                  <div key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', opacity: 0.5 }}>
                    <span style={{ width: '16px', textAlign: 'center', color: '#6b7280', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>—</span>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{l}</span>
                  </div>
                ))}
              </div>

              <a href="https://youpub.site/login" className={plan.primary ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '600', fontSize: '14px', color: 'white', border: plan.primary ? 'none' : undefined, textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '32px' }}>
          {t('pricing.footer')}
        </motion.p>
      </div>
    </section>
  )
}

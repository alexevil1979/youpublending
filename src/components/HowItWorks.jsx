import { motion } from 'framer-motion'
import { Upload, Layers, Sparkles, CalendarClock, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const stepIcons = [Upload, Layers, Sparkles, CalendarClock, Rocket]
const stepNumbers = ['01', '02', '03', '04', '05']
const stepColors = ['#a78bfa', '#60a5fa', '#f472b6', '#22d3ee', '#4ade80']

export default function HowItWorks() {
  const { t } = useTranslation()

  const steps = stepIcons.map((icon, i) => ({
    icon,
    number: stepNumbers[i],
    title: t(`howItWorks.step${i + 1}.title`),
    description: t(`howItWorks.step${i + 1}.description`),
    color: stepColors[i],
  }))

  return (
    <section id="how-it-works" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            {t('howItWorks.badge')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            {t('howItWorks.title')}
            <span className="gradient-text">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover"
              style={{
                padding: '28px', borderRadius: '16px', textAlign: 'center',
                background: 'rgba(17,24,39,0.5)', border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: `${step.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <step.icon style={{ width: '24px', height: '24px', color: step.color }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: step.color, fontFamily: 'monospace' }}>{step.number}</span>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: 'white', margin: '8px 0' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import {
  MonitorPlay, Sparkles, CalendarClock, Eye,
  FolderKanban, CreditCard, Globe, Shield,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const featureIcons = [MonitorPlay, Sparkles, CalendarClock, Eye, FolderKanban, CreditCard, Globe, Shield]
const featureColors = ['#a78bfa', '#60a5fa', '#f472b6', '#4ade80', '#facc15', '#fb923c', '#22d3ee', '#818cf8']

export default function Features() {
  const { t } = useTranslation()

  const features = featureIcons.map((icon, i) => ({
    icon,
    title: t(`features.card${i + 1}.title`),
    description: t(`features.card${i + 1}.description`),
    color: featureColors[i],
  }))

  return (
    <section id="features" aria-labelledby="features-heading" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            {t('features.badge')}
          </span>
          <h2 id="features-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            {t('features.title')}
            <span className="gradient-text">{t('features.titleHighlight')}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="card-hover"
              style={{
                padding: '28px', borderRadius: '16px',
                background: 'rgba(17,24,39,0.5)', border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${feature.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>
                <feature.icon style={{ width: '24px', height: '24px', color: feature.color }} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

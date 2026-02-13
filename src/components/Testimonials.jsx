import { motion } from 'framer-motion'
import { Star, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const gradients = [
  'linear-gradient(135deg, #8b5cf6, #3b82f6)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
]

const metricColors = ['#4ade80', '#60a5fa', '#f472b6', '#a78bfa']

export default function Testimonials() {
  const { t } = useTranslation()

  const testimonials = [1, 2, 3, 4].map((i) => ({
    name: t(`testimonials.item${i}.name`),
    role: t(`testimonials.item${i}.role`),
    avatar: t(`testimonials.item${i}.avatar`),
    text: t(`testimonials.item${i}.text`),
    metric: t(`testimonials.item${i}.metric`),
    metricColor: metricColors[i - 1],
    gradient: gradients[i - 1],
  }))

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            {t('testimonials.badge')}
          </span>
          <h2 id="testimonials-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            {t('testimonials.title')}<span className="gradient-text">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover"
              style={{
                padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column',
                background: 'rgba(17,24,39,0.5)', border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: '16px', height: '16px', color: '#facc15', fill: '#facc15' }} />
                ))}
              </div>
              <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: '1.7', marginBottom: '20px', flex: 1 }}>
                «{testimonial.text}»
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 14px', borderRadius: '10px',
                background: 'rgba(31,41,55,0.6)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px'
              }}>
                <TrendingUp style={{ width: '16px', height: '16px', color: testimonial.metricColor }} />
                <span style={{ fontSize: '14px', fontWeight: '600', color: testimonial.metricColor }}>{testimonial.metric}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', background: testimonial.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: '700', color: 'white'
                }}>{testimonial.avatar}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{testimonial.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { X, Check, Clock, Frown, Smile, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const beforeIcons = [Clock, X, X, X, X, Frown]
const afterIcons = [Check, Check, Check, Check, Check, Smile]

export default function BeforeAfter() {
  const { t } = useTranslation()

  const beforeItems = beforeIcons.map((icon, i) => ({
    icon,
    text: t(`beforeAfter.before${i + 1}`),
  }))

  const afterItems = afterIcons.map((icon, i) => ({
    icon,
    text: t(`beforeAfter.after${i + 1}`),
  }))

  return (
    <section style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#f472b6', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            {t('beforeAfter.badge')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            {t('beforeAfter.title')}<span className="gradient-text">{t('beforeAfter.titleHighlight')}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            {t('beforeAfter.subtitle')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', position: 'relative' }}>
          {/* Arrow */}
          <div style={{
            display: 'none', position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)', zIndex: 10,
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(139,92,246,0.4)'
          }} className="md:!flex">
            <ArrowRight style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>

          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              padding: '32px', borderRadius: '16px',
              background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Frown style={{ width: '20px', height: '20px', color: '#f87171' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>{t('beforeAfter.beforeTitle')}</h3>
                <p style={{ fontSize: '13px', color: '#f87171' }}>{t('beforeAfter.beforeSubtitle')}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {beforeItems.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <item.icon style={{ width: '14px', height: '14px', color: '#f87171' }} />
                  </div>
                  <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.5' }}>{item.text}</p>
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
            style={{
              padding: '32px', borderRadius: '16px',
              background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smile style={{ width: '20px', height: '20px', color: '#4ade80' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>{t('beforeAfter.afterTitle')}</h3>
                <p style={{ fontSize: '13px', color: '#4ade80' }}>{t('beforeAfter.afterSubtitle')}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {afterItems.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: 'rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <item.icon style={{ width: '14px', height: '14px', color: '#4ade80' }} />
                  </div>
                  <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: '1.5' }}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

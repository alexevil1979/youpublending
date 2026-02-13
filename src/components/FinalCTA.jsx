import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function FinalCTA() {
  const { t } = useTranslation()

  return (
    <section style={{ position: 'relative', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.08), rgba(236,72,153,0.08))' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'rgba(139,92,246,0.1)', borderRadius: '50%', filter: 'blur(150px)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', marginBottom: '32px',
            boxShadow: '0 0 40px rgba(139,92,246,0.4)'
          }}>
            <Rocket style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '24px', lineHeight: '1.2' }}>
            {t('finalCta.titleStart')}
            <span className="gradient-text">{t('finalCta.titleHighlight')}</span>
          </h2>

          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto 40px', lineHeight: '1.7' }}>
            {t('finalCta.subtitle')}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <a href="#pricing" className="btn-primary"
              style={{ padding: '16px 36px', borderRadius: '16px', fontSize: '17px', fontWeight: '700', color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {t('finalCta.ctaPrimary')}
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </a>
            <a href="mailto:hello@youpub.ru" className="btn-secondary"
              style={{ padding: '16px 36px', borderRadius: '16px', fontSize: '17px', fontWeight: '600', color: '#c4b5fd', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle style={{ width: '20px', height: '20px' }} />
              {t('finalCta.ctaSecondary')}
            </a>
          </div>

          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '32px' }}>
            {t('finalCta.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

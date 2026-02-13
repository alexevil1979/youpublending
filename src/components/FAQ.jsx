import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function FAQ() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = t('faq.items', { returnObjects: true })

  const toggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  return (
    <section id="faq" aria-labelledby="faq-heading" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#facc15', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            {t('faq.badge')}
          </span>
          <h2 id="faq-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            {t('faq.title')}<span className="gradient-text">{t('faq.titleHighlight')}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af' }}>
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} role="list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <motion.div
                key={index}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{
                  borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(17,24,39,0.5)', overflow: 'hidden'
                }}
              >
                <button
                  id={buttonId}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 22px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: '500', color: 'white', paddingRight: '16px' }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    style={{
                      width: '20px', height: '20px', color: '#9ca3af', flexShrink: 0,
                      transition: 'transform 0.3s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ padding: '0 22px 18px' }}>
                        <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.7' }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

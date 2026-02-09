import { motion } from 'framer-motion'
import { X, Check, Clock, Frown, Smile, ArrowRight } from 'lucide-react'

const beforeItems = [
  { icon: Clock, text: '3–5 часов в день на ручную публикацию' },
  { icon: X, text: 'Переключение между 5 разными кабинетами' },
  { icon: X, text: 'Копипаст заголовков и описаний вручную' },
  { icon: X, text: 'Скучные однотипные метаданные' },
  { icon: X, text: '0 стартовых просмотров — видео тонет' },
  { icon: Frown, text: 'Выгорание и упущенные охваты' },
]

const afterItems = [
  { icon: Check, text: '3 клика — видео на всех 5 платформах' },
  { icon: Check, text: 'Один дашборд для всего' },
  { icon: Check, text: 'AI создаёт уникальные метаданные для каждой площадки' },
  { icon: Check, text: 'Цепляющие заголовки = выше CTR' },
  { icon: Check, text: 'AutoView разгоняет видео в первые часы' },
  { icon: Smile, text: 'Больше времени на творчество и рост' },
]

export default function BeforeAfter() {
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
            Трансформация
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            Почувствуйте <span className="gradient-text">разницу</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            Сравните свою работу до и после YouPub — экономия времени очевидна
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
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>До YouPub</h3>
                <p style={{ fontSize: '13px', color: '#f87171' }}>Ручная рутина и хаос</p>
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
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>С YouPub</h3>
                <p style={{ fontSize: '13px', color: '#4ade80' }}>Автоматизация и рост</p>
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

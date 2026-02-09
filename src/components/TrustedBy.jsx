import { motion } from 'framer-motion'
import { Users, Building2, Video, Globe } from 'lucide-react'

const stats = [
  { icon: Users, value: '1 200+', label: 'Авторов и блогеров', color: '#a78bfa' },
  { icon: Building2, value: '50+', label: 'Агентств и студий', color: '#60a5fa' },
  { icon: Video, value: '250K+', label: 'Видео опубликовано', color: '#f472b6' },
  { icon: Globe, value: '5', label: 'Платформ поддержки', color: '#4ade80' },
]

export default function TrustedBy() {
  return (
    <section style={{ padding: '64px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '40px' }}
        >
          Уже доверяют YouPub
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '48px', height: '48px', borderRadius: '14px',
                background: `${stat.color}15`, marginBottom: '16px'
              }}>
                <stat.icon style={{ width: '24px', height: '24px', color: stat.color }} />
              </div>
              <p style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '700', color: 'white', marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

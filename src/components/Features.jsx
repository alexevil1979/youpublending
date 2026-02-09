import { motion } from 'framer-motion'
import {
  MonitorPlay, Sparkles, CalendarClock, Eye,
  FolderKanban, CreditCard, Globe, Shield,
} from 'lucide-react'

const features = [
  { icon: MonitorPlay, title: 'Мультиплатформенность', description: 'YouTube, Telegram, TikTok, Instagram, Pinterest — одна загрузка, публикация на все 5 платформ одновременно.', color: '#a78bfa' },
  { icon: Sparkles, title: 'AI-генерация контента', description: 'Искусственный интеллект создаёт цепляющие заголовки, описания и хештеги на каждой платформе по-своему.', color: '#60a5fa' },
  { icon: CalendarClock, title: '5 видов расписаний', description: 'Линейное, волновое, случайное, по часовым поясам и интервальное — умная публикация когда ваша аудитория активна.', color: '#f472b6' },
  { icon: Eye, title: 'AutoView — автопросмотры', description: 'Встроенный движок стартовых просмотров разгоняет ваше видео в первые часы после публикации.', color: '#4ade80' },
  { icon: FolderKanban, title: 'Группы контента', description: 'Организуйте видео по проектам, клиентам или тематикам. Массовые операции с группами в пару кликов.', color: '#facc15' },
  { icon: CreditCard, title: 'Встроенный биллинг', description: 'Прозрачные тарифы, оплата через карту или криптовалюту, автоматическое продление и история платежей.', color: '#fb923c' },
  { icon: Globe, title: 'API для интеграций', description: 'Открытый REST API для подключения YouPub к вашим CRM, автоматизациям и внутренним системам.', color: '#22d3ee' },
  { icon: Shield, title: 'Безопасность и надёжность', description: 'Шифрование данных, OAuth авторизация, 99.9% uptime и ежедневные бэкапы всех ваших видео.', color: '#818cf8' },
]

export default function Features() {
  return (
    <section id="features" style={{ position: 'relative', padding: '100px 0' }}>
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
            Возможности
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            Всё, что нужно для{' '}
            <span className="gradient-text">масштабной публикации</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
            YouPub объединяет мощь автоматизации, AI и аналитики в одном удобном интерфейсе.
            Экономьте часы каждый день.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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

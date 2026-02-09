import { motion } from 'framer-motion'
import { Upload, Layers, Sparkles, CalendarClock, Rocket } from 'lucide-react'

const steps = [
  { icon: Upload, number: '01', title: 'Загружаете видео', description: 'Загрузите одно видео или целую пачку. Поддерживаем массовую загрузку до 100 файлов одновременно.', color: '#a78bfa' },
  { icon: Layers, number: '02', title: 'Выбираете платформы и группу', description: 'Отметьте YouTube, Telegram, TikTok, Instagram, Pinterest — любую комбинацию. Создайте группу контента.', color: '#60a5fa' },
  { icon: Sparkles, number: '03', title: 'AI создаёт метаданные', description: 'Искусственный интеллект анализирует видео и генерирует уникальные заголовки, описания и теги для каждой платформы.', color: '#f472b6' },
  { icon: CalendarClock, number: '04', title: 'Настраиваете расписание', description: 'Выберите один из 5 режимов: линейный, волновой, случайный, по часовым поясам или интервальный.', color: '#22d3ee' },
  { icon: Rocket, number: '05', title: 'Запускаете и отслеживаете', description: 'Нажмите «Запустить» — видео публикуется по расписанию. AutoView даёт стартовые просмотры. Следите за аналитикой.', color: '#4ade80' },
]

export default function HowItWorks() {
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
            Как это работает
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            От загрузки до публикации —{' '}
            <span className="gradient-text">5 простых шагов</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            Весь процесс занимает меньше 3 минут. Без сложных настроек, без ручной работы.
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

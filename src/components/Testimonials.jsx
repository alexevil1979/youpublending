import { motion } from 'framer-motion'
import { Star, TrendingUp } from 'lucide-react'

const testimonials = [
  {
    name: 'Алексей Петров', role: 'YouTube-блогер, 120K подписчиков', avatar: 'АП',
    text: 'За первый месяц с YouPub мои просмотры выросли на 340%. Я экономлю 4 часа каждый день на публикации. AI-заголовки — это магия.',
    metric: '+340% просмотров', metricColor: '#4ade80', gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
  },
  {
    name: 'Мария Козлова', role: 'SMM-менеджер, агентство «Digital Pulse»', avatar: 'МК',
    text: 'Ведём 15 клиентов и публикуем 200+ видео в неделю. Раньше это занимало целую команду, теперь — один человек с YouPub.',
    metric: '200+ видео/нед', metricColor: '#60a5fa', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    name: 'Дмитрий Сидоров', role: 'Предприниматель, e-commerce', avatar: 'ДС',
    text: 'AutoView дал моим товарным видео стартовый толчок. Продажи из соцсетей выросли на 85% уже через 3 недели использования.',
    metric: '+85% продаж', metricColor: '#f472b6', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  },
  {
    name: 'Анна Волкова', role: 'Контент-мейкер, TikTok + Reels', avatar: 'АВ',
    text: 'Я создаю контент, а YouPub делает всю рутину. Расписание, заголовки, теги — всё автоматически. Наконец-то могу сфокусироваться на творчестве!',
    metric: '5ч экономии/день', metricColor: '#a78bfa', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            Отзывы
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            Что говорят наши <span className="gradient-text">пользователи</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            Реальные результаты реальных авторов, агентств и бизнесов
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
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
                «{t.text}»
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 14px', borderRadius: '10px',
                background: 'rgba(31,41,55,0.6)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px'
              }}>
                <TrendingUp style={{ width: '16px', height: '16px', color: t.metricColor }} />
                <span style={{ fontSize: '14px', fontWeight: '600', color: t.metricColor }}>{t.metric}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', background: t.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: '700', color: 'white'
                }}>{t.avatar}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{t.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

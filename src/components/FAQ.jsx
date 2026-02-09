import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { question: 'Какие платформы поддерживает YouPub?', answer: 'YouPub поддерживает публикацию на YouTube, Telegram, TikTok, Instagram (Reels + Stories) и Pinterest. Мы постоянно добавляем новые платформы — следующими на очереди VK Video и Facebook.' },
  { question: 'Как работает AI-генерация заголовков?', answer: 'Наш AI анализирует содержимое видео (аудио, визуал, субтитры) и создаёт уникальные заголовки, описания и теги для каждой платформы отдельно. Например, для YouTube — SEO-оптимизированный заголовок, для TikTok — цепляющий короткий текст с эмодзи.' },
  { question: 'Что такое AutoView и безопасно ли это?', answer: 'AutoView — это встроенная система стартовых просмотров, которая помогает вашему видео набрать первичный импульс. Она работает через распределённую сеть реальных устройств и полностью имитирует органический просмотр.' },
  { question: 'Могу ли я использовать YouPub для нескольких клиентов?', answer: 'Да! Тарифы Agency и Custom поддерживают множество аккаунтов и командный доступ. Вы можете управлять каналами разных клиентов из одного дашборда с разделением прав доступа.' },
  { question: 'Есть ли API для интеграции?', answer: 'Да, YouPub предоставляет REST API на тарифах Agency и Custom. Вы можете автоматизировать загрузку видео, управлять расписаниями и получать статистику через API.' },
  { question: 'Какие форматы видео поддерживаются?', answer: 'Мы поддерживаем все популярные форматы: MP4, MOV, AVI, MKV, WebM. Максимальный размер файла — 10 ГБ. При загрузке видео автоматически конвертируется в оптимальный формат.' },
  { question: 'Можно ли отменить подписку?', answer: 'Да, вы можете отменить подписку в любой момент из личного кабинета. При отмене доступ сохраняется до конца оплаченного периода. Мы также предлагаем возврат денег в течение первых 14 дней.' },
  { question: 'Как быстро публикуются видео?', answer: 'Мгновенная публикация происходит за 1–3 минуты в зависимости от размера видео и платформы. При использовании расписания видео публикуется точно в назначенное время.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#facc15', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            FAQ
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af' }}>
            Не нашли ответ? Напишите нам — ответим за 15 минут.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
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
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 22px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: '500', color: 'white', paddingRight: '16px' }}>
                  {faq.question}
                </span>
                <ChevronDown style={{
                  width: '20px', height: '20px', color: '#9ca3af', flexShrink: 0,
                  transition: 'transform 0.3s',
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                }} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
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
          ))}
        </div>
      </div>
    </section>
  )
}

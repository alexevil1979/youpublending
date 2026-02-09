import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Какие платформы поддерживает YouPub?',
    answer:
      'YouPub поддерживает публикацию на YouTube, Telegram, TikTok, Instagram (Reels + Stories) и Pinterest. Мы постоянно добавляем новые платформы — следующими на очереди VK Video и Facebook.',
  },
  {
    question: 'Как работает AI-генерация заголовков?',
    answer:
      'Наш AI анализирует содержимое видео (аудио, визуал, субтитры) и создаёт уникальные заголовки, описания и теги для каждой платформы отдельно. Например, для YouTube — SEO-оптимизированный заголовок, для TikTok — цепляющий короткий текст с эмодзи.',
  },
  {
    question: 'Что такое AutoView и безопасно ли это?',
    answer:
      'AutoView — это встроенная система стартовых просмотров, которая помогает вашему видео набрать первичный импульс. Она работает через распределённую сеть реальных устройств и полностью имитирует органический просмотр. Риск для аккаунтов минимальный.',
  },
  {
    question: 'Могу ли я использовать YouPub для нескольких клиентов?',
    answer:
      'Да! Тарифы Agency и Custom поддерживают множество аккаунтов и командный доступ. Вы можете управлять каналами разных клиентов из одного дашборда с разделением прав доступа.',
  },
  {
    question: 'Есть ли API для интеграции?',
    answer:
      'Да, YouPub предоставляет REST API на тарифах Agency и Custom. Вы можете автоматизировать загрузку видео, управлять расписаниями и получать статистику через API. Документация доступна в вашем личном кабинете.',
  },
  {
    question: 'Какие форматы видео поддерживаются?',
    answer:
      'Мы поддерживаем все популярные форматы: MP4, MOV, AVI, MKV, WebM. Максимальный размер файла — 10 ГБ. При загрузке видео автоматически конвертируется в оптимальный формат для каждой платформы.',
  },
  {
    question: 'Можно ли отменить подписку?',
    answer:
      'Да, вы можете отменить подписку в любой момент из личного кабинета. При отмене доступ сохраняется до конца оплаченного периода. Мы также предлагаем возврат денег в течение первых 14 дней.',
  },
  {
    question: 'Как быстро публикуются видео?',
    answer:
      'Мгновенная публикация происходит за 1–3 минуты в зависимости от размера видео и платформы. При использовании расписания видео публикуется точно в назначенное время с точностью до минуты.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-20 lg:py-32">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-yellow-400 tracking-wider uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Часто задаваемые{' '}
            <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-lg text-gray-400">
            Не нашли ответ? Напишите нам — ответим за 15 минут.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-white/5 bg-gray-900/50 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm sm:text-base font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
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

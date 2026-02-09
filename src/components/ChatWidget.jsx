import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, X, Send, Minimize2, Mail,
  User as UserIcon, Loader2, Sparkles, ArrowRight
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

/* ============================================================
   CONFIGURATION
   ============================================================ */

const STORAGE_KEY = 'youpub_chat_messages'
const LEADS_KEY = 'youpub_chat_leads'

const RATE_LIMIT = { maxPerMinute: 5, maxTotal: 50 }

const SYSTEM_PROMPT = `Ты — умный AI-ассистент YouPub, построенный на GigaChat. Твоя цель — помогать пользователям узнать о платформе и мотивировать на регистрацию/покупку.

Ключевые фичи YouPub:
- Автоматическая публикация видео на YouTube, Telegram, TikTok, Instagram, Pinterest (5 платформ одновременно)
- AI-генерация заголовков, описаний и тегов для максимального охвата
- 5 типов расписаний публикаций (ежедневное, еженедельное, календарное, интервальное, одноразовое)
- AutoView — система для увеличения просмотров на YouTube
- Встроенный биллинг с 4 платёжными провайдерами (карты, СБП, криптовалюта, баланс)
- REST API для интеграции с другими сервисами
- Мультиканальная аналитика и статистика

Тарифы:
- Starter: 500₽/мес — до 30 видео/мес, 2 канала, базовый AI
- Pro: 1500₽/мес — безлимитные видео, 10 каналов, продвинутый AI, AutoView, приоритетная поддержка
- Business: 5000₽/мес — всё из Pro + API доступ, white-label, персональный менеджер

Правила общения:
- Всегда отвечай на русском языке
- Будь дружелюбным и профессиональным
- Фокусируйся на выгодах: экономия времени, рост просмотров, автоматизация рутины
- Задавай уточняющие вопросы
- Предлагай демо или подходящий тариф
- Если пользователь заинтересован — предложи оставить email для связи
- Используй эмодзи уместно, но не перебарщивай
- Отвечай кратко и по делу (до 200 слов)
- Собирай email для лидов`

const GREETING_MESSAGE = {
  id: 'greeting',
  role: 'assistant',
  content:
    'Привет! 👋 Я AI-ассистент YouPub на базе GigaChat.\n\nПомогу узнать о платформе и подобрать лучшее решение для вашего контента.\n\nО чём хотите узнать?',
  timestamp: Date.now(),
}

const QUICK_ACTIONS = [
  { label: '🚀 Возможности', message: 'Расскажи о возможностях YouPub' },
  { label: '💰 Тарифы', message: 'Какие есть тарифы и цены?' },
  { label: '🤖 AI-генерация', message: 'Как работает AI-генерация контента?' },
  { label: '📊 AutoView', message: 'Что такое AutoView и как он работает?' },
]

const FALLBACK_RESPONSE =
  'Извините, произошла временная ошибка связи. Попробуйте повторить вопрос через несколько секунд или напишите нам на support@youpub.ru 📧'

/* ============================================================
   LEAD FORM SCHEMA (Zod + React Hook Form)
   ============================================================ */

const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов'),
  email: z
    .string()
    .email('Введите корректный email'),
})

/* ============================================================
   HELPERS
   ============================================================ */

/** Escape HTML to prevent XSS */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Simple markdown → HTML (safe: escapes HTML first) */
function markdownToHtml(text) {
  if (!text) return ''
  let safe = escapeHtml(text)
  // Bold
  safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
  // Italic
  safe = safe.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
  // Links
  safe = safe.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:text-purple-300 underline">$1</a>',
  )
  // Bullet lists
  const lines = safe.split('\n')
  const html = lines
    .map((line) => {
      if (/^[-•]\s/.test(line)) {
        return `<div class="flex items-start gap-2 my-0.5"><span class="mt-[7px] w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span><span>${line.replace(/^[-•]\s/, '')}</span></div>`
      }
      return line
    })
    .join('<br/>')
  return html
}

/** Analytics logger */
function logAnalytics(event, data = {}) {
  console.log(`[YouPub Chat] ${event}`, { ...data, timestamp: new Date().toISOString() })
  // Extend with GA / analytics provider:
  // window.gtag?.('event', event, data)
}

/** Generate unique ID */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

/* ============================================================
   GIGACHAT API (через серверный прокси /api/chat)
   API-ключ хранится на сервере — не попадает в клиентский бандл
   ============================================================ */

async function callGigaChat(messages, retries = 2) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

    if (res.status === 429) {
      return '⏳ Слишком много запросов. Подождите минуту и попробуйте снова.'
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || FALLBACK_RESPONSE
  } catch (err) {
    console.error('[GigaChat]', err)
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1500))
      return callGigaChat(messages, retries - 1)
    }
    return FALLBACK_RESPONSE
  }
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

/** Typing indicator (three dots) */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

/** Single chat message */
function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, x: isUser ? 8 : -8 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mr-2 mt-1">
          <Sparkles size={14} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md'
            : 'bg-white/[0.07] text-gray-100 border border-white/[0.06] rounded-bl-md'
        }`}
      >
        {isUser ? (
          <span>{message.content}</span>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content) }} />
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="shrink-0 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center ml-2 mt-1">
          <UserIcon size={14} className="text-gray-300" />
        </div>
      )}
    </motion.div>
  )
}

/** Quick action chips */
function QuickActions({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="flex flex-wrap gap-2 mb-3 px-1"
    >
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() => onSelect(action.message)}
          className="text-xs px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10
                     text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50
                     transition-all duration-200 cursor-pointer"
        >
          {action.label}
        </button>
      ))}
    </motion.div>
  )
}

/** Lead capture form (inline in chat) */
function LeadForm({ onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadSchema),
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-3 mx-1"
    >
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-blue-900/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Mail size={16} className="text-purple-400" />
          <span className="text-sm font-medium text-white">Оставьте контакт — свяжемся!</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          <div>
            <input
              {...register('name')}
              placeholder="Ваше имя"
              className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.07] border border-white/10
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50
                         focus:ring-1 focus:ring-purple-500/30 transition-all"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('email')}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.07] border border-white/10
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50
                         focus:ring-1 focus:ring-purple-500/30 transition-all"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium
                         rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white
                         hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50
                         cursor-pointer"
            >
              <ArrowRight size={14} />
              Отправить
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm rounded-lg border border-white/10 text-gray-400
                         hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              Позже
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function ChatWidget() {
  /* — Feature flag (dynamic check for testability) — */
  const chatEnabled = import.meta.env.VITE_ENABLE_CHAT === 'true'
  if (!chatEnabled) return null

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messageTimestamps = useRef([])

  /* — Load persisted state — */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      if (saved?.length > 0) {
        setMessages(saved)
        setHasInteracted(true)
      } else {
        setMessages([GREETING_MESSAGE])
      }
      const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || 'null')
      if (leads) setLeadCaptured(true)
    } catch {
      setMessages([GREETING_MESSAGE])
    }
  }, [])

  /* — Persist messages — */
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  /* — Auto-scroll to bottom — */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, showLeadForm])

  /* — Focus input when opened — */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  /* — Proactive lead form trigger — */
  useEffect(() => {
    const userMsgCount = messages.filter((m) => m.role === 'user').length
    if (userMsgCount >= 4 && !leadCaptured && !showLeadForm) {
      // Check if last assistant message hints at email
      const lastBot = [...messages].reverse().find((m) => m.role === 'assistant')
      if (lastBot?.content?.match(/email|почт|свяж|контакт|оставь/i)) {
        setShowLeadForm(true)
      }
    }
  }, [messages, leadCaptured, showLeadForm])

  /* — Rate limiter — */
  const checkRateLimit = useCallback(() => {
    const now = Date.now()
    messageTimestamps.current = messageTimestamps.current.filter(
      (t) => now - t < 60_000,
    )

    if (messageTimestamps.current.length >= RATE_LIMIT.maxPerMinute) {
      return { allowed: false, reason: '⏳ Слишком много сообщений. Подождите минуту.' }
    }

    const totalUser = messages.filter((m) => m.role === 'user').length
    if (totalUser >= RATE_LIMIT.maxTotal) {
      return {
        allowed: false,
        reason: '📝 Достигнут лимит сообщений. Обновите страницу для нового сеанса.',
      }
    }

    messageTimestamps.current.push(now)
    return { allowed: true }
  }, [messages])

  /* — Send message — */
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || '').trim()
      if (!trimmed || isLoading) return

      // Validate input length
      if (trimmed.length > 1000) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'assistant',
            content: '⚠️ Сообщение слишком длинное. Пожалуйста, сократите до 1000 символов.',
            timestamp: Date.now(),
          },
        ])
        return
      }

      // Rate limit check
      const limit = checkRateLimit()
      if (!limit.allowed) {
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: 'assistant', content: limit.reason, timestamp: Date.now() },
        ])
        return
      }

      const userMsg = { id: uid(), role: 'user', content: trimmed, timestamp: Date.now() }
      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsLoading(true)
      setHasInteracted(true)

      logAnalytics('message_sent', { length: trimmed.length })

      try {
        // Build conversation for GigaChat API
        const apiMessages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .slice(-10) // Keep last 10 messages for context
            .map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: trimmed },
        ]

        const response = await callGigaChat(apiMessages)

        setMessages((prev) => [
          ...prev,
          { id: uid(), role: 'assistant', content: response, timestamp: Date.now() },
        ])

        logAnalytics('response_received', { length: response.length })
      } catch (err) {
        console.error('[ChatWidget]', err)
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: 'assistant', content: FALLBACK_RESPONSE, timestamp: Date.now() },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages, checkRateLimit],
  )

  /* — Handle form submit — */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  /* — Lead form submit — */
  const handleLeadSubmit = (data) => {
    localStorage.setItem(LEADS_KEY, JSON.stringify({ ...data, capturedAt: new Date().toISOString() }))
    setLeadCaptured(true)
    setShowLeadForm(false)
    logAnalytics('lead_captured', data)

    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: 'assistant',
        content: `Спасибо, ${data.name}! 🎉 Мы свяжемся с вами по адресу ${data.email}. А пока — задавайте любые вопросы!`,
        timestamp: Date.now(),
      },
    ])
  }

  /* — Toggle chat — */
  const toggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev
      logAnalytics(next ? 'chat_opened' : 'chat_closed')
      return next
    })
  }

  /* — Clear session — */
  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([GREETING_MESSAGE])
    setHasInteracted(false)
    setShowLeadForm(false)
    logAnalytics('session_cleared')
  }

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
      {/* -------- Floating button -------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[9999] sm:bottom-8 sm:right-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-chat-ping bg-purple-500/40" />

            <button
              onClick={toggleChat}
              aria-label="Открыть чат"
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full
                         bg-gradient-to-br from-purple-600 to-blue-600
                         text-white shadow-lg shadow-purple-500/30
                         flex items-center justify-center
                         hover:shadow-purple-500/50 hover:scale-105
                         active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <MessageCircle size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------- Chat window -------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-[9999]
                       bottom-0 right-0 w-full h-[100dvh]
                       sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[80vh]
                       flex flex-col
                       rounded-none sm:rounded-2xl
                       overflow-hidden
                       border-0 sm:border sm:border-white/[0.06]
                       shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* ---- Header ---- */}
            <div
              className="flex items-center justify-between px-4 py-3
                         bg-gradient-to-r from-[#1a1a2e] to-[#16213e]
                         border-b border-white/[0.06]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-tight">
                    YouPub AI-Ассистент
                  </h3>
                  <span className="text-[11px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Онлайн
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Clear session */}
                {hasInteracted && (
                  <button
                    onClick={clearSession}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06]
                               transition-colors cursor-pointer"
                    title="Новый диалог"
                    aria-label="Новый диалог"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </button>
                )}

                {/* Minimize */}
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06]
                             transition-colors cursor-pointer"
                  aria-label="Свернуть чат"
                >
                  <Minimize2 size={16} />
                </button>

                {/* Close */}
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06]
                             transition-colors cursor-pointer"
                  aria-label="Закрыть чат"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ---- Messages area ---- */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-1 bg-[#0f0f1a]
                         scrollbar-thin scrollbar-thumb-purple-600/30 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Quick actions after greeting */}
              {messages.length === 1 && messages[0].id === 'greeting' && (
                <QuickActions onSelect={sendMessage} />
              )}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/[0.06]">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              {/* Lead form */}
              <AnimatePresence>
                {showLeadForm && !leadCaptured && (
                  <LeadForm
                    onSubmit={handleLeadSubmit}
                    onClose={() => setShowLeadForm(false)}
                  />
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ---- Input area ---- */}
            <div
              className="px-4 py-3 border-t border-white/[0.06]
                         bg-[#0f0f1a]"
            >
              {/* Lead capture button (if not captured and not shown) */}
              {!leadCaptured && !showLeadForm && hasInteracted && (
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="w-full mb-2.5 flex items-center justify-center gap-1.5 px-3 py-1.5
                             text-xs rounded-lg border border-purple-500/20 bg-purple-500/[0.08]
                             text-purple-300 hover:bg-purple-500/15 transition-colors cursor-pointer"
                >
                  <Mail size={12} />
                  Хотите демо? Оставьте email
                </button>
              )}

              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Напишите сообщение..."
                  rows={1}
                  className="flex-1 resize-none px-3.5 py-2.5 text-sm rounded-xl
                             bg-white/[0.07] border border-white/10 text-white
                             placeholder-gray-500 focus:outline-none focus:border-purple-500/50
                             focus:ring-1 focus:ring-purple-500/20 transition-all
                             max-h-24 overflow-y-auto"
                  style={{ minHeight: '42px' }}
                />

                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-10 h-10 rounded-xl
                             bg-gradient-to-r from-purple-600 to-blue-600
                             text-white flex items-center justify-center
                             disabled:opacity-30 disabled:cursor-not-allowed
                             hover:from-purple-500 hover:to-blue-500
                             active:scale-95 transition-all cursor-pointer"
                  aria-label="Отправить"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>

              <p className="text-[10px] text-gray-600 text-center mt-2">
                Powered by GigaChat · YouPub © {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

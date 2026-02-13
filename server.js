import express from 'express'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import crypto from 'crypto'

// Load .env
config()

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001
const GIGACHAT_API_KEY = process.env.GIGACHAT_API_KEY
const GIGACHAT_SCOPE = process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS'

if (!GIGACHAT_API_KEY) {
  console.warn('[YouPub API] ⚠️  GIGACHAT_API_KEY не задан в .env — чат-бот не будет работать')
}

/* ============================================================
   GigaChat Token Management
   ============================================================ */

let accessToken = null
let tokenExpiresAt = 0

async function getGigaChatToken() {
  // Return cached token if still valid (with 60s buffer)
  if (accessToken && Date.now() < tokenExpiresAt - 60_000) {
    return accessToken
  }

  console.log('[GigaChat] Requesting new access token...')

  const res = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      RqUID: crypto.randomUUID(),
      Authorization: `Basic ${GIGACHAT_API_KEY}`,
    },
    body: `scope=${GIGACHAT_SCOPE}`,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GigaChat token error ${res.status}: ${text}`)
  }

  const data = await res.json()
  accessToken = data.access_token
  tokenExpiresAt = data.expires_at // milliseconds from Sber
  console.log('[GigaChat] Token obtained, expires at', new Date(tokenExpiresAt).toISOString())
  return accessToken
}

/* ============================================================
   Rate Limiting (per IP)
   ============================================================ */

const rateLimitMap = new Map()
const RATE_WINDOW_MS = 60_000
const RATE_MAX_REQUESTS = 10

function checkServerRateLimit(ip) {
  const now = Date.now()
  const record = rateLimitMap.get(ip) || { timestamps: [] }

  // Clean expired timestamps
  record.timestamps = record.timestamps.filter((t) => now - t < RATE_WINDOW_MS)

  if (record.timestamps.length >= RATE_MAX_REQUESTS) {
    return false
  }

  record.timestamps.push(now)
  rateLimitMap.set(ip, record)
  return true
}

// Clean up rate limit map every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < RATE_WINDOW_MS)
    if (record.timestamps.length === 0) rateLimitMap.delete(ip)
  }
}, 5 * 60_000)

/* ============================================================
   Express Setup
   ============================================================ */

// Trust reverse proxy (Apache) for correct req.ip
app.set('trust proxy', 1)

app.use(express.json({ limit: '16kb' }))

// CORS for development (Vite on port 5173)
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

/* ============================================================
   API Endpoint: POST /api/chat
   ============================================================ */

app.post('/api/chat', async (req, res) => {
  // Rate limiting
  const clientIp = req.ip || req.connection.remoteAddress
  if (!checkServerRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Слишком много запросов. Подождите минуту.' })
  }

  // Validate request
  const { messages } = req.body
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Массив messages обязателен' })
  }

  // Validate message format
  const valid = messages.every(
    (m) =>
      m &&
      typeof m.role === 'string' &&
      typeof m.content === 'string' &&
      ['system', 'user', 'assistant'].includes(m.role) &&
      m.content.length <= 2000,
  )
  if (!valid) {
    return res.status(400).json({ error: 'Некорректный формат сообщений' })
  }

  if (!GIGACHAT_API_KEY) {
    return res.status(503).json({ error: 'AI-сервис не настроен' })
  }

  try {
    const token = await getGigaChatToken()

    const response = await fetch(
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'GigaChat',
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      },
    )

    if (!res.headersSent && !response.ok) {
      // If token expired, reset and retry once
      if (response.status === 401) {
        console.log('[GigaChat] Token expired, refreshing...')
        accessToken = null
        tokenExpiresAt = 0
        const newToken = await getGigaChatToken()

        const retryRes = await fetch(
          'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify({
              model: 'GigaChat',
              messages,
              temperature: 0.7,
              max_tokens: 1024,
            }),
          },
        )

        if (!retryRes.ok) {
          throw new Error(`GigaChat retry failed: ${retryRes.status}`)
        }

        const data = await retryRes.json()
        return res.json(data)
      }

      throw new Error(`GigaChat API error: ${response.status}`)
    }

    const data = await response.json()
    console.log(`[GigaChat] Response: ${data.choices?.[0]?.message?.content?.length || 0} chars`)
    res.json(data)
  } catch (err) {
    console.error('[GigaChat proxy error]', err.message)
    res.status(502).json({
      error: 'AI-сервис временно недоступен',
      choices: [
        {
          message: {
            role: 'assistant',
            content:
              'Извините, произошла временная ошибка. Попробуйте через несколько секунд или напишите на support@youpub.ru 📧',
          },
        },
      ],
    })
  }
})

/* ============================================================
   API Endpoint: POST /api/lead (сохранение лидов)
   ============================================================ */

app.post('/api/lead', (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Имя и email обязательны' })
  }

  // Validate name (2-50 chars, no HTML)
  if (typeof name !== 'string' || name.length < 2 || name.length > 50 || /<[^>]*>/.test(name)) {
    return res.status(400).json({ error: 'Некорректное имя (2–50 символов, без HTML)' })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Некорректный формат email' })
  }

  // Sanitize for logging (prevent log injection)
  const safeName = name.replace(/[\n\r\t]/g, ' ')
  const safeEmail = email.replace(/[\n\r\t]/g, ' ')

  // Log lead (в production — сохранять в БД / CRM / отправлять на почту)
  console.log(`[Lead captured] ${safeName} — ${safeEmail} at ${new Date().toISOString()}`)

  res.json({ success: true })
})

/* ============================================================
   API Endpoint: GET /api/health (мониторинг)
   ============================================================ */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    gigachat: GIGACHAT_API_KEY ? 'configured' : 'missing',
  })
})

/* ============================================================
   Static Files (production)
   ============================================================ */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, 'dist')))
  // SPA fallback — отдаём index.html для всех не-API маршрутов
  // (совместимо с Express 5, без wildcard '*')
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(resolve(__dirname, 'dist', 'index.html'))
  })
}

/* ============================================================
   Start Server
   ============================================================ */

app.listen(PORT, () => {
  console.log(`[YouPub API] Server running on http://localhost:${PORT}`)
  console.log(`[YouPub API] GigaChat key: ${GIGACHAT_API_KEY ? '✅ configured' : '❌ missing'}`)
  console.log(`[YouPub API] Environment: ${process.env.NODE_ENV || 'development'}`)
})

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, CalendarDays, Sparkles, Eye, BarChart3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const tabIds = ['dashboard', 'calendar', 'ai', 'autoview', 'stats']
const tabIcons = [LayoutDashboard, CalendarDays, Sparkles, Eye, BarChart3]

function DashboardScreen() {
  const { t } = useTranslation()
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: t('interfaceDemo.screen.videosToday'), value: '24', extra: '80%', extraColor: '#a78bfa' },
          { label: t('interfaceDemo.screen.views'), value: '14.2K', extra: '↑ 23%', extraColor: '#4ade80' },
          { label: t('interfaceDemo.screen.aiGenerations'), value: '156', extra: t('interfaceDemo.screen.perWeek'), extraColor: '#60a5fa' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(31,41,55,0.6)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '11px', color: '#6b7280' }}>{s.label}</p>
            <p style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>{s.value}</p>
            <p style={{ fontSize: '11px', color: s.extraColor, marginTop: '4px' }}>{s.extra}</p>
          </div>
        ))}
      </div>
      {[t('interfaceDemo.screen.ytPublications'), t('interfaceDemo.screen.tgPublications'), t('interfaceDemo.screen.ttPublications'), t('interfaceDemo.screen.igPublications')].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'rgba(31,41,55,0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ['#ef4444','#60a5fa','#fff','#ec4899'][i] }} />
            <span style={{ fontSize: '13px', color: '#d1d5db' }}>{item}</span>
          </div>
          <span style={{ fontSize: '11px', color: '#4ade80' }}>✓</span>
        </div>
      ))}
    </div>
  )
}

function CalendarScreen() {
  const { t } = useTranslation()
  const weekdays = t('interfaceDemo.screen.weekdays', { returnObjects: true })
  const schedules = [
    t('interfaceDemo.screen.schedule1'),
    t('interfaceDemo.screen.schedule2'),
    t('interfaceDemo.screen.schedule3'),
  ]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '12px' }}>
        {weekdays.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '11px', color: '#6b7280', padding: '4px' }}>{d}</div>
        ))}
        {Array.from({ length: 28 }, (_, i) => {
          const has = [2,5,8,11,14,17,20,23,26].includes(i)
          const today = i === 8
          return (
            <div key={i} style={{
              textAlign: 'center', fontSize: '12px', padding: '6px', borderRadius: '8px',
              background: today ? 'rgba(139,92,246,0.25)' : has ? 'rgba(31,41,55,0.6)' : 'transparent',
              color: today ? '#c4b5fd' : has ? 'white' : '#4b5563',
              border: today ? '1px solid rgba(139,92,246,0.4)' : has ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>{i+1}</div>
          )
        })}
      </div>
      <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>{t('interfaceDemo.screen.scheduleDate')}</p>
      {schedules.map((s, i) => (
        <div key={i} style={{ padding: '8px 12px', background: 'rgba(31,41,55,0.4)', borderRadius: '8px', fontSize: '12px', color: '#d1d5db', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '4px' }}>{s}</div>
      ))}
    </div>
  )
}

function AiScreen() {
  const { t } = useTranslation()
  const tags = t('interfaceDemo.screen.tagsList', { returnObjects: true })
  return (
    <div>
      <div style={{ padding: '14px', background: 'rgba(31,41,55,0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
        <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>{t('interfaceDemo.screen.videoUploaded')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '48px', height: '32px', borderRadius: '6px', background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>▶</div>
          <div>
            <p style={{ fontSize: '13px', color: 'white' }}>marketing_tips_2026.mp4</p>
            <p style={{ fontSize: '11px', color: '#6b7280' }}>4:32 · 248 MB</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px', background: 'rgba(139,92,246,0.08)', borderRadius: '10px', border: '1px solid rgba(139,92,246,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Sparkles style={{ width: '14px', height: '14px', color: '#a78bfa' }} />
          <p style={{ fontSize: '12px', color: '#c4b5fd', fontWeight: '500' }}>{t('interfaceDemo.screen.aiGenerated')}</p>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '11px', color: '#6b7280' }}>YouTube</p>
          <p style={{ fontSize: '13px', color: 'white' }}>{t('interfaceDemo.screen.ytTitle')}</p>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '11px', color: '#6b7280' }}>TikTok</p>
          <p style={{ fontSize: '13px', color: 'white' }}>{t('interfaceDemo.screen.ttTitle')}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{t('interfaceDemo.screen.tags')}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {tags.map(tag => (
              <span key={tag} style={{ padding: '2px 8px', fontSize: '11px', background: '#1f2937', color: '#9ca3af', borderRadius: '4px' }}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AutoViewScreen() {
  const { t } = useTranslation()
  return (
    <div>
      <div style={{ padding: '14px', background: 'rgba(31,41,55,0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <p style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>{t('interfaceDemo.screen.autoviewQueue')}</p>
          <span style={{ fontSize: '11px', padding: '3px 10px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', borderRadius: '6px' }}>{t('interfaceDemo.screen.active')}</span>
        </div>
        {[
          { n: t('interfaceDemo.screen.autoviewItem1'), v: '1,200 / 2,000', p: 60 },
          { n: t('interfaceDemo.screen.autoviewItem2'), v: '800 / 1,000', p: 80 },
          { n: t('interfaceDemo.screen.autoviewItem3'), v: '2,000 / 2,000', p: 100 },
        ].map((item, i) => (
          <div key={i} style={{ padding: '10px', background: 'rgba(31,41,55,0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <p style={{ fontSize: '12px', color: '#d1d5db' }}>{item.n}</p>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>{item.v}</p>
            </div>
            <div style={{ background: '#374151', borderRadius: '100px', height: '5px' }}>
              <div style={{ width: `${item.p}%`, height: '5px', borderRadius: '100px', background: item.p === 100 ? '#4ade80' : '#8b5cf6' }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 14px', background: 'rgba(59,130,246,0.08)', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.2)', fontSize: '12px', color: '#93c5fd' }}>
        {t('interfaceDemo.screen.autoviewHint')}
      </div>
    </div>
  )
}

function StatsScreen() {
  const { t } = useTranslation()
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {[{ l: t('interfaceDemo.screen.statsViews'), v: '89.4K' }, { l: t('interfaceDemo.screen.subscribers'), v: '+2,341' }, { l: 'CTR', v: '8.7%' }].map(s => (
          <div key={s.l} style={{ background: 'rgba(31,41,55,0.6)', borderRadius: '10px', padding: '10px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#6b7280' }}>{s.l}</p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>{s.v}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(31,41,55,0.6)', borderRadius: '10px', padding: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '10px' }}>{t('interfaceDemo.screen.viewsByPlatform')}</p>
        {[{ n: 'YouTube', v: 85, c: '#ef4444' }, { n: 'TikTok', v: 72, c: '#fff' }, { n: 'Instagram', v: 58, c: '#ec4899' }, { n: 'Telegram', v: 45, c: '#60a5fa' }].map(i => (
          <div key={i.n} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', width: '70px' }}>{i.n}</span>
            <div style={{ flex: 1, background: '#374151', borderRadius: '100px', height: '6px' }}>
              <div style={{ width: `${i.v}%`, background: i.c, height: '6px', borderRadius: '100px' }} />
            </div>
            <span style={{ fontSize: '11px', color: '#6b7280', width: '30px', textAlign: 'right' }}>{i.v}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InterfaceDemo() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = tabIds.map((id, i) => ({
    id,
    icon: tabIcons[i],
    label: t(`interfaceDemo.tabs.${id}.label`),
    title: t(`interfaceDemo.tabs.${id}.title`),
    description: t(`interfaceDemo.tabs.${id}.description`),
  }))

  const tab = tabs.find(t => t.id === activeTab)

  const screens = {
    dashboard: <DashboardScreen />,
    calendar: <CalendarScreen />,
    ai: <AiScreen />,
    autoview: <AutoViewScreen />,
    stats: <StatsScreen />,
  }

  return (
    <section id="interface" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: '600', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            {t('interfaceDemo.badge')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '20px' }}>
            {t('interfaceDemo.title')}<span className="gradient-text">{t('interfaceDemo.titleHighlight')}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
            {t('interfaceDemo.subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: '500',
                background: activeTab === t.id ? 'rgba(139,92,246,0.15)' : 'transparent',
                color: activeTab === t.id ? '#c4b5fd' : '#9ca3af',
                border: activeTab === t.id ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
              <t.icon style={{ width: '16px', height: '16px' }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }} className="md:grid-cols-2 grid-cols-1">
          {/* Text */}
          <div style={{ order: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>{tab.title}</h3>
                <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: '1.7', marginBottom: '24px' }}>{tab.description}</p>
                <a href="#pricing" style={{ color: '#a78bfa', fontWeight: '500', textDecoration: 'none', fontSize: '15px' }}>{t('interfaceDemo.tryFree')}</a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Screen */}
          <div style={{ order: 1 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-12px', background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1), rgba(236,72,153,0.1))', borderRadius: '20px', filter: 'blur(20px)' }} />
              <div className="glass" style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', background: 'rgba(17,24,39,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                  </div>
                  <div style={{ flex: 1, margin: '0 12px' }}>
                    <div style={{ background: '#1f2937', borderRadius: '6px', padding: '4px 12px', fontSize: '11px', color: '#6b7280', textAlign: 'center' }}>
                      app.youpub.ru/{activeTab}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(17,24,39,0.6)', minHeight: '340px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      {screens[activeTab]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

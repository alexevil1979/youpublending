import { motion } from 'framer-motion'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  const stats = [
    { label: t('hero.dashboard.publications'), value: '1,247', change: '+12%', color: '#a78bfa' },
    { label: t('hero.dashboard.views'), value: '89.4K', change: '+34%', color: '#60a5fa' },
    { label: t('hero.dashboard.aiGenerations'), value: '3,891', change: '+8%', color: '#f472b6' },
    { label: t('hero.dashboard.platforms'), value: '5', change: t('hero.dashboard.all'), color: '#4ade80' },
  ]

  const publications = [
    { title: t('hero.dashboard.video1'), platforms: 3, views: '12.4K', status: t('hero.dashboard.published'), statusColor: '#4ade80', statusBg: 'rgba(74,222,128,0.15)' },
    { title: t('hero.dashboard.video2'), platforms: 5, views: '8.7K', status: t('hero.dashboard.published'), statusColor: '#4ade80', statusBg: 'rgba(74,222,128,0.15)' },
    { title: t('hero.dashboard.video3'), platforms: 4, views: '—', status: t('hero.dashboard.inQueue'), statusColor: '#facc15', statusBg: 'rgba(250,204,21,0.15)' },
  ]

  return (
    <section aria-label="Hero" className="hero-bg" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '80px' }}>
      {/* Animated Background Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="animate-pulse-glow" style={{ position: 'absolute', top: '20%', left: '20%', width: '500px', height: '500px', background: 'rgba(139,92,246,0.12)', borderRadius: '50%', filter: 'blur(120px)' }} />
        <div className="animate-pulse-glow" style={{ position: 'absolute', bottom: '20%', right: '20%', width: '400px', height: '400px', background: 'rgba(59,130,246,0.1)', borderRadius: '50%', filter: 'blur(100px)', animationDelay: '1.5s' }} />
        <div className="animate-pulse-glow" style={{ position: 'absolute', top: '50%', right: '30%', width: '300px', height: '300px', background: 'rgba(236,72,153,0.08)', borderRadius: '50%', filter: 'blur(80px)', animationDelay: '3s' }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 100px' }}>
        <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto' }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="glass-light" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 18px', borderRadius: '100px', fontSize: '14px', color: '#c4b5fd', fontWeight: '500', marginBottom: '32px'
            }}>
              <Sparkles style={{ width: '16px', height: '16px', color: '#a78bfa' }} />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', fontWeight: '800',
              lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px', color: 'white'
            }}
          >
            {t('hero.titleStart')}
            <span className="gradient-text" style={{ fontStyle: 'normal' }}>
              {t('hero.titleHighlight')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#9ca3af',
              maxWidth: '720px', margin: '0 auto 40px', lineHeight: '1.7'
            }}
          >
            <strong style={{ color: 'white' }}>{t('hero.subtitleBold')}</strong>
            {t('hero.subtitleMiddle')}
            <span style={{ color: '#a78bfa' }}>{t('hero.subtitlePlatforms')}</span>
            {t('hero.subtitleMiddle2')}
            <span style={{ color: '#60a5fa' }}>{t('hero.subtitleSchedules')}</span>
            {t('hero.subtitleEnd')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '64px' }}
          >
            <a href="https://youpub.site/login" className="btn-primary"
              style={{ padding: '16px 32px', borderRadius: '16px', fontSize: '17px', fontWeight: '600', color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {t('hero.ctaPrimary')}
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </a>
            <a href="#interface" className="btn-secondary"
              style={{ padding: '16px 32px', borderRadius: '16px', fontSize: '17px', fontWeight: '600', color: '#c4b5fd', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Play style={{ width: '20px', height: '20px' }} />
              {t('hero.ctaSecondary')}
            </a>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}
          >
            <div style={{
              position: 'absolute', inset: '-16px',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2), rgba(236,72,153,0.2))',
              borderRadius: '24px', filter: 'blur(40px)'
            }} />

            <div className="glass" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              {/* Browser Bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
                background: 'rgba(17,24,39,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <div style={{ flex: 1, margin: '0 16px' }}>
                  <div style={{ background: '#1f2937', borderRadius: '8px', padding: '6px 16px', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
                    app.youpub.ru/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div style={{ background: 'rgba(17,24,39,0.6)', padding: '24px' }}>
                {/* Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{t('hero.dashboard.title')}</h3>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>{t('hero.dashboard.date')}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(139,92,246,0.2)', color: '#c4b5fd', fontSize: '13px', fontWeight: '500' }}>{t('hero.dashboard.uploadVideo')}</div>
                    <div style={{ padding: '8px 16px', borderRadius: '8px', background: '#1f2937', color: '#9ca3af', fontSize: '13px' }}>{t('hero.dashboard.settings')}</div>
                  </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  {stats.map((stat) => (
                    <div key={stat.label} style={{
                      background: 'rgba(31,41,55,0.6)', borderRadius: '12px', padding: '16px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{stat.label}</p>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>{stat.value}</p>
                      <p style={{ fontSize: '11px', color: stat.color, marginTop: '4px' }}>{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Platform Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {[
                    { name: 'YouTube', color: '#ef4444' },
                    { name: 'Telegram', color: '#60a5fa' },
                    { name: 'TikTok', color: '#fff' },
                    { name: 'Instagram', color: '#ec4899' },
                    { name: 'Pinterest', color: '#dc2626' },
                  ].map((p) => (
                    <div key={p.name} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '6px 12px', borderRadius: '8px',
                      background: 'rgba(31,41,55,0.6)', border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{p.name}</span>
                    </div>
                  ))}
                  <span style={{ fontSize: '12px', color: '#4ade80', marginLeft: 'auto' }}>{t('hero.dashboard.allConnected')}</span>
                </div>

                {/* Recent Publications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {publications.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px', borderRadius: '10px',
                      background: 'rgba(31,41,55,0.4)', border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '8px',
                          background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff'
                        }}>▶</div>
                        <div>
                          <p style={{ fontSize: '13px', color: 'white', fontWeight: '500' }}>{item.title}</p>
                          <p style={{ fontSize: '11px', color: '#6b7280' }}>{item.platforms} {t('hero.dashboard.platformsCount')} · {item.views} {t('hero.dashboard.viewsCount')}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: item.statusBg, color: item.statusColor }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

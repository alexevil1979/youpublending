import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../i18n/index.js'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  const navLinks = [
    { name: t('navbar.features'), href: '#features' },
    { name: t('navbar.interface'), href: '#interface' },
    { name: t('navbar.howItWorks'), href: '#how-it-works' },
    { name: t('navbar.pricing'), href: '#pricing' },
    { name: t('navbar.testimonials'), href: '#testimonials' },
    { name: t('navbar.faq'), href: '#faq' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close lang dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setLangOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setLangOpen(false)
  }

  const currentLang = supportedLanguages.find(l => l.code === i18n.language) || supportedLanguages[0]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : ''
      }`}
      style={scrolled ? { boxShadow: '0 4px 30px rgba(0,0,0,0.3)' } : {}}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Zap style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'white' }}>
              You<span className="gradient-text">Pub</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  padding: '8px 14px', fontSize: '14px', color: '#9ca3af',
                  textDecoration: 'none', borderRadius: '10px', transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA + Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden lg:flex">
            {/* Language Switcher */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 12px', fontSize: '13px', color: '#9ca3af',
                  background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#9ca3af' }}
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.code.toUpperCase()}</span>
                <ChevronDown style={{ width: '14px', height: '14px', transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                      minWidth: '160px', borderRadius: '12px', overflow: 'hidden',
                      background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                      zIndex: 100
                    }}
                  >
                    {supportedLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                          padding: '10px 14px', fontSize: '13px',
                          color: i18n.language === lang.code ? '#c4b5fd' : '#9ca3af',
                          background: i18n.language === lang.code ? 'rgba(139,92,246,0.1)' : 'transparent',
                          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => { if (i18n.language !== lang.code) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff' } }}
                        onMouseLeave={(e) => { if (i18n.language !== lang.code) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9ca3af' } }}
                      >
                        <span style={{ fontSize: '16px' }}>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}
              style={{ padding: '8px 16px', fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}>
              {t('navbar.login')}
            </a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}
              className="btn-primary"
              style={{ padding: '10px 20px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
              {t('navbar.startFree')}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
            aria-label={mobileOpen ? t('navbar.closeMenu', 'Закрыть меню') : t('navbar.openMenu', 'Открыть меню')}
            aria-expanded={mobileOpen}
            style={{ padding: '8px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div style={{ padding: '16px' }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: 'block', padding: '12px 16px', color: '#9ca3af',
                    textDecoration: 'none', borderRadius: '12px', fontSize: '15px'
                  }}>
                  {link.name}
                </a>
              ))}

              {/* Mobile Language Switcher */}
              <div style={{ padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '6px 12px', borderRadius: '8px', fontSize: '13px',
                      background: i18n.language === lang.code ? 'rgba(139,92,246,0.15)' : 'rgba(31,41,55,0.6)',
                      color: i18n.language === lang.code ? '#c4b5fd' : '#9ca3af',
                      border: i18n.language === lang.code ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '8px' }}>
                <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}
                  className="btn-primary"
                  style={{
                    display: 'block', textAlign: 'center', padding: '14px 20px',
                    borderRadius: '14px', fontSize: '14px', fontWeight: '600', color: 'white', textDecoration: 'none'
                  }}>
                  {t('navbar.startFree')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

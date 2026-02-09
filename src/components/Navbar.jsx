import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { name: 'Возможности', href: '#features' },
  { name: 'Интерфейс', href: '#interface' },
  { name: 'Как работает', href: '#how-it-works' },
  { name: 'Тарифы', href: '#pricing' },
  { name: 'Отзывы', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

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
                key={link.name}
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

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden lg:flex">
            <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}
              style={{ padding: '8px 16px', fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}>
              Войти
            </a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}
              className="btn-primary"
              style={{ padding: '10px 20px', borderRadius: '14px', fontSize: '14px', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
              Начать бесплатно
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
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
                <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: 'block', padding: '12px 16px', color: '#9ca3af',
                    textDecoration: 'none', borderRadius: '12px', fontSize: '15px'
                  }}>
                  {link.name}
                </a>
              ))}
              <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '8px' }}>
                <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}
                  className="btn-primary"
                  style={{
                    display: 'block', textAlign: 'center', padding: '14px 20px',
                    borderRadius: '14px', fontSize: '14px', fontWeight: '600', color: 'white', textDecoration: 'none'
                  }}>
                  Начать бесплатно
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

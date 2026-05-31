import { useEffect, useRef, useState } from 'react'

const C = {
  bg0:    '#0e0c0a', bgCard: '#201c17',
  border0:'rgba(255,240,220,0.06)', border1:'rgba(255,240,220,0.10)',
  text0:  '#f0e8da', text1: '#9a8878', text2: '#5a4e43',
  coral:  '#e8624a', gold: '#c9a96e',  rust: '#b85c3a',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'

const navLinks = [
  { label: 'Sobre mí',     href: '#about' },
  { label: 'Habilidades',  href: '#skills' },
  { label: 'Formación',    href: '#formation' },
  { label: 'Proyectos',    href: '#projects' },
  { label: 'Certificados', href: '#certificates' },
  { label: 'Contacto',     href: '#contact' },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [hoveredLink,   setHoveredLink]   = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // FIX #22: rootMargin en lugar de threshold alto — funciona con secciones largas
  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id) },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    const animateNav = (gsapInstance) => {
      gsapInstance.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      )
    }
    if (window.gsap) {
      animateNav(window.gsap)
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
      script.async = true
      script.onload = () => { if (window.gsap) animateNav(window.gsap) }
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        @media (max-width: 768px) {
          .nav-desktop   { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }

        /* FIX #21: padding lateral reducido en móvil */
        @media (max-width: 600px) {
          .nav-inner { padding: 0 20px !important; }
        }
      `}</style>

      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
        height: scrolled ? '54px' : '66px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(14,12,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom: `1px solid ${scrolled ? C.border0 : 'transparent'}`,
        transition: 'height 0.4s ease, background 0.4s ease, border-color 0.4s ease',
        fontFamily: FONT,
      }}>

        {/* FIX #21: padding en clase CSS para poder sobreescribir en móvil */}
        <div className="nav-inner" style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(0px, 0px, 0px) clamp(20px, 4vw, 48px)',
        }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <span style={{
              width: '26px', height: '26px', borderRadius: '7px',
              background: `linear-gradient(135deg, ${C.coral}, ${C.gold})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 800, color: '#fff',
              boxShadow: '0 2px 10px rgba(232,98,74,0.35)',
              flexShrink: 0, fontFamily: FONT,
            }}>IC</span>
            <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.03em', color: C.text0, fontFamily: FONT }}>
              Izan{' '}<span style={{ color: C.text2, fontWeight: 400 }}>Corcobado</span>
            </span>
          </a>

          {/* Enlaces de Escritorio */}
          <ul className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0px', listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map(link => {
              const id       = link.href.slice(1)
              const isActive = activeSection === id
              const isHover  = hoveredLink   === id
              return (
                <li key={id}>
                  <a
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '5px 14px', borderRadius: '980px',
                      fontSize: '13px', fontWeight: isActive ? 600 : 500,
                      letterSpacing: '-0.01em',
                      color: isActive ? C.text0 : isHover ? C.text0 : '#c8bfb4',
                      textDecoration: 'none',
                      background: isActive ? 'rgba(255,240,220,0.09)' : isHover ? 'rgba(255,240,220,0.06)' : 'transparent',
                      border: `1px solid ${isActive ? C.border1 : isHover ? C.border0 : 'transparent'}`,
                      transition: 'all 0.2s ease',
                      fontFamily: FONT,
                    }}
                  >
                    {isActive && (
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.coral, boxShadow: `0 0 6px ${C.coral}`, flexShrink: 0 }} />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Hamburguesa */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="nav-hamburger"
            aria-label="Menú"
            style={{
              display: 'none', width: '34px', height: '34px', borderRadius: '9px',
              background: C.bgCard, border: `1px solid ${C.border0}`, cursor: 'pointer',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: 0,
            }}
          >
            {[0, 1].map(i => (
              <span key={i} style={{
                display: 'block', width: '15px', height: '1.5px',
                background: C.text0, borderRadius: '2px', transition: 'transform 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(3.25px) rotate(45deg)' : 'translateY(-3.25px) rotate(-45deg)'
                  : 'none',
              }} />
            ))}
          </button>

        </div>
      </nav>

      {/* Menú Móvil */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 8999,
        background: 'rgba(10,8,6,0.97)', backdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
        opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease', fontFamily: FONT,
      }}>
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            onMouseEnter={e => { e.currentTarget.style.color = C.coral }}
            onMouseLeave={e => { e.currentTarget.style.color = C.text0 }}
            style={{
              fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 700, letterSpacing: '-0.04em',
              color: C.text0, textDecoration: 'none', fontFamily: FONT,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `color 0.2s ease, opacity 0.35s ease ${i * 0.06}s, transform 0.35s ease ${i * 0.06}s`,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
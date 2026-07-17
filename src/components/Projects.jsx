import { useEffect, useRef, useState } from 'react'

const C = {
  // FIX #14: bg correcto para Projects — bg4 según los design tokens
  bg4:         '#1a1612',
  bgCard:      '#201c17',
  bgCardHover: '#272018',
  border0:     'rgba(255,240,220,0.06)',
  border1:     'rgba(255,240,220,0.10)',
  text0:       '#f0e8da',
  text1:       '#9a8878',
  text2:       '#5a4e43',
  coral:       '#e8624a',
  gold:        '#c9a96e',
  rust:        '#b85c3a',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'

function IconWifi() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="58" r="5" fill="white" fillOpacity="0.95"/>
      <path d="M27 45a18.5 18.5 0 0126 0" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" strokeOpacity="0.9"/>
      <path d="M18 36a30 30 0 0144 0" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" strokeOpacity="0.6"/>
      <path d="M9 27a42 42 0 0162 0" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" strokeOpacity="0.35"/>
    </svg>
  )
}
function IconAnomaly() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <polyline
        points="4,42 16,42 22,34 28,50 34,38 40,14 46,50 52,38 58,44 64,44 76,44"
        stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" fill="none"
      />
      <circle cx="40" cy="14" r="4.5" fill="white" fillOpacity="0.95"/>
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path
        d="M40 8L14 20v22c0 18 11.5 33 26 38 14.5-5 26-20 26-38V20L40 8z"
        stroke="white" strokeWidth="3" strokeLinejoin="round" fill="none" strokeOpacity="0.9"
      />
      <polyline
        points="28,40 36,48 52,32"
        stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}
function IconVPN() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="14" cy="40" r="8" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.9"/>
      <circle cx="66" cy="40" r="8" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.9"/>
      <line x1="22" y1="40" x2="32" y2="40" stroke="white" strokeWidth="2.5" strokeOpacity="0.5"/>
      <line x1="48" y1="40" x2="58" y2="40" stroke="white" strokeWidth="2.5" strokeOpacity="0.5"/>
      <rect x="30" y="31" width="20" height="18" rx="4" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.9"/>
      <path d="M34 31v-4a6 6 0 0112 0v4" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="40" cy="41" r="2.5" fill="white" fillOpacity="0.9"/>
    </svg>
  )
}
function IconStack() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect x="12" y="18" width="56" height="14" rx="5" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.9"/>
      <rect x="12" y="37" width="56" height="14" rx="5" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.6"/>
      <rect x="12" y="56" width="56" height="14" rx="5" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.35"/>
      <circle cx="24" cy="25" r="3" fill="white" fillOpacity="0.9"/>
      <circle cx="24" cy="44" r="3" fill="white" fillOpacity="0.6"/>
      <circle cx="24" cy="63" r="3" fill="white" fillOpacity="0.35"/>
    </svg>
  )
}
// Nuevo icono para Network Agent: radar de escaneo, coherente con el resto
// (mismos círculos concéntricos que IconWifi/IconStack, mismo grosor de trazo)
function IconScan() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="28" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.3"/>
      <circle cx="40" cy="40" r="18" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.55"/>
      <circle cx="40" cy="40" r="8" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.9"/>
      <line x1="40" y1="40" x2="61" y2="20" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.9"/>
      <circle cx="58" cy="23" r="4.5" fill="white" fillOpacity="0.95"/>
    </svg>
  )
}

const projects = [
  {
    id: '01',
    title: 'Red WiFi',
    titleAccent: 'desde cero.',
    category: 'Redes · Infraestructura',
    summary: 'Infraestructura de red completa con servicios DHCP, DNS y HTTP propios. Sin dependencia de routers externos ni servicios de terceros.',
    tags: ['Linux', 'BIND9', 'ISC-DHCP', 'Apache2'],
    accent: C.coral,
    imageBg: 'linear-gradient(135deg, #c44a34 0%, #e8624a 60%, #f07a60 100%)',
    Icon: IconWifi,
  },
  {
    id: '02',
    title: 'Detección de',
    titleAccent: 'anomalías.',
    category: 'Seguridad · Machine Learning',
    summary: 'Sistema automatizado que detecta comportamientos anómalos en logs de Apache usando Isolation Forest sin reglas manuales.',
    tags: ['Python', 'scikit-learn', 'Apache2', 'Cron'],
    accent: C.gold,
    imageBg: 'linear-gradient(135deg, #a07830 0%, #c9a96e 60%, #dfc088 100%)',
    Icon: IconAnomaly,
  },
  {
    id: '03',
    title: 'Bloqueo de anuncios',
    titleAccent: 'en la red.',
    category: 'Redes · DNS · Hardware',
    summary: 'Servidor DNS en Raspberry Pi 4 que filtra publicidad y rastreadores para todos los dispositivos sin configuración por cliente.',
    tags: ['Raspberry Pi', 'Pi-hole', 'DNS', 'SSH'],
    accent: '#7eb88a',
    imageBg: 'linear-gradient(135deg, #4a8a5a 0%, #7eb88a 60%, #9ecfaa 100%)',
    Icon: IconShield,
  },
  {
    id: '04',
    title: 'VPN site-to-site',
    titleAccent: 'WireGuard.',
    category: 'Redes · Seguridad',
    summary: 'Interconexión cifrada de dos nodos mediante un túnel WireGuard. Todo el tráfico viaja cifrado sin exposición a la red pública.',
    tags: ['WireGuard', 'VPN', 'Linux', 'Redes'],
    accent: '#bf8af2',
    imageBg: 'linear-gradient(135deg, #7a4abf 0%, #bf8af2 60%, #d4aaff 100%)',
    Icon: IconVPN,
  },
  {
    id: '05',
    title: 'Despliegue web',
    titleAccent: 'WordPress.',
    category: 'Servidores · CMS · Seguridad',
    summary: 'Plataforma de salud y bienestar construida desde cero con identidad gráfica propia, tienda online, foro privado y copias de seguridad automatizadas, entre otras.',
    tags: ['WordPress', 'WooCommerce', 'bbPress', 'Elementor'],
    accent: C.gold,
    imageBg: 'linear-gradient(135deg, #a07830 0%, #c9a96e 60%, #dfc088 100%)',
    Icon: IconStack,
  },
  {
    id: '06',
    title: 'Vigilancia de red',
    titleAccent: 'con IA.',
    category: 'Seguridad · IA · Automatización',
    summary: 'Sistema que escanea la red cada noche con Nmap, analiza el riesgo de cada dispositivo con IA y avisa por email y Telegram cuando detecta algo crítico. Todo visible en un dashboard de Grafana.',
    tags: ['Python', 'Nmap', 'Groq API', 'SQLite', 'Grafana', 'n8n'],
    accent: '#5a9fd4',
    imageBg: 'linear-gradient(135deg, #2c6b96 0%, #5a9fd4 60%, #86c0ea 100%)',
    Icon: IconScan,
  },
]

const CARD_GAP = 20

// FIX #15: ProjectCard definida ANTES del export default
function ProjectCard({ p, cardWidth }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = p

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // FIX #12: ancho dinámico pasado como prop
        width: `${cardWidth}px`,
        flexShrink: 0,
        background: hovered ? C.bgCardHover : C.bgCard,
        borderRadius: '20px',
        border: `1px solid ${hovered ? C.border1 : C.border0}`,
        boxShadow: hovered
          ? `0 0 0 1px rgba(255,240,220,0.12), 0 24px 64px rgba(0,0,0,0.75)`
          : `0 0 0 1px rgba(255,240,220,0.06), 0 4px 24px rgba(0,0,0,0.5)`,
        transform: hovered ? 'translateY(-8px) translateZ(0)' : 'translateY(0) translateZ(0)',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.34,1.4,0.64,1)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: FONT,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    >
      {/* Área imagen */}
      <div style={{
        width: '100%',
        height: '220px',
        background: p.imageBg,
        borderRadius: '20px 20px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }} />
        <div style={{
          transform: hovered ? 'scale(1.12) translateZ(0)' : 'scale(1) translateZ(0)',
          transition: 'transform 0.45s cubic-bezier(0.34,1.4,0.64,1)',
          filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.25))',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}>
          <Icon />
        </div>
        <div style={{
          position: 'absolute', top: '16px', left: '18px',
          fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.7)',
          background: 'rgba(0,0,0,0.2)',
          padding: '4px 10px', borderRadius: '980px',
          backdropFilter: 'blur(8px)',
          fontFamily: FONT,
        }}>{p.id}</div>
        <div style={{
          position: 'absolute', top: '16px', right: '18px',
          fontSize: '10px', color: 'rgba(255,255,255,0.6)',
          background: 'rgba(0,0,0,0.2)',
          padding: '4px 10px', borderRadius: '980px',
          backdropFilter: 'blur(8px)',
          letterSpacing: '0.04em',
          fontFamily: FONT,
        }}>{p.category}</div>
      </div>

      {/* Contenido */}
      <div style={{ padding: '28px 28px 30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* FIX #32: título con clamp para adaptarse cuando la card es más estrecha en móvil */}
        <h3 style={{
          fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 800, letterSpacing: '-0.04em',
          lineHeight: 1.0, color: C.text0, marginBottom: '4px', fontFamily: FONT,
        }}>
          {p.title}
        </h3>
        <h3 style={{
          fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 800, letterSpacing: '-0.04em',
          lineHeight: 1.0, color: p.accent, marginBottom: '18px', fontFamily: FONT,
        }}>
          {p.titleAccent}
        </h3>
        <p style={{
          fontSize: '16px', color: C.text1, lineHeight: 1.75,
          flex: 1, marginBottom: '22px', fontFamily: FONT,
        }}>
          {p.summary}
        </p>
        <div style={{ height: '1px', background: C.border0, marginBottom: '16px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              padding: '5px 12px', borderRadius: '980px',
              fontSize: '12px', fontWeight: 500,
              background: `${p.accent}12`, color: p.accent,
              border: `1px solid ${p.accent}25`,
              letterSpacing: '0.02em', fontFamily: FONT,
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Accent line bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', background: p.accent,
        borderRadius: '0 0 20px 20px',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const [current,   setCurrent]   = useState(0)
  const [dragging,  setDragging]  = useState(false)
  const [startX,    setStartX]    = useState(0)
  const [dragDelta, setDragDelta] = useState(0)

  // FIX #12: cardWidth dinámico según el ancho del viewport
  const [cardWidth, setCardWidth] = useState(400)

  useEffect(() => {
    const calcCardWidth = () => {
      const vw = window.innerWidth
      if (vw < 480) {
        // En móvil: casi todo el ancho menos padding y peek
        setCardWidth(vw - 72)
      } else if (vw < 768) {
        setCardWidth(Math.min(400, vw - 96))
      } else {
        setCardWidth(400)
      }
    }
    calcCardWidth()
    window.addEventListener('resize', calcCardWidth)
    return () => window.removeEventListener('resize', calcCardWidth)
  }, [])

  const CARD_STRIDE = cardWidth + CARD_GAP
  const total    = projects.length
  const maxIndex = total - 1

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex))
    setCurrent(clamped)
    if (window.gsap) {
      window.gsap.to(trackRef.current, {
        x: -clamped * CARD_STRIDE,
        duration: 0.6,
        ease: 'power3.out',
      })
    } else {
      trackRef.current.style.transform = `translateX(${-clamped * CARD_STRIDE}px)`
    }
  }

  // Resync posición cuando cambia cardWidth (resize)
  useEffect(() => {
    if (!trackRef.current) return
    trackRef.current.style.transform = `translateX(${-current * CARD_STRIDE}px)`
  }, [cardWidth, current, CARD_STRIDE])

  const onPointerDown = (e) => {
    setDragging(true)
    setStartX(e.clientX)
    setDragDelta(0)
    trackRef.current.style.cursor = 'grabbing'
  }
  const onPointerMove = (e) => {
    if (!dragging) return
    const d = e.clientX - startX
    setDragDelta(d)
    if (window.gsap) {
      window.gsap.set(trackRef.current, { x: -current * CARD_STRIDE + d })
    } else {
      trackRef.current.style.transform = `translateX(${-current * CARD_STRIDE + d}px)`
    }
  }
  const onPointerUp = () => {
    if (!dragging) return
    setDragging(false)
    trackRef.current.style.cursor = 'grab'
    if (dragDelta < -60)     goTo(current + 1)
    else if (dragDelta > 60) goTo(current - 1)
    else                     goTo(current)
  }

  useEffect(() => {
    let activeCtx = null
    const initGSAP = (gsapInstance) => {
      activeCtx = gsapInstance.context(() => {
        const tl = gsapInstance.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
        })
        tl.fromTo('.pr-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
        ).fromTo('.pr-heading',
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.4'
        ).fromTo('.pr-track-wrap',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3'
        )
      }, sectionRef)
    }
    const loadScript = (src) => new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src; script.async = true; script.onload = resolve
      document.head.appendChild(script)
    })
    const setup = async () => {
      if (!window.gsap) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
      if (!window.ScrollTrigger) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js')
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger)
        initGSAP(window.gsap)
      }
    }
    setup()
    return () => { if (activeCtx) activeCtx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        // FIX #14: bg4 correcto
        background: C.bg4,
        padding: '160px 0 120px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        /* FIX #13: padding del carrusel reducido en móvil para que el peek funcione */
        @media (max-width: 600px) {
          .pr-track-outer { padding-left: 24px !important; }
          .pr-header-pad  { padding: 0 24px !important; }
        }
      `}</style>

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(${C.border0} 1px, transparent 1px), linear-gradient(90deg, ${C.border0} 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.5) 80%, transparent)',
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', right: '-0.02em', top: '50%',
        transform: 'translateY(-52%)',
        fontSize: 'clamp(200px, 26vw, 380px)',
        fontWeight: 800, letterSpacing: '-0.06em',
        fontFamily: FONT,
        color: 'transparent',
        WebkitTextStroke: `1px ${C.border0}`,
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>06</div>

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,98,74,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="pr-header-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

          {/* Label */}
          <div className="pr-label" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text2, fontFamily: FONT }}>Proyectos</span>
            <div style={{ flex: 1, height: '1px', background: C.border0 }} />
            <span style={{ fontSize: '11px', color: C.text2, letterSpacing: '0.12em', fontFamily: FONT }}>06</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
            <h2
              className="pr-heading"
              style={{
                fontSize: 'clamp(52px, 7.5vw, 110px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                color: C.text0,
                fontFamily: FONT,
              }}
            >
              Lo que he<br />
              <span style={{ color: C.coral }}>construido.</span>
            </h2>

            {/* Counter + flechas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <span style={{ fontSize: '13px', color: C.text2, letterSpacing: '0.04em', marginRight: '6px', fontFamily: FONT }}>
                <span style={{ color: C.text0, fontWeight: 700 }}>{String(current + 1).padStart(2, '0')}</span>
                {' / '}
                {String(total).padStart(2, '0')}
              </span>

              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                onMouseEnter={e => { if (current > 0) e.currentTarget.style.transform = 'scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: current === 0 ? 'transparent' : C.bgCardHover,
                  border: `1px solid ${current === 0 ? C.border0 : C.border1}`,
                  color: current === 0 ? C.text2 : C.text0,
                  fontSize: '17px', cursor: current === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  fontFamily: FONT,
                }}
              >←</button>

              <button
                onClick={() => goTo(current + 1)}
                disabled={current === maxIndex}
                onMouseEnter={e => { if (current < maxIndex) e.currentTarget.style.transform = 'scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: current === maxIndex ? 'transparent' : `linear-gradient(135deg, ${C.coral}, #b85c3a)`,
                  border: `1px solid ${current === maxIndex ? C.border0 : 'transparent'}`,
                  color: '#fff', fontSize: '17px',
                  cursor: current === maxIndex ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  opacity: current === maxIndex ? 0.3 : 1,
                  boxShadow: current < maxIndex ? '0 4px 16px rgba(232,98,74,0.35)' : 'none',
                  fontFamily: FONT,
                }}
              >→</button>
            </div>
          </div>
        </div>

        {/* FIX #13: clase pr-track-outer para controlar padding en móvil */}
        <div className="pr-track-wrap pr-track-outer" style={{ overflow: 'hidden', paddingLeft: '48px' }}>
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              cursor: 'grab',
              userSelect: 'none',
              willChange: 'transform',
            }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} cardWidth={cardWidth} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '7px', marginTop: '36px' }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width:  i === current ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                background: i === current ? C.coral : C.border1,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
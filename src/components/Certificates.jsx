import { useEffect, useRef, useState } from 'react'

const C = {
  // FIX #16: nombre de variable corregido — bg5 es '#1c1713' según los design tokens
  bg5: '#1c1713',
  bgCard: '#201c17', bgCardHover: '#272018',
  border0: 'rgba(255,240,220,0.06)', border1: 'rgba(255,240,220,0.10)', border2: 'rgba(255,240,220,0.18)',
  text0: '#f0e8da', text1: '#9a8878', text2: '#5a4e43',
  gold: '#c9a96e',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'

const certs = [
  {
    id: '01', title: 'AWS Academy Graduate',
    subtitle: 'Cloud Developing — Training Badge',
    issuer: 'AWS Academy', accent: '#ff9900',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  },
  {
    id: '02', title: 'Python Essentials 1',
    subtitle: 'Statement of Achievement',
    issuer: 'Cisco Networking Academy × OpenEDG', accent: '#3776ab',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
  },
  {
    id: '03', title: 'Domina la IA con Gemini',
    subtitle: 'Certificado de Finalización',
    issuer: 'Santander Open Academy × Google', accent: '#4285f4',
    logoUrl: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
  },
]

function IconRenderer({ src, alt, color, isHovered }) {
  const [error, setError] = useState(false)
  if (error) return <span style={{ fontSize: '36px', filter: `drop-shadow(0 0 12px ${color})` }}>🏅</span>
  return (
    <img
      src={src} alt={alt} onError={() => setError(true)}
      style={{
        filter: isHovered ? `drop-shadow(0 0 20px ${color})` : `drop-shadow(0 0 10px ${color}80)`,
        transition: 'all 0.4s ease', width: '64px', height: '64px', objectFit: 'contain',
      }}
    />
  )
}

function GridCard({ cert }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="ct-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        // FIX #17: flex ajustado para que las cards crezcan más en tablets
        flex: '1 1 260px',
        // FIX #17: maxWidth eliminado en favor de control por media query
        minHeight: '360px',
        background: hovered ? C.bgCardHover : C.bgCard,
        borderRadius: '24px',
        border: `1px solid ${hovered ? C.border2 : C.border0}`,
        boxShadow: hovered
          ? `0 28px 56px -12px rgba(0,0,0,0.85), inset 0 1px 0 0 rgba(255,255,255,0.06)`
          : '0 8px 32px -10px rgba(0,0,0,0.5)',
        transform: hovered ? 'translateY(-12px) translateZ(0)' : 'translateY(0) translateZ(0)',
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: '48px 24px 36px',
        textAlign: 'center', cursor: 'pointer',
        position: 'relative', overflow: 'hidden', fontFamily: FONT,
        backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', willChange: 'transform',
      }}
    >
      {/* Accent line top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${cert.accent}, transparent)`,
      }} />

      <div style={{
        position: 'absolute', top: '25%', left: '50%',
        transform: hovered ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)',
        width: '140px', height: '140px',
        background: `radial-gradient(circle, ${cert.accent}15 0%, transparent 75%)`,
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
      }} />

      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconRenderer src={cert.logoUrl} alt={cert.title} color={cert.accent} isHovered={hovered} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: cert.accent, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px', fontFamily: FONT }}>
          {cert.issuer}
        </p>
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: C.text0, margin: '0 0 10px', lineHeight: 1.25, letterSpacing: '-0.02em', fontFamily: FONT }}>
          {cert.title}
        </h3>
        <p style={{ fontSize: '14.5px', fontWeight: 500, color: C.text1, margin: 0, lineHeight: 1.5, padding: '0 8px', fontFamily: FONT }}>
          {cert.subtitle}
        </p>
      </div>
    </div>
  )
}

export default function Certificates() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let activeCtx = null
    const initGSAP = (gsapInstance) => {
      activeCtx = gsapInstance.context(() => {
        const tl = gsapInstance.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
        })
        tl.fromTo('.ct-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
        ).fromTo('.ct-title',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4'
        ).fromTo('.ct-rule',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.1, ease: 'power4.inOut' }, '-=0.3'
        ).fromTo('.ct-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5'
        ).fromTo('.ct-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.3'
        )
      }, sectionRef)
    }
    const loadScript = (src) => new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src; script.async = true
      script.onload = resolve; script.onerror = reject
      document.head.appendChild(script)
    })
    const setup = async () => {
      try {
        if (!window.gsap) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
        if (!window.ScrollTrigger) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js')
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger)
          initGSAP(window.gsap)
        }
      } catch (err) {
        console.error('Error cargando GSAP en Certificates:', err)
      }
    }
    setup()
    return () => { if (activeCtx) activeCtx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="certificates"
      // FIX #16: usar bg5 en lugar de bg3
      style={{ background: C.bg5, padding: '160px 0 120px', position: 'relative', overflow: 'hidden', fontFamily: FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        @media (max-width: 860px) {
          .ct-cards { justify-content: center !important; }
          /* FIX #17: en tablets las cards se expanden para llenar bien el espacio */
          .ct-card  { flex: 1 1 240px !important; max-width: calc(50% - 12px) !important; }
        }
        @media (max-width: 600px) {
          .ct-section-pad { padding: 0 24px !important; }
          /* FIX #17: en móvil la card ocupa todo el ancho */
          .ct-card        { flex: 1 1 100% !important; max-width: 100% !important; min-height: 300px !important; padding: 36px 20px 28px !important; }
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
        position: 'absolute', right: '-0.02em', top: '50%', transform: 'translateY(-52%)',
        fontSize: 'clamp(200px, 26vw, 380px)', fontWeight: 800, letterSpacing: '-0.06em',
        fontFamily: FONT, color: 'transparent', WebkitTextStroke: `1px ${C.border0}`,
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>06</div>

      {/* Glow */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%', width: '460px', height: '460px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div className="ct-section-pad" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="ct-label" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text2, fontFamily: FONT }}>Certificaciones</span>
          <div style={{ flex: 1, height: '1px', background: C.border0 }} />
          <span style={{ fontSize: '11px', color: C.text2, letterSpacing: '0.12em', fontFamily: FONT }}>06</span>
        </div>

        {/* Heading */}
        <h2 className="ct-title" style={{
          fontSize: 'clamp(52px, 7.5vw, 100px)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 0.95, color: C.text0,
          marginBottom: '32px', fontFamily: FONT,
        }}>
          Lo que tengo <br /><span style={{ color: C.gold }}>acreditado.</span>
        </h2>

        {/* Rule */}
        <div className="ct-rule" style={{
          height: '1px',
          background: `linear-gradient(90deg, ${C.gold}77 0%, rgba(255,240,220,0.10) 35%, transparent 100%)`,
          marginBottom: '32px',
        }} />

        <p className="ct-desc" style={{
          fontSize: '18px', color: C.text1, maxWidth: '480px',
          lineHeight: 1.7, letterSpacing: '-0.01em', marginBottom: '72px', fontFamily: FONT,
        }}>
          Certificaciones de plataformas oficiales. Cada una representa horas reales de estudio y práctica.
        </p>

        {/* Tarjetas */}
        <div className="ct-cards" style={{
          display: 'flex', justifyContent: 'center', alignItems: 'stretch',
          gap: '24px', flexWrap: 'wrap', padding: '20px 0',
        }}>
          {certs.map((cert) => (
            <GridCard key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '60px', paddingTop: '30px',
          borderTop: `1px solid ${C.border0}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '13px', color: C.text2, fontFamily: FONT, margin: 0 }}>
            Más certificaciones en progreso — ASIR, redes y cloud.
          </p>
          <div style={{ fontSize: '12px', color: C.text1, fontFamily: FONT }}>Formación activa</div>
        </div>

      </div>
    </section>
  )
}
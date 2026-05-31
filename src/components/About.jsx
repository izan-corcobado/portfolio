import { useEffect, useRef, useState } from 'react'

const C = {
  bg1: '#13110e',
  // FIX #7: usar los tokens correctos en lugar de colores hardcodeados
  bgCard:      '#201c17',
  bgCardHover: '#272018',
  border0: 'rgba(255,240,220,0.06)', border1: 'rgba(255,240,220,0.10)',
  text0: '#f0e8da', text1: '#9a8878', text2: '#5a4e43',
  coral: '#e8624a', gold: '#c9a96e', sage: '#7eb88a', purple: '#bf8af2',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'

const IconInfra = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect x="4" y="8" width="44" height="12" rx="3" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.9" fill="none"/>
    <rect x="4" y="25" width="44" height="12" rx="3" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.55" fill="none"/>
    <circle cx="41" cy="14" r="2.2" fill="currentColor" fillOpacity="0.9"/>
    <circle cx="41" cy="31" r="2.2" fill="currentColor" fillOpacity="0.55"/>
    <line x1="4" y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 3" strokeOpacity="0.3"/>
  </svg>
)
const IconCloud = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <path d="M13 36a9 9 0 0 1 0-18 14 14 0 0 1 27.3 3.6A7 7 0 0 1 40 36H13z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeOpacity="0.9" fill="none"/>
    <line x1="14" y1="42" x2="14" y2="47" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.55"/>
    <line x1="26" y1="42" x2="26" y2="47" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.55"/>
    <line x1="38" y1="42" x2="38" y2="47" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.55"/>
  </svg>
)
const IconLinux = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect x="4" y="6" width="44" height="30" rx="3.5" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.9" fill="none"/>
    <polyline points="13,20 20,27 13,34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9"/>
    <line x1="26" y1="34" x2="39" y2="34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.55"/>
    <line x1="26" y1="40" x2="26" y2="46" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.3"/>
    <line x1="17" y1="46" x2="35" y2="46" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.3"/>
  </svg>
)
const IconAI = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="6.5" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.9" fill="none"/>
    <circle cx="6"  cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.9" fill="none"/>
    <circle cx="46" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.9" fill="none"/>
    <circle cx="6"  cy="40" r="3.5" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.55" fill="none"/>
    <circle cx="46" cy="40" r="3.5" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.55" fill="none"/>
    <line x1="20.5" y1="21.5" x2="9"   y2="14.5" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.5"/>
    <line x1="31.5" y1="21.5" x2="43"  y2="14.5" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.5"/>
    <line x1="20.5" y1="30.5" x2="9"   y2="37.5" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.3"/>
    <line x1="31.5" y1="30.5" x2="43"  y2="37.5" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.3"/>
  </svg>
)

const cards = [
  {
    Icon: IconInfra,
    accent: C.coral,
    title: 'Infraestructura',
    desc: 'Me engancha montar cosas desde cero — una red, un servidor, un servicio. Entender cada capa antes de pasar a la siguiente.',
  },
  {
    Icon: IconCloud,
    accent: C.gold,
    title: 'Cloud & Redes',
    desc: 'El cloud me parece donde todo converge. AWS, DNS, firewalls — me gusta saber qué pasa exactamente cuando envías un paquete.',
  },
  {
    Icon: IconLinux,
    accent: C.sage,
    title: 'Automatización',
    desc: 'Hacer que los sistemas trabajen solos tiene algo adictivo. Un script bien hecho que te ahorra horas — eso no tiene precio.',
  },
  {
    Icon: IconAI,
    accent: C.purple,
    title: 'IA aplicada',
    desc: 'Lo que más me motiva no es lo que sé — es todo lo que todavía me queda por aprender.',
  },
]

function AreaCard({ card }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = card
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // FIX #7: usar C.bgCard / C.bgCardHover en lugar de colores hardcodeados
        background: hovered ? C.bgCardHover : C.bgCard,
        borderRadius: '24px',
        border: `1px solid ${hovered ? `${card.accent}35` : C.border1}`,
        padding: '32px 32px 34px',
        display: 'flex', flexDirection: 'column', gap: '14px',
        position: 'relative', overflow: 'hidden',
        transform: hovered ? 'translateY(-4px) translateZ(0)' : 'translateY(0) translateZ(0)',
        transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
        backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', willChange: 'transform',
        cursor: 'default', boxSizing: 'border-box', fontFamily: FONT,
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${card.accent}, transparent)` }} />
      <div style={{ color: card.accent, display: 'flex', alignItems: 'center' }}>
        <div style={{ transform: 'scale(0.72)', transformOrigin: 'left center' }}><Icon /></div>
      </div>
      <h3 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: C.text0, margin: 0, lineHeight: 1.3, fontFamily: FONT }}>
        {card.title}
      </h3>
      {/* FIX #6: fontSize reducido en cards — clamp para que no sea tan grande en móvil */}
      <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: C.text1, lineHeight: 1.75, margin: 0, letterSpacing: '-0.005em', fontFamily: FONT }}>
        {card.desc}
      </p>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let activeCtx = null
    const initGSAP = (gsapInstance) => {
      activeCtx = gsapInstance.context(() => {
        gsapInstance.fromTo('.ab-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true } })
        gsapInstance.fromTo('.ab-heading',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.ab-heading', start: 'top 88%', once: true } })
        gsapInstance.fromTo('.ab-rule',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.1, ease: 'power4.inOut',
            scrollTrigger: { trigger: '.ab-rule', start: 'top 92%', once: true } })
        gsapInstance.fromTo('.ab-body > *',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.13, ease: 'power3.out',
            scrollTrigger: { trigger: '.ab-body', start: 'top 90%', once: true } })
        gsapInstance.fromTo('.ab-card',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: '.ab-cards', start: 'top 90%', once: true } })
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
      id="about"
      style={{ background: C.bg1, padding: '160px 0 140px', position: 'relative', overflow: 'hidden', fontFamily: FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        @media (max-width: 860px) {
          .ab-body  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ab-cards { grid-template-columns: 1fr !important; }
          .ab-quote { position: static !important; border-left: 3px solid #c9a96e; padding-left: 22px !important; }
        }

        @media (max-width: 600px) {
          .ab-section-pad { padding: 100px 24px 100px !important; }
          /* FIX #5: quote con menos padding en móvil pequeño para no ahogar el contenido */
          .ab-quote { padding-left: 16px !important; }
        }
      `}</style>

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(${C.border0} 1px, transparent 1px), linear-gradient(90deg, ${C.border0} 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.45) 15%, rgba(0,0,0,0.45) 85%, transparent)',
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', right: '-0.02em', top: '50%', transform: 'translateY(-52%)',
        fontSize: 'clamp(200px, 26vw, 380px)', fontWeight: 800, letterSpacing: '-0.06em',
        fontFamily: FONT, color: 'transparent', WebkitTextStroke: `1px ${C.border0}`,
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>02</div>

      {/* Glows */}
      <div style={{ position: 'absolute', top: '-5%', right: '5%', width: '560px', height: '560px', borderRadius: '50%', background: `radial-gradient(circle, ${C.coral}0e 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '0%', left: '-5%', width: '480px', height: '480px', borderRadius: '50%', background: `radial-gradient(circle, ${C.gold}0b 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />

      <div className="ab-section-pad" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="ab-label" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text2, fontFamily: FONT }}>Sobre mí</span>
          <div style={{ flex: 1, height: '1px', background: C.border0 }} />
          <span style={{ fontSize: '11px', color: C.text2, letterSpacing: '0.12em', fontFamily: FONT }}>02</span>
        </div>

        {/* Heading */}
        <h2 className="ab-heading" style={{
          fontSize: 'clamp(52px, 7.5vw, 100px)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 32px', color: C.text0, fontFamily: FONT,
        }}>
          Lo que{' '}<span style={{ color: C.coral }}>debes saber.</span>
        </h2>

        {/* Rule */}
        <div className="ab-rule" style={{
          height: '1px',
          background: `linear-gradient(90deg, ${C.coral}77 0%, ${C.border1} 35%, transparent 100%)`,
          marginBottom: '80px',
        }} />

        {/* Body */}
        <div className="ab-body" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '72px', alignItems: 'start', marginBottom: '72px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: 'clamp(17px, 1.8vw, 22px)', color: C.text0, lineHeight: 1.7, letterSpacing: '-0.02em', margin: 0, fontFamily: FONT }}>
              Me importa entender cómo funciona todo por dentro. No me basta con que algo funcione — necesito saber por qué lo hace, y por qué falla cuando lo hace.
            </p>
            <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', color: C.text1, lineHeight: 1.85, letterSpacing: '-0.01em', margin: 0, fontFamily: FONT }}>
              La tecnología me atrae porque nunca para: cloud, infraestructura, ciberseguridad, IA... hay tanto que aprender que nunca me aburro. Ahora mismo lo que más me engancha es la automatización — hacer que los sistemas trabajen solos tiene algo que no tiene techo.
            </p>
            <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', color: C.text1, lineHeight: 1.85, letterSpacing: '-0.01em', margin: 0, fontFamily: FONT }}>
              Soy curioso, práctico y meticuloso con lo que hago. Aprendo rápido y me adapto. Prefiero el lab al PowerPoint, y cuando algo se rompe, no paro hasta entender el porqué.
            </p>
          </div>

          {/* Quote */}
          <div className="ab-quote" style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: '26px', position: 'sticky', top: '120px' }}>
            <p style={{ fontSize: 'clamp(14px, 1.4vw, 18px)', color: C.text0, lineHeight: 1.7, letterSpacing: '-0.02em', fontWeight: 600, fontStyle: 'italic', margin: '0 0 14px', fontFamily: FONT }}>
              "Lo que más me motiva no es lo que sé — es todo lo que todavía me queda por aprender."
            </p>
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold, fontFamily: FONT }}>
              Izan Corcobado
            </span>
          </div>
        </div>

        {/* Cards 2x2 */}
        <div className="ab-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {cards.map((card, i) => (
            <div key={i} className="ab-card">
              <AreaCard card={card} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
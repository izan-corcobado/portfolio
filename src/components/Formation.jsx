import { useEffect, useRef, useState } from 'react'

const C = {
  bg3: '#181410',
  border0: 'rgba(255,240,220,0.06)', border1: 'rgba(255,240,220,0.10)',
  text0: '#f0e8da', text1: '#9a8878', text2: '#5a4e43',
  coral: '#e8624a', gold: '#c9a96e', sage: '#7eb88a',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'

// FIX #11: viewBox corregido a coordenadas positivas para evitar recortes
const IconDiploma = ({ color }) => (
  <svg width="56" height="56" viewBox="0 0 140 120" fill="none">
    <rect x="26" y="26" width="88" height="68" rx="5" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5"/>
    <ellipse cx="26" cy="60" rx="7" ry="34" fill={color} fillOpacity="0.28"/>
    <ellipse cx="114" cy="60" rx="7" ry="34" fill={color} fillOpacity="0.28"/>
    <ellipse cx="26" cy="60" rx="4" ry="28" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
    <ellipse cx="114" cy="60" rx="4" ry="28" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
    <rect x="32" y="32" width="76" height="56" rx="2" fill={color} fillOpacity="0.10"/>
    <rect x="48" y="46" width="44" height="5" rx="2.5" fill={color} fillOpacity="0.55"/>
    <rect x="54" y="56" width="32" height="4" rx="2" fill={color} fillOpacity="0.38"/>
    <rect x="50" y="66" width="40" height="4" rx="2" fill={color} fillOpacity="0.38"/>
    <rect x="58" y="76" width="24" height="3" rx="1.5" fill={color} fillOpacity="0.28"/>
    <path d="M60,58 Q66,50 70,58 Q74,66 80,58" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="70" cy="58" r="3.5" fill={color}/>
  </svg>
)

// FIX #11: viewBox corregido para el birrete
const IconBirrete = ({ color }) => (
  <svg width="56" height="56" viewBox="0 0 140 120" fill="none">
    <polygon points="70,8 126,36 70,64 14,36" fill={color} fillOpacity="0.9"/>
    <polygon points="70,64 126,36 126,46 70,74" fill={color} fillOpacity="0.55"/>
    <polygon points="70,64 14,36 14,46 70,74" fill={color} fillOpacity="0.35"/>
    <path d="M42,50 Q42,88 70,92 Q98,88 98,50" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="1.4"/>
    <path d="M42,50 Q42,46 70,44 Q98,46 98,50" fill={color} fillOpacity="0.55"/>
    <line x1="126" y1="36" x2="126" y2="70" stroke={color} strokeWidth="2" strokeOpacity="0.8"/>
    <line x1="126" y1="70" x2="112" y2="88" stroke={color} strokeWidth="2" strokeOpacity="0.8"/>
    <line x1="112" y1="88" x2="106" y2="106" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
    <line x1="112" y1="88" x2="112" y2="108" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
    <line x1="112" y1="88" x2="118" y2="106" stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
    <circle cx="112" cy="88" r="4" fill={color}/>
    <circle cx="70" cy="36" r="4" fill={color}/>
  </svg>
)

const steps = [
  {
    accent: C.gold,
    status: 'Completado',
    period: '2024 — 2026',
    title: 'Técnico en Sistemas Microinformáticos y Redes',
    level: 'Ciclo Medio · IFP',
    desc: 'Dos años aprendiendo desde la base: hardware, redes locales, sistemas operativos, virtualización y mantenimiento. El sitio donde todo empezó a tener sentido.',
    highlight: 'Redes LAN, Virtualización y Mantenimiento de Sistemas.',
    Icon: IconDiploma,
  },
  {
    accent: C.coral,
    status: 'Próximo',
    period: '2026 — 2028',
    title: 'Administración de Sistemas Informáticos en Red',
    level: 'Ciclo Superior · IFP',
    desc: 'El siguiente paso natural. Más cloud, más profundidad en redes, más automatización. El camino apunta a cloud, seguridad o IA aplicada a sistemas.',
    highlight: 'Cloud, Seguridad de Redes y Automatización.',
    Icon: IconBirrete,
  },
]

function FormationCard({ step }) {
  const [hovered, setHovered] = useState(false)
  const Icon = step.Icon
  return (
    <div
      className="fo-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1a1612',
        border: `1px solid ${hovered ? 'rgba(255,240,220,0.18)' : C.border1}`,
        borderRadius: '24px',
        // FIX #10: padding con clamp para tablets intermedias
        padding: 'clamp(28px, 3vw, 44px) clamp(28px, 4vw, 52px)',
        position: 'relative', overflow: 'hidden', fontFamily: FONT,
        transform: hovered ? 'translateY(-4px) translateZ(0)' : 'translateY(0) translateZ(0)',
        transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
        backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', willChange: 'transform',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${step.accent}, transparent)` }} />

      <div className="fo-card-inner" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '44px' }}>
        <div style={{ flexShrink: 0, opacity: 0.92 }}>
          <Icon color={step.accent} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 700, letterSpacing: '-0.03em', color: C.text0, margin: '0 0 6px', lineHeight: 1.2, fontFamily: FONT }}>
              {step.title}
            </h3>
            <span style={{ fontSize: '13px', color: C.text2, letterSpacing: '0.01em', fontFamily: FONT }}>
              {step.level}
            </span>
          </div>
          <p style={{ fontSize: 'clamp(14px, 1.4vw, 18px)', color: C.text1, lineHeight: 1.7, margin: 0, letterSpacing: '-0.01em', fontFamily: FONT }}>
            {step.desc} Focus en: <strong style={{ color: C.text0, fontWeight: 600 }}>{step.highlight}</strong>
          </p>
        </div>
        <div className="fo-card-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: step.accent, background: `${step.accent}12`, border: `1px solid ${step.accent}25`,
            borderRadius: '980px', padding: '4px 12px', fontFamily: FONT,
          }}>{step.status}</span>
          <span style={{ fontSize: '13px', color: C.text2, letterSpacing: '0.02em', fontFamily: FONT }}>
            {step.period}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Formation() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let activeCtx = null
    const initGSAP = (gsapInstance) => {
      activeCtx = gsapInstance.context(() => {
        gsapInstance.fromTo('.fo-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true } })
        gsapInstance.fromTo('.fo-heading',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.fo-heading', start: 'top 88%', once: true } })
        gsapInstance.fromTo('.fo-rule',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.1, ease: 'power4.inOut',
            scrollTrigger: { trigger: '.fo-rule', start: 'top 92%', once: true } })
        gsapInstance.fromTo('.fo-card',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.fo-grid', start: 'top 90%', once: true } })
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
      id="formation"
      style={{ background: C.bg3, padding: '160px 0 140px', position: 'relative', overflow: 'hidden', fontFamily: FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        @media (max-width: 768px) {
          .fo-card-inner { flex-direction: column !important; gap: 24px !important; }
          .fo-card-meta  { align-items: flex-start !important; flex-direction: row !important; gap: 12px !important; }
        }
        @media (max-width: 600px) {
          .fo-section-pad { padding: 0 24px !important; }
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
      }}>04</div>

      {/* Glows */}
      <div style={{ position: 'absolute', top: '-5%', left: '5%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${C.gold}0c 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '0%', right: '-5%', width: '420px', height: '420px', borderRadius: '50%', background: `radial-gradient(circle, ${C.coral}09 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />

      <div className="fo-section-pad" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="fo-label" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text2, fontFamily: FONT }}>Formación</span>
          <div style={{ flex: 1, height: '1px', background: C.border0 }} />
          <span style={{ fontSize: '11px', color: C.text2, letterSpacing: '0.12em', fontFamily: FONT }}>04</span>
        </div>

        {/* Heading */}
        <h2 className="fo-heading" style={{
          fontSize: 'clamp(52px, 7.5vw, 100px)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 32px', color: C.text0, fontFamily: FONT,
        }}>
          El camino{' '}<span style={{ color: C.gold }}>hasta aquí.</span>
        </h2>

        {/* Rule */}
        <div className="fo-rule" style={{
          height: '1px',
          background: `linear-gradient(90deg, ${C.gold}77 0%, rgba(255,240,220,0.10) 35%, transparent 100%)`,
          marginBottom: '80px',
        }} />

        {/* Grid */}
        <div className="fo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {steps.map((step, i) => (
            <FormationCard key={i} step={step} />
          ))}
        </div>

      </div>
    </section>
  )
}
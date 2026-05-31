import { useEffect, useRef, useState } from 'react'

const C = {
  bg0:    '#0e0c0a',
  bgCard: '#201c17',
  border0:'rgba(255,240,220,0.06)',
  border1:'rgba(255,240,220,0.10)',
  text0:  '#f0e8da',
  text1:  '#9a8878',
  text2:  '#5a4e43',
  coral:  '#e8624a',
  gold:   '#c9a96e',
  rust:   '#b85c3a',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'
const ROLES = ['Técnico en Sistemas', 'Sysadmin en formación', 'Cloud & Redes', 'Ciberseguridad', 'IA & Machine learning']

export default function Hero() {
  const sectionRef   = useRef(null)
  const canvasRef    = useRef(null)
  const [roleIdx,    setRoleIdx]    = useState(0)
  const [displayed,  setDisplayed]  = useState('')
  const [phase,      setPhase]      = useState('typing')
  const [hoveredBtn, setHoveredBtn] = useState(null)

  // Typewriter
  useEffect(() => {
    let t
    const cur = ROLES[roleIdx]
    if (phase === 'typing') {
      if (displayed.length < cur.length)
        t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 52)
      else
        t = setTimeout(() => setPhase('pause'), 1800)
    } else if (phase === 'pause') {
      t = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (displayed.length > 0)
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28)
      else { setRoleIdx(i => (i + 1) % ROLES.length); setPhase('typing') }
    }
    return () => clearTimeout(t)
  }, [displayed, phase, roleIdx])

  // Particle canvas
  // FIX #3: usar getBoundingClientRect para evitar offsetWidth=0 en primer render
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W = 0, H = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      W = canvas.width  = rect.width  || canvas.offsetWidth  || window.innerWidth
      H = canvas.height = rect.height || canvas.offsetHeight || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 0.9 + 0.3,
      a: Math.random() * 0.18 + 0.04,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      })
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(201,169,110,${0.055 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${p.a})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // GSAP entrance
  useEffect(() => {
    let activeCtx = null
    const initGSAP = (gsapInstance) => {
      activeCtx = gsapInstance.context(() => {
        const tl = gsapInstance.timeline({ delay: 0.1 })
        tl.fromTo('.h-name-line',
            { opacity: 0, y: 80, skewY: 3 },
            { opacity: 1, y: 0, skewY: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' })
          .fromTo('.h-sub',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
          .fromTo('.h-btns',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.15')
      }, sectionRef)
    }
    if (window.gsap) {
      initGSAP(window.gsap)
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
      script.async = true
      script.onload = () => { if (window.gsap) initGSAP(window.gsap) }
      document.head.appendChild(script)
    }
    return () => { if (activeCtx) activeCtx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        background: C.bg0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* FIX #4: scrollLine sin transform-origin dentro de keyframes */
        @keyframes scrollLine {
          0%   { transform: scaleX(0); }
          50%  { transform: scaleX(1); }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes fadeInSlow { from{opacity:0} to{opacity:0.3} }

        /* FIX #2: padding lateral del Hero en media query, igual que el resto */
        .h-section-pad { padding: 0 6vw; }

        @media (max-width: 768px) {
          .h-bottom-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .h-actions {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
          .h-social  { flex-wrap: wrap !important; }
          .h-cta     { flex-wrap: wrap !important; }
          .h-divider { display: none !important; }
        }

        /* FIX #2: padding reducido en móvil pequeño */
        @media (max-width: 600px) {
          .h-section-pad { padding: 0 24px !important; }
        }
      `}</style>

      {/* Canvas partículas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Glows */}
      <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,98,74,0.055) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.055) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* FIX #2: padding ahora en clase CSS controlable por media query */}
      <div className="h-section-pad" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', width: '100%' }}>

        {/* FIX #1: wordBreak en el nombre para que no se salga en móvil muy pequeño */}
        <div style={{ overflow: 'hidden', marginBottom: '2px' }}>
          <h1 className="h-name-line" style={{
            fontSize: 'clamp(56px, 14vw, 200px)',
            fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.9,
            color: C.text0, margin: 0, fontFamily: FONT,
            wordBreak: 'break-word',
          }}>Izan</h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '40px' }}>
          <h1 className="h-name-line" style={{
            fontSize: 'clamp(56px, 14vw, 200px)',
            fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.9,
            color: 'transparent', WebkitTextStroke: `2px ${C.gold}`,
            margin: 0, fontFamily: FONT,
            wordBreak: 'break-word',
          }}>Corcobado</h1>
        </div>

        {/* Fila inferior */}
        <div className="h-bottom-row" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          paddingTop: '16px',
          borderTop: `1px solid ${C.border0}`,
        }}>

          {/* Typewriter */}
          <div className="h-sub" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: 'clamp(14px, 1.8vw, 20px)',
            color: C.text1, letterSpacing: '-0.02em',
            minHeight: '30px', fontFamily: FONT,
          }}>
            <span>{displayed}</span>
            <span style={{
              display: 'inline-block', width: '2px', height: '1.1em',
              background: C.coral, marginLeft: '2px',
              animation: 'blink 1s step-end infinite',
            }} />
          </div>

          {/* Botones + social */}
          <div className="h-btns h-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>

            {/* GitHub + LinkedIn */}
            <div className="h-social" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[
                {
                  label: 'GitHub',
                  href: 'https://github.com/izan-corcobado',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/izan-corcobado-p%C3%A9rez-b4a868398/',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={e => {
                    e.currentTarget.style.color = C.text0
                    e.currentTarget.style.borderColor = C.border1
                    e.currentTarget.style.background = C.bgCard
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.text1
                    e.currentTarget.style.borderColor = C.border0
                    e.currentTarget.style.background = 'transparent'
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '9px 16px', borderRadius: '980px',
                    fontSize: '13px', fontWeight: 500,
                    color: C.text1, textDecoration: 'none',
                    border: `1px solid ${C.border0}`,
                    background: 'transparent',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap', fontFamily: FONT,
                  }}
                >
                  {s.icon}{s.label}
                </a>
              ))}
            </div>

            {/* Divisor vertical */}
            <div className="h-divider" style={{ width: '1px', height: '28px', background: C.border0, flexShrink: 0 }} />

            {/* Botones CTA */}
            <div className="h-cta" style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'Ver proyectos', href: '#projects', primary: true },
                { label: 'Contactar',     href: '#contact',  primary: false },
              ].map(btn => (
                <a
                  key={btn.label}
                  href={btn.href}
                  onMouseEnter={() => setHoveredBtn(btn.label)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    padding: '11px 24px', borderRadius: '980px',
                    fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em',
                    textDecoration: 'none', transition: 'all 0.22s ease',
                    background: btn.primary
                      ? hoveredBtn === btn.label
                        ? 'linear-gradient(135deg, #f07358, #d4b070)'
                        : `linear-gradient(135deg, ${C.coral}, ${C.rust})`
                      : hoveredBtn === btn.label ? C.bgCard : 'rgba(255,240,220,0.04)',
                    color: btn.primary ? '#fff' : C.text0,
                    border: btn.primary ? 'none' : `1px solid ${hoveredBtn === btn.label ? C.border1 : C.border0}`,
                    boxShadow: btn.primary
                      ? hoveredBtn === btn.label
                        ? '0 6px 28px rgba(232,98,74,0.5)'
                        : '0 2px 16px rgba(232,98,74,0.28)'
                      : 'none',
                    transform: hoveredBtn === btn.label ? 'translateY(-2px)' : 'translateY(0)',
                    whiteSpace: 'nowrap', fontFamily: FONT,
                  }}
                >{btn.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FIX #4: transformOrigin en el elemento, no en keyframes */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '6vw',
        display: 'flex', alignItems: 'center', gap: '12px',
        opacity: 0.3, zIndex: 1,
        animation: 'fadeInSlow 1s ease 2s both',
      }}>
        <div style={{
          width: '32px', height: '1px', background: C.text2,
          transformOrigin: 'left center',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: '10px', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: C.text2, fontFamily: FONT,
        }}>scroll</span>
      </div>
    </section>
  )
}
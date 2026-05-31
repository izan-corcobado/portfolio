import { useEffect, useRef, useState } from 'react'

const C = {
  bg2: '#161210',
  border0: 'rgba(255,240,220,0.06)', border1: 'rgba(255,240,220,0.10)',
  text0: '#f0e8da', text1: '#9a8878', text2: '#5a4e43',
  coral: '#e8624a', gold: '#c9a96e', sage: '#7eb88a',
  purple: '#bf8af2', blue: '#7ab8d4',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'

const IconRedes = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="5" rx="2"/>
    <rect x="2" y="10" width="20" height="5" rx="2"/>
    <line x1="2" y1="19" x2="22" y2="19"/>
    <circle cx="19" cy="19" r="2"/>
  </svg>
)
const IconSistemas = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const IconCloud = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14a7 7 0 0 1 13.4-2.8A4.5 4.5 0 0 1 20 20H5a3 3 0 0 1-1-5.8"/>
  </svg>
)
const IconSeguridad = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconDesarrollo = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

const skillGroups = [
  {
    Icon: IconRedes, accent: C.coral, title: 'Redes & Servicios',
    desc: 'Montado y configurado desde cero, sin atajos. DNS, mail, proxy, DHCP — cada servicio levantado a mano.',
    skills: ['DNS · BIND9', 'WEB · Apache2', 'FTP · ProFTPD', 'DHCP · isc-dhcp-server', 'Postfix', 'Dovecot', 'PROXY · Squid', 'OpenSSH', 'WiFi AP'],
    large: true,
  },
  {
    Icon: IconSistemas, accent: C.gold, title: 'Sistemas',
    desc: 'Administración de entornos Windows y Linux, directorios activos e integración entre sistemas heterogéneos.',
    skills: ['Windows Server 2025', 'Active Directory', 'Ubuntu Server', 'Samba AD', 'OpenLDAP'],
    large: true,
  },
  {
    Icon: IconCloud, accent: C.sage, title: 'Cloud & Apps',
    desc: 'Despliegue de aplicaciones y servicios cloud en entornos reales.',
    skills: ['AWS', 'Nextcloud', 'WordPress', 'Moodle'],
    large: false,
  },
  {
    Icon: IconSeguridad, accent: C.purple, title: 'Seguridad',
    desc: 'Base sólida en análisis de red y logs. Explorando herramientas ofensivas y defensivas — la dirección que más me atrae.',
    skills: ['Kali Linux', 'Nmap', 'ffuf', 'Wireshark', 'WireGuard', 'Pi-hole', 'Análisis de logs'],
    large: false,
  },
  {
    Icon: IconDesarrollo, accent: C.blue, title: 'Desarrollo',
    desc: 'Web y scripting para construir y automatizar.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Python'],
    large: false,
  },
]

function SkillCard({ group, large }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = group
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1a1612',
        border: `1px solid ${hovered ? group.accent + '35' : 'rgba(255,240,220,0.10)'}`,
        borderRadius: '24px',
        // FIX #9: padding con clamp para tablets intermedias
        padding: large
          ? 'clamp(28px, 3vw, 44px) clamp(28px, 3.5vw, 52px)'
          : 'clamp(24px, 2.5vw, 36px) clamp(24px, 3vw, 40px)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden', fontFamily: FONT,
        transform: hovered ? 'translateY(-4px) translateZ(0)' : 'translateY(0) translateZ(0)',
        transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
        backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', willChange: 'transform',
        height: '100%', boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${group.accent}, transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <Icon color={group.accent} />
        <h3 style={{ fontSize: large ? '22px' : '18px', fontWeight: 700, letterSpacing: '-0.02em', color: C.text0, margin: 0, fontFamily: FONT }}>
          {group.title}
        </h3>
      </div>
      <div style={{ height: '1px', background: 'rgba(255,240,220,0.06)', margin: '20px 0' }} />
      <p style={{ fontSize: large ? 'clamp(15px, 1.5vw, 18px)' : '15px', color: C.text1, lineHeight: 1.75, margin: '0 0 28px', letterSpacing: '-0.01em', fontFamily: FONT }}>
        {group.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
        {group.skills.map(skill => (
          <span key={skill} style={{
            padding: '6px 14px', borderRadius: '980px', fontSize: '12px', fontWeight: 500,
            color: group.accent, background: group.accent + '14', border: `1px solid ${group.accent}30`, fontFamily: FONT,
          }}>{skill}</span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let activeCtx = null
    const initGSAP = (gsapInstance) => {
      activeCtx = gsapInstance.context(() => {
        gsapInstance.fromTo('.sk-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true } })
        gsapInstance.fromTo('.sk-heading',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.sk-heading', start: 'top 88%', once: true } })
        gsapInstance.fromTo('.sk-rule',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.1, ease: 'power4.inOut',
            scrollTrigger: { trigger: '.sk-rule', start: 'top 92%', once: true } })
        gsapInstance.fromTo('.sk-card',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.sk-grid', start: 'top 90%', once: true } })
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

  const large = skillGroups.filter(g => g.large)
  const small = skillGroups.filter(g => !g.large)

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        background: C.bg2, padding: '160px 0 140px', fontFamily: FONT,
        position: 'relative', overflow: 'hidden',
        // FIX #8: borderRadius y marginTop eliminados — deben venir de App.jsx section-wrap
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        @media (max-width: 860px) {
          .sk-row-large { grid-template-columns: 1fr !important; }
          .sk-row-small { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .sk-section-pad { padding: 0 24px !important; }
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
      }}>03</div>

      {/* Glows */}
      <div style={{ position: 'absolute', top: '-5%', left: '5%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${C.gold}0c 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '0%', right: '-5%', width: '420px', height: '420px', borderRadius: '50%', background: `radial-gradient(circle, ${C.coral}09 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />

      <div className="sk-section-pad" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="sk-label" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text2, fontFamily: FONT }}>Habilidades</span>
          <div style={{ flex: 1, height: '1px', background: C.border0 }} />
          <span style={{ fontSize: '11px', color: C.text2, letterSpacing: '0.12em', fontFamily: FONT }}>03</span>
        </div>

        {/* Heading */}
        <h2 className="sk-heading" style={{
          fontSize: 'clamp(52px, 7.5vw, 100px)', fontWeight: 800, letterSpacing: '-0.04em',
          lineHeight: 0.95, margin: '0 0 32px', color: C.text0, fontFamily: FONT,
        }}>
          Con qué{' '}<span style={{ color: C.gold }}>trabajo.</span>
        </h2>

        {/* Rule */}
        <div className="sk-rule" style={{
          height: '1px',
          background: `linear-gradient(90deg, ${C.gold}77 0%, ${C.border1} 35%, transparent 100%)`,
          marginBottom: '80px',
        }} />

        {/* Grid */}
        <div className="sk-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="sk-row-large" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {large.map((group, i) => (
              <div key={i} className="sk-card" style={{ display: 'flex' }}>
                <SkillCard group={group} large={true} />
              </div>
            ))}
          </div>
          <div className="sk-row-small" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {small.map((group, i) => (
              <div key={i} className="sk-card" style={{ display: 'flex' }}>
                <SkillCard group={group} large={false} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
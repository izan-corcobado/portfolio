import { useState, useEffect } from 'react'

const LINKS = ['Inicio','Proyectos','Sobre mí','Contacto']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      height:64, display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'0 clamp(24px,5vw,80px)',
      background: scrolled ? 'rgba(3,5,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition:'all .4s ease',
    }}>
      <span style={{
        fontFamily:"'Orbitron', sans-serif",
        fontSize:13, color:'var(--accent)', letterSpacing:3
      }}>
        &lt;PORTFOLIO /&gt;
      </span>
      <div style={{ display:'flex', gap:32 }}>
        {LINKS.map(link => (
          <a key={link}
            href={`#${link.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s/g,'').toLowerCase()}`}
            style={{
              fontFamily:"'Space Mono', monospace",
              fontSize:11, letterSpacing:2, textTransform:'uppercase',
              color:'var(--muted)', textDecoration:'none',
              transition:'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}
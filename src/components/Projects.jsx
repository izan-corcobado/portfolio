export default function Projects() {
  return (
    <section id="proyectos" style={{ padding:'120px clamp(24px,8vw,120px)' }}>
      <p style={{
        fontFamily:"'Space Mono', monospace", fontSize:11,
        color:'var(--accent)', letterSpacing:4,
        textTransform:'uppercase', marginBottom:8,
      }}>
        &gt; 02_proyectos
      </p>
      <h2 style={{
        fontFamily:"'Orbitron', sans-serif",
        fontSize:'clamp(32px,5vw,64px)', fontWeight:700,
        color:'var(--text)', marginBottom:64,
      }}>
        PROYECTOS
      </h2>

      <div style={{
        display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', gap:20,
        padding:'80px 40px',
        background:'rgba(255,255,255,0.02)',
        border:'1px solid var(--border)',
        borderRadius:12, textAlign:'center',
      }}>
        <div style={{
          fontFamily:"'Space Mono', monospace",
          fontSize:48, color:'rgba(255,255,255,0.08)',
          letterSpacing:8,
        }}>
          [ _ ]
        </div>

        <p style={{
          fontFamily:"'Inter', sans-serif",
          fontSize:15, lineHeight:1.7,
          color:'var(--muted)', maxWidth:400,
        }}>
          Estoy construyendo mis primeros proyectos.<br />
          Vuelve pronto — hay cosas interesantes en camino.
        </p>

        <span style={{
          fontFamily:"'Space Mono', monospace",
          fontSize:11, letterSpacing:4,
          color:'var(--accent)',
          textTransform:'uppercase',
          padding:'8px 20px',
          border:'1px solid var(--border)',
          borderRadius:4,
        }}>
          Próximamente
        </span>
      </div>
    </section>
  )
}
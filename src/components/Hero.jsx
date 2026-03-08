import Particles from '../blocks/Particles/Particles'
import DecryptedText from '../blocks/DecryptedText/DecryptedText'
import SplitText from '../blocks/SplitText/SplitText'

export default function Hero() {
  return (
    <section id="inicio" style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column',
      justifyContent:'center', padding:'0 clamp(24px,8vw,120px)',
      overflow:'hidden',
    }}>
      <Particles
        particleColors={['#3B82F6','#93C5FD','#ffffff']}
        particleCount={120}
        moveParticlesOnHover={true}
        style={{ position:'absolute', inset:0, zIndex:0 }}
      />

      <div style={{ position:'relative', zIndex:1, maxWidth:820 }}>
        <p style={{
          fontFamily:"'Space Mono', monospace",
          fontSize:11, letterSpacing:4, color:'var(--accent)',
          textTransform:'uppercase', marginBottom:24,
        }}>
          &gt; Hola, soy
        </p>

        <h1 style={{
          fontFamily:"'Orbitron', sans-serif",
          fontSize:'clamp(36px,6vw,80px)',
          fontWeight:900, lineHeight:1.1,
          color:'var(--text)', marginBottom:16,
        }}>
          <DecryptedText
            text="Izan Corcobado"
            animateOn="load"
            speed={80}
            sequential={true}
          />
        </h1>

        <div style={{
          fontFamily:"'Orbitron', sans-serif",
          fontSize:'clamp(14px,2vw,22px)',
          color:'var(--accent2)', marginBottom:40, letterSpacing:3,
        }}>
          <SplitText
            text="ESTUDIANTE · FUTURO SYSADMIN"
            delay={30}
            animationFrom={{ opacity:0, y:20 }}
            animationTo={{ opacity:1, y:0 }}
          />
        </div>

        <p style={{
          fontFamily:"'Inter', sans-serif",
          fontSize:16, lineHeight:1.8,
          color:'var(--muted)', maxWidth:520, marginBottom:52,
        }}>
          Estudiante de SMX en Mataró, Barcelona. Apasionado por la tecnología
          y la administración de sistemas. Construyendo las bases para convertirme
          en sysadmin — un comando a la vez.
        </p>

        <div style={{ display:'flex', gap:16 }}>
          <a href="#proyectos" style={{
            padding:'14px 32px', background:'var(--accent)', color:'#fff',
            fontFamily:"'Space Mono', monospace", fontSize:12, letterSpacing:2,
            textDecoration:'none', borderRadius:2, textTransform:'uppercase', fontWeight:700,
          }}>
            Ver proyectos →
          </a>
          <a href="#contacto" style={{
            padding:'14px 32px',
            border:'1px solid var(--border)', color:'var(--muted)',
            fontFamily:"'Space Mono', monospace", fontSize:12, letterSpacing:2,
            textDecoration:'none', borderRadius:2, textTransform:'uppercase',
          }}>
            Contacto
          </a>
        </div>
      </div>
    </section>
  )
}
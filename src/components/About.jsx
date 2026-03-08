import KeyboardScene from './KeyboardScene/KeyboardScene'

const METAS = [
  {
    icon: '🛡️',
    title: 'Ciberseguridad',
    desc: 'Interesado en cómo se protegen los sistemas y qué los hace vulnerables.',
    color: '#F05032',
  },
  {
    icon: '☁️',
    title: 'Cloud & AWS',
    desc: 'Interesado en infraestructura cloud y actualmente formándome en AWS.',
    color: '#FF9900',
  },
  {
    icon: '🖥️',
    title: 'Administración de Sistemas',
    desc: 'Interesado en la gestión de servidores, redes y sistemas Linux.',
    color: '#FCC624',
  },
]

export default function About() {
  return (
    <section id="sobremi" style={{ padding: '120px clamp(24px,8vw,120px)' }}>
      <p style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11,
        color: 'var(--accent)', letterSpacing: 4,
        textTransform: 'uppercase', marginBottom: 8,
      }}>
        &gt; 03_sobre_mi
      </p>
      <h2 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700,
        color: 'var(--text)', marginBottom: 64,
      }}>
        SOBRE MÍ
      </h2>

      {/* Bio + Metas */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, marginBottom: 80, alignItems: 'start',
      }}>
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, lineHeight: 1.8,
            color: 'var(--muted)', marginBottom: 20,
          }}>
            Soy Izan, estudiante de SMX en Mataró, Barcelona. Me apasiona entender
            cómo funciona la tecnología por dentro — no solo usarla, sino saber el
            porqué de cada cosa. Me gusta investigar por mi cuenta y mantenerme al
            día de cómo evoluciona el mundo tech.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, lineHeight: 1.8, color: 'var(--muted)',
          }}>
            Cada vez me atrae más el mundo de la ciberseguridad — cómo se protegen
            los sistemas, qué los hace vulnerables y cómo defenderlos. El año que
            viene empiezo ASIX para especializarme en infraestructura, redes y cloud,
            y convertir esa curiosidad en mi profesión.
          </p>
        </div>

        {/* Metas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            letterSpacing: 3, color: 'var(--accent2)',
            textTransform: 'uppercase', marginBottom: 8,
          }}>
            &gt; Mis intereses
          </p>
          {METAS.map(meta => (
            <div key={meta.title} style={{
              display: 'flex', alignItems: 'flex-start', gap: 16,
              padding: '20px 20px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
              transition: 'border-color .3s, background .3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${meta.color}30`
                e.currentTarget.style.background = `${meta.color}08`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${meta.color}15`,
                border: `1px solid ${meta.color}30`,
                fontSize: 18,
              }}>
                {meta.icon}
              </div>
              <div>
                <p style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 13, fontWeight: 700,
                  color: 'var(--text)', marginBottom: 4,
                }}>
                  {meta.title}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13, lineHeight: 1.6,
                  color: 'var(--muted)', margin: 0,
                }}>
                  {meta.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <p style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11,
        color: 'var(--accent2)', letterSpacing: 3,
        textTransform: 'uppercase', marginBottom: 24,
      }}>
        &gt; Stack tecnológico — interactivo
      </p>
      <KeyboardScene />
    </section>
  )
}
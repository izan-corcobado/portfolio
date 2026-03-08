const CERTIFICATES = [
  {
    id: 'python',
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy · Python Institute',
    date: 'Dic 2025',
    status: 'completed',
    color: '#FFD43B',
    icon: '🐍',
    desc: 'Programación en Python 3, estructuras de datos, funciones, depuración y automatización de scripts.',
    pdf: '/certificado-python.pdf',
  },
  {
    id: 'aws',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'En progreso',
    status: 'progress',
    color: '#FF9900',
    icon: '☁️',
    desc: 'Fundamentos de cloud computing, servicios AWS, seguridad y arquitectura en la nube.',
    pdf: null,
  },
]

function CertCard({ cert }) {
  return (
    <div
      style={{
        padding: '32px 28px',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${cert.color}20`,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color .3s, background .3s, transform .3s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${cert.color}50`
        e.currentTarget.style.background = `${cert.color}06`
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${cert.color}20`
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${cert.color}, transparent)`,
      }} />

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 24,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${cert.color}15`,
          border: `1px solid ${cert.color}30`,
          fontSize: 24,
        }}>
          {cert.icon}
        </div>

        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 2,
          padding: '5px 12px', borderRadius: 4,
          textTransform: 'uppercase',
          background: cert.status === 'completed'
            ? 'rgba(110,231,183,0.08)'
            : 'rgba(251,191,36,0.08)',
          border: cert.status === 'completed'
            ? '1px solid rgba(110,231,183,0.25)'
            : '1px solid rgba(251,191,36,0.25)',
          color: cert.status === 'completed' ? '#6EE7B7' : '#FBbf24',
        }}>
          {cert.status === 'completed' ? '✓ Obtenido' : '⟳ En progreso'}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 18, fontWeight: 700,
        color: 'var(--text)', marginBottom: 8,
      }}>
        {cert.title}
      </h3>

      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11, letterSpacing: 1,
        color: cert.color, marginBottom: 16,
      }}>
        {cert.issuer} · {cert.date}
      </p>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13, lineHeight: 1.7,
        color: 'var(--muted)', margin: 0, flex: 1,
      }}>
        {cert.desc}
      </p>

      {cert.pdf && (
        <a
          href={cert.pdf}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 24, alignSelf: 'flex-start',
            padding: '10px 20px',
            background: `${cert.color}10`,
            border: `1px solid ${cert.color}30`,
            borderRadius: 6, textDecoration: 'none',
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 2,
            color: cert.color, textTransform: 'uppercase',
            transition: 'background .2s, border-color .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${cert.color}20`
            e.currentTarget.style.borderColor = `${cert.color}60`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${cert.color}10`
            e.currentTarget.style.borderColor = `${cert.color}30`
          }}
        >
          ↗ Ver certificado
        </a>
      )}
    </div>
  )
}

export default function Certificates() {
  return (
    <section id="certificados" style={{ padding: '120px clamp(24px,8vw,120px)' }}>
      <p style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11,
        color: 'var(--accent)', letterSpacing: 4,
        textTransform: 'uppercase', marginBottom: 8,
      }}>
        &gt; 03_certificados
      </p>
      <h2 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700,
        color: 'var(--text)', marginBottom: 64,
      }}>
        CERTIFICADOS
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
      }}>
        {CERTIFICATES.map(cert => (
          <CertCard key={cert.id} cert={cert} />
        ))}
      </div>
    </section>
  )
}
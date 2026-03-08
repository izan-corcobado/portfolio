import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)

  const inputStyle = {
    width:'100%', boxSizing:'border-box',
    background:'rgba(255,255,255,0.02)',
    border:'1px solid rgba(255,255,255,0.06)',
    borderRadius:8, padding:'16px 20px',
    fontFamily:"'Inter', sans-serif",
    fontSize:14, color:'var(--text)', outline:'none',
    transition:'border-color .2s, background .2s',
  }

  return (
    <section id="contacto" style={{ padding:'120px clamp(24px,8vw,120px) 80px' }}>
      <p style={{
        fontFamily:"'Space Mono', monospace", fontSize:11,
        color:'var(--accent)', letterSpacing:4,
        textTransform:'uppercase', marginBottom:8,
      }}>
        &gt; 04_contacto
      </p>
      <h2 style={{
        fontFamily:"'Orbitron', sans-serif",
        fontSize:'clamp(32px,5vw,64px)', fontWeight:700,
        color:'var(--text)', marginBottom:64,
      }}>
        CONTACTO
      </h2>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80 }}>
        <div>
          <h3 style={{
            fontFamily:"'Orbitron', sans-serif",
            fontSize:'clamp(20px,3vw,32px)',
            color:'var(--text)', lineHeight:1.3, marginBottom:20,
          }}>
            ¿Tienes algo<br />en mente?
          </h3>
          <p style={{
            fontFamily:"'Inter', sans-serif",
            fontSize:15, lineHeight:1.8,
            color:'var(--muted)', marginBottom:40,
          }}>
            Estoy abierto a colaboraciones, prácticas y cualquier
            propuesta interesante. No dudes en escribirme.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              ['✉', 'contacta.izan@gmail.com'],
              ['📍', 'Mataró, Barcelona'],
              ['⚡', 'Estudiando'],
            ].map(([icon, text]) => (
              <div key={text} style={{
                display:'flex', alignItems:'center', gap:16,
                padding:'14px 18px',
                background:'rgba(255,255,255,0.02)',
                border:'1px solid rgba(255,255,255,0.05)',
                borderRadius:8,
              }}>
                <span style={{ fontSize:16 }}>{icon}</span>
                <span style={{
                  fontFamily:"'Space Mono', monospace",
                  fontSize:12, color:'var(--muted)',
                }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {sent ? (
          <div style={{
            display:'flex', flexDirection:'column',
            justifyContent:'center', alignItems:'center',
            background:'rgba(59,130,246,0.05)',
            border:'1px solid rgba(59,130,246,0.2)',
            borderRadius:16, padding:48, textAlign:'center',
          }}>
            <div style={{
              width:64, height:64, borderRadius:'50%',
              background:'rgba(59,130,246,0.1)',
              border:'1px solid rgba(59,130,246,0.3)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:28, marginBottom:24,
              boxShadow:'0 0 30px rgba(59,130,246,0.2)',
            }}>
              ✓
            </div>
            <h4 style={{
              fontFamily:"'Orbitron', sans-serif",
              fontSize:18, color:'var(--accent)', marginBottom:12,
            }}>
              ¡Mensaje enviado!
            </h4>
            <p style={{
              fontFamily:"'Inter', sans-serif",
              fontSize:14, color:'var(--muted)',
            }}>
              Te responderé lo antes posible.
            </p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {['name', 'email'].map(field => (
              <input
                key={field}
                name={field}
                placeholder={field === 'name' ? 'Tu nombre' : 'Tu email'}
                value={form[field]}
                onChange={e => setForm({...form, [e.target.name]: e.target.value})}
                style={inputStyle}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(59,130,246,0.5)'
                  e.target.style.background = 'rgba(59,130,246,0.04)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.target.style.background = 'rgba(255,255,255,0.02)'
                }}
              />
            ))}
            <textarea
              name="message"
              rows={5}
              placeholder="Cuéntame en qué puedo ayudarte..."
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              style={{...inputStyle, resize:'vertical', minHeight:130}}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(59,130,246,0.5)'
                e.target.style.background = 'rgba(59,130,246,0.04)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.06)'
                e.target.style.background = 'rgba(255,255,255,0.02)'
              }}
            />
            <button
              onClick={() => {
                if (form.name && form.email && form.message) setSent(true)
              }}
              style={{
                padding:'16px 32px',
                background:'var(--accent)', color:'#fff',
                border:'none', borderRadius:8, cursor:'pointer',
                fontFamily:"'Space Mono', monospace",
                fontSize:12, letterSpacing:2,
                textTransform:'uppercase', fontWeight:700,
                transition:'opacity .2s, transform .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.85'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Enviar mensaje →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
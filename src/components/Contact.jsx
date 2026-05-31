import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'service_bjneehr'
const EMAILJS_TEMPLATE_ID = 'template_qjkcg8m'
const EMAILJS_AUTOREPLY   = 'template_b5aipbd'
const EMAILJS_PUBLIC_KEY  = '_A_dJYeAHhk9UMF8K'

const C = {
  bg: '#0a0806',
  bgCard: '#151210', bgCardHover: '#1c1814', bgInput: '#130f0c',
  border0: 'rgba(255,240,220,0.06)', border1: 'rgba(255,240,220,0.10)', border2: 'rgba(255,240,220,0.18)',
  text0: '#f0e8da', text1: '#9a8878', text2: '#5a4e43',
  coral: '#e8624a', gold: '#c9a96e',
}

const FONT = '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'

const info = [
  { icon: 'email',    label: 'Email',     value: 'contacta.izan@gmail.com', accent: C.coral },
  { icon: 'location', label: 'Ubicación', value: 'Barcelona, España',       accent: C.gold  },
]

function ContactIcon({ type, color }) {
  const style = { width: '20px', height: '20px', stroke: color || C.text1 }
  switch (type) {
    case 'email':
      return <svg viewBox="0 0 24 24" fill="none" style={style} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
    case 'location':
      return <svg viewBox="0 0 24 24" fill="none" style={style} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
    default: return null
  }
}

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())

export default function Contact() {
  const sectionRef    = useRef(null)
  const [form,        setForm]        = useState({ name: '', email: '', message: '' })
  const [errors,      setErrors]      = useState({ name: '', email: '', message: '' })
  const [focused,     setFocused]     = useState(null)
  const [sending,     setSending]     = useState(false)
  const [sent,        setSent]        = useState(false)
  const [sendError,   setSendError]   = useState('')
  const [hoveredInfo, setHoveredInfo] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (sendError) setSendError('')
  }

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' }
    let valid = true

    if (!form.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.'
      valid = false
    }
    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio.'
      valid = false
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Introduce un email válido.'
      valid = false
    }
    if (!form.message.trim()) {
      newErrors.message = 'El mensaje no puede estar vacío.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSending(true)
    setSendError('')

    try {
      // Email que te llega a ti con los datos del formulario
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:       form.name,
          from_email: form.email,
          message:    form.message,
          title:      `Mensaje de ${form.name}`,
        },
        EMAILJS_PUBLIC_KEY
      )

      // Autorresponder al usuario
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY,
        {
          to_name:  form.name,
          to_email: form.email,
        },
        EMAILJS_PUBLIC_KEY
      )

      setSent(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setSendError('Algo ha fallado. Inténtalo de nuevo o escríbeme directamente.')
    } finally {
      setSending(false)
    }
  }

  const inputBorderColor = (name) => {
    if (errors[name]) return C.coral
    if (focused === name) return C.border2
    return C.border0
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '16px 20px', borderRadius: '12px',
    border: `1px solid ${inputBorderColor(name)}`,
    background: errors[name] ? '#1a0e0c' : focused === name ? '#191512' : C.bgInput,
    color: C.text0, fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', fontFamily: FONT, transition: 'all 0.22s ease',
    boxShadow: errors[name]
      ? `0 0 0 3px ${C.coral}15`
      : focused === name
        ? `0 0 0 3px ${C.coral}10`
        : 'none',
    resize: 'none',
  })

  useEffect(() => {
    let activeCtx = null
    const initGSAP = (gsapInstance) => {
      activeCtx = gsapInstance.context(() => {
        gsapInstance.fromTo('.cn-label',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true } })
        gsapInstance.fromTo('.cn-heading',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.cn-heading', start: 'top 88%', once: true } })
        gsapInstance.fromTo('.cn-rule',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.1, ease: 'power4.inOut',
            scrollTrigger: { trigger: '.cn-rule', start: 'top 92%', once: true } })
        gsapInstance.fromTo('.cn-grid',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.cn-grid', start: 'top 90%', once: true } })
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
      id="contact"
      style={{ background: C.bg, padding: '160px 0 100px', position: 'relative', overflow: 'hidden', fontFamily: FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        @media (max-width: 860px) {
          .cn-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .cn-section-pad { padding: 0 24px !important; }
          .cn-form-pad    { padding: 28px 20px !important; }
        }
        .cn-field-error {
          font-size: 12px;
          color: ${C.coral};
          margin-top: 6px;
          padding-left: 4px;
          font-family: ${FONT};
          display: flex;
          align-items: center;
          gap: 5px;
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          min-height: 20px;
        }
        .cn-field-error.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(${C.border0} 1px, transparent 1px), linear-gradient(90deg, ${C.border0} 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.5) 80%, transparent)',
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', right: '-0.02em', top: '50%', transform: 'translateY(-52%)',
        fontSize: 'clamp(200px, 26vw, 380px)', fontWeight: 800, letterSpacing: '-0.06em',
        fontFamily: FONT, color: 'transparent', WebkitTextStroke: `1px ${C.border0}`,
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>07</div>

      {/* Glow */}
      <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, rgba(232,98,74,0.06) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

      <div className="cn-section-pad" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="cn-label" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text2, fontFamily: FONT }}>Contacto</span>
          <div style={{ flex: 1, height: '1px', background: C.border0 }} />
          <span style={{ fontSize: '11px', color: C.text2, letterSpacing: '0.12em', fontFamily: FONT }}>07</span>
        </div>

        {/* Heading */}
        <h2 className="cn-heading" style={{
          fontSize: 'clamp(52px, 7.5vw, 100px)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 0.95, color: C.text0, margin: '0 0 32px', fontFamily: FONT,
        }}>
          Hablemos.<br /><span style={{ color: C.coral }}>En serio.</span>
        </h2>

        {/* Rule */}
        <div className="cn-rule" style={{
          height: '1px',
          background: `linear-gradient(90deg, ${C.coral}77 0%, rgba(255,240,220,0.10) 35%, transparent 100%)`,
          marginBottom: '80px',
        }} />

        <p style={{ fontSize: '18px', color: C.text1, maxWidth: '480px', lineHeight: 1.7, marginBottom: '72px', fontFamily: FONT }}>
          Disponible para proyectos, diseño de infraestructura, administración de sistemas y redes.
        </p>

        <div className="cn-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '48px', alignItems: 'start' }}>

          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {info.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredInfo(i)}
                onMouseLeave={() => setHoveredInfo(null)}
                style={{
                  background: hoveredInfo === i ? C.bgCardHover : C.bgCard,
                  borderRadius: '20px', padding: '24px 28px',
                  border: `1px solid ${hoveredInfo === i ? C.border1 : C.border0}`,
                  cursor: 'default', transition: 'all 0.35s ease',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
                  background: item.accent,
                  transform: hoveredInfo === i ? 'scaleY(1)' : 'scaleY(0.3)',
                  transition: '0.3s ease',
                }} />
                <div style={{ color: item.accent, marginBottom: '12px' }}>
                  <ContactIcon type={item.icon} color={item.accent} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: C.text2, fontFamily: FONT }}>{item.label}</div>
                <div style={{ fontSize: '15px', color: C.text0, marginTop: '4px', fontFamily: FONT }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <div className="cn-form-pad" style={{ background: C.bgCard, borderRadius: '24px', border: `1px solid ${C.border0}`, padding: '40px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: `${C.coral}15`, border: `1px solid ${C.coral}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ color: C.text0, fontFamily: FONT, fontWeight: 700, fontSize: '22px', margin: '0 0 8px' }}>
                  Mensaje enviado.
                </h3>
                <p style={{ color: C.text1, fontFamily: FONT, fontSize: '14px', margin: 0 }}>
                  Te responderé lo antes posible. Revisa tu bandeja de entrada.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

                {/* Nombre */}
                <div>
                  <input
                    name="name" placeholder="Nombre" value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    style={inputStyle('name')}
                  />
                  <p className={`cn-field-error${errors.name ? ' visible' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.8" fill="currentColor"/></svg>
                    {errors.name || '\u00A0'}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <input
                    name="email" placeholder="Email" value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    style={inputStyle('email')}
                  />
                  <p className={`cn-field-error${errors.email ? ' visible' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.8" fill="currentColor"/></svg>
                    {errors.email || '\u00A0'}
                  </p>
                </div>

                {/* Mensaje */}
                <div>
                  <textarea
                    name="message" placeholder="Tu mensaje" rows={5} value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={inputStyle('message')}
                  />
                  <p className={`cn-field-error${errors.message ? ' visible' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.8" fill="currentColor"/></svg>
                    {errors.message || '\u00A0'}
                  </p>
                </div>

                {/* Error de envío */}
                {sendError && (
                  <p style={{
                    fontSize: '13px', color: C.coral, fontFamily: FONT,
                    background: `${C.coral}10`, border: `1px solid ${C.coral}25`,
                    borderRadius: '10px', padding: '12px 16px', margin: '4px 0',
                  }}>
                    {sendError}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{
                    marginTop: '8px',
                    background: sending ? 'rgba(232,98,74,0.4)' : `linear-gradient(135deg, ${C.coral}, #b85c3a)`,
                    color: '#fff', border: 'none', padding: '16px',
                    borderRadius: '980px', fontWeight: 600,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    fontSize: '14px', fontFamily: FONT,
                    boxShadow: sending ? 'none' : '0 2px 16px rgba(232,98,74,0.28)',
                    transition: 'all 0.22s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {sending ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
                      </svg>
                      Enviando...
                    </>
                  ) : 'Enviar mensaje →'}
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
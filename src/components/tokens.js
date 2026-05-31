// ─── Design Tokens — Warm Dark v2 ────────────────────────────────────────────
export const colors = {
  // Backgrounds — cada sección diferente, todas cálidas
  bg0:         '#0e0c0a',   // Hero — negro cálido profundo
  bg1:         '#13110e',   // About — ligeramente más claro
  bg2:         '#161210',   // Skills
  bg3:         '#181410',   // Formation — diferenciado de Skills
  bg4:         '#1a1612',   // Projects
  bg5:         '#1c1713',   // Certificates
  bgDark:      '#0a0806',   // Contact — el más oscuro
  bgCard:      '#201c17',   // cards elevadas
  bgCardHover: '#272018',   // cards en hover
  // Borders
  border0: 'rgba(255,240,220,0.06)',
  border1: 'rgba(255,240,220,0.10)',
  border2: 'rgba(255,240,220,0.18)',
  // Text — cálido, nunca blanco puro
  text0: '#f0e8da',   // primario — crema cálido
  text1: '#9a8878',   // secundario
  text2: '#5a4e43',   // terciario / muted
  // Acentos — sin azul, todos cálidos
  coral:     '#e8624a',
  coralGlow: 'rgba(232,98,74,0.18)',
  coralDeep: 'rgba(232,98,74,0.08)',
  gold:      '#c9a96e',
  goldGlow:  'rgba(201,169,110,0.15)',
  sage:      '#7eb88a',
  sageGlow:  'rgba(126,184,138,0.15)',
  rust:      '#b85c3a',
}

export const type = {
  // CORREGIDO: DM Sans como fuente base (antes era SF Pro Display)
  font: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"SF Mono", "Fira Code", monospace',
}

export const radius = {
  sm:   '10px',
  md:   '16px',
  lg:   '20px',
  xl:   '28px',
  pill: '980px',
}

export const shadow = {
  card:      '0 0 0 1px rgba(255,240,220,0.06), 0 4px 24px rgba(0,0,0,0.5)',
  cardHover: '0 0 0 1px rgba(255,240,220,0.12), 0 12px 48px rgba(0,0,0,0.7)',
  coral:     '0 0 20px rgba(232,98,74,0.3)',
  gold:      '0 0 20px rgba(201,169,110,0.25)',
}

export const transition = {
  fast:   'all 0.18s ease',
  mid:    'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)',
}
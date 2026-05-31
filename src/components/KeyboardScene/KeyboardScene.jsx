import { useState } from 'react'
import {
  Html5Original,
  Css3Original,
  JavascriptOriginal,
  PythonOriginal,
  GitOriginal,
  LinuxOriginal,
  AmazonwebservicesOriginalWordmark,
  WordpressOriginal,
  GithubOriginal,
} from 'devicons-react'

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { id:'html', label:'HTML', color:'#E34F26', Icon: Html5Original,      level:'Intermediate', desc:'Estructura semántica, formularios, accesibilidad básica.' },
      { id:'css',  label:'CSS',  color:'#1572B6', Icon: Css3Original,       level:'Intermediate', desc:'Flexbox, Grid, animaciones, diseño responsive.' },
      { id:'js',   label:'JS',   color:'#F7DF1E', Icon: JavascriptOriginal, level:'Beginner',     desc:'Fundamentos de programación, DOM, eventos básicos.' },
    ]
  },
  {
    id: 'backend',
    label: 'Backend & Scripting',
    skills: [
      { id:'python', label:'Python', color:'#FFD43B', Icon: PythonOriginal, level:'Beginner', desc:'Scripts, automatización, fundamentos.' },
    ]
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    skills: [
      { id:'aws',    label:'AWS',    color:'#FF9900', Icon: AmazonwebservicesOriginalWordmark, level:'Beginner',     desc:'En formación. EC2, S3, fundamentos de cloud computing.' },
      { id:'git',    label:'Git',    color:'#F05032', Icon: GitOriginal,                      level:'Beginner',     desc:'Control de versiones, repositorios, flujo básico.' },
      { id:'github', label:'GitHub', color:'#E6EDF3', Icon: GithubOriginal,                   level:'Beginner',     desc:'Uso básico: repositorios, commits y push. Aprendiendo el flujo de trabajo.' },
      { id:'linux',  label:'Linux',  color:'#FCC624', Icon: LinuxOriginal,                    level:'Intermediate', desc:'Administración básica, terminal, comandos de sistema.' },
    ]
  },
  {
    id: 'cms',
    label: 'CMS',
    skills: [
      { id:'wordpress', label:'WordPress', color:'#21759B', Icon: WordpressOriginal, level:'Intermediate', desc:'Creación y gestión de sitios, temas, plugins y personalización.' },
    ]
  },
]

const LEVEL_COLOR = {
  Advanced:     '#6EE7B7',
  Intermediate: '#93C5FD',
  Beginner:     '#FDE68A',
}

export default function KeyboardScene() {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  let delayCounter = 0

  return (
    <div style={{ position:'relative' }}>

      {/* Leyenda de niveles */}
      <div style={{
        display:'flex', gap:20, marginBottom:40, flexWrap:'wrap',
      }}>
        {Object.entries(LEVEL_COLOR).map(([level, color]) => (
          <div key={level} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{
              width:8, height:8, borderRadius:'50%',
              background:color, boxShadow:`0 0 6px ${color}`,
            }} />
            <span style={{
              fontFamily:"'Space Mono', monospace",
              fontSize:10, letterSpacing:2,
              color:'rgba(255,255,255,0.3)',
              textTransform:'uppercase',
            }}>{level}</span>
          </div>
        ))}
      </div>

      {/* Categorías */}
      {CATEGORIES.map(cat => {
        return (
          <div key={cat.id} style={{ marginBottom:48 }}>

            {/* Título categoría */}
            <div style={{
              display:'flex', alignItems:'center', gap:16, marginBottom:20,
            }}>
              <span style={{
                fontFamily:"'Space Mono', monospace",
                fontSize:11, letterSpacing:3,
                color:'var(--accent2)',
                textTransform:'uppercase',
              }}>
                {cat.label}
              </span>
              <div style={{
                flex:1, height:1,
                background:'rgba(255,255,255,0.06)',
              }} />
            </div>

            {/* Grid de skills */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))',
              gap:12,
            }}>
              {cat.skills.map(skill => {
                const delay = delayCounter++ * 0.06
                const isHovered = hovered === skill.id
                const isActive  = active?.id === skill.id

                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => setHovered(skill.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(prev => prev?.id === skill.id ? null : skill)}
                    style={{
                      position:'relative',
                      display:'flex', flexDirection:'column',
                      alignItems:'center', justifyContent:'center',
                      gap:12, padding:'28px 16px',
                      borderRadius:16, cursor:'pointer',
                      background: isActive
                        ? `${skill.color}15`
                        : isHovered
                        ? `${skill.color}08`
                        : 'rgba(255,255,255,0.02)',
                      border: isActive
                        ? `1px solid ${skill.color}70`
                        : isHovered
                        ? `1px solid ${skill.color}35`
                        : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: isActive
                        ? `0 0 40px ${skill.color}25, inset 0 1px 0 ${skill.color}20`
                        : isHovered
                        ? `0 0 24px ${skill.color}15`
                        : 'none',
                      transform: isActive
                        ? 'translateY(-6px) scale(1.02)'
                        : isHovered
                        ? 'translateY(-3px)'
                        : 'translateY(0) scale(1)',
                      transition:'all .35s cubic-bezier(.16,1,.3,1)',
                      animation:`floatIn .6s ease ${delay}s both`,
                    }}
                  >
                    {(isHovered || isActive) && (
                      <div style={{
                        position:'absolute', inset:0, borderRadius:16,
                        background:`radial-gradient(circle at 50% 40%, ${skill.color}12, transparent 65%)`,
                        pointerEvents:'none',
                      }} />
                    )}

                    <div style={{
                      width:56, height:56,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      borderRadius:14,
                      background: isHovered || isActive
                        ? `${skill.color}18`
                        : 'rgba(255,255,255,0.03)',
                      border:`1px solid ${
                        isHovered || isActive
                          ? skill.color + '45'
                          : 'rgba(255,255,255,0.07)'
                      }`,
                      filter: isHovered || isActive
                        ? `drop-shadow(0 0 10px ${skill.color}80)`
                        : 'none',
                      transition:'all .35s ease',
                    }}>
                      <skill.Icon size={32} color={skill.color} />
                    </div>

                    <span style={{
                      fontFamily:"'Space Mono', monospace",
                      fontSize:11, letterSpacing:2,
                      color: isHovered || isActive
                        ? skill.color
                        : 'rgba(255,255,255,0.45)',
                      textTransform:'uppercase',
                      transition:'color .3s',
                    }}>
                      {skill.label}
                    </span>

                    <div style={{
                      width:6, height:6, borderRadius:'50%',
                      background: LEVEL_COLOR[skill.level],
                      boxShadow: isHovered || isActive
                        ? `0 0 10px ${LEVEL_COLOR[skill.level]}`
                        : 'none',
                      transition:'all .3s',
                    }} />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {active && (
        <div style={{
          marginTop:8,
          padding:'28px 32px',
          background:'rgba(6,10,18,0.9)',
          backdropFilter:'blur(24px)',
          border:`1px solid ${active.color}25`,
          borderRadius:16,
          boxShadow:`0 0 60px ${active.color}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
          animation:'fadeUp .3s cubic-bezier(.16,1,.3,1)',
          display:'flex', alignItems:'flex-start', gap:24,
        }}>
          <div style={{
            width:56, height:56, borderRadius:14, flexShrink:0,
            display:'flex', alignItems:'center', justifyContent:'center',
            background:`${active.color}12`,
            border:`1px solid ${active.color}35`,
            filter:`drop-shadow(0 0 12px ${active.color}60)`,
          }}>
            <active.Icon size={32} color={active.color} />
          </div>

          <div style={{ flex:1 }}>
            <div style={{
              display:'flex', alignItems:'center',
              gap:12, marginBottom:10, flexWrap:'wrap',
            }}>
              <span style={{
                fontFamily:"'Orbitron', sans-serif",
                fontSize:17, fontWeight:700, color:'#F0F6FF',
              }}>
                {active.label}
              </span>
              <span style={{
                fontFamily:"'Space Mono', monospace",
                fontSize:10, letterSpacing:2,
                padding:'4px 12px',
                background:`${LEVEL_COLOR[active.level]}12`,
                border:`1px solid ${LEVEL_COLOR[active.level]}45`,
                color:LEVEL_COLOR[active.level],
                borderRadius:4, textTransform:'uppercase',
              }}>
                {active.level}
              </span>
            </div>
            <p style={{
              fontFamily:"'Inter', sans-serif",
              fontSize:14, lineHeight:1.8,
              color:'rgba(240,246,255,0.55)',
              margin:0,
            }}>
              {active.desc}
            </p>
          </div>

          <button
            onClick={() => setActive(null)}
            style={{
              background:'none', border:'none',
              color:'rgba(255,255,255,0.25)', cursor:'pointer',
              fontSize:22, lineHeight:1, flexShrink:0,
              padding:4,
              transition:'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
          >
            ×
          </button>
        </div>
      )}

      <style>{`
        @keyframes floatIn {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Formation from './components/Formation'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

// Backgrounds deben coincidir exactamente con los de cada componente
const sectionBgs = [
  '#0e0c0a', // Hero
  '#13110e', // About
  '#161210', // Skills
  '#181410', // Formation
  '#181410', // Projects  (bg2 del componente)
  '#1c1713', // Certificates
  '#0a0806', // Contact
]

export default function App() {
  const appRef = useRef(null)

  useEffect(() => {
    const sections = gsap.utils.toArray('.section-wrap')

    sections.forEach((section, i) => {
      // Animación de salida
      gsap.fromTo(section,
        { scale: 1, opacity: 1 },
        {
          scale: 0.94,
          opacity: 0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: i === sections.length - 1 ? 'bottom 0%' : 'bottom 60%',
            end:   i === sections.length - 1 ? 'bottom -50%' : 'bottom 10%',
            scrub: 1.2,
          },
        }
      )

      // Animación de entrada (no aplica al primero)
      if (i > 0) {
        gsap.fromTo(section,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end:   'top 40%',
              scrub: 1,
            },
          }
        )
      }
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const components = [Hero, About, Skills, Formation, Projects, Certificates, Contact]

  return (
    <div ref={appRef} style={{ background: '#0a0806', minHeight: '100vh' }}>
      <Navbar />
      {components.map((Comp, i) => (
        <div
          key={i}
          className="section-wrap"
          style={{
            background: sectionBgs[i],
            borderRadius: i > 0 ? '28px 28px 0 0' : '0',
            boxShadow: i > 0
              ? '0 -4px 32px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,240,220,0.05)'
              : 'none',
            overflow: 'hidden',
            marginTop: i > 0 ? '-28px' : '0',
            position: 'relative',
            zIndex: i + 1,
            transformOrigin: 'center top',
          }}
        >
          <Comp />
        </div>
      ))}
    </div>
  )
}
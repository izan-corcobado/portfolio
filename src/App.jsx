import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import Projects      from './components/Projects'
import Certificates  from './components/Certificates'
import About         from './components/About'
import Contact       from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Certificates />
        <About />
        <Contact />
      </main>
    </>
  )
}
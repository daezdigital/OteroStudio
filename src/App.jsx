import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useMotionValue, useSpring, motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import './index.css'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const [lang, setLang] = useState('es')
  const [dark, setDark] = useState(true)
  const [hasMouse, setHasMouse] = useState(false)

  // Cursor state: 'default' | 'hover' | 'drag'
  const [cursorState, setCursorState] = useState('default')
  const cursor = { set: setCursorState }

  // Spring cursor position
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const cx = useSpring(mx, { stiffness: 600, damping: 38, mass: 0.4 })
  const cy = useSpring(my, { stiffness: 600, damping: 38, mass: 0.4 })

  useEffect(() => {
    document.documentElement.classList.add('dark-theme')
  }, [])

  useEffect(() => {
    const fn = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!hasMouse) setHasMouse(true)
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [hasMouse])

  // Page transition intro (only on first load)
  const [intro, setIntro] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2600)
    return () => clearTimeout(t)
  }, [])

  const props = { lang, setLang, dark, setDark, cursor }

  return (
    <>
      {/* ── Intro loader ── */}
      <AnimatePresence>
        {intro && (
          <motion.div className="intro"
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1.1, ease: [0.32, 0.72, 0, 1] } }}>
            <motion.div className="intro-inner"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}>
              <img src="/OteroStudioLogo.png" alt="Otero Studio" className="intro-logo" />
              <p className="intro-name">OTERO STUDIO</p>
              <p className="intro-sub">Arquitectura &amp; Interiorismo · Segovia</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Custom cursor dot ── */}
      {hasMouse && (
        <motion.div
          className={`dot-cursor ${cursorState}`}
          style={{ x: cx, y: cy }}
        />
      )}

      <ScrollToTop />
      <Layout {...props}>
        <Routes>
          <Route path="/"           element={<Home     {...props} />} />
          <Route path="/proyectos"  element={<Projects {...props} />} />
          <Route path="/filosofia"  element={<About    {...props} />} />
          <Route path="/contacto"   element={<Contact  {...props} />} />
        </Routes>
      </Layout>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}

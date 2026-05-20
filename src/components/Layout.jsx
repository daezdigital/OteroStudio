import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Globe, Sun, Moon } from 'lucide-react'

export default function Layout({ children, lang, setLang, dark, setDark, cursor }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menu, setMenu]           = useState(false)
  const { pathname }              = useLocation()
  const es                        = lang === 'es'

  const isDarkPage = pathname === '/' // hero page uses transparent header

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenu(false) }, [pathname])

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('dark-theme', !d)
      return !d
    })
  }

  const navItems = [
    { to: '/',           label: es ? 'Inicio'      : 'Home'       },
    { to: '/proyectos',  label: es ? 'Proyectos'   : 'Projects'   },
    { to: '/filosofia',  label: es ? 'Filosofía'   : 'Philosophy' },
    { to: '/contacto',   label: es ? 'Contacto'    : 'Contact'    },
  ]

  const hoverOn  = () => cursor.set('hover')
  const hoverOff = () => cursor.set('default')

  return (
    <>
      {/* ── Header ── */}
      <header className={`hd ${scrolled || !isDarkPage ? 'solid' : ''} ${menu ? 'menu-open' : ''}`}>
        <Link to="/" className="hd-logo" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
          <img src="/OteroStudioLogo.png" alt="Otero Studio" />
          <div>
            <span className="hd-name">OTERO STUDIO</span>
            <span className="hd-sub">ARQUITECTURA</span>
          </div>
        </Link>

        <nav className="hd-nav" aria-label="Main">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} end className={({ isActive }) => `hd-link${isActive ? ' active' : ''}`}
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hd-controls">
          <button className="hd-btn" onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            <Globe size={10} />{lang === 'es' ? ' EN' : ' ES'}
          </button>
          <button className="hd-btn icon" onClick={toggleDark}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            {dark ? <Sun size={12} /> : <Moon size={12} />}
          </button>
          <button className={`hd-burger ${menu ? 'open' : ''}`} onClick={() => setMenu(m => !m)}
            aria-label="Menu" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            <span /><span />
          </button>
        </div>
      </header>

      {/* ── Full-screen nav overlay ── */}
      <div className={`nav-overlay ${menu ? 'open' : ''}`} aria-hidden={!menu}>
        <div className="nav-overlay-inner">
          <ul className="nav-ol">
            {navItems.map(({ to, label }, i) => (
              <li key={to} style={{ '--i': i }}>
                <Link to={to} onClick={() => setMenu(false)}
                  onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                  <span className="ol-num">0{i + 1}</span>{label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-ol-contact">
            <div>
              <p className="oc-label">{es ? 'Estudio' : 'Studio'}</p>
              <p>Plaza Fernando de Rojas, 7<br />40006 Segovia</p>
            </div>
            <div>
              <p className="oc-label">Email</p>
              <p><a href="mailto:eva.oterostudio@gmail.com">eva.oterostudio@gmail.com</a></p>
            </div>
            <div>
              <p className="oc-label">Instagram</p>
              <p><a href="https://instagram.com/oterostudio" target="_blank" rel="noopener noreferrer">@oterostudio</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <main>{children}</main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/OteroStudioLogo.png" alt="Otero Studio" className="footer-logo" />
            <p className="footer-wm">OTERO STUDIO</p>
            <p className="footer-tag">ARQUITECTURA &amp; DISEÑO</p>
          </div>

          <div className="footer-cols">
            <div className="fc">
              <p className="fc-label">{es ? 'Estudio' : 'Studio'}</p>
              <p>Plaza Fernando de Rojas, 7<br />40006 Segovia, España</p>
            </div>
            <div className="fc">
              <p className="fc-label">{es ? 'Contacto' : 'Contact'}</p>
              <a href="tel:+34635040860" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>+34 635 040 860</a>
              <a href="mailto:eva.oterostudio@gmail.com" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>eva.oterostudio@gmail.com</a>
            </div>
            <div className="fc">
              <p className="fc-label">{es ? 'Síguenos' : 'Follow us'}</p>
              <a href="https://instagram.com/oterostudio" target="_blank" rel="noopener noreferrer"
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}>@oterostudio</a>
              <div className="footer-nav-links">
                {navItems.slice(1).map(({ to, label }) => (
                  <Link key={to} to={to} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Otero Studio. {es ? 'Todos los derechos reservados.' : 'All rights reserved.'}</span>
          <span className="footer-coords">40.9329° N · 4.1078° W</span>
        </div>
      </footer>
    </>
  )
}

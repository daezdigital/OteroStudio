import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SplitText, FadeUp, ImageReveal } from '../components/Animate'

const ALL_PROJECTS = [
  { id: 1, src: '/assets/images/stone_villa.png',         nameEs: 'Villa de Piedra y Hormigón',       nameEn: 'Stone & Concrete Villa',        catKey: 'nueva',       catEs: 'Obra Nueva',       catEn: 'New Build',     loc: 'Segovia', year: '2025', m2: '320 m²', descEs: 'Vivienda unifamiliar de nueva planta en las afueras de Segovia. Combinación de piedra local con hormigón visto, integrada en el paisaje castellano mediante amplias terrazas y vegetación autóctona.', descEn: 'Single-family new-build on the outskirts of Segovia. Local stone combined with exposed concrete, integrated into the Castilian landscape with wide terraces and native vegetation.' },
  { id: 2, src: '/assets/images/interior_reform.png',     nameEs: 'Ático de Diseño Minimalista',      nameEn: 'Minimalist Design Penthouse',   catKey: 'reforma',     catEs: 'Reforma Interior', catEn: 'Interior Reno', loc: 'Madrid',  year: '2024', m2: '180 m²', descEs: 'Reforma integral de ático en el centro de Madrid. Espacios diáfanos, paleta neutra y materiales de alto rendimiento. Integración de domótica y eficiencia energética.', descEn: 'Complete renovation of a penthouse in central Madrid. Open spaces, neutral palette, and high-performance materials. Smart home and energy efficiency integration.' },
  { id: 3, src: '/assets/images/historic_restoration.png',nameEs: 'Restauración de Muros Históricos', nameEn: 'Historic Wall Restoration',     catKey: 'rehabilitacion',catEs: 'Rehabilitación', catEn: 'Restoration',   loc: 'Segovia', year: '2024', m2: '240 m²', descEs: 'Intervención en edificio del siglo XVIII en el casco histórico de Segovia. Restauración de muros de mampostería, refuerzo estructural y adaptación a uso residencial contemporáneo respetando los valores patrimoniales.', descEn: 'Intervention in an 18th-century building in Segovia\'s historic center. Masonry wall restoration, structural reinforcement, and adaptation to contemporary residential use while respecting heritage values.' },
  { id: 4, src: '/assets/images/hero_facade.png',          nameEs: 'Casa de Campo Contemporánea',      nameEn: 'Contemporary Country House',    catKey: 'nueva',       catEs: 'Obra Nueva',       catEn: 'New Build',     loc: 'Segovia', year: '2023', m2: '280 m²', descEs: 'Casa de campo de nueva planta con referencias a la arquitectura vernácula segoviana. Cubierta a dos aguas, aleros generosos y materiales tradicionales reinterpretados desde la contemporaneidad.', descEn: 'New country house with references to Segovian vernacular architecture. Pitched roof, generous eaves and traditional materials reinterpreted through a contemporary lens.' },
]

const SERVICES = [
  { keyEs: 'Todos', keyEn: 'All', filter: 'all' },
  { keyEs: 'Obra Nueva', keyEn: 'New Build', filter: 'nueva' },
  { keyEs: 'Reforma', keyEn: 'Renovation', filter: 'reforma' },
  { keyEs: 'Rehabilitación', keyEn: 'Restoration', filter: 'rehabilitacion' },
]

const PROCESS = [
  { num: '01', titleEs: 'Escucha', titleEn: 'Listen', descEs: 'Primera reunión sin compromiso. Escuchamos tus necesidades, analizamos el espacio y entendemos tu forma de vivir antes de proponer ninguna solución.', descEn: 'First meeting without obligation. We listen to your needs, analyze the space, and understand your lifestyle before proposing any solution.' },
  { num: '02', titleEs: 'Diseño', titleEn: 'Design', descEs: 'Desarrollamos el proyecto desde los planos hasta la selección de materiales, acabados y mobiliario. Todo documentado y coordinado con transparencia.', descEn: 'We develop the project from plans to the selection of materials, finishes, and furnishings. Everything documented and coordinated transparently.' },
  { num: '03', titleEs: 'Construcción', titleEn: 'Build', descEs: 'Dirección de obra e interiorismo con visitas periódicas al sitio. Coordinamos a todos los gremios y resolvemos cualquier imprevisto sin que tengas que preocuparte.', descEn: 'Construction and interior design management with periodic site visits. We coordinate all trades and resolve any unforeseen issues without you having to worry.' },
  { num: '04', titleEs: 'Entrega', titleEn: 'Deliver', descEs: 'Entregamos el espacio completamente terminado, con todos los permisos en regla y un seguimiento post-obra para garantizar tu satisfacción total.', descEn: 'We deliver the space completely finished, with all permits in order and post-work follow-up to guarantee your total satisfaction.' },
]

const SERVICES_DETAIL = [
  { iconEs: '🏗️', titleEs: 'Obra Nueva',         titleEn: 'New Builds',         descEs: 'Proyectos de vivienda unifamiliar, plurifamiliar y uso terciario desde cero, con gestión completa de licencias y coordinación de gremios.', descEn: 'Single-family, multi-family, and commercial projects from scratch, with complete license management and trade coordination.' },
  { iconEs: '🔨', titleEs: 'Reforma Integral',   titleEn: 'Full Renovations',   descEs: 'Transformación completa de viviendas, incluida la gestión de estructura, instalaciones, acabados e interiorismo.', descEn: 'Complete home transformation, including management of structure, installations, finishes, and interior design.' },
  { iconEs: '🏛️', titleEs: 'Rehabilitación',     titleEn: 'Restoration',        descEs: 'Intervención especializada en edificios históricos y protegidos, con respeto a los valores patrimoniales y adaptación a normativas vigentes.', descEn: 'Specialized intervention in historic and protected buildings, respecting heritage values and adapting to current regulations.' },
  { iconEs: '🛋️', titleEs: 'Diseño de Interiores',titleEn: 'Interior Design',  descEs: 'Diseño de ambientes, selección de materiales, mobiliario a medida y coordinación de equipos de instalación.', descEn: 'Ambiance design, material selection, custom furniture, and installation team coordination.' },
]

export default function Projects({ lang, cursor }) {
  const es = lang === 'es'
  const [active, setActive] = useState('all')
  const hoverOn  = () => cursor.set('hover')
  const hoverOff = () => cursor.set('default')

  const filtered = active === 'all' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.catKey === active)

  return (
    <>
      {/* ── Page hero ── */}
      <section className="page-hero">
        <div className="page-hero-img">
          <img src="/assets/images/stone_villa.png" alt="Proyectos" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-body">
          <motion.p className="page-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}>
            {es ? 'Nuestro Trabajo' : 'Our Work'}
          </motion.p>
          <motion.h1 className="page-hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            {es ? 'Proyectos' : 'Projects'}
          </motion.h1>
        </div>
      </section>

      {/* ── Services overview ── */}
      <section className="section-block services-overview">
        <div className="section-header">
          <FadeUp>
            <span className="eyebrow">{es ? 'Servicios' : 'Services'}</span>
            <h2 className="section-title">
              <SplitText text={es ? 'Lo que hacemos' : 'What we do'} />
            </h2>
          </FadeUp>
        </div>
        <div className="services-grid">
          {SERVICES_DETAIL.map((s, i) => (
            <FadeUp key={i} delay={i * 0.08} className="service-card">
              <span className="service-icon">{s.iconEs}</span>
              <h3 className="service-name">{es ? s.titleEs : s.titleEn}</h3>
              <p className="service-desc">{es ? s.descEs : s.descEn}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Project gallery with filters ── */}
      <section className="section-block projects-gallery">
        <div className="section-header">
          <FadeUp>
            <span className="eyebrow">{es ? 'Portfolio' : 'Portfolio'}</span>
            <h2 className="section-title">
              <SplitText text={es ? 'Proyectos Seleccionados' : 'Selected Projects'} />
            </h2>
          </FadeUp>
          {/* Filter tabs */}
          <div className="filter-tabs">
            {SERVICES.map(s => (
              <button key={s.filter}
                className={`filter-tab ${active === s.filter ? 'active' : ''}`}
                onClick={() => setActive(s.filter)}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                {es ? s.keyEs : s.keyEn}
              </button>
            ))}
          </div>
        </div>

        <motion.div className="gallery-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article key={p.id}
                className="gallery-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}
              >
                <div className="gallery-img-wrap">
                  <img src={p.src} alt={es ? p.nameEs : p.nameEn} loading="lazy" />
                  <div className="gallery-overlay">
                    <p className="gallery-cat">{es ? p.catEs : p.catEn} · {p.loc}</p>
                    <h3 className="gallery-name">{es ? p.nameEs : p.nameEn}</h3>
                    <p className="gallery-detail">{p.m2} · {p.year}</p>
                  </div>
                </div>
                <div className="gallery-card-footer">
                  <div>
                    <p className="gallery-card-cat">{es ? p.catEs : p.catEn} · {p.loc} · {p.year}</p>
                    <p className="gallery-card-name">{es ? p.nameEs : p.nameEn}</p>
                  </div>
                  <span className="gallery-card-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Process timeline ── */}
      <section className="section-block process-section">
        <FadeUp>
          <span className="eyebrow">{es ? 'Nuestro Proceso' : 'Our Process'}</span>
          <h2 className="section-title">
            <SplitText text={es ? 'De la idea a la realidad' : 'From idea to reality'} />
          </h2>
        </FadeUp>
        <div className="process-grid">
          {PROCESS.map((p, i) => (
            <FadeUp key={i} delay={i * 0.1} className="process-step">
              <span className="process-num">{p.num}</span>
              <div className="process-line" />
              <h3 className="process-title">{es ? p.titleEs : p.titleEn}</h3>
              <p className="process-desc">{es ? p.descEs : p.descEn}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <FadeUp className="cta-inner">
          <p className="eyebrow">{es ? 'Siguiente paso' : 'Next step'}</p>
          <h2 className="cta-heading">
            <SplitText text={es ? '¿Tienes un proyecto en mente?' : 'Have a project in mind?'} />
          </h2>
          <Link to="/contacto" className="cta-btn"
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            {es ? 'Cuéntanos' : 'Tell us'} <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </section>
    </>
  )
}

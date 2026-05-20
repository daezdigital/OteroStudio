import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SplitText, FadeUp, ImageReveal } from '../components/Animate'

const SLIDES = [
  { src: '/assets/images/hero_facade.png',       label: 'ARQUITECTURA',  titleEs: 'Espacios que Inspiran',    titleEn: 'Spaces that Inspire'    },
  { src: '/assets/images/stone_villa.png',        label: 'OBRA NUEVA',    titleEs: 'Dedicación al Detalle',   titleEn: 'Dedication to Detail'   },
  { src: '/assets/images/interior_reform.png',    label: 'INTERIORISMO',  titleEs: 'Soluciones Creativas',    titleEn: 'Creative Solutions'     },
]

const PROJECTS = [
  { src: '/assets/images/stone_villa.png',         nameEs: 'Villa de Piedra y Hormigón',       nameEn: 'Stone & Concrete Villa',        catEs: 'Obra Nueva',      catEn: 'New Build',     loc: 'Segovia', year: '2025' },
  { src: '/assets/images/interior_reform.png',     nameEs: 'Ático de Diseño Minimalista',      nameEn: 'Minimalist Design Penthouse',   catEs: 'Reforma Interior',catEn: 'Interior Reno', loc: 'Madrid',  year: '2024' },
  { src: '/assets/images/historic_restoration.png',nameEs: 'Restauración de Muros Históricos', nameEn: 'Historic Wall Restoration',     catEs: 'Rehabilitación',  catEn: 'Restoration',   loc: 'Segovia', year: '2024' },
]

const REVIEWS = [
  { author: 'Lorena GC',            ago: '3 meses',   textEs: 'Todo perfecto, entendió perfectamente todos los cambios que queríamos hacer en nuestra casa. Ha quedado genial!',                                                                                                                           textEn: 'Everything perfect, she understood exactly all the changes we wanted in our home. It turned out amazing!' },
  { author: 'Elena Sanz Santos',    ago: '4 meses',   textEs: 'Eficaz, responsabilidad, atención, seriedad, en definitiva, Otero Studio es profesionalidad. Gracias Eva por tu atención.',                                                                                                                  textEn: 'Efficient, responsible, attentive, serious — Otero Studio is professionalism. Thank you Eva.', replyEs: 'Muchas gracias Elena.', replyEn: 'Thank you very much, Elena.' },
  { author: 'Marta Nieto Palmero',  ago: '10 meses',  textEs: 'Muy buen estudio. Se nota la dedicación en cada detalle y el enfoque personalizado en cada proyecto. Escuchan realmente lo que uno necesita y proponen soluciones creativas y funcionales. Recomendable tanto para obras nuevas como para reformas.', textEn: 'Very good studio. The dedication in every detail is evident. They really listen and propose creative and functional solutions. Highly recommended.' },
  { author: 'Rakel Ro',             ago: '10 meses',  textEs: 'Muy atenta en todo lo que la pidas, muy buen estudio.',                                                                                                                                                                                       textEn: 'Very attentive to everything you ask, very good studio.' },
  { author: 'Noemí Álvarez Otero',  ago: '1 mes',     textEs: 'Gran profesional, todo salió perfecto.',                                                                                                                                                                                                       textEn: 'Great professional, everything turned out perfectly.' },
]

const STATS = [
  { numEs: '+10', numEn: '+10', labelEs: 'años de experiencia', labelEn: 'years of experience' },
  { numEs: '+50', numEn: '+50', labelEs: 'proyectos completados', labelEn: 'projects completed' },
  { numEs: '5★',  numEn: '5★',  labelEs: 'valoración en Google', labelEn: 'Google rating' },
  { numEs: '100%',numEn: '100%',labelEs: 'clientes satisfechos', labelEn: 'satisfied clients' },
]

// ── Wipe directions per slide transition ──────────────────────────────────────
const WIPE_DIRS = [
  'inset(0 0 0 100%)', // from right
  'inset(100% 0 0 0)', // from top
  'inset(0 100% 0 0)', // from left
]

export default function Home({ lang, cursor }) {
  const es = lang === 'es'
  const [slide, setSlide]       = useState(0)
  const [prevSlide, setPrev]    = useState(null)
  const [wipeIdx, setWipeIdx]   = useState(0)
  const [review, setReview]     = useState(0)
  const intervalRef             = useRef(null)

  const hoverOn  = () => cursor.set('hover')
  const hoverOff = () => cursor.set('default')
  const dragOn   = () => cursor.set('drag')
  const dragOff  = () => cursor.set('default')

  const goSlide = (next) => {
    setPrev(slide)
    setWipeIdx(w => (w + 1) % WIPE_DIRS.length)
    setSlide(next)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlide(s => {
        const next = (s + 1) % SLIDES.length
        setPrev(s)
        setWipeIdx(w => (w + 1) % WIPE_DIRS.length)
        return next
      })
    }, 6500)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          HERO — Cinematic wipe transitions between architectural images
      ══════════════════════════════════════════════════════════════════ */}
      <section className="hero" aria-label="Hero">
        {/* Grain overlay for cinematic texture */}
        <div className="hero-grain" aria-hidden="true" />

        {/* Base slide (outgoing) */}
        {SLIDES.map((s, i) => (
          <div key={i} className={`hero-base ${i === slide ? 'active' : ''}`}>
            <img src={s.src} alt="" aria-hidden className="hero-bg-img" />
          </div>
        ))}

        {/* Incoming slide with wipe animation */}
        <AnimatePresence>
          <motion.div
            key={slide}
            className="hero-wipe"
            initial={{ clipPath: WIPE_DIRS[wipeIdx] }}
            animate={{ clipPath: 'inset(0 0 0 0%)' }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
          >
            <img src={SLIDES[slide].src} alt={es ? SLIDES[slide].titleEs : SLIDES[slide].titleEn} className="hero-bg-img" />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="hero-grad-top"    aria-hidden />
        <div className="hero-grad-bottom" aria-hidden />

        {/* ── Hero content ── */}
        <div className="hero-body">
          <div className="hero-meta">
            <AnimatePresence mode="wait">
              <motion.span key={`label-${slide}`} className="hero-label"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}>
                {SLIDES[slide].label}
              </motion.span>
            </AnimatePresence>
            <span className="hero-counter">{String(slide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.h1 key={`title-${slide}`} className="hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              {es ? SLIDES[slide].titleEs : SLIDES[slide].titleEn}
            </motion.h1>
          </AnimatePresence>

          <div className="hero-footer-row">
            {/* Dots */}
            <div className="hero-dots">
              {SLIDES.map((_, i) => (
                <button key={i} className={`hdot ${slide === i ? 'active' : ''}`}
                  onClick={() => { clearInterval(intervalRef.current); goSlide(i) }}
                  aria-label={`Slide ${i + 1}`}
                  onMouseEnter={hoverOn} onMouseLeave={hoverOff} />
              ))}
            </div>
            {/* CTA */}
            <Link to="/proyectos" className="hero-cta"
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
              {es ? 'Ver proyectos' : 'View projects'} <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-cue" aria-hidden>
          <div className="scroll-line"><div className="scroll-fill" /></div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════ */}
      <section className="stats-bar" aria-label="Estadísticas">
        {STATS.map((s, i) => (
          <FadeUp key={i} delay={i * 0.08} className="stat-item">
            <p className="stat-num">{es ? s.numEs : s.numEn}</p>
            <p className="stat-label">{es ? s.labelEs : s.labelEn}</p>
          </FadeUp>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TAGLINE — The philosophy statement
      ══════════════════════════════════════════════════════════════════ */}
      <section className="tagline-section">
        <div className="tagline-inner">
          <SplitText tag="h2" className="tagline"
            text={es ? 'Diseño que da forma a la emoción.' : 'Design that gives form to emotion.'} />
          <FadeUp delay={0.5}>
            <p className="tagline-body">
              {es
                ? 'En Otero Studio, cada proyecto es una historia única. Escuchamos, interpretamos y creamos espacios que reflejan quien eres — funcionales, sostenibles, y estéticamente impecables.'
                : 'At Otero Studio, every project is a unique story. We listen, interpret, and create spaces that reflect who you are — functional, sustainable, and aesthetically impeccable.'}
            </p>
            <Link to="/filosofia" className="link-underline"
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
              {es ? 'Nuestra filosofía →' : 'Our philosophy →'}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURED PROJECTS — Asymmetric grid
      ══════════════════════════════════════════════════════════════════ */}
      <section className="home-projects">
        <div className="section-header">
          <FadeUp>
            <span className="eyebrow">{es ? 'Proyectos' : 'Projects'}</span>
            <h2 className="section-title">
              <SplitText text={es ? 'Trabajo Seleccionado' : 'Selected Work'} />
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link to="/proyectos" className="link-underline"
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
              {es ? 'Ver todos los proyectos →' : 'View all projects →'}
            </Link>
          </FadeUp>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <motion.article key={i}
              className={`proj-card proj-card--${i}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}
            >
              <div className="proj-img-wrap">
                <img src={p.src} alt={es ? p.nameEs : p.nameEn} loading="lazy" />
                <div className="proj-hover-overlay" />
              </div>
              <div className="proj-meta">
                <p className="proj-cat">{es ? p.catEs : p.catEn} · {p.loc} · {p.year}</p>
                <h3 className="proj-name">{es ? p.nameEs : p.nameEn}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PHILOSOPHY TEASER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="philo-teaser">
        <div className="philo-teaser-img">
          <ImageReveal src="/assets/images/hero_facade.png" alt="Otero Studio workspace" />
        </div>
        <div className="philo-teaser-text">
          <FadeUp>
            <span className="eyebrow">{es ? 'Nuestra Filosofía' : 'Our Philosophy'}</span>
          </FadeUp>
          <FadeUp delay={0.15}>
            <blockquote className="philo-big-quote">
              {es
                ? '«Cada espacio tiene el poder de transformar la vida de las personas que lo habitan.»'
                : '"Every space has the power to transform the lives of the people who inhabit it."'}
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="philo-teaser-body">
              {es
                ? 'Especializadas en obra nueva y reforma integral, combinamos técnica arquitectónica con un profundo sentido artístico. Nos obsesiona el detalle, la selección de materiales y el impacto que cada decisión tiene en el bienestar de quienes vivirán ese espacio.'
                : 'Specializing in new builds and complete renovations, we combine architectural technique with a deep artistic sensibility. We are obsessed with detail, material selection, and the impact each decision has on the wellbeing of those who will inhabit the space.'}
            </p>
            <Link to="/filosofia" className="btn-outline"
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
              {es ? 'Conoce a Otero Studio' : 'Meet Otero Studio'} <ArrowRight size={13} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALS — Sleek Interactive Carousel
      ══════════════════════════════════════════════════════════════════ */}
      <section className="reviews-section">
        <FadeUp>
          <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>
            {es ? 'Opiniones Reales · Google Maps' : 'Real Reviews · Google Maps'}
          </span>
          <h2 className="section-title reviews-title" style={{ textAlign: 'center' }}>
            <SplitText text={es ? 'Lo que dicen nuestros clientes' : 'What our clients say'} />
          </h2>
        </FadeUp>

        <div className="reviews-carousel-container">
          <div className="reviews-carousel-track">
            <AnimatePresence mode="wait">
              <motion.div
                key={review}
                className="review-carousel-card"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="review-stars" aria-label="5 estrellas">★★★★★</div>
                <p className="review-text">"{es ? REVIEWS[review].textEs : REVIEWS[review].textEn}"</p>
                
                <div className="review-footer">
                  <p className="review-name">{REVIEWS[review].author}</p>
                  <p className="review-ago">{es ? `Hace ${REVIEWS[review].ago}` : `${REVIEWS[review].ago} ago`}</p>
                </div>

                {(es ? REVIEWS[review].replyEs : REVIEWS[review].replyEn) && (
                  <div className="review-reply">
                    <p className="rr-label">Otero Studio:</p>
                    <p className="rr-body">{es ? REVIEWS[review].replyEs : REVIEWS[review].replyEn}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="reviews-carousel-controls">
            <button
              className="carousel-arrow"
              onClick={() => setReview(r => (r - 1 + REVIEWS.length) % REVIEWS.length)}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
              aria-label={es ? 'Anterior' : 'Previous'}
            >
              ←
            </button>
            
            <div className="carousel-indicators">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${review === idx ? 'active' : ''}`}
                  onClick={() => setReview(idx)}
                  onMouseEnter={hoverOn}
                  onMouseLeave={hoverOff}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-arrow"
              onClick={() => setReview(r => (r + 1) % REVIEWS.length)}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
              aria-label={es ? 'Siguiente' : 'Next'}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — Bold full-width contact invitation
      ══════════════════════════════════════════════════════════════════ */}
      <section className="cta-section">
        <FadeUp className="cta-inner">
          <p className="eyebrow">{es ? 'Comienza tu proyecto' : 'Start your project'}</p>
          <h2 className="cta-heading">
            <SplitText text={es ? 'Construyamos algo extraordinario juntos.' : 'Let\'s build something extraordinary together.'} />
          </h2>
          <Link to="/contacto" className="cta-btn"
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            {es ? 'Cuéntanos tu proyecto' : 'Tell us about your project'} <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SplitText, FadeUp, ImageReveal } from '../components/Animate'

const VALUES = [
  { num: '01', titleEs: 'Escucha Activa',     titleEn: 'Active Listening',    descEs: 'Cada proyecto comienza con la persona que lo habitará. Antes de dibujar una línea, escuchamos profundamente. Sin prejuicios, sin soluciones prediseñadas.', descEn: 'Every project begins with the person who will inhabit it. Before drawing a single line, we listen deeply. Without prejudice, without pre-designed solutions.' },
  { num: '02', titleEs: 'Honestidad',         titleEn: 'Honesty',             descEs: 'Transparencia absoluta en presupuestos, plazos y posibilidades. Preferimos decir "esto no es posible" a prometer lo que no podemos cumplir.', descEn: 'Absolute transparency in budgets, timelines, and possibilities. We prefer to say "this is not possible" over promising what we cannot deliver.' },
  { num: '03', titleEs: 'Rigor Técnico',      titleEn: 'Technical Rigor',     descEs: 'La belleza sin solidez estructural no existe. Cada detalle constructivo está pensado para durar, cumplir la normativa y resistir el paso del tiempo.', descEn: 'Beauty without structural soundness does not exist. Every construction detail is designed to last, comply with regulations, and withstand the test of time.' },
  { num: '04', titleEs: 'Compromiso',         titleEn: 'Commitment',          descEs: 'El proyecto no termina en la entrega de planos. Acompañamos cada obra y estamos disponibles mucho después de la entrega final.', descEn: 'The project does not end with the delivery of plans. We accompany every construction and are available long after the final handover.' },
]

const TIMELINE = [
  { year: '2012', descEs: 'Eva Otero comienza su carrera en arquitectura en Madrid, colaborando con estudios de referencia en proyectos residenciales y de rehabilitación del patrimonio.', descEn: 'Eva Otero begins her architecture career in Madrid, collaborating with leading studios on residential and heritage rehabilitation projects.' },
  { year: '2016', descEs: 'Regreso a Segovia para desarrollar proyectos propios que integran la tradición constructiva castellana con la sensibilidad contemporánea.', descEn: 'Return to Segovia to develop independent projects that integrate Castilian building tradition with contemporary sensibility.' },
  { year: '2020', descEs: 'Fundación formal de Otero Studio. El estudio consolida su identidad: arquitectura personalizada, materiales nobles y relación directa y honesta con el cliente.', descEn: 'Formal founding of Otero Studio. The practice consolidates its identity: personalized architecture, noble materials, and a direct, honest relationship with clients.' },
  { year: 'Hoy',  descEs: 'Referencia en Segovia y provincia para proyectos de alta calidad arquitectónica, con valoración perfecta en Google Maps y una red de clientes fieles.', descEn: 'A reference in Segovia and the province for high-quality architectural projects, with a perfect Google Maps rating and a loyal client network.' },
]

export default function About({ lang, cursor }) {
  const es = lang === 'es'
  const hoverOn  = () => cursor.set('hover')
  const hoverOff = () => cursor.set('default')

  return (
    <>
      {/* ── Page hero ── */}
      <section className="page-hero">
        <div className="page-hero-img">
          <img src="/assets/images/hero_facade.png" alt={es ? 'Filosofía' : 'Philosophy'} />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-body">
          <motion.p className="page-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}>
            {es ? 'El Estudio' : 'The Studio'}
          </motion.p>
          <motion.h1 className="page-hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            {es ? 'Filosofía' : 'Philosophy'}
          </motion.h1>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section className="section-block manifesto-section">
        <div className="manifesto-grid">
          <FadeUp className="manifesto-left">
            <span className="eyebrow">{es ? 'Manifiesto' : 'Manifesto'}</span>
            <h2 className="manifesto-heading">
              <SplitText text={es
                ? 'Creemos que los espacios tienen el poder de transformar vidas.'
                : 'We believe spaces have the power to transform lives.'} />
            </h2>
          </FadeUp>
          <div className="manifesto-right">
            <FadeUp delay={0.1}>
              <p>{es
                ? 'La arquitectura no es solo la construcción de muros y techos. Es la creación de escenarios donde las personas viven sus momentos más importantes — donde los niños crecen, donde las familias se reúnen, donde los individuos encuentran su refugio.'
                : 'Architecture is not just the construction of walls and roofs. It is the creation of settings where people live their most important moments — where children grow, where families gather, where individuals find their refuge.'}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p>{es
                ? 'En Otero Studio trabajamos desde la convicción de que la arquitectura de calidad no es un privilegio reservado a unos pocos. Es un derecho que cualquier persona merece, independientemente de la escala o el presupuesto del proyecto.'
                : 'At Otero Studio we work from the conviction that quality architecture is not a privilege reserved for a few. It is a right that everyone deserves, regardless of the scale or budget of the project.'}</p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p>{es
                ? 'Por eso escuchamos antes de proyectar. Por eso proponemos en lugar de imponer. Y por eso nos mantenemos presentes durante todo el proceso, hasta que las personas pueden finalmente vivir en el espacio que imaginaron.'
                : 'That is why we listen before designing. That is why we propose rather than impose. And that is why we remain present throughout the entire process, until people can finally live in the space they imagined.'}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Eva Otero — Director profile ── */}
      <section className="section-block director-section">
        <div className="director-grid">
          <div className="director-img-col">
            <ImageReveal src="/assets/images/eva_otero.jpg" alt="Eva Otero" />
            <FadeUp delay={0.3}>
              <div className="director-img-caption">
                <span>Eva Otero</span>
                <span>{es ? 'Directora · Segovia' : 'Director · Segovia'}</span>
              </div>
            </FadeUp>
          </div>
          <div className="director-text-col">
            <FadeUp>
              <span className="eyebrow">{es ? 'La Directora' : 'The Director'}</span>
              <h2 className="director-heading">Eva Otero</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="director-title-tag">{es ? 'Arquitecta · Diseñadora de Interiores' : 'Architect · Interior Designer'}</p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p>{es
                ? 'Formada en arquitectura y diseño de interiores, Eva Otero combina una sólida base técnica con una sensibilidad estética muy desarrollada. Su trabajo se caracteriza por el respeto profundo hacia el lugar, los materiales y las personas que habitarán cada espacio.'
                : 'Trained in architecture and interior design, Eva Otero combines a solid technical foundation with a highly developed aesthetic sensibility. Her work is characterized by deep respect for the place, the materials, and the people who will inhabit each space.'}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p>{es
                ? 'Nacida y formada en Castilla, su trabajo se nutre de la tradición constructiva de la meseta — la solidez del granito, la honestidad de la mampostería, la austeridad que no renuncia a la belleza — reinterpretada desde una mirada contemporánea y global.'
                : 'Born and trained in Castile, her work draws from the building tradition of the meseta — the solidity of granite, the honesty of masonry, the austerity that does not renounce beauty — reinterpreted through a contemporary and global lens.'}</p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p>{es
                ? '"Mi objetivo es que cuando entres en un espacio que he proyectado, no pienses en la arquitectura. Que simplemente te sientas bien, en casa, en tu lugar."'
                : '"My goal is that when you enter a space I have designed, you don\'t think about the architecture. That you simply feel good, at home, in your place."'}</p>
              <p className="director-quote-cite">— Eva Otero</p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <a href="mailto:eva.oterostudio@gmail.com" className="btn-outline"
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                {es ? 'Contactar directamente' : 'Contact directly'} <ArrowRight size={13} />
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Studio values ── */}
      <section className="section-block values-section">
        <FadeUp>
          <span className="eyebrow">{es ? 'Nuestros Valores' : 'Our Values'}</span>
          <h2 className="section-title">
            <SplitText text={es ? 'Principios que guían cada proyecto' : 'Principles that guide every project'} />
          </h2>
        </FadeUp>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <FadeUp key={i} delay={i * 0.1} className="value-card">
              <span className="value-num">{v.num}</span>
              <h3 className="value-title">{es ? v.titleEs : v.titleEn}</h3>
              <div className="value-rule" />
              <p className="value-desc">{es ? v.descEs : v.descEn}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-block timeline-section">
        <FadeUp>
          <span className="eyebrow">{es ? 'Trayectoria' : 'Journey'}</span>
          <h2 className="section-title">
            <SplitText text={es ? 'Años de experiencia y aprendizaje' : 'Years of experience and learning'} />
          </h2>
        </FadeUp>
        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1} className="timeline-item">
              <span className="timeline-year">{t.year}</span>
              <div className="timeline-dot" />
              <p className="timeline-desc">{es ? t.descEs : t.descEn}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Studio in Segovia ── */}
      <section className="section-block segovia-section">
        <div className="segovia-grid">
          <div className="segovia-img">
            <ImageReveal src="/assets/images/historic_restoration.png" alt="Segovia" />
          </div>
          <div className="segovia-text">
            <FadeUp>
              <span className="eyebrow">{es ? 'Arraigo local' : 'Local roots'}</span>
              <h2 className="section-title">
                <SplitText text={es ? 'Segovia como punto de partida' : 'Segovia as our starting point'} />
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p>{es
                ? 'Segovia no es solo nuestra sede. Es nuestra fuente de inspiración. Una ciudad donde el tiempo geológico se superpone al tiempo humano — donde el acueducto romano dialoga con edificios del siglo XXI. Esa convivencia de estratos históricos nos enseña que lo nuevo no tiene que negar lo antiguo.'
                : 'Segovia is not just our home base. It is our source of inspiration. A city where geological time overlaps with human time — where the Roman aqueduct dialogues with 21st-century buildings. That coexistence of historical layers teaches us that the new does not have to deny the old.'}</p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p>{es
                ? 'Trabajamos principalmente en Segovia y su provincia, aunque hemos desarrollado proyectos en Madrid y otras ciudades de Castilla y León. Preferimos una relación cercana con el lugar de intervención: conocer la luz, el viento, los materiales locales, los vecinos.'
                : 'We work primarily in Segovia and its province, though we have developed projects in Madrid and other cities in Castile and León. We prefer a close relationship with the place of intervention: knowing the light, the wind, the local materials, the neighbors.'}</p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <Link to="/contacto" className="btn-outline"
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                {es ? 'Visítanos en el estudio' : 'Visit us at the studio'} <ArrowRight size={13} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}

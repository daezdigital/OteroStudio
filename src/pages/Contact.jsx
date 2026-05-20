import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SplitText, FadeUp } from '../components/Animate'

const PROJECT_TYPES = [
  { keyEs: 'Obra Nueva',         keyEn: 'New Build'        },
  { keyEs: 'Reforma Integral',   keyEn: 'Full Renovation'  },
  { keyEs: 'Diseño de Interiores',keyEn: 'Interior Design' },
  { keyEs: 'Rehabilitación',     keyEn: 'Restoration'      },
  { keyEs: 'Consultoría',        keyEn: 'Consultancy'      },
  { keyEs: 'Otro',               keyEn: 'Other'            },
]

const BUDGETS = [
  { keyEs: 'Menos de 30.000 €',  keyEn: 'Under €30,000'   },
  { keyEs: '30.000 – 80.000 €',  keyEn: '€30,000 – €80,000' },
  { keyEs: '80.000 – 200.000 €', keyEn: '€80,000 – €200,000' },
  { keyEs: 'Más de 200.000 €',   keyEn: 'Over €200,000'   },
  { keyEs: 'A determinar',       keyEn: 'To be determined' },
]

const HOW_FOUND = [
  { keyEs: 'Google',       keyEn: 'Google'       },
  { keyEs: 'Instagram',    keyEn: 'Instagram'     },
  { keyEs: 'Recomendación',keyEn: 'Recommendation'},
  { keyEs: 'Otro',         keyEn: 'Other'         },
]

const CONTACT_INFO = [
  { label: 'Email',     value: 'eva.oterostudio@gmail.com', href: 'mailto:eva.oterostudio@gmail.com' },
  { label: 'Teléfono',  value: '+34 635 040 860',           href: 'tel:+34635040860' },
  { label: 'Instagram', value: '@oterostudio',              href: 'https://instagram.com/oterostudio' },
  { label: 'Google Maps',value: 'Otero Studio',            href: 'https://maps.app.goo.gl/mPKdxcpCdtkuU1fq7' },
]

export default function Contact({ lang, cursor }) {
  const es = lang === 'es'
  const hoverOn  = () => cursor.set('hover')
  const hoverOff = () => cursor.set('default')

  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '',
    projectType: '', budget: '', howFound: '', message: '',
  })
  const [errors, setErrors]   = useState({})
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name    = es ? 'Campo requerido' : 'Required field'
    if (!form.email.includes('@')) e.email   = es ? 'Email inválido' : 'Invalid email'
    if (!form.projectType)         e.projectType = es ? 'Selecciona un tipo' : 'Select a type'
    if (!form.message.trim())      e.message = es ? 'Cuéntanos más' : 'Tell us more'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    // Simulate submission (no backend)
    setTimeout(() => { setSending(false); setSent(true) }, 1800)
  }

  return (
    <>
      {/* ── Page hero ── */}
      <section className="page-hero page-hero--short">
        <div className="page-hero-img">
          <img src="/assets/images/interior_reform.png" alt="Contacto" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-body">
          <motion.p className="page-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}>
            {es ? 'Empecemos' : "Let's start"}
          </motion.p>
          <motion.h1 className="page-hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            {es ? 'Contacto' : 'Contact'}
          </motion.h1>
        </div>
      </section>

      {/* ── Contact info + form ── */}
      <section className="section-block contact-section">
        <div className="contact-grid">

          {/* Left — info */}
          <div className="contact-info-col">
            <FadeUp>
              <span className="eyebrow">{es ? 'El Estudio' : 'The Studio'}</span>
              <h2 className="contact-info-heading">
                {es ? 'Hablemos de tu proyecto.' : "Let's talk about your project."}
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="contact-info-body">
                {es
                  ? 'La primera conversación es siempre sin compromiso. Cuéntanos qué tienes en mente y estudiamos cómo podemos ayudarte.'
                  : 'The first conversation is always without commitment. Tell us what you have in mind and we will study how we can help you.'}
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="contact-details">
                {CONTACT_INFO.map((c, i) => (
                  <div key={i} className="contact-detail-row">
                    <span className="cd-label">{c.label}</span>
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="studio-hours">
                <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
                  {es ? 'Horario' : 'Hours'}
                </p>
                <p>{es ? 'Lunes – Viernes: 9:00 – 18:00' : 'Mon – Fri: 9:00 – 18:00'}</p>
                <p>{es ? 'Sábados: con cita previa' : 'Saturday: by appointment'}</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="studio-address-block">
                <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
                  {es ? 'Dirección' : 'Address'}
                </p>
                <p>Plaza Fernando de Rojas, 7</p>
                <p>40006 Segovia, España</p>
                <a href="https://maps.app.goo.gl/mPKdxcpCdtkuU1fq7" target="_blank" rel="noopener noreferrer"
                  className="link-underline" style={{ marginTop: '0.75rem', display: 'inline-block' }}
                  onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                  {es ? 'Ver en Google Maps →' : 'View on Google Maps →'}
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — form */}
          <div className="contact-form-col">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success" className="form-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <CheckCircle size={48} className="success-icon" />
                  <h3>{es ? '¡Mensaje enviado!' : 'Message sent!'}</h3>
                  <p>{es
                    ? 'Gracias por contactar con Otero Studio. Eva se pondrá en contacto contigo en menos de 24 horas.'
                    : 'Thank you for contacting Otero Studio. Eva will get in touch within 24 hours.'}</p>
                  <button className="btn-outline" onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',location:'',projectType:'',budget:'',howFound:'',message:'' }) }}
                    onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                    {es ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" className="contact-form"
                  onSubmit={handleSubmit} noValidate
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}>

                  <FadeUp>
                    <p className="form-intro">
                      {es
                        ? 'Completa el formulario y nos pondremos en contacto contigo pronto.'
                        : 'Complete the form and we will get back to you shortly.'}
                    </p>
                  </FadeUp>

                  {/* Row 1: Name + Email */}
                  <div className="form-row">
                    <FadeUp className="form-field" delay={0.05}>
                      <label htmlFor="name">{es ? 'Nombre completo *' : 'Full name *'}</label>
                      <input id="name" type="text" value={form.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder={es ? 'Eva García' : 'Eva García'}
                        className={errors.name ? 'error' : ''} />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </FadeUp>
                    <FadeUp className="form-field" delay={0.08}>
                      <label htmlFor="email">Email *</label>
                      <input id="email" type="email" value={form.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="tu@email.com"
                        className={errors.email ? 'error' : ''} />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </FadeUp>
                  </div>

                  {/* Row 2: Phone + Location */}
                  <div className="form-row">
                    <FadeUp className="form-field" delay={0.1}>
                      <label htmlFor="phone">{es ? 'Teléfono' : 'Phone'}</label>
                      <input id="phone" type="tel" value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        placeholder="+34 600 000 000" />
                    </FadeUp>
                    <FadeUp className="form-field" delay={0.12}>
                      <label htmlFor="location">{es ? 'Localización del proyecto' : 'Project location'}</label>
                      <input id="location" type="text" value={form.location}
                        onChange={e => set('location', e.target.value)}
                        placeholder={es ? 'Segovia, Madrid...' : 'Segovia, Madrid...'} />
                    </FadeUp>
                  </div>

                  {/* Project type chips */}
                  <FadeUp className="form-field" delay={0.14}>
                    <label>{es ? 'Tipo de proyecto *' : 'Project type *'}</label>
                    <div className={`chip-group ${errors.projectType ? 'error' : ''}`}>
                      {PROJECT_TYPES.map((pt, i) => (
                        <button key={i} type="button"
                          className={`chip ${form.projectType === (es ? pt.keyEs : pt.keyEn) ? 'selected' : ''}`}
                          onClick={() => set('projectType', es ? pt.keyEs : pt.keyEn)}
                          onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                          {es ? pt.keyEs : pt.keyEn}
                        </button>
                      ))}
                    </div>
                    {errors.projectType && <span className="form-error">{errors.projectType}</span>}
                  </FadeUp>

                  {/* Budget chips */}
                  <FadeUp className="form-field" delay={0.16}>
                    <label>{es ? 'Presupuesto aproximado' : 'Approximate budget'}</label>
                    <div className="chip-group">
                      {BUDGETS.map((b, i) => (
                        <button key={i} type="button"
                          className={`chip ${form.budget === (es ? b.keyEs : b.keyEn) ? 'selected' : ''}`}
                          onClick={() => set('budget', es ? b.keyEs : b.keyEn)}
                          onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                          {es ? b.keyEs : b.keyEn}
                        </button>
                      ))}
                    </div>
                  </FadeUp>

                  {/* Message */}
                  <FadeUp className="form-field" delay={0.18}>
                    <label htmlFor="message">
                      {es ? 'Cuéntanos tu proyecto *' : 'Tell us about your project *'}
                    </label>
                    <textarea id="message" rows={5} value={form.message}
                      onChange={e => set('message', e.target.value)}
                      placeholder={es
                        ? 'Describe brevemente qué tienes en mente, el estado actual del espacio, y cualquier detalle que consideres relevante...'
                        : 'Briefly describe what you have in mind, the current state of the space, and any details you consider relevant...'}
                      className={errors.message ? 'error' : ''} />
                    <span className="char-count">{form.message.length} / 1000</span>
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </FadeUp>

                  {/* How found */}
                  <FadeUp className="form-field" delay={0.2}>
                    <label>{es ? '¿Cómo nos encontraste?' : 'How did you find us?'}</label>
                    <div className="chip-group">
                      {HOW_FOUND.map((h, i) => (
                        <button key={i} type="button"
                          className={`chip ${form.howFound === (es ? h.keyEs : h.keyEn) ? 'selected' : ''}`}
                          onClick={() => set('howFound', es ? h.keyEs : h.keyEn)}
                          onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                          {es ? h.keyEs : h.keyEn}
                        </button>
                      ))}
                    </div>
                  </FadeUp>

                  {/* Submit */}
                  <FadeUp delay={0.22}>
                    <button type="submit" className={`form-submit ${sending ? 'loading' : ''}`}
                      disabled={sending}
                      onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                      {sending
                        ? (es ? 'Enviando...' : 'Sending...')
                        : (es ? 'Enviar consulta' : 'Send enquiry')}
                      {!sending && <ArrowRight size={14} />}
                    </button>
                  </FadeUp>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Google Maps embed ── */}
      <section className="map-section">
        <FadeUp>
          <span className="eyebrow" style={{ padding: '0 3.5rem' }}>
            {es ? 'Encuéntranos' : 'Find us'}
          </span>
        </FadeUp>
        <div className="map-embed-wrap">
          <iframe
            title="Otero Studio — Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.246371747266!2d-4.1005955!3d40.9322673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd413f27c2637df1%3A0x3dd0173d7a5fba5f!2sOTERO%20STUDIO!5e0!3m2!1sen!2sve!4v1779300534024!5m2!1sen!2sve"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-block faq-section">
        <FadeUp>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title">
            <SplitText text={es ? 'Preguntas frecuentes' : 'Frequently asked questions'} />
          </h2>
        </FadeUp>
        <div className="faq-grid">
          {[
            { qEs: '¿Cuánto cuesta una consulta inicial?', qEn: 'How much does an initial consultation cost?', aEs: 'La primera reunión es siempre sin coste ni compromiso. Queremos conocerte y entender tu proyecto antes de hablar de honorarios.', aEn: 'The first meeting is always free and without commitment. We want to get to know you and understand your project before talking about fees.' },
            { qEs: '¿Trabajáis fuera de Segovia?', qEn: 'Do you work outside Segovia?', aEs: 'Principalmente en Segovia y provincia, aunque hemos desarrollado proyectos en Madrid, Ávila y otras ciudades de Castilla y León. Consúltanos.', aEn: 'Primarily in Segovia and province, though we have worked in Madrid, Ávila, and other cities in Castile and León. Ask us.' },
            { qEs: '¿Cuánto tiempo tarda un proyecto?', qEn: 'How long does a project take?', aEs: 'Depende del alcance: una reforma de vivienda puede llevar de 3 a 9 meses, una obra nueva de 12 a 24 meses. Siempre establecemos plazos realistas desde el inicio.', aEn: 'It depends on scope: a home renovation can take 3–9 months, a new build 12–24 months. We always establish realistic timelines from the start.' },
            { qEs: '¿Gestionáis también las licencias y permisos?', qEn: 'Do you also handle licenses and permits?', aEs: 'Sí. La gestión de licencias urbanísticas, cédulas de habitabilidad y todos los trámites administrativos están incluidos en nuestros servicios.', aEn: 'Yes. Management of planning licenses, habitability certificates, and all administrative procedures are included in our services.' },
          ].map((faq, i) => (
            <FadeUp key={i} delay={i * 0.08} className="faq-item">
              <h3 className="faq-q">{es ? faq.qEs : faq.qEn}</h3>
              <p className="faq-a">{es ? faq.aEs : faq.aEn}</p>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  )
}

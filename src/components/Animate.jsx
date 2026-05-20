import { motion } from 'framer-motion'

/**
 * SplitText — reveal each word from below using clip-path (Emil Kowalski style)
 */
export function SplitText({ text, className = '', delay = 0, tag: Tag = 'span' }) {
  if (!text) return null
  return (
    <Tag className={`reveal-text ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="reveal-wrap">
          <motion.span
            className="reveal-word"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.1, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * FadeUp — simple fade + slide up on scroll
 */
export function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ImageReveal — clip-path wipe-in from bottom
 */
export function ImageReveal({ src, alt, className = '', delay = 0 }) {
  return (
    <motion.div
      className={`img-reveal-wrap ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      <img src={src} alt={alt} loading="lazy" />
    </motion.div>
  )
}

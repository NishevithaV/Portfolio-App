"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const LINKS = [
  { href: 'mailto:nishevitha.v@gmail.com', label: 'Email', icon: faPaperPlane },
  {
    href: 'https://www.linkedin.com/in/nishevitha-venkatesh/',
    label: 'LinkedIn',
    icon: faLinkedin,
  },
  { href: 'https://github.com/NishevithaV', label: 'GitHub', icon: faGithub },
]

/**
 * Inverted closing section, bookending the hero so the page begins and ends
 * in black with the white work held between them.
 */
const ContactSection = () => {
  return (
    <section id="contact" className="invert-section scroll-mt-24 w-full">
      <div className="container mx-auto px-6 py-20 sm:px-12 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 flex items-baseline gap-4"
        >
          <span className="section-number text-4xl sm:text-5xl">03</span>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink sm:text-4xl">
            Let&apos;s Connect
          </h2>
        </motion.div>

        <motion.a
          href="mailto:nishevitha.v@gmail.com"
          data-cursor="view"
          data-cursor-label="Say hi"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="group block w-full"
        >
          {/* Sized to fit the container at every width: the address is long,
              so the cap is well below what 8vw would give on a wide screen. */}
          <span className="block break-words font-display text-[clamp(1.6rem,5.6vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
            nishevitha.v@gmail.com
          </span>
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-full origin-left scale-x-100 bg-line-strong transition-colors duration-300 group-hover:bg-accent"
          />
        </motion.a>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            className="max-w-md font-serif text-base text-muted sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Have questions, ideas or opportunities? I&apos;m excited to hear from
            you. Send me a message.
          </motion.p>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={l.label}
                data-cursor="link"
                className="border border-line p-3.5 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-bg"
              >
                <FontAwesomeIcon icon={l.icon} className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

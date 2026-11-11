"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { motion, useReducedMotion } from 'framer-motion'
import RoleRotator from './RoleRotator'
import useSectionProgress from '../hooks/useSectionProgress'

/**
 * Inverted full-height hero.
 *
 * The visible wordmark is WebGL, so a plain `<h1>` is kept in the DOM for
 * search engines and screen readers and the canvas is marked decorative. The
 * same DOM wordmark doubles as the loading state for the 3D chunk, so the hero
 * is never blank and never wrong.
 */

const DomWordmark = ({ dim = false }) => (
  <div className="pointer-events-none flex h-full w-full items-center justify-center px-6">
    <p
      aria-hidden="true"
      className={`font-display text-center font-extrabold uppercase leading-[0.84] tracking-tight text-ink transition-opacity duration-500 ${
        dim ? 'opacity-30' : 'opacity-100'
      } text-[clamp(2.6rem,13vw,11rem)]`}
    >
      Nishevitha
      <br />
      Venkatesh
    </p>
  </div>
)

const NameType3D = dynamic(() => import('./three/NameType3D'), {
  ssr: false,
  loading: () => <DomWordmark />,
})

const SOCIALS = [
  { href: 'https://github.com/NishevithaV', label: 'GitHub', icon: faGithub },
  { href: 'mailto:nishevitha.v@gmail.com', label: 'Email', icon: faEnvelope },
  {
    href: 'https://www.linkedin.com/in/nishevitha-venkatesh/',
    label: 'LinkedIn',
    icon: faLinkedin,
  },
]

const Hero = () => {
  const [ref, progress] = useSectionProgress(['start start', 'end start'])
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      ref={ref}
      className="invert-section relative flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      {/* The real heading, for search engines and assistive tech. */}
      <h1 className="sr-only">Nishevitha Venkatesh &mdash; Product Engineer</h1>

      {/* ---- top rule ---- */}
      <div className="flex shrink-0 items-baseline justify-between px-6 pb-2 pt-24 sm:px-10 sm:pt-28">
        <span className="fig-label">No. 001 &mdash; Portfolio</span>
        <span className="fig-label">Rev. 2026</span>
      </div>

      {/* ---- the 3D wordmark gets the flexible middle, so it can never
              collide with the copy below it ---- */}
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <NameType3D scrollProgress={progress} reduced={!!reduced} />
        </div>
      </div>

      {/* ---- the copy ---- */}
      <div className="shrink-0 px-6 pb-8 sm:px-10 sm:pb-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xl"
          >
            <RoleRotator />

            <div className="doc-rule mb-5 mt-3 w-full max-w-xs" />

            <p className="max-w-md font-serif text-base leading-relaxed text-muted">
              I&rsquo;m a software engineer who likes turning hard problems into
              products people actually use.
            </p>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  data-cursor="link"
                  className="border border-line p-2.5 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-bg"
                >
                  <FontAwesomeIcon icon={s.icon} style={{ width: '18px', height: '18px' }} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Portrait: monochrome until you touch it - the colour rule, stated
              immediately so the rest of the page reads as intentional. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="group hidden w-[130px] shrink-0 sm:block lg:w-[150px]"
          >
            <div
              className="relative aspect-[4/5] w-full overflow-hidden border border-line"
              data-cursor="view"
              data-cursor-label="Hello"
            >
              <img
                src="/images/profile_pic.jpeg"
                alt="Nishevitha Venkatesh"
                className="reveal-colour h-full w-full object-cover"
              />
            </div>
            <p className="fig-label mt-2">Fig. 1 &mdash; The author</p>
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
          <span className="fig-label">Scroll to begin</span>
          <motion.span
            aria-hidden="true"
            className="block h-8 w-px bg-line-strong"
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3] }}
            style={{ originY: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero

"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { motion, useReducedMotion } from 'framer-motion'
import RoleRotator from './RoleRotator'

/**
 * Inverted full-height hero.
 *
 * The name is set as ordinary type at the head of the copy block rather than
 * as a separate animated centrepiece: one typographic hierarchy, name then
 * rotating role then the line about the work, with nothing competing for
 * attention in the middle of the screen.
 */

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
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="invert-section relative flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      <div className="container mx-auto shrink-0 px-6 pt-20 sm:px-12 sm:pt-24">
        <span className="fig-label">No. 001 / Portfolio</span>
      </div>

      {/* Main block, centred in the space between the label and the scroll cue.

          A 12-column grid rather than two flex children pushed apart: the gap
          between the copy and the portrait is then a deliberate column of the
          same grid everything else uses, instead of whatever space happens to
          be left over at a given window width. */}
      <div className="container mx-auto flex min-h-0 flex-1 items-center px-6 py-10 sm:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-10 sm:grid-cols-12 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="min-w-0 sm:col-span-8 lg:col-span-7"
          >
            {/* The name reads as the standing label and the rotating role is
                the headline, rather than the other way round. */}
            <h1 className="font-display text-[clamp(1.05rem,2vw,1.6rem)] font-bold uppercase leading-none tracking-[0.04em] text-ink">
              Nishevitha Venkatesh
            </h1>

            <div className="mt-4">
              <RoleRotator />
            </div>

            <div className="doc-rule my-6 w-full max-w-sm" />

            <p className="max-w-lg font-serif text-base leading-relaxed text-muted">
              I&rsquo;m a software engineer who likes turning hard problems into
              products people actually use.
            </p>

            <div className="mt-7 flex gap-3">
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

          {/* Width comes from the grid column, so it scales smoothly instead of
              sticking at the floor of a clamp, and it is centred against the
              copy rather than dropped into the bottom corner. It is also no
              longer hidden below sm - vanishing at one width was the other half
              of it "changing size and disappearing". */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="group w-[160px] max-w-full sm:col-span-4 sm:col-start-9 sm:ml-auto sm:w-full sm:max-w-[320px]"
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
            <p className="fig-label mt-2">Fig. 1 / The author</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto shrink-0 px-6 pb-8 sm:px-12 sm:pb-10">
        <div className="flex items-center justify-between border-t border-line pt-4">
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

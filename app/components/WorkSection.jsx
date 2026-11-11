"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { WORKEXPERIENCE } from '../constants'
import useSectionProgress from '../hooks/useSectionProgress'

const WorkCuboid3D = dynamic(() => import('./three/WorkCuboid3D'), { ssr: false })

const RAIL = 92

const WorkSection = () => {
  // 'start center' -> 'end center' means progress tracks the row nearest the
  // middle of the screen, which is what the cube's quarter-turns represent.
  const [ref, progress] = useSectionProgress(['start center', 'end center'])
  const reduced = useReducedMotion()

  return (
    <section
      id="work"
      ref={ref}
      className="scroll-mt-24 border-t border-ink pb-8 pt-10 sm:pt-14"
    >
      <div className="mb-12 flex items-baseline gap-4 sm:mb-16">
        <span className="section-number text-4xl sm:text-5xl">01</span>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink sm:text-4xl">
          Work Experience
        </h2>
      </div>

      <div className="flex gap-5 sm:gap-10">
        {/* ---- the rail: one sticky cube for the whole timeline ---- */}
        <div className="relative hidden shrink-0 sm:block" style={{ width: RAIL }}>
          <div
            aria-hidden="true"
            className="absolute bottom-2 top-2 w-px bg-line"
            style={{ left: RAIL / 2 }}
          />
          <div className="sticky top-[40vh]" style={{ height: RAIL }}>
            <WorkCuboid3D
              progress={progress}
              count={WORKEXPERIENCE.length}
              reduced={!!reduced}
              size={RAIL}
            />
          </div>
        </div>

        {/* ---- the roles ---- */}
        <div className="flex min-w-0 flex-1 flex-col gap-10 sm:gap-14">
          {WORKEXPERIENCE.map((experience, index) => {
            const isCurrent = experience.year.toLowerCase().includes('present')
            return (
              <motion.article
                key={`${experience.company}-${index}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="group relative border border-ink bg-bg p-6 transition-colors duration-300 sm:p-8"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="fig-label">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                  <p className="fig-label">{experience.year}</p>
                  {isCurrent && (
                    <span className="fig-label border border-line px-2 py-0.5 transition-colors duration-300 group-hover:border-accent group-hover:!text-accent">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="mb-1 font-display text-2xl font-bold uppercase tracking-tight text-ink sm:text-3xl">
                  {experience.role}
                </h3>

                {/* Monochrome at rest; the company earns its colour on hover. */}
                <p className="mb-5 font-serif text-lg text-muted transition-colors duration-300 group-hover:text-accent">
                  <span className="text-muted-soft">@</span> {experience.company}
                </p>

                {experience.description?.length > 0 && (
                  <ul className="mb-5 max-w-2xl list-disc space-y-1.5 pl-4 font-serif text-muted">
                    {experience.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {experience.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, i) => (
                      <span key={i} className="fig-label border border-line px-3 py-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WorkSection

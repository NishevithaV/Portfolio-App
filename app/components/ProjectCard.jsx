import React from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import TiltCard from './TiltCard'

/**
 * Project card. Monochrome at rest; the cover image and the title take on
 * colour together on hover - the site's "colour is earned" rule, applied at
 * the place a visitor is most likely to be looking.
 */
const ProjectCard = ({ title, desc, img, iconLists = [], link }) => {
  const isLinked = link && link !== '#'

  const content = (
    <div className="group relative h-full">
      {/* hard offset shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border border-ink bg-ink opacity-0 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:opacity-100"
      />
      <TiltCard rotateRange={9} lift className="relative">
        <div className="flex h-full flex-col border border-ink bg-bg">
          {img && (
            <div className="relative h-40 shrink-0 overflow-hidden border-b border-ink bg-surface">
              <img
                src={img}
                alt=""
                aria-hidden="true"
                className="reveal-colour h-full w-full object-cover group-hover:scale-[1.03]"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="mb-3 font-display text-xl font-bold uppercase tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                {title}
              </h3>
              <p className="font-serif text-sm leading-relaxed text-muted">{desc}</p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-6">
              <div className="flex gap-2.5">
                {iconLists.map((icon, index) => (
                  <img
                    key={index}
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    className="reveal-colour h-[16px] w-[16px]"
                  />
                ))}
              </div>
              {isLinked && (
                <span className="fig-label inline-flex shrink-0 items-center gap-1 transition-colors duration-300 group-hover:!text-accent">
                  View
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  )

  return isLinked ? (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label="View"
      className="block h-full"
    >
      {content}
    </Link>
  ) : (
    content
  )
}

export default ProjectCard

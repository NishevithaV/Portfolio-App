import React from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import TiltCard from './TiltCard'

/**
 * Shared card for talks and articles. Same colour rule as ProjectCard: the
 * image is monochrome until hovered, rather than permanently desaturated.
 */
const TalkCard = ({ title, desc, img, type, link, imgFit = 'cover' }) => {
  const isLinked = link && link !== '#'

  const content = (
    <div className="group relative h-full">
      <div
        aria-hidden="true"
        className="absolute inset-0 border border-ink bg-ink opacity-0 transition-all duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover:opacity-100"
      />
      <TiltCard rotateRange={8} lift className="relative">
        <div className="flex h-full flex-col border border-ink bg-bg">
          <div className="relative h-52 shrink-0 overflow-hidden border-b border-ink bg-surface sm:h-56">
            <div
              className="reveal-colour absolute inset-0"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: imgFit,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {isLinked && (
              <div className="scrim-ink absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center border border-bg">
                  <ArrowUpRightIcon className="h-5 w-5 text-bg" />
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-grow flex-col px-5 py-5">
            {type && <p className="fig-label mb-2">{type}</p>}
            <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
              {title}
            </h3>
            <p className="font-serif text-sm leading-relaxed text-muted">{desc}</p>
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
      data-cursor-label="Open"
      className="block h-full"
    >
      {content}
    </Link>
  ) : (
    content
  )
}

export default TalkCard

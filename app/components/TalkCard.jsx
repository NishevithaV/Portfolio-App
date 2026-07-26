import React from 'react'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

const TalkCard = ({ title, desc, img, type, link, imgFit = "cover" }) => {
  const isLinked = link && link !== "#"

  const cardImage = (
    <div
      className="h-56 md:h-64 rounded-t-xl relative group border-b border-term-line"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: imgFit,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "var(--term-surface-2)",
      }}
    >
      {type && (
        <span className="absolute top-3 left-3 text-xs font-mono font-medium px-3 py-1 rounded-full bg-term-bg/80 text-term-accent border border-term-accent/30">
          {type}
        </span>
      )}
      {isLinked && (
        <div className="overlay absolute inset-0 bg-term-bg bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center rounded-t-xl">
          <div className="h-14 w-14 border-2 rounded-full border-term-line hover:border-term-accent flex items-center justify-center group/icon">
            <ArrowTopRightOnSquareIcon className="h-7 w-7 text-term-muted group-hover/icon:text-term-accent" />
          </div>
        </div>
      )}
    </div>
  )

  const content = (
    <div className="flex flex-col bg-term-surface border border-term-line rounded-xl overflow-hidden h-full glow-border-hover transition-shadow duration-300">
      {cardImage}
      <div className="py-5 px-4 flex flex-col flex-grow">
        <h5 className="text-term-text font-semibold text-base mb-2">{title}</h5>
        <p className="text-term-muted text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )

  return isLinked ? (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </Link>
  ) : (
    content
  )
}

export default TalkCard

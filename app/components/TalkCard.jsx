import React from 'react'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

const TalkCard = ({ title, desc, img, type, link }) => {
  const isLinked = link && link !== "#"

  const cardImage = (
    <div
      className="h-56 md:h-64 rounded-t-xl relative group"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {type && (
        <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-[#121212]/80 text-fuchsia-400 border border-fuchsia-400/30">
          {type}
        </span>
      )}
      {isLinked && (
        <div className="overlay absolute inset-0 bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center rounded-t-xl">
          <div className="h-14 w-14 border-2 rounded-full border-neutral-400 hover:border-white flex items-center justify-center group/icon">
            <ArrowTopRightOnSquareIcon className="h-7 w-7 text-neutral-400 group-hover/icon:text-white" />
          </div>
        </div>
      )}
    </div>
  )

  const content = (
    <div className="flex flex-col bg-[#181818] rounded-xl overflow-hidden h-full">
      {cardImage}
      <div className="py-5 px-4 flex flex-col flex-grow">
        <h5 className="text-white font-semibold text-base mb-2">{title}</h5>
        <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
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

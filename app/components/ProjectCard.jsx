import React from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const EXT_BY_ICON = {
  "/python.svg": "py",
  "/android.svg": "java",
  "/react.svg": "jsx",
  "/nodejs-icon.svg": "js",
}

const getExt = (iconLists = []) => {
  for (const icon of iconLists) {
    if (EXT_BY_ICON[icon]) return EXT_BY_ICON[icon]
  }
  return "js"
}

const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")

const ProjectCard = ({ title, desc, iconLists = [], link }) => {
  const isLinked = link && link !== "#"
  const filename = `${slugify(title)}.${getExt(iconLists)}`

  const content = (
    <div className="group flex flex-col justify-between h-full bg-term-surface border border-term-line hover:border-term-accent/40 rounded-xl overflow-hidden glow-border-hover transition-colors duration-300">
      <div>
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-term-line bg-term-surface-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-xs text-term-muted truncate">{filename}</span>
        </div>

        <div className="p-5">
          <h5 className="font-mono text-term-accent font-semibold text-lg mb-2 group-hover:text-glow transition-all duration-300">
            {title}
          </h5>
          <p className="text-term-muted text-sm leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <div className="flex gap-2.5">
          {iconLists.map((icon, index) => (
            <img key={index} src={icon} alt="icon" className="h-[18px] w-[18px] opacity-80 group-hover:opacity-100 transition-opacity" />
          ))}
        </div>
        {isLinked && (
          <span className="inline-flex items-center gap-1 font-mono text-xs text-term-muted group-hover:text-term-accent transition-colors duration-300 shrink-0">
            open<ArrowUpRightIcon className="h-3.5 w-3.5" />
          </span>
        )}
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

export default ProjectCard
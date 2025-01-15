import React from 'react'
import { WORKEXPERIENCE } from '../constants'
import { motion } from 'framer-motion'

const WorkSection = () => {
  return (
    <section id="work" className="border-b border-neutral-900 pb-4">
        <h1 className="mt-16 mb-12 text-center text-2xl sm:text-3xl sm:mt-20 md:mt-28">Work Experience</h1>

        <div className="max-h-[480px] overflow-y-scroll scrollbar-thin scrollbar-thumb-fuchsia-400 scrollbar-track-white" style={{ scrollbarGutter: 'stable', WebkitOverflowScrolling: 'touch',}}>
          {WORKEXPERIENCE.map((experience, index) => (
            <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
              <div className="w-full lg:w-1/4">
                <p className="mb-2 text-sm text-neutral-400">{experience.year}</p>
              </div>
              <div className="w-full max-w-xl lg:w-3/4">
                <h6 className="mb-2 font-semibold">
                  {experience.role} - <span className="text-sm text-purple-100">
                    {experience.company}
                  </span>
                </h6>
                <p className="mb-4 text-neutral-400">{experience.description}</p>
                {experience.skills.map((skill, index) => (
                  <span key={index} className="mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font=medium text-fuchsia-400">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default WorkSection
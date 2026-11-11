"use client"
import React, { useState, useEffect } from 'react'
import { PROJECTS } from '../constants'
import ProjectCard from './ProjectCard'
import { motion, AnimatePresence } from 'framer-motion'

const Projects = () => {
  const [showAll, setShowAll] = useState(false)
  const [initialCount, setInitialCount] = useState(6)

  useEffect(() => {
    const updateInitialCount = () => {
      setInitialCount(window.innerWidth < 768 ? 3 : 6)
    }
    updateInitialCount()
    window.addEventListener('resize', updateInitialCount)
    return () => window.removeEventListener('resize', updateInitialCount)
  }, [])

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, initialCount)
  const hasMore = PROJECTS.length > initialCount

  return (
    <section id="projects" className="scroll-mt-24 border-t border-ink py-16 sm:py-20">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 flex items-baseline gap-4 sm:mb-16"
      >
        <span className="section-number text-4xl sm:text-5xl">02</span>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink sm:text-4xl">
          Recent Projects
        </h2>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        <AnimatePresence>
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative hover:z-10"
            >
              <ProjectCard
                title={project.title}
                desc={project.desc}
                img={project.img}
                iconLists={project.iconLists}
                link={project.link}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            data-cursor="link"
            className="fig-label border border-line px-8 py-2.5 transition-colors duration-300 hover:border-ink hover:bg-ink hover:!text-bg"
          >
            {showAll ? 'View less' : `View all ${PROJECTS.length}`}
          </button>
        </div>
      )}
    </section>
  )
}

export default Projects

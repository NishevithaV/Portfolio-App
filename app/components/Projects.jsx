"use client"
import React, { useState, useEffect } from 'react'
import { PROJECTS } from '../constants'
import ProjectCard from './ProjectCard'
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState(6);

  useEffect(() => {
    const updateInitialCount = () => {
      setInitialCount(window.innerWidth < 768 ? 3 : 6);
    };
    updateInitialCount();
    window.addEventListener("resize", updateInitialCount);
    return () => window.removeEventListener("resize", updateInitialCount);
  }, []);

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, initialCount);
  const hasMore = PROJECTS.length > initialCount;

  return (
    <div className="py-20" id="projects">
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center font-mono text-term-accent-2 text-sm mb-2"
      >
        <span className="text-term-muted">$</span> ls ./projects
      </motion.p>
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl text-term-text text-center mb-10 font-semibold"
        style={{ willChange: "transform", overflowX: "hidden" }}>
        Recent Projects
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        <AnimatePresence>
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCard title={project.title} desc={project.desc} iconLists={project.iconLists} link={project.link} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative px-8 py-2.5 rounded-full font-mono text-sm font-medium text-term-text border border-term-line hover:border-term-accent bg-term-surface hover:text-term-accent transition-colors duration-300 glow-border-hover"
          >
            {showAll ? "view_less --collapse" : "view_more --expand"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Projects

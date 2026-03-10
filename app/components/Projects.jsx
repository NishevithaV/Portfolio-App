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
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl text-white text-center mb-10"
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
              <ProjectCard title={project.title} desc={project.desc} img={project.img} iconLists={project.iconLists} link={project.link} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative px-8 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 bg-transparent"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-[1.5px] rounded-full bg-[#121212] transition-all duration-300 group-hover:bg-[#181818]" />
            <span className="relative text-white/90 group-hover:text-white transition-colors duration-300 text-[15px] font-semibold tracking-wide">
              {showAll ? "View Less" : "View More"}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Projects

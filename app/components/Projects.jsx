"use client"
import React from 'react'
import { PROJECTS } from '../constants'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion';


const Projects = () => {

  return (
    <div className="py-20">
        <motion.h1 
          whileInView={{ opacity: 1, y: 0 }} 
          initial={{ opacity: 0, y: 100 }} 
          transition={{duration: 0.5}} 
          className="text-2xl sm:text-3xl text-white text-center mb-10"
          style={{ willChange: "transform", overflowX: "hidden" }}>
            Recent Projects
        </motion.h1>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {opacity: 0, y: 100 },
            visible: {
              opacity: 1, 
              y: 0, 
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: {opacity: 0, y: 100 },
                  visible: {opacity: 1, y: 0},
                  transition: {duration: 3, ease: "easeOut"}
                }}
              >
                <ProjectCard key={project.id} title={project.title} desc={project.desc} img={project.img} iconLists={project.iconLists} link={project.link} />
              </motion.div>
            ))}
        </motion.div>
    </div>
  )
}

export default Projects
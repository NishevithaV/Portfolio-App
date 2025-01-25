import React from 'react'
import { PROJECTS } from '../constants'
import ProjectCard from './ProjectCard'

const Projects = () => {
  return (
    <div className="py-20">
        <h1 className="text-2xl sm:text-3xl text-white text-center mb-10">Recent Projects
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} title={project.title} desc={project.desc} img={project.img} iconLists={project.iconLists} link={project.link} />
          ))}
        </div>
    </div>
  )
}

export default Projects
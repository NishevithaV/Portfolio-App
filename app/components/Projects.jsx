import React from 'react'
import { PROJECTS } from '../constants'
import ProjectCard from './ProjectCard'

const Projects = () => {
  return (
    <div className="py-20">
        <h1 className="text-2xl sm:text-3xl text-white text-center pb-8">Recent Projects
        </h1>
        
        <div>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} title={project.title} desc={project.desc} img={project.img} iconLists={project.iconLists} link={project.link} />
          ))}
        </div>
    </div>
  )
}

export default Projects
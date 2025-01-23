import React from 'react'

const ProjectCard = ({ id, title, desc, img, iconLists, link }) => {
  return (
    <div>
        <div 
            className="h-52 md:h-72 rounded-t-xl relative group"
            style={{backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",}}>
              <div className="overlay absolute top-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500"></div>
        </div>
        
        <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
            <h5 className="font-xl font-semibold mb-2">{title}</h5>
            <p className="text-neutral-400">{desc}</p>
        </div>
    </div>
  )
}

export default ProjectCard
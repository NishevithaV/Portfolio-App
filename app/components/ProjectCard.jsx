import React from 'react'

const ProjectCard = ({ id, title, desc, img, iconLists, link }) => {
  return (
    <div>
        <div 
            className="h-52 md:h-72"
            style={{backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",}}>
        </div>
        <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
            <h5>{title}</h5>
            <p>{desc}</p>
        </div>
    </div>
  )
}

export default ProjectCard
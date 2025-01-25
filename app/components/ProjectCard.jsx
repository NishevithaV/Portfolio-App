import React from 'react'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const ProjectCard = ({ title, desc, img, iconLists, link }) => {
  return (
    <div className="flex flex-col justify-between bg-[#181818] rounded-xl overflow-hidden h-full min-h-[400px]">
        <div 
            className="h-52 md:h-72 rounded-t-xl relative group"
            style={{backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",}}>
              <div className="overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center">
                <Link href={link} target="_blank" rel="noopener noreferrer" className="h-14 w-14 mr-2 border-2 relative rounded-full border-neutral-400 hover:border-white flex items-center justify-center group/link">
                  <CodeBracketIcon className="h-10 w-10 text-neutral-400 group-hover/link:text-white" />
                </Link>
              </div>
          </div>
        
        <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4 flex flex-col flex-grow justify-between">
          <div>
              <h5 className="font-xl font-semibold mb-2">{title}</h5>
              <p className="text-neutral-400">{desc}</p>
            </div>
            <div className="flex gap-2 mt-4">
                  {iconLists.map((icon, index) => (
                    <img key={index} src={icon} alt="icon" className="h-5 w-5" />
                  ))}
            </div>
        </div>
    </div>
  )
}

export default ProjectCard
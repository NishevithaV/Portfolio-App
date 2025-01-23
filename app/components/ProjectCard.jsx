import React from 'react'
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const ProjectCard = ({ id, title, desc, img, iconLists, link }) => {
  return (
    <div>
        <div 
            className="h-52 md:h-72 rounded-t-xl relative group"
            style={{backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",}}>
              <div className="overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center">
                <Link href="/" className="h-14 w-14 border-2 relative rounded-full border-neutral-400 hover:border-white flex items-center justify-center">
                  <CodeBracketIcon className="h-10 w-10 text-neutral-400 hover:text-white" />
                </Link>
              </div>
          </div>
        
        <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
            <h5 className="font-xl font-semibold mb-2">{title}</h5>
            <p className="text-neutral-400">{desc}</p>
        </div>
    </div>
  )
}

export default ProjectCard
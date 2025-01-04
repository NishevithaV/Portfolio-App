import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
  return (
    <section>
        <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-7">
                <h1 className="text-white mb-4 text-4xl lg:text-6xl font-extrabold">Hello, I'm Nishevitha Venkatesh</h1>
                <p className="text-[#ADB7BE] mb-6 text-lg lg:text-xl ">Quisque volutpat justo ut mauris ultrices, in elementum velit malesuada. Aenean non lacus sit amet nunc sagittis fermentum. Fusce gravida, ligula nec tincidunt sodales, justo augue cursus urna, vitae pulvinar ligula purus nec nisl.</p>
                <div className="flex space-x-3 mt-4">
                    <a href="https://github.com/NishevithaV" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faGithub} style={{ width: '34px', height: '34px' }} />
                    </a>

                    <a href="mailto:nishevitha.v@gmail.com" className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faEnvelope} style={{ width: '34px', height: '34px' }} />
                    </a>

                    <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener nonreferrer" className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faLinkedin} style={{ width: '34px', height: '34px' }} />
                    </a>
                </div>
            </div>
            <div className="col-span-5 place-self-center mt-5 lg:mt-0">
                <img src="/images/profile_pic.jpg" alt="Profile picture" className="rounded-full w-[300px] h-[300px] object-cover mx-auto" />
            </div>
        </div>
    </section>
  )
}

export default Hero
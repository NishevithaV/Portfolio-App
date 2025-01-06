"use client"
import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-8 sm:gap-x-6">
            <div className="col-span-7 place-self-center text-center sm:text-left">
                <h1 className="text-white mb-4 mt-4 lg:mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400">Hello, I'm{" "} </span>
                    <br></br>
                    <TypeAnimation
                        sequence={[
                            "Nishevitha Venkatesh",
                            1000,
                            "Software Developer",
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h1>
                <p className="text-[#ADB7BE] text-base sm:text-lg mt-6 mb-6 lg:text-xl">Quisque volutpat justo ut mauris ultrices, in elementum velit malesuada. Aenean non lacus sit amet nunc sagittis fermentum. Fusce gravida, ligula nec tincidunt sodales, justo augue cursus urna, vitae pulvinar ligula purus nec nisl.</p>
                <div className="flex space-x-3 mt-6 justify-center sm:justify-start">
                    <a href="https://github.com/NishevithaV" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faGithub} className="text-white" style={{ width: '28px', height: '28px' }} />
                    </a>

                    <a href="mailto:nishevitha.v@gmail.com" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faEnvelope} className="text-white" style={{ width: '28px', height: '28px' }} />
                    </a>

                    <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener nonreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faLinkedin} className="text-white" style={{ width: '28px', height: '28px' }} />
                    </a>
                </div>
            </div>
            <div className="col-span-5 place-self-center mt-5 lg:mt-0">
                <div className="w-[280px] h-[280px] sm:w-[290px] sm:h-[290px] lg:w-[325px] lg:h-[325px] xl:w-[330px] xl:h-[330px] rounded-full overflow-hidden mx-auto">
                    <img src="/images/profile_pic.jpg" alt="Profile picture" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
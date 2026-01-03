"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-8 sm:gap-x-6">
            <div className="col-span-7 place-self-center text-center sm:text-left">
                <motion.h1 initial={{ opacity: 0 }} animate={{opacity: 1}} transition={{ duration: 1}} className="text-white mb-4 mt-4 lg:mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
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
                </motion.h1>
                <motion.p initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{duration: 1, delay: 0.75 }} className="text-neutral-400 text-base sm:text-lg mt-6 mb-6 sm-md:pr-4 lg:text-xl">I’m a third-year Computer Science student based in Canada with experience working on production software through internships at Morgan Stanley. I’m interested in building and shipping reliable systems with real-world impact, and I enjoy learning in public through speaking, mentoring, and building community.

</motion.p>

                <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} className="flex space-x-3 mt-6 justify-center sm:justify-start">
                    <a href="https://github.com/NishevithaV" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faGithub} className="text-white" style={{ width: '28px', height: '28px' }} />
                    </a>

                    <a href="mailto:nishevitha.v@gmail.com" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faEnvelope} className="text-white" style={{ width: '28px', height: '28px' }} />
                    </a>

                    <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener nonreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                        <FontAwesomeIcon icon={faLinkedin} className="text-white" style={{ width: '28px', height: '28px' }} />
                    </a>
                </motion.div>
            </div>
            <div className="col-span-5 place-self-center mt-5 lg:mt-0">
                <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay:0.3, ease: "easeOut" }} className="w-[280px] h-[280px] sm:w-[290px] sm:h-[290px] lg:w-[325px] lg:h-[325px] xl:w-[330px] xl:h-[330px] rounded-full overflow-hidden mx-auto">
                    <img src="/images/profile_pic.jpeg" alt="Profile picture" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </div>
    </section>
  )
}

export default Hero
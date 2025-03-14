"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const ContactSection = () => {
  return (
    
    <section className="flex flex-col items-center justify-center text-center mb-4 gap-6 mt-4 w-full max-w-4xl mx-auto md:flex-row md:justify-between md:text-right md:gap-12" id="contact">

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
            <h4 className="text-3xl font-bold text-white mb-2">Let's Connect</h4>
            <p className="text-neutral-400 text-base sm:text-lg mb-3 mt-2 md:mt-1">
                {" "}
                Have questions, ideas or opportunities? I'm excited to hear from you. Send me a message!
            </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="flex flex-row gap-5 mt-0 md:mt-0 md:gap-6 lg:gap-7">
              <a href="mailto:nishevitha.v@gmail.com" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faPaperPlane} className="text-white w-10 h-10 md:w-12 md:h-12" />
              </a>
              <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener nonreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faLinkedin} className="text-white w-10 h-10 md:w-12 md:h-12" />
              </a>
            </div>  
        </div>
    </section>
  )
}

export default ContactSection
"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const ContactSection = () => {
  return (
    <section className="grid md:grid-cols-2 my-12 md:my-12 gap-4" id="contact">
        <div>
          {/* Make the heading larger, make icons smaller */}
            <h4 className="text-2xl font-bold text-white my-2">Let's Connect</h4>
            <p className="text-neutral-400 text-base sm:text-lg mb-4 max-w-md">
                {" "}
                Have questions, ideas or opportunities? I'm excited to hear from you. Drop me a message!
            </p>
            <div className="socials flex flex-row gap-2">
              <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener nonreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faLinkedin} className="text-white" style={{ width: '28px', height: '28px' }} />
              </a>

              <a href="https://github.com/NishevithaV" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faGithub} className="text-white" style={{ width: '28px', height: '28px' }} />
              </a>

              <a href="mailto:nishevitha.v@gmail.com" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faEnvelope} className="text-white" style={{ width: '28px', height: '28px' }} />
              </a>
            </div>
        </div>
        <div>
          <form className="flex flex-col gap-4">
            <label htmlFor="email" className="text-white">Your Email</label>
            <input type="email" id="email" required placeholder="example@gmail.com"/>
          </form>
        </div>
    </section>
  )
}

export default ContactSection
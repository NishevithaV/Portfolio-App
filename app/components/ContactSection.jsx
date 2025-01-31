import React from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const ContactSection = () => {
  return (
    <section className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4" id="contact">
        <div className="text-xl font-boldtext-white my-2">
            <h5>Let's Connect</h5>
            <p className="text-[#ADB7BE] mb-4 max-w-md">
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
    </section>
  )
}

export default ContactSection
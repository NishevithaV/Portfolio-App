"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const ContactSection = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";
  }

  return (
    <section className="grid md:grid-cols-2 my-6 md:my-12 gap-4 sm:gap-y-12" id="contact">
        <div>
          {/* Make the heading larger, make icons smaller */}
            <h4 className="text-2xl font-bold text-white my-2">Let's Connect</h4>
            <p className="text-neutral-400 text-base sm:text-lg mb-4 max-w-md">
                {" "}
                Have questions, ideas or opportunities? I'm excited to hear from you. Drop me a message!
            </p>
            <div className="socials flex flex-row gap-2">
              <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener nonreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faLinkedin} className="text-white" style={{ width: '24px', height: '24px' }} />
              </a>

              <a href="https://github.com/NishevithaV" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faGithub} className="text-white" style={{ width: '24px', height: '24px' }} />
              </a>

              <a href="mailto:nishevitha.v@gmail.com" className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:scale-110 transition-transform duration-200">
                <FontAwesomeIcon icon={faEnvelope} className="text-white" style={{ width: '24px', height: '24px' }} />
              </a>
            </div>
        </div>
        <div>
          <form className="flex flex-col gap-4">
            <label htmlFor="email" className="text-white block text-sm">Your Email</label>
            <input type="email" id="email" className="bg-gray-100 border border-[#33353F] placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5" required placeholder="example@gmail.com"/>

            <label htmlFor="subject" className="text-white block text-sm">Subject</label>
            <input type="email" id="subject" className="bg-gray-100 border border-[#33353F] placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5" required placeholder="Message title"/>

            <label htmlFor="message" className="text-white block text-sm">Your Message</label>
            <textarea id="message" name="message" className="bg-gray-100 border border-[#33353F] placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5" placeholder="Let's talk about..." />

            <button type="submit" className="bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:from-fuchsia-400 hover:to-teal-400 text-black font-medium py-2.5 px-5 rounded-lg w-full font-sans tracking-wide">
              Submit
            </button>
          </form>
        </div>
    </section>
  )
}

export default ContactSection
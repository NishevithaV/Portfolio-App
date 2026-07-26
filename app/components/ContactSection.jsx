"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const ContactSection = () => {
  return (

    <section className="flex flex-col items-center justify-center text-center mb-4 gap-6 mt-4 w-full max-w-4xl mx-auto md:flex-row md:justify-between md:text-right md:gap-12" id="contact">

        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center md:items-end"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
            <p className="font-mono text-term-accent-2 text-sm mb-2">
              <span className="text-term-muted">$</span> contact --send
            </p>
            <h4 className="text-3xl font-bold text-term-text mb-2">Let&apos;s Connect</h4>
            <p className="text-term-muted text-base sm:text-lg mb-3 mt-2 md:mt-1">
                {" "}
                Have questions, ideas or opportunities? I&apos;m excited to hear from you. Send me a message!
            </p>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-start"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex flex-row gap-5 mt-0 md:mt-0 md:gap-6 lg:gap-7">
              <a href="mailto:nishevitha.v@gmail.com" aria-label="Email" className="p-3 rounded-md border border-term-line text-term-muted hover:text-term-accent hover:border-term-accent transition-colors duration-200 glow-border-hover">
                <FontAwesomeIcon icon={faPaperPlane} className="w-8 h-8 md:w-10 md:h-10" />
              </a>
              <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener nonreferrer" aria-label="LinkedIn" className="p-3 rounded-md border border-term-line text-term-muted hover:text-term-accent hover:border-term-accent transition-colors duration-200 glow-border-hover">
                <FontAwesomeIcon icon={faLinkedin} className="w-8 h-8 md:w-10 md:h-10" />
              </a>
            </div>
        </motion.div>
    </section>
  )
}

export default ContactSection
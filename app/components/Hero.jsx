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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-7 place-self-center w-full rounded-lg border border-term-line bg-term-surface glow-border overflow-hidden"
            >
                {/* terminal chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-term-line bg-term-surface-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-3 font-mono text-xs text-term-muted">whoami.sh</span>
                </div>

                <div className="p-5 sm:p-8 font-mono">
                    <p className="text-term-accent-2 text-sm sm:text-base">
                        <span className="text-term-muted">$</span> whoami
                    </p>

                    <h1 className="text-term-text mt-2 mb-1 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        <TypeAnimation
                            sequence={[
                                "Nishevitha Venkatesh",
                                1500,
                                "A Software Engineer",
                                1500,
                                "A Builder",
                                1500
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-glow text-term-accent"
                        />
                        <span className="cursor-blink text-term-accent">_</span>
                    </h1>

                    <p className="text-term-accent-2 text-sm sm:text-base mt-6">
                        <span className="text-term-muted">$</span> cat about.md
                    </p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="text-term-muted text-sm sm:text-base leading-relaxed mt-2 max-w-xl font-sans"
                    >
                        I&rsquo;m a Computer Science student who loves building software and turning ideas into products.
                    </motion.p>

                    <p className="text-term-accent-2 text-sm sm:text-base mt-6 mb-3">
                        <span className="text-term-muted">$</span> open --socials
                    </p>

                    <div className="flex space-x-3">
                        <a href="https://github.com/NishevithaV" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 rounded-md border border-term-line text-term-muted hover:text-term-accent hover:border-term-accent transition-colors duration-200">
                            <FontAwesomeIcon icon={faGithub} style={{ width: '20px', height: '20px' }} />
                        </a>

                        <a href="mailto:nishevitha.v@gmail.com" aria-label="Email" className="p-2.5 rounded-md border border-term-line text-term-muted hover:text-term-accent hover:border-term-accent transition-colors duration-200">
                            <FontAwesomeIcon icon={faEnvelope} style={{ width: '20px', height: '20px' }} />
                        </a>

                        <a href="https://www.linkedin.com/in/nishevitha-venkatesh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-md border border-term-line text-term-muted hover:text-term-accent hover:border-term-accent transition-colors duration-200">
                            <FontAwesomeIcon icon={faLinkedin} style={{ width: '20px', height: '20px' }} />
                        </a>
                    </div>
                </div>
            </motion.div>

            <div className="col-span-5 place-self-center mt-5 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="relative w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] lg:w-[300px] lg:h-[300px] mx-auto"
                >
                    {/* pulsing glow ring */}
                    <span className="absolute -inset-3 rounded-full bg-term-accent/10 blur-2xl animate-pulse" />

                    {/* corner brackets */}
                    <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-term-accent rounded-tl-md" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-term-accent rounded-tr-md" />
                    <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-term-accent rounded-bl-md" />
                    <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-term-accent rounded-br-md" />

                    <div className="relative w-full h-full rounded-full overflow-hidden border border-term-line">
                        <img src="/images/profile_pic.jpeg" alt="Profile picture" className="w-full h-full object-cover" />
                    </div>

                    <span className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-term-bg/90 border border-term-line rounded-full px-2.5 py-1 font-mono text-[11px] text-term-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-term-accent animate-pulse" />
                        online
                    </span>
                </motion.div>
            </div>
        </div>
    </section>
  )
}

export default Hero

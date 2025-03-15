"use client";
import React from 'react';
import { WORKEXPERIENCE } from '../constants';
import { motion } from 'framer-motion';

const WorkSection = () => {
  return (
    <section id="work" className="border-b border-neutral-900 pb-4 mt-12 sm:mt-20 md:mt-28">
  
        <motion.h1
          viewport={{ once: true }} 
          whileInView={{ opacity: 1, y: 0 }} 
          initial={{ opacity: 0, y: 100 }} 
          transition={{duration: 1}} 
          className="text-center text-2xl sm:text-3xl mb-16"
          style={{ willChange: "transform", overflowX: "hidden" }}
        >
            Work Experience
        </motion.h1>
        
        <div>
          {WORKEXPERIENCE.map((experience, index) => (
            <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
              <motion.div 
                whileInView={{opacity: 1, x: 0 }}
                initial={{opacity: 0, x: -100}}
                transition={{duration: 1}}
                viewport={{ once: true }}
                className="w-full lg:w-1/4">
                <p className="mb-2 text-sm text-neutral-400">{experience.year}</p>
              </motion.div>
              <motion.div 
                whileInView={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: 100}}
                transition={{duraton: 1}}
                viewport={{ once: true }}
                className="w-full max-w-xl lg:w-3/4"
              >
                <h6 className="mb-2 font-semibold">
                  {experience.role} - <span className="text-sm text-purple-100">
                    {experience.company}
                  </span>
                </h6>
                <p className="mb-4 text-neutral-400">{experience.description}</p>
                {experience.skills.map((skill, index) => (
                  <span key={index} className="mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-fuchsia-400">{skill}</span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default WorkSection
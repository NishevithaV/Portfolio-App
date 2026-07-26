"use client";
import React, { useRef } from 'react';
import { WORKEXPERIENCE } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

const SKILL_COLORS = [
  { text: "text-term-accent", border: "border-term-accent/30", bg: "bg-term-accent/10" },
  { text: "text-sky-300", border: "border-sky-300/30", bg: "bg-sky-300/10" },
  { text: "text-term-accent-2", border: "border-term-accent-2/30", bg: "bg-term-accent-2/10" },
  { text: "text-fuchsia-300", border: "border-fuchsia-300/30", bg: "bg-fuchsia-300/10" },
  { text: "text-indigo-300", border: "border-indigo-300/30", bg: "bg-indigo-300/10" },
];

const TimelineNode = ({ scrollYProgress, threshold }) => {
  const lit = useTransform(scrollYProgress, [Math.max(threshold - 0.12, 0), threshold], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.8, 1.2]);
  const boxShadow = useTransform(lit, (v) => `0 0 ${6 + v * 14}px rgba(57,255,136,${v * 0.7})`);
  const backgroundColor = useTransform(lit, [0, 1], ["#161d19", "#39ff88"]);
  const borderColor = useTransform(lit, [0, 1], ["#2a352e", "#39ff88"]);

  return (
    <motion.span
      style={{ scale, boxShadow, backgroundColor, borderColor }}
      className="block w-3.5 h-3.5 rounded-full border-2"
    />
  );
};

const WorkSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const total = WORKEXPERIENCE.length;

  return (
    <section id="work" className="border-b border-term-line pb-4 mt-12 sm:mt-20 md:mt-28">

      <motion.p
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="text-center font-mono text-term-accent-2 text-sm mb-2"
      >
        <span className="text-term-muted">$</span> cat work_experience.log
      </motion.p>
      <motion.h1
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center text-2xl sm:text-3xl mb-16 text-term-text font-semibold"
        style={{ willChange: "transform", overflowX: "hidden" }}
      >
          Work Experience
      </motion.h1>

      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        {/* track */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-term-line" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-2 top-2 bottom-2 w-px bg-term-accent origin-top"
        />

        {WORKEXPERIENCE.map((experience, index) => {
          const threshold = total === 1 ? 1 : index / (total - 1);
          return (
            <div key={index} className="relative flex gap-5 sm:gap-8 pb-12 last:pb-0">
              <div className="relative z-10 w-4 flex-shrink-0 flex justify-center pt-1.5">
                <TimelineNode scrollYProgress={scrollYProgress} threshold={threshold} />
              </div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-80px" }}
                className="flex-1 min-w-0"
              >
                <p className="font-mono text-xs sm:text-sm text-term-accent-2 mb-1">[{experience.year}]</p>
                <h6 className="mb-2 font-semibold text-term-text">
                  {experience.role} <span className="text-term-muted">@</span>{" "}
                  <span className="text-term-accent">{experience.company}</span>
                </h6>
                <ul className="mb-4 text-term-muted list-disc pl-4 space-y-1">
                  {experience.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {experience.skills.map((skill, i) => {
                    const c = SKILL_COLORS[i % SKILL_COLORS.length];
                    return (
                      <span
                        key={i}
                        className={`rounded border ${c.border} ${c.bg} px-2 py-1 font-mono text-xs font-medium ${c.text}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default WorkSection

"use client"
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const WORDS = ["BUILDER", "SOFTWARE ENGINEER", "PROBLEM SOLVER"]

const RoleRotator = () => {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const springX = useSpring(mx, { stiffness: 120, damping: 20 })
  const springY = useSpring(my, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(springY, [0, 1], [10, -10])
  const rotateY = useTransform(springX, [0, 1], [-14, 14])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
      className="py-2"
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <AnimatePresence mode="wait">
          <motion.h2
            key={WORDS[index]}
            initial={{ rotateX: -100, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 100, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 50%" }}
            className="font-display uppercase text-ink font-extrabold leading-[0.9] tracking-tight text-[1.8rem] sm:text-[2.3rem] lg:text-[2.8rem]"
          >
            {WORDS[index]}
          </motion.h2>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default RoleRotator

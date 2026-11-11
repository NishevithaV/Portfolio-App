"use client"
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const WORDS = ["BUILDER", "SOFTWARE ENGINEER"]

// The box is sized to the longest word and the animating word is absolutely
// positioned inside it. With `mode="wait"` there is a beat where no word is
// mounted at all; without this reservation the heading collapsed to zero on
// every swap, which shifted the copy and visibly nudged the portrait beside it.
const LONGEST = WORDS.reduce((a, b) => (b.length > a.length ? b : a))

const TYPE = 'font-display uppercase font-extrabold leading-[0.95] tracking-tight text-[clamp(2rem,4.6vw,3.6rem)]'

const RoleRotator = () => {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const springX = useSpring(mx, { stiffness: 120, damping: 20 })
  const springY = useSpring(my, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-10, 10])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length)
    }, 2600)
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
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        {/* Invisible sizer: reserves the exact space the longest word needs. */}
        <span aria-hidden="true" className={`${TYPE} invisible block`}>
          {LONGEST}
        </span>

        <AnimatePresence mode="wait">
          <motion.p
            key={WORDS[index]}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ transformOrigin: '50% 50%' }}
            className={`${TYPE} absolute inset-0 text-ink`}
          >
            {WORDS[index]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default RoleRotator

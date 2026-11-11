"use client"
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const TiltCard = ({ children, className = "", rotateRange = 6, lift = false }) => {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springX = useSpring(x, { stiffness: 150, damping: 18 })
  const springY = useSpring(y, { stiffness: 150, damping: 18 })

  const rotateX = useTransform(springY, [0, 1], [rotateRange, -rotateRange])
  const rotateY = useTransform(springX, [0, 1], [-rotateRange, rotateRange])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseEnter = () => setHovered(true)

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={lift ? { scale: hovered ? 1.03 : 1, z: hovered ? 40 : 0 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`h-full ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default TiltCard

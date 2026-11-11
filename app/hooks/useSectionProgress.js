"use client"
import { useRef } from 'react'
import { useScroll } from 'framer-motion'

/**
 * One consistent 0 -> 1 scroll value per section, so every scroll-linked 3D
 * scene on the page is driven the same way.
 *
 * Returns `[ref, progress]`: attach `ref` to the section element and read
 * `progress` (a MotionValue) inside a `useFrame` or a `useTransform`.
 *
 * The default offset runs from "this section's top reaches the bottom of the
 * viewport" to "its bottom reaches the top", i.e. the whole time any part of it
 * is on screen. Pass `['start start', 'end start']` for a hero that should only
 * animate while it is being scrolled past.
 */
const useSectionProgress = (offset = ['start end', 'end start']) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return [ref, scrollYProgress]
}

export default useSectionProgress

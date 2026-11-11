"use client"
import React from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useReducedMotion } from 'framer-motion'

/**
 * Smooth scrolling via Lenis.
 *
 * Deliberately a light touch: the page is never pinned, hijacked or
 * direction-locked, so anchor links, keyboard paging and the scrollbar all keep
 * behaving normally. With `root`, ReactLenis renders no DOM of its own (just a
 * context provider), which is why skipping it for reduced motion cannot cause a
 * hydration mismatch.
 */
const SmoothScroll = ({ children }) => {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  )
}

/**
 * Stops Lenis while the intro is on screen, so its rAF loop is not fighting the
 * `overflow: hidden` the loader puts on <body>. Must live inside <SmoothScroll>.
 */
export const ScrollGate = ({ locked }) => {
  const lenis = useLenis()

  React.useEffect(() => {
    if (!lenis) return
    if (locked) {
      lenis.stop()
      lenis.scrollTo(0, { immediate: true })
    } else {
      lenis.start()
    }
  }, [lenis, locked])

  return null
}

export default SmoothScroll

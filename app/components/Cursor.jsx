"use client"
import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor: a hard dot that tracks the pointer exactly, plus a ring that
 * trails it on a spring.
 *
 * Both are white and composited with `mix-blend-mode: difference`, so they
 * invert themselves against whatever is underneath - black over the white page,
 * white over the inverted hero - with no per-section logic.
 *
 * Elements opt into a state by declaring `data-cursor="link|view|drag"` and
 * optionally `data-cursor-label="..."`.
 *
 * The native cursor is only hidden once this component has actually mounted and
 * only for fine pointers, so touch users, keyboard users and anyone hitting a
 * JS error always keep a real pointer. See the `html[data-custom-cursor]` rule
 * in globals.css.
 */

const VARIANTS = {
  default: { size: 32, border: 1, fill: 0 },
  link: { size: 58, border: 1, fill: 0.14 },
  view: { size: 84, border: 1, fill: 0.1 },
  drag: { size: 72, border: 1, fill: 0.1 },
}

const Cursor = () => {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.45 })
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.45 })

  // Only take over the pointer on devices where that makes sense.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => setEnabled(fine.matches && !still.matches)
    sync()
    fine.addEventListener('change', sync)
    still.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      still.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.dataset.customCursor = 'true'
    return () => {
      delete root.dataset.customCursor
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e) => {
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      if (target) {
        setVariant(target.dataset.cursor in VARIANTS ? target.dataset.cursor : 'link')
        setLabel(target.dataset.cursorLabel || '')
        return
      }
      // Anything clickable gets the link treatment without needing the attribute.
      const interactive =
        e.target instanceof Element
          ? e.target.closest('a, button, [role="button"], input, textarea, select, summary')
          : null
      setVariant(interactive ? 'link' : 'default')
      setLabel('')
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
    }
  }, [enabled, visible, x, y])

  if (!enabled) return null

  const v = VARIANTS[variant] ?? VARIANTS.default

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] hidden md:block"
      style={{ mixBlendMode: 'difference' }}
    >
      {/* trailing ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: v.size,
          height: v.size,
          marginLeft: -v.size / 2,
          marginTop: -v.size / 2,
          backgroundColor: `rgba(255,255,255,${v.fill})`,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.5 }}
      >
        {label ? (
          <span className="flex h-full w-full items-center justify-center font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white">
            {label}
          </span>
        ) : null}
      </motion.div>

      {/* exact dot */}
      <motion.div
        className="absolute left-0 top-0 h-[5px] w-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full bg-white"
        style={{ x, y }}
        animate={{ opacity: visible && variant === 'default' ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </div>
  )
}

export default Cursor

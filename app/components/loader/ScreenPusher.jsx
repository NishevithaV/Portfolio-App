"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import Figure from './Figure'
import FitCamera from './FitCamera'

/**
 * The intro: a low-poly figure braces against the white loading panel and
 * shoves the whole screen up out of view, revealing the site beneath.
 *
 * One linear `progress` motion value (0 -> 1) drives both the DOM panel and the
 * 3D pose, so they can never drift apart. The timeline runs in two legs:
 *
 *   leg 1  0    -> 0.45   wind-up; the figure crouches and braces
 *   (hold at 0.45 until the document's fonts are ready, capped)
 *   leg 2  0.45 -> 1      the shove, and the panel leaves the viewport
 *
 * Holding between the legs is what makes this an honest loader rather than a
 * fixed-length animation: if the page is slow, the figure strains for longer.
 */

const WIND_UP_MS = 1000
const SHOVE_MS = 1200
const READY_CAP_MS = 2500 // never strain for longer than this waiting on fonts
const SKIP_MS = 450

const PANEL_EASE = cubicBezier(0.7, 0, 0.3, 1)

const ScreenPusher = ({ onDone, reduced = false }) => {
  const progress = useMotionValue(0)
  const [pct, setPct] = useState(0)
  const skippedRef = useRef(false)
  const rig = useRef(null)

  // Panel (and therefore the whole overlay) leaves in the back half of leg 2.
  const y = useTransform(progress, [0.52, 1], ['0vh', '-118vh'], { ease: PANEL_EASE })
  // A faint compression as the figure loads up, released by the shove.
  const panelScale = useTransform(progress, [0, 0.45, 0.66], [1, 0.986, 1])
  const counter = useTransform(progress, [0, 0.5], [0, 100], { clamp: true })
  const barScale = useTransform(progress, [0, 0.5], [0, 1], { clamp: true })

  useMotionValueEvent(counter, 'change', (v) => setPct(Math.round(v)))

  // ---- reduced motion: no animation, just hand control straight over -------
  useEffect(() => {
    if (!reduced) return
    const id = setTimeout(onDone, 200)
    return () => clearTimeout(id)
  }, [reduced, onDone])

  // ---- the timeline --------------------------------------------------------
  useEffect(() => {
    if (reduced) return

    let cancelled = false
    let current = null

    const ready = Promise.race([
      typeof document !== 'undefined' && document.fonts
        ? document.fonts.ready
        : Promise.resolve(),
      new Promise((r) => setTimeout(r, READY_CAP_MS)),
    ])

    const run = async () => {
      current = animate(progress, 0.45, { duration: WIND_UP_MS / 1000, ease: 'linear' })
      await current.finished.catch(() => {})
      if (cancelled || skippedRef.current) return

      await ready
      if (cancelled || skippedRef.current) return

      current = animate(progress, 1, { duration: SHOVE_MS / 1000, ease: 'linear' })
      await current.finished.catch(() => {})
      if (cancelled) return
      onDone()
    }

    run()

    // ---- skip: click, Escape, or any key -----------------------------------
    const skip = () => {
      if (skippedRef.current || cancelled) return
      skippedRef.current = true
      current?.stop()
      const remaining = 1 - progress.get()
      animate(progress, 1, {
        duration: (SKIP_MS / 1000) * Math.max(remaining, 0.35),
        ease: 'easeInOut',
        onComplete: () => {
          if (!cancelled) onDone()
        },
      })
    }

    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)

    return () => {
      cancelled = true
      current?.stop()
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [progress, onDone, reduced])

  // ---- lock the page underneath while the intro plays ----------------------
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // This overlay is opaque and covers the viewport, so the pre-paint CSS
    // cover from layout.js has done its job and must step aside - otherwise it
    // would still be there after the panel slides away.
    document.documentElement.dataset.intro = 'playing'

    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  if (reduced) {
    return (
      <motion.div
        className="fixed inset-0 z-[100] bg-bg"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    )
  }

  return (
    <motion.div
      style={{ y }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a] will-change-transform"
      role="status"
      aria-label="Loading"
    >
      {/* ---- the screen being pushed ---- */}
      <motion.div
        style={{ scaleY: panelScale, originY: 0 }}
        className="relative flex-1 overflow-hidden bg-white"
      >
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-6 pb-6 sm:px-10 sm:pb-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#6e6e6e]">
              Nishevitha Venkatesh
            </p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#b2b2b2]">
              Portfolio &mdash; Rev. 2026
            </p>
          </div>
          <p
            className="font-display text-5xl font-extrabold leading-none tracking-tight text-[#111] tabular-nums sm:text-7xl"
            aria-hidden="true"
          >
            {String(pct).padStart(3, '0')}
          </p>
        </div>

        {/* loading rule */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-[rgba(17,17,17,0.14)]">
          <motion.div
            style={{ scaleX: barScale, originX: 0 }}
            className="h-px w-full bg-[#111]"
          />
        </div>
      </motion.div>

      {/* ---- the figure doing the pushing ---- */}
      <div className="relative h-[clamp(190px,34vh,330px)] shrink-0">
        {/* The canvas stops short of the hint line so the figure's feet are
            never overlapped by it; FitCamera re-fits to whatever height it gets. */}
        <div className="absolute inset-x-0 bottom-8 top-0">
        <Canvas
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 1, 5], fov: 32 }}
          style={{ pointerEvents: 'none' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[2.6, 4.2, 3.2]} intensity={2.3} />
          <directionalLight position={[-3.2, 1.2, 2]} intensity={0.45} />
          <Figure progress={progress} rigRef={rig} />
          <FitCamera target={rig} />
        </Canvas>
        </div>

        <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#5a5a5a]">
          Click anywhere to skip
        </p>
      </div>
    </motion.div>
  )
}

export default ScreenPusher

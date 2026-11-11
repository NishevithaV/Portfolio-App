"use client"
import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'
import SmoothScroll, { ScrollGate } from './SmoothScroll'
import Cursor from './Cursor'
import ColourOnScroll from './ColourOnScroll'

const ScreenPusher = dynamic(() => import('./loader/ScreenPusher'), { ssr: false })

const SESSION_KEY = 'nv.intro.played'

/**
 * Client shell: smooth scroll, the custom cursor, and the intro.
 *
 * The intro only plays once per browser session. A blocking inline script in
 * `layout.js` records that decision on <html data-intro> before first paint, and
 * a CSS cover keyed off `data-intro="pending"` holds the screen until this
 * component's overlay mounts - otherwise the black hero would flash white.
 * ScreenPusher flips the attribute to "playing" on mount to retire that cover.
 */
const SiteChrome = ({ children }) => {
  // null = not yet decided on the client; nothing intro-related renders during SSR.
  const [intro, setIntro] = useState(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    let played = false
    try {
      played = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      /* private mode / blocked storage: just play it */
    }
    if (played) {
      document.documentElement.dataset.intro = 'done'
      setIntro(false)
    } else {
      setIntro(true)
    }
  }, [])

  const handleDone = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.intro = 'done'
    setIntro(false)
  }, [])

  return (
    <SmoothScroll>
      <ScrollGate locked={intro === true} />
      {children}
      <Cursor />
      <ColourOnScroll active={intro === false} />
      {intro === true && <ScreenPusher onDone={handleDone} reduced={!!reduced} />}
    </SmoothScroll>
  )
}

export default SiteChrome

"use client"
import { useEffect } from 'react'

/**
 * Drives the site's colour reveal from scroll position.
 *
 * Colour was previously only reachable by hovering, which meant a visitor
 * reading down the page never saw it happen. A single IntersectionObserver now
 * adds `is-live` to anything marked `.reveal-colour` (images, icons) or
 * `.reveal-accent` (text) as it comes into view, so the page warms up as you
 * read it. Hover still works, and still goes a step further.
 *
 * One observer for the whole document rather than a hook per card, plus a
 * MutationObserver so lazily revealed content - "View all 8" projects - is
 * picked up too.
 *
 * `active` holds it back until the intro has finished. Without that gate every
 * element above the fold would warm up while the overlay still covers them, so
 * the visitor would never actually see the colour arrive.
 */
const SELECTOR = '.reveal-colour:not(.is-live), .reveal-accent:not(.is-live)'

const ColourOnScroll = ({ active = true }) => {
  useEffect(() => {
    if (!active) return

    const stillness = window.matchMedia('(prefers-reduced-motion: reduce)')

    // With reduced motion the CSS drops the greyscale filter entirely, so
    // everything is already in colour and there is nothing to stage.
    if (stillness.matches) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('is-live'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-live')
          io.unobserve(entry.target)
        }
      },
      // Trigger a little before centre, so the change is visible rather than
      // happening at the very edge of the screen where nobody is looking.
      { rootMargin: '0px 0px -15% 0px', threshold: 0.2 },
    )

    const tracked = new WeakSet()
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (tracked.has(el)) return
        tracked.add(el)
        io.observe(el)
      })
    }

    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [active])

  return null
}

export default ColourOnScroll

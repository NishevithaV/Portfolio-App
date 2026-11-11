"use client"
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import NavList from './NavList'

/**
 * Full-screen mobile menu.
 *
 * Previously this trapped neither focus nor Escape; both are handled here, and
 * focus is returned to whatever opened it on close.
 */
const MenuOverlay = ({ links, closeMenu }) => {
  const panel = useRef(null)
  const opener = useRef(null)

  useEffect(() => {
    opener.current = document.activeElement

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return

      const focusable = panel.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Move focus into the dialog so the trap has something to hold.
    panel.current?.querySelector('a, button')?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (opener.current instanceof HTMLElement) opener.current.focus()
    }
  }, [closeMenu])

  return (
    <motion.div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="invert-section fixed inset-0 z-50 flex flex-col overflow-y-auto"
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-6">
        <span className="fig-label">Menu</span>
        <button
          onClick={closeMenu}
          className="border border-line px-3 py-2 text-ink transition-colors hover:border-ink"
          aria-label="Close menu"
        >
          <span className="fig-label" style={{ color: 'inherit' }}>
            Close
          </span>
        </button>
      </div>

      <ul className="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
        {links.map((link, i) => (
          <motion.li
            key={link.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
            className="border-b border-line py-3"
          >
            <NavList href={link.path} title={link.title} onClick={closeMenu} isOverlay />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default MenuOverlay

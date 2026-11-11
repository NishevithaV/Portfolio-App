"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import NavList from './NavList'
import MenuOverlay from './MenuOverlay'

const navElements = [
  { title: 'work', path: '/#work' },
  { title: 'projects', path: '/#projects' },
  { title: 'talks', path: '/talks' },
  { title: 'articles', path: '/articles' },
  { title: 'contact', path: '/#contact' },
]

/**
 * Fixed nav that flips to the inverted palette while it sits over the hero.
 *
 * Rather than blend-moding the bar (which looks unpredictable over imagery),
 * an IntersectionObserver watches the hero and the nav adopts `.invert-section`
 * tokens while it overlaps it - so the bar is always deliberately readable.
 */
const Navbar = () => {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 36, mass: 0.3 })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setNavigationOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) {
      setOverHero(false)
      return
    }
    // Fire as the hero's bottom edge passes under the bar's height.
    const io = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          overHero
            ? 'invert-section !bg-transparent'
            : 'surface-translucent border-b border-line backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6 sm:px-12">
          <Link
            href="/"
            data-cursor="link"
            className="shrink-0 font-display text-xl uppercase tracking-tight text-ink"
          >
            Nishevitha V.
          </Link>

          <button
            className="flex items-center border border-line px-3 py-2 text-ink transition-colors hover:border-ink md:hidden"
            onClick={() => setNavigationOpen(true)}
            aria-label="Open menu"
            aria-expanded={navigationOpen}
          >
            <span className="fig-label !text-[0.6rem]" style={{ color: 'inherit' }}>
              Menu
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navElements.map((element) => (
              <li key={element.title}>
                <NavList href={element.path} title={element.title} />
              </li>
            ))}
          </ul>
        </div>

        {/* reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress, originX: 0 }}
          className="h-px w-full bg-ink"
        />
      </nav>

      {navigationOpen && (
        <MenuOverlay links={navElements} closeMenu={() => setNavigationOpen(false)} />
      )}
    </>
  )
}

export default Navbar

"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavList from "./NavList"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverlay from './MenuOverlay'

const navElements = [
    { title: "work", path: "/#work" },
    { title: "projects", path: "/#projects" },
    { title: "talks", path: "/talks" },
    { title: "articles", path: "/articles" },
    { title: "contact", path: "/#contact" },
]

const Navbar = () => {
    const [navigationOpen, setNavigationOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setNavigationOpen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-20 bg-term-bg/90 backdrop-blur-sm border-b border-term-line">
                <div className="flex items-center justify-between px-4 sm:px-6 h-16">
                    <Link href={"/"} className="font-mono text-lg lg:text-xl text-term-text tracking-tight shrink-0">
                        <span className="text-term-accent">nishevitha</span>
                        <span className="text-term-muted">@</span>
                        <span className="text-term-accent-2">dev</span>
                        <span className="text-term-muted">:~$</span>
                        <span className="cursor-blink text-term-accent">_</span>
                    </Link>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex items-center px-3 py-2 border rounded border-term-line text-term-text hover:text-term-accent hover:border-term-accent transition-colors"
                        onClick={() => setNavigationOpen(!navigationOpen)}
                        aria-label="Toggle menu"
                    >
                        {navigationOpen
                            ? <XMarkIcon className="h-5 w-5" />
                            : <Bars3Icon className="h-5 w-5" />
                        }
                    </button>

                    {/* Desktop nav pill */}
                    <div className="hidden md:flex items-center bg-term-surface border border-term-line rounded-full px-2 py-1.5">
                        <ul className="flex items-center gap-1 font-mono">
                            {navElements.map((element, index) => (
                                <li key={index}>
                                    <NavList href={element.path} title={element.title} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Overlay rendered outside <nav> so it's not trapped in its stacking context */}
            {navigationOpen && (
                <MenuOverlay links={navElements} closeMenu={() => setNavigationOpen(false)} />
            )}
        </>
    )
}

export default Navbar

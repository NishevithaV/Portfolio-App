"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavList from "./NavList"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverlay from './MenuOverlay'

const navElements = [
    { title: "Work", path: "/#work" },
    { title: "Projects", path: "/#projects" },
    { title: "Talks", path: "/talks" },
    { title: "Articles", path: "/articles" },
    { title: "Contact", path: "/#contact" },
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
            <nav className="fixed top-0 left-0 right-0 z-20 bg-[#121212] border-b border-neutral-800/60">
                <div className="flex items-center justify-between px-4 sm:px-6 h-16">
                    <Link href={"/"} className="text-3xl lg:text-4xl text-white font-semibold tracking-tight shrink-0">
                        NV
                    </Link>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
                        onClick={() => setNavigationOpen(!navigationOpen)}
                        aria-label="Toggle menu"
                    >
                        {navigationOpen
                            ? <XMarkIcon className="h-5 w-5" />
                            : <Bars3Icon className="h-5 w-5" />
                        }
                    </button>

                    {/* Desktop nav — pill */}
                    <div className="hidden md:flex items-center bg-[#1c1c1c] border border-neutral-700/60 rounded-full px-2 py-1.5">
                        <ul className="flex items-center gap-1">
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

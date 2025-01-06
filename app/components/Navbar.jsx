"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavList from "./NavList"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverlay from './MenuOverlay'

const navElements = [
    {
        title: "Home", 
        path: "/",
    },
    {
        title: "Work", 
        path: "#work",
    },
    {
        title: "Projects", 
        path: "#projects",
    },
    {
        title: "Contact", 
        path: "#contact",
    }
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

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])
    

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
            <div className="flex flex-wrap items-center justify-between mx-auto px-5 pt-5">
                <Link href={"/"} className="text-4xl lg:text-5xl text-white font-semibold">NV</Link>
                <div className="mobile-menu block md:hidden">
                    {
                        navigationOpen ? (
                            <button onClick={() => setNavigationOpen(false)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        ) : (
                            <button onClick={() => setNavigationOpen(true)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-whit hover:border-white">
                                <Bars3Icon className="h-5 w-5" />
                            </button>
                        )

                    }
                </div>
                <div className="menu hidden md:block
                md:w-auto" id="navbar">
                    <ul className="flex p-4 md:p-0 md:pr-5 md:flex-row md:space-x-8 mt-0">
                        {navElements.map((element, index) => (
                            <li key={index}>
                                <NavList href={element.path} title={element.title} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {navigationOpen ? <MenuOverlay links={navElements} closeMenu={() => setNavigationOpen(false)} /> : null}
        </nav>
    )
}

export default Navbar
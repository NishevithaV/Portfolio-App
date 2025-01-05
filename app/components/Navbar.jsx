import Link from 'next/link'
import React from 'react'
import NavList from "./NavList"

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
  return (
    <nav>
        <div className="flex flex-wrap items-center justify-between mx-auto p-8">
            <Link href={"/"} className="text-5xl text-white font-semibold">NV</Link>
            <div className="menu hidden md:block md:w-auto" id="navbar">
                <ul>
                    {navElements.map((element, index) => (
                        <li key={index}>
                            <NavList href={element.path} title={element.title} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
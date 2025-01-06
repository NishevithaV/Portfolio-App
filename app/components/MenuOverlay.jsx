import React from 'react'
import NavList from './NavList'
import { XMarkIcon } from "@heroicons/react/24/solid"

const MenuOverlay = ({ links, closeMenu }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex bg-opacity-100 items-center justify-center">
      <button
        onClick={closeMenu}
        className="absolute top-4 right-4 px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
        aria-label="Close Menu"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      <ul className="flex flex-col items-center">
        {links.map((link, index) => (
          <li key={index} className="py-2">
            <NavList href={link.path} title={link.title} onClick={closeMenu} isOverlay />
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default MenuOverlay
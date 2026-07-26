import React from 'react'
import NavList from './NavList'
import { XMarkIcon } from "@heroicons/react/24/solid"

const MenuOverlay = ({ links, closeMenu }) => {
  return (
    <div className="fixed inset-0 z-50 bg-term-bg flex flex-col items-center justify-center overflow-y-auto">
      <button
        onClick={closeMenu}
        className="absolute top-[18px] right-6 px-3 py-2 border rounded border-term-line text-term-text hover:text-term-accent hover:border-term-accent transition-colors"
        aria-label="Close Menu"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      <ul className="flex flex-col items-center py-16 font-mono">
        {links.map((link, index) => (
          <li key={index} className="py-3">
            <NavList href={link.path} title={link.title} onClick={closeMenu} isOverlay />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuOverlay

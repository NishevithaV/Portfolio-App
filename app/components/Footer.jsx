import React from 'react'

const Footer = () => {
  const getYear = () => new Date().getFullYear();

  return (
    <footer className="footer border-t border-term-line text-term-text mt-12 font-mono">
        <div className="container p-8 flex justify-between items-center w-full">

          <p className="text-term-accent font-semibold text-xl text-left">
            NV<span className="cursor-blink text-term-accent">_</span>
          </p>

            <p className="text-xs text-right text-term-muted">
              <span className="text-term-accent-2">$</span> echo &quot;&copy; {getYear()} Nishevitha Venkatesh&quot; <br /> All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer
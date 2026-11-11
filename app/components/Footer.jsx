import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="invert-section w-full border-t border-line">
      <div className="container mx-auto flex w-full flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <p className="font-display text-xl font-bold uppercase tracking-tight text-ink">
          N.V.
        </p>

        <p className="fig-label sm:text-right">
          &copy; {year} Nishevitha Venkatesh &mdash; Built with Next.js &amp; three.js
        </p>
      </div>
    </footer>
  )
}

export default Footer

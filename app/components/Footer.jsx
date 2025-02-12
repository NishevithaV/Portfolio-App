import React from 'react'

const Footer = () => {
  const getYear = () => new Date().getFullYear();

  return (
    <footer className="footer border border-l-transparent border-r-transparent border-b-transparent border-t-transparent text-white">
        <div className="container p-12 pb-8 flex justify-between">
          <span><img src="/images/footer_logo.png" alt="logo footer" className="w-auto h-10 object-contain" /></span>
            <p className="text-xs">&copy; {getYear()} Nishevitha Venkatesh. <br /> All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
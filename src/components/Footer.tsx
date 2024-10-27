import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary p-4 mt-auto'>
      <div className='container mx-auto text-center text-background'>
        &copy; {new Date().getFullYear()} AG Genius. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/agLogoNav1.png'

const Navbar = () => {
  return (
    <div className='navbar bg-background text-text font-sans px-8 border-b border-primary'>
      <div className='navbar-start'>
        <Link href='/' className='normal-case text-xl'>
          <Image src={logo} alt='AG Genius Logo' width={400} height={100} />
        </Link>
      </div>
      <div className='navbar-end'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link
              href='/maps'
              className='text-primary text-xl hover:text-primary'>
              Maps
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/agLogoNav.png'

const Navbar = () => {
  return (
    <div className='navbar bg-background text-text font-serif px-8'>
      <div className='navbar-start'>
        <Link href='/' className='normal-case text-xl'>
          <Image src={logo} alt='AG Genius Logo' width={400} height={100} />
        </Link>
      </div>
      <div className='navbar-center'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link
              href='/maps'
              className='text-primary text-xl hover:text-primary'>
              Maps
            </Link>
          </li>
          <li>
            <Link
              href='/coop-data'
              className='text-primary text-xl hover:text-primary'>
              Coop Data
            </Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <ul className='menu menu-horizontal px-1 space-x-4'>
          <li>
            <Link
              href='/login'
              className='btn btn-md bg-primary text-background text-lg hover:bg-primary hover:text-text'>
              Login
            </Link>
          </li>
          <li>
            <Link
              href='/signup'
              className='btn btn-md bg-primary text-background text-lg hover:bg-primary hover:text-text'>
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

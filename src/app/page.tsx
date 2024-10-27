'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import largeLogo from '@/assets/agLogoHero.png'

const HomePage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <section className='relative bg-hero-pattern bg-cover bg-center h-screen flex items-center justify-center text-navbar-footer-text'>
        <div className='absolute inset-0 bg-black opacity-25'></div>
        <div className='relative z-10 flex flex-col items-center text-center px-4 max-w-4xl'>
          <Image
            src={largeLogo}
            alt='AG Genius Logo'
            width={300}
            height={300}
            className='mb-8'
          />
          <h1 className='text-4xl md:text-5xl font-bold text-background font-montserrat mb-4'>
            Welcome to AG Genius
          </h1>
          <p className='text-xl md:text-2xl text-background mb-8'>
            Your partner in agricultural innovation
          </p>
          <Link
            href='/signup'
            className='btn bg-primary text-background btn-lg text-xl'>
            Get Started
          </Link>
        </div>
      </section>

      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary font-montserrat mb-12 text-center'>
            Why Choose AG Genius?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Smart Mapping',
                description:
                  'Advanced GIS technology for precise field mapping',
              },
              {
                title: 'Data-Driven Insights',
                description:
                  'AI-powered analytics for informed decision-making',
              },
              {
                title: 'Cooperative Integration',
                description:
                  'Seamless data sharing with agricultural cooperatives',
              },
            ].map((feature, index) => (
              <div key={index} className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold text-primary mb-4'>
                  {feature.title}
                </h3>
                <p className='text-foreground'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

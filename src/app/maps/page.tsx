'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

const Maps = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-top p-8 mt-20'>
      <h1 className='text-4xl font-bold mb-8'>Hello World</h1>
      <div style={{ height: '400px', width: '100%' }}>
        <DynamicMap />
      </div>
    </div>
  )
}

export default Maps

'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

const Maps = () => {
  return (
    <div className='h-screen w-full'>
      <DynamicMap />
    </div>
  )
}

export default Maps

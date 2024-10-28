'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import FileInputDrawer from '../../components/FileInputDrawer'

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

const Maps = () => {
  const [geoJSONData, setGeoJSONData] =
    useState<GeoJSON.FeatureCollection | null>(null)

  return (
    <div className='relative h-screen w-full'>
      <DynamicMap geoJSONData={geoJSONData} />
      <div className='absolute top-4 right-4 z-[1000]'>
        <FileInputDrawer onGeoJSONUpload={setGeoJSONData} />
      </div>
    </div>
  )
}

export default Maps

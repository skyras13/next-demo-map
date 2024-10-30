'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import FileInputDrawer from '../../components/FileInputDrawer'
import PropertiesDrawer from '../../components/PropertiesDrawer'

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false,
})

const Maps = () => {
  const [geoJSONData, setGeoJSONData] =
    useState<GeoJSON.FeatureCollection | null>(null)
  const [selectedFeature, setSelectedFeature] =
    useState<GeoJSON.Feature | null>(null)
  const [isPropertiesDrawerOpen, setIsPropertiesDrawerOpen] = useState(false)

  return (
    <div className='relative h-screen w-full'>
      <DynamicMap
        geoJSONData={geoJSONData}
        selectedFeature={selectedFeature}
        onFeatureSelect={setSelectedFeature}
        onOpenPropertiesDrawer={() => setIsPropertiesDrawerOpen(true)}
      />
      <div className='absolute top-4 right-4 z-[2000]'>
        <FileInputDrawer onGeoJSONUpload={setGeoJSONData} />
      </div>
      <PropertiesDrawer
        feature={selectedFeature}
        isOpen={isPropertiesDrawerOpen}
        onClose={() => setIsPropertiesDrawerOpen(false)}
      />
    </div>
  )
}

export default Maps

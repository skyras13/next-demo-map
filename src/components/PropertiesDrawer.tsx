import React from 'react'

interface PropertiesDrawerProps {
  feature: GeoJSON.Feature | null
  isOpen: boolean
  onClose: () => void
}

const PropertiesDrawer = ({
  feature,
  isOpen,
  onClose,
}: PropertiesDrawerProps) => {
  if (!feature) return null

  const formatValue = (value: unknown): string => {
    if (typeof value === 'number') {
      return Number(value).toFixed(3)
    }
    return String(value)
  }

  const propertyEntries = Object.entries(feature.properties || {})
    .filter(([key]) => key !== 'COLOR' && key !== 'NAME')
    .sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className='drawer drawer-end z-[3000]'>
      <input
        id='properties-drawer'
        type='checkbox'
        className='drawer-toggle'
        checked={isOpen}
        onChange={onClose}
      />
      <div className='drawer-content'>
        {/* Empty drawer-content required for structure */}
      </div>
      <div className='drawer-side'>
        <label htmlFor='properties-drawer' className='drawer-overlay'></label>
        <div className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-3xl font-bold text-primary'>
              {feature.properties?.NAME ||
                feature.properties?.name ||
                'Details'}
            </h2>
            <button
              onClick={onClose}
              className='btn btn-sm btn-circle btn-ghost'>
              ✕
            </button>
          </div>
          <div className='space-y-4'>
            {propertyEntries.map(([key, value]) => (
              <div key={key} className='flex flex-col'>
                <span className='text-lg font-bold'>{key}:</span>
                <span className='text-lg ml-2'>{formatValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertiesDrawer

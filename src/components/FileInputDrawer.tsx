import React, { useState } from 'react'
import { GeoJSON } from 'geojson'

interface FileInputDrawerProps {
  onGeoJSONUpload: (data: GeoJSON.FeatureCollection | null) => void
}

const FileInputDrawer = ({
  onGeoJSONUpload,
}: FileInputDrawerProps): JSX.Element => {
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const geoJSON = JSON.parse(e.target?.result as string)
        onGeoJSONUpload(geoJSON)
        setUploadSuccess(true)
        console.log('Uploaded GeoJSON:', geoJSON)
      } catch (error) {
        console.error('Error parsing GeoJSON:', error)
        onGeoJSONUpload(null)
        setUploadSuccess(false)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className='drawer drawer-end'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label
          htmlFor='my-drawer'
          className='btn bg-primary text-background text-lg hover:bg-text hover:text-primary drawer-button'>
          Manage Fields
        </label>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer'
          aria-label='close sidebar'
          className='drawer-overlay'></label>
        <div className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
          <h2 className='text-xl font-bold mb-4'>Upload Field Data</h2>

          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Upload GeoJSON File</span>
            </label>
            <input
              type='file'
              accept='.geojson,application/geo+json'
              onChange={handleFileUpload}
              className='file-input file-input-bordered w-full max-w-xs'
            />
          </div>

          {uploadSuccess && (
            <div className='mt-4'>
              <p className='text-success'>
                GeoJSON file uploaded successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileInputDrawer

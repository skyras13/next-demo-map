import React, { useCallback, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import * as turf from '@turf/turf'

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapProps {
  geoJSONData: GeoJSON.FeatureCollection | null
}

const Map = ({ geoJSONData }: MapProps) => {
  const position: [number, number] = [40.40613526012979, -111.91127570442274]
  const [selectedFeature, setSelectedFeature] =
    useState<GeoJSON.Feature | null>(null)
  const geoJSONRef = useRef<L.GeoJSON | null>(null)

  const resetHighlight = useCallback((e: L.LeafletEvent) => {
    if (geoJSONRef.current) {
      geoJSONRef.current.resetStyle(e.target)
    }
  }, [])

  const highlightFeature = useCallback((e: L.LeafletEvent) => {
    const layer = e.target
    layer.setStyle({
      weight: 3,
      color: '#666',
      fillOpacity: 0.2,
    })
    layer.bringToFront()
  }, [])

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: (e) => {
          if (feature !== selectedFeature) {
            resetHighlight(e)
          }
        },
        click: (e) => {
          if (selectedFeature) {
            resetHighlight({ target: e.target })
          }
          setSelectedFeature(feature)
          highlightFeature(e)
        },
      })
    },
    [highlightFeature, resetHighlight, selectedFeature]
  )

  const getFeatureCenter = (feature: GeoJSON.Feature): [number, number] => {
    try {
      const center = turf.center(feature)
      return [center.geometry.coordinates[1], center.geometry.coordinates[0]]
    } catch (error) {
      console.error('Error calculating center:', error)
      // Fallback to first coordinate if center calculation fails
      return L.GeoJSON.coordsToLatLng(
        (feature.geometry as any).coordinates[0][0]
      )
    }
  }

  return (
    <MapContainer
      center={position}
      zoom={6}
      style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {geoJSONData && (
        <GeoJSON
          data={geoJSONData}
          ref={geoJSONRef}
          style={() => ({
            color: '#4a83ec',
            weight: 1,
            fillColor: '#4a83ec',
            fillOpacity: 0.1,
          })}
          onEachFeature={onEachFeature}
        />
      )}
      {selectedFeature && (
        <Popup
          position={getFeatureCenter(selectedFeature)}
          onClose={() => {
            setSelectedFeature(null)
            if (geoJSONRef.current) {
              geoJSONRef.current.resetStyle()
            }
          }}>
          <div className='p-2'>
            <h3 className='font-bold mb-2'>
              {selectedFeature.properties?.NAME}
            </h3>
            {selectedFeature.properties?.STATE && (
              <p className='text-sm'>
                State Code: {selectedFeature.properties.STATE}
              </p>
            )}
            {selectedFeature.properties?.acreage && (
              <p className='text-sm'>
                Acreage: {selectedFeature.properties.acreage}
              </p>
            )}
          </div>
        </Popup>
      )}
    </MapContainer>
  )
}

export default Map

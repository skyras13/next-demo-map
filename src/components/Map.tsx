import React, { useCallback, useRef, useState, useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import * as turf from '@turf/turf'
import { Geometry, GeoJsonProperties } from 'geojson'

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapProps {
  geoJSONData: GeoJSON.FeatureCollection | null
}

const Map = ({ geoJSONData }: MapProps) => {
  const position: [number, number] = [43.84458047094772, -83.03303727926591]
  const [selectedFeature, setSelectedFeature] =
    useState<GeoJSON.Feature | null>(null)
  const geoJSONRef = useRef<L.GeoJSON | null>(null)
  // Default style
  const defaultStyle = useCallback(
    (feature: GeoJSON.Feature<Geometry, GeoJsonProperties>) => {
      return {
        color: '#000000', // border color
        weight: 1,
        fillColor: feature.properties?.COLOR || '#3388ff', // use COLOR from properties, fallback to default blue
        fillOpacity: 0.5,
      }
    },
    []
  )

  const selectedStyle = {
    color: '#666666',
    weight: 2,
    fillColor: '#ffffff',
    fillOpacity: 0.6,
  }

  const highlightStyle = {
    color: '#666666',
    weight: 2,
    fillColor: '#ffffff',
    fillOpacity: 0.6,
  }

  const style = useCallback(
    (feature: GeoJSON.Feature<Geometry, GeoJsonProperties> | undefined) => {
      if (!feature) return defaultStyle({} as GeoJSON.Feature)
      return feature === selectedFeature ? selectedStyle : defaultStyle(feature)
    },
    [selectedFeature, defaultStyle]
  )

  const resetHighlight = useCallback((layer: L.Layer) => {
    if (geoJSONRef.current) {
      geoJSONRef.current.resetStyle(layer)
    }
  }, [])

  const highlightFeature = useCallback((e: L.LeafletEvent) => {
    const layer = e.target
    layer.setStyle(highlightStyle)
    layer.bringToFront()
  }, [])

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      layer.on({
        mouseover: (e) => {
          if (feature !== selectedFeature) {
            highlightFeature(e)
          }
        },
        mouseout: (e) => {
          if (feature !== selectedFeature) {
            resetHighlight(e.target)
          }
        },
        click: (e) => {
          // Reset previous selection if it exists
          if (selectedFeature && geoJSONRef.current) {
            geoJSONRef.current.resetStyle()
          }

          // Set new selection and highlight it
          setSelectedFeature(feature)
          highlightFeature(e)
          // No reset here! Let it stay highlighted
        },
      })
    },
    [highlightFeature, resetHighlight, selectedFeature]
  )

  const getFeatureCenter = (feature: GeoJSON.Feature): [number, number] => {
    try {
      // Calculate the bounding box of the feature
      const bbox = turf.bbox(feature)

      // Create a feature collection with the bboxPolygon
      const bboxPolygon = turf.bboxPolygon(bbox)
      const featureCollection: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [bboxPolygon],
      }

      // Get the center of the feature collection
      const center = turf.center(featureCollection)
      return [center.geometry.coordinates[1], center.geometry.coordinates[0]]
    } catch (error) {
      console.error('Error calculating center:', error)
      if (
        feature.geometry.type === 'Polygon' &&
        feature.geometry.coordinates[0]?.[0]?.length >= 2
      ) {
        return [
          feature.geometry.coordinates[0][0][1],
          feature.geometry.coordinates[0][0][0],
        ]
      }
      return [0, 0]
    }
  }

  // Add a key prop to force re-render of GeoJSON component
  const [geoJSONKey, setGeoJSONKey] = useState(0)

  // Update useEffect to reset state when geoJSONData changes
  useEffect(() => {
    setSelectedFeature(null)
    setGeoJSONKey((prev) => prev + 1)
  }, [geoJSONData])

  return (
    <MapContainer
      center={position}
      zoom={11}
      style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      />
      {geoJSONData && (
        <GeoJSON
          key={geoJSONKey}
          data={geoJSONData}
          ref={geoJSONRef}
          style={style}
          onEachFeature={onEachFeature}
        />
      )}
      {selectedFeature && (
        <Popup
          position={getFeatureCenter(selectedFeature)}
          eventHandlers={{
            remove: () => {
              if (geoJSONRef.current) {
                geoJSONRef.current.resetStyle()
              }
              setSelectedFeature(null)
            },
          }}>
          <div className='p-2'>
            <h3 className='font-bold mb-2 text-lg'>
              {selectedFeature.properties?.name ||
                selectedFeature.properties?.NAME}
            </h3>
            {selectedFeature.properties?.STATE && (
              <p className='text-sm'>
                State Code: {selectedFeature.properties.STATE}
              </p>
            )}
            {selectedFeature.properties?.acreage && (
              <p className='text-sm'>
                Acreage: {Number(selectedFeature.properties.acreage).toFixed(3)}
              </p>
            )}
          </div>
        </Popup>
      )}
    </MapContainer>
  )
}

export default Map

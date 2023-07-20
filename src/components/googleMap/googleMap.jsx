import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './googleMap.css'

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export default function MapTest() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  })

  return (<div className='map'>
    {isLoaded ? (
      <GoogleMap
        mapContainerStyle={{width: '50%', height: '50%'}}
        center={{lat: 38.72304884321217,lng: -9.142570395627299}}
        zoom={10}
      >
      </GoogleMap>
  ) : <></>}
  </div>) 
}
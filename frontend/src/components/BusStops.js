import React, { useEffect } from 'react';
import axios from 'axios';
import { Circle } from '@react-google-maps/api';

export function BusStops() {

    const center = {
        lat: 53.3522,
        lng: -6.26372
    }

    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 10,
        zIndex: 1
      }
      
      const onLoad = circle => {
        console.log('Circle onLoad circle: ', circle)
      }
      
      const onUnmount = circle => {
        console.log('Circle onUnmount circle: ', circle)
      }

    //   useEffect(async () => {
    //     const result = await axios(
    //         'http://localhost:8000/bus/',
    //     )
    //     setResults(result.data)
    // })
    
    return (
        <Circle
        // optional
        onLoad={onLoad}
        // optional
        onUnmount={onUnmount}
        // required
        center={center}
        // required
        options={options}
      />
    )
}
import React, { useEffect } from 'react';
import axios from 'axios';
import { Circle } from '@react-google-maps/api';

export function BusStops() {
    const [busStops, setBusStops] = React.useState([])

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

      useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/stops',
        )
        setBusStops(result.data.stops)
    },[''])
    
    return (
        // Map circles to coordinates of bus stops
        busStops.map((stop => (
            <Circle
            center={{"lat": stop.stop_lat, "lng": stop.stop_lon}}
            options={options}
          />
        )))
    )
}
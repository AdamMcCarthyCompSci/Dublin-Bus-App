import React, { useEffect } from 'react';
import axios from 'axios';
import { Circle } from '@react-google-maps/api';

export function Leap() {
    const [leap, setLeap] = React.useState([])

    const options = {
        strokeColor: '#f44336',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#f44336',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 10,
        zIndex: 1
      }

      useEffect( () => {
      async function fetchData(){
        const result = await axios(
            process.env.REACT_APP_API_URL + '/bus/leap',
        )
        setLeap(result.data.leap)
        }
        fetchData();
    },[])
    
    return (
        // Map circles to coordinates of leap card top-up locations
        leap.map((leap => (
            <Circle
            key={leap.leap_card_locations_id}
            center={{"lat": parseFloat(leap.latitude), "lng": parseFloat(leap.longitude)}}
            options={options}
          />
        )))
    )
}
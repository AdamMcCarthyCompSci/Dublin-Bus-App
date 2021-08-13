import React, { useEffect } from 'react';
import axios from 'axios';
import { Circle } from '@react-google-maps/api';

export function CurrentLocation({position}) {

    const options = {
        strokeColor: '#3f50b5',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3f50b5',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 100,
        zIndex: 1
      }
    
    return (
            <Circle
            center={position}
            options={options}
          />
    )
}
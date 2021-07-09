import React from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import styles from './Map.module.css';
import { BusStops } from "./BusStops";
import { Results } from './Results';
import { Settings } from './Settings';
import { Profile } from './Profile';


const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = { lat: 53.345804, lng: -6.26031 }

// Implement LatLng bounds


function MapContainer({menu}) {
  const [originBox, setOriginBox] = React.useState(null);
  const [destinationBox, setDestinationBox] = React.useState(null);
  const [callbackResponse, setCallbackResponse] = React.useState(null);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const lib = ['places'];


  // Next 4 functions are for the places search boxes
  const onOriginChanged = () => {
    setOrigin(originBox.getPlaces()[0].formatted_address)
  };

  const onDestinationChanged = () => {
    setDestination(destinationBox.getPlaces()[0].formatted_address)
  }

  const onOriginLoad = ref => {
    setOriginBox(ref);
  };
  const onDestinationLoad = ref => {
    setDestinationBox(ref);
  };

  const directionsCallback = (response) => {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        setCallbackResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }


  return (
    <div className = {styles.MapContainer}>
      {/* react-google-maps library for the Google Maps API */}
    <LoadScript
      libraries={lib}
      googleMapsApiKey="AIzaSyAbXR_N5FTc0sO4lMQcsXgPQat7wUnVKl4"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom = { 14 }
        options={{streetViewControl: false, strictBounds: false, mapTypeControl: false}}
      >
        {menu == 'Home' && <Results
        display={menu == 'Home'}
        onOriginChanged={onOriginChanged} 
        onOriginLoad={onOriginLoad} 
        setOrigin={setOrigin}
        origin={origin} 
        onDestinationChanged={onDestinationChanged} 
        onDestinationLoad={onDestinationLoad} 
        setDestination={setDestination}
        destination={destination}
        />}
        {/* Conditionally render profile and settings views */}
        {menu == 'Profile' && <Profile display={menu == 'Profile'}/>}
        {menu == 'Settings' && <Settings display={menu == 'Settings'}/>}
        {/* Display bus stops */}
        <BusStops />
        
        {/* If origin and destination search boxes are filled in, then display bus directions */}
        {
              (
                destination !== '' &&
                origin !== ''
              ) && (
                <DirectionsService
                  options={{
                    destination: destination,
                    origin: origin,
                    travelMode: 'TRANSIT',
                    transitOptions: {
                      // departureTime
                      modes: ['BUS']
                    }
                  }}
                  callback={directionsCallback}
                />
              )
            }

            {
              callbackResponse !== null && (
                <DirectionsRenderer
                  options={{
                    directions: callbackResponse
                  }}
                />
              )
            }


      </GoogleMap>
    </LoadScript>
    </div>
  )
}

export default React.memo(MapContainer)
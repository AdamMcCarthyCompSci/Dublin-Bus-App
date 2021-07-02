import React from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import styles from './Map.module.css';
import { PlacesSearch } from "./PlacesSearch";


const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = { lat: 53.345804, lng: -6.26031 }

// Implement LatLng bounds


function MapContainer({showSearch}) {
  const [originBox, setOriginBox] = React.useState(null);
  const [destinationBox, setDestinationBox] = React.useState(null);
  const [callbackResponse, setCallbackResponse] = React.useState(null);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const lib = ['places'];

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
        <PlacesSearch 
        onPlacesChanged={onOriginChanged} 
        onPlacesLoad={onOriginLoad} 
        bottom={"100px"} 
        back={true} 
        place={origin} 
        setPlace={setOrigin}
        search={"Origin Search"}
        showSearch={showSearch}
        />
        <PlacesSearch 
        onPlacesChanged={onDestinationChanged} 
        onPlacesLoad={onDestinationLoad} 
        bottom={"50px"} 
        back={false} 
        place={destination} 
        setPlace={setDestination}
        search={"Destination Search"}
        showSearch={showSearch}
        />

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
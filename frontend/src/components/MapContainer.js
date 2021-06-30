import React from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import styles from './Map.module.css';
import { PlacesSearch } from "./PlacesSearch";


const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = { lat: 53.345804, lng: -6.26031 }

// Not implemented yet
// const latLngBounds = {
//   north: 54.345804,
//   south: 52.345804,
//   east: -5.26031,
//   west: -7.26031,
// }


function MapContainer({handleNextStep, handleLastStep, activeStepper}) {
  const [originBox, setOriginBox] = React.useState(null);
  const [destinationBox, setDestinationBox] = React.useState(null);
  const [callbackResponse, setCallbackResponse] = React.useState(null);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const lib = ['places'];

  const onOriginChanged = () => {
    console.log(originBox.getPlaces())
    console.log(originBox.getPlaces()[0].address_components[0].long_name)
    setOrigin(originBox.getPlaces()[0].address_components[0].long_name)
  };

  const onDestinationChanged = () => {
    console.log(destinationBox.getPlaces()[0].address_components[0].long_name)
    setDestination(destinationBox.getPlaces()[0].address_components[0].long_name)
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
        {activeStepper == 0 && <PlacesSearch onPlacesChanged={onOriginChanged} onPlacesLoad={onOriginLoad} handleLastStep={handleLastStep} handleNextStep={handleNextStep} bottom={"25%"} back={true} place={origin} setPlace={setOrigin}/>}
        {activeStepper == 1 && <PlacesSearch onPlacesChanged={onDestinationChanged} onPlacesLoad={onDestinationLoad} handleLastStep={handleLastStep} handleNextStep={handleNextStep} bottom={"17%"} back={false} place={destination} setPlace={setDestination}/>}

        { /* Child components, such as markers, info windows, etc. */ }

        {
              (
                destination !== '' &&
                origin !== ''
              ) && (
                <DirectionsService
                  // required
                  options={{
                    destination: destination,
                    origin: origin,
                    travelMode: 'TRANSIT'
                  }}
                  // required
                  callback={directionsCallback}
                />
              )
            }

            {
              callbackResponse !== null && (
                <DirectionsRenderer
                  // required
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
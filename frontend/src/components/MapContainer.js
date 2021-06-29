import React from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
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
  const [searchBox, setSearchBox] = React.useState(null);

  const lib = ['places'];

  const onPlacesChanged = () => console.log(searchBox.getPlaces());
  const onSBLoad = ref => {
    setSearchBox(ref);
  };


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
        {activeStepper == 0 && <PlacesSearch onPlacesChanged={onPlacesChanged} onSBLoad={onSBLoad} handleLastStep={handleLastStep} handleNextStep={handleNextStep} bottom={"25%"} back={true}/>}
        {activeStepper == 1 && <PlacesSearch onPlacesChanged={onPlacesChanged} onSBLoad={onSBLoad} handleLastStep={handleLastStep} handleNextStep={handleNextStep} bottom={"17%"} back={false}/>}

        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
    </div>
  )
}

export default React.memo(MapContainer)
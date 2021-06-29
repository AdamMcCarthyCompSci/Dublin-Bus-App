import React from 'react'
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import styles from './Map.module.css';

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

function MapContainer() {
  const [searchBox, setSearchBox] = React.useState(null);

  const lib = ['places'];

  const onPlacesChanged = () => console.log(searchBox.getPlaces());
  const onSBLoad = ref => {
    setSearchBox(ref);
  };


  // const onLoad = ref => searchBox = ref;

  // const onPlacesChanged = () => console.log(searchBox.getPlaces());



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
            <StandaloneSearchBox
      onLoad={onSBLoad}
      onPlacesChanged={
        onPlacesChanged
      }
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
      />
    </StandaloneSearchBox>
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
    </div>
  )
}

export default React.memo(MapContainer)
import React from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, DistanceMatrixService } from '@react-google-maps/api';
import styles from './Map.module.css';
import { BusStops } from "./BusStops";
import { Leap } from "./Leap.js"
import { Home } from './Home';
import { Settings } from './Settings';
import Profile from './Profile';
import { Results } from "./Results.js"
import dayjs from 'dayjs';


const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = { lat: 53.345804, lng: -6.26031 }

const darkModeStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
]

// Implement LatLng bounds


function MapContainer({menu, setMenu}) {
  const [originBox, setOriginBox] = React.useState(null);
  const [destinationBox, setDestinationBox] = React.useState(null);
  const [callbackResponse, setCallbackResponse] = React.useState(null);
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  // const [submit, setSubmit] = React.useState(false);
  const [settings, setSettings] = React.useState({
    showStops: true,
    darkMode: true,
    showLeap: true,
    showWeather: true,
  });
  const [newDirections, setNewDirections] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [weather, setWeather] = React.useState({});
  const [leaveArrive, setLeaveArrive] = React.useState('Leave At:');

  const darkBackground = settings.darkMode ? "#424242" : "";
  const darkForeground = settings.darkMode ? "#616161" : "";
  const darkText = settings.darkMode ? "#ffffff" : "";

  const lib = ['places'];


  // Next 4 functions are for the places search boxes
  const onOriginChanged = () => {
    setOrigin(originBox.getPlaces()[0].formatted_address)
    setNewDirections(true);
  };

  const onDestinationChanged = () => {
    setDestination(destinationBox.getPlaces()[0].formatted_address)
    setNewDirections(true);
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
        setNewDirections(true);
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
        options={{streetViewControl: false, strictBounds: false, mapTypeControl: false, styles: (settings.darkMode ? darkModeStyle : [])}}
      >
        {menu == 'Home' && <Home
        menu={menu}
        setMenu={setMenu}
        onOriginChanged={onOriginChanged} 
        onOriginLoad={onOriginLoad} 
        setOrigin={setOrigin}
        origin={origin} 
        onDestinationChanged={onDestinationChanged} 
        onDestinationLoad={onDestinationLoad} 
        setDestination={setDestination}
        destination={destination}
        // setSubmit={setSubmit}
        settings={settings}
        darkBackground={darkBackground}
        darkForeground={darkForeground}
        darkText={darkText}
        weather={weather}
        setWeather={setWeather}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        newDirections={newDirections}
        setNewDirections={setNewDirections}
        leaveArrive={leaveArrive}
        setLeaveArrive={setLeaveArrive}
        />}
        {/* Conditionally render views */}
        {menu == 'Profile' && <Profile display={menu == 'Profile'} setMenu={setMenu} darkBackground={darkBackground} darkForeground={darkForeground} darkText={darkText}/>}
        {menu == 'Settings' && <Settings display={menu == 'Settings'} settings={settings} setSettings={setSettings} darkBackground={darkBackground} darkForeground={darkForeground} darkText={darkText}/>}
        {menu === 'Results' && <Results menu={menu} setMenu={setMenu} callbackResponse={callbackResponse} darkBackground={darkBackground} darkForeground={darkForeground} darkText={darkText} weather={weather} settings={settings} leaveArrive={leaveArrive}/>}
        {/* Display bus stops */}
        {settings.showStops && <BusStops />}
        {settings.showLeap && <Leap />}
        
        {/* If origin and destination search boxes are filled in, then display bus directions */}
        {
              (
                destination !== '' &&
                origin !== '' &&
                newDirections === false &&
                leaveArrive === "Leave At:"
              ) && (
                <DirectionsService
                  options={{
                    destination: destination,
                    origin: origin,
                    travelMode: 'TRANSIT',
                    transitOptions: {
                      departureTime: dayjs(selectedDate).toDate(),
                      modes: ['BUS']
                    }
                  }}
                  callback={directionsCallback}
                />
              )
            }
                    {
              (
                destination !== '' &&
                origin !== '' &&
                newDirections === false &&
                leaveArrive === "Arrive At:"
              ) && (
                <DirectionsService
                  options={{
                    destination: destination,
                    origin: origin,
                    travelMode: 'TRANSIT',
                    transitOptions: {
                      arrivalTime: dayjs(selectedDate).toDate(),
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
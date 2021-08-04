import React from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import SwipeableViews from "react-swipeable-views";
import { Routes } from "./Routes.js";
import axios from 'axios';
import dayjs from 'dayjs';
import { Directions } from "./Directions";
import { Favourites } from "./Favourites";
import {useAuth} from "../auth";


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  // Tab functionality
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }


export function Home({menu, setMenu, onOriginChanged, onOriginLoad, setOrigin, origin, onDestinationChanged, onDestinationLoad, setDestination, destination, darkBackground, darkForeground, darkText, weather, setWeather, selectedDate, setSelectedDate, newDirections, setNewDirections, leaveArrive, setLeaveArrive, callbackResponse, walkingCallbackResponse, originError, destinationError}) {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const [logged] = useAuth();

    const showWeather = async (time) => {
      const formatTime = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
      const result = await axios.get(process.env.REACT_APP_API_URL + "/bus/weather", {
          params: {
              time: formatTime,
          }
      })
      .catch(error => {
        console.log("error:", error)
      });
      setWeather(result.data.weather);
      console.log(result.data.weather);
  }

    // Event handler for tabs
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    // Event handler for swipeable views
    const handleChangeIndex = (index) => {
      setValue(index);
    };


    return (
      <div className={styles.homeContainer}>
      
      <Slide direction="up" in={menu==='Home'} mountOnEnter unmountOnExit>
      <Paper elevation={3} className={styles.homePaper} style={{backgroundColor: darkBackground}}>
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Directions" {...a11yProps(0)} />
          <Tab label="Pricing" {...a11yProps(1)} />
          <Tab label="Favourites" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
        {/* Swipeable views allows mobile devices to swipe between tabs */}
        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* First tab, contains location search boces and date/time picker */}
        <TabPanel value={value} index={0} dir={theme.direction} style={{height:"310px"}}>



        <Directions 
          onOriginChanged={onOriginChanged}
          onOriginLoad={onOriginLoad}
          origin={origin}
          setOrigin={setOrigin}
          darkBackground={darkBackground}
          darkForeground={darkForeground}
          darkText={darkText}
          originError={originError}
          onDestinationChanged={onDestinationChanged}
          onDestinationLoad={onDestinationLoad}
          destination={destination}
          setDestination={setDestination}
          destinationError={destinationError}
          leaveArrive={leaveArrive}
          setLeaveArrive={setLeaveArrive}
          setNewDirections={setNewDirections}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setMenu={setMenu}
          showWeather={showWeather}
          favouriteRoute={false}
          setFavouriteView={null}
        />



        </TabPanel>
        {/* Second tab, contains route dropdowns */}
        <TabPanel value={value} index={1} dir={theme.direction} style={{height:"310px"}}>



        <Routes logged={logged} darkBackground={darkBackground} darkForeground={darkForeground} darkText={darkText}/>



        </TabPanel>
        {/* Third tab, contains miscellaneous features */}
        <TabPanel value={value} index={2} dir={theme.direction} style={{height:"310px"}}>




        {/* {<p style={{color: darkText}}>Sign in or register to create and view your favourite routes</p>} */}
        <Favourites
          onOriginChanged={onOriginChanged}
          onOriginLoad={onOriginLoad}
          origin={origin}
          setOrigin={setOrigin}
          darkBackground={darkBackground}
          darkForeground={darkForeground}
          darkText={darkText}
          originError={originError}
          onDestinationChanged={onDestinationChanged}
          onDestinationLoad={onDestinationLoad}
          destination={destination}
          setDestination={setDestination}
          destinationError={destinationError}
          leaveArrive={leaveArrive}
          setLeaveArrive={setLeaveArrive}
          setNewDirections={setNewDirections}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setMenu={setMenu}
          showWeather={showWeather}
        />




        </TabPanel>
      </SwipeableViews>

      </Paper>
      </Slide>
      </div>
    )
}
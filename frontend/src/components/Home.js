import React from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import DayJsUtils from '@date-io/dayjs';
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { PlacesSearch } from "./PlacesSearch";
import { LeaveArriveButton } from './LeaveArriveButton';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import SwipeableViews from "react-swipeable-views";
import { Routes } from "./Routes.js";
import axios from 'axios';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';


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
            <PlacesSearch 
            onPlacesChanged={onOriginChanged} 
            onPlacesLoad={onOriginLoad} 
            place={origin} 
            setPlace={setOrigin}
            search={"Origin Search"}
            darkBackground={darkBackground}
            darkForeground={darkForeground}
            darkText={darkText}
            error={originError}
            />
            <PlacesSearch 
            onPlacesChanged={onDestinationChanged} 
            onPlacesLoad={onDestinationLoad} 
            place={destination} 
            setPlace={setDestination}
            search={"Destination Search"}
            darkBackground={darkBackground}
            darkForeground={darkForeground}
            darkText={darkText}
            error={destinationError}
            />

            <Grid container spacing={1} alignItems="center" className={styles.dateAndButtonContainer} style={{marginBottom: "20px", width: "80%", marginLeft: "10%"}}>
            <Grid item xs={2}>
              <LeaveArriveButton leaveArrive={leaveArrive} setLeaveArrive={setLeaveArrive} setNewDirections={setNewDirections}/>
            </Grid>
            <Grid item xs={10}>
            <Paper component="form" className={styles.datePickerContainer} style={{backgroundColor: darkForeground}}>
              <MuiPickersUtilsProvider utils={DayJsUtils}>
                <DateTimePicker
                className={styles.datePicker}
                    value={selectedDate}
                    disablePast
                    maxDate={new Date().setDate(new Date().getDate()+1)}
                    onChange={setSelectedDate}
                    label="Select a Date and Time"
                    showTodayButton
                    inputProps={{ style: {color: darkText} }}
                    InputLabelProps={{
                      style: { color: darkText },
                    }}
                />
              </MuiPickersUtilsProvider>
              </Paper>
            </Grid>
            </Grid>

            {origin !== "" && destination !== "" && 
              <Button
              className={styles.submitButton}
              variant="contained" 
              color="primary"
              onClick={() => {
                setMenu('Results');
                showWeather(selectedDate);
                setNewDirections(false);
                // Call prediction
              }}> 
                Submit 
              </Button>
            }
            {!(origin !== "" && destination !== "") && 
              <Button
              className={styles.submitButton}
              variant="contained" 
              color="primary"
              disabled
              onClick={() => {
                setMenu('Results');
                setNewDirections(false);
                // Call prediction
              }}> 
                Submit 
              </Button>
            }

        </TabPanel>
        {/* Second tab, contains route dropdowns */}
        <TabPanel value={value} index={1} dir={theme.direction} style={{height:"310px"}}>




          <Routes darkBackground={darkBackground} darkForeground={darkForeground} darkText={darkText}/>




        </TabPanel>
        {/* Third tab, contains miscellaneous features */}
        <TabPanel value={value} index={2} dir={theme.direction} style={{height:"310px"}}>




        <p style={{color: darkText}}>Create Extra Features Here</p>




        </TabPanel>
      </SwipeableViews>

      </Paper>
      </Slide>
      </div>
    )
}
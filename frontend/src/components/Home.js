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
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import SwipeableViews from "react-swipeable-views";
import Routes from "./Routes.js";


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


export function Home({menu, setMenu, onOriginChanged, onOriginLoad, setOrigin, origin, onDestinationChanged, onDestinationLoad, setDestination, destination, setSubmit}) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

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
      <Paper elevation={3} className={styles.homePaper}>
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="default"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Directions" {...a11yProps(0)} />
          <Tab label="Timetable" {...a11yProps(1)} />
          <Tab label="Extra Features" {...a11yProps(2)} />
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
            setSubmit={setSubmit}
            />
            <PlacesSearch 
            onPlacesChanged={onDestinationChanged} 
            onPlacesLoad={onDestinationLoad} 
            place={destination} 
            setPlace={setDestination}
            search={"Destination Search"}
            setSubmit={setSubmit}
            />
            <Paper component="form" className={styles.datePickerContainer}>
            <MuiPickersUtilsProvider utils={DayJsUtils}>
              <DateTimePicker
              className={styles.datePicker}
                  value={selectedDate}
                  disablePast
                  onChange={setSelectedDate}
                  label="Select a date and time"
                  showTodayButton
              />
            </MuiPickersUtilsProvider>
            </Paper>
            <Button
            className={styles.submitButton}
             variant="contained" 
             color="primary"
             onClick={() => {
              if (origin !== "" && destination !== "") {
                setSubmit(true);
                setMenu('Results');
              }
              // Call prediction
              }}> 
              Submit 
              </Button>

        </TabPanel>
        {/* Second tab, contains route dropdowns */}
        <TabPanel value={value} index={1} dir={theme.direction} style={{height:"310px"}}>




          <Routes />




        </TabPanel>
        {/* Third tab, contains miscellaneous features */}
        <TabPanel value={value} index={2} dir={theme.direction} style={{height:"310px"}}>




          Create Extra Features Here




        </TabPanel>
      </SwipeableViews>

      </Paper>
      </Slide>
      </div>
    )
}
import React from 'react';
import styles from './Map.module.css';
import { PlacesSearch } from "./PlacesSearch";
import { LeaveArriveButton } from './LeaveArriveButton';
import DayJsUtils from '@date-io/dayjs';
import { DateTimePicker, TimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export function Directions({onOriginChanged, onOriginLoad, origin, darkBackground, darkForeground, darkText, originError, onDestinationChanged, onDestinationLoad, destination, destinationError, leaveArrive, setLeaveArrive, setNewDirections, selectedDate, setSelectedDate, setMenu, showWeather, favouriteRoute, saveFavourite, setFavouriteView, favouriteTitle, handleTitleChange}) {
  const useStyles = makeStyles((theme) => ({
    searchPaper: {
      padding: '2px 4px',
      marginTop: '-10px',
      marginBottom: '20px',
      alignItems: 'center',
      width: "80%",
      marginLeft: "10%",
      zIndex: 2,
    },
    standaloneSearchBox: {
      // marginLeft: theme.spacing(1),
      flex: 1,
      position: "absolute",
      width: "100%",
      margin: "auto",
      height: "auto",
    },
    input: {
      // marginLeft: theme.spacing(1),
      flex: 1,
      width: "100%",
      margin: "auto",
      height: "auto",
    },
    inputTextColor:{
      // color:'#002984'
  }
  }));

const classes = useStyles();  
  
  return (
        <React.Fragment>
        {favouriteRoute &&
          <TextField
          className={classes.input}
          value={favouriteTitle}
          onChange={handleTitleChange}
          placeholder={favouriteTitle ? favouriteTitle : "Enter a title"}
          label={"Stop title"}
          variant="outlined"
          inputProps={{ 'aria-label': 'search google maps', style: {color: darkText} }}
        />
        }
        <PlacesSearch 
        onPlacesChanged={onOriginChanged} 
        onPlacesLoad={onOriginLoad} 
        place={origin} 
        search={"Origin Search"}
        label={"Search origin"}
        darkBackground={darkBackground}
        darkForeground={darkForeground}
        darkText={darkText}
        error={originError}
        style={{marginTop: '16px'}}
        />
        <PlacesSearch 
        onPlacesChanged={onDestinationChanged} 
        onPlacesLoad={onDestinationLoad} 
        place={destination} 
        search={"Destination Search"}
        label={"Search destination"}
        darkBackground={darkBackground}
        darkForeground={darkForeground}
        darkText={darkText}
        error={destinationError}
        style={{marginTop: '16px'}}
        />

        <Grid container spacing={1} alignItems="center" className={styles.dateAndButtonContainer} style={{marginTop: "16px", marginBottom: "16px"}}>
          
          {!favouriteRoute && 
          <Grid item xs={12} md={3}>
          <LeaveArriveButton leaveArrive={leaveArrive} setLeaveArrive={setLeaveArrive} setNewDirections={setNewDirections}/>
          </Grid>
          }
        <Grid item xs={12} md={favouriteRoute ? 12 : 9}>
          {favouriteRoute &&
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <TimePicker
                className={styles.datePicker}
                value={selectedDate}
                onChange={setSelectedDate}
                label="Select a Time to Arrive At"
                inputVariant="outlined"
                inputProps={{ style: {color: darkText} }}
                InputLabelProps={{
                  style: { color: darkText },
                }}
            />
          </MuiPickersUtilsProvider>
          }
          {!favouriteRoute &&
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <DateTimePicker
                className={styles.datePicker}
                value={selectedDate}
                disablePast
                maxDate={new Date().setDate(new Date().getDate()+1)}
                onChange={setSelectedDate}
                label="Select a Date and Time"
                inputVariant="outlined"
                showTodayButton
                inputProps={{ style: {color: darkText} }}
                InputLabelProps={{
                  style: { color: darkText },
                }}
            />
          </MuiPickersUtilsProvider>
          }
        </Grid>
        </Grid>

        {origin !== "" && destination !== "" && originError === "" && destinationError === "" &&
        !favouriteRoute && 
          <Button
          className={styles.submitButton}
          variant="contained" 
          color="primary"
          size="large"
          fullWidth
          onClick={() => {
            setMenu('Results');
            showWeather(selectedDate);
            setNewDirections(false);
            // Call prediction
          }}> 
            Submit 
          </Button>
        }
        {((origin === "" || destination === "") || (originError !== "" || destinationError !== "")) && 
        !favouriteRoute &&
          <Button
          className={styles.submitButton}
          variant="contained" 
          color="primary"
          size="large"
          fullWidth
          disabled
          > 
            Submit 
          </Button>
        }

        {origin !== "" && destination !== "" && originError === "" && destinationError === "" &&
        favouriteRoute && 
          <Button
          className={styles.favouriteSubmitButton}
          variant="contained" 
          color="primary"
          size="large"
          fullWidth
          onClick={() => {
            saveFavourite(favouriteTitle ? favouriteTitle : "Unnamed Route", origin, destination, selectedDate);
            setNewDirections(false);
            setFavouriteView(true);
            // Call prediction
          }}> 
            Submit 
          </Button>
        }
        {((origin === "" || destination === "") || (originError !== "" || destinationError !== "")) && 
        favouriteRoute &&
          <Button
          className={styles.favouriteSubmitButton}
          variant="contained" 
          color="primary"
          size="large"
          fullWidth
          disabled
          > 
            Submit 
          </Button>
        }
        </React.Fragment>
    )
}
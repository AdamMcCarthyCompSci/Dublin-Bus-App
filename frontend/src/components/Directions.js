import React from 'react';
import styles from './Map.module.css';
import { PlacesSearch } from "./PlacesSearch";
import { LeaveArriveButton } from './LeaveArriveButton';
import DayJsUtils from '@date-io/dayjs';
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export function Directions({onOriginChanged, onOriginLoad, origin, setOrigin, darkBackground, darkForeground, darkText, originError, onDestinationChanged, onDestinationLoad, destination, setDestination, destinationError, leaveArrive, setLeaveArrive, setNewDirections, selectedDate, setSelectedDate, setMenu, showWeather}) {
    return (
        <React.Fragment>
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

        {origin !== "" && destination !== "" && originError === "" && destinationError === "" && 
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
        {((origin === "" || destination === "") || (originError !== "" || destinationError !== "")) && 
          <Button
          className={styles.submitButton}
          variant="contained" 
          color="primary"
          disabled
          onClick={() => {
            // setMenu('Results');
            // setNewDirections(false);
            // Call prediction
          }}> 
            Submit 
          </Button>
        }
        </React.Fragment>
    )
}
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

export function Directions({onOriginChanged, onOriginLoad, origin, darkBackground, darkForeground, darkText, originError, onDestinationChanged, onDestinationLoad, destination, destinationError, leaveArrive, setLeaveArrive, setNewDirections, selectedDate, setSelectedDate, setMenu, showWeather, favouriteRoute, saveFavourite, setFavouriteView}) {
    return (
        <React.Fragment>
        <PlacesSearch 
        onPlacesChanged={onOriginChanged} 
        onPlacesLoad={onOriginLoad} 
        place={origin} 
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
        search={"Destination Search"}
        darkBackground={darkBackground}
        darkForeground={darkForeground}
        darkText={darkText}
        error={destinationError}
        />

        <Grid container spacing={1} alignItems="center" className={styles.dateAndButtonContainer} style={{marginBottom: "20px", width: "80%", marginLeft: "10%"}}>
          
          {!favouriteRoute && 
          <Grid item xs={2}>
          <LeaveArriveButton leaveArrive={leaveArrive} setLeaveArrive={setLeaveArrive} setNewDirections={setNewDirections}/>
          </Grid>
          }
        <Grid item xs={favouriteRoute ? 12 : 10}>
        <Paper component="form" className={styles.datePickerContainer} style={{backgroundColor: darkForeground}}>
          {favouriteRoute &&
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <TimePicker
            className={styles.datePicker}
                value={selectedDate}
                disablePast
                onChange={setSelectedDate}
                label="Select a Time"
                showTodayButton
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
                showTodayButton
                inputProps={{ style: {color: darkText} }}
                InputLabelProps={{
                  style: { color: darkText },
                }}
            />
          </MuiPickersUtilsProvider>
          }
          </Paper>
        </Grid>
        </Grid>

        {origin !== "" && destination !== "" && originError === "" && destinationError === "" &&
        !favouriteRoute && 
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
        !favouriteRoute &&
          <Button
          className={styles.submitButton}
          variant="contained" 
          color="primary"
          disabled
          > 
            Submit 
          </Button>
        }

        {origin !== "" && destination !== "" && originError === "" && destinationError === "" &&
        favouriteRoute && 
          <Button
          className={styles.submitButton}
          variant="contained" 
          color="primary"
          onClick={() => {
            saveFavourite(origin, destination, selectedDate);
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
          className={styles.submitButton}
          variant="contained" 
          color="primary"
          disabled
          > 
            Submit 
          </Button>
        }
        </React.Fragment>
    )
}
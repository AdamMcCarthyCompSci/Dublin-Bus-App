import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './Map.module.css';
import { Directions } from "./Directions";
import Zoom from '@material-ui/core/Zoom';

export function Favourites({onOriginChanged, onOriginLoad, origin, setOrigin, darkBackground, darkForeground, darkText, originError, onDestinationChanged, onDestinationLoad, destination, setDestination, destinationError, leaveArrive, setLeaveArrive, setNewDirections, selectedDate, setSelectedDate, setMenu, showWeather}) {
    const [favourites, setFavourites] = React.useState([
        // {title: "Morning Commute", origin: "O'Connell Street", destination: "UCD", time: "8:00"}, 
        // {title: "Evening Commute", origin: "UCD", destination: "O'Connell Street", time: "17:00"}, 
        // {title: "Training", origin: "O'Connell Street", destination: "Phoenix Park", time: "20:00"}
    ]);
    const [favouriteView, setFavouriteView] = React.useState(true);
    const [selectedTime, setSelectedTime] = React.useState(new Date());
    const [favouriteOrigin, setFavouriteOrigin] = React.useState('');
    const [favouriteDestination, setFavouriteDestination] = React.useState('');
    const [favouriteOriginError, setFavouriteOriginError] = React.useState("");
    const [favouriteDestinationError, setFavouriteDestinationError] = React.useState("");
    const [favouriteOriginBox, setFavouriteOriginBox] = React.useState('');
    const [favouriteDestinationBox, setFavouriteDestinationBox] = React.useState('');
    const [newFavouriteDirections, setNewFavouriteDirections] = React.useState(true);

    const mapBounds = {
        north: 54.345804,
        south: 52.345804,
        east: -5.26031,
        west: -7.26031,
      };

      // Next 4 functions are for the places search boxes
  const onFavouriteOriginChanged = () => {
    try {
      const lat = favouriteOriginBox.getPlaces()[0].geometry.location.lat();
      const lng = favouriteOriginBox.getPlaces()[0].geometry.location.lng();
      if (favouriteOriginBox.getPlaces().length > 1) {
        setFavouriteOriginError("Destination must be a single address");
      }
      else if (favouriteOriginBox.getPlaces()[0].formatted_address === destination) {
        setFavouriteOriginError("Origin cannot be the same as destination");
      }
      else if ((mapBounds.south <= lat && lat <= mapBounds.north) && (mapBounds.west <= lng && lng <= mapBounds.east)) {
        if (favouriteOriginBox.getPlaces()[0].formatted_address !== destination) {
          setFavouriteDestinationError("");
        }
        setFavouriteOrigin(favouriteOriginBox.getPlaces()[0].formatted_address);
        setFavouriteOriginError("");
      }
      else {
        // setOrigin("");
        // setOriginBox("");
        setFavouriteOriginError("Origin must be close to Dublin");
      }
    }
    catch {
      // setOrigin("");
      // setOriginBox("");
      setFavouriteOriginError("Enter a valid Origin");
    }
    setNewFavouriteDirections(true);
  };

  const onFavouriteDestinationChanged = () => {
    try {
      const lat = favouriteDestinationBox.getPlaces()[0].geometry.location.lat();
      const lng = favouriteDestinationBox.getPlaces()[0].geometry.location.lng();
      if (favouriteDestinationBox.getPlaces().length > 1) {
        setFavouriteDestinationError("Destination must be a single address");
      }
      else if (favouriteDestinationBox.getPlaces()[0].formatted_address === origin) {
        setFavouriteDestinationError("Destination cannot be the same as origin");
      }
      else if ((mapBounds.south <= lat && lat <= mapBounds.north) && (mapBounds.west <= lng && lng <= mapBounds.east)) {
        if (favouriteDestinationBox.getPlaces()[0].formatted_address !== origin) {
          setFavouriteOriginError("");
        }
        setFavouriteDestination(favouriteDestinationBox.getPlaces()[0].formatted_address);
        setFavouriteDestinationError("");
      }
      else {
        // setDestination("");
        // setDestinationBox("");
        setFavouriteDestinationError("Destination must be close to Dublin");
      }
    }
    catch {
      // setDestination("");
      // setDestinationBox("");
      setFavouriteDestinationError("Enter a valid destination");
    }
    setNewFavouriteDirections(true);
  }

  const onFavouriteOriginLoad = ref => {
    setFavouriteOriginBox(ref);
  };
  const onFavouriteDestinationLoad = ref => {
    setFavouriteDestinationBox(ref);
  };

    const createFavourite = () => {
        return (
            setFavouriteView(false)
        )
    }

    const editFavourite = () => {
        return (
            console.log("edit")
        )
    }

    const saveFavourite = (origin, destination, time) => {
        setFavourites([...favourites, {title: "Added!", origin: origin, destination: destination, time: time}])
    }

    const deleteFavourite = (index) => {
        setFavourites(favourites.filter((indexFavourite, favourite) => index !== indexFavourite))
    }

    return (
        <React.Fragment>
            <Zoom in={!favouriteView} mountOnEnter unmountOnExit>
                <Directions 
                    onOriginChanged={onFavouriteOriginChanged}
                    onOriginLoad={onFavouriteOriginLoad}
                    origin={favouriteOrigin}
                    originError={favouriteOriginError}
                    onDestinationChanged={onFavouriteDestinationChanged}
                    onDestinationLoad={onFavouriteDestinationLoad}
                    destination={favouriteDestination}
                    destinationError={favouriteDestinationError}
                    darkBackground={darkBackground}
                    darkForeground={darkForeground}
                    darkText={darkText}
                    leaveArrive={leaveArrive}
                    setLeaveArrive={setLeaveArrive}
                    setNewDirections={setNewFavouriteDirections}
                    selectedDate={selectedTime}
                    setSelectedDate={setSelectedTime}
                    setMenu={setMenu}
                    showWeather={showWeather}
                    favouriteRoute={true}
                    saveFavourite={saveFavourite}
                    setFavouriteView={setFavouriteView}
                />
            </Zoom>
            
            {favouriteView &&
                <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Tooltip title="Create favourite" aria-label="Create favourite" style={{marginTop: "-10px", marginBottom: "20px"}}>
                        <Fab color="primary" aria-label="menu" onClick={() => createFavourite()}>
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                <div style={{marginTop: "-10px"}}>
                <Scrollbars style={{ height: 170 }}>
                    {favourites.length === 0 &&
                    <p>Create a favourite route to see it here</p>}
                {favourites.map((favourite, index) =>(
                    <Paper className={styles.darkForeground} style={{backgroundColor: darkForeground, padding: "2px 4px", marginTop: "10px", marginBottom: "10px"}}>
                    <Grid container spacing={0}>
                    <Grid item xs={10}>
                    <Button
                    fullWidth={true}
                    variant="contained"
                    color="primary">
                        <Typography>{favourite.title}</Typography> 
                    </Button>
                    </Grid>
                    <Grid item xs={1}>
                    <Tooltip title="Edit favourite" aria-label="Edit favourite">
                        <Fab color="primary" size="small" aria-label="edit" className={styles.editDeleteIcons} onClick={() => editFavourite()}>
                            <EditIcon/>
                        </Fab>
                    </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                    <Tooltip title="Delete favourite" aria-label="Delete favourite">
                        <Fab color="secondary" size="small" aria-label="delete" className={styles.editDeleteIcons} onClick={() => deleteFavourite(favourite)}>
                            <DeleteIcon/>
                        </Fab>
                    </Tooltip>
                    </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={10}>
                        <p style={{color: darkText}}>From {favourite.origin} to {favourite.destination} at {favourite.time.toString()}</p>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    </Paper>
                ))}
                </Scrollbars>
                </div>
                </Grid>
                </Grid>
            }
        </React.Fragment>
    )
}
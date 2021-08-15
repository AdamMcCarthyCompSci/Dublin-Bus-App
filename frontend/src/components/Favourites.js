import React, { useEffect } from 'react';
import axios from 'axios';
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
import Directions from "./Directions";
import Zoom from '@material-ui/core/Zoom';
import dayjs from 'dayjs';

export function Favourites({origin, darkBackground, darkForeground, darkText, destination, leaveArrive, setLeaveArrive, setMenu, showWeather, setNewDirections, setOrigin, setDestination, originError, destinationError, setSelectedDate}) {
    const [favourites, setFavourites] = React.useState([]);
    const [favouriteView, setFavouriteView] = React.useState(true);
    const [selectedTime, setSelectedTime] = React.useState(new Date());
    const [favouriteTitle, setFavouriteTitle] = React.useState("")
    const [favouriteOrigin, setFavouriteOrigin] = React.useState('');
    const [favouriteDestination, setFavouriteDestination] = React.useState('');
    const [favouriteOriginError, setFavouriteOriginError] = React.useState("");
    const [favouriteDestinationError, setFavouriteDestinationError] = React.useState("");
    const [favouriteOriginBox, setFavouriteOriginBox] = React.useState('');
    const [favouriteDestinationBox, setFavouriteDestinationBox] = React.useState('');
    const [newFavouriteDirections, setNewFavouriteDirections] = React.useState(true);
    const [editingFavourite, setEditingFavourite] = React.useState(null);

    // useEffect( () => {
    //   async function fetchData(){
    //     const result = await axios(
    //         process.env.REACT_APP_API_URL + '/bus/favourites',
    //     )
    //     setFavourites(result.data.favourites)
    //     }
    //     fetchData();
    // },[])

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

    const editFavourite = (index) => {
      const editing = favourites.filter((indexFavourite, favourite) => index === indexFavourite);
      setFavouriteTitle(editing[0].title);
      setFavouriteOrigin(editing[0].origin);
      setFavouriteDestination(editing[0].destination);
      setSelectedTime(editing[0].time);
      setEditingFavourite(editing[0]);
      // Editing a favourite and changing to another view before submitting deletes the favourite as of right now 
      setFavourites(favourites.filter((indexFavourite, favourite) => index !== indexFavourite));
        return (
            setFavouriteView(false)
        )
    }

    const saveFavourite = (title, origin, destination, time) => {
        setFavouriteTitle("");
        setFavouriteOrigin("");
        setFavouriteDestination("");
        setSelectedTime(new Date());
        setEditingFavourite("");
        setFavourites([...favourites, {title: title, origin: origin, destination: destination, time: time}])
    }

    const deleteFavourite = (index) => {
        setFavourites(favourites.filter((indexFavourite, favourite) => index !== indexFavourite))
    }

    const getFavouriteDescription = (favourite) => {
      const description = "From " + favourite.origin + " to "  + favourite.destination + " at " + dayjs(favourite.time).format("HH:mm");
      return (
        description
      )
    }

    const selectFavourite = (favourite) => {
      const date = new Date();
      console.log(originError, destinationError)
      date.setHours(Number(dayjs(favourite.time).format("HH")));
      date.setMinutes(Number(dayjs(favourite.time).format("mm")));
      showWeather(date);
      setSelectedDate(date);
      setLeaveArrive("Arrive At:");
      setOrigin(favourite.origin);
      setDestination(favourite.destination);
      setMenu('Results');
      setNewDirections(false);
      // Call prediction
    }

    const handleTitleChange = (event) => {
      setFavouriteTitle(event.target.value);
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
                    favouriteTitle={favouriteTitle}
                    handleTitleChange={handleTitleChange}
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
                    <p style={{color: darkText}}>Create a favourite route to see it here</p>}
                {favourites.map((favourite, index) =>(
                    <Paper className={styles.darkForeground} style={{backgroundColor: darkForeground, padding: "2px 4px", marginTop: "10px", marginBottom: "10px"}}>
                    <Grid container spacing={0}>
                    <Grid item xs={10}>
                    <Button
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                    onClick={() => selectFavourite(favourite)}>
                        <Typography>{favourite.title}</Typography> 
                    </Button>
                    </Grid>
                    <Grid item xs={1}>
                    <Tooltip title="Edit favourite" aria-label="Edit favourite">
                        <Fab color="primary" size="small" aria-label="edit" className={styles.editDeleteIcons} onClick={() => editFavourite(favourite)}>
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
                        <p style={{color: darkText}}>{getFavouriteDescription(favourite)}</p>
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
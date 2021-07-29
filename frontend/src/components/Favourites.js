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

export function Favourites({onOriginChanged, onOriginLoad, origin, setOrigin, darkBackground, darkForeground, darkText, originError, onDestinationChanged, onDestinationLoad, destination, setDestination, destinationError, leaveArrive, setLeaveArrive, setNewDirections, selectedDate, setSelectedDate, setMenu, showWeather}) {
    const [favourites, setFavourites] = React.useState([
        {title: "Morning Commute", origin: "O'Connell Street", destination: "UCD", time: "8:00"}, 
        {title: "Evening Commute", origin: "UCD", destination: "O'Connell Street", time: "17:00"}, 
        {title: "Training", origin: "O'Connell Street", destination: "Phoenix Park", time: "20:00"}
    ]);
    const [favouriteView, setFavouriteView] = React.useState(true);

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

    const deleteFavourite = (index) => {
        setFavourites(favourites.filter((indexFavourite, favourite) => index !== indexFavourite))
    }

    return (
        <React.Fragment>
            {!favouriteView &&
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
                />
            }
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
                    <Typography style={{color: darkText}}>From {favourite.origin} to {favourite.destination} at {favourite.time}</Typography>
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
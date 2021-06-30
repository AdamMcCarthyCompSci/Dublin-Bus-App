import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import { StandaloneSearchBox } from '@react-google-maps/api';

export function PlacesSearch({onPlacesChanged, onPlacesLoad, handleLastStep, handleNextStep, bottom, back, place, setPlace}) {

    const useStyles = makeStyles((theme) => ({
        root: {
          padding: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: "40%",
          bottom: bottom,
          position: "absolute",
          zIndex: 2,
          marginLeft: "30%"
        },
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
          width: "100%",
          margin: "auto",
          position: "absolute",
          top: 0, left: 50, bottom: 0, right: 0,
        },
        iconButton: {
          padding: 10,
        },
        divider: {
          height: 28,
          margin: 4,
        },
        grid: {
          height: "100%",
        }
      }));

    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
        <Grid container spacing={0}>
        <Grid item xs={1}>
        <IconButton className={classes.iconButton} aria-label="menu" disabled={back} onClick={() => { handleLastStep() }}>
            <ArrowBackIcon />
        </IconButton>
        {/* <Divider className={classes.divider} orientation="vertical" /> */}
        </Grid>
        <Grid item xs={10}>
        <StandaloneSearchBox
        onLoad={onPlacesLoad}
        onPlacesChanged={
            onPlacesChanged
        }
        >
        <InputBase
            className={classes.input}
            placeholder={place ? place : "Search"}
            inputProps={{ 'aria-label': 'search google maps' }}
        />
            </StandaloneSearchBox>
        </Grid>
        <Grid item xs={1}>
        {/* <Divider className={classes.divider} orientation="vertical" /> */}
        <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => { handleNextStep() }}>
            <DirectionsIcon />
        </IconButton>
        </Grid>
        </Grid>
        </Paper>
    )
}
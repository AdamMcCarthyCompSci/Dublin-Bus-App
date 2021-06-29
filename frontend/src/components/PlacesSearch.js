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

export function PlacesSearch({onPlacesChanged, onSBLoad, handleLastStep, handleNextStep, bottom, back}) {

    const useStyles = makeStyles((theme) => ({
        root: {
          padding: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: "20%",
          bottom: bottom,
          position: "absolute",
          zIndex: 2,
          marginLeft: "15%"
        },
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
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
        <Grid container spacing={0}>
        <Grid item xs={3}>

        </Grid>
        <Grid item xs={6}>
        <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu" disabled={back} onClick={() => { handleLastStep() }}>
            <ArrowBackIcon />
        </IconButton>
        <StandaloneSearchBox
        onLoad={onSBLoad}
        onPlacesChanged={
            onPlacesChanged
        }
        >
        <InputBase
            className={classes.input}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
        />
            </StandaloneSearchBox>
            <SearchIcon />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => { handleNextStep() }}>
            <DirectionsIcon />
        </IconButton>
        </Paper>
        </Grid>
        <Grid item xs={3}>

        </Grid>
        </Grid>
    )
}
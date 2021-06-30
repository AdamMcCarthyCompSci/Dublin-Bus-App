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
import styles from './Map.module.css';

export function PlacesSearch({onPlacesChanged, onPlacesLoad, handleLastStep, handleNextStep, bottom, back, place, setPlace}) {

    const useStyles = makeStyles((theme) => ({
        searchPaper: {
          padding: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: "30%",
          bottom: bottom,
          position: "absolute",
          zIndex: 2,
          marginLeft: "33%"
        },
        backDiv: {
          padding: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: "3%",
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
          top: 0, left: 0, bottom: 0, right: 0,
          height: "auto",
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
        <Grid item xs={1}>
        <div className={classes.backDiv}>
        <IconButton className={classes.iconButton} aria-label="menu" disabled={back} onClick={() => { handleLastStep() }}>
            <ArrowBackIcon />
        </IconButton>
        {/* <Divider className={classes.divider} orientation="vertical" /> */}
        </div>
        </Grid>
        <Paper component="form" className={classes.searchPaper}>
        <Grid item xs={10}>
        <StandaloneSearchBox
        className={styles.standaloneSearchBox}
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
        </Paper>
        </Grid>
    )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { StandaloneSearchBox } from '@react-google-maps/api';
import styles from './Map.module.css';
import Zoom from '@material-ui/core/Zoom';

export function PlacesSearch({onPlacesChanged, onPlacesLoad, bottom, place, search, showSearch}) {
// Implement bias for Dublin. Right now it has no bias for autocomplete, so it gives locations all around the world.
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
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
          width: "100%",
          margin: "auto",
          position: "absolute",
          top: 0, left: 0, bottom: 15, right: 0,
          height: "auto",
        },
      }));

    const classes = useStyles();

    return (
      <Zoom in={showSearch} mountOnEnter unmountOnExit>
        <Paper component="form" className={classes.searchPaper}>
        <StandaloneSearchBox
        className={styles.standaloneSearchBox}
        onLoad={onPlacesLoad}
        onPlacesChanged={
            onPlacesChanged
        }
        >
        <InputBase
            className={classes.input}
            placeholder={place ? place : search}
            inputProps={{ 'aria-label': 'search google maps' }}
        />
            </StandaloneSearchBox>
        </Paper>
        </Zoom>
    )
}
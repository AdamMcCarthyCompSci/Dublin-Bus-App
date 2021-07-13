import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { StandaloneSearchBox } from '@react-google-maps/api';
import styles from './Map.module.css';

export function PlacesSearch({onPlacesChanged, onPlacesLoad, place, search}) {
// Implement bias for Dublin. Right now it has no bias for autocomplete, so it gives locations all around the world.
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
          marginLeft: theme.spacing(1),
          flex: 1,
          position: "absolute",
          width: "100%",
          margin: "auto",
          height: "auto",
        },
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
          width: "100%",
          margin: "auto",
          height: "auto",
        },
        inputTextColor:{
          color:'#002984'
      }
      }));

    const classes = useStyles();

    return (
        <Paper component="form" className={classes.searchPaper}>
          {/* Places search functionality */}
        <StandaloneSearchBox
        className={classes.standaloneSearchBox}
        onLoad={onPlacesLoad}
        onPlacesChanged={
            onPlacesChanged
        }
        // Bounds creates autocomplete bias for places search within given area
        bounds={{
          north: 54.345804,
          south: 52.345804,
          east: -5.26031,
          west: -7.26031,
        }}
        style={{top: "auto !important"}}
        >
          {/* Input text box for searching places */}
        <InputBase
            className={classes.input}
            placeholder={place ? place : search}
            inputProps={{ 'aria-label': 'search google maps', className: classes.inputTextColor }}
        />
            </StandaloneSearchBox>
        </Paper>
    )
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './Map.module.css';
import Button from '@material-ui/core/Button';

{/* Main function for the route dropdown components and pricing api call*/}

function Routes({darkbackground, darkForeground, darkText}) {
{/* initalising variables*/}
const [routes,setRoutes]=React.useState([])
const [directionDropdown,setDirectionDropdown]=useState(false);
const [boardingDropdown, setBoardingDropdown]= useState(false);
const [alightingDropdown, setAlightingDropdown]=useState(false);
const [finalDropdown, setFinalDropdown]=useState(false);

const [direction, setDirection]=useState("");
const [boardingStop, setBoardingStop]= useState("");
const [route, setRoute]=useState("");
const [plateCode, setPlateCode]=useState("");
const [price,setPrice]=useState(null);

{/*Filtering the unique values called from the bus routes table in MySql*/}

const routeUnique=getUnique(routes,'busnumber');
const directionUnique=getUnique(routes, 'routedescription');
const stopUnique=getUnique(routes,'platecode');

{/* Function that filters the unique values from dublin bus routes table*/}
function getUnique(route, comp) {

    const unique =  route.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
     .filter((e) => route[e]).map(e => route[e]);
    return unique;
}

{/* calling the route view from Django backend*/}

useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/routes',
        )
        {/* Set the routes state */}
        setRoutes(result.data.routes)
    },[''] );

{/* calling the price view from Django backend*/}
  useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/price',
            )
        {/* Set the price state */}
        setPrice(result.data.price)
    },['']);



const handleSubmit = () =>{


    alert('You selected route ' + JSON.stringify(price,null,2) + ' the direction is ' + direction[direction.length -1] )

    // console.log(price)
}



{/* Dropdown activation */}
const activateDirectionDropdown = (e) =>{
    const { value } = e.target;
    if (value === "Select a Route") {
        setDirectionDropdown(false);
        setRoute(value);
        return;
    }
    setRoute(value);
    if (value == value) {
        setDirectionDropdown(true);
    }
    else
        setDirectionDropdown(false);
    }
}

const activateBoardingDropdown = (e) =>{
    const { value } = e.target;
    if (value === "Select a Direction") {
        setBoardingDropdown(false);
        setDirection(value);
        return;
    }
    setDirection(value);
    if (value == value) {
        setBoardingDropdown(true);
    } 
        else {
     setBoardingDropdown(false);
    }
}

const activateAlightingDropdown = (e) =>{
    const { value } = e.target;
    if (value === "Select a Boarding Stop") {
        setAlightingDropdown(false);
        setBoardingStop(value);
        return;
    }
    setBoardingStop(value);
    if (value == value) {
        setAlightingDropdown(true);
    } 
     else {
        setAlightingDropdown(false);
    }
}

const activateFinalDropdown = (e) =>{
    const { value } = e.target;
    if (value === "Select an Alighting Stop") {
        setFinalDropdown(false);
        setPlateCode(value);
        return;
    }
    setPlateCode(value);
    if (value == value) {
        setFinalDropdown(true);
    } 
     else {
        setFinalDropdown(false);
    }
}

    return(
    <>





<form method="post" class="post-form" action="http://localhost:8000/bus/price">

    <Grid container spacing={1} style={{marginBottom: "20px"}}>
    <Grid item xs={6}>

    {/*Dropdown 1. Route numbers aka bus numbers.*/}
    <Paper className={styles.routeDropdownContainer} style={{backgroundColor: darkForeground}}>
        <FormControl>
        <InputLabel id="dropdown1" style={{color: darkText}}>Route</InputLabel>
        <Select
        style={{color: darkText}}
        labelId="dropdown1"
        id="dropdown1"
        value={route !== "Select a Route" ? route : "Select a Route"}
        onChange={activateDirectionDropdown}
        >
            <MenuItem key={"Select a Route"} value={"Select a Route"}>Select a Route</MenuItem>
            {routeUnique.map((stopdetail, index)=>(
            <MenuItem key={stopdetail.id} value={stopdetail.busnumber}>{stopdetail.busnumber}</MenuItem>
            ))}
        </Select>
        <FormHelperText style={{color: darkText}}>Select a Route</FormHelperText>
        </FormControl>
    </Paper>
    
    </Grid>
    <Grid item xs={6}>
    
    {/*Dropdown 2 Route direction first stop on the route to last stop.*/}
    <Paper className={styles.routeDropdownContainer} style={{backgroundColor: darkForeground}}>
    {directionDropdown &&
        <FormControl>
        <InputLabel id="dropdown2" style={{color: darkText}}>Direction</InputLabel>
        <Select
        style={{color: darkText}}
        labelId="dropdown2"
        id="dropdown2"
        value={direction !== "Select a Direction" ? direction : "Select a Direction"}
        onChange={activateBoardingDropdown}
        >
            <MenuItem key={"Select a Direction"} value={"Select a Direction"}>Select a Direction</MenuItem>
            {directionUnique.filter(stopdetail=>stopdetail.busnumber==route).map((stopdetail, index)=>(
                <MenuItem key={stopdetail.id} value={stopdetail.routedescription + " " + stopdetail.direction}>{stopdetail.routedescription + " " + stopdetail.direction}</MenuItem>
            ))}
        </Select>
        <FormHelperText style={{color: darkText}}>Select a Direction</FormHelperText>
        </FormControl>
    }
    </Paper>
    </Grid>
    <Grid item xs={6}>

    {/*Dropdown 3 Boarding bus stop*/}
    <Paper className={styles.routeDropdownContainer} style={{backgroundColor: darkForeground}}>
    {boardingDropdown &&
        <FormControl>
        <InputLabel id="dropdown3" style={{color: darkText}}>Boarding Stop</InputLabel>
        <Select
        style={{color: darkText}}
        labelId="dropdown3"
        id="dropdown3"
        value={boardingStop !== "Select a Boarding Stop" ? boardingStop : "Select a Boarding Stop"}
        onChange={activateAlightingDropdown}>
            <MenuItem key={"Select a Boarding Stop"} value={"Select a Boarding Stop"}>Select a Boarding Stop</MenuItem>
            {stopUnique.filter(stopdetail=>stopdetail.busnumber==route && (stopdetail.routedescription + " " + stopdetail.direction)==direction).map((stopdetail, index)=>(
                <MenuItem key={stopdetail.id} value={stopdetail.shortcommonname_en + " Bus stop: " + stopdetail.platecode}>{stopdetail.shortcommonname_en + " Bus Stop: " + stopdetail.platecode}</MenuItem>
            ))}
        </Select>
        <FormHelperText style={{color: darkText}}>Select a Boarding Stop</FormHelperText>
        </FormControl>
    }
    </Paper>

    </Grid>
    <Grid item xs={6}>

    {/*Dropdown 4 alighting bus stop.*/}
    <Paper className={styles.routeDropdownContainer} style={{backgroundColor: darkForeground}}>
    {alightingDropdown &&
        <FormControl>
        <InputLabel id="dropdown4" style={{color: darkText}}>Alighting Stop</InputLabel>
        <Select
        style={{color: darkText}}
        labelId="dropdown4"
        id="dropdown4"
        value={plateCode !== "Select an Alighting Stop" ? plateCode : "Select an Alighting Stop"}
        onChange={activateFinalDropdown}>
            <MenuItem key={"Select an Alighting Stop"} value={"Select an Alighting Stop"}>Select an Alighting Stop</MenuItem>
            {stopUnique.filter(stopdetail=>stopdetail.busnumber==route && stopdetail.routedescription + " " + stopdetail.direction==direction).map((stopdetail, index)=>(
                <MenuItem key={stopdetail.id} value={stopdetail.shortcommonname_en + " Bus Stop: " + stopdetail.platecode}>{stopdetail.shortcommonname_en + " Bus Stop: " + stopdetail.platecode}</MenuItem>
            ))}
        </Select>
        <FormHelperText style={{color: darkText}}>Select an Alighting Stop</FormHelperText>
        </FormControl>
    }
    </Paper>

    </Grid>
    </Grid>
    
    {finalDropdown &&
        <Button
        className={styles.submitButton}
        variant="contained" 
        color="primary"
        onClick={() => {
        handleSubmit()
        }}> 
            Submit 
        </Button>
    }
    {!finalDropdown &&
        <Button
        className={styles.submitButton}
        variant="contained" 
        color="primary"
        disabled
        onClick={() => {
        handleSubmit() 
        }}> 
            Submit 
        </Button>
    }
</React.Fragment>

    )

}
export default Routes


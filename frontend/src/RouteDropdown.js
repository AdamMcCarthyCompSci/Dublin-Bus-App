import routedata from "./RouteData.js";
import React, {useState, useEffect} from 'react';

// A function to construct and add the route data to dropdown menus

const RouteDropdown = () => {

const [directionDropdown,setDirectionDropdown]=useState(false);
const [boardingDropdown, setBoardingDropdown]= useState(false);
const [alightingDropdown, setAlightingDropdown]=useState(false);
const [route,setRoute]=useState(null);
const [direction, setDirection]=useState(null);
const [boardingStop, setBoardingStop]= useState(null);
const [filteredDirections,setFilteredDirections]=useState(routedata);

    const activateDirectionDropdown = (e) =>{
    const { value } = e.target;
    setRoute(value);
    if (value === value)
    {
    setRoute(value);
      setDirectionDropdown(true);

           }
    else{
     setDirectionDropdown(false);
     }
     }

     const activateBoardingDropdown = (e) =>{
     const { value } = e.target;
     setDirection(value);
     if (value ==value) {
     setDirection(value);
     setBoardingDropdown(true);
     } else{
     setBoardingDropdown(false);
     }
     }

     const activateAlightingDropdown = (e) =>{
     const { value } = e.target;
     setBoardingStop(value);
     if (value ==value) {
     setBoardingStop(value);
     setAlightingDropdown(true);
     } else{
     setAlightingDropdown(false);
     }
     }

    return (
<>

{/*Dropdown 1. Route numbers aka bus numbers.*/}
<b> Bus Route: </b>
    <select id="dropdown1" onChange={activateDirectionDropdown}>
    <option>Select Your Route</option>
    {routedata.map((stopdetail, index)=>(
    <option key ={stopdetail.id} >{stopdetail.RouteName}</option>
))}
</select>

{/*Dropdown 2 Route direction first stop on the route to last stop.*/}
{directionDropdown &&
<select id="dropdown2" onChange={activateBoardingDropdown}>
<option>Select Direction</option>
{routedata.filter(stopdetail=>stopdetail.RouteName==route).map((stopdetail, index)=>(
      <option>{stopdetail.Direction}</option>

))}
</select>}

{/*Dropdown 3 Boarding bus stop*/}

{boardingDropdown &&
<select id="dropdown3" onChange={activateAlightingDropdown}>
<option>Select Boarding Stop</option>
{routedata.filter(stopdetail=>stopdetail.RouteName==route).map((stopdetail, index)=>(
     <option >{stopdetail.ShortCommonName_en + " Bus stop: " + stopdetail.PlateCode}</option>


))}
</select>
}

{/*Dropdown 4 alighting bus stop.
*/}
{alightingDropdown &&
<select id="dropdown4" >
<option>Select Alighting Stop</option>
{routedata.filter(stopdetail=>stopdetail.RouteName==route).map((stopdetail, index)=>(
     <option >{stopdetail.ShortCommonName_en + " Bus stop: " + stopdetail.PlateCode}</option>


))}
</select>
}
</>
    )

}

export default RouteDropdown
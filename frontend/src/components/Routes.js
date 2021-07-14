import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Routes() {
const [routes,setRoutes]=React.useState([])
const [directionDropdown,setDirectionDropdown]=useState(false);
const [boardingDropdown, setBoardingDropdown]= useState(false);
const [alightingDropdown, setAlightingDropdown]=useState(false);

const [direction, setDirection]=useState(null);
const [boardingStop, setBoardingStop]= useState(null);
const [route,setRoute]=useState(null);
const [platecode, setPlateCode]=useState(null);

const [price,setPrice]=useState(null);

const routeUnique=getUnique(routes,'busnumber');
const directionUnique=getUnique(routes, 'routedescription');
const stopUnique=getUnique(routes,'platecode');


function getUnique(route, comp) {

    const unique =  route.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
     .filter((e) => route[e]).map(e => route[e]);
    return unique;
}

const showPrice = () => {
        console.log(price)
      }

      useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/price',
        )
        setPrice(result.data.price)
    },['']);
    showPrice()

const handleSubmit = () =>{
{/*alert('You selected route ' + price + ' the direction is ' + direction[direction.length -1] )*/}
console.log(price)

}

      useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/routes',
        )
        setRoutes(result.data.routes)
    },['']);








    const activateDirectionDropdown = (e) =>{
    const { value } = e.target;
    setRoute(value);
    if (value == value)
    {
      setDirectionDropdown(true);
      }
    else{
     setDirectionDropdown(false);
     }
     }

     const activateBoardingDropdown = (e) =>{
     const { value } = e.target;
     setDirection(value);
     if (value == value) {
     setBoardingDropdown(true);
     } else{
     setBoardingDropdown(false);
     }
     }

     const activateAlightingDropdown = (e) =>{
     const { value } = e.target;
     setBoardingStop(value);
     if (value ==value) {
     setAlightingDropdown(true);
     } else{
     setAlightingDropdown(false);
     }
     }

    return(

<>
<form onSubmit={handleSubmit}>
{/*Dropdown 1. Route numbers aka bus numbers.*/}
    <select id="dropdown1" onChange={activateDirectionDropdown}>
    <option>Select Your Route</option>
    {routeUnique.map((stopdetail, index)=>(
    <option key ={stopdetail.id}>{stopdetail.busnumber}</option>
))}
</select>

{/*Dropdown 2 Route direction first stop on the route to last stop.*/}
{directionDropdown &&
<select id="dropdown2" onChange={activateBoardingDropdown} >
<option>Select Direction</option>
{directionUnique.filter(stopdetail=>stopdetail.busnumber==route).map((stopdetail, index)=>(
      <option key={stopdetail.id}>{stopdetail.routedescription + " " + stopdetail.direction}</option>

))}
</select>}

{/*Dropdown 3 Boarding bus stop*/}

{boardingDropdown &&
<select id="dropdown3" onChange={activateAlightingDropdown}>
<option>Select Boarding Stop</option>

{stopUnique.filter(stopdetail=>stopdetail.busnumber==route && stopdetail.routedescription + " " + stopdetail.direction==direction).map((stopdetail, index)=>(
     <option key={stopdetail.id}>{stopdetail.shortcommonname_en + " Bus stop: " + stopdetail.platecode}</option>


))}
</select>
}

{/*Dropdown 4 alighting bus stop.
*/}
{alightingDropdown &&
<select id="dropdown4" >
<option>Select Alighting Stop</option>
{stopUnique.filter(stopdetail=>stopdetail.busnumber==route && stopdetail.routedescription + " " + stopdetail.direction==direction).map((stopdetail, index)=>(
     <option key={stopdetail.id}>{stopdetail.shortcommonname_en + " Bus stop: " + stopdetail.platecode}</option>


))}
</select>

}


<input type="submit" value="Submit"/>
</form>

</>
    )

}
export default Routes


import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import routeData from "../data/Route_data.json";
import stopData from "../data/Data.json";
import React, {useState} from 'react';

{/* A funtion to return the unique values in the Route_data.json file.*/}
function getUnique(routeData, comp) {

    const unique =  routeData.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
     .filter((e) => routeData[e]).map(e => routeData[e]);
    return unique;
}

const handleSelect=(e)=>{
    console.log(e);
  }

const unique2= getUnique(routeData,'RouteName') ;

// A function to construct and add the route data to dropdown menus
const RouteDropdown = () => {
      const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }
    return (
<>
<p>You clicked {value} times</p>

{/*Dropdown 1. Route numbers aka bus numbers.*/}
    <select onClick={handleSelect}>

    {unique2.map((stopdetail, index)=>{

    return <option >{stopdetail.RouteName}</option>


    })}


</select>

{/*Dropdown 2 Route direction first stop on the route to last stop.*/}
<select>

{unique2.map((stopdetail1, index)=>{
     return <option>{stopdetail1.RouteDescription}</option>


})}
</select>

{/*Dropdown 3 Boarding bus stop*/}

<select>

{unique2.map((stopdetail2, index)=>{
     return <option>{stopdetail2.ShortCommonName_en + " Bus stop: " + stopdetail2.PlateCode}</option>


})}
</select>

{/*Dropdown 4 alighting bus stop.
*/}
<select>

{unique2.map((stopdetail3, index)=>{
     return <option>{stopdetail3.ShortCommonName_en + " Bus stop: " + stopdetail3.PlateCode}</option>


})}
</select>
</>
    )

}

export default RouteDropdown